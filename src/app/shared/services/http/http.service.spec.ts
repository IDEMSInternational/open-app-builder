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
  let cacheGetSpy: jasmine.Spy;

  beforeEach(async () => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpService);

    // use mock in-memory cache adapter and spy on requests
    const mockCache = new MockHttpCache();
    spyOn(service, "createCache" as any).and.callFake(() => mockCache);
    cacheGetSpy = spyOn(mockCache, "get").and.callThrough();

    // spy on client network get requests and provide fake response
    getReqSpy = spyOn(service["client"], "get").and.callFake(() => {
      const response = new Response("network", { status: 200 });
      return Promise.resolve(response) as any;
    });
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("sends get request", async () => {
    await service.get("https://example.com");
    expect(getReqSpy).toHaveBeenCalledTimes(1);
  });

  it("uses default cache adaptor", async () => {
    await service.get("https://example.com", { strategy: "cache-only" });
    expect(Object.keys(service["cacheNamespaces"])).toEqual(["cache"]);
    expect(cacheGetSpy).toHaveBeenCalledTimes(1);
  });

  it("supports multiple named cache adaptors", async () => {
    await service.get("https://example.com", { strategy: "cache-only" });
    await service.get("https://example.com", { strategy: "cache-only", cacheName: "mock" });
    expect(Object.keys(service["cacheNamespaces"])).toEqual(["cache", "mock"]);
  });

  it("uses normalized url for cache keys", async () => {
    // prefixed with method and trailing slash removed
    await service.get("https://example.com/", { strategy: "cache-only" });
    const [cacheKey] = cacheGetSpy.calls.mostRecent().args;
    expect(cacheKey).toEqual("GET|https://example.com");

    // query params preserved
    await service.get("https://example.com?search=test", { strategy: "cache-only" });
    const [cacheKey2] = cacheGetSpy.calls.mostRecent().args;
    expect(cacheKey2).toEqual("GET|https://example.com?search=test");
  });

  it("populates cache headers", async () => {
    await service.get("https://example.com");
    const [url, options] = getReqSpy.calls.first().args;
    const expiryHeader = options.headers["x-cache-expiry"];
    expect(expiryHeader).toBeTruthy();
    expect(Number(expiryHeader)).toBeGreaterThan(new Date().getTime());
  });

  // Should convert '1m' expiry to ms and calculate expiry as epoch time diff from now
  it("populates custom cache-expiry header", async () => {
    const reqTimeStamp = new Date().getTime();
    await service.get("https://example.com", { cacheExpiry: "1m" });
    const [url, options] = getReqSpy.calls.first().args;
    const expiryHeader = options.headers["x-cache-expiry"];
    const expiryTimeDiff = Number(expiryHeader) - reqTimeStamp;
    // Should set expiry 1 minute from time of request (60,000 ms)
    // Could be slightly less depending on time between timestamp and sending request
    expect(expiryTimeDiff).toBeGreaterThanOrEqual(60000);
    expect(expiryTimeDiff).toBeLessThanOrEqual(61000);
  });

  it("cache-only strategy", async () => {
    const res = await service.get("https://mock.string", { strategy: "cache-only" });
    const sourceHeader = res.headers.get("x-res-source");
    expect(sourceHeader).toEqual("cache");
  });

  it("cache-first strategy", async () => {});
  it("network-first strategy", async () => {});
  it("network-only strategy", async () => {});

  describe("getMediaSrc", () => {
    it("should return object with src and revoke callback", async () => {
      const media = await service.getMediaSrc("https://example.com/image.png");

      // Since it's our mock cache, the src should equal the mock adapter's output
      expect(media.src).toBeTruthy();
      expect(typeof media.revoke).toBe("function");
    });

    it("should default cache strategy and cache item before returning", async () => {
      // Mock the cache's getUrl to simulate a hit
      spyOn(
        service["cacheNamespaces"]["cache"] || (await service["getCache"]("cache")),
        "getUrl"
      ).and.returnValue(Promise.resolve("mock-url"));
      const media = await service.getMediaSrc("https://example.com/asset.mp4");

      expect(getReqSpy).toHaveBeenCalled();
      expect(media.src).toEqual("mock-url");
    });
  });

  it("retries failed downloads", () => {});
});
