import { Component, Injector, OnInit } from "@angular/core";
import { TemplateActionService } from "src/app/shared/components/template/services/instance/template-action.service";
import { TemplateFieldService } from "src/app/shared/components/template/services/template-field.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";

interface IDynamicDataEntry {
  id: string;
  flow_type: string;
  flow_name: string;
  data: Record<string, any>;
}

@Component({
  selector: "user-debug-page",
  templateUrl: "user-debug.page.html",
  styleUrl: "user-debug.page.scss",
})
export class UserDebugPage implements OnInit {
  constructor(
    private fieldService: TemplateFieldService,
    private dynamicDataService: DynamicDataService,
    private injector: Injector
  ) {}

  public contactFields: { key: string; value: string }[] = [];
  public dynamicDataEntries: IDynamicDataEntry[] = [];
  public dynamicDataTable: { headers: string[]; rows: any[] };
  public userId = "";

  private actionService = new TemplateActionService(this.injector);

  async ngOnInit() {
    await this.fieldService.ready();
    await this.dynamicDataService.ready();
    this.actionService.ready();
    this.contactFields = this.getUserContactFields();
    this.userId = this.fieldService.getField("_app_user_id");
    this.dynamicDataEntries = await this.getDynamicDataEntries();
  }

  /** Prepare table data to display for provided dynamic data entry */
  public setDynamicEntryView(entry: IDynamicDataEntry) {
    const rows = Object.values(entry.data);
    this.dynamicDataTable = { headers: Object.keys(rows[0]), rows };
  }

  public async syncUserData() {
    // mimic `emit: server_sync` template action
    await this.actionService.handleActions([
      { trigger: "click", action_id: "emit", args: ["server_sync"] },
    ]);
    // repopulate contact fields to reflect server sync meta
    this.getUserContactFields();
  }

  /** Retrieve localStorage entries prefixed by field service prefix */
  private getUserContactFields() {
    const contactFields: { key: string; value: string }[] = [];
    const prefix = `${this.fieldService.prefix}.`;
    for (const key in localStorage) {
      if (key.startsWith(prefix)) {
        contactFields.push({
          key: key.replace(prefix, ""),
          value: localStorage.getItem(key),
        });
      }
    }
    return contactFields.sort((a, b) => (a.key > b.key ? 1 : -1));
  }

  /** Retrieve user dynamic data entries stored in IndexedDB */
  private async getDynamicDataEntries() {
    const dynamicData: IDynamicDataEntry[] = [];
    const state = await this.dynamicDataService.getState();
    for (const [flow_type, dataByFlow] of Object.entries(state)) {
      for (const [flow_name, data] of Object.entries(dataByFlow)) {
        dynamicData.push({ flow_type, flow_name, data, id: `${flow_type}__${flow_name}` });
      }
    }
    return dynamicData;
  }
}
