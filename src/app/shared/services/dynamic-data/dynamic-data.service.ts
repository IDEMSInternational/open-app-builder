import { Injectable } from "@angular/core";
import { addRxPlugin, MangoQuery, RxDocument } from "rxdb";
import { firstValueFrom, lastValueFrom, map, AsyncSubject } from "rxjs";

import { FlowTypes } from "data-models";
import { environment } from "src/environments/environment";
import { AppDataService } from "../data/app-data.service";
import { AsyncServiceBase } from "../asyncService.base";
import { arrayToHashmap, deepMergeObjects } from "../../utils";
import { PersistedMemoryAdapter } from "./adapters/persistedMemory";
import { ReactiveMemoryAdapater, REACTIVE_SCHEMA_BASE } from "./adapters/reactiveMemory";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { TopLevelProperty } from "rxdb/dist/types/types";

type IDocWithMeta = { id: string; APP_META?: Record<string, any> };

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

  /** Hashmap to track pending collection creation and avoid duplicate requests */
  private collectionCreators: Record<string, AsyncSubject<string>> = {};

  constructor(
    private appDataService: AppDataService,
    private templateActionRegistry: TemplateActionRegistry
  ) {
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
    this.templateActionRegistry.register({
      /**
       * Write properties on the current item (default), or on an explicitly targeted item,
       * e.g.
       * click | set_item | completed:true;
       * click | set_item | _id: @item.id, completed:true;
       * click | set_item | _index: @item._index + 1, completed:true;
       */
      set_item: async ({ args, params }) => {
        // The data-items component populates the context for evaluating the target item to be updated
        const context = args[0] as ISetItemContext;
        // The params come directly from the authored action
        const { _index, _id, ...writeableProps } = params;
        await this.setItem({ context, _index, _id, writeableProps });
      },
      set_items: async ({ args, params }) => {
        const { flow_name, itemDataIDs } = args[0] as ISetItemContext;
        // Hack, no current method for bulk update so make successive (changes debounced in component)
        for (const row_id of itemDataIDs) {
          await this.update("data_list", flow_name, row_id, params);
        }
      },
    });
  }

  /** Watch for changes to a specific flow */
  public async query$<T extends IDocWithMeta>(
    flow_type: FlowTypes.FlowType,
    flow_name: string,
    queryObj?: MangoQuery
  ) {
    const { collectionName } = await this.ensureCollection(flow_type, flow_name);

    // by default, use `row_index` as query index to return results sorted on this property
    const defaultQueryObj = { index: ["row_index", "id"] };
    queryObj = { ...defaultQueryObj, ...queryObj };
    // use a live query to return all documents in the collection, converting
    // from reactive documents to json data instead
    let query = this.db.query(collectionName, queryObj);
    return query.pipe(
      map((v) => {
        const docs = v as RxDocument<T>[];
        return docs.map((doc) => {
          // we need mutable json so that we can replace dynamic references as required
          const data = doc.toMutableJSON();
          // ensure any previously extracted metadata fields are repopulated
          return this.populateMeta(data) as T;
        });
      })
    );
  }

  /** Take a snapshot of the current state of a table */
  public async snapshot<T extends IDocWithMeta>(flow_type: FlowTypes.FlowType, flow_name: string) {
    const obs = await this.query$<T>(flow_type, flow_name);
    return firstValueFrom(obs);
  }

  public async update<T>(
    flow_type: FlowTypes.FlowType,
    flow_name: string,
    row_id: string,
    update: Partial<T>
  ) {
    if (update) {
      const { collectionName } = await this.ensureCollection(flow_type, flow_name);
      const existingDoc = await this.db.getDoc<any>(collectionName, row_id);
      if (existingDoc) {
        const data = existingDoc.toMutableJSON();
        update = deepMergeObjects(data, update);
      }
      // update memory db
      await this.db.updateDoc({ collectionName, id: row_id, data: update });
      // update persisted db
      this.writeCache.update({ flow_name, flow_type, id: row_id, data: update });
    }
  }

  /** Remove user writes on a flow to return it to its original state */
  public async resetFlow(flow_type: FlowTypes.FlowType, flow_name: string) {
    const collectionName = this.normaliseCollectionName(flow_type, flow_name);
    // Wait for collection to finish creating if reset called during creation process
    if (this.collectionCreators[collectionName]) {
      await lastValueFrom(this.collectionCreators[collectionName]);
    }
    // Ensure any persisted data deleted
    await this.writeCache.delete(flow_type, flow_name);

    // Remove in-memory db if exists
    const existingCollection = this.db.getCollection(collectionName);
    if (existingCollection) {
      await this.db.removeCollection(collectionName);
    }
    await this.createCollection(flow_type, flow_name);
  }

  /** Access full state of all persisted data layers */
  public async getState() {
    // ensure all writes are complete before returning overall state
    await this.writeCache.persistStateToDB();
    return this.writeCache.state;
  }

  /** Ensure a collection exists, creating if not and populating with corresponding list data */
  private async ensureCollection(flow_type: FlowTypes.FlowType, flow_name: string) {
    const collectionName = this.normaliseCollectionName(flow_type, flow_name);
    // Wait for any pending creation operations
    if (this.collectionCreators[collectionName]) {
      await lastValueFrom(this.collectionCreators[collectionName]);
    }
    const existingCollection = this.db.getCollection(collectionName);
    if (!existingCollection) {
      await this.createCollection(flow_type, flow_name);
    }
    return { collectionName };
  }

  private async createCollection(flow_type: FlowTypes.FlowType, flow_name: string) {
    const collectionName = this.normaliseCollectionName(flow_type, flow_name);
    // create collection and insert initial data. Use AsyncSubject to notify only when complete
    this.collectionCreators[collectionName] = new AsyncSubject();
    const initialData = await this.getInitialData(flow_type, flow_name);
    if (initialData.length === 0) {
      throw new Error(`No data exists for collection [${flow_name}], cannot initialise`);
    }
    // add index property to each element before insert, for sorting queried data by original order
    const initialDataWithMeta = initialData.map((el) => {
      return {
        ...el,
        row_index: initialData.indexOf(el),
      };
    });

    const schema = this.inferSchema(initialDataWithMeta[0]);
    await this.db.createCollection(collectionName, schema);
    await this.db.bulkInsert(collectionName, initialDataWithMeta);
    // notify any observers that collection has been created
    this.collectionCreators[collectionName].next(collectionName);
    this.collectionCreators[collectionName].complete();
    delete this.collectionCreators[collectionName];
  }

  /** Retrieve json sheet data and merge with any user writes */
  private async getInitialData(flow_type: FlowTypes.FlowType, flow_name: string) {
    const flowData = await this.appDataService.getSheet(flow_type, flow_name);
    const writeData = this.writeCache.get(flow_type, flow_name) || {};
    const writeDataArray: IDocWithMeta[] = Object.entries(writeData).map(([id, v]) => ({
      ...v,
      id,
    }));
    const mergedData = this.mergeData(flowData?.rows, writeDataArray);
    // HACK - rxdb can't write any fields prefixed with `_` so extract all to top-level APP_META key
    const cleaned = mergedData.map((el) => this.extractMeta(el));
    return cleaned;
  }

  /** When working with rxdb collections only alphanumeric lower case names allowed  */
  private normaliseCollectionName(flow_type: FlowTypes.FlowType, flow_name: string) {
    return `${flow_type}${flow_name}`.toLowerCase().replace(/[^a-z0-9]/g, "");
  }

  private mergeData<T extends IDocWithMeta>(flowData: T[] = [], dbData: T[] = []) {
    const flowHashmap = arrayToHashmap(flowData, "id");
    const dbDataHashmap = arrayToHashmap(dbData, "id");
    const merged = deepMergeObjects(flowHashmap, dbDataHashmap);
    return Object.values(merged) as T[];
  }

  /**
   * Any fields that will be used in querying need to have defined properties for each field
   * Use an example data entry to try and infer schema from datatypes present in that row
   *
   * TODO - ideally better if schmea can also be defined using an `@schema` row or similar
   */
  private inferSchema(data: any) {
    const { id, ...fields } = data;
    // TODO - could make QC check in parser instead of at runtime
    if (!id) {
      throw new Error("Cannot create dynamic data without id column\n" + data);
    }
    if (typeof id !== "string") {
      throw new Error("ID column must be formatted as a string\n" + data);
    }
    const schema = REACTIVE_SCHEMA_BASE;
    for (const [key, value] of Object.entries(fields)) {
      if (!schema.properties[key]) {
        const type = typeof value;
        const entry: TopLevelProperty = { type };
        schema.properties[key] = entry;
      }
    }
    return schema;
  }

  /**
   * Update an "item", a row within a data-items loop, e.g. as triggered by the set_item action.
   * If an _id is specified, the row with that ID is updated,
   * else if an _index is specified, the row with corresponding to the item at that index is updated,
   * if neither is specified, then the current item (as defined in context) is updated
   */
  public async setItem(params: {
    context: ISetItemContext;
    /** the index of a specific item to update */
    _index?: number;
    /** the id of a specific item to update */
    _id?: string;
    /** the property key/values to update on the targeted item */
    writeableProps: any;
  }) {
    const { flow_name, itemDataIDs, currentItemId } = params.context;
    const { _index, _id, writeableProps } = params;

    let targetRowId = currentItemId;
    if (_id) {
      targetRowId = _id;
    }
    if (_index !== undefined) {
      targetRowId = itemDataIDs[_index];
    }

    if (itemDataIDs.includes(targetRowId)) {
      await this.update("data_list", flow_name, targetRowId, writeableProps);
    } else {
      console.warn(`[SET ITEM] - No item ${_id ? "with ID " + _id : "at index " + _index}`);
    }
  }

  /**
   * Iterate over a document's key-value pairs and populate any properties starting with
   * an underscore to a single top-level APP_META property
   */
  private extractMeta(doc: IDocWithMeta) {
    const APP_META: Record<string, any> = {};
    for (const [key, value] of Object.entries(doc)) {
      if (key.startsWith("_")) {
        APP_META[key] = value;
        delete doc[key];
      }
    }
    if (Object.keys(APP_META).length > 0) {
      doc.APP_META = APP_META;
    }
    return doc;
  }
  /** Populate any previously extracted APP_META properties back to document */
  private populateMeta(doc: IDocWithMeta) {
    const { APP_META, ...data } = doc;
    return { ...data, ...APP_META };
  }
}

/** the context for evaluating the target item to be updated, provided by the data-items component */
export interface ISetItemContext {
  /** the name of the data_list containing the item to update */
  flow_name: string;
  /** an array of the IDs of all the item rows in the loop */
  itemDataIDs: string[];
  /** the ID of the current item */
  currentItemId: string;
}
