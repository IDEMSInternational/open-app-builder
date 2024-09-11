import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeviceInfo, Device } from "@capacitor/device";
import { IAppConfig, getProtectedFieldName } from "data-models";
import { interval } from "rxjs";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { generateTimestamp } from "../../utils";
import { AppConfigService } from "../app-config/app-config.service";
import { SyncServiceBase } from "../syncService.base";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { DeploymentService } from "../deployment/deployment.service";

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
  syncSchedule;
  //   Requires update (?) - https://angular.io/api/common/http/HttpContext
  //   context =  new HttpContext().set(SERVER_API, true),
  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigService,
    private localStorageService: LocalStorageService,
    private dynamicDataService: DynamicDataService,
    private deploymentService: DeploymentService
  ) {
    super("Server");
    this.initialise();
  }

  private initialise() {
    this.ensureSyncServicesReady([this.appConfigService, this.localStorageService]);
    this.subscribeToAppConfigChanges();
    if (environment.production) {
      this.syncUserData();
      this.syncSchedule.subscribe(() => {
        this.syncUserData();
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
    const { name, _app_builder_version } = this.deploymentService.config();
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

    // TODO - get DTO from api (?)
    const data = {
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

  private handleError(error: HttpErrorResponse) {
    //   sync failed, retry later (?)
    return throwError("Could not connect to server");
  }

  subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      this.syncSchedule = interval(appConfig.SERVER_SYNC_FREQUENCY_MS);
    });
  }
}
