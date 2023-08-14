import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Capacitor } from "@capacitor/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "src/environments/environment";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { IAppConfig } from "../../model";
import { AppConfigService } from "../app-config/app-config.service";
import { FileManagerService } from "../file-manager/file-manager.service";
import { IAssetContents } from "src/app/data";
import { BehaviorSubject, Subject, Subscription, lastValueFrom } from "rxjs";
import { TemplateAssetService } from "../../components/template/services/template-asset.service";
import { AsyncServiceBase } from "../asyncService.base";

@Injectable({
  providedIn: "root",
})
export class RemoteAssetService extends AsyncServiceBase {
  remoteAssetsEnabled: boolean;
  bucketName: string;
  folderName: string;
  supabase: SupabaseClient;
  downloading: boolean = false;
  downloadProgress: number;

  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private appConfigService: AppConfigService,
    private fileManagerService: FileManagerService,
    private templateAssetService: TemplateAssetService,
    private http: HttpClient
  ) {
    super("RemoteAsset");
    this.registerInitFunction(this.initialise);
  }

  private async initialise() {
    // require supabase to be configured to use remote asset service
    const { enabled: supabaseEnabled, publicApiKey, url } = environment.deploymentConfig.supabase;
    if (supabaseEnabled) {
      await this.ensureAsyncServicesReady([this.templateAssetService]);
      this.ensureSyncServicesReady([this.appConfigService, this.fileManagerService]);
      this.subscribeToAppConfigChanges();
      if (this.remoteAssetsEnabled) {
        this.supabase = createClient(url, publicApiKey);
        this.registerTemplateActionHandlers();
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
            await this.downloadAndPopulateRequiredAssets();
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
      // On web, add asset's public URL to contents list for consumption by template asset service
      else {
        console.log(
          `[REMOTE ASSETS] Fetching remote URL for ${index + 1} of ${relativePaths.length} files.`
        );
        this.templateAssetService.updateContentsList(relativePath, { uri: url });
      }
    }
  }

  private generateManifest(): IAssetContents {
    // TODO: Check config and download relevant manifest of expected files, compare
    // this to manifest of cached files, and generate a manifest of files to download.
    // Return dummy manifest for now
    const manifest: IAssetContents = {
      "debug_asset_pack/test_image.png": {
        size_kb: 2,
        md5Checksum: "e6d6c6a12ca13a6277084e01c088378c",
      },
      "debug_asset_pack/example_asset.png": {
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
          await this.templateAssetService.updateContentsList(relativePath, {
            uri: filesystemPath,
          });
        }
        progress$.next(progress);
        progress$.complete();
      },
    });
    return progress$;
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
