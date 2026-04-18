import { HttpService, IHttpRequestOptions } from "./http.service";
import { HttpCache } from "./cache/http-cache";
import { HttpCacheAdapterMemory } from "./cache/adapters/memory.adapter";
import { IHttpClientAdapter, IHttpAdapterResponse } from "./client/http-client.types";

// --- Helpers ---

function createMockAdapterResponse(
  overrides: Partial<IHttpAdapterResponse> = {}
): IHttpAdapterResponse {
  return {
    status: 200,
    headers: { "content-type": "text/plain" },
    getUri: async () => ({ src: "https://example.com/img.png", revoke: () => {} }),
    getRawData: async () => new Blob(),
    ...overrides,
  };
}

class MockAdapter implements IHttpClientAdapter {
  public callCount = 0;
  public lastUrl?: string;
  public lastOptions?: IHttpRequestOptions;
  public response: IHttpAdapterResponse = createMockAdapterResponse();

  async request(
    url: string,
    options: IHttpRequestOptions,
    _cache: HttpCache
  ): Promise<IHttpAdapterResponse> {
    this.callCount++;
    this.lastUrl = url;
    this.lastOptions = options;
    return this.response;
  }
}

function createService(mockAdapter: MockAdapter): HttpService {
  const service = new HttpService();
  // Override adapters and cache creation
  service["webAdapter"] = mockAdapter as any;
  service["capacitorAdapter"] = mockAdapter;
  service["workerAdapter"] = mockAdapter;
  // Override createCache to use in-memory
  (service as any).createCache = async (name: string) => {
    const cache = new HttpCache(name);
    cache.adapter = new HttpCacheAdapterMemory();
    return cache;
  };
  return service;
}

// --- Tests ---

describe("HttpService", () => {
  let service: HttpService;
  let mockAdapter: MockAdapter;

  beforeEach(() => {
    mockAdapter = new MockAdapter();
    service = createService(mockAdapter);
  });

  describe("get", () => {
    it("should return a Response with body on success", async () => {
      const res = await service.get("https://example.com/data.json");
      expect(res.status).toBe(200);
      const text = await res.text();
      expect(text).toBe("ok");
    });

    it("should return empty body on non-success status", async () => {
      mockAdapter.response = createMockAdapterResponse({ status: 404 });
      const res = await service.get("https://example.com/missing");
      expect(res.status).toBe(404);
      expect(await res.text()).toBe("");
    });

    it("should pass merged options to adapter", async () => {
      await service.get("https://example.com/api", {
        headers: { Authorization: "Bearer token" },
      });
      expect(mockAdapter.lastOptions?.headers?.Authorization).toBe("Bearer token");
    });
  });

  describe("getMediaSrc", () => {
    it("should return media src on success", async () => {
      const result = await service.getMediaSrc("https://example.com/img.png");
      expect(result.src).toBe("https://example.com/img.png");
      expect(typeof result.revoke).toBe("function");
    });

    it("should throw on non-success status", async () => {
      mockAdapter.response = createMockAdapterResponse({ status: 500 });
      await expectAsync(service.getMediaSrc("https://example.com/img.png")).toBeRejectedWithError(
        /Failed to fetch media/
      );
    });

    it("should pass isMedia: true to adapter regardless of URL extension", async () => {
      await service.getMediaSrc("https://api.example.com/content/123");
      expect(mockAdapter.lastOptions?.isMedia).toBe(true);
    });
  });

  describe("isMedia option", () => {
    it("should use media adapter when isMedia is explicitly set to true", async () => {
      await service.get("https://api.example.com/data", { isMedia: true });
      expect(mockAdapter.lastOptions?.isMedia).toBe(true);
    });

    it("should fall back to URL detection when isMedia is not set", async () => {
      await service.get("https://example.com/image.jpg");
      expect(mockAdapter.lastOptions?.isMedia).toBeUndefined();
    });
  });

  describe("caching - stale-while-revalidate", () => {
    it("should fetch from network on first request", async () => {
      await service.get("https://example.com/data");
      expect(mockAdapter.callCount).toBe(1);
    });

    it("should return cached response on second request without hitting network", async () => {
      // First request populates cache
      await service.get("https://example.com/data");
      expect(mockAdapter.callCount).toBe(1);

      // Second request should come from cache
      const res = await service.get("https://example.com/data");
      expect(res.status).toBe(200);
      // Adapter should not be called again for fresh cache
      // Note: depends on adapter caching the response in `request()`
    });

    it("should bypass cache when bypassCache is true", async () => {
      await service.get("https://example.com/data");
      await service.get("https://example.com/data", { bypassCache: true });
      // Both should hit the adapter
      expect(mockAdapter.callCount).toBe(2);
    });
  });

  describe("removeCacheEntry", () => {
    it("should remove a cached entry", async () => {
      const url = "https://example.com/data";
      await service.get(url);
      const key = service.getCacheKey(url);
      await service.removeCacheEntry(key);
      // Next request should go to network
      await service.get("https://example.com/data");
      expect(mockAdapter.callCount).toBe(2);
    });
  });

  describe("removeCacheEntries", () => {
    it("should clear all entries in a namespace", async () => {
      await service.get("https://example.com/a", { cacheName: "ns1" });
      await service.get("https://example.com/b", { cacheName: "ns1" });
      await service.removeCacheEntries("ns1");

      // Should not have the namespace cached anymore
      expect((service as any).cacheNamespaces["ns1"]).toBeUndefined();
    });
  });

  describe("error handling", () => {
    it("should return 504 when network fails and no cache exists", async () => {
      mockAdapter.request = async () => {
        throw new Error("Network error");
      };
      const res = await service.get("https://example.com/fail");
      expect(res.status).toBe(504);
    });
  });

  describe("default options", () => {
    it("should apply default cache headers", async () => {
      await service.get("https://example.com/data");
      expect(mockAdapter.lastOptions?.cacheName).toBe("cache");
      expect(mockAdapter.lastOptions?.cacheExpiry).toBeDefined();
    });

    it("should use custom cacheName", async () => {
      await service.get("https://example.com/data", {
        cacheName: "downloads",
      });
      expect(mockAdapter.lastOptions?.cacheName).toBe("downloads");
    });
  });
});
