import { IHttpCacheAdapter } from "./types";

/** Simple adapter that stores all key-value pairs in an in-memory map opbject */
export class HttpCacheAdapterFile implements IHttpCacheAdapter {
  public async list() {
    // TODO
    return [];
  }
  public async has(key: string) {
    // TODO
    return;
  }
  public async get(key: string) {
    // TODO
    return;
  }
  public async set(key: string, value: any) {
    // TODO
    return;
  }
  public async clear() {
    // TODO
    return;
  }
  public async delete(key: string) {
    // TODO
    return true;
  }
}
