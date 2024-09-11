import { Injectable } from "@angular/core";
import { getDefaultAppConfig, IAppConfig, IAppConfigOverride } from "data-models";
import { BehaviorSubject } from "rxjs";
import { deepMergeObjects, RecursivePartial, trackObservableObjectChanges } from "../../utils";
import clone from "clone";
import { SyncServiceBase } from "../syncService.base";
import { startWith } from "rxjs/operators";
import { Observable } from "rxjs";
import { DeploymentService } from "../deployment/deployment.service";

@Injectable({
  providedIn: "root",
})
export class AppConfigService extends SyncServiceBase {
  /** List of constants provided by data-models combined with deployment-specific overrides and skin-specific overrides */
  appConfig$ = new BehaviorSubject<IAppConfig>(undefined as any);

  /** Tracking observable of deep changes to app config, exposed in `changes` public method */
  private appConfigChanges$: Observable<RecursivePartial<IAppConfig>>;

  APP_CONFIG: IAppConfig;
  deploymentAppConfig: IAppConfig;

  public get value() {
    return this.appConfig$.value;
  }

  /**
   * Track deep object diff of app config changes.
   * Creates subject on demand, so that multiple listeners can efficiently subscribe to changes
   */
  public get changes$() {
    if (!this.appConfigChanges$) {
      this.appConfigChanges$ = trackObservableObjectChanges(this.appConfig$);
    }
    return this.appConfigChanges$;
  }

  /** Track deep object diff of app config changes, including full initial value */
  public get changesWithInitialValue$() {
    return this.changes$.pipe(startWith(this.value));
  }

  constructor(private deploymentService: DeploymentService) {
    super("AppConfig");
    this.initialise();
  }

  private initialise() {
    const deploymentOverrides: IAppConfigOverride = this.deploymentService.config.app_config || {};
    this.APP_CONFIG = getDefaultAppConfig();
    // Store app config with deployment overrides applied, to be merged with additional overrides when applied
    this.deploymentAppConfig = this.applyAppConfigOverrides(this.APP_CONFIG, deploymentOverrides);
    this.updateAppConfig(deploymentOverrides);
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
