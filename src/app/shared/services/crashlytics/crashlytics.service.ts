import { Injectable } from "@angular/core";
import { FirebaseCrashlytics } from "@capacitor-community/firebase-crashlytics";
import { Capacitor } from "@capacitor/core";
import { Device } from "@capacitor/device";
import { AsyncServiceBase } from "../asyncService.base";

@Injectable({
  providedIn: "root",
})
/**
 * Automates reporting of crash data to firebase crashlytics, and adds methods
 * to allow custom reporting for non-fatal exceptions (e.g. error messages)
 * https://github.com/capacitor-community/firebase-crashlytics
 */
export class CrashlyticsService extends AsyncServiceBase {
  constructor() {
    super("Crashlytics");
    this.registerInitFunction(this.initialise);
  }
  private async initialise() {
    if (Capacitor.isNativePlatform()) {
      await this.setEnabled({ enabled: true });
      const { identifier: uuid } = await Device.getId();
      await this.setUserId({ userId: uuid });
      // populate webview useragent info
      const { webViewVersion } = await Device.getInfo();
      await this.setContext({
        key: "userAgent",
        type: "string",
        value: navigator.userAgent || "",
      });
      await this.setContext({
        key: "webViewVersion",
        type: "string",
        value: webViewVersion || "",
      });
      await this.setContext({
        key: "pathname",
        type: "string",
        value: location.pathname || "",
      });
      this.sendUnsentReports();
    }
  }

  public recordException = FirebaseCrashlytics.recordException;

  public addLogMessage = FirebaseCrashlytics.addLogMessage;

  public setContext = FirebaseCrashlytics.setContext;

  private setUserId = FirebaseCrashlytics.setUserId;

  private setEnabled = FirebaseCrashlytics.setEnabled;

  private sendUnsentReports = FirebaseCrashlytics.sendUnsentReports;

  private crash = FirebaseCrashlytics.crash;
}
