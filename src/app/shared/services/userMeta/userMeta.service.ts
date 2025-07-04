import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Device } from "@capacitor/device";
import { firstValueFrom } from "rxjs";

import { AsyncServiceBase } from "../asyncService.base";
import { DbService } from "../db/db.service";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { TemplateFieldService } from "../../components/template/services/template-field.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { FlowTypes, getProtectedFieldName, IProtectedFieldName } from "packages/data-models";
import { deepMergeArrays } from "packages/shared/src/utils/object-utils";

type IDynamicDataState = ReturnType<DynamicDataService["getState"]>;

/**
 * List of protected fields to include when importing a user profile
 * TODO - ideally should have distinct lists for protected fields that can and cannot be imported
 * */
const IMPORTABLE_PROTECTED_FIELD_NAMES: IProtectedFieldName[] = [
  "APP_FIRST_LAUNCH",
  "APP_LANGUAGE",
  "APP_SKIN",
  "APP_THEME",
];

@Injectable({ providedIn: "root" })
export class UserMetaService extends AsyncServiceBase {
  /** keep an in-memory copy of user to provide synchronously */
  public userMeta: IUserMeta;
  constructor(
    private localStorageService: LocalStorageService,
    private dbService: DbService,
    private templateActionRegistry: TemplateActionRegistry,
    private http: HttpClient,
    private fieldService: TemplateFieldService,
    private dynamicDataService: DynamicDataService
  ) {
    super("UserMetaService");
    this.registerInitFunction(this.initialise);
  }

  /** When first initialising ensure a default profile created and any newer defaults are merged with older user profiles */
  private async initialise() {
    this.ensureSyncServicesReady([this.localStorageService]);
    await this.ensureAsyncServicesReady([
      this.dbService,
      this.fieldService,
      this.dynamicDataService,
    ]);
    this.registerUserActions();
    const userMetaValues = await this.dbService.table<IUserMetaEntry>("user_meta").toArray();
    const userMeta: IUserMeta = USER_DEFAULTS;
    userMetaValues.forEach((v) => {
      userMeta[v.key] = v.value;
    });
    const { identifier: uuid } = await Device.getId();
    // fix legacy user IDs - note this can likely be removed after v0.16
    if (userMeta.uuid && userMeta.uuid !== uuid) {
      await this.setUserMeta({ uuid, uuid_temp: userMeta.uuid });
    }
    userMeta.uuid = uuid;
    this.userMeta = userMeta;
    // populate user id contact field
    this.localStorageService.setProtected("APP_USER_ID", uuid);
  }

  getUserMeta(key: keyof IUserMeta) {
    return this.userMeta[key];
  }

  async setUserMeta(meta: Partial<IUserMeta>) {
    const entries = Object.entries(meta).map(([key, value]) => ({ key, value }));
    await this.dbService.table<IUserMetaEntry>("user_meta").bulkPut(entries as any);
    this.userMeta = { ...this.userMeta, ...meta };
  }

  /** Import existing user contact fields and replace current user */
  private async importUser(id: string) {
    if (!id) {
      throw new Error(`[User Import] no id provided`);
    }
    try {
      // TODO - get type-safe return types using openapi http client
      const profile = await firstValueFrom(
        this.http.get(`/app_users/${id}`, { responseType: "json" })
      );
      if (!profile) {
        console.error("[User Import] not found:" + id);
        return;
      }
      const { contact_fields, dynamic_data } = profile as any;
      console.log("[User Import]", profile);
      await this.importUserContactFields(contact_fields);
      await this.importUserDynamicData(dynamic_data);
      // Reload to re-initialise default values on dynamic data and internal tables
      location.reload();
    } catch (error) {
      console.error("[User Import] failed", error);
    }
  }

  private async importUserContactFields(contact_fields: Record<string, string> = {}) {
    // create a reverse mapping of protected fields that are allowed to be imported
    // to allow setting protected fields such as rp-contact-field._app_skin
    const protectedFieldMapping: Record<string, string> = {};
    const { prefix } = this.localStorageService;
    for (const fieldName of IMPORTABLE_PROTECTED_FIELD_NAMES) {
      const mappedName = `${prefix}.${getProtectedFieldName(fieldName)}`;
      protectedFieldMapping[mappedName] = fieldName;
    }
    for (const [key, value] of Object.entries(contact_fields)) {
      if (!this.localStorageService.isProtected(key)) {
        this.localStorageService.setString(key, value);
      } else {
        // allow import if non-protected or marked as importable protected
        const mappedKey = protectedFieldMapping[key];
        if (mappedKey) {
          this.localStorageService.setProtected(mappedKey as any, value);
        }
      }
    }
  }

  private async importUserDynamicData(dynamic_data?: IDynamicDataState) {
    /**
     * Reset all user dynamic data before importing new data
     * TODO: implement a variety of different merge strategies and expose options to template action
     */
    await this.dynamicDataService.resetAll();

    if (!dynamic_data) return;
    // Import dynamic data by merging with existing docs then using bulkUpsert
    // This preserves final fields (e.g. row_index) from existing docs while updating other fields
    for (const [flow_type, entriesByFlowName] of Object.entries(dynamic_data)) {
      for (const [flow_name, entriesByRowId] of Object.entries(entriesByFlowName)) {
        const entriesArray = Object.entries(entriesByRowId).map(([row_id, entry]) => ({
          ...entry,
          id: row_id,
        }));
        if (entriesArray.length > 0) {
          // Get existing documents and merge with imported data
          const existingDocs = await this.dynamicDataService.snapshot(
            flow_type as FlowTypes.FlowType,
            flow_name
          );
          const mergedData = deepMergeArrays(existingDocs, entriesArray, "id");
          await this.dynamicDataService.bulkUpsert(
            flow_type as FlowTypes.FlowType,
            flow_name,
            mergedData
          );
        }
      }
    }
    // call the getState operation as this forces wait for all pending writes to be persisted
    await this.dynamicDataService.getState();
  }

  private registerUserActions() {
    const childActions = {
      import: this.importUser.bind(this),
    };
    const childActionNames = Object.keys(childActions).join(",");
    this.templateActionRegistry.register({
      user: async ({ args }) => {
        const [actionId, ...childArgs] = args;
        if (!childActions[actionId]) {
          console.error(
            `[${actionId}] user action not defined. Available actions:\n${childActionNames}`
          );
          return;
        }
        return childActions[actionId](childArgs);
      },
    });
  }
}

interface IUserMetaEntry {
  key: keyof IUserMeta;
  value: any;
}

export interface IUserMeta {
  uuid: string;
  uuid_temp?: string; // legacy id that previously may have been set
  first_app_open: isostring;
  current_date: isostring;
  app_skin: "MODULE_FOCUS_SKIN" | "BLOBS" | "BUTTONS";
}

type isostring = string;
const USER_DEFAULTS: IUserMeta = {
  // TODO - better to use different service to ensure UUID unique
  uuid: null,
  app_skin: "MODULE_FOCUS_SKIN",
  first_app_open: null,
  current_date: null,
};
