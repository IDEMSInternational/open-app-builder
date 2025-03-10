import { Component, computed, effect, Injector, OnInit, signal } from "@angular/core";
import { isEqual, uniqueObjectArrayKeys } from "packages/shared/src/utils/object-utils";
import { map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { TemplateActionService } from "src/app/shared/components/template/services/instance/template-action.service";
import { TemplateFieldService } from "src/app/shared/components/template/services/template-field.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";

@Component({
  selector: "user-debug-page",
  templateUrl: "user-debug.page.html",
  styleUrl: "user-debug.page.scss",
})
export class UserDebugPage implements OnInit {
  /** Id of current user */
  public userId = "";
  /** ID of user to import */
  public importUserId = "";
  /** List of user contact fields */
  public contactFields = signal<{ key: string; value: string }[]>([]);
  /** List of protected user contact fields */
  public protectedFields = signal<{ key: string; value: string }[]>([]);

  /** Live state of all dynamic data stored */
  private dynamicDataState = toSignal(this.subscribeToDynamicDataState());

  /** Name of flow selected to display dynamic data */
  public dynamicDataSelected = signal("");

  /** Live state of selected flow dynamic data sub-state */
  private dynamicDataSelectedState = computed(
    () => {
      const state = this.dynamicDataState() || ({} as any);
      const selected = this.dynamicDataSelected();
      return { ...state.data_list?.[selected] };
    },
    { equal: isEqual }
  );

  /** Table configuration to display data from active dynamic_data row */
  public dynamicDataTableData = signal({ headers: [], rows: [] });

  /** List of all flow names where dynamic data has been set */
  public dynamicDataSelectOptions = computed(() => [
    ...Object.keys(this.dynamicDataState()?.data_list || {}),
  ]);

  private actionService = new TemplateActionService(this.injector);

  constructor(
    private fieldService: TemplateFieldService,
    private appDataService: AppDataService,
    private dynamicDataService: DynamicDataService,
    private localStorageService: LocalStorageService,
    public authService: AuthService,
    private injector: Injector
  ) {
    // load first dynamic data option by default
    effect(
      () => {
        const selected = this.dynamicDataSelected();
        if (!selected) {
          const options = this.dynamicDataSelectOptions();
          if (options[0]) {
            this.dynamicDataSelected.set(options[0]);
          }
        }
      },
      { allowSignalWrites: true }
    );
    // load table data when selected flow or corresponding data sub-state changes
    effect(
      async () => {
        const selected = this.dynamicDataSelected();
        const dynamicData = this.dynamicDataSelectedState();
        if (selected) {
          const { headers, rows } = await this.loadDynamicDataTable(selected, dynamicData);
          this.dynamicDataTableData.set({ headers, rows });
        }
      },
      { allowSignalWrites: true }
    );
  }

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
  private async loadDynamicDataTable(flowName: string, flowDynamicData: any = {}) {
    const sheetData = await this.appDataService.getSheet("data_list", flowName);
    const allTableData = sheetData?.rows || [];
    // generate list of all unique headers found across original data and overrides
    const headers = uniqueObjectArrayKeys([...allTableData, ...Object.values(flowDynamicData)]);
    // generate a list of merged initial + user override data, tracking what keys contain overridden values
    const rows = allTableData.map((r) => {
      const overrides = flowDynamicData[r.id];
      return { ...r, ...overrides, _override_keys: Object.keys(overrides || {}) };
    });
    return { headers, rows };
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

  /** Create a subscription that updates with any writeCache db changes and returns full state of cache */
  private subscribeToDynamicDataState() {
    const writeCache = this.dynamicDataService["writeCache"];
    // return new object for writeCache state to ensure signal fires
    return writeCache["collection"].find().$.pipe(map(() => ({ ...writeCache.state })));
  }
}
