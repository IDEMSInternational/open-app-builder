import { Injectable } from "@angular/core";

import ky from "ky";

import { Options } from "ky/distribution/types/options";
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

    const cacheRes = await cache.get(key);
    const headers = new Headers({ "x-res-source": "cache" });
    if (cacheRes) {
      console.log("cacheRes", cacheRes);
      // TODO - evaluate and handle expiry here to invalidate existing cache which
      // may have originally set a longer expiry
      return new Response(cacheRes, { status: 200, headers });
    }

    return new Response(cacheRes, { status: 400, headers });
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
      const cacheName = req.headers.get("x-cache-name");
      const cache = await this.getCache(cacheName);
      const key = generateRequestKey({ url: req.url, method: req.method });
      const expiry = req.headers.get("x-cache-expiry");
      const expiryTime = expiry ? shorthandToTime(expiry) : undefined;

      // TODO - handle here or in cache?

      // Use response clone to allow initial response to still be passed
      // TODO - handle streaming body response
      const clone = res.clone();

      await cache.set(key, clone, expiryTime);

      // TODO - understand different application types
      // TODO - when to use buffer vs convert...
      const reader = res.body.getReader();
      //
      const contentType = res.headers.get("content-type");
      // TODO - use expiry header
      if (contentType === "application/json") {
        // TODO - serialisation? or just body
      }
    }
  }

  /** Create a new ky client with hooks for cache management */
  private getClient() {
    return ky.extend({
      hooks: {
        beforeRequest: [],
        afterResponse: [
          async (req, options, res) => {
            console.log("res", res);
            // delay cache updates to avoid blocking UI
            setTimeout(() => {
              this.updateCache(req, res);
            }, 50);
          },
        ],
      },
    });
  }
}
/**
 * 

// Handle request
    // NOTE - cache requests still go through client api for consistent response format
    const req = this.client.get(url, {
      headers,
      // TODO - maybe this should be part of download service that also handles writing to disk...
      
      retry: max_retries,
      // use custom caching (?) - or maybe default if not strategy selected
      // this would use request headers.. maybe use response headers?
      cache: strategy === "network-only" ? "no-cache" : "default",
    });

     */

/**
 * TODOs
 * - How to keep track of expiry (possibly via cached doc? e.g. _expiry ), or separate db table
 *   If separate db table again will have to ask whether best kept here or in download service
 * 
 * - Handling network-first timeout
 * - Stale-then-revalidate strategy - how best to subscribe (maybe setup in download)
 * - Include namespace for cache files/folders/prefix
 * - Use head requests to help know if cache is potentially invalid (compare size, checksum if available)
 * - Error handling
 *
 * Data-download service
 * - stale-then-revalidate style strategy (possibly just race both cache and network reqs)
 *   requires `revalidate` param
 * - could consider moving all strategies to service?
 * - custom request ids for tracking in other components
 * - download progress observable and abort signal
 * - conversion of response file types
 * 
 * E.g.
 * ```
 *   
   const controller = new AbortController();
   const { signal, abort } = controller;

    const progress = new Subject<DownloadProgress>();
   onDownloadProgress: (p) => {
        progress.next(p);
        console.log("progress", p);
        if (p.percent === 1) {
          progress.complete();
        }
      },
      signal,
 * ```
 */
