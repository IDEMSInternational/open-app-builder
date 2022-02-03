import { Injectable } from "@angular/core";
import { DbService } from "src/app/shared/services/db/db.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class SettingsService {
  constructor(private localStorageService: LocalStorageService, private dbService: DbService) {}

  resetApp() {
    this.localStorageService.clear();
    this.dbService.deleteDatabase().then(() => {
      // redirect to home page and reload
      location.href = "/";
    });
  }
}
