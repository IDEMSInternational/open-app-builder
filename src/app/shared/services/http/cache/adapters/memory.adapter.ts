import { IHttpCacheAdapter } from "./types";

/**
 * Ephemeral in-memory HTTP Cache adapter.
 * Used as a fallback when filesystem/OPFS persistence is unavailable.
 */
export class HttpCacheAdapterMemory implements IHttpCacheAdapter {
  private cache = new Map<string, Blob>();

  public async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }

  public async get(key: string): Promise<Blob | undefined> {
    return this.cache.get(key);
  }

  public async getUrl(key: string) {
    const file = await this.get(key);
    if (!file) return undefined;

    const src = URL.createObjectURL(file);
    return { src, revoke: () => URL.revokeObjectURL(src) };
  }

  public async set(key: string, value: Blob): Promise<true> {
    this.cache.set(key, value);
    return true;
  }

  public async delete(key: string): Promise<boolean> {
    return this.cache.delete(key);
  }

  public async list(): Promise<string[]> {
    return Array.from(this.cache.keys());
  }

  public async clear(): Promise<void> {
    this.cache.clear();
  }
}
