import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SyncServiceBase } from "../syncService.base";
import { DeploymentService } from "../deployment/deployment.service";

/** Service used to configure and initialize Supabase client core configuration */
@Injectable({ providedIn: "root" })
export class SupabaseService extends SyncServiceBase {
  /** Initialised supabase client. Will be undefined if supabase config unavailable */
  public client: SupabaseClient | undefined;

  constructor(private deploymentService: DeploymentService) {
    super("Supabase");
    this.initialise();
  }

  /**
   * Initialize Supabase client based on deployment configuration
   */
  private initialise() {
    const supabaseConfig = this.deploymentService.config.supabase;

    if (!supabaseConfig || !supabaseConfig.enabled) {
      console.warn(`[Supabase] Supabase not enabled in deployment config, client not initialized`);
      return;
    }

    if (!supabaseConfig.url || !supabaseConfig.publicApiKey) {
      console.warn(
        `[Supabase] Missing required configuration (url, publicApiKey), client not initialized`
      );
      return;
    }

    this.client = createClient(supabaseConfig.url, supabaseConfig.publicApiKey);

    console.log(`[Supabase] Client initialized`);
  }
}
