import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeviceInfo, Device } from "@capacitor/device";
import { IAppConfig } from "packages/data-models";
import { interval } from "rxjs";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { generateTimestamp } from "../../utils";
import { AppConfigService } from "../app-config/app-config.service";

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
export class ServerService {
  app_user_id: string;
  device_info: DeviceInfo;
  syncSchedule;
  appFields: IAppConfig["APP_FIELDS"];
  //   Requires update (?) - https://angular.io/api/common/http/HttpContext
  //   context =  new HttpContext().set(SERVER_API, true),
  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
    this.subscribeToAppConfigChanges();
  }

  async init() {
    this.device_info = await Device.getInfo();
    const { uuid } = await Device.getId();
    this.app_user_id = uuid;
    if (environment.production) {
      this.syncUserData();
      this.syncSchedule.subscribe(() => {
        this.syncUserData();
      });
    }
  }

  getServerStatus() {
    const endpoint = "/status";
    console.log("[SERVER] get status");
    this.http
      .get<string>(endpoint, { responseType: "text" as any })
      .subscribe((res) => console.log("[SERVER] status", res));
  }

  syncUserData() {
    console.log("[SERVER] sync data");
    const contact_fields = this.getUserStorageData();

    // apply temp timestamp to contact fields to sync as latest
    const timestamp = generateTimestamp();
    contact_fields[this.appFields.SERVER_SYNC_LATEST] = timestamp;

    // TODO - get DTO from api (?)
    const data = {
      contact_fields,
      app_version: environment.version,
      device_info: this.device_info,
      app_deployment_name: environment.deploymentName,
    };
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
            console.log("User data synced", res);
            // finalise timestamp by storing locally
            localStorage.setItem(this.appFields.SERVER_SYNC_LATEST, timestamp);
            resolve(timestamp);
          },
          (err) => resolve(null)
        );
    });
  }

  private getUserStorageData() {
    const values = {};
    Object.keys(localStorage)
      .filter((k) => k.startsWith("rp-contact-field"))
      .forEach((k) => (values[k] = localStorage.getItem(k)));
    return values;
  }

  private handleError(error: HttpErrorResponse) {
    //   sync failed, retry later (?)
    return throwError("Could not connect to server");
  }

  subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      this.appFields = appConfig.APP_FIELDS;
      this.syncSchedule = interval(appConfig.SERVER_SYNC_FREQUENCY_MS);
    });
  }
}
