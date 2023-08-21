import { booleanStringToBoolean } from "src/app/shared/utils";
import { AppDataHandlerBase } from "./base";
import { LocalStorageService } from "../../local-storage/local-storage.service";
import { DbService } from "../../db/db.service";
import type { IFlowEvent } from "data-models/db.model";

/**
 * Evaluate `@field` get and set methods
 */
export class Field extends AppDataHandlerBase {
  constructor(private localStorageService: LocalStorageService, private dbService: DbService) {
    super("field");
  }

  public override async get(fieldname: string) {
    return this.getField(fieldname);
  }
  public override async set(fieldname: string, value: string) {
    return this.setField(fieldname, value);
  }

  /**
   * HACK - duplicated method from template-field.service
   * Should be combined
   */
  private getField(key: string, showWarnings = true) {
    let val: any = this.localStorageService.getString("rp-contact-field." + key);
    // provide a fallback if the target variable does not exist in local storage
    if (val === null && showWarnings) {
      // console.warn("field value not found for key:", key);
      val = undefined;
    }
    // convert boolean strings if required
    val = booleanStringToBoolean(val);
    // convert undefined string to undefined type
    if (val === "undefined") val = undefined;
    // console.log("[Field Retrieved]", key, val);
    return val;
  }

  /**
   * HACK - duplicated method from template-field.service
   * Should be combined
   * */
  public setField(key: string, value: string) {
    console.log("[SET FIELD]", key, value);
    if (typeof value === "object") {
      console.warn("Warning - expected string field but received", { key, value });
      try {
        value = JSON.stringify(value);
      } catch (error) {
        console.warn("string conversion failed", error);
      }
    }
    // write to local storage - this will cast to string
    this.localStorageService.setString("rp-contact-field." + key, value);

    // write to db - note this can handle more data formats but only string/number will be available to queries
    if (typeof value === "boolean") value = "value";
    const evt: IFlowEvent = {
      ...this.dbService.generateDBMeta(),
      event: "set",
      value,
      name: key,
      type: "contact_field" as any,
    };
    return this.dbService.table("data_events").add(evt);
  }
}
