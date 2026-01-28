import { Capacitor } from "@capacitor/core";
import { debounceTime, filter, firstValueFrom, Subject } from "rxjs";

import { FlowTypes } from "data-models";
import { deepMergeObjects } from "../../../utils";
import { IPersistenceStrategy, PersistedState } from "./persistence/persistence.interface";
import { IndexedDBPersistenceStrategy } from "./persistence/indexeddb.strategy";
import { FilePersistenceStrategy } from "./persistence/file.strategy";

interface IDataUpdate {
  flow_type: FlowTypes.FlowType;
  flow_name: string;
  id: string;
  data?: Record<string, any>;
}

export class PersistedMemoryAdapter {
  private strategy: IPersistenceStrategy;

  /** Track pending/complete state persist operations to allow for debouncing*/
  private statePersist$ = new Subject<"pending" | "complete">();

  public state: PersistedState = {};

  constructor(private dbName: string) {
    this.subscribeToStatePersist();
  }

  public async create() {
    // Persist to json file on native or RXDB's Dexie (IndexedDB) adapter on web
    // This helps to ensure data is easy to interrogate in devtools on web whilst
    // avoiding loss of data on native in cases where OS clears IndexedDB caches
    // https://capacitorjs.com/docs/guides/storage
    this.strategy = Capacitor.isNativePlatform()
      ? new FilePersistenceStrategy()
      : new IndexedDBPersistenceStrategy(this.dbName);

    await this.strategy.init();
    this.state = await this.strategy.load();
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
    if (merged) {
      for (const [key, value] of Object.entries(merged)) {
        if (value === undefined) {
          delete merged[key];
        }
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
    if (data) {
      for (const [key, value] of Object.entries(data)) {
        if (value === undefined) {
          delete data[key];
        }
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
        if (this.state[flow_type]?.[flow_name]) {
          delete this.state[flow_type][flow_name][id];
        }
      }
    }
    // delete all - mark as empty so it still persists to disk
    else {
      if (this.state[flow_type]) {
        this.state[flow_type][flow_name] = {};
      }
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
        if (this.strategy) {
          await this.strategy.save(this.state);
          this.statePersist$.next("complete");
        }
      });
  }
}
