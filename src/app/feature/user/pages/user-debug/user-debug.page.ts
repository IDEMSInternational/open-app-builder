import { Component, Injector, OnInit, signal } from "@angular/core";
import { TemplateActionService } from "src/app/shared/components/template/services/instance/template-action.service";
import { TemplateFieldService } from "src/app/shared/components/template/services/template-field.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";

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
    private localStorageService: LocalStorageService,
    public authService: AuthService,
    private injector: Injector
  ) {}
  /** Id of current user */
  public userId = "";
  /** ID of user to import */
  public importUserId = "";
  /** List of user contact fields */
  public contactFields = signal<{ key: string; value: string }[]>([]);
  /** List of protected user contact fields */
  public protectedFields = signal<{ key: string; value: string }[]>([]);
  /** List of user dynamic_data entries */
  public dynamicDataEntries: IDynamicDataEntry[] = [];
  /** Active row selected from list of user dynamic_data entries */
  public dynamicDataSelected: IDynamicDataEntry;
  /** Table configuration to display data from active dynamic_data row */
  public dynamicDataTable: { headers: string[]; rows: any[] };

  private actionService = new TemplateActionService(this.injector);

  async ngOnInit() {
    await this.fieldService.ready();
    await this.dynamicDataService.ready();
    this.actionService.ready();
    await this.loadUserData();
  }

  /** Retrieve current user contact fields and dynamic data */
  private async loadUserData() {
    this.loadUserContactFields();
    this.userId = this.fieldService.getField("_app_user_id");
    this.importUserId = this.userId;
    this.dynamicDataEntries = await this.getDynamicDataEntries();
    // populate dynamic data table with first entry if available
    this.dynamicDataSelected = this.dynamicDataEntries[0];
    this.setDynamicEntryView(this.dynamicDataEntries[0]);
  }

  public async importUserData(id: string) {
    // mimic `user: import : [id]` template action
    await this.actionService.handleActions([
      { trigger: "click", action_id: "user", args: ["import", id] },
    ]);
    // repopulate contact fields to reflect server sync meta
    await this.loadUserData();
    location.reload();
  }

  public async syncUserData() {
    // mimic `emit: server_sync` template action
    await this.actionService.handleActions([
      { trigger: "click", action_id: "emit", args: ["server_sync"] },
    ]);
    // repopulate contact fields to reflect server sync meta
    await this.loadUserData();
  }

  /** Prepare table data to display for provided dynamic data entry */
  public setDynamicEntryView(entry?: IDynamicDataEntry) {
    if (entry) {
      const rows = Object.values(entry.data);
      this.dynamicDataTable = { headers: Object.keys(rows[0]), rows };
    } else {
      this.dynamicDataTable = { headers: [], rows: [] };
    }
  }
  public dynamicEntryCompareFn(a: IDynamicDataEntry, b: IDynamicDataEntry) {
    return a.id === b.id;
  }

  /** Retrieve localStorage entries prefixed by field service prefix */
  private loadUserContactFields() {
    const localStorageHashmap = this.localStorageService.getAll();
    const contactFields = Object.entries<string>(localStorageHashmap)
      .sort(([a], [b]) => (a > b ? 1 : -1))
      .map(([key, value]) => ({ key: key.replace("rp-contact-field.", ""), value }));

    this.contactFields.set(contactFields.filter((v) => !v.key.startsWith("_")));
    this.protectedFields.set(contactFields.filter((v) => v.key.startsWith("_")));
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
