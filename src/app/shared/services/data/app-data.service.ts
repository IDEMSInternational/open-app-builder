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
  private cache = {
    template: {},
    global: {},
  };

  public async getSheetsByType<T>(type: any) {
    console.log("TODO - get sheets by type");
    return [] as T[];
  }
  public async getTemplateByName(name: string) {
    if (this.cache[name]) return this.cache[name];

    console.log("TODO - get template");
    return null as FlowTypes.Template;
  }
}

/**
 *
 * TODO - handle loading full set of data_lists for dynamic parser
 *
 **/
