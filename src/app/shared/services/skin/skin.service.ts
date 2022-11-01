import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { IAppSkin } from "data-models";
import { arrayToHashmap } from "../../utils";
import { AppConfigService } from "../app-config/app-config.service";
import { TemplateService } from "../../components/template/services/template.service";
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
    private themeService: ThemeService
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
   * @param {boolean} [isInit=false] Whether the function is being triggered by the service's initialisaion
   * */
  public setSkin(skinName: string, isInit = false) {
    if (skinName in this.availableSkins) {
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
    } else {
      console.error(`No skin found with name "${skinName}"`, {
        availableSkins: this.availableSkins,
      });
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
