import { Injectable, signal } from "@angular/core";
import { getDefaultAppConfig, IAppConfig, IAppConfigOverride } from "data-models";
import { BehaviorSubject } from "rxjs";
import { deepMergeObjects, RecursivePartial, trackObservableObjectChanges } from "../../utils";
import { SyncServiceBase } from "../syncService.base";
import { startWith } from "rxjs/operators";
import { Observable } from "rxjs";
import { DeploymentService } from "../deployment/deployment.service";
import { updateRoutingDefaults } from "./app-config.utils";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AppConfigService extends SyncServiceBase {
  /** Signal representation of current appConfig value */
  public appConfig = signal(getDefaultAppConfig());

  /**
   * @deprecated - prefer use of config signal and computed/effect bindings
   * List of constants provided by data-models combined with deployment-specific overrides and skin-specific overrides
   **/
  public appConfig$ = new BehaviorSubject<IAppConfig>(getDefaultAppConfig());

  /** Tracking observable of deep changes to app config, exposed in `changes` public method */
  private appConfigChanges$: Observable<RecursivePartial<IAppConfig>>;

  /**
   * @deprecated - prefer use of config signal and computed/effect bindings
   *
   * Track deep object diff of app config changes.
   * Creates subject on demand, so that multiple listeners can efficiently subscribe to changes
   */
  public get changes$() {
    if (!this.appConfigChanges$) {
      this.appConfigChanges$ = trackObservableObjectChanges(this.appConfig$);
    }
    return this.appConfigChanges$;
  }

  /**
   * @deprecated - prefer use of config signal and computed/effect bindings
   * Track deep object diff of app config changes, including full initial value
   * */
  public get changesWithInitialValue$() {
    return this.changes$.pipe(startWith(this.appConfig()));
  }

  constructor(
    private deploymentService: DeploymentService,
    private router: Router
  ) {
    super("AppConfig");
    this.initialise();
  }

  /** When service initialises load any deployment-specific config overrides  */
  private initialise() {
    // When first loading handle side-effects from default config (e.g. initial routing).
    // Deployment-specific side-effects will be handled when setting the appConfig
    const defaultConfig = getDefaultAppConfig();
    this.handleConfigSideEffects(defaultConfig, defaultConfig);

    // Set app config using deployment overrides
    this.setAppConfig(this.deploymentService.config.app_config);
  }

  /**
   * Generate a complete app config by deep-merging app config overrides
   * with the default config
   * @param overrides
   * @returns
   */
  public setAppConfig(overrides: IAppConfigOverride = {}) {
    // Ignore case where no overrides provides or overrides already applied
    if (Object.keys(overrides).length === 0) return;

    const mergedConfig = deepMergeObjects(getDefaultAppConfig(), overrides);
    this.handleConfigSideEffects(overrides, mergedConfig);
    this.appConfig$.next(mergedConfig);
    this.appConfig.set(mergedConfig);
  }

  private handleConfigSideEffects(overrides: IAppConfigOverride = {}, config: IAppConfig) {
    if (overrides.APP_ROUTE_DEFAULTS) {
      updateRoutingDefaults(config.APP_ROUTE_DEFAULTS, this.router);
    }
  }
}
