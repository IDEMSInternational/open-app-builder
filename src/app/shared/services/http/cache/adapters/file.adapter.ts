import { IHttpCacheAdapter } from "./types";

/**
 *
 *
 * TODO
 * - Consider blob-writer
 * https://github.com/diachedelic/capacitor-blob-writer
 * - Consider file-chunk adaptor for streamed writes
 * https://www.npmjs.com/package/capacitor-file-chunk
 */
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
    return new Blob();
  }
  public async set(key: string, value: Blob) {
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
