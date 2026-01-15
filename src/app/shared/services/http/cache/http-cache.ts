import { HttpCacheAdapterMemory } from "./adapters/memory.adapter";
import { IHttpCacheAdapter } from "./adapters/types";
import { Capacitor } from "@capacitor/core";
import { HttpCacheAdapterFile } from "./adapters/file.adapter";
import { HTTPCacheAdapterOPFS } from "./adapters/opfs.adapter";
import { HttpCacheManifest, ICacheManifestEntry } from "./http-cache-manifest";

/**
 *
 */
export class HttpCache {
  /**
   * Layer-1 cache that keeps in-memory
   * This is used for quick retrieval of frequently accessed files
   * It has a fixed size allocation and automatic eviction of least-recently used (LRU)
   **/
  private memoryCache = new HttpCacheAdapterMemory();

  /** Layer-2 cache that persists to storage */
  private storageCache?: IHttpCacheAdapter;

  /** Entries manifest stores metadata for Layer-2 */
  private manifest: HttpCacheManifest;

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

  public async ready() {
    if (this.initialised) return;

    // auto-select best storage adapter if not specified
    this.storageCache ??= await this.createStorageAdapter();

    this.manifest = new HttpCacheManifest(this.storageCache);
    await this.manifest.initialise();

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

  public async set(key: string, res: Response, expiry?: number) {
    const blob = await res.blob();

    // TODO - manifest first, then use to populate to storage

    const entry = await this.createManifestEntry(res, blob);
    await this.manifest.set(key, entry);

    // Store to storage as contentSHA256 to avoid filename collision or duplication
    await this.storageCache.set(entry.contentSha256, blob);

    // TODO - determine when/if to set to memory
    // Do not await, prefer to eagerly return
    this.memoryCache.set(key, blob);

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

  private async createManifestEntry(res: Response, data: Blob) {
    const headersObj: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headersObj[key] = value;
    });
    const contentSha256 = await hashBlobSHA256(data);

    // TODO - generate checksum

    const entry: ICacheManifestEntry = {
      contentSha256,
      created: new Date().getTime(),
      headers: headersObj,
      size: data.size,
      status: res.status,
      storageKey: contentSha256,
      expiry: "",
    };
    return entry;
  }
}

/** Generate a SHA-256 hash from a Blob */
async function hashBlobSHA256(blob: Blob): Promise<string> {
  const arrayBuffer = await blob.arrayBuffer();
  // TODO - cross platform compatibility?
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 *
 * TODO
 * - expiry header as string? (but also want 0 for no expiry?)
 *    probably keep number for now?
 *
 * - adding support for object url methods? maybe in other service
 *
 * - valid response caching
 * - storing expiry and such
 * - storing blobs (native and browser)
 * - manage cache expiry
 * - max cache size (auto-delete oldest/largest) - ideally with adapter able to provide limit
 * - max ttl
 * - max in-memory size
 * - checksums and revalidation
 * - namespaced caches (with separate contents)
 * - consider bumping min chrome version for compatibility (? or just fallback in-memory where not)
 * - add headers for things like source (e.g. x-source=network|cache)
 * - debug page to test strategies, urls etc.
 *
 * Review how cacheable-request encodes....
 * https://github.dev/jaredwray/cacheable/tree/main/packages/cacheable-request
 */
