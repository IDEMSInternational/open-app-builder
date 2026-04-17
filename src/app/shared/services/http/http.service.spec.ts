import { TestBed } from "@angular/core/testing";

import { HttpService } from "./http.service";
import { HttpCache } from "./cache/http-cache";
import { HttpCacheAdapterMemory } from "./cache/adapters/memory.adapter";
import { IHttpAdapterResponse } from "./client/http-client";
import { generateRequestKey } from "./http.utils";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/http/http.service.spec.ts
 */
describe("HttpService", () => {
  let service: HttpService;
  let mockCache: HttpCache;
  let webAdapterSpy: jasmine.Spy;
  let workerAdapterSpy: jasmine.Spy;
  let capacitorAdapterSpy: jasmine.Spy;
  let cacheGetSpy: jasmine.Spy;

  const createSuccessResponse = (
    body = "network-data",
    cache?: HttpCache
  ): ((url: string, opts: any, c: HttpCache) => Promise<IHttpAdapterResponse>) => {
    let callCount = 0;
    return async (url, opts, c) => {
      callCount++;
      const targetCache = cache || c;
      const key = generateRequestKey({ url, method: "get" });
      const blob = new Blob([`${body}-${callCount}`], {
        type: "text/plain",
      });

      // Simulate adapter writing to cache
      const expiry = opts?.headers?.["x-cache-expiry"]
        ? Number(opts.headers["x-cache-expiry"])
        : undefined;
      await targetCache.set(key, blob, {
        expiry: expiry ? Date.now() + expiry : undefined,
        headers: { "content-type": "text/plain" },
      });

      return {
        status: 200,
        headers: { "content-type": "text/plain", "x-res-source": "network" },
        getUri: async () => {
          const src = URL.createObjectURL(blob);
          return { src, revoke: () => URL.revokeObjectURL(src) };
        },
        getRawData: async () => blob.arrayBuffer(),
      };
    };
  };

  const createErrorResponse = (status = 500): (() => Promise<IHttpAdapterResponse>) => {
    return async () => ({
      status,
      headers: {},
      getUri: async () => ({ src: "", revoke: () => {} }),
      getRawData: async () => new ArrayBuffer(0),
    });
  };

  beforeEach(async () => {
    jasmine.getEnv().allowRespy(true);

    mockCache = new HttpCache("mockCache", new HttpCacheAdapterMemory());
    await mockCache.ready();
    cacheGetSpy = spyOn(mockCache, "get").and.callThrough();

    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpService);

    // Intercept cache creation to use in-memory cache
    spyOn(service as any, "createCache").and.callFake(() => mockCache);

    // Spy on all adapters
    webAdapterSpy = spyOn(service["webAdapter"], "request").and.callFake(
      createSuccessResponse("web", mockCache)
    );

    workerAdapterSpy = spyOn(service["workerAdapter"], "request").and.callFake(
      createSuccessResponse("worker", mockCache)
    );

    capacitorAdapterSpy = spyOn(service["capacitorAdapter"], "request").and.callFake(
      createSuccessResponse("capacitor", mockCache)
    );
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  // ─── Adapter Routing ───────────────────────────────────────────────

  it("routes non-media URLs to web adapter", async () => {
    await service.get("https://example.com/api/data");
    expect(webAdapterSpy).toHaveBeenCalledTimes(1);
    expect(workerAdapterSpy).not.toHaveBeenCalled();
  });

  it("routes image URLs to worker adapter", async () => {
    await service.get("https://example.com/photo.jpg");
    expect(workerAdapterSpy).toHaveBeenCalledTimes(1);
    expect(webAdapterSpy).not.toHaveBeenCalled();
  });

  it("routes video URLs to worker adapter", async () => {
    await service.get("https://example.com/video.mp4");
    expect(workerAdapterSpy).toHaveBeenCalledTimes(1);
  });

  it("routes audio URLs to worker adapter", async () => {
    await service.get("https://example.com/audio.mp3");
    expect(workerAdapterSpy).toHaveBeenCalledTimes(1);
  });

  it("routes PDF URLs to worker adapter", async () => {
    await service.get("https://example.com/doc.pdf");
    expect(workerAdapterSpy).toHaveBeenCalledTimes(1);
  });

  // ─── Cache Namespace ───────────────────────────────────────────────

  it("uses default cache namespace", async () => {
    await service.get("https://example.com", { strategy: "cache-only" });
    expect(Object.keys(service["cacheNamespaces"])).toEqual(["cache"]);
    expect(cacheGetSpy).toHaveBeenCalledTimes(1);
  });

  it("supports multiple named cache namespaces", async () => {
    await service.get("https://example.com", { strategy: "cache-first" });
    await service.get("https://example.com", {
      strategy: "cache-first",
      cacheName: "downloads",
    });
    expect(Object.keys(service["cacheNamespaces"])).toContain("cache");
    expect(Object.keys(service["cacheNamespaces"])).toContain("downloads");
  });

  // ─── Cache Key Normalization ───────────────────────────────────────

  it("uses normalized url for cache keys (trailing slash removed)", async () => {
    await service.get("https://example.com/", { strategy: "cache-only" });
    const [cacheKey] = cacheGetSpy.calls.mostRecent().args;
    expect(cacheKey).toEqual("GET|https://example.com");
  });

  it("preserves query params in cache keys", async () => {
    await service.get("https://example.com?search=test", {
      strategy: "cache-only",
    });
    const [cacheKey] = cacheGetSpy.calls.mostRecent().args;
    expect(cacheKey).toEqual("GET|https://example.com?search=test");
  });

  // ─── Headers Passed to Adapter ─────────────────────────────────────

  it("passes cache expiry header to adapter", async () => {
    await service.get("https://example.com/api", { cacheExpiry: "1m" });
    const [, opts] = webAdapterSpy.calls.first().args;
    expect(opts.headers["x-cache-expiry"]).toBe("60000");
  });

  it("passes cache name header to adapter", async () => {
    await service.get("https://example.com/api", { cacheName: "assets" });
    const [, opts] = webAdapterSpy.calls.first().args;
    expect(opts.headers["x-cache-name"]).toBe("assets");
  });

  it("passes default 30d cache expiry header", async () => {
    await service.get("https://example.com/api");
    const [, opts] = webAdapterSpy.calls.first().args;
    // 30 days = 30 * 86400000 = 2592000000
    expect(opts.headers["x-cache-expiry"]).toBe("2592000000");
  });

  // ─── Strategies ────────────────────────────────────────────────────

  it("cache-only strategy returns from cache without network call", async () => {
    const res = await service.get("https://example.com/co", {
      strategy: "cache-only",
    });
    expect(webAdapterSpy).not.toHaveBeenCalled();
    expect(workerAdapterSpy).not.toHaveBeenCalled();
    expect(res.headers.get("x-res-source")).toEqual("cache");
  });

  it("cache-only strategy returns 404 when nothing cached", async () => {
    const res = await service.get("https://example.com/missing", {
      strategy: "cache-only",
    });
    expect(res.status).toBe(404);
  });

  it("cache-first strategy hits network on cache miss", async () => {
    await service.get("https://example.com/cf", { strategy: "cache-first" });
    expect(webAdapterSpy).toHaveBeenCalledTimes(1);
  });

  it("cache-first strategy returns cached response on second call", async () => {
    // First call: cache miss -> network
    await service.get("https://example.com/cf", { strategy: "cache-first" });
    expect(webAdapterSpy).toHaveBeenCalledTimes(1);

    // Second call: cache hit -> no network
    webAdapterSpy.calls.reset();
    const res = await service.get("https://example.com/cf", {
      strategy: "cache-first",
    });
    expect(webAdapterSpy).not.toHaveBeenCalled();
    expect(res.headers.get("x-res-source")).toBe("cache");
  });

  it("network-first strategy calls network", async () => {
    const res = await service.get("https://example.com/nf", {
      strategy: "network-first",
    });
    expect(webAdapterSpy).toHaveBeenCalledTimes(1);
    expect(res.headers.get("x-res-source")).not.toBe("cache");
  });

  it("network-first strategy falls back to cache on network failure", async () => {
    // Seed the cache
    await service.get("https://example.com/nf", {
      strategy: "network-first",
    });
    expect(webAdapterSpy).toHaveBeenCalledTimes(1);

    // Now make network fail
    webAdapterSpy.and.callFake(createErrorResponse(500));
    const res = await service.get("https://example.com/nf", {
      strategy: "network-first",
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("x-res-source")).toBe("cache");
  });

  it("network-first strategy falls back to cache on network exception", async () => {
    // Seed the cache
    await service.get("https://example.com/nfe", {
      strategy: "network-first",
    });

    // Now make network throw
    webAdapterSpy.and.rejectWith(new Error("Network error"));
    const res = await service.get("https://example.com/nfe", {
      strategy: "network-first",
    });
    expect(res.status).toBe(200);
    expect(res.headers.get("x-res-source")).toBe("cache");
  });

  it("unknown strategy defaults to cache-first", async () => {
    const url = "https://example.com/unknown";
    // @ts-ignore - testing runtime fallback for unknown strategy cast
    await service.get(url, { strategy: "unsupported-strategy" });
    expect(webAdapterSpy).toHaveBeenCalledTimes(1);

    // Second call should hit cache if it defaulted to cache-first
    webAdapterSpy.calls.reset();
    const res = await service.get(url, { strategy: "cache-first" });
    expect(webAdapterSpy).not.toHaveBeenCalled();
    expect(res.headers.get("x-res-source")).toBe("cache");
  });

  // ─── Cache Expiry ──────────────────────────────────────────────────

  it("expires cached items", async () => {
    const url = "https://example.com/expire";

    // Seed cache with very short expiry
    await service.get(url, {
      strategy: "cache-first",
      cacheExpiry: "1ms",
    });
    expect(webAdapterSpy).toHaveBeenCalledTimes(1);

    // Wait for expiry
    await new Promise((resolve) => setTimeout(resolve, 20));

    // Should miss cache because expired -> network again
    webAdapterSpy.calls.reset();
    await service.get(url, { strategy: "cache-first" });
    expect(webAdapterSpy).toHaveBeenCalledTimes(1);
  });

  // ─── get() Response ────────────────────────────────────────────────

  it("returns a Response with body on success", async () => {
    const res = await service.get("https://example.com/api");
    expect(res.status).toBe(200);
    const text = await res.text();
    expect(text).toBeTruthy();
  });

  it("returns a Response with null body on non-success status", async () => {
    webAdapterSpy.and.callFake(createErrorResponse(404));
    const res = await service.get("https://example.com/missing");
    expect(res.status).toBe(404);
    const body = await res.text();
    expect(body).toBe("");
  });

  // ─── getMediaSrc ──────────────────────────────────────────────────

  describe("getMediaSrc", () => {
    it("returns object with src and revoke callback", async () => {
      const media = await service.getMediaSrc("https://example.com/image.png");
      expect(media.src).toBeTruthy();
      expect(typeof media.revoke).toBe("function");
    });

    it("returns blob URL for web platform", async () => {
      const media = await service.getMediaSrc("https://example.com/image.png");
      expect(media.src.startsWith("blob:")).toBeTrue();
    });

    it("throws on failed media fetch", async () => {
      workerAdapterSpy.and.callFake(createErrorResponse(404));
      await expectAsync(service.getMediaSrc("https://example.com/image.png")).toBeRejectedWithError(
        /HTTP 404/
      );
    });

    it("throws on 500 media fetch", async () => {
      workerAdapterSpy.and.callFake(createErrorResponse(500));
      await expectAsync(service.getMediaSrc("https://example.com/photo.jpg")).toBeRejectedWithError(
        /HTTP 500/
      );
    });

    it("uses cache-first strategy by default", async () => {
      // First call seeds cache
      await service.getMediaSrc("https://example.com/image.png");
      expect(workerAdapterSpy).toHaveBeenCalledTimes(1);

      // Second call should use cache
      workerAdapterSpy.calls.reset();
      const media = await service.getMediaSrc("https://example.com/image.png");
      expect(workerAdapterSpy).not.toHaveBeenCalled();
      expect(media.src).toBeTruthy();
    });

    it("revoke cleans up blob URL", async () => {
      const revokeSpy = spyOn(URL, "revokeObjectURL");
      const media = await service.getMediaSrc("https://example.com/image.png");
      media.revoke();
      if (media.src.startsWith("blob:")) {
        expect(revokeSpy).toHaveBeenCalledWith(media.src);
      }
    });
  });
});
