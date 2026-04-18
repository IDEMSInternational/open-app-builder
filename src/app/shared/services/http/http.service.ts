import { Injectable } from "@angular/core";

import type { Options } from "ky";
import { generateCacheKey } from "./http.utils";
import { HttpCache, ICacheManifestEntry } from "./cache/http-cache";
import { Capacitor } from "@capacitor/core";
import { getMimeType } from "packages/shared/src/utils/mimetypes";
import { WebHttpClientAdapter } from "./client/adapters/web.adapter";
import { CapacitorHttpClientAdapter } from "./client/adapters/capacitor.adapter";
import { WorkerHttpClientAdapter } from "./client/adapters/worker.adapter";
import { IHttpClientAdapter, IHttpAdapterResponse } from "./client/http-client.types";

export interface IHttpRequestOptions extends Options {
  /**
   * Namespace for storing cached responses. Default 'cache'
   * Providing a different namespace enables more fine-grained cache management,
   * such as deleting all entries in a "downloads" cache
   **/
  cacheName?: string;

  /**
   * Identifier within cache namespace for entry
   * Default generated from hash of request method and url
   */
  cacheKey?: string;

  /**
   * Shorthand ttl, e.g. 1m (60000) 1h (3600000) 1d (86400000). Default 30d
   * NOTE - cache does not auto-purge but will seek to revalidate after expiry
   * has passed on next fetch
   **/
  cacheExpiry?: string;

  /**
   * Ensure headers are passed as key-value pairs and not HEADER object for
   * easier serialisation across workers
   */
  headers?: Record<string, string>;

  /**
   * Skip cache entirely and always fetch from network.
   * Useful for auth endpoints or other non-cacheable requests.
   */
  bypassCache?: boolean;

  /**
   * Treat request as media (image/video/audio/pdf), using the more performant
   * worker/capacitor adapters to avoid JavaScript thread blocking.
   * Automatically set when requesting via getMediaSrc().
   */
  isMedia?: boolean;
}

const DEFAULT_OPTIONS: IHttpRequestOptions = {
  cacheName: "cache",
  cacheExpiry: "30d",
  headers: {},
  bypassCache: false,
  retry: 2,
};

export interface ICachedMedia {
  /** The safe URL string ready to be bound to a [src] HTML attribute */
  src: string;
  /** Automatically cleans up memory on the Web. Safe to call on Native (no-op) */
  revoke: () => void;
}

/**
 * Service to handle http requests, with custom request cache management
 * using a stale-while-revalidate approach.
 *
 * - If cached and fresh → return immediately
 * - If cached but stale → return stale immediately, revalidate in background
 * - If not cached → fetch from network
 *
 * For more details see [Readme](./README.md)
 */
@Injectable({ providedIn: "root" })
export class HttpService {
  private webAdapter = new WebHttpClientAdapter();
  private capacitorAdapter = new CapacitorHttpClientAdapter();
  private workerAdapter: IHttpClientAdapter;

  constructor() {
    try {
      this.workerAdapter = new WorkerHttpClientAdapter();
    } catch {
      this.workerAdapter = this.webAdapter;
    }
  }

  /** Map of cache instances by namespace */
  private cacheNamespaces: Record<string, HttpCache> = {};

  /**
   * Standard HTTP GET. Make a get request to a url and returns a
   * standard DOM Response. Uses stale-while-revalidate caching by default.
   */
  public async get(url: string, options: IHttpRequestOptions = {}): Promise<Response> {
    const adapterResponse = await this.executeRequest(url, options);
    if (!this.isSuccessStatus(adapterResponse.status)) {
      return new Response(null, {
        status: adapterResponse.status,
        headers: adapterResponse.headers,
      });
    }

    const data = await adapterResponse.getRawData();
    return new Response(data, {
      status: adapterResponse.status,
      headers: adapterResponse.headers,
    });
  }

  /**
   * Optimized fetch for UI Media rendering.
   * Ensures the data is cached and returns a safe URL
   * (e.g. localhost native bridge URL) bypassing heavy javascript
   * Blob parsing overhead.
   */
  public async getMediaSrc(url: string, options: IHttpRequestOptions = {}): Promise<ICachedMedia> {
    const adapterResponse = await this.executeRequest(url, { ...options, isMedia: true });
    if (!this.isSuccessStatus(adapterResponse.status)) {
      throw new Error(`Failed to fetch media: HTTP ${adapterResponse.status}`);
    }
    return adapterResponse.getUri();
  }

  /** List all cached keys in a namespace */
  public async listKeys(cacheName): Promise<string[]> {
    const cache = await this.getCache(cacheName);
    return cache.list();
  }

  /** Get metadata for a cached URL */
  public async getMetadata(
    url: string,
    cacheName = DEFAULT_OPTIONS.cacheName,
    method = "get"
  ): Promise<ICacheManifestEntry | undefined> {
    const cache = await this.getCache(cacheName);
    const cacheKey = await generateCacheKey({ method, url });
    return cache.getEntry(cacheKey);
  }

  /** Invalidate a single cached URL */
  public async removeCacheEntry(
    url: string,
    cacheName = DEFAULT_OPTIONS.cacheName,
    method = "get"
  ): Promise<void> {
    const cacheKey = await generateCacheKey({ method, url });
    const cache = await this.getCache(cacheName);
    await cache.delete(cacheKey);
  }

  /** Clear an entire cache namespace */
  public async removeCacheEntries(cacheName: string): Promise<void> {
    const cache = await this.getCache(cacheName);
    await cache.adapter.clear();
    delete this.cacheNamespaces[cacheName];
  }

  /**
   * Unified stale-while-revalidate request flow:
   *
   * 1. If cached and fresh → return immediately
   * 2. If cached but stale → return stale, revalidate in background
   * 3. No cache →  fetch from network, cache and return
   */
  private async executeRequest(
    url: string,
    options: IHttpRequestOptions
  ): Promise<IHttpAdapterResponse> {
    const mergedOptions: IHttpRequestOptions = {
      ...DEFAULT_OPTIONS,
      ...options,
      method: "get",
    };

    mergedOptions.cacheKey ??= await generateCacheKey({ method: mergedOptions.method, url });

    // Bypass cache entirely if requested
    if (mergedOptions.bypassCache) {
      return this.handleNetworkRequest(url, mergedOptions);
    }

    const { cacheKey, cacheName } = mergedOptions;

    const cache = await this.getCache(cacheName);
    const entry = await cache.getEntry(cacheKey);

    const hasValidCache = !!entry;
    const isStale = hasValidCache && entry.expiry && entry.expiry < Date.now();
    // 1. Cached and fresh — return immediately
    if (hasValidCache && !isStale) {
      return this.buildCacheResponse(cache, cacheKey, entry);
    }

    // 2. Cached but stale — return stale, revalidate in background
    if (hasValidCache && isStale) {
      this.revalidateInBackground(url, mergedOptions);
      return this.buildCacheResponse(cache, cacheKey, entry);
    }

    // 3. No cache — network is the only option
    try {
      return await this.handleNetworkRequest(url, mergedOptions);
    } catch (err) {
      console.error(`[HTTP Err]`, err);
      return this.buildEmptyResponse(504);
    }
  }

  /** Fire-and-forget background revalidation */
  private revalidateInBackground(url: string, options: IHttpRequestOptions): void {
    const { cacheName } = options;
    const adapter = this.getAdapterForUrl(url, options);

    this.getCache(cacheName)
      .then((cache) => adapter.request(url, options, cache))
      .catch(() => {
        // Silent fail — stale cache remains usable
      });
  }

  /** Build an IHttpAdapterResponse from a cache hit */
  private buildCacheResponse(
    cache: HttpCache,
    key: string,
    entry: { headers?: Record<string, string> }
  ): IHttpAdapterResponse {
    const headers = {
      "x-res-source": "cache",
      ...(entry.headers || {}),
    };

    return {
      status: 200,
      headers,
      getUri: async () => cache.adapter.getUrl(key),
      getRawData: async () => cache.adapter.get(key),
    };
  }

  /** Build an empty error response */
  private buildEmptyResponse(status: number): IHttpAdapterResponse {
    return {
      status,
      headers: {},
      getUri: async () => ({ src: "", revoke: () => null }),
      getRawData: async () => new Blob(),
    };
  }

  /** Check if the response received corresponds to a cacheable success code */
  private isSuccessStatus(code: number): boolean {
    return code >= 200 && code < 300;
  }

  private getAdapterForUrl(url: string, options: IHttpRequestOptions): IHttpClientAdapter {
    const isMedia = options.isMedia || this.isMediaFromUrl(url);

    if (isMedia) {
      if (Capacitor.isNativePlatform()) {
        return this.capacitorAdapter;
      }
      return this.workerAdapter;
    }

    return this.webAdapter;
  }

  private isMediaFromUrl(url: string): boolean {
    const mime = getMimeType(url);
    // Likely api endpoint, could use HEAD request but for now
    // simply assume user will have requested mediaSrc explicitly
    if (!mime) return false;
    return (
      mime.startsWith("image/") ||
      mime.startsWith("video/") ||
      mime.startsWith("audio/") ||
      mime === "application/pdf"
    );
  }

  private async handleNetworkRequest(
    url: string,
    options: IHttpRequestOptions
  ): Promise<IHttpAdapterResponse> {
    const adapter = this.getAdapterForUrl(url, options);
    const cacheName = options.cacheName || "cache";
    const cache = await this.getCache(cacheName);
    return adapter.request(url, options, cache);
  }

  private async getCache(name: string): Promise<HttpCache> {
    if (!this.cacheNamespaces[name]) {
      const createdCache = await this.createCache(name);
      await createdCache.ready();
      this.cacheNamespaces[name] = createdCache;
    }
    return this.cacheNamespaces[name];
  }

  // Separate cache creation method for easy test stub
  private async createCache(name: string): Promise<HttpCache> {
    return new HttpCache(name);
  }
}
