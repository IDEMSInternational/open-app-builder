import { Injectable } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Capacitor } from "@capacitor/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "src/environments/environment";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { IAppConfig } from "../../model";
import { AppConfigService } from "../app-config/app-config.service";
import { FileManagerService } from "../file-manager/file-manager.service";
import { SyncServiceBase } from "../syncService.base";
import { IAssetContents } from "src/app/data";
import { BehaviorSubject, Subject, Subscription } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RemoteAssetService extends SyncServiceBase {
  remoteAssetsEnabled: boolean;
  bucketName: string;
  folderName: string;
  supabase: SupabaseClient;
  downloading: boolean = false;
  blob: Blob;
  private currentDownload$?: Subscription;
  downloadProgress: number;

  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private appConfigService: AppConfigService,
    private fileManagerService: FileManagerService,
    private http: HttpClient
  ) {
    super("RemoteAsset");
    this.initialise();
  }

  private initialise() {
    // require supabase to be configured to use remote asset service
    const { enabled: supabaseEnabled, publicApiKey, url } = environment.deploymentConfig.supabase;
    if (supabaseEnabled && this.remoteAssetsEnabled) {
      this.supabase = createClient(url, publicApiKey);
      this.subscribeToAppConfigChanges();
      this.registerTemplateActionHandlers();
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
    // Proposed steps:

    // 1.
    // Check config and download relevant manifest of expected files
    // Generate manifest of locally available files
    // Compare these, and generate a manifest of files to download
    const manifest = this.generateManifest();

    // 2. For each file:
    // a) download file from supabase
    // b) populate to respective folder
    // c) update the assets contents list to include the file's URI for lookup
    for (const [relativePath, assetEntry] of Object.entries(manifest)) {
      // // Imperative version
      // let uri = "";
      // if (Capacitor.isNativePlatform()) {
      //   const blob = await this.downloadFileFromPrivateBucket(relativePath);
      //   console.log("blob:", blob);
      //   if (blob) {
      //     uri = await this.fileManagerService.saveFile(blob, relativePath);
      //   } else {
      //     console.error("Failed to download resource");
      //   }
      // } else {
      //   uri = this.getPublicUrl(relativePath);
      // }
      // console.log("uri:", uri);
      // if (uri) {
      //   await this.fileManagerService.updateContentsList(relativePath, uri);
      // }

      // If running on native device, download assets and populate to filesystem, adding local
      // filesystem path to asset entry in contents list for consumption by template asset service
      if (Capacitor.isNativePlatform()) {
        this.downloadProgress = 0;
        this.downloadFileFromPublicBucket(relativePath).subscribe({
          next: ({ progress, subscription }) => {
            this.currentDownload$ = subscription;
            this.downloadProgress = progress;
          },
          error: (err) => {
            console.error(err);
            this.downloadProgress = undefined;
            // TODO - show error message
            throw err;
          },
          complete: () => {
            this.downloadProgress = undefined;
          },
        });
      }
      // Else, add link to public URL to contents list for consumption by template asset service
      else {
        this.fileManagerService.updateContentsList(relativePath, {
          url: this.getPublicUrl(relativePath),
        });
      }
    }
  }

  private generateManifest() {
    // Return dummy manifest for now
    const manifest = {
      "quality_assurance/test_image.png": {
        size_kb: 2,
        md5Checksum: "e6d6c6a12ca13a6277084e01c088378c",
      },
    };
    // const manifest = [{ path: "quality_assurance/test_image.png" }]
    return manifest as IAssetContents;
  }

  /** Supabase buckets which are public do not support the SDK download method */
  downloadFileFromPublicBucket(filepath: string) {
    const publicUrl = this.getPublicUrl(filepath);
    let data: Blob;
    let subscription: Subscription;
    let progress: number;
    // create a new subject to subscribe from inner observable
    const updates$ = new Subject<{
      progress: number;
      subscription: Subscription;
      filesystemPath?: string;
    }>();
    // call file download subscription, passing values to top observable
    // TODO - might be tidier way to manage nested observables (e.g. map/switchmap/mergemap op)
    this.downloadFileFromUrl(publicUrl, "blob").subscribe({
      error: (err) => updates$.error(err),
      next: async (res) => {
        data = res.data as Blob;
        subscription = res.subscription;
        progress = res.progress;
        updates$.next({ progress, subscription });
      },
      complete: async () => {
        console.log("download to cache completed");
        console.log("data:", data);
        if (data) {
          const filesystemPath = await this.fileManagerService.saveFile(data, filepath);
          await this.fileManagerService.updateContentsList(filepath, { filesystemPath });
          updates$.next({ progress, subscription, filesystemPath });
          updates$.complete();
        }
      },
    });
    return updates$;
  }

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

  /** Get a file's public URL from supabase */
  getPublicUrl(filepath: string) {
    let url = "";
    try {
      const {
        data: { publicUrl },
      } = this.supabase.storage
        .from(this.bucketName)
        .getPublicUrl(this.getSupabaseFilepath(filepath));
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
  private getSupabaseFilepath(filepath: string) {
    return `${this.folderName}/${filepath}`;
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
