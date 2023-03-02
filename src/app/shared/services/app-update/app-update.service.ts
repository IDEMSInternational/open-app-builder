import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import {
  AppUpdate,
  AppUpdateInfo,
  AppUpdateAvailability,
  AppUpdateResultCode,
  FlexibleUpdateInstallStatus,
} from "@capawesome/capacitor-app-update";
import { IAppConfig } from "../../model";
import { AppConfigService } from "../app-config/app-config.service";
import { SyncServiceBase } from "../syncService.base";

@Injectable({
  providedIn: "root",
})
export class AppUpdateService extends SyncServiceBase {
  appConfigService: AppConfigService;
  appUpdatesEnabled: boolean;
  forceUpdate: boolean;
  constructor() {
    super("AppUpdate");
    this.initialise();
  }

  private async initialise() {
    this.ensureSyncServicesReady([this.appConfigService]);
    this.subscribeToAppConfigChanges();
    if (this.appUpdatesEnabled) {
      // this.checkForUpdatesAndAttemptImmediateUpdate()
      const appUpdateInfo = await this.getAppUpdateInfo();
      if (appUpdateInfo.updateAvailability === AppUpdateAvailability.UPDATE_AVAILABLE) {
        if (this.forceUpdate) {
          this.attemptImmediateUpdate();
        } else {
        }
      }
    }
  }

  private subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      const { enabled, forceUpdate } = appConfig.APP_UPDATES;
      this.appUpdatesEnabled = enabled;
      this.forceUpdate = forceUpdate;
    });
  }

  async checkForUpdatesAndAttemptImmediateUpdate() {
    if (Capacitor.isNativePlatform()) {
      try {
        const result = await AppUpdate.getAppUpdateInfo();
        if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
          return;
        }
        if (result.immediateUpdateAllowed) {
          return await AppUpdate.performImmediateUpdate();
        }
      } catch (error) {
        console.error("[App Update]", error);
      }
    }
  }

  async getAppUpdateInfo() {
    return (await AppUpdate.getAppUpdateInfo()) as AppUpdateInfo;
  }

  async attemptImmediateUpdate() {
    try {
      await AppUpdate.performImmediateUpdate();
    } catch (error) {
      this.logError(error);
    }
  }

  private logError(error) {
    console.error("[App Update]", error);
  }

  async attemptFlexibleUpdate() {
    AppUpdate.startFlexibleUpdate();
    const flexibleUpdateListener = AppUpdate.addListener("onFlexibleUpdateStateChange", (state) => {
      // DOWNLOADED state indicates the update is ready to install https://developer.android.com/guide/playcore/in-app-updates/kotlin-java#install-flexible
      if (state.installStatus === FlexibleUpdateInstallStatus.DOWNLOADED) {
        this.completeFlexibleUpdate();
      }
    });
  }

  async startFlexibleUpdate() {
    return AppUpdate.startFlexibleUpdate();
  }

  async completeFlexibleUpdate() {
    // this.flexibleUpdatePending = false
    await AppUpdate.completeFlexibleUpdate();
  }
}
