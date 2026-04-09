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
  private namespace: string;
  private memoryCache = new HttpCacheAdapterMemory();
  private readonly MEMORY_CACHE_THRESHOLD = 1 * 1024 * 1024; // 1MB

  /** Layer-2 cache that persists to storage */
  private storageCache?: IHttpCacheAdapter;

  /** Entries manifest stores metadata for Layer-2 */
  private manifest: HttpCacheManifest;

  private initialised = false;

  constructor(namespace: string, storageCache?: IHttpCacheAdapter) {
    this.namespace = namespace;
    this.storageCache = storageCache;
  }

  /**
   * Determine which storage adapter is optimal based on current environment (e.g. browser/native)
   * Specific storage compatibility checks can be tested via:
   * https://byojs.dev/storage/
   */
  private async createStorageAdapter(): Promise<IHttpCacheAdapter> {
    if (Capacitor.isNativePlatform()) {
      return new HttpCacheAdapterFile(this.namespace);
    }
    // TODO - disable on ios browser (detect), as writes only supported in worker threads
    // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemWritableFileStream/write#browser_compatibility
    // https://webkit.org/blog/12257/the-file-system-access-api-with-origin-private-file-system/
    if ("storage" in navigator) {
      try {
        const opfsRoot = await navigator.storage.getDirectory();
        const directoryHandle = await opfsRoot.getDirectoryHandle(`http-cache-${this.namespace}`, {
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
    return this.memoryCache.has(key);
  }

  public async get(key: string) {
    const cachedValue = await this.memoryCache.get(key);
    if (cachedValue) {
      return cachedValue;
    }
    // cached value exists, but has not been stored in memory
    // (either file too large or first retrieval)
    return this.storageCache?.get(key);
  }

  public async getEntry(key: string) {
    return this.manifest.get(key);
  }

  public async stream(req) {
    // TODO - stream req to file? ... or more like a pipe op
  }

  public async set(key: string, res: Response, expiry?: number) {
    const blob = await res.blob();

    const entry = await this.createManifestEntry(res, blob, expiry);
    await this.manifest.set(key, entry);

    // Store to storage as contentSHA256 to avoid filename collision or duplication
    await this.storageCache.set(entry.contentSha256, blob);

    // Only store in memory if it's below the threshold to avoid bloating RAM
    if (blob.size <= this.MEMORY_CACHE_THRESHOLD) {
      this.memoryCache.set(key, blob);
    }

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

  private async createManifestEntry(res: Response, data: Blob, expiry?: number) {
    const headersObj: Record<string, string> = {};
    res.headers.forEach((value, key) => {
      headersObj[key] = value;
    });
    const contentSha256 = await hashBlobSHA256(data);

    const entry: ICacheManifestEntry = {
      contentSha256,
      contentType: res.headers.get("content-type") || "application/octet-stream",
      created: new Date().getTime(),
      headers: headersObj,
      size: data.size,
      status: res.status,
      storageKey: contentSha256,
      expiry,
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
 * TODO
 * - Max cache size for L2 storage (auto-delete oldest/largest)
 * - Checksums and revalidation (ETag/Last-Modified support)
 * - Object URL creation for cached blobs
 * - Debug page to test strategies, urls etc.
 *
 * Review how cacheable-request encodes....
 * https://github.dev/jaredwray/cacheable/tree/main/packages/cacheable-request
 */
