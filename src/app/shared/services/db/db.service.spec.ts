import { TestBed } from "@angular/core/testing";
import { IDBMeta } from "packages/data-models/db.model";
import { generateTimestamp } from "../../utils";

import { DbService } from "./db.service";

/**
 * Minimal set of methods for use in mocking other tests
 * TODO - add own test suite
 */
export class MockDbService implements Partial<DbService> {
  async ready() {
    await new Promise((resolve) => setTimeout(() => resolve(true), 200));
    return true;
  }
  public generateDBMeta(syncable?: boolean): IDBMeta {
    return { _created: generateTimestamp(), _sync_status: syncable ? "ignored" : "pending" };
  }
}

describe("DbService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: DbService = TestBed.get(DbService);
    expect(service).toBeTruthy();
  });
});
