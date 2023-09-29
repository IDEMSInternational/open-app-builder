import { Injectable } from "@angular/core";
import Dexie, { DbEvents } from "dexie";
import "dexie-observable";
import "dexie-syncable";
// import "./db-sync.service";
import { ICreateChange, IDatabaseChange, IDeleteChange, IUpdateChange } from "dexie-observable/api";
import { Subject } from "rxjs";
import { DB_TABLES, DB_VERSION, IDBMeta, IDBEvent, IDBTable, IFlowEvent } from "data-models";
import { arrayToHashmapArray, generateTimestamp } from "../../utils";
import { EventService } from "../event/event.service";
import { AsyncServiceBase } from "../asyncService.base";

window.addEventListener("unhandledrejection", (event) => {
  event.preventDefault(); // Prevents default handler (would log to console).
  let reason = event.reason;
  console.warn("Unhandled promise rejection:", reason && (reason.stack || reason));
});

@Injectable({
  providedIn: "root",
})
export class DbService extends AsyncServiceBase {
  private db = new Dexie("plh-app-db");
  /**
   * Creates a subject to emit changes at an individual table level
   * Note - this only tracks create and update events, which will emit data value to the subject
   */
  private tableChanges$: { [key in IDBTable]: Subject<any> } = {} as any;
  constructor(private eventService: EventService) {
    super("DB");
    this.registerInitFunction(this.init);
  }

  private async init() {
    await this.ensureAsyncServicesReady([]);
    this.ensureSyncServicesReady([this.eventService]);
    this.db.version(DB_VERSION).stores(DB_TABLES);
    Object.keys(DB_TABLES).forEach((table_id) => (this.tableChanges$[table_id] = new Subject()));
    this._listenToDBChanges();
    await this.db.open().catch((err) => {
      console.error("could not open db", err);
      // NOTE - invalid state error suggests dexie not supported, so
      // try reloading with cachedb disabled (see db index for implementation)
      if (err.name === Dexie.errnames.InvalidState) {
        if (err.inner.name === Dexie.errnames.InvalidState) {
          // TODO
          // location.replace(location.href + "?no-cache");
        }
      }
      // NOTE - upgrade error can be avoided by defining legacy db caches
      // with corresponding upgrade functions (see below method TODO)
      if (err.name === Dexie.errnames.Upgrade) {
        console.log("upgrade error");
        // TODO - backup db elsewhere, delete and reload
        // await Dexie.delete(CACHE_DB_NAME).catch(() => location.reload());
        // return location.reload();
      }
    });

    this._addEventListeners();
  }

  /** TODO - CC 2021-07-08 tidy up legacy methods for using dexie sync protocol (not sure if need or not in future) */
  private wipSyncServerDB() {
    // db.syncable.connect("websocket", "ws://127.0.0.1:8080/");
    // db.syncable.on("statusChanged", function (newStatus, url) {
    //   console.log("Sync Status changed: " + Dexie.Syncable.StatusTexts[newStatus]);
    // });
  }
  private wipDeleteServerDB() {
    // db.syncable.disconnect("ws://127.0.0.1:8080/");
    // db.syncable.delete("ws://127.0.0.1:8080/");
  }
  deleteDatabase() {
    return this.db.delete();
  }

  /**
   * Type-safe wrapper around db.table method (with default flowEvent type)
   * - Adds a changes$ subject populated from custom db listeners
   * - Adds toHashampArray method to return hashmap of array values keyed by a specific field
   */
  table<T = IFlowEvent>(tableId: IDBTable) {
    const table = this.db.table<T>(tableId) as Dexie.Table & {
      changes$: Subject<T>;
      toHashmapArray: (keyfield: keyof T) => Promise<{ [key in keyof T]?: T[] }>;
    };
    table.changes$ = this.tableChanges$[tableId];
    table.toHashmapArray = async (keyfield: keyof T) => {
      const arr = await table.toArray();
      return arrayToHashmapArray(arr, keyfield as string) as any;
    };
    return table;
  }

  /**
   * Generate standard metadata to be included with database entries
   * */
  public generateDBMeta(syncable = false) {
    const meta: IDBMeta = {
      _created: generateTimestamp(),
      _sync_status: syncable ? "ignored" : "pending",
    };
    return meta;
  }

  /**
   * Add reactive bindings to the database to receive updates
   * (currently used for debugging and custom tableChanges$ subscription )
   */
  private _listenToDBChanges() {
    // Force typings to recognise dexie-observable plugin
    const on = this.db.on as DbEvents & IDBChangEvent;
    on("changes", (changes) => {
      changes.forEach((change) => {
        switch (change.type) {
          case 1: // CREATED
            change = change as ICreateChange;
            // console.log("[DB CREATED]", change);
            this.tableChanges$[change.table].next(change.obj);
            break;
          case 2: // UPDATED
            change = change as IUpdateChange;
            // console.log("[DB CHANGED]", change);
            this.tableChanges$[change.table].next(change.obj);
            break;
          case 3: // DELETED
            change = change as IDeleteChange;
          // console.log("[DB DELETED]", change);
        }
      });
    });
  }
  private _addEventListeners() {
    this.eventService.all("DB").subscribe(async (e) => {
      const { payload, eventId } = e as IDBEvent;
      const { id, data, operation, tableId } = payload;
      let res: any;
      switch (operation) {
        case "CREATE":
          res = await this.db.table(tableId).add(data);
          break;
        case "UPDATE":
          res = await this.db.table(tableId).update(id, data);
          break;
        case "DELETE":
          res = await this.db.table(tableId).delete(id);
          break;
      }
      return this.eventService.respond(eventId, res);
    });
  }
}

type IDBChangEvent = (
  eventName: "changes",
  subscriber: (changes: IDatabaseChange[]) => any,
  bSticky?: boolean
) => void;
