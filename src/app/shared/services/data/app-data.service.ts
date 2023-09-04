import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SHEETS_CONTENT_LIST, TRANSLATIONS_CONTENT_LIST } from "src/app/data/app-data";
import { lastValueFrom } from "rxjs";
import { FlowTypes } from "../../model";
import { arrayToHashmap } from "../../utils";
import { SyncServiceBase } from "../syncService.base";
import { ErrorHandlerService } from "../error-handler/error-handler.service";
import { AppDataVariableService } from "./app-data-variable.service";

/** Default folder app_data copied into (as defined in angular.json) */
const APP_DATA_BASE = "assets/app_data";

@Injectable({ providedIn: "root" })
export class AppDataService extends SyncServiceBase {
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private variableService: AppDataVariableService
  ) {
    super("AppData");
    this.initialise();
  }
  // Instantiate contents using protected method to allow mock overrides
  protected sheetContents = SHEETS_CONTENT_LIST;
  protected translationContents = TRANSLATIONS_CONTENT_LIST;
  public appDataCache: IAppDataCache = {
    data_pipe: {},
    data_list: {},
    generator: {},
    global: {},
    template: {},
    tour: {},
  };

  private initialise() {
    this.addDataListMappings();
  }

  /** Load translations strings from asset json file */
  public async getTranslationStrings(language_code: string) {
    const contents = this.translationContents[language_code];
    if (contents) {
      const { filename } = contents;
      const assetPath = `${APP_DATA_BASE}/translations/${filename}`;
      const strings = await lastValueFrom(this.http.get(assetPath));
      return strings as { [source_string: string]: string };
    } else {
      console.error("No translations exist for language", language_code);
      return {};
    }
  }

  /** Return a list of all sheets by type without data rows */
  public listSheetsByType(type: FlowTypes.FlowType) {
    return Object.values(this.sheetContents[type]);
  }
  /** Return a hashmap of all sheets by type, keyed by flow_name */
  public listSheetsByTypeHashmap(type: FlowTypes.FlowType) {
    return this.sheetContents[type];
  }

  /**
   * Return a list of all sheets by type with data rows
   * NOTE - this may be a slower operation depending on the amount of data to retrieve from disk
   */
  public async getSheetsWithData<T extends FlowTypes.FlowTypeWithData>(
    type: FlowTypes.FlowType,
    filterFn?: (contents: FlowTypes.FlowTypeBase) => boolean
  ) {
    const contents = this.listSheetsByType(type);
    const filteredContents = filterFn ? contents.filter((content) => filterFn(content)) : contents;
    const sheets = await Promise.all(
      filteredContents.map((flow) => this.getSheet(flow.flow_type, flow.flow_name))
    );
    return sheets as T[];
  }

  /** Return the json data for a single sheet **/
  public async getSheet<T extends FlowTypes.FlowTypeWithData>(
    flow_type: FlowTypes.FlowType,
    flow_name: string,
    /** Keep log of previous override flow names to avoid infinite loops, e.g. flow_a -> flow_b -> flow_a  */
    overrideHistory: string[] = []
  ) {
    const flowContents = this.sheetContents[flow_type][flow_name];
    if (!flowContents) {
      // log error but don't throw to allow further processing
      this.errorHandler.handleError(new Error(`[${flow_type}] "${flow_name}" not found`));
      return null;
    }
    // Check for any runtime overrides to flows
    const overrideFlowName = await this.checkFlowOverrides(flowContents);
    if (overrideFlowName && !overrideHistory.includes(overrideFlowName)) {
      overrideHistory.push(flow_name);
      return this.getSheet(flow_type, overrideFlowName, overrideHistory);
    }

    // Populate flow from cache if exists, or load json if it does not
    let flow = this.appDataCache[flow_type][flow_name];
    if (!flow) {
      flow = await this.loadSheetFromJson(flowContents);
      this.appDataCache[flow_type][flow_name] = flow;
      // Data lists have additional processing, default is just to populate value
      if (flow.flow_type === "data_list") {
        this.populateCacheDataList(flow);
      }
    }

    // return as new object to prevent modification to raw list
    return JSON.parse(JSON.stringify(this.appDataCache[flow_type][flow_name])) as T;
  }

  /** Evaluate any flow override conditions, return name of override flow if satisfied */
  private async checkFlowOverrides(flow: FlowTypes.FlowTypeBase): Promise<string | undefined> {
    await this.variableService.ready();
    if (flow._overrides) {
      for (const [overrideName, condition] of Object.entries(flow._overrides)) {
        const satisfied = await this.variableService.evaluateExpression(condition);
        if (satisfied) {
          return overrideName;
        }
      }
    }
    return;
  }

  private async loadSheetFromJson<T extends FlowTypes.FlowTypeWithData>(
    contents: FlowTypes.FlowTypeBase
  ) {
    const { flow_type, flow_subtype, flow_name } = contents;
    let type_path = `${flow_type}`;
    if (flow_subtype) type_path += `/${flow_subtype}`;
    const path = `${APP_DATA_BASE}/sheets/${type_path}/${flow_name}.json`;
    try {
      const data = await lastValueFrom(this.http.get(path));
      return data as T;
    } catch (error) {
      // Sheet no longer in assets folder. This typically only happens
      // if manually deleted (like test-visual-generate ci scripts)
      console.error("Failed to load sheet", flow_name);
      return { rows: [] } as T;
    }
  }

  /** Include rowsHashmap field and aliased cache entry for datalists  */
  private populateCacheDataList(flow: FlowTypes.FlowTypeWithData) {
    const { flow_name, flow_type, data_list_name, rows } = flow;
    flow.rowsHashmap = arrayToHashmap(rows, "id");
    this.appDataCache[flow_type][flow_name] = flow;
    if (data_list_name) {
      this.appDataCache[flow_type][data_list_name] = flow;
    }
  }

  /**
   * Datalists can include alias `data_list_name` used as an accessor,
   * So include these aliases in the default list for faster lookup
   */
  private addDataListMappings() {
    for (const dataList of Object.values(this.sheetContents.data_list)) {
      if (dataList.data_list_name) {
        this.sheetContents.data_list[dataList.data_list_name] = dataList;
      }
    }
  }
}

type IAppDataCache = {
  [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeWithData };
};
