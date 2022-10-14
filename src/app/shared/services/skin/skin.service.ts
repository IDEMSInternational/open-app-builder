import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { APP_CONSTANTS } from "src/app/data";
import { APP_SKINS } from "src/skins";
import { IAppSkin } from "src/skins/skin.model";

const { APP_FIELDS, APP_SKIN_DEFAULTS } = APP_CONSTANTS;

@Injectable({
  providedIn: "root",
})
export class SkinService {
  // A hashmap of all app skins, filtered to include only those
  // that are "default" or "available" to the active deployment
  availableSkins = Object.fromEntries(
    Object.entries(APP_SKINS).filter(([skinName]) => {
      return [...APP_SKIN_DEFAULTS.available, APP_SKIN_DEFAULTS.default].includes(skinName);
    })
  );
  activeSkin$ = new BehaviorSubject<IAppSkin>(APP_SKINS[APP_SKIN_DEFAULTS.default]);

  constructor(private localStorageService: LocalStorageService) {}

  init() {
    // Retrieve the last active skin with default fallback
    const activeSkinName = this.getActiveSkinName() ?? APP_SKIN_DEFAULTS.default;
    // Set active skin
    this.setSkin(activeSkinName);
  }

  public setSkin(skinName: string) {
    if (skinName in this.availableSkins) {
      console.log("[SET SKIN]", skinName);
      this.activeSkin$.next(this.availableSkins[skinName]);
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
    return this.availableSkins[activeSkinName];
  }
}
