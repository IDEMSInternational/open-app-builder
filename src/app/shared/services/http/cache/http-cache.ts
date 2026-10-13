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
  private initialised = false;
  public adapter: IHttpCacheAdapter;

  constructor(private namespace: string) {}

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
    this.adapter ??= await this.createStorageAdapter();
    this.initialised = true;
  }

  public async list(): Promise<string[]> {
    const allKeys = await this.adapter.list();
    return allKeys.filter((key) => !key.endsWith(".meta.json"));
  }

  public async getEntry(key: string): Promise<ICacheManifestEntry | undefined> {
    const blob = await this.adapter.get(`${key}.meta.json`);
    if (!blob) return undefined;

    // 2. Parse the resulting string
    try {
      const text = await blob.text();
      const data = JSON.parse(text);
      console.log(data);
      return data;
    } catch (error) {
      console.error("Invalid JSON format:", error);
    }
  }

  public async setMeta(key: string, entry: Omit<ICacheManifestEntry, "created">) {
    const cacheEntry: ICacheManifestEntry = { ...entry, created: Date.now() };
    const metaBlob = new Blob([JSON.stringify(cacheEntry)], { type: "application/json" });
    return this.adapter.set(`${key}.meta.json`, metaBlob);
  }

  public async delete(key: string) {
    await Promise.all([this.adapter.delete(key), this.adapter.delete(`${key}.meta.json`)]);
    return true;
  }
}
