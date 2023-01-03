import {
  addRxPlugin,
  createRxDatabase,
  RxChangeEvent,
  RxCollection,
  RxCollectionCreator,
  RxDatabase,
  RxDocument,
  RxJsonSchema,
} from "rxdb";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
addRxPlugin(RxDBJsonDumpPlugin);
import { getRxStorageMemory } from "rxdb/plugins/memory";
import type {
  MemoryStorageInternals,
  RxStorageMemoryInstanceCreationOptions,
} from "rxdb/dist/types/plugins/memory";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
addRxPlugin(RxDBMigrationPlugin);
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
addRxPlugin(RxDBUpdatePlugin);
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";

/**
 * Create a base schema for data
 * NOTE - by default assumes data has an id field which will be used as primary key
 * https://rxdb.info/rx-schema.html
 */
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
  },
  required: ["id", "flow_name"],
  indexes: ["flow_name"],
};

interface IDataUpdate {
  collectionName: string;
  id: string;
  data?: Record<string, any>;
}

export class ReactiveMemoryAdapater {
  private db: RxDatabase<
    {
      [key: string]: RxCollection<any, {}, {}, {}>;
    },
    MemoryStorageInternals<any>,
    RxStorageMemoryInstanceCreationOptions
  >;

  public async create() {
    this.db = await createRxDatabase({
      name: `${environment.deploymentName}`,
      storage: getRxStorageMemory(),
      ignoreDuplicate: true,
    });
    return this;
  }

  public subscribe(name: string) {
    if (!this.hasCollection(name)) {
      console.error("No db entry to subscribe to", name);
      const emptyObserver: Observable<RxChangeEvent<any>> = new Observable();
      return emptyObserver;
    }
    console.log("subscribing", this.db.collections[name]);
    return this.db.collections[name].$;
  }

  public hasCollection(name: string) {
    return this.db.collections[name] ? true : false;
  }

  public async createCollection(name: string, initialData: any[]) {
    if (!this.db.collections[name]) {
      await this.addCollections(this.db, [name]);
    }
    await this.db.collections[name].bulkInsert(initialData);
  }

  public async update(update: IDataUpdate) {
    const { collectionName, id, data } = update;
    // const dbName = await this.ensureDataLoaded({ flow_type, flow_name });
    const collection = this.db[collectionName];
    const matchedDocs = await collection.findByIds([id]);
    const existingDoc: RxDocument = matchedDocs.get(id);
    if (existingDoc) {
      await existingDoc.update({ $set: data });
      return existingDoc.toJSON();
    } else {
      await collection.insert(update);
      return update;
    }
  }

  private async addCollections(db: RxDatabase, names: string[]) {
    const collections: { [x: string]: RxCollectionCreator<any> } = {};
    for (const name of names) {
      collections[name] = { schema: SCHEMA_BASE };
    }
    return db.addCollections(collections);
  }
}
