import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { IAppConfig, IAppSkin } from "data-models";
import { updatedDiff } from "deep-object-diff";
import { arrayToHashmap, deepMergeObjects, RecursivePartial } from "../../utils";
import { AppConfigService } from "../app-config/app-config.service";
import { TemplateService } from "../../components/template/services/template.service";
import { ThemeService } from "src/app/feature/theme/services/theme.service";
import { SyncServiceBase } from "../syncService.base";

@Injectable({
  providedIn: "root",
})
export class SkinService extends SyncServiceBase {
  public currentSkinName: string;
  /**  A hashmap of all skins available to the current deployment */
  private availableSkins: Record<string, IAppSkin>;

  constructor(
    private appConfigService: AppConfigService,
    private localStorageService: LocalStorageService,
    private templateService: TemplateService,
    private themeService: ThemeService
  ) {
    super("Skin Service");
    this.initialise();
  }

  private async initialise() {
    this.ensureSyncServicesReady([
      this.localStorageService,
      this.appConfigService,
      this.themeService,
      this.templateService,
    ]);
    this.loadActiveSkin();
  }

  /**
   * Set the active skin
   * @param skinName The name of the target skin
   * @param [isInit=false] Whether or not the function is being triggered by the service's initialisation
   * */
  public setSkin(skinName: string, isInit = false) {
    // ignore if skin name unchanged
    if (skinName === this.currentSkinName) {
      return;
    }
    this.currentSkinName = skinName;

    if (this.availableSkins.hasOwnProperty(skinName)) {
      const targetSkin = this.availableSkins[skinName];
      this.appConfigService.setAppConfig(targetSkin.appConfig, "skin");
      console.log("[SKIN] SET", targetSkin);

      if (!isInit) {
        // Update default values when skin changed to allow for skin-specific global overrides
        // Don't run on initialisation, since the skin and appConfig services must init before the template service and its dependencies
        this.templateService.initialiseDefaultFieldAndGlobals();
        // Do not apply skin theme changes on init, to avoid resetting the theme to the active skin's default on app reload
        this.applySkinThemeChanges();
      }
      // Use local storage so that the active skin persists across app launches
      this.localStorageService.setProtected("APP_SKIN", targetSkin.name);
    } else {
      console.error(`No skin found with name "${skinName}"`, {
        availableSkins: this.availableSkins,
      });
    }
  }

  /** Get the name of the active skin, as saved in local storage */
  public getActiveSkinName() {
    return this.localStorageService.getProtected("APP_SKIN");
  }

  /**
   * Load the active app skin. Loads previously stored configuration if available,
   * with fallback to default app skin
   */
  private loadActiveSkin() {
    const { available, defaultSkinName } = this.appConfigService.appConfig().APP_SKINS;
    this.availableSkins = arrayToHashmap(available, "name");
    const activeSkinName = this.getActiveSkinName();
    if (activeSkinName && this.availableSkins.hasOwnProperty(activeSkinName)) {
      this.setSkin(activeSkinName, true);
    } else {
      this.setSkin(defaultSkinName, true);
    }
  }

  private applySkinThemeChanges() {
    const { available, defaultThemeName } = this.appConfigService.appConfig().APP_THEMES;
    if (defaultThemeName) {
      this.themeService.setTheme(defaultThemeName);
    }
    // If target skin has no default theme and the current theme is not available in the target skin,
    // then set theme to the first available theme of the target skin
    else if (!this.isCurrentThemeAvailableInTargetSkin()) {
      this.themeService.setTheme(available[0]);
    }
  }

  private isCurrentThemeAvailableInTargetSkin() {
    const currentTheme = this.themeService.getCurrentTheme();
    return this.appConfigService.appConfig().APP_THEMES.available.includes(currentTheme);
  }
}
