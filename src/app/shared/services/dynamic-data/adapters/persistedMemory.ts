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
import { deepMergeObjects, compareObjectKeys } from "../../../utils";

/**
 * All persisted docs are stored in the same format with a standard set of meta fields and doc data
 * This avoids breaking schema changes for underlying data changes
 * */
interface IPersistedDoc {
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

  public delete(flow_type: FlowTypes.FlowType, flow_name: string, ids?: string[]) {
    const stateRef = this.get(flow_type, flow_name);
    if (!stateRef) return;
    // delete individuals
    if (ids) {
      for (const id of ids) {
        delete this.state[flow_type][flow_name][id];
      }
    }
    // delete all
    else {
      delete this.state[flow_type][flow_name];
    }
    this.persistStateToDB();
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
   * TODO - could perform more incremental updates and avoid overwrite with same data
   */
  private async handleStatePersist() {
    // Handle insertions and updates
    const updates: IPersistedDoc[] = [];
    for (const [flow_type, flowHash] of Object.entries(this.state)) {
      for (const [flow_name, rowHash] of Object.entries(flowHash)) {
        for (const [row_id, update] of Object.entries(rowHash)) {
          const id = `${flow_type}__${flow_name}__${row_id}`;
          updates.push({ id, row_id, flow_type, flow_name, data: update });
        }
      }
    }
    await this.collection.bulkUpsert(updates);

    // Handle deletions (check for flows that exist in DB but not in state, and remove from DB)
    const db = await this.mapDBToObject({});
    const idsToDelete = [];
    for (const flow_type of Object.keys(db)) {
      const { deleted } = compareObjectKeys(db[flow_type], this.state[flow_type]);
      for (const flow_name of deleted) {
        const rowHash = db[flow_type][flow_name];
        for (const row_id of Object.keys(rowHash)) {
          idsToDelete.push(`${flow_type}__${flow_name}__${row_id}`);
        }
      }
    }
    this.collection.bulkRemove(idsToDelete);
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
