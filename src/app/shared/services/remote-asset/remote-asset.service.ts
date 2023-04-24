import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { environment } from "src/environments/environment";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { IAppConfig } from "../../model";
import { AppConfigService } from "../app-config/app-config.service";
import { FileManagerService } from "../file-manager/file-manager.service";
import { SyncServiceBase } from "../syncService.base";
import { IAssetContents } from "src/app/data";

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
    private fileManagerService: FileManagerService
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
        const blob = await this.downloadFile(assetName);
        uri = await this.fileManagerService.saveFile(blob, assetName);
      } else {
        uri = await this.getPublicUrl(assetName);
      }
      console.log("uri:", uri);
      await this.fileManagerService.updateContentsList(assetName, uri);
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

  async downloadFile(filepath: string) {
    let data: Blob;
    try {
      this.downloading = true;
      const { data: blob, error } = await this.supabase.storage
        .from(this.bucketName)
        .download(this.getSupabaseFilepath(filepath));
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

  /* Get a file's public URL from supabase. For use in the web app */
  async getPublicUrl(filepath: string) {
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

  /* Convert base filepath to match supabase storage folder structure */
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
