import { Injectable } from "@angular/core";
import { IFlowEvent } from "data-models";
import { FlowTypes } from "data-models";
import { DbService } from "src/app/shared/services/db/db.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { booleanStringToBoolean } from "src/app/shared/utils";
import { TemplateTranslateService } from "./template-translate.service";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { TemplateActionRegistry } from "./instance/template-action.registry";

@Injectable({ providedIn: "root" })
export class TemplateFieldService extends AsyncServiceBase {
  globals: { [name: string]: FlowTypes.GlobalRow } = {};

  constructor(
    private localStorageService: LocalStorageService,
    private dbService: DbService,
    private translateService: TemplateTranslateService,
    private templateActionRegistry: TemplateActionRegistry
  ) {
    super("TemplateField");
    this.registerInitFunction(this.initialise);
    this.registerTemplateActionHandlers();
  }

  private async initialise() {
    await this.ensureAsyncServicesReady([this.dbService, this.translateService]);
    this.ensureSyncServicesReady([this.localStorageService]);
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      set_field: async ({ args }) => {
        const [key, value] = args;
        return this.setField(key, value);
      },
      toggle_field: async ({ args }) => {
        const [key] = args;
        const currentValue = this.getField(key);
        const toggleValue = !currentValue;
        return this.setField(key, `${toggleValue}`);
      },
    });
  }

  /**
   * Retrieve fields from localstorage. These are automatically prefixed with 'rp-contact-field'
   * and will be returned as string or boolean
   * TODO - ideally showWarnings should be linked to some sort of debug mode
   */
  public getField(key: string, showWarnings = true) {
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
   * Store a contact field in localstorage and create a backup also in the database
   *
   * @remark whilst writing to the db is an async event, the data will be immediately
   * available in local storage so does not require await for further processing
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

  public getGlobal(key: string): string {
    // provide a fallback if the target global variable has never been set
    if (!this.globals.hasOwnProperty(key)) {
      console.warn("global value not found for key:", key);
      return undefined;
    }
    let global = this.globals[key];
    // HACK - ensure global value is translated (if exists)
    // (could possibly be handled better from within translate service)
    return this.translateService.translateValue(global.value);
  }

  public setGlobal(row: FlowTypes.GlobalRow) {
    this.globals[row.name] = row;
  }
}
