import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SHEETS_CONTENT_LIST, TRANSLATIONS_CONTENT_LIST } from "app-data";
import { FlowTypes } from "../../model";
import { arrayToHashmap } from "../../utils";

/** Default folder app_data copied into (as defined in angular.json) */
const APP_DATA_BASE = "assets/app_data";

@Injectable({ providedIn: "root" })
export class AppDataService {
  constructor(private http: HttpClient) {}
  private sheetContents = SHEETS_CONTENT_LIST;
  private translationContents = TRANSLATIONS_CONTENT_LIST;
  public appDataCache: IAppDataCache = {
    data_list: {},
    global: {},
    template: {},
    tour: {},
  };

  public async init() {
    this.addDataListMappings();
  }

  /** Load translations strings from asset json file */
  public async getTranslationStrings(language_code: string) {
    const contents = this.translationContents[language_code];
    if (contents) {
      const { filename } = contents;
      const assetPath = `${APP_DATA_BASE}/translations/${filename}`;
      const strings = await this.http.get(assetPath).toPromise();
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
    flow_name: string
  ) {
    const sheetContents = this.sheetContents[flow_type][flow_name];
    if (!sheetContents) {
      console.warn("[AppData] - Could not find sheet", flow_type, flow_name);
      return null;
    }
    // Populate cache if not exist
    if (!this.appDataCache[flow_type].hasOwnProperty(flow_name)) {
      const flow = await this.loadSheetFromJson(sheetContents);
      this.appDataCache[flow_type][flow_name] = flow;
      // Data lists have additional processing, default is just to populate value
      if (flow.flow_type === "data_list") {
        this.populateCacheDataList(flow);
      }
    }
    return this.appDataCache[flow_type][flow_name] as T;
  }

  private async loadSheetFromJson<T extends FlowTypes.FlowTypeWithData>(
    contents: FlowTypes.FlowTypeBase
  ) {
    const { flow_type, flow_subtype, flow_name } = contents;
    let type_path = `${flow_type}`;
    if (flow_subtype) type_path += `/${flow_subtype}`;
    const path = `${APP_DATA_BASE}/sheets/${type_path}/${flow_name}.json`;
    try {
      const data = await this.http.get(path).toPromise();
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
