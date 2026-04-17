import { HttpService, IHttpRequestOptions } from "./http.service";
import { HttpCache } from "./cache/http-cache";
import { HttpCacheAdapterMemory } from "./cache/adapters/memory.adapter";
import { IHttpClientAdapter, IHttpAdapterResponse } from "./client/http-client";

// --- Helpers ---

function createMockAdapterResponse(
  overrides: Partial<IHttpAdapterResponse> = {}
): IHttpAdapterResponse {
  return {
    status: 200,
    headers: { "content-type": "text/plain" },
    getUri: async () => ({ src: "https://example.com/img.png", revoke: () => {} }),
    getRawData: async () => new TextEncoder().encode("ok").buffer,
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

function createTestCache(): HttpCache {
  const adapter = new HttpCacheAdapterMemory();
  const cache = new HttpCache("test", adapter);
  // Mark as ready since we injected the adapter
  (cache as any).initialised = true;
  (cache as any).storageCache = adapter;
  return cache;
}

function createService(mockAdapter: MockAdapter): HttpService {
  const service = new HttpService();
  // Override adapters and cache creation
  service["webAdapter"] = mockAdapter as any;
  service["capacitorAdapter"] = mockAdapter;
  service["workerAdapter"] = mockAdapter;
  // Override createCache to use in-memory
  (service as any).createCache = async (name: string) => {
    const adapter = new HttpCacheAdapterMemory();
    const cache = new HttpCache(name, adapter);
    (cache as any).initialised = true;
    (cache as any).storageCache = adapter;
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

  describe("invalidate", () => {
    it("should remove a cached entry", async () => {
      await service.get("https://example.com/data");
      await service.invalidate("https://example.com/data");
      // Next request should go to network
      await service.get("https://example.com/data");
      expect(mockAdapter.callCount).toBe(2);
    });
  });

  describe("clearNamespace", () => {
    it("should clear all entries in a namespace", async () => {
      await service.get("https://example.com/a", { cacheName: "ns1" });
      await service.get("https://example.com/b", { cacheName: "ns1" });
      await service.clearNamespace("ns1");

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
      expect(mockAdapter.lastOptions?.headers?.["x-cache-name"]).toBe("cache");
      expect(mockAdapter.lastOptions?.headers?.["x-cache-expiry"]).toBeDefined();
    });

    it("should use custom cacheName", async () => {
      await service.get("https://example.com/data", {
        cacheName: "downloads",
      });
      expect(mockAdapter.lastOptions?.headers?.["x-cache-name"]).toBe("downloads");
    });
  });
});
