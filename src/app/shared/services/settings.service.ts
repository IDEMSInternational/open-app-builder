import { Injectable } from "@angular/core";
import { DbService } from "src/app/shared/services/db/db.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { SyncServiceBase } from "./syncService.base";

@Injectable({
  providedIn: "root",
})
export class SettingsService extends SyncServiceBase {
  constructor(private localStorageService: LocalStorageService, private dbService: DbService) {
    super("Settings");
  }

  async resetApp() {
    await this.dbService.ready();
    this.localStorageService.clear();
    this.dbService.deleteDatabase().then(() => {
      // redirect to home page and reload
      location.href = "/";
    });
  }
}
