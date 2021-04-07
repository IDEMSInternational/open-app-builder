import { Injectable } from "@angular/core";
import { DbService, IFlowEvent } from "src/app/shared/services/db/db.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { generateTimestamp } from "src/app/shared/utils";
import { conversation } from "src/data/conversation";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ContactFieldService {
  constructor(private localStorageService: LocalStorageService, private dbService: DbService) {
    // Make sure we always set initial variables
    this.setDefaultValues();
  }

  async setDefaultValues() {
    for (var flowName of environment.variableNameFlows) {
      const flow = conversation
        .map((rpExport) => rpExport.flows[0])
        .find((flow) => flow.name === flowName);
      flow.nodes.forEach(async (node) => {
        const action = node.actions[0];
        if (action && action.field && action.field.key && action.value) {
          const existingValue = await this.getContactField(action.field.key);
          if (existingValue === null) {
            this.setContactField(action.field.key, action.value);
          }
        }
      });
    }
  }

  async getContactField(key: string): Promise<string> {
    return this.localStorageService.getString("rp-contact-field." + key);
  }

  /**
   * Store a contact field in localstorage and create a backup also in the database
   *
   * @remark whilst writing to the db is an async event, the data will be immediately
   * available in local storage so does not require await for further processing
   * */
  setContactField(key: string, value: string) {
    // write to local storage
    this.localStorageService.setString("rp-contact-field." + key, value);

    // write to db
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
