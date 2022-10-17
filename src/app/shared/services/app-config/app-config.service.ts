import { Injectable } from "@angular/core";
import { getDefaultAppConfig, IAppConfig, IAppConfigOverride } from "data-models";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { deepMergeObjects } from "../../utils";
import clone from "clone";

@Injectable({
  providedIn: "root",
})
export class AppConfigService {
  appConfigDeploymentOverrides: IAppConfigOverride =
    (environment.deploymentConfig as any).app_config || {};
  appConfigSkinOverrides: IAppConfigOverride;
  /** List of constants provided by data-models combined with deployment-specific overrides and skin-specific overrides */
  appConfig$ = new BehaviorSubject<IAppConfig | {}>({});
  /** Static value to be read by methods that are not responsive to changes
   * TODO: migrate all consumers of this value to be responsive to appConfig$ */
  APP_CONFIG: IAppConfig;
  deploymentAppConfig: IAppConfig;

  init() {
    this.APP_CONFIG = getDefaultAppConfig();
    this.deploymentAppConfig = this.applyAppConfigOverrides(
      this.APP_CONFIG,
      this.appConfigDeploymentOverrides
    );
    this.updateAppConfig(this.appConfigDeploymentOverrides);
  }

  public updateAppConfig(overrides: IAppConfigOverride) {
    // Clone this.deploymentAppConfig so that the original is unaffected by deepMergeObjects()
    const deploymentAppConfig = clone(this.deploymentAppConfig);
    const appConfigWithOverrides = this.applyAppConfigOverrides(deploymentAppConfig, overrides);
    this.APP_CONFIG = appConfigWithOverrides;
    this.appConfig$.next(appConfigWithOverrides);
  }

  private applyAppConfigOverrides(appConfig: IAppConfig, overrides: IAppConfigOverride) {
    return deepMergeObjects(appConfig, overrides);
  }
}
