import {
  addRxPlugin,
  createRxDatabase,
  MangoQuery,
  MigrationStrategies,
  RxCollection,
  RxCollectionCreator,
  RxDatabase,
  RxDocument,
  RxJsonSchema,
} from "rxdb";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
addRxPlugin(RxDBJsonDumpPlugin);
import { getRxStorageMemory } from "rxdb/plugins/storage-memory";
import type {
  MemoryStorageInternals,
  RxStorageMemoryInstanceCreationOptions,
} from "rxdb/dist/types/plugins/storage-memory";
import { RxDBMigrationPlugin } from "rxdb/plugins/migration";
addRxPlugin(RxDBMigrationPlugin);
import { RxDBUpdatePlugin } from "rxdb/plugins/update";
addRxPlugin(RxDBUpdatePlugin);
import { map } from "rxjs";
import { of } from "rxjs/internal/observable/of";
import { FlowTypes } from "packages/data-models";

type IDocWithMeta = FlowTypes.Data_listRow & { APP_META?: Record<string, any> };

/**
 * Create a base schema for data
 * NOTE - by default assumes data has an id field which will be used as primary key
 * https://rxdb.info/rx-schema.html
 */
export const REACTIVE_SCHEMA_BASE: RxJsonSchema<any> = {
  title: "base schema for id-primary key data",
  // NOTE - important to start at 0 and not timestamp (e.g. 20221220) as will check
  // for migration strategies for each version which is hugely inefficient
  version: 2,
  primaryKey: "id",
  type: "object",
  properties: {
    id: {
      type: "string",
      maxLength: 128, // <- the primary key must have set maxLength
    },
    row_index: { type: "integer", minimum: 0, maximum: 10000, multipleOf: 1, final: true },
    APP_META: {
      type: "object",
      additionalProperties: true,
      default: {},
    },
  },
  required: ["id"],
  indexes: ["row_index"],
};
const MIGRATIONS: MigrationStrategies = {
  1: (oldDoc) => {
    const newDoc = { ...oldDoc, row_index: 0 };
    return newDoc;
  },
  2: (oldDoc) => {
    const newDoc = {
      ...oldDoc,
      APP_META: oldDoc.APP_META ?? {},
    };
    return newDoc;
  },
};

interface IDataUpdate {
  collectionName: string;
  id: string;
  data?: Record<string, any>;
}

export class ReactiveMemoryAdapter {
  private db: RxDatabase<
    {
      [key: string]: RxCollection<any, {}, {}, {}>;
    },
    MemoryStorageInternals<any>,
    RxStorageMemoryInstanceCreationOptions
  >;
  constructor(private dbName: string) {}

  public async createDB() {
    this.db = await createRxDatabase({
      name: this.dbName,
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
    const matchedDocs = await collection.findByIds([docId]).exec();
    const existingDoc: RxDocument<IDocWithMeta> = matchedDocs.get(docId);
    return existingDoc;
  }

  public query<T extends FlowTypes.Data_listRow>(name: string, queryObj?: MangoQuery) {
    const collection = this.getCollection(name);
    if (!collection) {
      console.error("No db entry", name);
      return of([]);
    }
    // we need mutable json so that we can replace dynamic references as required
    // ensure any previously extracted metadata fields are repopulated
    return collection.find(queryObj).$.pipe(
      map((docs) =>
        docs.map((d: RxDocument<T>) => {
          const data = d.toMutableJSON();
          return this.populateMeta(data);
        })
      )
    );
  }

  /**
   * @param dataSample row of data used to infer schema types
   */
  public async createCollection(name: string, schema: RxJsonSchema<any>) {
    const collections: { [x: string]: RxCollectionCreator<any> } = {};
    collections[name] = { schema, migrationStrategies: MIGRATIONS };
    await this.db.addCollections(collections);
    const collection = this.db.collections[name];
    // HACK - sometimes rxdb keeps data in memory during repeated create/delete cycles
    // (e.g. test runners), so ensure all data fully removed post creation
    const data = await collection.find().exec();
    if (data.length > 0) {
      await collection.bulkRemove(data.map((d) => d.id));
    }
    // Use a pre-insert hook to extract any metadata fields that are unsupported by rxdb
    collection.preInsert((doc) => this.extractMeta(doc), true);
    return collection;
  }

  public async bulkInsert(name: string, docs: any[]) {
    const { error, success } = await this.db.collections[name].bulkInsert(docs);
    if (error.length > 0) {
      console.warn(`[DB] could not insert docs into [${name}]`, docs);
      console.error(error);
    }
    return success;
  }

  /** Update doc or create new if doc with that ID doesn't already exist (upsert) */
  public async updateDoc(update: IDataUpdate) {
    const { collectionName, id, data } = update;
    let collection = this.getCollection(collectionName);
    if (!collection) {
      throw new Error("Collection does not exist: " + collectionName);
    }
    const matchedDocs = await collection.findByIds([id]).exec();
    const existingDoc: RxDocument = matchedDocs.get(id);
    if (existingDoc) {
      // Remove any values marked as undefined
      for (const [key, value] of Object.entries(data)) {
        if (value === undefined) {
          delete data[key];
        }
      }
      const updatedDoc = await existingDoc.incrementalPatch(data);
      return updatedDoc.toMutableJSON();
    } else {
      const newDoc = await collection.insert(data);
      return newDoc.toMutableJSON();
    }
  }

  public async removeCollection(collectionName: string) {
    await this.db.collections[collectionName].remove();
  }

  /**
   * Iterate over a document's key-value pairs and populate any properties starting with
   * an underscore to a single top-level APP_META property
   */
  private extractMeta(doc: IDocWithMeta) {
    const APP_META: Record<string, any> = {};
    const rxdbMetaKeys = ["_attachments", "_deleted", "_meta", "_rev"];
    for (const [key, value] of Object.entries(doc)) {
      if (key.startsWith("_") && !rxdbMetaKeys.includes(key)) {
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
