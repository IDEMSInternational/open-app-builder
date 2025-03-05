import Dexie from "dexie";
import { indexedDB, IDBKeyRange } from "fake-indexeddb";
import { DbService } from "./db.service";
import { EventService } from "../event/event.service";

export class MockDbService extends DbService {
  constructor() {
    super(new EventService());
    // Use a mock indexeddb with Dexie bindings
    // https://github.com/dumbmatter/fakeIndexedDB?tab=readme-ov-file#dexie-and-other-indexeddb-api-wrappers
    super["db"] = new Dexie("MockDB", { indexedDB, IDBKeyRange });
  }
}
