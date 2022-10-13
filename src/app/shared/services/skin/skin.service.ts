import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { APP_CONSTANTS } from "src/app/data";
import { AVAILABLE_APP_SKINS } from "src/skins";
import { IAppSkin } from "src/skins/skin.model";

const { APP_FIELDS, APP_SKIN_DEFAULTS } = APP_CONSTANTS;

@Injectable({
  providedIn: "root",
})
export class SkinService {
  availableSkins = AVAILABLE_APP_SKINS;
  currentSkin$ = new BehaviorSubject<IAppSkin>(AVAILABLE_APP_SKINS[APP_SKIN_DEFAULTS.name]);

  constructor(private localStorageService: LocalStorageService) {}

  init() {
    // Retrieve the last active skin with default fallback
    const activeSkinName = this.getCurrentSkinName() ?? APP_SKIN_DEFAULTS.name;
    // Set active skin
    this.setSkin(activeSkinName);
  }

  public setSkin(skinName: string) {
    if (this.skinExists(skinName)) {
      console.log("[SET SKIN]", skinName);
      this.currentSkin$.next(this.availableSkins[skinName]);
      // Use local storage so that the current skin persists across app launches
      this.localStorageService.setString(APP_FIELDS.APP_SKIN, skinName);
    } else {
      console.error(`No skin found with name "${skinName}"`);
    }
  }

  private skinExists(skinName: string) {
    return skinName in this.availableSkins;
  }

  /** Get the name of the current skin, as saved in local storage */
  public getCurrentSkinName() {
    return this.localStorageService.getString(APP_FIELDS.APP_SKIN);
  }

  /** Get the full current skin, from the skin name saved in local storage */
  public getCurrentSkin() {
    const currentSkinName = this.getCurrentSkinName();
    return this.availableSkins[currentSkinName];
  }

  /** Get a hashmap of all the skins that are available to be applied */
  public getAllSkins() {
    return this.availableSkins;
  }
}
