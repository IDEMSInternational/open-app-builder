import { IHttpCacheAdapter } from "./types";

/**
 * In-memory LRU cache for Blob responses.
 * Evicts least recently used items when maxCacheSize is exceeded.
 */
export class HttpCacheAdapterMemory implements IHttpCacheAdapter {
  private map = new Map<string, Blob>();
  private cacheSize = 0; // in bytes

  constructor(private maxCacheSize = 50 * 1024 * 1024) {} // default: 50MB

  public async list() {
    return [...this.map.keys()];
  }

  public async get(key: string) {
    if (!this.map.has(key)) return undefined;
    // LRU: move key to end
    const value = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  public async set(key: string, value: Blob) {
    // If key exists, remove it first (to update size and LRU order)
    if (this.map.has(key)) {
      const oldBlob = this.map.get(key)!;
      this.cacheSize -= oldBlob.size;
      this.map.delete(key);
    }

    // Evict LRU items until there's enough space
    while (this.cacheSize + value.size > this.maxCacheSize && this.map.size > 0) {
      // LRU: first key in Map
      const lruKey = this.map.keys().next().value;
      const lruBlob = this.map.get(lruKey)!;
      this.cacheSize -= lruBlob.size;
      this.map.delete(lruKey);
    }

    this.map.set(key, value);
    this.cacheSize += value.size;
  }

  public async clear() {
    this.cacheSize = 0;
    this.map.clear();
  }

  public async delete(key: string) {
    if (this.map.has(key)) {
      const blob = this.map.get(key)!;
      this.cacheSize -= blob.size;
      this.map.delete(key);
      return true;
    }
    return false;
  }

  public async has(key: string) {
    return this.map.has(key);
  }

  /** Returns current cache size in bytes */
  public getCurrentCacheSize() {
    return this.cacheSize;
  }
}
