import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  DB_SERVER_MAPPING,
  IDBMeta,
  IDBServerMapping,
  IDBServerUserRecord,
  IDBTable,
} from "data-models";
import { interval, lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { IAppConfig } from "../../model";
import { AppConfigService } from "../app-config/app-config.service";
import { AsyncServiceBase } from "../asyncService.base";
import { UserMetaService } from "../userMeta/userMeta.service";
import { DbService } from "./db.service";

@Injectable({ providedIn: "root" })
/**
 *
 * TODOs
 * - Batch update (requires api changes)
 * - Websocket connect
 * - 2-way sync (possibly via sync protocol)
 */
export class DBSyncService extends AsyncServiceBase {
  syncSchedule;
  constructor(
    private dbService: DbService,
    private http: HttpClient,
    private userMetaService: UserMetaService,
    private appConfigService: AppConfigService
  ) {
    super("DB Sync");
    this.registerInitFunction(this.inititialise);
  }

  private async inititialise() {
    await this.ensureAsyncServicesReady([this.dbService, this.userMetaService]);
    this.ensureSyncServicesReady([this.appConfigService]);
    this.subscribeToAppConfigChanges();
    // Automatically sync data periodically
    if (environment.production) {
      this.syncToServer();
      this.syncSchedule.subscribe(() => {
        this.syncToServer();
      });
    }
  }

  /** sync local tables to server */
  public async syncToServer() {
    for (const table_id of Object.keys(DB_SERVER_MAPPING)) {
      await this.syncTable(table_id as IDBTable);
    }
  }

  /** Sync all pending records in a table to the server */
  public async syncTable(table_id: IDBTable) {
    const mapping = DB_SERVER_MAPPING[table_id];
    if (mapping) {
      const { api_endpoint } = mapping;
      const collection = this.dbService.table(table_id).where({ _sync_status: "pending" });
      const records = await collection.toArray();
      for (const record of records) {
        const serverRecord = this.generateServerRecord(record, mapping);
        const endpoint = api_endpoint(record);
        try {
          // Use api endpoint to post update, and if successful update sync status
          await lastValueFrom(this.http.post(endpoint, serverRecord));
          const _sync_status: IDBMeta["_sync_status"] = "synced";
          await this.dbService.table(table_id).update(record, { _sync_status });
          return { success: true };
        } catch (error) {
          console.error(error);
          return { error };
        }
      }
    }
  }

  /** Populate common app_meta to local record */
  private generateServerRecord(record: any, mapping: IDBServerMapping) {
    const { is_user_record, user_record_id_field } = mapping;
    if (is_user_record && user_record_id_field) {
      const serverRecord: IDBServerUserRecord = {
        app_user_id: this.userMetaService.getUserMeta("uuid"),
        app_user_record_id: record[user_record_id_field],
        app_deployment_name: environment.deploymentName,
        app_version: environment.version,
        data: record,
      };
      return serverRecord;
    }
    return record;
  }

  subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      this.syncSchedule = interval(appConfig.SERVER_SYNC_FREQUENCY_MS);
    });
  }
}
