import { IHttpCacheAdapter } from "./types";

/** Simple adapter that stores all key-value pairs in an in-memory map opbject */
export class HttpCacheAdapterMemory implements IHttpCacheAdapter {
  private map = new Map();
  public async list() {
    return [...this.map.keys()];
  }
  public async get(key: string) {
    return this.map.get(key);
  }
  public async set(key: string, value: any) {
    return this.map.set(key, value);
  }
  public async clear() {
    return this.map.clear();
  }
  public async delete(key: string) {
    return this.map.delete(key);
  }
}
