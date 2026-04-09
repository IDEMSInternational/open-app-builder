import { TestBed } from "@angular/core/testing";

import { HttpService } from "./http.service";
import { MockHttpCache } from "./cache/http-cache.mock.spec";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/http/http.service.spec.ts
 */
describe("HttpService", () => {
  let service: HttpService;
  let getReqSpy: jasmine.Spy;
  let cacheGetSpy: jasmine.Spy;

  beforeEach(async () => {
    // Force allow respy
    jasmine.getEnv().allowRespy(true);

    // Use a mock fetch so ky's afterResponse hooks will still fire
    // Mock BEFORE service is injected so ky captures the spy
    getReqSpy = spyOn(window, "fetch").and.callFake(() => {
      const response = new Response("network", {
        status: 200,
        headers: { "content-type": "text/plain" },
      });
      return Promise.resolve(response);
    }) as any;

    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpService);

    // use mock in-memory cache adapter and spy on requests
    const mockCache = new MockHttpCache();
    spyOn(service, "createCache" as any).and.callFake(() => mockCache);
    cacheGetSpy = spyOn(mockCache, "get").and.callThrough();

    // Re-initialize client to use the mocked fetch
    // @ts-ignore
    service["client"] = service["getClient"]();
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
    await service.get("https://example.com", {
      strategy: "cache-only",
      cacheName: "mock",
    });
    expect(Object.keys(service["cacheNamespaces"])).toEqual(["cache", "mock"]);
  });

  it("uses normalized url for cache keys", async () => {
    // prefixed with method and trailing slash removed
    await service.get("https://example.com/", { strategy: "cache-only" });
    const [cacheKey] = cacheGetSpy.calls.mostRecent().args;
    expect(cacheKey).toEqual("GET|https://example.com");

    // query params preserved
    await service.get("https://example.com?search=test", {
      strategy: "cache-only",
    });
    const [cacheKey2] = cacheGetSpy.calls.mostRecent().args;
    expect(cacheKey2).toEqual("GET|https://example.com?search=test");
  });

  it("populates cache headers", async () => {
    await service.get("https://example.com");
    const [url, init] = getReqSpy.calls.first().args;
    const headers = new Headers(init.headers);
    const expiryHeader = headers.get("x-cache-expiry");
    expect(expiryHeader).toBeTruthy();
    expect(Number(expiryHeader)).toBeGreaterThan(new Date().getTime());
  });

  // Should convert '1m' expiry to ms and calculate expiry as epoch time diff from now
  it("populates custom cache-expiry header", async () => {
    const reqTimeStamp = new Date().getTime();
    await service.get("https://example.com", { cacheExpiry: "1m" });
    const [url, init] = getReqSpy.calls.first().args;
    const headers = new Headers(init.headers);
    const expiryHeader = headers.get("x-cache-expiry");
    const expiryTimeDiff = Number(expiryHeader) - reqTimeStamp;
    // Should set expiry 1 minute from time of request (60,000 ms)
    expect(expiryTimeDiff).toBeGreaterThanOrEqual(60000);
    expect(expiryTimeDiff).toBeLessThanOrEqual(61000);
  });

  it("cache-only strategy", async () => {
    const res = await service.get("https://mock.string", {
      strategy: "cache-only",
    });
    const sourceHeader = res.headers.get("x-res-source");
    expect(sourceHeader).toEqual("cache");
  });

  it("cache-first strategy", async () => {
    // First call: cache miss, hit network
    await service.get("https://example.com/cf", { strategy: "cache-first" });
    expect(getReqSpy).toHaveBeenCalledTimes(1);

    // Wait for async cache update (setTimeout in service)
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Second call: cache hit, bypass network
    getReqSpy.calls.reset();
    const res = await service.get("https://example.com/cf", {
      strategy: "cache-first",
    });
    expect(getReqSpy).not.toHaveBeenCalled();
    expect(res.headers.get("x-res-source")).toBe("cache");
  });

  it("network-first strategy", async () => {
    // 1. Successful network request
    const res = await service.get("https://example.com/nf", {
      strategy: "network-first",
    });
    expect(getReqSpy).toHaveBeenCalledTimes(1);
    expect(res.headers.get("x-res-source")).not.toBe("cache");

    // Wait for async cache update (setTimeout in service)
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 2. Failed network request (e.g. 500) -> returns from cache
    getReqSpy.and.returnValue(Promise.resolve(new Response("cached", { status: 500 })));
    const res2 = await service.get("https://example.com/nf", {
      strategy: "network-first",
    });
    expect(res2.status).toBe(200);
    expect(res2.headers.get("x-res-source")).toBe("cache");
  });

  it("network-only strategy", async () => {
    await service.get("https://example.com/no", { strategy: "network-only" });
    await service.get("https://example.com/no", { strategy: "network-only" });
    // Should call network twice even though it was cached after the first call
    expect(getReqSpy).toHaveBeenCalledTimes(2);
  });

  it("expires cached items", async () => {
    const url = "https://example.com/expire";
    // Set item with very short expiry
    await service.get(url, { cacheExpiry: "1ms" });

    // Wait for cache update
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Wait for expiry
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Should miss cache because it's expired, and hit network again
    getReqSpy.calls.reset();
    await service.get(url, { strategy: "cache-first" });

    expect(getReqSpy).toHaveBeenCalled();
  });

  describe("getMediaSrc", () => {
    it("should return object with src and revoke callback", async () => {
      const media = await service.getMediaSrc("https://example.com/image.png");

      // Since it's our mock cache, the src should equal the mock adapter's output
      expect(media.src).toBeTruthy();
      expect(typeof media.revoke).toBe("function");
    });

    it("should default cache strategy and cache item before returning", async () => {
      // Mock the cache's getUrl to simulate a hit
      const cache = service["cacheNamespaces"]["cache"] || (await service["getCache"]("cache"));
      spyOn(cache, "getUrl").and.returnValue(Promise.resolve("mock-url"));
      const media = await service.getMediaSrc("https://example.com/asset.mp4");

      expect(getReqSpy).toHaveBeenCalled();
      expect(media.src).toEqual("mock-url");
    });
  });

  it("retries failed downloads", async () => {
    await service.get("https://example.com/retry");
    // With fetch mock, we check that fetch was called multiple times if we returned error
    getReqSpy.calls.reset();
    getReqSpy.and.returnValue(Promise.resolve(new Response("", { status: 500 })));

    try {
      await service.get("https://example.com/retry", { retry: 1 });
    } catch (e) {
      // ky throws on 500
    }

    // 1 initial + 1 retry = 2 calls
    expect(getReqSpy).toHaveBeenCalledTimes(2);
  });
});
