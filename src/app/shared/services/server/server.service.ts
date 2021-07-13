import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DeviceInfo, Plugins } from "@capacitor/core";
import { interval } from "rxjs";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";

const { Device } = Plugins;
/** How often to attempt sync - currently every 15mins */
const SYNC_FREQUENCY_MS = 1000 * 60 * 15;

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
  syncSchedule = interval(SYNC_FREQUENCY_MS);
  //   Requires update (?) - https://angular.io/api/common/http/HttpContext
  //   context =  new HttpContext().set(SERVER_API, true),
  constructor(private http: HttpClient) {
    this.init();
  }

  async init() {
    this.device_info = await Device.getInfo();
    this.app_user_id = this.device_info.uuid;
    this.syncUserData();
    this.syncSchedule.subscribe(() => {
      this.syncUserData();
    });
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
    // TODO - get DTO from api (?)
    const data = {
      contact_fields,
      app_version: environment.version,
      device_info: this.device_info,
    };
    return this.http
      .post(`/app_users/${this.app_user_id}`, data)
      .pipe(
        catchError(this.handleError)
        // retryWhen((errors) =>
        //   errors.pipe(
        //     tap((val) => console.log(`error happened, val`)),
        //     delayWhen((val) => timer(5000))
        //   )
        // )
        // retry(3), // retry a failed request up to 3 times
      )
      .subscribe(
        (res) => {
          console.log("User data synced", res);
        },
        (err) => console.error(err)
      );
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
}
