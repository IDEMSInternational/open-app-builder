import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { APP_CONSTANTS } from "src/app/data";
import { AVAILABLE_APP_SKINS } from "src/skins";
import { IAppSkin } from "src/skins/skin.model";

const { APP_FIELDS, APP_SKINS } = APP_CONSTANTS;

@Injectable({
  providedIn: "root",
})
export class SkinService {
  availableSkins = AVAILABLE_APP_SKINS;
  currentSkin$ = new BehaviorSubject<IAppSkin>(AVAILABLE_APP_SKINS[APP_SKINS.default_skin_name]);

  constructor(private localStorageService: LocalStorageService) {}

  init() {
    const currentSkinName = this.getCurrentSkinName();
    if (this.skinExists(currentSkinName)) {
      this.setSkin(currentSkinName);
    } else {
      this.setSkin(APP_SKINS.default_skin_name);
    }
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

  public getSkinFromName(skinName: string) {
    return this.availableSkins[skinName];
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
