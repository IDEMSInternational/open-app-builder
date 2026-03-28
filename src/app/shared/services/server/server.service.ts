import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeviceInfo, Device } from "@capacitor/device";
import { getProtectedFieldName } from "data-models";
import { interval } from "rxjs";
import { environment } from "src/environments/environment";
import { generateTimestamp } from "../../utils";
import { SyncServiceBase } from "../syncService.base";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { DeploymentService } from "../deployment/deployment.service";
import { IServerUser } from "./server.types";
import { DBSyncService } from "../db/db-sync.service";

/**
 * Backend API
 * Connects to custom server running api endpoint, used to record specific user data
 *
 * NOTE - sync timers/methods all approximate, could be made more robust by subscribing
 * to connection status, handling retries etc. Also shared data-transfer-objects could
 * help enforce type-check shape of data
 *
 **/
@Injectable({ providedIn: "root" })
export class ServerService extends SyncServiceBase {
  app_user_id: string;
  device_info: DeviceInfo;
  /**
   * Track whether sync enabled to allow toggling sync on/off
   * TODO - expose action/public methods to set
   **/
  private syncEnabled: boolean;
  //   Requires update (?) - https://angular.io/api/common/http/HttpContext
  //   context =  new HttpContext().set(SERVER_API, true),
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private dynamicDataService: DynamicDataService,
    private deploymentService: DeploymentService,
    private dbSyncService: DBSyncService
  ) {
    super("Server");
    this.initialise();
  }

  private initialise() {
    this.ensureSyncServicesReady([this.localStorageService]);
    // set default sync enabled state from deployment config
    const { api } = this.deploymentService.config;
    this.syncEnabled = api.enabled;
    if (environment.production) {
      // run initial sync and create interval timer to sync regularly
      this.syncUserData();
      this.syncDBTableData();
      interval(api.sync_frequency).subscribe(() => {
        this.syncUserData();
        this.syncDBTableData();
      });
    }
  }

  private getServerStatus() {
    const endpoint = "/status";
    console.log("[SERVER] get status");
    this.http
      .get<string>(endpoint, { responseType: "text" as any })
      .subscribe((res) => console.log("[SERVER] status", res));
  }

  public async syncUserData() {
    if (!this.syncEnabled) {
      console.log("[SERVER] sync disabled");
      return;
    }
    const { name, _app_builder_version } = this.deploymentService.config;
    await this.dynamicDataService.ready();
    if (!this.device_info) {
      this.device_info = await Device.getInfo();
    }
    if (!this.app_user_id) {
      const { identifier: uuid } = await Device.getId();
      this.app_user_id = uuid;
    }
    console.log("[SERVER] sync data");
    const contact_fields = this.localStorageService.getAll();

    const dynamic_data = await this.dynamicDataService.getState();

    // apply temp timestamp to contact fields to sync as latest
    const timestamp = generateTimestamp();
    contact_fields[getProtectedFieldName("SERVER_SYNC_LATEST")] = timestamp;

    const auth_user_id = this.localStorageService.getProtected("AUTH_USER_ID") || null;

    const data: Partial<IServerUser> = {
      auth_user_id,
      contact_fields,
      app_version: _app_builder_version,
      device_info: this.device_info,
      app_deployment_name: name,
      dynamic_data,
    };

    console.log("[SERVER] sync data", data);
    return new Promise<string>((resolve, reject) => {
      this.http
        .post(`/app_users/${this.app_user_id}`, data)
        /* WiP - code to handle optional automated retry */
        // .pipe(
        //   catchError(this.handleError)
        //   // retryWhen((errors) =>
        //   //   errors.pipe(
        //   //     tap((val) => console.log(`error happened, val`)),
        //   //     delayWhen((val) => timer(5000))
        //   //   )
        //   // )
        //   // retry(3), // retry a failed request up to 3 times
        // )
        .subscribe(
          (res) => {
            console.log("[SERVER] synced", res);
            // finalise timestamp by storing locally
            this.localStorageService.setProtected("SERVER_SYNC_LATEST", timestamp);
            resolve(timestamp);
          },
          (err) => resolve(null)
        );
    });
  }

  private async syncDBTableData() {
    await this.dbSyncService.ready();
    return this.dbSyncService.syncDBTables();
  }

  /**
   * Request deletion of user data from the server (soft delete).
   * This marks the user for deletion rather than immediately removing data,
   * allowing for review before permanent deletion.
   */
  public async requestUserDataDeletion(): Promise<{ success: boolean; error?: any }> {
    if (!this.app_user_id) {
      const { identifier: uuid } = await Device.getId();
      this.app_user_id = uuid;
    }
    console.log("[SERVER] requesting deletion of user data for", this.app_user_id);
    return new Promise((resolve) => {
      this.http.delete(`/app_users/${this.app_user_id}`).subscribe({
        next: () => {
          console.log("[SERVER] user data marked for deletion");
          resolve({ success: true });
        },
        error: (err) => {
          console.error("[SERVER] failed to request user data deletion:", err);
          resolve({ success: false, error: err });
        },
      });
    });
  }
}
