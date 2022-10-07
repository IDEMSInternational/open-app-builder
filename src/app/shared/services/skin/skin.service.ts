import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { APP_CONSTANTS } from "src/app/data";

const { APP_FIELDS } = APP_CONSTANTS;

// TODO - Where should these live and be added to? Should ultimately come from sheets?
// Could live at deployment level, e.g. app_constants.compatible_skins
const SKINS = ["default", "modular"];

@Injectable({
  providedIn: "root",
})
export class SkinService {
  currentSkin$ = new BehaviorSubject<string>(null);
  availableSkins = SKINS;

  constructor(private localStorageService: LocalStorageService) {}

  init() {
    const currentSkinName = this.getCurrentSkin();
    if (currentSkinName) {
      this.setSkin(currentSkinName);
    } else {
      this.setSkin("default");
    }
  }

  public setSkin(skinName: string) {
    if (this.availableSkins.includes(skinName)) {
      console.log("[SET SKIN]", skinName);
      this.currentSkin$.next(skinName);
      // Use local storage so that the current skin persists across app launches
      this.localStorageService.setString(APP_FIELDS.APP_SKIN, skinName);
    } else {
      console.error(`No skin found with name "${skinName}"`);
    }
  }

  public getCurrentSkin() {
    return this.localStorageService.getString(APP_FIELDS.APP_SKIN);
  }

  public getAllSkins() {
    return this.availableSkins;
  }
}
