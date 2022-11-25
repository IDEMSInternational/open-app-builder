import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { IAppSkin } from "data-models";
import { arrayToHashmap } from "../../utils";
import { AppConfigService } from "../app-config/app-config.service";
import { TemplateService } from "../../components/template/services/template.service";
import { Router } from "@angular/router";
import { APP_CONFIG } from "src/app/data";
import { ThemeService } from "src/app/feature/theme/services/theme.service";

@Injectable({
  providedIn: "root",
})
export class SkinService {
  // A hashmap of all skins available to the current deployment
  private availableSkins: Record<string, IAppSkin>;
  private activeSkin$ = new BehaviorSubject<IAppSkin | undefined>(undefined);

  constructor(
    private localStorageService: LocalStorageService,
    private appConfigService: AppConfigService,
    private templateService: TemplateService,
    private themeService: ThemeService,
    private router: Router
  ) {
    // eagerly initialise so that updated appConfig is available to other services
    this.init();
  }

  private init() {
    const skinsConfig = this.appConfigService.APP_CONFIG.APP_SKINS;
    this.availableSkins = arrayToHashmap(skinsConfig.available, "name");
    // Retrieve the last active skin with default fallback
    const activeSkinName = this.getActiveSkinName() ?? skinsConfig.defaultSkinName;
    // Set active skin
    this.setSkin(activeSkinName, true);
  }

  /**
   * Set the active skin
   * @param skinName The name of the target skin
   * @param {boolean} [isInit=false] Whether or not the function is being triggered by the service's initialisation
   * */
  public setSkin(skinName: string, isInit = false) {
    if (skinName in this.availableSkins) {
      const oldSkin = this.activeSkin$.value;
      const targetSkin = this.availableSkins[skinName];
      console.log("[SET SKIN]", skinName, targetSkin);
      this.activeSkin$.next(targetSkin);
      // Update appConfig to reflect any overrides defined by the skin
      this.appConfigService.updateAppConfig(targetSkin.appConfig);
      // Update default values when skin changed to allow for skin-specific global overrides
      // Don't run on initialisation, since the skin and appConfig services must init before the template service and its dependencies
      if (!isInit) {
        this.templateService.initialiseDefaultFieldAndGlobals();
      }
      this.applySkinThemeChanges();
      // Use local storage so that the active skin persists across app launches
      this.localStorageService.setString(
        this.appConfigService.APP_CONFIG.APP_FIELDS.APP_SKIN,
        targetSkin.name
      );
      this.updateRoutingDefaults(targetSkin, oldSkin);
    } else {
      console.error(`No skin found with name "${skinName}"`, {
        availableSkins: this.availableSkins,
      });
    }
  }

  /** Override changes to config-dependent routing config inherited in app-routing.module */
  private updateRoutingDefaults(newSkin?: IAppSkin, oldSkin?: IAppSkin) {
    const newRouteDefaults = newSkin?.appConfig?.APP_ROUTE_DEFAULTS;
    let routes = this.router.config;
    if (newRouteDefaults) {
      const { APP_ROUTE_DEFAULTS: oldRouteDefaults } = oldSkin?.appConfig || APP_CONFIG;
      // Replace default home route
      // { path: "", redirectTo: APP_ROUTE_DEFAULTS.home_route, pathMatch: "full" },
      if (newRouteDefaults.home_route !== oldRouteDefaults.home_route) {
        const homeRouteIndex = routes.findIndex((route) => route.path === "");
        if (homeRouteIndex > -1) {
          routes[homeRouteIndex].redirectTo = newRouteDefaults.home_route;
        }
      }
      // Replace fallbackRoute
      // { path: "**", redirectTo: APP_ROUTE_DEFAULTS.fallback_route };
      if (newRouteDefaults.fallback_route !== oldRouteDefaults.fallback_route) {
        const fallbackRouteIndex = routes.findIndex((route) => route.path === "**");
        if (fallbackRouteIndex > -1) {
          routes[fallbackRouteIndex].redirectTo = newRouteDefaults.fallback_route;
        }
      }
      // Remove old
      if (oldRouteDefaults.redirects) {
        const redirectedPaths = oldRouteDefaults.redirects.map((route) => route.path);
        routes = routes.filter((route) => !redirectedPaths.includes(route.path));
      }
      // Add new redirects
      if (newRouteDefaults.redirects) {
        for (const { path, redirectTo } of newRouteDefaults.redirects) {
          routes.push({ path, redirectTo });
        }
      }
      this.router.resetConfig(routes);
    }
  }

  /** Get the name of the active skin, as saved in local storage */
  public getActiveSkinName() {
    return this.localStorageService.getString(this.appConfigService.APP_CONFIG.APP_FIELDS.APP_SKIN);
  }

  /** Get the full active skin, from the skin name saved in local storage */
  public getActiveSkin() {
    const activeSkinName = this.getActiveSkin();
    return this.availableSkins[activeSkinName];
  }

  private applySkinThemeChanges() {
    const targetSkinDefaultTheme = this.appConfigService.APP_CONFIG.APP_THEMES.defaultThemeName;
    if (targetSkinDefaultTheme) {
      this.themeService.setTheme(targetSkinDefaultTheme);
    }
    // If target skin has no default theme and the current theme is not available in the target skin,
    // then set theme to the first available theme of the target skin
    else if (!this.isCurrentThemeAvailableInTargetSkin()) {
      this.themeService.setTheme(this.appConfigService.APP_CONFIG.APP_THEMES.available[0]);
    }
  }

  private isCurrentThemeAvailableInTargetSkin() {
    const currentTheme = this.themeService.getCurrentTheme();
    return this.appConfigService.APP_CONFIG.APP_THEMES.available.includes(currentTheme);
  }
}
