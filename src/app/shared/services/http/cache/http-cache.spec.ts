import { MockHttpCache } from "./http-cache.mock.spec";

describe("HttpCache", () => {
  let cache: MockHttpCache;

  beforeEach(async () => {
    cache = new MockHttpCache();
    await cache.ready();
  });

  it("should generate a consistent hash for the same URL", async () => {
    const url = "https://example.com/api";
    // We can't easily predict the SHA-1 hash without running it,
    // but we can check if it's consistent.
    // In MockHttpCacheAdapter, it uses the key directly if we don't mock hashUrl,
    // but HttpCache.ts calls hashUrl(key) before passing to adapter.

    await cache.set(url, new Response("data", { status: 200 }));
    expect(await cache.has(url)).toBeTrue();
  });

  it("should store and retrieve data and metadata", async () => {
    const url = "https://example.com/test";
    const status = 200;
    const contentType = "text/plain";
    const body = "hello world";
    const expiry = Date.now() + 10000;

    const res = new Response(body, {
      status,
      headers: { "content-type": contentType },
    });

    await cache.set(url, res, expiry);

    const cachedBlob = await cache.get(url);
    expect(cachedBlob).toBeTruthy();
    expect(await cachedBlob!.text()).toBe(body);

    const entry = await cache.getEntry(url);
    expect(entry).toBeTruthy();
    expect(entry!.status).toBe(status);
    expect(entry!.contentType).toBe(contentType);
    expect(entry!.expiry).toBe(expiry);
  });

  it("should return undefined for non-existent keys", async () => {
    const url = "https://example.com/missing";
    expect(await cache.get(url)).toBeUndefined();
    expect(await cache.getEntry(url)).toBeUndefined();
    expect(await cache.has(url)).toBeFalse();
  });

  it("should delete entry and data", async () => {
    const url = "https://example.com/delete-me";
    await cache.set(url, new Response("data"));
    expect(await cache.has(url)).toBeTrue();

    await cache.delete(url);
    expect(await cache.has(url)).toBeFalse();
    expect(await cache.get(url)).toBeUndefined();
    expect(await cache.getEntry(url)).toBeUndefined();
  });

  it("should clear the entire cache", async () => {
    await cache.set("url1", new Response("data1"));
    await cache.set("url2", new Response("data2"));

    expect(await cache.has("url1")).toBeTrue();
    expect(await cache.has("url2")).toBeTrue();

    await cache.clear();

    expect(await cache.has("url1")).toBeFalse();
    expect(await cache.has("url2")).toBeFalse();
  });

  it("should support getUrl", async () => {
    const url = "https://example.com/media";
    await cache.set(url, new Response("media-data"));

    const src = await cache.getUrl(url);
    expect(src).toContain("mock-url-");
  });
});
