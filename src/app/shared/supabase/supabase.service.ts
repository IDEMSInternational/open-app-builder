import { Injectable } from "@angular/core";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SyncServiceBase } from "../services/syncService.base";
import { DeploymentService } from "../services/deployment/deployment.service";

@Injectable({ providedIn: "root" })
export class SupabaseService extends SyncServiceBase {
  public supabase: SupabaseClient;
  private config = this.deploymentService.config.supabase;

  constructor(private deploymentService: DeploymentService) {
    super("Supabase");
    this.init();
  }

  private init() {
    const { enabled, publicApiKey, url } = this.config;
    if (enabled) {
      this.supabase = createClient(url, publicApiKey);
    }
  }
}
