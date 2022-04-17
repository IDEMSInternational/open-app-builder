import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FlowTypes } from "../../model";

/**
 * The data service has been through a couple iterations, currently the
 * main purpose is to re-export data from the data folder, but also has
 * a more general lookup which is used by task actions
 *
 */

@Injectable({ providedIn: "root" })
export class AppDataService {
  constructor(private http: HttpClient) {}
  private appDataContents: IAppData = {
    data_list: {},
    global: {},
    template: {},
    tour: {},
  };
  private appDataFull: IAppData = {
    data_list: {},
    global: {},
    template: {},
    tour: {},
  };

  public async init() {
    // Load contents for each type
    console.log("[AppData] - load contents");
  }

  /**
   * Return a list of all sheets by type without data rows
   */
  public listSheetsByType(
    type: FlowTypes.FlowType,
    filterFn?: (contents: FlowTypes.FlowTypeBase) => boolean
  ) {
    const allSheetContents = Object.values(this.appDataContents[type]);
    const filteredSheets = filterFn ? allSheetContents.filter(filterFn) : allSheetContents;
    if (filteredSheets.length === 0) {
      console.warn("[AppData] no sheets found", type, (filterFn || "").toString());
    }
    return filteredSheets;
  }

  /**
   * Return a list of all sheets by type with data rows
   * NOTE - this may be a slower operation depending on the amount of data to retrieve from disk
   */
  public async getSheetsWithData<T extends FlowTypes.FlowTypeWithData>(
    type: FlowTypes.FlowType,
    filterFn?: (contents: FlowTypes.FlowTypeBase) => boolean
  ) {
    const contents = this.listSheetsByType(type, filterFn);
    const sheets = await Promise.all(
      contents.map((flow) => this.getSheet(flow.flow_type, flow.flow_name))
    );
    return sheets as T[];
  }

  /**
   *
   */
  public async getSheet<T extends FlowTypes.FlowTypeBase>(
    flow_type: FlowTypes.FlowType,
    flow_name: string
  ) {
    console.log("[AppData] get sheet", flow_type, flow_name);
    const sheetContents = this.appDataContents[flow_type][flow_name];
    if (!sheetContents) {
      console.warn("Could not find sheet", flow_type, flow_name);
      return null;
    }
    if (this.appDataFull[flow_type].hasOwnProperty(flow_name)) {
      console.log("[AppData] source", "cache");
      return this.appDataFull[flow_type][flow_name] as T;
    } else {
      console.log("[AppData] source", "json");
      const data = await this.loadSheetFromJson(sheetContents);
      this.appDataFull[flow_type][flow_name] = data;
      return data as T;
    }
  }

  private async loadSheetFromJson<T extends FlowTypes.FlowTypeBase>(
    contents: FlowTypes.FlowTypeBase
  ) {
    const { flow_type, flow_subtype, flow_name } = contents;
    let type_path = `${flow_type}`;
    if (flow_subtype) type_path += `/${flow_subtype}`;
    const path = `assets/app_data/${type_path}/${flow_name}`;
    console.log("loading json", path);
    const data = await this.http.get(path).toPromise();
    console.log("data", data);
    return data as T;
  }
}

type IAppData = {
  [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeBase };
};
