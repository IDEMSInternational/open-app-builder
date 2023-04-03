import { Injectable } from "@angular/core";
import { SyncServiceBase } from "../syncService.base";
import { AppConfigService } from "../app-config/app-config.service";
import { IAppConfig } from "../../model";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

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

  constructor(private appConfigService: AppConfigService) {
    super("RemoteAsset");
    this.initialise();
  }

  private initialise() {
    this.subscribeToAppConfigChanges();
    this.supabase = createClient(this.supabaseURL, this.supabaseApiKey);
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
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.downloading = false;
    }
  }

  async downloadRequiredAssets() {
    /**
     * Possible steps:
     * 1. Check local config
     * 2. Generate loval manifest
     * 3. Download relevant manifest from supabase
     * 4. Compare local and remote amnifests and generate a manifest of required files
     * 5. Download required files
     * 6.
     */
  }
}
