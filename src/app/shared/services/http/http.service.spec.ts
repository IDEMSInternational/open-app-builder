import { TestBed } from "@angular/core/testing";

import { HttpService } from "./http.service";
import { Input, Options, ResponsePromise } from "ky";
import { MockHttpCache } from "./cache/http-cache.mock.spec";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/http/http.service.spec.ts
 */
describe("HttpService", () => {
  let service: HttpService;
  let getReqSpy: jasmine.Spy<<T>(url: Input, options?: Options) => ResponsePromise<T>>;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpService);

    // use mock cache adapter to stub responses from cache
    service.cache = new MockHttpCache({ "https://mock.string": "hello" });
    await service.ready();

    // add spy for get requests
    getReqSpy = spyOn(service["client"], "get").and.callFake(() => {
      return {} as ResponsePromise<any>;
    });
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("uses cache adaptor", async () => {
    const cache = service["cache"];
    expect(cache).toBeTruthy();
  });

  it("sends get request", async () => {
    await service.get("https://example.com", { expiry: "1d" });
    expect(getReqSpy).toHaveBeenCalledTimes(1);
  });

  it("populates default headers", async () => {
    const res = await service.get("https://example.com");
    const [url, options] = getReqSpy.calls.first().args;
    const expiryHeader = options.headers["x-cache-expiry"];
    expect(expiryHeader).toBeTruthy();
    expect(Number(expiryHeader)).toBeGreaterThan(new Date().getTime());
  });

  // Should convert '1m' expiry to ms and calculate expiry as epoch time diff from now
  it("populates custom cache-expiry header", async () => {
    const reqTimeStamp = new Date().getTime();
    await service.get("https://example.com", { expiry: "1m" });
    const [url, options] = getReqSpy.calls.first().args;
    const expiryHeader = options.headers["x-cache-expiry"];
    const expiryTimeDiff = Number(expiryHeader) - reqTimeStamp;
    // Should set expiry 1 minute from time of request (60,000 ms)
    // Could be slightly less depending on time between timestamp and sending request
    expect(expiryTimeDiff).toBeGreaterThanOrEqual(60000);
    expect(expiryTimeDiff).toBeLessThanOrEqual(61000);
  });

  it("cache-only strategy", async () => {
    // allow full api to call through to check if intercepted by cache
    getReqSpy.and.callThrough();
    const res = await service.get("https://mock.string", { strategy: "cache-only" });
    const sourceHeader = res.headers.get("x-res-source");
    expect(sourceHeader).toEqual("cache");
  });

  it("cache-first strategy", async () => {});
  it("network-first strategy", async () => {});
  it("network-only strategy", async () => {});

  it("retries failed downloads", () => {});
});
