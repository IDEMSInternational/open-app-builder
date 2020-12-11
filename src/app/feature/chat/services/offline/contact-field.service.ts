import { Injectable } from "@angular/core";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { conversation } from "src/data/conversation";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root",
})
export class ContactFieldService {
  constructor(private localStorageService: LocalStorageService) {
    // Make sure we always set initial variables
    for (var flowName of environment.variableNameFlows) {
      const flow = conversation
        .map((rpExport) => rpExport.flows[0])
        .find((flow) => flow.name === flowName);
      flow.nodes.forEach((node) => {
        const action = node.actions[0];
        if (action && action.field && action.field.key && action.value) {
          this.setContactField(action.field.key, action.value);
        }
      });
    }
  }

  async getContactField(key: string): Promise<string> {
    return this.localStorageService.getString("rp-contact-field." + key);
  }

  async setContactField(key: string, value: string): Promise<any> {
    return this.localStorageService.setString("rp-contact-field." + key, value);
  }
}
