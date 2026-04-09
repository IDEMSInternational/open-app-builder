import { IHttpCacheAdapter } from "./adapters/types";
import { Capacitor } from "@capacitor/core";
import { HttpCacheAdapterFile } from "./adapters/file.adapter";
import { HTTPCacheAdapterOPFS } from "./adapters/opfs.adapter";

export interface ICacheManifestEntry {
  /** Response content type */
  contentType: string;
  /** Epoch timestamp of date created */
  created: number;
  /** Epoch timestamp of TTL auto-expiry */
  expiry?: number;
  /** HTTP status headers */
  headers: Record<string, string>;
  /** Body response size */
  size: number;
  /** HTTP status code */
  status: number;
}

/**
 * HttpCache handles persistent caching of HTTP responses using a sidecar pattern.
 * Each entry is stored as two files: [hash].data (the body) and [hash].meta (metadata).
 */
export class HttpCache {
  private namespace: string;
  private storageCache?: IHttpCacheAdapter;
  private initialised = false;

  constructor(namespace: string, storageCache?: IHttpCacheAdapter) {
    this.namespace = namespace;
    this.storageCache = storageCache;
  }

  private async createStorageAdapter(): Promise<IHttpCacheAdapter> {
    if (Capacitor.isNativePlatform()) {
      return new HttpCacheAdapterFile(this.namespace);
    }
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
    // Fallback to memory-like behavior if no storage is available
    // (Note: we removed memory adapter, but we could add a simple one back if needed.
    // For now, let's assume storage is available or it just won't cache)
    return undefined as any;
  }

  public async ready() {
    if (this.initialised) return;
    this.storageCache ??= await this.createStorageAdapter();
    this.initialised = true;
  }

  public async has(key: string) {
    const storageKey = await hashUrl(key);
    return this.storageCache.has(`${storageKey}.data`);
  }

  public async get(key: string): Promise<Blob | undefined> {
    const storageKey = await hashUrl(key);
    return this.storageCache.get(`${storageKey}.data`);
  }

  public async getEntry(key: string): Promise<ICacheManifestEntry | undefined> {
    const storageKey = await hashUrl(key);
    const metaBlob = await this.storageCache.get(`${storageKey}.meta`);
    if (!metaBlob) return undefined;

    try {
      const text = await metaBlob.text();
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse metadata", e);
      return undefined;
    }
  }

  public async set(key: string, res: Response, expiry?: number) {
    const storageKey = await hashUrl(key);
    const blob = await res.blob();

    const entry: ICacheManifestEntry = {
      contentType: res.headers.get("content-type") || "application/octet-stream",
      created: Date.now(),
      headers: Object.fromEntries(res.headers.entries()),
      size: blob.size,
      status: res.status,
      expiry,
    };

    const metaBlob = new Blob([JSON.stringify(entry)], { type: "application/json" });

    await Promise.all([
      this.storageCache.set(`${storageKey}.data`, blob),
      this.storageCache.set(`${storageKey}.meta`, metaBlob),
    ]);
  }

  public async clear() {
    await this.storageCache.clear();
  }

  public async delete(key: string) {
    const storageKey = await hashUrl(key);
    await Promise.all([
      this.storageCache.delete(`${storageKey}.data`),
      this.storageCache.delete(`${storageKey}.meta`),
    ]);
    return true;
  }
}

/** Generate a fast hash from a URL string */
async function hashUrl(url: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(url);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
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
