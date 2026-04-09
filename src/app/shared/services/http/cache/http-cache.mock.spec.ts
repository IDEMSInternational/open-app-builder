import { IHttpCacheAdapter } from "./adapters/types";
import { HttpCache } from "./http-cache";

export class MockHttpCacheAdapter implements IHttpCacheAdapter {
  private storage = new Map<string, Blob>();
  public async list() {
    return Array.from(this.storage.keys());
  }
  public async get(key: string) {
    return this.storage.get(key);
  }
  public async getUrl(key: string) {
    return this.storage.has(key) ? `mock-url-${key}` : undefined;
  }
  public async set(key: string, data: Blob) {
    this.storage.set(key, data);
  }
  public async has(key: string) {
    return this.storage.has(key);
  }
  public async clear() {
    this.storage.clear();
  }
  public async delete(key: string) {
    return this.storage.delete(key);
  }
}

/**
 * Extend the HttpCache by replacing native Layer-2 storage cache with in-memory mock
 */
export class MockHttpCache extends HttpCache {
  constructor() {
    super("mockCache", new MockHttpCacheAdapter());
  }
}
