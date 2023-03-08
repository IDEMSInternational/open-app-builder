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
  forceUpdate: boolean;
  completeUpdateTemplate: string;

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
      // If a flexible update has previously been downloaded but not installed, install now on init
      if (
        appUpdateInfo.installStatus &&
        appUpdateInfo.installStatus === FlexibleUpdateInstallStatus?.DOWNLOADED
      ) {
        await this.completeFlexibleUpdate();
      } else if (appUpdateInfo.updateAvailability === AppUpdateAvailability.UPDATE_AVAILABLE) {
        if (this.forceUpdate) {
          await this.attemptImmediateUpdate();
        } else {
          await this.attemptFlexibleUpdate();
        }
      }
    }
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      app_update: async ({ args }) => {
        const [actionId] = args;
        const childActions = {
          force: async () => {},
          // Complete
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
      const { enabled, forceUpdate, completeUpdateTemplate } = appConfig.APP_UPDATES;
      this.appUpdatesEnabled = enabled;
      this.forceUpdate = forceUpdate;
      this.completeUpdateTemplate = completeUpdateTemplate;
    });
  }

  private async attemptImmediateUpdate() {
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
    AppUpdate.startFlexibleUpdate();
    const updateListener = AppUpdate.addListener("onFlexibleUpdateStateChange", (state) => {
      // DOWNLOADED state indicates the update is ready to install https://developer.android.com/guide/playcore/in-app-updates/kotlin-java#install-flexible
      if (state.installStatus === FlexibleUpdateInstallStatus.DOWNLOADED) {
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
    await AppUpdate.completeFlexibleUpdate();
  }
}
