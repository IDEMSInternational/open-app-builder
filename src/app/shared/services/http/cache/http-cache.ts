import { IHttpCacheAdapter } from "./adapters/types";
import { Capacitor } from "@capacitor/core";
import { HttpCacheAdapterFile } from "./adapters/file.adapter";
import { HTTPCacheAdapterOPFS } from "./adapters/opfs.adapter";
import { HttpCacheAdapterMemory } from "./adapters/memory.adapter";

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
  /** Source url of content */
  url: string;
}

/**
 * HttpCache handles persistent caching of HTTP responses using a sidecar pattern.
 * Each entry is stored as two files: [hash] (the body) and [hash].meta.json (metadata).
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
    // Fallback to in-memory storage
    // Note - navigator.storage is widely supported, so unlikely to reach this section of code
    // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/storage#browser_compatibility
    return new HttpCacheAdapterMemory();
  }

  public async ready() {
    if (this.initialised) return;
    this.storageCache ??= await this.createStorageAdapter();
    this.initialised = true;
  }

  public async has(key: string) {
    const storageKey = await hashUrl(key);
    return this.storageCache.has(storageKey);
  }

  public async get(key: string): Promise<Blob | undefined> {
    const storageKey = await hashUrl(key);
    return this.storageCache.get(storageKey);
  }

  public async getEntry(key: string): Promise<ICacheManifestEntry | undefined> {
    const storageKey = await hashUrl(key);
    const metaBlob = await this.storageCache.get(`${storageKey}.meta.json`);
    if (!metaBlob) return undefined;

    try {
      const text = await metaBlob.text();
      return JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse metadata", e);
      return undefined;
    }
  }

  public async getUrl(key: string): Promise<string | undefined> {
    const storageKey = await hashUrl(key);
    if (this.storageCache.getUrl) {
      return this.storageCache.getUrl(storageKey);
    }
    // Fallback if adapter doesn't support getUrl
    const blob = await this.get(key);
    if (!blob) return undefined;
    return URL.createObjectURL(blob);
  }

  public async set(key: string, res: Response, expiry?: number) {
    const storageKey = await hashUrl(key);
    const blob = await res.blob();

    const headers: Record<string, string> = {};
    res.headers.forEach((value, name) => {
      headers[name] = value;
    });

    const entry: ICacheManifestEntry = {
      contentType: res.headers.get("content-type") || "application/octet-stream",
      created: Date.now(),
      headers,
      size: blob.size,
      status: res.status,
      expiry,
      url: res.url,
    };

    const metaBlob = new Blob([JSON.stringify(entry)], { type: "application/json" });

    await Promise.all([
      this.storageCache.set(storageKey, blob),
      this.storageCache.set(`${storageKey}.meta.json`, metaBlob),
    ]);
  }

  public async clear() {
    await this.storageCache.clear();
  }

  public async delete(key: string) {
    const storageKey = await hashUrl(key);
    await Promise.all([
      this.storageCache.delete(storageKey),
      this.storageCache.delete(`${storageKey}.meta.json`),
    ]);
    return true;
  }
}

/** Generate a fast hash from a URL string */
export async function hashUrl(url: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(url);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
