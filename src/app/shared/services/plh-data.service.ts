import { Injectable } from "@angular/core";
import * as DATASETS from "src/data";

@Injectable({
  providedIn: "root",
})
export class PlhDataService {
  allFlowsByName: { [name: string]: DATASETS.IFlowMeta };
  constructor() {
    const allFlowsByName = {};
    Object.values(DATASETS).forEach((DATASET) => {
      DATASET.forEach((el) => {
        allFlowsByName[el.Flow_Name] = el;
      });
    });
    this.allFlowsByName = allFlowsByName;
  }
}
