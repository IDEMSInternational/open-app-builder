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
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
import { arrayToHashmap, diffObjects } from "packages/shared/src/utils/object-utils";
import { IPersistenceStrategy, PersistedState } from "./persistence.interface";

addRxPlugin(RxDBJsonDumpPlugin);
addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBUpdatePlugin);

export interface IPersistedDoc {
  id: string;
  flow_name: string;
  flow_type: string;
  row_id: string;
  /** Partial user data overrides to apply */
  data: Record<string, any>;
}

const SCHEMA: RxJsonSchema<any> = {
  title: "base schema for id-primary key data",
  version: 3,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 196,
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
  1: (doc) => doc,
  2: (oldDoc) => {
    const newDoc = { ...oldDoc, row_index: 0 };
    return newDoc;
  },
  3: (doc) => doc,
};

export class IndexedDBPersistenceStrategy implements IPersistenceStrategy {
  private db: RxDatabase<{
    [key: string]: RxCollection<any, {}, {}, {}>;
  }>;

  constructor(private dbName: string) {}

  private get collection() {
    return this.db.collections["user"];
  }

  async init() {
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

    // Attempt to persist storage to avoid eviction
    if (navigator.storage && navigator.storage.persist) {
      const isPersisted = await navigator.storage.persist();
      console.log(`Storage persistence persisted: ${isPersisted}`);
    }
  }

  async load(): Promise<PersistedState> {
    const res: RxDocument[] = await this.collection.find().exec();
    const docs = res.map((r) => r.toMutableJSON() as IPersistedDoc);
    const state: PersistedState = {};

    for (const doc of docs) {
      const { flow_type, flow_name, row_id, data } = doc;
      if (!state[flow_type]) state[flow_type] = {};
      if (!state[flow_type][flow_name]) state[flow_type][flow_name] = {};
      state[flow_type][flow_name][row_id] = data;
    }
    return state;
  }

  async save(currentState: PersistedState): Promise<void> {
    const persistedState = await this.getPersistedHashmap();
    const currentHashmap = this.getStateHashmap(currentState);

    const ops = diffObjects(persistedState, currentHashmap);
    const upsert = [...ops.add, ...ops.update].map(({ value }) => value);

    await this.collection.bulkUpsert(upsert);
    await this.collection.bulkRemove(ops.delete.map(({ key }) => key));
  }

  async clear(): Promise<void> {
    await this.collection.remove();
  }

  private getStateHashmap(state: PersistedState) {
    const hashmap: Record<string, any> = {};
    for (const [flow_type, flowHash] of Object.entries(state)) {
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
}
