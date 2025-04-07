import { HttpCacheAdapterMemory } from "./adapters/memory.adapter";
import { IHttpCacheAdapter } from "./adapters/types";
import { Capacitor } from "@capacitor/core";
import { HttpCacheAdapterFile } from "./adapters/file.adapter";
import { HTTPCacheAdapterOPFS } from "./adapters/opfs.adapter";

interface IMemoryCacheEntry {
  storagePath: string;
  size: number;
  modified: string;
  expiry: number;
  data: any;
}

/**
 * ...
 * TODO (see end of page)
 *
 */
export class HttpCache {
  /**
   * Layer-1 cache that keeps in-memory
   * Also tracks storage metadata including
   * */
  private memoryCache = new HttpCacheAdapterMemory();

  /** Layer-2 cache that persists to storage */
  private storageCache?: IHttpCacheAdapter;

  private initialised = false;

  constructor(namespace: string, storageCache?: IHttpCacheAdapter) {
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

  public async ready() {
    if (this.initialised) return;

    // auto-select best storage adapter if not specified
    this.storageCache ??= await this.createStorageAdapter();

    // TODO - purge expired from cache (passed by parent?)
    // or maybe _metadata object stored in cache (?)

    const keys = await this.storageCache.list();
    console.log("storage cache keys", keys);
    for (const key of keys) {
      // keep reference to
      this.memoryCache.set(key, {});
    }
    this.initialised = true;
    return;
  }

  public async has(key: string) {
    // TODO - possibly private method and just use get
    return this.memoryCache.has(key);
  }

  public async get(key: string) {
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

  public async set(key: string, value: any, expiry: number) {
    // TODO - serialisation (cache-dependent)
    await this.storageCache.set(key, value);

    // TODO - determine when/if to set to memory
    // Do not await, prefer to eagerly return
    this.memoryCache.set(key, value);
    return;
  }

  public async clear() {
    await this.storageCache.clear();
    await this.memoryCache.clear();
  }

  public async delete(key: string) {
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
 * - manage cache expiry
 * - max cache size (auto-delete oldest/largest) - ideally with adapter able to provide limit
 * - max ttl
 * - max in-memory size
 * - checksums and revalidation
 * - namespaced caches (with separate contents)
 *
 * Review how cacheable-request encodes....
 * https://github.dev/jaredwray/cacheable/tree/main/packages/cacheable-request
 */
