import { Injectable } from "@angular/core";
import Dexie, { DbEvents } from "dexie";
import "dexie-observable";
import { ICreateChange, IDatabaseChange, IDeleteChange, IUpdateChange } from "dexie-observable/api";
import { EventService } from "../event/event.service";

const db = new Dexie("plh-app-db");

window.addEventListener("unhandledrejection", (event) => {
  event.preventDefault(); // Prevents default handler (would log to console).
  let reason = event.reason;
  console.warn("Unhandled promise rejection:", reason && (reason.stack || reason));
});

/**
 * All tables used must be defined with any indices required (other columns freely added)
 * Include auto-increment primary key via `++`
 * https://dexie.org/docs/API-Reference#quick-reference
 */
const DB_TABLES = {
  surveys: "++id,surveyId",
  reminders: "++id,type",
  /** task_actions track content the user has interacted with */
  task_actions: "id,task_id,_created",
  /** session_actions track meta interactions such as start and end of session */
  session_actions: "id,task_id,_created",
  /** user */
  user_meta: "key,value",
};
export type IDBTable = keyof typeof DB_TABLES;
/**
 * For any tables with automatic id assignment the following fields will be populated
 */
export interface IDBDoc {
  id: number;
}

/**
 * All databases must contain an incremented version number, and any migration logic
 * required between versions. Currently using app version number to track when the
 * breaking changes occurred (does not need to be updated every version)
 * e.g. v1.5.3 => 100500300
 * e.g. v0.1.0 => 000001000
 */
const DB_VERSION = 7000;
db.version(DB_VERSION).stores(DB_TABLES);

@Injectable({
  providedIn: "root",
})
export class DbService {
  private db = db;
  constructor(private eventService: EventService) {}
  async init() {
    this._listenToDBChanges();
    db.open().catch((err) => {
      console.error("could not open db", err);
      // NOTE - invalid state error suggests dexie not supported, so
      // try reloading with cachedb disabled (see db index for implementation)
      if (err.name === Dexie.errnames.InvalidStateError) {
        if (err.inner.name === Dexie.errnames.InvalidStateError) {
          // TODO
          // location.replace(location.href + "?no-cache");
        }
      }
      // NOTE - upgrade error can be avoided by defining legacy db caches
      // with corresponding upgrade functions (see below method TODO)
      if (err.name === Dexie.errnames.UpgradeError) {
        console.log("upgrade error");
        // TODO - backup db elsewhere, delete and reload
        // await Dexie.delete(CACHE_DB_NAME).catch(() => location.reload());
        // return location.reload();
      }
    });
    this._addEventListeners();
  }
  deleteDatabase() {
    return this.db.delete();
  }

  /**
   * Type-safe wrapper around db.table method
   */
  table<T>(tableId: IDBTable) {
    return this.db.table<T>(tableId);
  }

  /**
   * Add reactive bindings to the database to receive updates
   * (currently only for debugging purposese)
   */
  private _listenToDBChanges() {
    // Force typings to recognise dexie-observable plugin
    const on = db.on as DbEvents & IDBChangEvent;
    on("changes", (changes) => {
      changes.forEach((change) => {
        switch (change.type) {
          case 1: // CREATED
            change = change as ICreateChange;
            console.log("[DB CREATED]", change);
            break;
          case 2: // UPDATED
            change = change as IUpdateChange;
            console.log("[DB CHANGED]", change);
            break;
          case 3: // DELETED
            change = change as IDeleteChange;
            console.log("[DB DELETED]", change);
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
          res = await db.table(tableId).add(data);
          break;
        case "UPDATE":
          res = await db.table(tableId).update(id, data);
          break;
        case "DELETE":
          res = await db.table(tableId).delete(id);
          break;
      }
      return this.eventService.respond(eventId, res);
    });
  }
}
export interface IDBEvent {
  topic: "DB";
  payload: {
    id?: string;
    tableId: keyof typeof DB_TABLES;
    operation: "CREATE" | "UPDATE" | "DELETE";
    data: any;
  };
  eventId?: string;
}

type IDBChangEvent = (
  eventName: "changes",
  subscriber: (changes: IDatabaseChange[]) => any,
  bSticky?: boolean
) => void;
