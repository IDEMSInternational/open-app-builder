import {
  addRxPlugin,
  createRxDatabase,
  MigrationStrategies,
  RxCollection,
  RxDatabase,
  RxDocument,
  RxJsonSchema,
} from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
addRxPlugin(RxDBJsonDumpPlugin);
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
addRxPlugin(RxDBMigrationPlugin);
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
addRxPlugin(RxDBUpdatePlugin);
import { debounceTime, filter, firstValueFrom, Subject } from "rxjs";

import { FlowTypes } from "data-models";
import { compareObjectKeys, deepMergeObjects } from "../../../utils";

/**
 * All persisted docs are stored in the same format with a standard set of meta fields and doc data
 * This avoids breaking schema changes for underlying data changes
 * */
export interface IPersistedDoc {
  id: string;
  flow_name: string;
  flow_type: string;
  row_id: string;
  /** Partial user data overrides to apply */
  data: Record<string, any>;
}

/** The full schema is provided for persisted memory */
const SCHEMA: RxJsonSchema<any> = {
  title: "base schema for id-primary key data",
  // NOTE - important to start at 0 and not timestamp (e.g. 20221220) as will check
  // for migration strategies for each version which is hugely inefficient
  version: 3,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 196, // <- the primary key must have set maxLength
    },
    flow_name: { type: "string", maxLength: 64 },
    flow_type: { type: "string", maxLength: 64 },
    row_id: { type: "string", maxLength: 64 },
    data: {
      type: "object",
    },
  },
  required: ["id", "flow_type", "flow_name", "row_id", "data"],
  indexes: ["flow_type", "flow_name", "row_id"],
};
const MIGRATIONS: MigrationStrategies = {
  // As part of RXDb v14 update all data requires migrating to change metadata fields (no doc data changes)
  // https://rxdb.info/releases/14.0.0.html
  1: (doc) => doc,
  2: (oldDoc) => {
    const newDoc = { ...oldDoc, row_index: 0 };
    return newDoc;
  },
  // remove row_index from persisted memory as user writes will never modify
  3: (doc) => {
    return doc;
  },
};

interface IDataUpdate {
  flow_type: FlowTypes.FlowType;
  flow_name: string;
  id: string;
  data?: Record<string, any>;
}

export class PersistedMemoryAdapter {
  private db: RxDatabase<{
    [key: string]: RxCollection<any, {}, {}, {}>;
  }>;

  constructor(private dbName: string) {
    this.subscribeToStatePersist();
  }

  /** Track pending/complete state persist operations to allow for debouncing*/
  private statePersist$ = new Subject<"pending" | "complete">();

  public state: {
    [flow_type in FlowTypes.FlowType]?: {
      [flow_name: string]: {
        [row_id: string]: { [key: string]: any };
      };
    };
  } = {};

  private get collection() {
    return this.db.collections["user"];
  }

  public async create() {
    this.db = await createRxDatabase({
      name: `${this.dbName}_user`,
      storage: getRxStorageDexie({ autoOpen: true }),
      ignoreDuplicate: true,
    });
    if (!this.collection) {
      await this.db.addCollections({
        user: { schema: SCHEMA, migrationStrategies: MIGRATIONS },
      });
    }
    await this.mapDBToState();
    return this;
  }

  public get(flow_type: FlowTypes.FlowType, flow_name: string) {
    return this.state[flow_type]?.[flow_name];
  }

  /**
   * Provide a partial data update. Will be merged with existing data
   * Any fields marked as `undefined` will be removed
   */
  public update(update: IDataUpdate) {
    const { flow_name, flow_type, id, data } = update;
    if (!this.state[flow_type]) this.state[flow_type] = {};
    if (!this.state[flow_type][flow_name]) this.state[flow_type][flow_name] = {};
    const existingData = this.state[flow_type][flow_name][id];
    const merged = existingData ? deepMergeObjects({}, existingData, data) : data;
    // Remove any values marked as undefined
    for (const [key, value] of Object.entries(merged)) {
      if (value === undefined) {
        delete merged[key];
      }
    }
    this.state[flow_type][flow_name][id] = merged;
    this.persistStateToDB();
  }

  /** Set data for a given entry. Will overwrite any existing data */
  public set(update: IDataUpdate) {
    const { flow_name, flow_type, id, data } = update;
    if (!this.state[flow_type]) this.state[flow_type] = {};
    if (!this.state[flow_type][flow_name]) this.state[flow_type][flow_name] = {};
    // Remove any values marked as undefined
    for (const [key, value] of Object.entries(data)) {
      if (value === undefined) {
        delete data[key];
      }
    }
    this.state[flow_type][flow_name][id] = data;
    this.persistStateToDB();
  }

  public async delete(flow_type: FlowTypes.FlowType, flow_name: string, ids?: string[]) {
    const stateRef = this.get(flow_type, flow_name);
    if (!stateRef) return;
    // delete individuals
    if (ids) {
      for (const id of ids) {
        delete this.state[flow_type][flow_name][id];
      }
    }
    // delete all - mark as empty so it still persists to disk
    else {
      this.state[flow_type][flow_name] = {};
    }
    await this.persistStateToDB();
  }

  public async deleteAll() {
    this.state = {};
    await this.persistStateToDB();
  }

  /** Trigger persist handler. Requests will be debounced and notified when complete */
  public async persistStateToDB() {
    this.statePersist$.next("pending");
    // Wait for persist handler to notify of successful operation
    await firstValueFrom(this.statePersist$.pipe(filter((v) => v === "complete")));
  }

  /**
   * Subscribe to state persist tracker, handling persist operation
   * when requested and with 500ms debounce between operations
   **/
  private subscribeToStatePersist() {
    this.statePersist$
      .pipe(
        filter((v) => v === "pending"),
        debounceTime(500)
      )
      .subscribe(async () => {
        await this.handleStatePersist();
        this.statePersist$.next("complete");
      });
  }

  /**
   * Compare in-memory and persisted states, and update persisted state to match memory
   **/
  private async handleStatePersist() {
    const persistedState = await this.getPersistedHashmap();
    const currentState = this.getStateHashmap();

    const ops = diffObjects(persistedState, currentState);
    const upsert = [...ops.add, ...ops.update].map(({ value }) => value);

    await this.collection.bulkUpsert(upsert);
    await this.collection.bulkRemove(ops.delete.map(({ key }) => key));
  }

  /**
   * Get a flattened hashmap of all rows, keyed by flow_type, name and row id, e.g.
   * ```ts
   * {
   *  data_list__module_list__row_1 : {....},
   *  data_list__module_list__row_2 : {....}
   * }
   * ```
   */
  private getStateHashmap() {
    const hashmap: Record<string, any> = {};
    for (const [flow_type, flowHash] of Object.entries(this.state)) {
      for (const [flow_name, rowHash] of Object.entries(flowHash)) {
        for (const [row_id, data] of Object.entries(rowHash)) {
          const id = `${flow_type}__${flow_name}__${row_id}`;
          hashmap[id] = { id, row_id, flow_type, flow_name, data };
        }
      }
    }
    return hashmap;
  }
  private async getPersistedHashmap() {
    const res: RxDocument[] = await this.collection.find().exec();
    const docs = res.map((r) => r.toMutableJSON() as IPersistedDoc);
    return arrayToHashmap(docs, "id");
  }

  private async mapDBToState() {
    this.state = await this.mapDBToObject(this.state);
  }

  private async mapDBToObject(obj: typeof this.state) {
    const res: RxDocument[] = await this.collection.find().exec();
    const docs = res.map((r) => r.toMutableJSON() as IPersistedDoc);
    for (const doc of docs) {
      const { flow_type, flow_name, row_id, data } = doc;
      if (!obj[flow_type]) obj[flow_type] = {};
      if (!obj[flow_type][flow_name]) obj[flow_type][flow_name] = {};
      obj[flow_type][flow_name][row_id] = data;
    }
    return obj;
  }
}
