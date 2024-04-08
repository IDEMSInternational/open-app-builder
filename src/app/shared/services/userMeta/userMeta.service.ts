import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Device } from "@capacitor/device";
import { firstValueFrom } from "rxjs";

import { AsyncServiceBase } from "../asyncService.base";
import { DbService } from "../db/db.service";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { TemplateFieldService } from "../../components/template/services/template-field.service";

@Injectable({ providedIn: "root" })
export class UserMetaService extends AsyncServiceBase {
  /** keep an in-memory copy of user to provide synchronously */
  public userMeta: IUserMeta;
  constructor(
    private dbService: DbService,
    private templateActionRegistry: TemplateActionRegistry,
    private http: HttpClient,
    private fieldService: TemplateFieldService
  ) {
    super("UserMetaService");
    this.registerInitFunction(this.initialise);
  }

  /** When first initialising ensure a default profile created and any newer defaults are merged with older user profiles */
  private async initialise() {
    await this.ensureAsyncServicesReady([this.dbService, this.fieldService]);
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
    this.fieldService.setField("_app_user_id", uuid);
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
  private async importUserFields(id: string) {
    try {
      // TODO - get type-safe return types using openapi http client
      const profile = await firstValueFrom(
        this.http.get(`/app_users/${id}`, { responseType: "json" })
      );
      if (!profile) {
        console.error("[User Import] not found:" + id);
        return;
      }
      const { contact_fields } = profile as any;
      for (const [key, value] of Object.entries(contact_fields)) {
        const fieldName = key.replace(`${this.fieldService.prefix}.`, "");
        // TODO - handle special contact fields as required (e.g. _app_skin, _app_theme)
        if (!fieldName.startsWith("_")) {
          await this.fieldService.setField(fieldName, value as string);
        }
      }
    } catch (error) {
      console.error("[User Import] failed", error);
    }
  }

  private registerUserActions() {
    const childActions = {
      import: this.importUserFields.bind(this),
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
