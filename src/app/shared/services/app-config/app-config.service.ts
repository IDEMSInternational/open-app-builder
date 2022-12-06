import { Injectable } from "@angular/core";
import { getDefaultAppConfig, IAppConfig, IAppConfigOverride } from "data-models";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { deepMergeObjects } from "../../utils";
import clone from "clone";
import { SyncServiceBase } from "../syncService.base";

@Injectable({
  providedIn: "root",
})
export class AppConfigService extends SyncServiceBase {
  deploymentOverrides: IAppConfigOverride = (environment.deploymentConfig as any).app_config || {};
  /** List of constants provided by data-models combined with deployment-specific overrides and skin-specific overrides */
  appConfig$ = new BehaviorSubject<IAppConfig | {}>({});
  APP_CONFIG: IAppConfig;
  deploymentAppConfig: IAppConfig;

  constructor() {
    super("AppConfig");
    this.initialise();
  }

  private initialise() {
    this.APP_CONFIG = getDefaultAppConfig();
    // Store app config with deployment overrides applied, to be merged with additional overrides when applied
    this.deploymentAppConfig = this.applyAppConfigOverrides(
      this.APP_CONFIG,
      this.deploymentOverrides
    );
    this.updateAppConfig(this.deploymentOverrides);
  }

  public updateAppConfig(overrides: IAppConfigOverride) {
    // Clone this.deploymentAppConfig so that the original is unaffected by deepMergeObjects()
    const appConfigWithOverrides = this.applyAppConfigOverrides(
      clone(this.deploymentAppConfig),
      overrides
    );
    this.APP_CONFIG = appConfigWithOverrides;
    this.appConfig$.next(appConfigWithOverrides);
  }

  private applyAppConfigOverrides(appConfig: IAppConfig, overrides: IAppConfigOverride) {
    return deepMergeObjects(appConfig, overrides);
  }
}
