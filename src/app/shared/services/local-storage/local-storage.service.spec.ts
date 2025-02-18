import { TestBed } from "@angular/core/testing";

import { LocalStorageService } from "./local-storage.service";

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

  it("sets and gets private entries", () => {
    service.setProtected("AUTH_USER_NAME", "private_user_name");
    expect(service.getProtected("AUTH_USER_NAME")).toEqual("private_user_name");
    expect(localStorage.getItem("rp-contact-field._auth_user_name")).toEqual("private_user_name");
  });

  it("omits private entries from getAll method", () => {
    service.setProtected("AUTH_USER_NAME", "private_user_name");
    const res = service.getAll();
    expect(res).toEqual({});
  });

  // TODO - currently deprecated but not throwing error
  // it("prevents setting protected fields", () => {});
});
