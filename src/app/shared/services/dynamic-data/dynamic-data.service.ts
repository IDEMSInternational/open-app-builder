import { Injectable } from "@angular/core";
import { addRxPlugin, MangoQuery, RxDocument } from "rxdb";
import { firstValueFrom, map } from "rxjs";

import { FlowTypes } from "packages/data-models";
import { environment } from "src/environments/environment";
import { AppDataService } from "../data/app-data.service";
import { AsyncServiceBase } from "../asyncService.base";
import { arrayToHashmap, deepMergeObjects } from "../../utils";
import { PersistedMemoryAdapter } from "./adapters/persistedMemory";
import { ReactiveMemoryAdapater } from "./adapters/reactiveMemory";

type IDocWithID = { id: string };

@Injectable({ providedIn: "root" })
/**
 * The dynamic data service handles the process of loading data from sheets, storing
 * in memory as a reactive data object, and enabling a persisted write-layer on top
 * for storing user changes
 */
export class DynamicDataService extends AsyncServiceBase {
  /**
   * The main DB stores in-memory the rows of any requested sheets, merged with user writes
   *
   * Each flow is represented in its own collection, and populated as requested.
   * This allows users to query and subscribe to data changes in an efficient way
   */
  private db: ReactiveMemoryAdapater;

  /**
   * A separate cache stores user edits flow data, initially in memory
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
    this.registerTemplateActionHandlers();
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
    this.db = await new ReactiveMemoryAdapater().createDB();
  }
  private registerTemplateActionHandlers() {
    // TODO - pending merge of related PR
    // this.templateActionRegistry.register({
    //   set_data: async (args) => {
    //     console.log("setting data", args);
    //   },
    // });
  }

  /** Watch for changes to a specific flow */
  public async query$<T extends IDocWithID>(
    flow_type: FlowTypes.FlowType,
    flow_name: string,
    queryObj?: MangoQuery
  ) {
    const collectionName = this.normaliseCollectionName(flow_type, flow_name);
    // create new memory collection on demand if does not exist,
    if (!this.db.getCollection(collectionName)) {
      const initialData = await this.getInitialData(flow_type, flow_name);
      await this.db.createCollection(collectionName, initialData);
    }
    // use a live query to return all documents in the collection, converting
    // from reactive documents to json data instead
    let query = this.db.query(collectionName, queryObj);
    return query.pipe(
      map((v) => {
        const docs = v as RxDocument<T>[];
        return docs.map((doc) => {
          const data = doc.get("data");
          data.id = doc.id;
          return data as T;
        });
      })
    );
  }

  /** Take a snapshot of the current state of a table */
  public async snapshot(flow_type: FlowTypes.FlowType, flow_name: string) {
    const obs = await this.query$(flow_type, flow_name);
    return firstValueFrom(obs);
  }

  public async update<T>(
    flow_type: FlowTypes.FlowType,
    flow_name: string,
    row_id: string,
    update?: Partial<T>
  ) {
    if (update) {
      const collectionName = this.normaliseCollectionName(flow_type, flow_name);
      if (!this.db.getCollection(collectionName)) {
        await this.db.createCollection(collectionName);
      }
      // TODO - merge with existing data
      const existingDoc = await this.db.getDoc<any>(collectionName, row_id);
      if (existingDoc) {
        const { data } = existingDoc.toJSON();
        update = deepMergeObjects({}, data, update);
        console.log("merged update", update);
      } else {
        // TODO - can likely move the insert error check logic here and keep adapter simple
      }
      // update memory db
      await this.db.updateDoc({ collectionName, id: row_id, data: update });
      // update persisted db
      this.writeCache.update({ flow_name, flow_type, id: row_id, data: update });
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
