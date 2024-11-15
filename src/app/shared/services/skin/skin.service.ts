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
  public currentSkin: IAppSkin;
  /**  A hashmap of all skins available to the current deployment */
  private availableSkins: Record<string, IAppSkin>;

  /** Track overrides required to undo a previously applied skin (if applying another) */
  private revertOverride: RecursivePartial<IAppConfig> = {};

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
    if (this.availableSkins.hasOwnProperty(skinName)) {
      const targetSkin = this.availableSkins[skinName];
      console.log("[SKIN] SET", { targetSkin });
      // A skin can just have a name, with no associated overrides
      if (targetSkin.appConfig) {
        this.applySkinOverride(targetSkin.appConfig);
      }
      this.currentSkin = targetSkin;

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

  private applySkinOverride(appConfig: RecursivePartial<IAppConfig>) {
    const override = this.generateOverrideConfig(appConfig);
    const revert = this.generateRevertConfig(appConfig);
    this.appConfigService.setAppConfig(override);
    console.log("[SKIN] Apply override", { override, revert });
    this.revertOverride = revert;
  }

  /**
   * Skin overrides are designed to be merged on top of the default app config
   * When applying a new skin calculate the config changes required to both
   * revert any previous skin override and apply new
   */
  private generateOverrideConfig(appConfig: RecursivePartial<IAppConfig>) {
    // Merge onto new object to avoid changing stored revertOverride
    const base: RecursivePartial<IAppConfig> = {};
    return deepMergeObjects(base, this.revertOverride, appConfig);
  }

  /** Determine config that would need to be applied to revert the new update */
  private generateRevertConfig(appConfig: RecursivePartial<IAppConfig>) {
    const revert: RecursivePartial<IAppConfig> = {};
    const config = this.appConfigService.appConfig();
    for (const key of Object.keys(appConfig || {})) {
      // When reverting the skin, should target the current config value unless
      // previously overridden (in which case target initial value)
      const revertTarget = deepMergeObjects({}, config[key], this.revertOverride[key]);
      // Track what has changed to be able to revert back in future
      revert[key] = updatedDiff(appConfig[key], revertTarget);
    }
    return revert;
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
