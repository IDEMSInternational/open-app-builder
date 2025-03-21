import { TestBed } from "@angular/core/testing";

import { HttpService } from "./http.service";
import { ResponsePromise } from "ky";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/http/http.service.spec.ts
 */
describe("HttpService", () => {
  let service: HttpService;
  let getReqSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpService);
    service.ready();

    getReqSpy = spyOn(service["client"], "get").and.callFake(() => {
      return {} as ResponsePromise<any>;
    });
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("sets cache adapter depending on environment", () => {});

  it("populates expiry header", async () => {});

  it("retries failed downloads", () => {});

  it("cache-only strategy", async () => {});
  it("cache-first strategy", async () => {});
  it("network-first strategy", async () => {});
  it("network-only strategy", async () => {});
});
