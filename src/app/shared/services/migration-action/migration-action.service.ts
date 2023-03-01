import { Injectable } from "@angular/core";
import { AsyncServiceBase } from "../asyncService.base";
import { AppDataService } from "../data/app-data.service";
import { APP_VERSION } from "src/environments/version";
import { environment } from "src/environments/environment";

interface IMigrationRow {
  id: string;
  action_list: any[];
  condition_list: any[];
}

@Injectable({
  providedIn: "root",
})
/**
 * Authoring service to allow specific actions to be triggered on first run
 * of a specific app version
 */
export class MigrationActionService extends AsyncServiceBase {
  constructor(private dataService: AppDataService) {
    super("Migration Action");
    this.registerInitFunction(this.initialise);
  }

  private async initialise() {
    this.setVersionFields();
    this.runMigrations();

    console.log("initialise migration actions");
  }

  private async runMigrations() {
    const { enabled, dataListName } = environment.deploymentConfig.app_config.MIGRATION_ACTIONS;
    if (enabled) {
      const dataList = await this.dataService.getSheet("data_list", dataListName);
      if (dataList) {
        const migrations = dataList.rows as IMigrationRow[];
        const orderedMigrations = migrations.sort((a, b) => (a.id > b.id ? 1 : -1));
        for (const migration of orderedMigrations) {
          console.log("running migrations", migration);
        }
      }
    }
  }

  /**
   * Assign any previously set app version fields to `_previous` for tracking in condition lists
   **/
  private setVersionFields() {
    const { name, code } = APP_VERSION;
    const { APP_VERSION_NAME, APP_VERSION_CODE } =
      environment.deploymentConfig.app_config.APP_FIELDS;

    this.backupLocalStorageValue(APP_VERSION_NAME, "_previous");
    this.backupLocalStorageValue(APP_VERSION_CODE, "_previous");

    localStorage.setItem(APP_VERSION_NAME, name);
    localStorage.setItem(APP_VERSION_CODE, `${code}`);
  }

  /** Utility to copy the entry of a current localstorage field to another field name suffix */
  private backupLocalStorageValue(name: string, suffix: string) {
    const value = localStorage.getItem(name);
    if (value !== undefined) {
      localStorage.setItem(`${name}${suffix}`, value);
    }
  }
}
