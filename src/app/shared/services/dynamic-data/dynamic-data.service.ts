import { Injectable } from "@angular/core";
import { addRxPlugin } from "rxdb";
import { map } from "rxjs";

import { FlowTypes } from "packages/data-models";
import { environment } from "src/environments/environment";
import { AppDataService } from "../data/app-data.service";
import { AsyncServiceBase } from "../asyncService.base";
import { arrayToHashmap, deepMergeObjects } from "../../utils";
import { PersistedMemoryAdapter } from "./adapters/persistedMemory";
import { ReactiveMemoryAdapater } from "./adapters/reactiveMemory";

@Injectable({ providedIn: "root" })
/**
 * The dynamic data service handles the process of loading data from sheets, storing
 * in memory as a reactive data object, and enabling a persisted write-layer on top
 * for storing user changes
 */
export class DynamicDataService extends AsyncServiceBase {
  /**
   * The memory DB stores the rows of any requested sheets, merged with user writes
   *
   * Each flow is represented in its own collection, and populated as requested.
   * This allows users to query and subscribe to data changes in an efficient way
   */
  private data$: ReactiveMemoryAdapater;

  /**
   * Any user edits flow data is retained in its own layer, initially in memory
   * for faster writes but mirrored to a persisted IndexedDB regularly
   *
   * This means that user changes will persist app reloads and also be retained
   * if the underlying data changes so long as compatible (e.g. data list ids still exist)
   *
   * As each collection would create a standalone indexeddb, data is instead grouped by
   * flow type so that all data_list updates are stored in a single table
   */
  private writeCache: PersistedMemoryAdapter;

  constructor(private appDataService: AppDataService) {
    super("Dynamic Data");
    this.registerInitFunction(this.initialise);
  }

  private async initialise() {
    // Enable dev mode when not in production
    // NOTE - calls 'global' so requires polyfill
    if (!environment.production) {
      await import("rxdb/plugins/dev-mode").then((module) => {
        addRxPlugin(module.RxDBDevModePlugin);
      });
    }
    this.writeCache = await new PersistedMemoryAdapter().create();
    this.data$ = await new ReactiveMemoryAdapater().create();
  }

  /** Watch for changes to a specific flow */
  public async watch(flow_type: FlowTypes.FlowType, flow_name: string) {
    const collectionName = this.normaliseCollectionName(flow_type, flow_name);
    // create new memory collection on demand if does not exist,
    if (!this.data$.hasCollection(collectionName)) {
      const initialData = await this.getInitialData(flow_type, flow_name);
      await this.data$.createCollection(collectionName, initialData);
    }
    return this.data$.subscribe(collectionName).pipe(map((v) => v.documentData));
  }

  public async update<T extends { id: string }>(
    flow_type: FlowTypes.FlowType,
    flow_name: string,
    update?: T
  ) {
    if (update) {
      const { id, ...data } = update;
      // update memory db
      const collectionName = this.normaliseCollectionName(flow_type, flow_name);
      await this.data$.update({ collectionName, id, data });
      // update persisted db
      this.writeCache.update({ flow_name, flow_type, id, data });
    }
  }

  /** Retrive json sheet data and merge with any user writes */
  private async getInitialData(flow_type: FlowTypes.FlowType, flow_name: string) {
    const flowData = await this.appDataService.getSheet(flow_type, flow_name);
    const writeData = this.writeCache.get(flow_type, flow_name);
    const writeDataArray = Object.entries(writeData || {}).map(([id, v]) => ({ ...v, id }));
    const mergedData = this.mergeData(flowData?.rows, writeDataArray);
    return mergedData;
  }

  private async test() {
    const watcher = await this.watch("data_list", "test");
    watcher.subscribe((w) => console.log("updated", w));
    await this.update("data_list", "test", { id: "id1", value: 1 });
    setTimeout(async () => {
      await this.update("data_list", "test", { id: "id1", value: "2" });
    }, 1000);
  }

  /** When working with rxdb collections only alphanumeric lower case names allowed  */
  private normaliseCollectionName(flow_type: FlowTypes.FlowType, flow_name: string) {
    return `${flow_type}${flow_name}`.toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  private mergeData<T extends { id: string }>(flowData: T[] = [], dbData: T[] = []) {
    const flowHashmap = arrayToHashmap(flowData, "id");
    const dbDataHashmap = arrayToHashmap(dbData, "id");
    const merged = deepMergeObjects(flowHashmap, dbDataHashmap);
    return Object.values(merged) as T[];
  }
}
