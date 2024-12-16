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
import { isEqual } from "packages/shared/src/utils/object-utils";

/** Config overrides can come from a variety of sources with orders of priority */
const APP_CONFIG_OVERRIDE_ORDER = {
  default: 0,
  deployment: 1,
  skin: 2,
  template: 3,
};
type IAppConfigOverrideSource = keyof typeof APP_CONFIG_OVERRIDE_ORDER;

@Injectable({
  providedIn: "root",
})
export class AppConfigService extends SyncServiceBase {
  /** Signal representation of current appConfig value */
  public appConfig = signal<IAppConfig>(undefined);

  /**
   * @deprecated - prefer use of config signal and computed/effect bindings
   * List of constants provided by data-models combined with deployment-specific overrides and skin-specific overrides
   **/
  public appConfig$ = new BehaviorSubject<IAppConfig>(undefined);

  /** Tracking observable of deep changes to app config, exposed in `changes` public method */
  private appConfigChanges$: Observable<RecursivePartial<IAppConfig>>;

  /** Array of all applied config overrides. Array position represents override order (0-3) */
  private configOverrides: IAppConfigOverride[] = [];

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

  /** When service initialises load config defaults and deployment to trigger any side-effects  */
  private initialise() {
    this.setAppConfig(getDefaultAppConfig(), "default");
    this.setAppConfig(this.deploymentService.config.app_config, "deployment");
  }

  /**
   * Generate a complete app config by deep-merging app config overrides
   * with the initial config
   */
  public setAppConfig(overrides: IAppConfigOverride = {}, source: IAppConfigOverrideSource) {
    // use override source to specify index used in override order
    const overrideIndex = APP_CONFIG_OVERRIDE_ORDER[source];

    if (!overrideIndex && overrideIndex !== 0)
      return console.error(`[APP CONFIG] Unknown config override source, ${source}`);

    // ignore updates that are identical to current overrides for a given level
    if (isEqual(overrides, this.configOverrides[overrideIndex])) {
      return;
    }

    // replace any overrides at the existing level (e.g. skin or template)
    this.configOverrides[overrideIndex] = overrides;

    // merge all levels of override, with higher order levels merged on top of lower
    const mergedConfig = deepMergeObjects({} as IAppConfig, ...this.configOverrides);

    // if merged config unchanged ignore (e.g. lower order update superseded by higher order)
    if (isEqual(this.appConfig(), mergedConfig)) {
      return;
    }

    // some app config properties should be functions, but may be defined as boolean values,
    // e.g. in template parameter_list to disable a certain property on that template
    const functionKeys = ["should_show_back_button", "should_show_menu_button"];
    functionKeys.forEach((key) => {
      mergedConfig.APP_HEADER_DEFAULTS[key] = this.normaliseToFunction(
        mergedConfig.APP_HEADER_DEFAULTS[key]
      );
    });

    // trigger change effects
    this.handleConfigSideEffects(overrides, mergedConfig);
    this.appConfig.set(mergedConfig);
    this.appConfig$.next(mergedConfig);
  }

  private normaliseToFunction(value: any) {
    return typeof value === "function" ? value : () => !!value;
  }

  private handleConfigSideEffects(overrides: IAppConfigOverride = {}, config: IAppConfig) {
    if (overrides.APP_ROUTE_DEFAULTS) {
      updateRoutingDefaults(config.APP_ROUTE_DEFAULTS, this.router);
    }
  }
}
