import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Capacitor } from "@capacitor/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { FileObject } from "@supabase/storage-js";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { FlowTypes, IAppConfig } from "../../model";
import { AppConfigService } from "../app-config/app-config.service";
import { FileManagerService } from "../file-manager/file-manager.service";
import { IAssetContents } from "src/app/data";
import { BehaviorSubject, Subject, Subscription, lastValueFrom } from "rxjs";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { TemplateAssetService } from "../../components/template/services/template-asset.service";
import { AsyncServiceBase } from "../asyncService.base";
import type { IAssetEntry, IAssetOverrideProps } from "packages/data-models";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { arrayToHashmap, convertBlobToBase64, deepMergeObjects } from "../../utils";
import { DeploymentService } from "../deployment/deployment.service";

const CORE_ASSET_PACK_NAME = "core_assets";

@Injectable({
  providedIn: "root",
})
export class RemoteAssetService extends AsyncServiceBase {
  remoteAssetsEnabled: boolean;
  supabaseEnabled: boolean;
  bucketName: string;
  folderName: string;
  supabase: SupabaseClient;
  downloading: boolean = false;
  downloadProgress: number;
  manifest: FlowTypes.AssetPack;

  constructor(
    private appConfigService: AppConfigService,
    private appDataService: AppDataService,
    private dynamicDataService: DynamicDataService,
    private fileManagerService: FileManagerService,
    private templateAssetService: TemplateAssetService,
    private templateActionRegistry: TemplateActionRegistry,
    private http: HttpClient,
    private deploymentService: DeploymentService
  ) {
    super("RemoteAsset");
    this.registerInitFunction(this.initialise);
  }

  private async initialise() {
    this.registerTemplateActionHandlers();
    // require supabase to be configured to use remote asset service
    const { enabled, publicApiKey, url } = this.deploymentService.config.supabase;
    this.supabaseEnabled = enabled;
    if (this.supabaseEnabled) {
      await this.ensureAsyncServicesReady([this.templateAssetService, this.dynamicDataService]);
      this.ensureSyncServicesReady([
        this.appConfigService,
        this.appDataService,
        this.fileManagerService,
      ]);
      this.subscribeToAppConfigChanges();
      if (this.remoteAssetsEnabled) {
        this.supabase = createClient(url, publicApiKey);
        const { flow_type, flow_name } = this.generateCoreAssetPack(
          this.templateAssetService.assetsContentsList$.value
        );
        // Share updates to asset contents list with template asset service for lookup
        // TODO?: only watch for nested changes rather than replacing whole list
        const obs = this.dynamicDataService.query$(flow_type, flow_name);
        obs.subscribe((dataRows) => {
          const assetContentsHashmap = arrayToHashmap(dataRows, "id") as IAssetContents;
          this.templateAssetService.updateContentsList(assetContentsHashmap);
        });
      }
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
            if (this.supabaseEnabled && this.remoteAssetsEnabled) {
              const assetPackName = assetPackArgs[0];
              if (assetPackName) {
                try {
                  await lastValueFrom(this.getAssetPackManifest(assetPackName));
                  await this.downloadAndIntegrateAssetPack(this.manifest);
                } catch (e) {
                  console.error(e);
                }
              } else {
                console.error("[REMOTE ASSETS] Please provide an asset pack name to download");
                // TODO: Implement default behaviour of generating a manifest of files to download in case of no named asset pack
                // (e.g. look at what files are available locally vs required in accordance with current app config)
                // const assetPackManifest = this.generateManifest()
                // await this.downloadAndIntegrateAssetPack(assetPackManifest)
              }
            } else
              console.error(
                "The 'asset_pack: download' action is not available. To enable asset pack functionality, please ensure that supabase and ASSET_PACKS are enabled in the deployment config."
              );
          },
          reset: async () => {
            if (this.supabaseEnabled && this.remoteAssetsEnabled) {
              await this.reset();
            } else
              console.error(
                "The 'asset_pack: reset' action is not available. To enable asset pack functionality, please ensure that supabase and ASSET_PACKS are enabled in the deployment config."
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

  private subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      const { enabled, bucketName, folderName } = appConfig.ASSET_PACKS;
      this.remoteAssetsEnabled = enabled;
      this.bucketName = bucketName;
      this.folderName = folderName;
    });
  }

  /**
   * Convert the asset contents generated by the post-processor into asset_pack format,
   * and write to appData cache for lookup by dynamic data service
   * */
  private generateCoreAssetPack(assetsContentsList: IAssetContents) {
    const contentsArray = [];
    for (const [relativePath, assetEntry] of Object.entries(assetsContentsList)) {
      contentsArray.push({ id: relativePath, ...assetEntry });
    }
    const coreAssetPack: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: CORE_ASSET_PACK_NAME,
      rows: contentsArray,
    };
    // This will apply additional processing to to the asset pack data list, i.e. adding the rowsHashMap field
    this.appDataService.addRuntimeFlowToContents(coreAssetPack);
    return coreAssetPack;
  }

  /************************************************************************************
   *  Download methods
   ************************************************************************************/
  private async downloadAndIntegrateAssetPack(assetPackManifest: FlowTypes.AssetPack) {
    const assetEntries = assetPackManifest.rows as IAssetEntry[];

    // If running on native device, download assets and populate to filesystem, adding local
    // filesystem path to asset entry in contents list for consumption by template asset service
    if (Capacitor.isNativePlatform()) {
      // TODO: implement queue system for downloads (see template-action service, or use of 3rd party p-queue elsewhere)
      for (const [index, assetEntry] of assetEntries.entries()) {
        await this.handleAssetDownload(assetEntry, index, assetEntries.length);
      }
    }

    // On web, update contents list with asset's public URL for consumption by template asset service
    // (files will be served remotely via supabse CDN)
    else {
      for (const [index, assetEntry] of assetEntries.entries()) {
        console.log(
          `[REMOTE ASSETS] Fetching remote URL for ${index + 1} of ${assetEntries.length} files.`
        );
        await this.addRemoteFilepathToAssetContentsEntry(assetEntry);
      }
    }
  }

  /**
   * Download the asset pack manifest for a named asset pack from supabase and store the result in this.manifest
   */
  private getAssetPackManifest(assetPackName: string) {
    let data: Blob;
    let progress: number;
    const url = this.getPublicUrl(`${assetPackName}/${assetPackName}.json`);
    const progress$ = new Subject<number>();
    this.downloadFileFromUrl(url, "blob").subscribe({
      error: (err) => {
        this.downloadProgress = undefined;
        progress$.error(err);
      },
      next: async (res) => {
        data = res.data as Blob;
        progress = res.progress;
        console.log(`[REMOTE ASSETS] Downloading: ${progress}%`);
        progress$.next(progress);
      },
      complete: async () => {
        console.log(`[REMOTE ASSETS] Manifest file downloaded for asset pack: ${assetPackName}`);
        if (data) {
          this.manifest = JSON.parse(await data.text());
          console.log("[REMOTE ASSETS] Manifest loaded", this.manifest);
        }
        progress$.next(progress);
        progress$.complete();
      },
    });
    return progress$;
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
    totalFiles?: number
  ) {
    // Download the top level asset, unless overridesOnly is specified
    if (!assetEntry.overridesOnly) {
      const topLevelAssetUrl = this.getPublicUrl(assetEntry.id);
      try {
        await lastValueFrom(
          this.downloadAssetAndUpdateContentsList(
            topLevelAssetUrl,
            assetEntry,
            fileIndex,
            totalFiles
          )
        );
      } catch (error) {
        console.error(error);
      }
    }

    const { overrides } = assetEntry;
    if (overrides) {
      for (const [themeName, languageOverrides] of Object.entries(overrides)) {
        for (const [languageCode, assetContentsEntry] of Object.entries(languageOverrides)) {
          const assetUrl = this.getPublicUrl(assetContentsEntry.filePath);
          const overrideProps = { themeName, languageCode };
          try {
            await lastValueFrom(
              this.downloadAssetAndUpdateContentsList(
                assetUrl,
                assetEntry,
                fileIndex,
                totalFiles,
                overrideProps
              )
            );
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
  }

  /**
   * Web platform only:
   * Update the contents list with the contents of an asset pack, including any overrides,
   * updating filepath to be a public supabase CDN URL
   */
  public async addRemoteFilepathToAssetContentsEntry(assetEntry: IAssetEntry) {
    // Update the contents entry for the top level asset, unless overridesOnly is specified
    if (!assetEntry.overridesOnly) {
      const topLevelAssetUrl = this.getPublicUrl(assetEntry.id);
      await this.updateAssetContents(assetEntry, topLevelAssetUrl);
    }
    const { overrides } = assetEntry;
    if (overrides) {
      for (const [themeName, languageOverrides] of Object.entries(overrides)) {
        for (const [languageCode, overrideAssetEntry] of Object.entries(languageOverrides)) {
          const overrideProps = { themeName, languageCode };
          const filepath = this.getPublicUrl(overrideAssetEntry.filePath);
          await this.updateAssetContents(assetEntry, filepath, overrideProps);
        }
      }
    }
  }

  /**
   * Native platforms only:
   * Download a single asset from an asset pack, save to local native storage and update the assets contents list
   * */
  private downloadAssetAndUpdateContentsList(
    url: string,
    assetEntry: IAssetEntry,
    fileIndex: number,
    totalFiles?: number,
    overrideProps?: IAssetOverrideProps
  ) {
    console.log(
      `[REMOTE ASSETS] Downloading file ${fileIndex + 1} of ${totalFiles || "?"}: ${this.downloadProgress}%`
    );
    let data: Blob;
    let progress: number;
    // create a new subject to subscribe from inner observable
    const progress$ = new Subject<number>();
    this.downloadFileFromUrl(url, "blob").subscribe({
      error: (err) => {
        this.downloadProgress = undefined;
        progress$.error(err);
      },
      next: async (res) => {
        data = res.data as Blob;
        progress = res.progress;
        console.log(`[REMOTE ASSETS] Downloading: ${progress}%`);
        progress$.next(progress);
      },
      complete: async () => {
        console.log(`[REMOTE ASSETS] File ${fileIndex + 1} of ${totalFiles} downloaded to cache`);
        if (data) {
          let targetPath = assetEntry.id;

          // For overrides, use the nested override filepath as the path to save the file in local storage
          if (overrideProps) {
            const { themeName, languageCode } = overrideProps;
            const overrideAssetEntry = assetEntry.overrides[themeName][languageCode];
            targetPath = overrideAssetEntry.filePath;
          }
          const { src } = await this.fileManagerService.saveFile({ data, targetPath });
          await this.updateAssetContents(assetEntry, src, overrideProps);
        }
        progress$.next(progress);
        progress$.complete();
      },
    });
    return progress$;
  }

  /**
   * Save updates to asset contents in dynamic data, including file path
   * (filepath should be local storage on native platforms and supabase URL on web)
   * */
  private async updateAssetContents(
    assetEntry: IAssetEntry,
    filepath: string,
    overrideProps?: IAssetOverrideProps
  ) {
    const update = this.addFilePathToAssetEntry(assetEntry, filepath, overrideProps);
    // Update the core asset pack in dynamic data, adding an entry for the asset or
    // updating an existing entry if it already exists
    await this.dynamicDataService.update<IAssetEntry>(
      "asset_pack",
      CORE_ASSET_PACK_NAME,
      assetEntry.id,
      update
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
      return deepMergeObjects(assetEntry, update);
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
   * Download from a private supabase bucket using the SDK method. Not currently used.
   * NB this method does not support tracking download progress
   * */
  public async downloadFileFromPrivateBucket(filepath: string) {
    let data: Blob;
    try {
      this.downloading = true;
      const { data: blob, error } = await this.supabase.storage
        .from(this.bucketName)
        .download(filepath);
      if (error) {
        throw error;
      }
      if (blob) {
        data = blob;
        console.log("blob:", data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.downloading = false;
      return data;
    }
  }

  /**
   * Reset the core asset pack contents to its original state before any remote assets were downloaded.
   * Useful when testing. TODO: Also delete any downloaded assets from the device
   * */
  private async reset() {
    await this.dynamicDataService.resetFlow("asset_pack", CORE_ASSET_PACK_NAME);
  }

  /************************************************************************************
   *  Download method utils
   ************************************************************************************/

  /** Get a file's public supabase URL */
  private getPublicUrl(relativePath: string) {
    let url = "";
    try {
      const {
        data: { publicUrl },
      } = this.supabase.storage
        .from(this.bucketName)
        .getPublicUrl(this.getSupabaseFilepath(relativePath));
      if (publicUrl) {
        url = publicUrl;
      }
    } catch (error) {
      console.error(error);
    } finally {
      return url;
    }
  }

  /** Fetch metadata for a specific file from supabase */
  private async getRemoteFileMetadata(relativePath: string): Promise<FileObject> {
    const pathSegments = relativePath.split("/");
    const fileName = pathSegments.pop();
    const dirname = pathSegments.join("/");

    const { data } = await this.supabase.storage
      .from(this.bucketName)
      .list(`${this.folderName}/${dirname}`);
    const fileObject = data.find((element) => element.name === fileName);
    return fileObject;
  }

  /** Convert base filepath to match supabase storage folder structure */
  private getSupabaseFilepath(relativePath: string) {
    return `${this.folderName}/${relativePath}`;
  }
}
