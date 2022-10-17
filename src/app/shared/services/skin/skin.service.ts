import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { APP_CONFIG } from "src/app/data";
import { IAppSkin } from "data-models";
import { arrayToHashmap } from "../../utils";
import { AppConfigService } from "../app-config/app-config.service";

@Injectable({
  providedIn: "root",
})
export class SkinService {
  // A hashmap of all skins available to the current deployment
  availableSkins: { [skinName: string]: IAppSkin };
  activeSkin$ = new BehaviorSubject<IAppSkin | {}>({});

  constructor(
    private localStorageService: LocalStorageService,
    private appConfigService: AppConfigService
  ) {}

  init() {
    const skinsConfig = this.appConfigService.APP_CONFIG.APP_SKINS;
    this.availableSkins = arrayToHashmap([...skinsConfig.available, skinsConfig.default], "name");
    // Retrieve the last active skin with default fallback
    const activeSkinName = this.getActiveSkinName() ?? skinsConfig.default.name;
    // Set active skin
    this.setSkin(activeSkinName);
  }

  public setSkin(skinName: string) {
    if (skinName in this.availableSkins) {
      console.log("[SET SKIN]", skinName);
      const targetSkin = this.availableSkins[skinName];
      this.activeSkin$.next(targetSkin);
      // Update appConfig to reflect any overrides defined by the skin
      this.appConfigService.updateAppConfig(targetSkin.appConfig);
      // Use local storage so that the active skin persists across app launches
      this.localStorageService.setString(
        this.appConfigService.APP_CONFIG.APP_FIELDS.APP_SKIN,
        targetSkin.name
      );
    } else {
      console.error(`No skin found with name "${skinName}"`);
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
}
