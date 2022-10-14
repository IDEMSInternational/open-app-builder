import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { APP_CONSTANTS } from "src/app/data";
import { APP_SKINS } from "src/skins";
import { IAppSkin } from "src/skins/skin.model";

// TODO - The skin service needs these values, but getting them from the
// appDataService would cause a circular dependency. Possible solution: limit
// the config settings that can be overridden at the skin level (a skin
// overriding APP_SKINS_CONFIG wouldn't make sense anyway)
const { APP_FIELDS, APP_SKINS_CONFIG } = APP_CONSTANTS;

@Injectable({
  providedIn: "root",
})
export class SkinService {
  // A hashmap of all app skins, filtered to include only those
  // that are "default" for or "enabled" by the active deployment
  enabledSkins = Object.fromEntries(
    Object.entries(APP_SKINS).filter(([skinName]) => {
      return [...APP_SKINS_CONFIG.enabled, APP_SKINS_CONFIG.default].includes(skinName);
    })
  );
  activeSkin$ = new BehaviorSubject<IAppSkin>(APP_SKINS[APP_SKINS_CONFIG.default]);

  constructor(private localStorageService: LocalStorageService) {}

  init() {
    // Retrieve the last active skin with default fallback
    const activeSkinName = this.getActiveSkinName() ?? APP_SKINS_CONFIG.default;
    // Set active skin
    this.setSkin(activeSkinName);
  }

  public setSkin(skinName: string) {
    if (skinName in this.enabledSkins) {
      console.log("[SET SKIN]", skinName);
      this.activeSkin$.next(this.enabledSkins[skinName]);
      // Use local storage so that the active skin persists across app launches
      this.localStorageService.setString(APP_FIELDS.APP_SKIN, skinName);
    } else {
      console.error(`No skin found with name "${skinName}"`);
    }
  }

  /** Get the name of the active skin, as saved in local storage */
  public getActiveSkinName() {
    return this.localStorageService.getString(APP_FIELDS.APP_SKIN);
  }

  /** Get the full active skin, from the skin name saved in local storage */
  public getActiveSkin() {
    const activeSkinName = this.getActiveSkin();
    return this.enabledSkins[activeSkinName];
  }
}
