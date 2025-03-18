import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  DB_SERVER_MAPPING,
  IDBMeta,
  IDBServerMapping,
  IDBServerUserRecord,
  IDBTable,
} from "data-models";
import { lastValueFrom } from "rxjs";
import { AppConfigService } from "../app-config/app-config.service";
import { AsyncServiceBase } from "../asyncService.base";
import { UserMetaService } from "../userMeta/userMeta.service";
import { DbService } from "./db.service";
import { DeploymentService } from "../deployment/deployment.service";

@Injectable({ providedIn: "root" })
/**
 * Handle syncing local tables to specific server endpoints, such as `feedback` and
 * `local_notification_interaction`
 *
 * NOTE - user profile data is managed separately via the `ServerSyncService`
 *
 * TODOs
 * - Batch update (requires api changes)
 * - Websocket connect
 * - 2-way sync (possibly via sync protocol)
 */
export class DBSyncService extends AsyncServiceBase {
  constructor(
    private dbService: DbService,
    private http: HttpClient,
    private userMetaService: UserMetaService,
    private appConfigService: AppConfigService,
    private deploymentService: DeploymentService
  ) {
    super("DB Sync");
    this.registerInitFunction(this.initialise);
  }

  private async initialise() {
    await this.ensureAsyncServicesReady([this.dbService, this.userMetaService]);
    this.ensureSyncServicesReady([this.appConfigService]);
  }

  /**
   * Sync `feedback` and `local_notifications_interaction` table data using their
   * corresponding api endpoints
   *
   * NOTE - this is triggered regularly via the `ServerService` or on demand via
   * `emit: server_sync` action
   */
  public async syncDBTables() {
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
    const { name, _app_builder_version } = this.deploymentService.config;
    const { is_user_record, user_record_id_field } = mapping;
    if (is_user_record && user_record_id_field) {
      const serverRecord: IDBServerUserRecord = {
        app_user_id: this.userMetaService.getUserMeta("uuid"),
        app_user_record_id: record[user_record_id_field],
        app_deployment_name: name,
        app_version: _app_builder_version,
        data: record,
      };
      return serverRecord;
    }
    return record;
  }
}
