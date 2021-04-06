import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { GLOBAL } from "src/app/shared/services/data/data.service";
import { DbService, IFlowEvent } from "src/app/shared/services/db/db.service";
import { generateTimestamp } from "src/app/shared/utils";

@Injectable({
  providedIn: "root",
})
export class TemplateService {
  globals = {};

  constructor(private localStorageService: LocalStorageService, private dbService: DbService) {
    this.initialiseGlobals();
  }

  initialiseGlobals() {
    GLOBAL.forEach((flow) => {
      flow.rows?.forEach((row) => {
        if (row.type === "declare_field_default") {
          if (this.getField(row.name) === null) {
            this.setField(row.name, row.value);
          }
        } else {
          this.setGlobal(row.name, row.value);
        }
      });
    });
  }

  getField(key: string): string {
    let val = this.localStorageService.getString("rp-contact-field." + key);
    // provide a fallback if the target variable does not exist in local storage
    if (val === null) {
      console.warn("field value not found for key:", key);
      val = `{{field.${key}}}`;
    }
    return val;
  }

  /**
   * Store a contact field in localstorage and create a backup also in the database
   *
   * @remark whilst writing to the db is an async event, the data will be immediately
   * available in local storage so does not require await for further processing
   * */
  setField(key: string, value: string) {
    // write to local storage
    this.localStorageService.setString("rp-contact-field." + key, value);

    // write to db
    const evt: IFlowEvent = {
      _created: generateTimestamp(),
      event: "set",
      value,
      name: key,
      type: "contact_field" as any,
    };
    return this.dbService.table("data_events").add(evt);
  }

  getGlobal(key: string): string {
    let val = this.globals[key];
    // provide a fallback if the target global variable has never been set
    if (!this.globals.hasOwnProperty(key)) {
      console.warn("global value not found for key:", key);
      val = `{{global.${key}}}`;
    }
    return val;
  }

  setGlobal(key: string, value: string) {
    this.globals[key] = value;
  }

  /** Record a template event to the database */
  recordEvent(flow_name: string, event: "emit", value: any) {
    const evt: IFlowEvent = {
      _created: generateTimestamp(),
      event,
      name: flow_name,
      type: "template",
      value,
    };
    return this.dbService.table("flow_events").add(evt);
  }
}
