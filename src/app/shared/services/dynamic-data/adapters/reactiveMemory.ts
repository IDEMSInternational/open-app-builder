import {
  addRxPlugin,
  createRxDatabase,
  MangoQuery,
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
import { BehaviorSubject } from "rxjs";

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

  public async createDB() {
    this.db = await createRxDatabase({
      name: `${environment.deploymentName}`,
      storage: getRxStorageMemory(),
      ignoreDuplicate: true,
    });
    return this;
  }

  public getCollection(name: string) {
    return this.db.collections[name];
  }

  public async getDoc<T>(collectionName: string, docId: string) {
    const collection = this.getCollection(collectionName);
    if (!collection) {
      return undefined;
    }
    const matchedDocs = await collection.findByIds([docId]);
    const existingDoc: RxDocument<T> = matchedDocs.get(docId);
    return existingDoc;
  }

  public query(name: string, queryObj?: MangoQuery) {
    const collection = this.getCollection(name);
    if (!collection) {
      console.error("No db entry", name);
      return new BehaviorSubject([]);
    }
    return collection.find(queryObj).$;
  }

  public async createCollection(name: string, initialData?: any[]) {
    await this.addCollections(this.db, [name]);
    if (initialData) {
      await this.db.collections[name].bulkInsert(initialData);
    }
  }

  public async updateDoc(update: IDataUpdate) {
    const { collectionName, id, data } = update;

    let collection = this.getCollection(collectionName);
    if (!collection) {
      await this.createCollection(collectionName);
      collection = this.getCollection(collectionName);
    }

    const matchedDocs = await collection.findByIds([id]);
    const existingDoc: RxDocument = matchedDocs.get(id);
    if (existingDoc) {
      // Remove any values marked as undefined
      for (const [key, value] of Object.entries(data)) {
        if (value === undefined) {
          delete data[key];
        }
      }
      const updatedDoc = await existingDoc.atomicPatch({ data });
      return updatedDoc.toJSON();
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
