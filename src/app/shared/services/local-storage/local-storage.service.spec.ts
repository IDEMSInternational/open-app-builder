import { TestBed } from "@angular/core/testing";

import { LocalStorageService } from "./local-storage.service";
import { IProtectedFieldName } from "packages/data-models";

/** Mock calls to localstorage to store values in-memory */
export class MockLocalStorageService implements Partial<LocalStorageService> {
  private values: Record<string, string> = {};
  public getString(key: string): string {
    return this.values[key];
  }
  public setString(key: string, value: string): void {
    this.values[key] = value;
  }
  public ready(): boolean {
    return true;
  }
  public getProtected(field: IProtectedFieldName): string {
    return this.getString(`_${field}`);
  }
  public setProtected(field: IProtectedFieldName, value: string) {
    return this.setString(`_${field}`, value);
  }
}

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/local-storage/local-storage.service.spec.ts
 */
describe("LocalStorageService", () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("sets and gets string entries using prefix", () => {
    service.setString("test", "hello");
    console.log("localStorage", Object.entries(localStorage));
    expect(service.getString("test")).toEqual("hello");
    expect(localStorage.getItem("rp-contact-field.test")).toEqual("hello");
  });

  it("sets and gets protected entries", () => {
    service.setProtected("APP_USER_ID", "test_user_1234");
    expect(service.getProtected("APP_USER_ID")).toEqual("test_user_1234");
    expect(localStorage.getItem("rp-contact-field._app_user_id")).toEqual("test_user_1234");
  });

  it("retrieves all storage entries", () => {
    service.setString("key_1", "value_1");
    service.setString("key_2", "value_2");
    localStorage.setItem("non_prefixed_key", "value");
    expect(service.getAll()).toEqual({
      "rp-contact-field.key_1": "value_1",
      "rp-contact-field.key_2": "value_2",
    });
  });

  it("sets and gets json entries", () => {
    service.setJSON("test_json", { test: "hello" });
    expect(service.getJSON("test_json")).toEqual({ test: "hello" });
  });

  it("checks protected key ", () => {
    expect(service.isProtected("rp-contact-field._app_user_id")).toEqual(true);
  });

  // TODO - currently deprecated but not throwing error
  // it("prevents setting protected fields", () => {});
});
