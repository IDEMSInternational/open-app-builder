import { KyRequest, KyResponse } from "ky";
import { HttpCacheAdapterMemory } from "./adapters/memory.adapter";
import { IHttpCacheAdapter } from "./adapters/types";
import { Capacitor } from "@capacitor/core";
import { HttpCacheAdapterFile } from "./adapters/file.adapter";
import { HTTPCacheAdapterOPFS } from "./adapters/opfs.adapter";
import { generateRequestKey } from "../http.utils";

/**
 * ...
 */
export class HttpCache {
  /** Layer-1 cache that keeps in-memory */
  private memoryCache = new HttpCacheAdapterMemory();

  /** Layer-2 cache that persists to storage */
  private storageCache?: IHttpCacheAdapter;

  constructor(storageCache?: IHttpCacheAdapter) {
    this.storageCache = storageCache;
  }

  /**
   * Determine which storage adapter is optimal based on current environment (e.g. browser/native)
   * Specific storage compatibility checks can be tested via:
   * https://byojs.dev/storage/
   */
  private async createStorageAdapter(): Promise<IHttpCacheAdapter> {
    if (Capacitor.isNativePlatform()) {
      return new HttpCacheAdapterFile();
    }
    // TODO - disable on ios browser (detect), as writes only supported in worker threads
    // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream/write#browser_compatibility
    // https://webkit.org/blog/12257/the-file-system-access-api-with-origin-private-file-system/
    if ("storage" in navigator) {
      try {
        // TODO - subfolder name depending on deployment?
        const opfsRoot = await navigator.storage.getDirectory();
        console.log("opfsRoot", opfsRoot);
        const directoryHandle = await opfsRoot.getDirectoryHandle("TODO_Deployment_Name", {
          create: true,
        });

        return new HTTPCacheAdapterOPFS(directoryHandle);
      } catch (error) {
        console.error("Failed to setup opfs storage", error);
      }
    }

    return new HttpCacheAdapterMemory();
  }

  /** Layer-2 cache for platform storage implementation */

  public async init() {
    // auto-select best storage adapter if not specified
    this.storageCache ??= await this.createStorageAdapter();

    const keys = await this.storageCache.list();
    console.log("storage cache keys", keys);
    for (const key of keys) {
      // keep reference to
      this.memoryCache.set(key, undefined);
    }
  }

  public async has(req: KyRequest) {
    const key = generateRequestKey(req);
    // TODO - possibly private method and just use get
    return this.memoryCache.has(key);
  }

  public async get(req: KyRequest) {
    const key = generateRequestKey(req);
    const cachedValue = await this.memoryCache.get(key);
    console.log("get", { key, cachedValue });
    if (cachedValue) {
      return cachedValue;
    }
    // cached value exists, but has not been stored in memory
    // (either file too large or first retrieval)
    return this.storageCache.get(key);
  }

  public async stream(req) {
    // TODO - stream req to file? ... or more like a pipe op
  }

  public async set(req: KyRequest, res: KyResponse) {
    // TODO - consider other cacheable response validation, e.g.
    // https://github.com/kornelski/http-cache-semantics
    if (res.status === 200) {
      const contentType = res.headers.get("content-type");
      // TODO - use expiry header
      if (contentType === "application/json") {
        // TODO - serialisation? or just body
      }
      // TODO - consider streamed/piped reads
      // res.body.getReader()

      const key = generateRequestKey(req);

      // // TODO - serialisation
      // await this.storageCache.set(key, value);
      // // TODO - determine when/if to set to memory
      // // Do not await, prefer to eagerly return
      // this.memoryCache.set(key, value);
      // return;
    }
  }

  public async clear() {
    await this.storageCache.clear();
    await this.memoryCache.clear();
  }

  public async delete(req: KyRequest) {
    const key = generateRequestKey(req);
    const deleteRes = await this.storageCache.delete(key);
    if (deleteRes === true) {
      await this.memoryCache.delete(key);
    }
    return deleteRes;
  }
}

/**
 *
 * TODO
 * - valid response caching
 * - storing expiry and such
 * - storing blobs (native and browser)
 *
 * Review how cacheable-request encodes....
 */

// https://github.dev/nigrosimone/ng-http-caching/blob/c3c1b00cac4f9e88cdcbd68c70031995790c202e/projects/ng-http-caching/src/lib/ng-http-caching.service.ts
// return req.method + '@' + req.urlWithParams;?
//
// https://github.dev/ngneat/cashew/blob/b357c0da0b9ee697f5ce7cac24dc90c7d54b9061/projects/ngneat/cashew/src/lib/key-serializer.ts
// request.urlWithParams
