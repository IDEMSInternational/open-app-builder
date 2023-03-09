import { Injectable } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import {
  AppUpdate,
  AppUpdateAvailability,
  FlexibleUpdateInstallStatus,
  AppUpdateResultCode,
} from "@capawesome/capacitor-app-update";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { TemplateNavService } from "../../components/template/services/template-nav.service";
import { IAppConfig } from "../../model";
import { AppConfigService } from "../app-config/app-config.service";
import { AsyncServiceBase } from "../asyncService.base";

@Injectable({
  providedIn: "root",
})
export class AppUpdateService extends AsyncServiceBase {
  appUpdatesEnabled: boolean;
  completeUpdateTemplate: string;
  updateAvailable: boolean;
  /** Track whether a flexible update has been downloaded and is ready to install */
  updateDownloaded: boolean;

  constructor(
    private templateActionRegistry: TemplateActionRegistry,
    private appConfigService: AppConfigService,
    private templateNavService: TemplateNavService
  ) {
    super("AppUpdate");
    this.registerInitFunction(this.initialise);
    this.registerTemplateActionHandlers();
  }

  private async initialise() {
    this.ensureSyncServicesReady([this.appConfigService, this.templateNavService]);
    this.subscribeToAppConfigChanges();
    if (!Capacitor.isNativePlatform()) return;
    if (this.appUpdatesEnabled) {
      const appUpdateInfo = await AppUpdate.getAppUpdateInfo();
      this.updateAvailable =
        appUpdateInfo.updateAvailability === AppUpdateAvailability.UPDATE_AVAILABLE;
      this.updateDownloaded =
        appUpdateInfo.installStatus === FlexibleUpdateInstallStatus.DOWNLOADED;

      // If a flexible update has previously been downloaded but not installed, install it now on init
      if (this.updateDownloaded) {
        await this.completeFlexibleUpdate();
      }
    }
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      app_update: async ({ args }) => {
        const [actionId] = args;
        const childActions = {
          /**
           * If an update is available, force the user to download and apply it,
           * using Android's "Immediate" update strategy UI (the prompt can in fact still be dismissed)
           * Further details at https://developer.android.com/guide/playcore/in-app-updates#immediate
           */
          force: async () => {
            await this.attemptImmediateUpdate();
          },
          /**
           * If an update is available, prompt the user to download and apply it, using Android's "Flexible"
           * update strategy UI, which encourages the user to update but gives the option to not do so
           * Further details at https://developer.android.com/guide/playcore/in-app-updates#flexible
           */
          prompt: async () => {
            await this.attemptFlexibleUpdate();
          },
          /**
           * After a flexible update has finished downloading, this action will finish applying the update,
           * by installing it and relaunching the app
           */
          complete: async () => {
            await this.completeFlexibleUpdate();
          },
        };
        if (!(actionId in childActions)) {
          console.error("app_update does not have action", actionId);
          return;
        }
        return childActions[actionId]();
      },
    });
  }

  private subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      const { enabled, completeUpdateTemplate } = appConfig.APP_UPDATES;
      this.appUpdatesEnabled = enabled;
      this.completeUpdateTemplate = completeUpdateTemplate;
    });
  }

  private async attemptImmediateUpdate() {
    if (!this.isUpdateEnabledAndAvailable()) return;
    const updateResult = await AppUpdate.performImmediateUpdate();
    if (updateResult.code !== AppUpdateResultCode.OK) {
      console.error(
        `[App Update] Immediate update failed, status: ${
          Object.keys(AppUpdateResultCode)[
            Object.values(AppUpdateResultCode).indexOf(updateResult.code)
          ]
        }`
      );
    }
  }

  private async attemptFlexibleUpdate() {
    if (!this.isUpdateEnabledAndAvailable()) return;
    AppUpdate.startFlexibleUpdate();
    const updateListener = AppUpdate.addListener("onFlexibleUpdateStateChange", (state) => {
      if (state.installStatus === FlexibleUpdateInstallStatus.DOWNLOADED) {
        this.updateDownloaded = true;
        return this.handleFlexibleUpdateCompletion();
      }
      // Error handling. Currently causes listener to be removed erroneously
      // if (FlexibleUpdateInstallStatus.FAILED, FlexibleUpdateInstallStatus.UNKNOWN, FlexibleUpdateInstallStatus.CANCELED) {
      //   return updateListener.remove()
      // }
    });
  }

  private async handleFlexibleUpdateCompletion() {
    // Prompt user to complete update
    if (this.completeUpdateTemplate) {
      await this.templateNavService.handlePopupAction({
        trigger: "completed",
        action_id: "pop_up",
        args: [this.completeUpdateTemplate],
      });
    }
    // If no template is provided, the app will complete the flexible installation on restart
  }

  async completeFlexibleUpdate() {
    this.updateDownloaded = false;
    await AppUpdate.completeFlexibleUpdate();
  }

  async isUpdateEnabledAndAvailable() {
    if (this.appUpdatesEnabled) {
      if (this.updateAvailable) {
        return true;
      }
      console.log("[App Update] No app update available.");
    } else {
      console.log("[App Update] App updates are not enabled in deployment config.");
    }
    return false;
  }
}
