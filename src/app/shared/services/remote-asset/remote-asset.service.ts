import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Capacitor } from "@capacitor/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { FileObject } from "@supabase/storage-js";
import { environment } from "src/environments/environment";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { IAppConfig } from "../../model";
import { AppConfigService } from "../app-config/app-config.service";
import { FileManagerService } from "../file-manager/file-manager.service";
import { IAssetContents } from "src/app/data";
import { BehaviorSubject, Subject, Subscription, lastValueFrom } from "rxjs";
import { TemplateAssetService } from "../../components/template/services/template-asset.service";
import { AsyncServiceBase } from "../asyncService.base";
import { IAssetEntry } from "packages/data-models/deployment.model";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { arrayToHashmap, deepDiffObjects } from "../../utils";

// For testing, use a specified asset pack name
const ASSET_PACK_NAME = "debug_asset_pack";

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

  constructor(
    private appConfigService: AppConfigService,
    private dynamicDataService: DynamicDataService,
    private fileManagerService: FileManagerService,
    private templateAssetService: TemplateAssetService,
    private templateActionRegistry: TemplateActionRegistry,
    private http: HttpClient
  ) {
    super("RemoteAsset");
    this.registerInitFunction(this.initialise);
  }

  private async initialise() {
    this.registerTemplateActionHandlers();
    // require supabase to be configured to use remote asset service
    const { enabled, publicApiKey, url } = environment.deploymentConfig.supabase;
    this.supabaseEnabled = enabled;
    if (this.supabaseEnabled) {
      await this.ensureAsyncServicesReady([this.templateAssetService, this.dynamicDataService]);
      this.ensureSyncServicesReady([this.appConfigService, this.fileManagerService]);
      this.subscribeToAppConfigChanges();
      if (this.remoteAssetsEnabled) {
        this.supabase = createClient(url, publicApiKey);

        // Share updates to asset contents list with template asset service for lookup
        const obs = await this.dynamicDataService.query$("asset_pack", "required_assets");
        obs.subscribe((dataRows) => {
          const assetContentsHashmap = arrayToHashmap(dataRows, "id") as IAssetContents;
          this.templateAssetService.updateContentsList(assetContentsHashmap);
          console.log("asset contents list", this.templateAssetService.assetsContentsList$.value);
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
        const [actionId] = args;
        const childActions = {
          download: async () => {
            if (this.supabaseEnabled && this.remoteAssetsEnabled) {
              await this.downloadAndPopulateRequiredAssets();
            } else
              console.error(
                "The 'asset_pack: download' action is not available. To enable asset pack functionality, please ensure that supabase and ASSET_PACKS are enabled in the deployment config."
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

  /************************************************************************************
   *  Download methods
   ************************************************************************************/
  async downloadAndPopulateRequiredAssets() {
    // Get manifest of files to download
    const manifest = this.generateManifest();
    const relativePaths = Object.keys(manifest);
    // TODO: implement queue system for downloads (see template-action service, or use of 3rd party p-queue elsewhere)
    for (const [index, relativePath] of relativePaths.entries()) {
      const url = this.getPublicUrl(relativePath);
      // If running on native device, download assets and populate to filesystem, adding local
      // filesystem path to asset entry in contents list for consumption by template asset service
      if (Capacitor.isNativePlatform()) {
        await lastValueFrom(
          this.handleDownload(url, relativePath, index, relativePaths.length)
        ).catch((error) => console.error(error));
      }
      // On web, update contents list with asset's public URL for consumption by template asset service
      else {
        console.log(
          `[REMOTE ASSETS] Fetching remote URL for ${index + 1} of ${relativePaths.length} files.`
        );
        this.updateAssetContents(relativePath);
      }
    }
  }

  private generateManifest(): IAssetContents {
    /**
     * Return dummy manifest for now
     * TODO: get manifest of files to download. Either by directly reading an asset_pack manifest file,
     * or by comparing which assets are available to the app to a manifest of required assets (e.g. deepDiffObjects()?)
     */
    const manifest: IAssetContents = {
      [`${ASSET_PACK_NAME}/test_image.png`]: {
        size_kb: 2,
        md5Checksum: "e6d6c6a12ca13a6277084e01c088378c",
      },
      [`${ASSET_PACK_NAME}/test_image_2.png`]: {
        size_kb: 2,
        md5Checksum: "e6d6c6a12ca13a6277084e01c088378c",
      },
    };
    return manifest;
  }

  /**
   * Download a single asset from an array of assets,
   * save to local storage and update the assets contents list
   * */
  handleDownload(url: string, relativePath: string, fileIndex: number, totalFiles: number) {
    console.log(
      `[REMOTE ASSETS] Downloading file ${fileIndex + 1} of ${totalFiles}: ${
        this.downloadProgress
      }%`
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
          const filesystemPath = await this.fileManagerService.saveFile(data, relativePath);
          await this.updateAssetContents(relativePath);
        }
        progress$.next(progress);
        progress$.complete();
      },
    });
    return progress$;
  }

  /**
   * Fetch file info (from local storage on native platforms and supabase on web)
   * and save updates to asset contents in dynamic data.
   * */
  private async updateAssetContents(relativePath: string) {
    let update: Partial<IAssetEntry> = {};
    // On native platforms, get the path of the local file in storage and the actual size of the downloaded file
    if (Capacitor.isNativePlatform()) {
      update = await this.fileManagerService.generateAssetContentsEntry(relativePath);
    }
    // On web, get the remote URL of the file and the size from supabase's metadata
    else {
      const url = this.getPublicUrl(relativePath);
      const {
        metadata: { size },
      } = await this.getRemoteFileMetadata(relativePath);
      update = {
        filePath: url,
        size_kb: Math.round(size / 102.4) / 10,
      };
    }
    await this.dynamicDataService.update<IAssetEntry>(
      "asset_pack",
      "required_assets",
      relativePath,
      update
    );
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
            data = await this.convertBlobToBase64(data as Blob);
          }
          updates$.next({ progress: 100, data, subscription });
          updates$.complete();
        },
      });
    return updates$;
  }

  /** Download from a private supabase bucket using the SDK method. NB this method does not support tracking download progress */
  async downloadFileFromPrivateBucket(filepath: string) {
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

  /************************************************************************************
   *  Download method utils
   ************************************************************************************/

  /** Get a file's public supabase URL */
  getPublicUrl(relativePath: string) {
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

  async getRemoteFileMetadata(relativePath: string): Promise<FileObject> {
    const pathSegments = relativePath.split("/");
    const fileName = pathSegments.pop();
    const dirname = pathSegments.join("/");

    // const dirname = relativePath.substring(0, relativePath.lastIndexOf("/"))
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

  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}
