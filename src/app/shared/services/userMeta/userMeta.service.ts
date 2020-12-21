import { Injectable } from "@angular/core";
import { generateRandomId } from "../../utils";
import { MODULE_LIST } from "../data/data.service";
import { DbService } from "../db/db.service";

@Injectable({ providedIn: "root" })
export class UserMetaService {
  /** keep an in-memory copy of user to provide synchronously */
  private userMeta: IUserMeta;
  constructor(private dbService: DbService) {}

  /** When first initialising ensure a default profile created and any newer defaults are merged with older user profiles */
  async init() {
    const userMetaValues = await this.dbService.table<IUserMetaEntry>("user_meta").toArray();
    const userMeta: IUserMeta = USER_DEFAULTS;
    userMetaValues.forEach((v) => {
      userMeta[v.key] = v.value;
    });
    if (!userMeta.uuid) {
      console.log("initialising new user");
      await this.setUserMeta({ ...userMeta, uuid: `temp_${generateRandomId()}` });
    }
    console.log("user initialised", userMeta);
    this.userMeta = userMeta;
    return userMeta;
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

interface IUserMeta {
  uuid: string;
  first_app_open: isostring;
  app_skin: "MODULE_FOCUS_SKIN" | "BLOBS" | "BUTTONS";
  active_module: string;
}

type isostring = string;

const USER_DEFAULTS: IUserMeta = {
  // TODO - better to use different service to ensure UUID unique
  uuid: null,
  app_skin: "MODULE_FOCUS_SKIN",
  first_app_open: null,
  // Set default module id as first defined in module list
  active_module: MODULE_LIST[0].rows[0].id,
};
