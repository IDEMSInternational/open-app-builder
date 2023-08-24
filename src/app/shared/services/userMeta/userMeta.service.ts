import { Injectable } from "@angular/core";
import { Device } from "@capacitor/device";
import { AsyncServiceBase } from "../asyncService.base";
import { DbService } from "../db/db.service";

@Injectable({ providedIn: "root" })
export class UserMetaService extends AsyncServiceBase {
  /** keep an in-memory copy of user to provide synchronously */
  public userMeta: IUserMeta;
  constructor(private dbService: DbService) {
    super("UsesrMetaService");
    this.registerInitFunction(this.initialise);
  }

  /** When first initialising ensure a default profile created and any newer defaults are merged with older user profiles */
  private async initialise() {
    await this.ensureAsyncServicesReady([this.dbService]);
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
  }

  getUserMeta(key: keyof IUserMeta) {
    return this.userMeta[key];
  }

  async setUserMeta(meta: Partial<IUserMeta>) {
    const entries = Object.entries(meta).map(([key, value]) => ({ key, value }));
    await this.dbService.table<IUserMetaEntry>("user_meta").bulkPut(entries as any);
    this.userMeta = { ...this.userMeta, ...meta };
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
