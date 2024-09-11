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
import { TemplateCalcService } from "../../components/template/services/template-calc.service";

type IDynamicDataState = ReturnType<DynamicDataService["getState"]>;

@Injectable({ providedIn: "root" })
export class UserMetaService extends AsyncServiceBase {
  /** keep an in-memory copy of user to provide synchronously */
  public userMeta: IUserMeta;
  constructor(
    private dbService: DbService,
    private dynamicDataService: DynamicDataService,
    private fieldService: TemplateFieldService,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private templateActionRegistry: TemplateActionRegistry,
    private templateCalcService: TemplateCalcService
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
      this.templateCalcService,
    ]);
    this.registerUserActions();
    const userMetaValues = await this.dbService.table<IUserMetaEntry>("user_meta").toArray();
    this.userMeta = USER_DEFAULTS;
    userMetaValues.forEach((v) => {
      this.userMeta[v.key] = v.value;
    });
    const { identifier: uuid } = await Device.getId();
    await this.updateUuid(uuid);
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
      console.log("[User Import]", { contact_fields, dynamic_data });
      await this.importUserContactFields(contact_fields);
      await this.importUserDynamicData(dynamic_data);
    } catch (error) {
      console.error("[User Import] failed", error);
    }
  }

  private async updateUuid(uuid: string) {
    // fix legacy user IDs - note this can likely be removed after v0.16
    if (this.userMeta.uuid && this.userMeta.uuid !== uuid) {
      await this.setUserMeta({ uuid, uuid_temp: this.userMeta.uuid });
    }
    this.userMeta.uuid = uuid;
    // populate user id contact field
    this.localStorageService.setProtected("APP_USER_ID", uuid);
    // update calc context
    this.templateCalcService.updateThisCtxt("app_user_id", uuid);
  }

  private async importUserContactFields(contact_fields = {}) {
    for (const [key, value] of Object.entries(contact_fields)) {
      // TODO - handle special contact fields as required (e.g. _app_skin, _app_theme)
      if (!this.localStorageService.isProtected(key)) {
        this.localStorageService.setString(key, value as string);
      }
      // handle user ID import
      if (key === this.localStorageService.getProtectedFieldNameWithPrefix("APP_USER_ID")) {
        await this.updateUuid(String(value));
      }
    }
  }

  private async importUserDynamicData(dynamic_data?: IDynamicDataState) {
    if (!dynamic_data) return;
    for (const [flow_type, entriesByFlowName] of Object.entries(dynamic_data)) {
      for (const [flow_name, entriesByRowId] of Object.entries(entriesByFlowName)) {
        for (const [row_id, entry] of Object.entries(entriesByRowId)) {
          // as no batch update method exists simply send writes and wait at end
          this.dynamicDataService.update(flow_type as any, flow_name, row_id, entry);
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
