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
import { BehaviorSubject, Subscription } from "rxjs";

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
    const { enabled, publicApiKey, url } = environment.deploymentConfig.supabase;
    if (enabled) {
      this.supabase = createClient(url, publicApiKey);
      this.subscribeToAppConfigChanges();
      this.registerTemplateActionHandlers();
    }
  }

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
    for (const [assetName, assetEntry] of Object.entries(manifest)) {
      let uri = "";
      if (Capacitor.isNativePlatform()) {
        const blob = await this.downloadFileFromPrivateBucket(assetName);
        console.log("blob:", blob);
        if (blob) {
          uri = await this.fileManagerService.saveFile(blob, assetName);
        } else {
          console.error("Failed to download resource");
        }
      } else {
        uri = this.getPublicUrl(assetName);
      }
      console.log("uri:", uri);
      if (uri) {
        await this.fileManagerService.updateContentsList(assetName, uri);
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

  private downloadFile(url: string, responseType: "blob" | "base64" = "base64", headers = {}) {
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

  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }

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

  /** Get a file's public URL from supabase. For use in the web app */
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
}
