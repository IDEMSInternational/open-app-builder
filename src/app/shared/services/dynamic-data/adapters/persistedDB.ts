import { addRxPlugin, createRxDatabase, RxCollection, RxDatabase, RxJsonSchema } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/dexie";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
addRxPlugin(RxDBJsonDumpPlugin);
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
addRxPlugin(RxDBMigrationPlugin);
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
addRxPlugin(RxDBUpdatePlugin);

import { FlowTypes } from "packages/data-models";
import { environment } from "src/environments/environment";
import { deepMergeObjects } from "../../../utils";

const SCHEMA_BASE: RxJsonSchema<any> = {
  title: "base schema for id-primary key data",
  // NOTE - important to start at 0 and not timestamp (e.g. 20221220) as will check
  // for migration strategies for each version which is hugely inefficient
  version: 0,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 128, // <- the primary key must have set maxLength
    },
    flow_name: { type: "string", maxLength: 64 },
    flow_type: { type: "string", maxLength: 64 },
  },
  required: ["id", "flow_name", "flow_type"],
  indexes: ["flow_name", "flow_type"],
};

interface IDataUpdate {
  flow_type: FlowTypes.FlowType;
  flow_name: string;
  id: string;
  data?: Record<string, any>;
}

export class DynamicDataPersistedDB {
  private db: RxDatabase<{
    [key: string]: RxCollection<any, {}, {}, {}>;
  }>;

  private state: {
    [flow_type in FlowTypes.FlowType]?: { [flow_name: string]: { [row_id: string]: any } };
  } = {};

  public async create() {
    this.db = await createRxDatabase({
      name: `${environment.deploymentName}_user`,
      storage: getRxStorageDexie({ autoOpen: true }),
    });
    await this.populateInitialState();

    return this;
  }
  private async populateInitialState() {
    const initialWriteState = await this.db.exportJSON();
    console.log({ initialWriteState });
  }

  public get(flow_type: FlowTypes.FlowType, flow_name: string) {
    return this.state[flow_type]?.[flow_name];
  }

  public update(update: IDataUpdate) {
    const { flow_name, flow_type, id, data } = update;
    if (!this.state[flow_type]) this.state[flow_type] = {};
    if (!this.state[flow_type][flow_name]) this.state[flow_type][flow_name] = {};
    const existingData = this.state[flow_type][flow_name][id];
    const merged = deepMergeObjects(existingData, data);
    this.state[flow_type][flow_name][id] = merged;
    // TODO - debounce write to disk
    this.persistState();
  }

  /**
   *
   * TODO - could perform more incremental updates
   */
  private async persistState() {
    for (const [flow_type, flowHash] of Object.entries(this.state)) {
      const collectionName = flow_type;
      if (!this.db[collectionName]) {
        console.log("adding collection", flow_type);
        await this.db.addCollections({ [flow_type]: { schema: SCHEMA_BASE } });
      }
      const updates: { id: string; flow_name: string }[] = [];
      for (const [flow_name, rowHash] of Object.entries(flowHash)) {
        for (const [id, update] of Object.entries(rowHash)) {
          updates.push({ ...update, id, flow_name });
        }
      }
      console.log({ flow_type, updates });
      await this.db[collectionName].bulkUpsert(updates);
    }
  }
}
