import { Injectable, Injector, effect, signal, OnDestroy } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Capacitor } from "@capacitor/core";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { FlowTypes } from "../../model";
import { AppConfigService } from "../app-config/app-config.service";
import { FileManagerService } from "../file-manager/file-manager.service";
import { IAssetContents } from "src/app/data";
import { BehaviorSubject, Subscription } from "rxjs";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { TemplateAssetService } from "../../components/template/services/template-asset.service";
import { AsyncServiceBase } from "../asyncService.base";
import type { IAssetEntry, IAssetOverrideProps } from "packages/data-models";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { arrayToHashmap, convertBlobToBase64, deepMergeObjects } from "../../utils";
import { DeploymentService } from "../deployment/deployment.service";
import { IRemoteAssetProvider, IRemoteAssetConfig } from "./providers/base.remote-asset";
import { getRemoteAssetProvider } from "./providers";
import type { IAssetPackDownloadStatus, IDBAssetPack } from "./remote-asset.types";
import { NetworkService } from "../network/network.service";

/** Name of the protected data list storing bundled and downloaded asset contents */
const ASSET_CONTENTS_DATA_LIST = "_assets_contents";
/** Name of the protected data list to store asset pack metadata */
const ASSET_PACKS_DATA_LIST = "_asset_packs";

interface IActiveAssetPackDownload {
  abortController: AbortController;
  downloadStartedAt: string;
  removeConnectionStatusListener: () => void;
}

@Injectable({
  providedIn: "root",
})
export class RemoteAssetService extends AsyncServiceBase implements OnDestroy {
  remoteAssetsEnabled = signal(false);
  provider: IRemoteAssetProvider;
  downloading: boolean = false;
  downloadProgress: number;
  downloadProgressCount = signal<{ completed: number; total: number } | null>(null);
  manifest: FlowTypes.AssetPack | null = null;
  private currentAssetPackName: string | null = null;
  private activeAssetPackDownloads = new Map<string, IActiveAssetPackDownload>();

  private assetContentsSubscription: Subscription;
  private assetContentsData = signal<any[]>([]);

  constructor(
    private appConfigService: AppConfigService,
    private appDataService: AppDataService,
    private dynamicDataService: DynamicDataService,
    private fileManagerService: FileManagerService,
    private templateAssetService: TemplateAssetService,
    private templateActionRegistry: TemplateActionRegistry,
    private http: HttpClient,
    private deploymentService: DeploymentService,
    private networkService: NetworkService,
    private injector: Injector
  ) {
    super("RemoteAsset");
    this.registerInitFunction(this.initialise);

    effect(() => {
      if (this.remoteAssetsEnabled()) {
        const dataRows = this.assetContentsData();
        if (dataRows && dataRows.length > 0) {
          const assetContentsHashmap = arrayToHashmap(dataRows, "id") as IAssetContents;
          this.templateAssetService.assetsContentsList.set(assetContentsHashmap);
        }
      }
    });
  }

  private async initialise() {
    // Initialize the remote asset provider
    const remoteAssetsConfig = this.deploymentService.config.remote_assets;
    if (remoteAssetsConfig?.provider) {
      this.provider = getRemoteAssetProvider(remoteAssetsConfig.provider);
      const providerConfig: IRemoteAssetConfig = {
        bucketName: remoteAssetsConfig.bucketName,
        folderName: remoteAssetsConfig.folderName,
      };
      await this.provider.initialise(this.injector, providerConfig);
      this.remoteAssetsEnabled.set(true);
      console.log("[Remote Asset] Remote asset provider initialized:", remoteAssetsConfig.provider);
    } else {
      this.remoteAssetsEnabled.set(false);
      console.log("[Remote Asset] Remote assets not enabled");
    }

    this.registerTemplateActionHandlers();

    if (this.remoteAssetsEnabled()) {
      await this.ensureAsyncServicesReady([this.templateAssetService, this.dynamicDataService]);
      this.ensureSyncServicesReady([
        this.appConfigService,
        this.appDataService,
        this.fileManagerService,
      ]);

      // Update asset contents signal via subscription to dynamic data
      // (limitations of rxjs/signal interop utils mean we can't use toSignal here)
      const { flow_type, flow_name } = this.generateAssetContentsPack(
        this.templateAssetService.assetsContentsList()
      );
      const assetContentsData$ = this.dynamicDataService.query$(flow_type, flow_name);
      this.assetContentsSubscription = assetContentsData$.subscribe({
        next: (dataRows) => this.assetContentsData.set(dataRows),
        error: (error) => console.error("[Remote Asset] Error in asset contents stream:", error),
      });
    }
  }

  /************************************************************************************
   *  Service Init methods
   ************************************************************************************/

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      asset_pack: async ({ args }) => {
        const [actionId, ...assetPackArgs] = args;
        const childActions = {
          download: async () => {
            if (this.remoteAssetsEnabled()) {
              const assetPackName = assetPackArgs[0];
              await this.downloadAssetPackByName(assetPackName);
            } else {
              console.error(
                "The 'asset_pack: download' action is not available. To enable asset pack functionality, please ensure that the remote asset provider is configured in the deployment config."
              );
            }
          },
          cancel_download: async () => {
            if (this.remoteAssetsEnabled()) {
              console.log("[REMOTE ASSETS] Cancelling active asset pack downloads");
              await this.cancelActiveAssetPackDownloads();
            } else {
              console.error(
                "The 'asset_pack: cancel_download' action is not available. To enable asset pack functionality, please ensure that the remote asset provider is configured in the deployment config."
              );
            }
          },
          reset: async () => {
            if (this.remoteAssetsEnabled()) {
              await this.reset();
            } else
              console.error(
                "The 'asset_pack: reset' action is not available. To enable asset pack functionality, please ensure that the remote asset provider is configured in the deployment config."
              );
          },
        };
        if (!(actionId in childActions)) {
          console.error("asset_pack does not have action", actionId);
          return;
        }
        return childActions[actionId]();
      },
    });
  }

  /**
   * Initialise the `_assets_contents` pack from bundled (core) asset contents.
   * Downloaded asset packs are later merged into this same dynamic data flow.
   * */
  private generateAssetContentsPack(assetsContentsList: IAssetContents) {
    const contentsArray = [];
    for (const [relativePath, assetEntry] of Object.entries(assetsContentsList)) {
      contentsArray.push({ id: relativePath, ...assetEntry });
    }
    const assetContentsPack: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: ASSET_CONTENTS_DATA_LIST,
      rows: contentsArray,
    };
    // This will apply additional processing to to the asset pack data list, i.e. adding the rowsHashMap field
    this.appDataService.addRuntimeFlowToContents(assetContentsPack);
    return assetContentsPack;
  }

  /************************************************************************************
   *  Download methods
   ************************************************************************************/
  public async downloadAssetPackByName(assetPackName: string) {
    if (!assetPackName) {
      console.error("[REMOTE ASSETS] Please provide an asset pack name to download");
      return false;
    }
    if (this.activeAssetPackDownloads.size > 0) {
      console.warn("[REMOTE ASSETS] An asset pack download is already active");
      return false;
    }

    const downloadStartedAt = this.getTimestamp();
    const abortController = new AbortController();
    // Keep _asset_packs status aligned with connectivity while this download attempt is active.
    const removeAssetPackConnectionStatusListener = this.trackAssetPackConnectionStatus(
      assetPackName,
      downloadStartedAt
    );
    this.activeAssetPackDownloads.set(assetPackName, {
      abortController,
      downloadStartedAt,
      removeConnectionStatusListener: removeAssetPackConnectionStatusListener,
    });

    try {
      while (true) {
        this.throwIfDownloadCancelled(abortController.signal);
        if (this.isOffline()) {
          await this.setAssetPackDownloadStatus(assetPackName, "waiting_for_connection", {
            downloadStartedAt,
          });
          await this.waitForConnection(abortController.signal);
        }

        this.throwIfDownloadCancelled(abortController.signal);
        await this.setAssetPackDownloadStatus(assetPackName, "in_progress", { downloadStartedAt });

        try {
          const manifest = await this.getAssetPackManifest(assetPackName);
          this.throwIfDownloadCancelled(abortController.signal);
          if (!manifest) {
            throw new Error(
              `[REMOTE ASSETS] Failed to load manifest for asset pack: ${assetPackName}`
            );
          }
          const total = this.countDownloadFiles(manifest.rows as IAssetEntry[]);
          this.downloadProgressCount.set(total ? { completed: 0, total } : null);
          await this.downloadAndIntegrateAssetPack(manifest, abortController.signal);
          this.throwIfDownloadCancelled(abortController.signal);
          removeAssetPackConnectionStatusListener();
          await this.setAssetPackDownloadStatus(assetPackName, "completed", {
            downloadStartedAt,
            downloadCompletedAt: this.getTimestamp(),
          });
          return true;
        } catch (e) {
          if (this.isDownloadCancelled(e, abortController.signal)) {
            throw e;
          }
          if (this.isOffline()) {
            console.warn("[REMOTE ASSETS] Download waiting for connection to be restored", e);
            continue;
          }
          throw e;
        }
      }
    } catch (e) {
      removeAssetPackConnectionStatusListener();
      if (this.isDownloadCancelled(e, abortController.signal)) {
        return false;
      }
      console.error(e);
      await this.setAssetPackDownloadStatus(assetPackName, "error", { downloadStartedAt });
      return false;
    } finally {
      removeAssetPackConnectionStatusListener();
      const activeDownload = this.activeAssetPackDownloads.get(assetPackName);
      if (activeDownload?.abortController === abortController) {
        this.activeAssetPackDownloads.delete(assetPackName);
      }
      this.downloadProgressCount.set(null);
    }
  }

  public async cancelAssetPackDownloadByName(assetPackName: string) {
    if (!assetPackName) {
      console.error("[REMOTE ASSETS] Please provide an asset pack name to cancel");
      return false;
    }

    const activeDownload = this.activeAssetPackDownloads.get(assetPackName);
    if (!activeDownload) {
      console.warn(`[REMOTE ASSETS] No active asset pack download to cancel: ${assetPackName}`);
      return false;
    }

    activeDownload.abortController.abort();
    activeDownload.removeConnectionStatusListener();
    this.activeAssetPackDownloads.delete(assetPackName);
    this.downloadProgressCount.set(null);
    await this.setAssetPackDownloadStatus(assetPackName, "cancelled", {
      downloadStartedAt: activeDownload.downloadStartedAt,
    });
    return true;
  }

  private async setAssetPackDownloadStatus(
    assetPackName: string,
    downloadStatus: IAssetPackDownloadStatus,
    timestamps: { downloadStartedAt?: string; downloadCompletedAt?: string } = {}
  ) {
    const downloadStatusUpdatedAt = this.getTimestamp();
    const downloadCompletedAt =
      downloadStatus === "completed"
        ? timestamps.downloadCompletedAt || downloadStatusUpdatedAt
        : "";
    const dbAssetPack: IDBAssetPack = {
      id: assetPackName,
      name: assetPackName,
      download_status: downloadStatus,
      download_started_at: timestamps.downloadStartedAt || downloadStatusUpdatedAt,
      download_completed_at: downloadCompletedAt,
      download_status_updated_at: downloadStatusUpdatedAt,
    };
    return this.dynamicDataService.upsert("data_list", ASSET_PACKS_DATA_LIST, dbAssetPack);
  }

  private getTimestamp() {
    return new Date().toISOString();
  }

  private isOffline() {
    return this.networkService.isOffline();
  }

  private waitForConnection(signal: AbortSignal) {
    return this.networkService.waitUntilConnected(signal);
  }

  private trackAssetPackConnectionStatus(assetPackName: string, downloadStartedAt: string) {
    return this.networkService.onStatusChange((status) => {
      const downloadStatus = status.connected ? "in_progress" : "waiting_for_connection";
      void this.setAssetPackDownloadStatus(assetPackName, downloadStatus, { downloadStartedAt });
    });
  }

  private throwIfDownloadCancelled(signal: AbortSignal) {
    if (!signal.aborted) return;
    const error = new Error("Asset pack download cancelled");
    error.name = "AbortError";
    throw error;
  }

  private isDownloadCancelled(error: unknown, signal?: AbortSignal) {
    return signal?.aborted || (error instanceof Error && error.name === "AbortError");
  }

  /**
   * Construct full path for remote storage, prepending asset pack name if processing an asset pack
   * Keeping the asset pack name out of the relative path allows for referencing a file in authoring to be agnostic about its origin (e.g. core or remote)
   * @param relativePath Relative path to the file
   * @returns Full path including asset pack name if applicable
   */
  private getFullRemotePath(relativePath: string): string {
    return this.currentAssetPackName
      ? `${this.currentAssetPackName}/${relativePath}`
      : relativePath;
  }

  private async downloadAndIntegrateAssetPack(
    assetPackManifest: FlowTypes.AssetPack,
    signal: AbortSignal
  ) {
    try {
      this.currentAssetPackName = assetPackManifest.flow_name;
      const assetEntries = assetPackManifest.rows as IAssetEntry[];

      // If running on native device, download assets and populate to filesystem, adding local
      // filesystem path to asset entry in contents list for consumption by template asset service
      if (Capacitor.isNativePlatform()) {
        // TODO: implement queue system for downloads (see template-action service, or use of 3rd party p-queue elsewhere)
        for (const [index, assetEntry] of assetEntries.entries()) {
          this.throwIfDownloadCancelled(signal);
          await this.handleAssetDownload(assetEntry, index, assetEntries.length, signal);
        }
      }

      // On web, update contents list with asset's public URL for consumption by template asset service
      // (files will be served remotely via provider CDN)
      else {
        for (const [index, assetEntry] of assetEntries.entries()) {
          this.throwIfDownloadCancelled(signal);
          console.log(
            `[REMOTE ASSETS] Processing asset entry ${index + 1} of ${assetEntries.length}.`
          );
          await this.addRemoteFilepathToAssetContentsEntry(assetEntry, signal);
        }
      }
    } finally {
      this.currentAssetPackName = null;
    }
  }

  /**
   * Download the asset pack manifest for a named asset pack from the remote provider and store the result in this.manifest
   */
  private async getAssetPackManifest(assetPackName: string) {
    const relativePath = `${assetPackName}/${assetPackName}.json`;
    this.manifest = null;

    try {
      console.log(`[REMOTE ASSETS] Downloading manifest for asset pack: ${assetPackName}`);

      // Use provider's downloadFileAsText method to handle different blob formats (Firebase data URLs vs Supabase regular blobs)
      const jsonText = await this.provider.downloadFileAsText(relativePath);

      if (jsonText) {
        this.manifest = JSON.parse(jsonText);
        console.log("[REMOTE ASSETS] Manifest loaded", this.manifest);
      } else {
        console.error(`[REMOTE ASSETS] Failed to download manifest for ${assetPackName}`);
      }
    } catch (error) {
      console.error(`[REMOTE ASSETS] Error downloading manifest for ${assetPackName}:`, error);
      this.manifest = null;
    }

    return this.manifest;
  }

  /**
   * TODO: generate a manifest of files to download. E.g. by comparing which assets are
   * available locally to a manifest of required assets (e.g. deepDiffObjects()?).
   * Return a dummy manifest for now
   */
  private generateManifest(): FlowTypes.AssetPack {
    const manifest = {
      flow_type: "asset_pack",
      flow_name: "debug_asset_pack_1",
      rows: [
        {
          id: "debug_asset_pack_1/test_image.png",
          md5Checksum: "e6d6c6a12ca13a6277084e01c088378c",
          size_kb: 2,
        },
        {
          id: "debug_asset_pack_1/test_image_2.png",
          md5Checksum: "52ec3256ba473e6a19987b4d766bc5f9",
          size_kb: 6.5,
        },
        {
          id: "debug_asset_pack_1/test_remote_only.png",
          md5Checksum: "dcb0c69c2e0bcb696086dffca903b7f5",
          size_kb: 14.2,
        },
      ],
    };
    return manifest as FlowTypes.AssetPack;
  }

  /**
   * Native platforms only:
   * Download an asset from an asset pack, including any overrides,
   * and update the contents list so that the filepath is the path to the file in local storage
   */
  private async handleAssetDownload(
    assetEntry: IAssetEntry,
    fileIndex: number,
    totalFiles?: number,
    signal?: AbortSignal
  ) {
    // Download the top level asset, unless overridesOnly is specified
    if (!assetEntry.overridesOnly) {
      try {
        await this.downloadAssetAndUpdateContentsList(
          assetEntry.id,
          assetEntry,
          fileIndex,
          totalFiles,
          signal
        );
      } catch (error) {
        if (this.isDownloadCancelled(error, signal)) throw error;
        console.error(error);
      }
    }

    const { overrides } = assetEntry;
    if (overrides) {
      for (const [themeName, languageOverrides] of Object.entries(overrides)) {
        for (const [languageCode, assetContentsEntry] of Object.entries(languageOverrides)) {
          const overrideProps = { themeName, languageCode };
          try {
            await this.downloadAssetAndUpdateContentsList(
              assetContentsEntry.filePath,
              assetEntry,
              fileIndex,
              totalFiles,
              signal,
              overrideProps
            );
          } catch (error) {
            if (this.isDownloadCancelled(error, signal)) throw error;
            console.error(error);
          }
        }
      }
    }
  }

  /**
   * Web platform only:
   * Update the contents list with the contents of an asset pack, including any overrides,
   * updating filepath to be a public remote provider CDN URL
   */
  public async addRemoteFilepathToAssetContentsEntry(
    assetEntry: IAssetEntry,
    signal?: AbortSignal
  ) {
    if (signal) this.throwIfDownloadCancelled(signal);
    // Update the contents entry for the top level asset, unless overridesOnly is specified
    if (!assetEntry.overridesOnly) {
      const topLevelAssetUrl =
        this.provider.getPublicUrl(this.getFullRemotePath(assetEntry.id)) || "";
      await this.updateAssetContents(assetEntry, topLevelAssetUrl);
      if (signal) this.throwIfDownloadCancelled(signal);
      this.incrementDownloadProgress();
    }
    const { overrides } = assetEntry;
    if (overrides) {
      for (const [themeName, languageOverrides] of Object.entries(overrides)) {
        for (const [languageCode, overrideAssetEntry] of Object.entries(languageOverrides)) {
          const overrideProps = { themeName, languageCode };
          const filepath =
            this.provider.getPublicUrl(this.getFullRemotePath(overrideAssetEntry.filePath)) || "";
          await this.updateAssetContents(assetEntry, filepath, overrideProps);
          if (signal) this.throwIfDownloadCancelled(signal);
          this.incrementDownloadProgress();
        }
      }
    }
  }

  /**
   * Native platforms only:
   * Download a single asset from an asset pack, save to local native storage and update the assets contents list
   * */
  private async downloadAssetAndUpdateContentsList(
    relativePath: string,
    assetEntry: IAssetEntry,
    fileIndex: number,
    totalFiles?: number,
    signal?: AbortSignal,
    overrideProps?: IAssetOverrideProps
  ) {
    console.log(`[REMOTE ASSETS] Downloading file ${fileIndex + 1} of ${totalFiles || "?"}`);

    try {
      if (signal) this.throwIfDownloadCancelled(signal);
      // Use provider's direct download method
      const blob = await this.provider.downloadFile(this.getFullRemotePath(relativePath));
      if (signal) this.throwIfDownloadCancelled(signal);

      if (blob) {
        let targetPath = assetEntry.id;

        // For overrides, use the nested override filepath as the path to save the file in local storage
        if (overrideProps) {
          const { themeName, languageCode } = overrideProps;
          const overrideAssetEntry = assetEntry.overrides[themeName][languageCode];
          targetPath = overrideAssetEntry.filePath;
        }

        const { src } = await this.fileManagerService.saveFile({ data: blob, targetPath });
        if (signal) this.throwIfDownloadCancelled(signal);
        await this.updateAssetContents(assetEntry, src, overrideProps);
        if (signal) this.throwIfDownloadCancelled(signal);
        console.log(`[REMOTE ASSETS] File ${fileIndex + 1} of ${totalFiles} downloaded to cache`);
        this.incrementDownloadProgress();
      } else {
        console.error(`[REMOTE ASSETS] Failed to download ${relativePath}`);
      }
    } catch (error) {
      if (this.isDownloadCancelled(error, signal)) throw error;
      console.error(`[REMOTE ASSETS] Error downloading ${relativePath}:`, error);
    }
  }

  /**
   * Save updates to asset contents in dynamic data, including file path
   * (filepath should be local storage on native platforms and remote provider URL on web)
   * */
  private async updateAssetContents(
    assetEntry: IAssetEntry,
    filepath: string,
    overrideProps?: IAssetOverrideProps
  ) {
    const update = this.addFilePathToAssetEntry(assetEntry, filepath, overrideProps);
    // Update the asset contents pack in dynamic data, adding an entry for the asset or
    // updating an existing entry if it already exists
    await this.dynamicDataService.update<IAssetEntry & { id: string }>(
      "asset_pack",
      ASSET_CONTENTS_DATA_LIST,
      assetEntry.id,
      update,
      { upsert: true }
    );
  }

  private addFilePathToAssetEntry(
    assetEntry: IAssetEntry,
    filePath: string,
    overrideProps?: IAssetOverrideProps
  ): IAssetEntry {
    // In the case that the asset is an override, add the new filepath to the nested override entry
    if (overrideProps) {
      const { themeName, languageCode } = overrideProps;
      const update = {
        overrides: {
          [themeName]: {
            [languageCode]: {
              filePath,
            },
          },
        },
      };
      // Deep clone to ensure mutable object before merging (RxDB objects are immutable)
      const mutableAssetEntry = JSON.parse(JSON.stringify(assetEntry));
      return deepMergeObjects(mutableAssetEntry, update);
    } else {
      return { ...assetEntry, filePath };
    }
  }

  /** A general function to download a file from a URL */
  private downloadFileFromUrl(
    url: string,
    responseType: "blob" | "base64" = "base64",
    headers = {}
  ) {
    // Always use direct HTTP download since providers don't handle this directly
    // If downloading from local assets ignore cache
    if (!url.startsWith("http")) {
      headers = {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
        ...headers,
      };
    }

    // subscribe and share updates
    let subscription = new Subscription();
    let progress = 0;
    let data: Blob | string;

    // share initial update with request and subscription objects to allow dl interrupt via unsubscribe method
    const updates$ = new BehaviorSubject<{
      progress: number;
      subscription: Subscription;
      data?: Blob | string;
    }>({ progress, subscription });

    subscription = this.http
      .get(url, {
        responseType: "blob",
        reportProgress: true,
        headers,
        observe: "events",
      })
      .subscribe({
        error: (err) => updates$.error(err),
        next: async (event) => {
          // handle progress update
          if (event.type === HttpEventType.DownloadProgress) {
            if (event.total) {
              progress = Math.round((100 * event.loaded) / event.total);
            }
          }
          // handle full response received
          if (event.type === HttpEventType.Response) {
            data = event.body as Blob;
          }
          updates$.next({ progress, subscription, data });
        },
        complete: async () => {
          if (responseType === "base64") {
            data = await convertBlobToBase64(data as Blob);
          }
          updates$.next({ progress: 100, data, subscription });
          updates$.complete();
        },
      });
    return updates$;
  }

  /**
   * Download from a private bucket using the provider method. Not currently used.
   * NB this method does not support tracking download progress
   * */
  public async downloadFileFromPrivateBucket(filepath: string) {
    if (!this.provider) {
      console.error("[REMOTE ASSETS] No provider available for private bucket download");
      return null;
    }

    try {
      this.downloading = true;
      const data = await this.provider.downloadFileFromPrivateBucket(
        this.getFullRemotePath(filepath)
      );
      if (data) {
        console.log("blob:", data);
      }
      return data;
    } catch (error) {
      console.error("[REMOTE ASSETS] Error downloading from private bucket:", error);
      return null;
    } finally {
      this.downloading = false;
    }
  }

  /**
   * Reset asset pack contents and metadata to their original state before any remote assets were downloaded.
   * Useful when testing. TODO: Also delete any downloaded assets from the device
   * */
  private async reset() {
    await this.cancelActiveAssetPackDownloads();
    await Promise.all([
      this.dynamicDataService.resetFlow("asset_pack", ASSET_CONTENTS_DATA_LIST),
      this.dynamicDataService.resetFlow("data_list", ASSET_PACKS_DATA_LIST),
    ]);
  }

  private async cancelActiveAssetPackDownloads() {
    const activeAssetPackNames = [...this.activeAssetPackDownloads.keys()];
    if (activeAssetPackNames.length === 0) {
      console.log("[REMOTE ASSETS] No active asset pack downloads to cancel");
      return;
    }
    await Promise.all(
      activeAssetPackNames.map((assetPackName) => this.cancelAssetPackDownloadByName(assetPackName))
    );
  }

  ngOnDestroy(): void {
    if (this.assetContentsSubscription) {
      this.assetContentsSubscription.unsubscribe();
    }
  }

  private incrementDownloadProgress() {
    const progress = this.downloadProgressCount();
    if (!progress) return;
    const completed = Math.min(progress.completed + 1, progress.total);
    this.downloadProgressCount.set({ ...progress, completed });
  }

  private countDownloadFiles(assetEntries: IAssetEntry[] = []) {
    let total = 0;
    for (const assetEntry of assetEntries) {
      // Count base entry unless marked overridesOnly
      if (!assetEntry.overridesOnly) {
        total += 1;
      }
      const { overrides } = assetEntry;
      if (overrides) {
        for (const themeOverrides of Object.values(overrides)) {
          total += Object.keys(themeOverrides).length;
        }
      }
    }
    return total;
  }
}
