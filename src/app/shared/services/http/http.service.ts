import { Injectable } from "@angular/core";

import ky from "ky";

import type { Options } from "ky";
import { generateRequestKey, shorthandToTime } from "./http.utils";
import { HttpCache } from "./cache/http-cache";

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
   * Specify strategy.
   * Default uses browser own defaults, typically relying on response headers
   **/
  strategy?: "cache-first" | "cache-only" | "network-first" | "network-only";
}
const DEFAULT_OPTIONS: IHttpRequestOptions = {
  cacheName: "cache",
  cacheExpiry: "30d",
  // TODO(discuss) - default option cache or network first?
  strategy: "cache-first",
  retry: 2,
};

/**
 * Service to handle http requests, with custom request cache management
 * For more details see [Readme](./README.md)
 */
@Injectable({ providedIn: "root" })
export class HttpService {
  private client = this.getClient();

  /** Map of cache instances by namespace */
  private cacheNamespaces: Record<string, HttpCache> = {};

  /**
   * Make a get request to a url. Use options to define default caching behaviour,
   * such as cache-first or network-only approaches
   */
  public async get(url: string, options: IHttpRequestOptions = {}) {
    const mergedOptions: IHttpRequestOptions = { ...DEFAULT_OPTIONS, ...options, method: "get" };
    const { strategy, cacheExpiry, cacheName } = mergedOptions;

    // populate cache expiry header to handle in after-response hook
    options.headers ??= {};
    options.headers["x-cache-expiry"] = `${shorthandToTime(cacheExpiry)}`;
    options.headers["x-cache-name"] = cacheName;

    return this.requestStrategyHandlers[strategy](url, mergedOptions);
  }

  /** Specific handling of different request strategies */
  private requestStrategyHandlers: Record<
    IHttpRequestOptions["strategy"],
    (url: string, options: IHttpRequestOptions) => Promise<Response>
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
      const networkRes = await this.handleNetworkRequest(url, options);
      if (this.isSuccessStatus(networkRes.status)) {
        return networkRes;
      }
      return this.handleCacheRequest(url, options);
    },
  };

  /**
   * Check if the response received corresponds to a cacheable success code
   * Currently does not support opaque responses, but could be extended similar to
   * https://github.com/kornelski/http-cache-semantics
   */
  private isSuccessStatus(code: number) {
    return code >= 200 && code < 300;
  }

  private handleNetworkRequest(url: string, options: IHttpRequestOptions) {
    return this.client.get(url, options);
  }

  private async handleCacheRequest(url: string, options: IHttpRequestOptions) {
    const { cacheName } = options;
    const cache = await this.getCache(cacheName);
    const key = generateRequestKey({ url, method: options.method });

    const [cacheRes, entry] = await Promise.all([cache.get(key), cache.getEntry(key)]);
    const headers = new Headers({ "x-res-source": "cache" });

    if (cacheRes && entry) {
      if (entry.expiry && entry.expiry < Date.now()) {
        await cache.delete(key);
        return new Response(null, { status: 404, headers });
      }
      return new Response(cacheRes, { status: 200, headers });
    }

    return new Response(null, { status: 404, headers });
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

  private async updateCache(req: Request, res: Response) {
    if (this.isSuccessStatus(res.status)) {
      const cacheName = req.headers.get("x-cache-name") || "cache";
      const cache = await this.getCache(cacheName);
      const key = generateRequestKey({ url: req.url, method: req.method });
      const expiry = req.headers.get("x-cache-expiry");
      const expiryTime = expiry ? Number(expiry) : undefined;

      // Use response clone to allow initial response to still be passed
      const clone = res.clone();
      await cache.set(key, clone, expiryTime);
    }
  }

  /** Create a new ky client with hooks for cache management */
  private getClient() {
    return ky.extend({
      hooks: {
        beforeRequest: [],
        afterResponse: [
          async ({ request, response }) => {
            // delay cache updates to avoid blocking UI
            setTimeout(() => {
              this.updateCache(request, response);
            }, 50);
          },
        ],
      },
    });
  }
}

/**
 * TODO
 * - Stale-then-revalidate strategy support
 * - Custom request IDs for tracking in other components
 * - Download progress observable and abort signal
 * - Conversion of response file types
 * - Head requests to check if cache is potentially invalid (compare size, checksum)
 */
