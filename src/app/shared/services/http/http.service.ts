import { Injectable } from "@angular/core";

import type { Options } from "ky";
import { generateRequestKey, shorthandToTime } from "./http.utils";
import { HttpCache } from "./cache/http-cache";
import { Capacitor } from "@capacitor/core";
import { getMimeType } from "shared/src/utils/mimetypes";
import { WebHttpClientAdapter } from "./client/adapters/web.adapter";
import { CapacitorHttpClientAdapter } from "./client/adapters/capacitor.adapter";
import { WorkerHttpClientAdapter } from "./client/adapters/worker.adapter";
import { IHttpClientAdapter, IHttpAdapterResponse } from "./client/http-client";

export interface IHttpRequestOptions extends Options {
  /**
   * Namespace for storing cached responses. Default 'cache'
   * Providing a different namespace enables more fine-grained cache management,
   * such as deleting all entries in a "downloads" cache
   **/
  cacheName?: string;

  /** Shorthand ttl, e.g. 1m (60000) 1h (3600000) 1d (86400000). Default 1m */
  cacheExpiry?: string;

  /**
   * Ensure headers are passed as key-value pairs and not HEADER object for
   * easier serialisation across workers
   */
  headers?: Record<string, string>;

  /**
   * Specify strategy.
   * Default uses browser own defaults, typically relying on response headers
   **/
  strategy?: "cache-first" | "cache-only" | "network-first" | "network-only";
}
const DEFAULT_OPTIONS: IHttpRequestOptions = {
  cacheName: "cache",
  cacheExpiry: "30d",
  headers: {},
  strategy: "cache-first",
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
   * Standard HTTP GET. Make a get request to a url and returns a standard DOM Response.
   * Use options to define default caching behaviour, such as cache-first or network-only approaches
   */
  public async get(url: string, options: IHttpRequestOptions = {}): Promise<Response> {
    const adapterResponse = await this.executeStrategy(url, options);

    if (!this.isSuccessStatus(adapterResponse.status)) {
      return new Response(null, {
        status: adapterResponse.status,
        headers: adapterResponse.headers,
      });
    }

    const data = await adapterResponse.getRawData();
    return new Response(data, { status: adapterResponse.status, headers: adapterResponse.headers });
  }

  /**
   * Optimized fetch for UI Media rendering.
   * Ensures the data is cached and returns a safe URL (e.g. localhost native bridge URL)
   * bypassing heavy javascript Blob parsing overhead.
   */
  public async getMediaSrc(url: string, options: IHttpRequestOptions = {}): Promise<ICachedMedia> {
    const adapterResponse = await this.executeStrategy(url, options);
    if (!this.isSuccessStatus(adapterResponse.status)) {
      throw new Error(`Failed to fetch media: HTTP ${adapterResponse.status}`);
    }
    return adapterResponse.getUri();
  }

  private async executeStrategy(
    url: string,
    options: IHttpRequestOptions
  ): Promise<IHttpAdapterResponse> {
    const mergedOptions: IHttpRequestOptions = { ...DEFAULT_OPTIONS, ...options, method: "get" };
    const { strategy, cacheExpiry, cacheName } = mergedOptions;

    // apply cache headers
    mergedOptions.headers = {
      ...options.headers,
      "x-cache-expiry": `${shorthandToTime(cacheExpiry)}`,
      "x-cache-name": cacheName || "cache",
    };

    return this.requestStrategyHandlers[strategy!](url, mergedOptions);
  }

  /** Specific handling of different request strategies */
  private requestStrategyHandlers: Record<
    NonNullable<IHttpRequestOptions["strategy"]>,
    (url: string, options: IHttpRequestOptions) => Promise<IHttpAdapterResponse>
  > = {
    "cache-only": async (url, options) => this.handleCacheRequest(url, options),
    "cache-first": async (url, options) => {
      const cacheRes = await this.handleCacheRequest(url, options);
      if (cacheRes.status === 200) {
        return cacheRes;
      }
      return this.handleNetworkRequest(url, options);
    },
    "network-only": async (url, options) => this.handleNetworkRequest(url, options),
    "network-first": async (url, options) => {
      try {
        const networkRes = await this.handleNetworkRequest(url, options);
        if (this.isSuccessStatus(networkRes.status)) {
          return networkRes;
        }
      } catch (error) {
        // Network error — fall through to cache
      }
      return this.handleCacheRequest(url, options);
    },
  };

  /** Check if the response received corresponds to a cacheable success code */
  private isSuccessStatus(code: number) {
    return code >= 200 && code < 300;
  }

  private getAdapterForUrl(url: string): IHttpClientAdapter {
    const mime = getMimeType(url);
    const isMedia =
      mime &&
      (mime.startsWith("image/") ||
        mime.startsWith("video/") ||
        mime.startsWith("audio/") ||
        mime === "application/pdf");

    if (isMedia) {
      if (Capacitor.isNativePlatform()) {
        return this.capacitorAdapter;
      }
      return this.workerAdapter;
    }
    // TODO - could consider HEAD request if url is an api endpoint
    // or just allow param passing to manually specify
    // For now just default to web adapter
    return this.webAdapter;
  }

  private async handleNetworkRequest(
    url: string,
    options: IHttpRequestOptions
  ): Promise<IHttpAdapterResponse> {
    const adapter = this.getAdapterForUrl(url);
    const cacheName = options.cacheName || "cache";
    const cache = await this.getCache(cacheName);

    return adapter.request(url, options, cache);
  }

  private async handleCacheRequest(
    url: string,
    options: IHttpRequestOptions
  ): Promise<IHttpAdapterResponse> {
    const { cacheName } = options;
    const cache = await this.getCache(cacheName || "cache");
    const key = generateRequestKey({ url, method: options.method });

    const [hasCache, entry] = await Promise.all([cache.has(key), cache.getEntry(key)]);
    const headers = { "x-res-source": "cache", ...(entry?.headers || {}) };

    if (hasCache && entry) {
      if (entry.expiry && entry.expiry < Date.now()) {
        await cache.delete(key);
        return {
          status: 404,
          headers,
          getUri: async () => ({ src: "", revoke: () => {} }),
          getRawData: async () => new ArrayBuffer(0),
        };
      }
      return {
        status: 200,
        headers,
        getUri: async () => {
          const src = await cache.getUrl(key);
          if (src && src.startsWith("blob:"))
            return { src, revoke: () => URL.revokeObjectURL(src as string) };
          return { src: src || "", revoke: () => {} };
        },
        getRawData: async () => {
          if (Capacitor.isNativePlatform()) {
            const src = await cache.getUrl(key);
            if (src) return fetch(src).then((r) => r.arrayBuffer());
          }
          const blob = await cache.get(key);
          return blob ? blob.arrayBuffer() : new ArrayBuffer(0);
        },
      };
    }

    return {
      status: 404,
      headers,
      getUri: async () => ({ src: "", revoke: () => {} }),
      getRawData: async () => new ArrayBuffer(0),
    };
  }

  private async getCache(name: string) {
    if (!this.cacheNamespaces[name]) {
      const createdCache = await this.createCache(name);
      await createdCache.ready();
      this.cacheNamespaces[name] = createdCache;
    }
    return this.cacheNamespaces[name];
  }

  // separate cache creation method for easy test stub
  private async createCache(name: string) {
    return new HttpCache(name);
  }
}
