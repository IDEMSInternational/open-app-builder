import { Component, computed, effect, inject, Injector, OnInit, signal } from "@angular/core";
import { isEqual, uniqueObjectArrayKeys } from "packages/shared/src/utils/object-utils";
import { map, debounceTime, switchMap, startWith, tap, of, from } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";
import { TemplateActionService } from "src/app/shared/components/template/services/instance/template-action.service";
import { TemplateFieldService } from "src/app/shared/components/template/services/template-field.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { RxDocument } from "rxdb";
import { IPersistedDoc } from "src/app/shared/services/dynamic-data/adapters/persistence/indexeddb.strategy";
import { AlertController } from "@ionic/angular";

/** Snapshot of persisted memory state for data_list type */
type IDynamicDataState = { [flow_name: string]: { [row_id: string]: any } };

@Component({
  selector: "user-debug-page",
  templateUrl: "user-debug.page.html",
  styleUrl: "user-debug.page.scss",
  standalone: false,
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

  private dynamicDataService = inject(DynamicDataService);

  /** Live state of all dynamic data stored */
  private dynamicDataState = toSignal(this.subscribeToDynamicDataState());

  /** Name of flow selected to display dynamic data */
  public dynamicDataSelected = signal("");

  /** Live state of selected flow dynamic data sub-state */
  private dynamicDataSelectedState = computed(
    () => {
      const state = this.dynamicDataState() || ({} as any);
      const selected = this.dynamicDataSelected();
      return { ...state?.[selected] };
    },
    { equal: isEqual }
  );

  /** Table configuration to display data from active dynamic_data row */
  public dynamicDataTableData = signal({ headers: [], rows: [] });

  /** List of all flow names where dynamic data has been set */
  public dynamicDataSelectOptions = computed(() => [...Object.keys(this.dynamicDataState() || {})]);

  private injector = inject(Injector);
  private actionService = new TemplateActionService(this.injector);

  constructor(
    private fieldService: TemplateFieldService,
    private appDataService: AppDataService,
    private localStorageService: LocalStorageService,
    public authService: AuthService,
    private alertCtrl: AlertController
  ) {
    // load first dynamic data option by default
    effect(() => {
      const selected = this.dynamicDataSelected();
      if (!selected) {
        const options = this.dynamicDataSelectOptions();
        if (options[0]) {
          this.dynamicDataSelected.set(options[0]);
        }
      }
    });
    // load table data when selected flow or corresponding data sub-state changes
    effect(async () => {
      const selected = this.dynamicDataSelected();
      const dynamicData = this.dynamicDataSelectedState();
      if (selected) {
        const { headers, rows } = await this.loadDynamicDataTable(selected, dynamicData);
        this.dynamicDataTableData.set({ headers, rows });
      }
    });
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
    let allTableData: any[] = [];
    // Populate initial table data from sheets if not internal
    if (!flowName.startsWith("_")) {
      const sheetData = await this.appDataService.getSheet("data_list", flowName);
      allTableData = sheetData?.rows || [];
    }
    // generate list of all unique headers found across original data and overrides
    const headers = uniqueObjectArrayKeys([...allTableData, ...Object.values(flowDynamicData)]);
    // add placeholder rows for any created dynamically (no original sheet row)
    const sheetRowIds = allTableData.map((r) => r.id);
    Object.keys(flowDynamicData).forEach((id) => {
      if (!sheetRowIds.includes(id)) allTableData.push({ id });
    });
    // generate a list of merged initial + user override data, tracking what keys contain overridden values
    const rows = allTableData.map((r) => {
      const overrides = flowDynamicData[r.id];
      return { ...r, ...overrides, _override_keys: Object.keys(overrides || {}) };
    });

    return { headers, rows };
  }

  public async resetDynamicDataList(flow_name: string) {
    await this.dynamicDataService.resetFlow("data_list", flow_name);
  }

  public async promptDynamicDataResetAll() {
    const actionSheet = await this.alertCtrl.create({
      header: "Dynamic Data Reset",
      message: "Are you sure you want to reset all dynamic data?",
      buttons: [
        { text: "Yes, Reset", role: "destructive" },
        { text: "No, Cancel", role: "cancel" },
      ],
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
    if (role === "destructive") {
      await this.dynamicDataService.resetAll();
    }
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
    // Wait for service to be ready before accessing writeCache
    return from(this.dynamicDataService.ready()).pipe(
      switchMap(() => {
        const writeCache = this.dynamicDataService["writeCache"];
        if (!writeCache) return of({} as IDynamicDataState);

        const strategy = writeCache["strategy"];

        // Use RxDB strategy if available to capture changes from multiple tabs
        if (strategy && strategy["collection"] && strategy["db"]) {
          const collection = strategy["collection"];
          return strategy["db"].$.pipe(
            debounceTime(50),
            startWith({}),
            switchMap(() => collection.find().exec()),
            map((docs: RxDocument<IPersistedDoc>[]) => {
              // recreate a snapshot of the entire dynamic db state from saved docs
              const state: IDynamicDataState = {};
              for (const doc of docs) {
                const { data, flow_name, row_id } = doc;
                state[flow_name] ??= {};
                state[flow_name][row_id] = data;
              }
              return state;
            })
          );
        }

        // Fallback for other strategies (e.g. native file persistence)
        // Returns current memory state but won't sync across tabs
        const state: IDynamicDataState = {};
        const storedState = writeCache.state || {}; // PersistedState
        Object.values(storedState).forEach((flowTypeData: any) => {
          Object.entries(flowTypeData).forEach(([flowName, rows]: [string, any]) => {
            state[flowName] = rows;
          });
        });
        return of(state);
      }),
      startWith({} as IDynamicDataState)
    );
  }
}
