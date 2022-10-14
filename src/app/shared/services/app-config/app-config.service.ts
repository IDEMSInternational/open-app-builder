import { Injectable } from "@angular/core";
import { getDefaultAppConfig, IAppConfig, IAppConfigOverride } from "data-models";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { deepMergeObjects } from "../../utils";
import { SkinService } from "../skin/skin.service";

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

  constructor(private skinService: SkinService) {}

  init() {
    this.updateAppConfig();
    this.skinService.activeSkin$.subscribe((activeSkin) => {
      this.appConfigSkinOverrides = activeSkin.appConfig;
      this.updateAppConfig();
    });
  }

  updateAppConfig() {
    const appConfigWithDeploymentOverrides = this.applyAppConfigOverrides(
      getDefaultAppConfig(),
      this.appConfigDeploymentOverrides
    );
    const appConfigWithSkinOverrides = this.applyAppConfigOverrides(
      appConfigWithDeploymentOverrides,
      this.appConfigSkinOverrides
    );
    this.APP_CONFIG = appConfigWithSkinOverrides;
    this.appConfig$.next(appConfigWithSkinOverrides);
  }

  private applyAppConfigOverrides(appConfig: IAppConfig, overrides: IAppConfigOverride) {
    return deepMergeObjects(appConfig, overrides);
  }
}
