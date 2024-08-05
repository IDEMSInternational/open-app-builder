import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeviceInfo, Device } from "@capacitor/device";
import { IAppConfig, getProtectedFieldName } from "data-models";
import { interval } from "rxjs";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { generateTimestamp } from "../../utils";
import { AppConfigService } from "../app-config/app-config.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { UserMetaService } from "../userMeta/userMeta.service";
import { AsyncServiceBase } from "../asyncService.base";

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
export class ServerService extends AsyncServiceBase {
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
    private userMetaService: UserMetaService
  ) {
    super("Server");
    this.registerInitFunction(this.initialise);
  }

  private async initialise() {
    this.ensureSyncServicesReady([this.appConfigService, this.localStorageService]);
    this.ensureAsyncServicesReady([this.userMetaService]);
    this.subscribeToAppConfigChanges();
    await this.setUserMetaData();
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
    await this.dynamicDataService.ready();
    await this.setUserMetaData();
    console.log("[SERVER] sync data");
    const contact_fields = this.localStorageService.getAll();
    const dynamic_data = await this.dynamicDataService.getState();

    // apply temp timestamp to contact fields to sync as latest
    const timestamp = generateTimestamp();
    contact_fields[getProtectedFieldName("SERVER_SYNC_LATEST")] = timestamp;

    // TODO - get DTO from api (?)
    const data = {
      contact_fields,
      app_version: environment.version,
      device_info: this.device_info,
      app_deployment_name: environment.deploymentName,
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

  private async setUserMetaData() {
    if (!this.device_info) {
      this.device_info = await Device.getInfo();
    }
    if (!this.app_user_id) {
      this.app_user_id = this.localStorageService.getProtected("APP_USER_ID");
    }
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
