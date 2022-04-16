import { Injectable } from "@angular/core";
import { FirebaseCrashlytics } from "@capacitor-community/firebase-crashlytics";
import { Capacitor } from "@capacitor/core";
import { Device } from "@capacitor/device";

@Injectable({
  providedIn: "root",
})
/**
 * Automates reporting of crash data to firebase crashlytics, and adds methods
 * to allow custom reporting for non-fatal exceptions (e.g. error messages)
 * https://github.com/capacitor-community/firebase-crashlytics
 */
export class CrashlyticsService {
  public async init() {
    if (Capacitor.isNativePlatform()) {
      await this.setEnabled({ enabled: true });
      const { uuid } = await Device.getId();
      await this.setUserId({ userId: uuid });
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
