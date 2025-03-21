import { KyRequest, KyResponse } from "ky";

/**
 * https://byojs.dev/storage/
 */

import { HttpCacheAdapterMemory } from "./cache-adapters/memory.adapter";
import { IHttpCacheAdapter } from "./cache-adapters/types";
import { Capacitor } from "@capacitor/core";
import { HttpCacheAdapterFile } from "./cache-adapters/file.adapter";
import { HTTPCacheAdapterOPFS } from "./cache-adapters/opfs.adapter";

// TODO - want to keep L1 and L2 for all adapters
// NOT extending base, but replacing l2

/**
 *
 */
export class HttpCache {
  /** Layer-1 cache that keeps in-memory */
  private memoryCache = new HttpCacheAdapterMemory();

  private storageCache: IHttpCacheAdapter;

  /**
   * Determine which storage adapter is optimal based on current environment (e.g. browser/native)
   * Specific storage compatibility checks can be tested via:
   * https://byojs.dev/storage/
   */
  private async setupStorageAdapter(): Promise<IHttpCacheAdapter> {
    if (Capacitor.isNativePlatform) {
      return new HttpCacheAdapterFile();
    }
    if ("storage" in navigator) {
      // TODO - allow to function async
      console.log("navigator storage");
      try {
        // TODO - subfolder name depending on deployment?
        const opfsRoot = await navigator.storage.getDirectory();
        const directoryHandle = await opfsRoot.getDirectoryHandle("my first folder", {
          create: true,
        });
        // TODO - write method may not be supported in safari
        // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream/write#browser_compatibility
        return new HTTPCacheAdapterOPFS(directoryHandle);
      } catch (error) {}
    }

    // TODO - opfs support - considering ios limitations
    return new HttpCacheAdapterMemory();
  }

  //   TODO - split memory and base adapter...
  /** Layer-2 cache for platform storage implementation */

  public async init() {
    this.storageCache = await this.setupStorageAdapter();

    const keys = await this.storageCache.list();
    for (const key of keys) {
      // keep reference to
      this.memoryCache.set(key, undefined);
    }
  }

  public has(req: KyRequest) {
    const key = this.generateRequestKey(req);
    // TODO - possibly private method and just use get
    return this.memoryCache.has(key);
  }

  public async get(req: KyRequest) {
    const key = this.generateRequestKey(req);
    const cachedValue = await this.memoryCache.get(key);
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

      const key = this.generateRequestKey(req);

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
    const key = this.generateRequestKey(req);
    const deleteRes = await this.storageCache.delete(key);
    if (deleteRes === true) {
      await this.memoryCache.delete(key);
    }
    return deleteRes;
  }

  /**
   * Create an id representing request
   * Simply returns a combination of the method and url
   *
   * This could be enhanced in the future by providing url normalization, e.g.
   * https://github.com/jaredwray/cacheable/blob/main/packages/cacheable-request/src/index.ts#L67
   *
   */
  private generateRequestKey(req: KyRequest) {
    // TODO ensure params are cached
    return `[${req.method}]${req.url}`;
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
