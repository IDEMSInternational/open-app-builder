import {
  addRxPlugin,
  createRxDatabase,
  RxCollection,
  RxDatabase,
  RxDocument,
  RxJsonSchema,
} from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/dexie";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
addRxPlugin(RxDBJsonDumpPlugin);
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
addRxPlugin(RxDBMigrationPlugin);
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
addRxPlugin(RxDBUpdatePlugin);

import { FlowTypes } from "data-models";
import { environment } from "src/environments/environment";
import { deepMergeObjects, generateTimestamp } from "../../../utils";

/**
 * All persisted docs are stored in the same format with a standard set of meta fields and doc data
 * This avoids breaking schema changes for underlying data changes
 * */
interface IPersistedDoc {
  id: string;
  flow_name: string;
  flow_type: string;
  row_id: string;
  data: any;
}

/** The full schema is provided for persisted memory */
const SCHEMA: RxJsonSchema<any> = {
  title: "base schema for id-primary key data",
  // NOTE - important to start at 0 and not timestamp (e.g. 20221220) as will check
  // for migration strategies for each version which is hugely inefficient
  version: 0,
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

  private state: {
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
      name: `${environment.deploymentName}_user`,
      storage: getRxStorageDexie({ autoOpen: true }),
      ignoreDuplicate: true,
    });
    if (!this.collection) {
      await this.db.addCollections({ user: { schema: SCHEMA } });
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
    const merged = deepMergeObjects({}, existingData, data);
    // Remove any values marked as undefined
    for (const [key, value] of Object.entries(merged)) {
      if (value === undefined) {
        delete merged[key];
      }
    }
    this.state[flow_type][flow_name][id] = merged;
    // TODO - debounce write to disk
    this.persistStateToDB();
  }

  public delete(flow_type: FlowTypes.FlowType, flow_name: string) {
    if (this.get(flow_type, flow_name)) {
      delete this.state[flow_type][flow_name];
      this.persistStateToDB();
    }
  }

  /**
   *
   * TODO - could perform more incremental updates and avoid overwrite with same data
   */
  private async persistStateToDB() {
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
  }
  private async mapDBToState() {
    const res: RxDocument[] = await this.collection.find().exec();
    const docs = res.map((r) => r.toMutableJSON() as IPersistedDoc);
    for (const doc of docs) {
      const { flow_type, flow_name, row_id, data } = doc;
      if (!this.state[flow_type]) this.state[flow_type] = {};
      if (!this.state[flow_type][flow_name]) this.state[flow_type][flow_name] = {};
      this.state[flow_type][flow_name][row_id] = data;
    }
  }
}
