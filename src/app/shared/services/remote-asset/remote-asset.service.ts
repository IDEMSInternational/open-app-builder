import { Injectable } from "@angular/core";
import { SyncServiceBase } from "../syncService.base";
import { AppConfigService } from "../app-config/app-config.service";
import { IAppConfig } from "../../model";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { FileManagerService } from "../file-manager/file-manager.service";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";

@Injectable({
  providedIn: "root",
})
export class RemoteAssetService extends SyncServiceBase {
  remoteAssetsEnabled: boolean;
  supabaseURL: string;
  supabaseApiKey: string;
  bucketName: string;
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
    this.subscribeToAppConfigChanges();
    this.registerTemplateActionHandlers();
    this.supabase = createClient(this.supabaseURL, this.supabaseApiKey);
  }

  async downloadAndPopulateRequiredAssets() {
    // Proposed steps:

    // 1.
    // Get manifest of expected files from config
    // Generate manifest of locally available files
    // Compare these, and generate a manifest of files to download
    const manifest = this.generateManifest();

    // 2. For each file:
    // a) download file from supabase
    // b) populate to respective folder
    for (const fileEntry of manifest) {
      await this.downloadFile(fileEntry.path);
      this.fileManagerService.saveFile(this.blob, fileEntry);
    }
  }

  generateManifest() {
    // Return dummy manifest for now
    return [{ path: "quality_assurance/example_asset.png" }];
  }

  async downloadFile(filepath: string) {
    try {
      this.downloading = true;
      const { data: blob, error } = await this.supabase.storage
        .from(this.bucketName)
        .download(filepath);
      if (error) {
        throw error;
      }
      if (blob) {
        this.blob = blob;
        console.log("blob:", this.blob);
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.downloading = false;
    }
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
      const {
        enabled,
        supabase: { url, apiKey, bucketName },
      } = appConfig.ASSET_PACKS;
      this.remoteAssetsEnabled = enabled;
      this.supabaseURL = url;
      this.supabaseApiKey = apiKey;
      this.bucketName = bucketName;
    });
  }
}
