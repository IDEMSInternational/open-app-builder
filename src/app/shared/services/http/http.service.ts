import { Injectable } from "@angular/core";

import ky from "ky";

import { Options } from "ky/distribution/types/options";
import { generateRequestKey, shorthandToTime } from "./http.utils";
import { AsyncServiceBase } from "../asyncService.base";
import { HttpCache } from "./cache/http-cache";

export interface IHttpRequestOptions extends Options {
  /** Shorthand ttl, e.g. 1m (60000) 1h (3600000) 1d (86400000). Default 1m */
  expiry?: string;

  /**
   * Specify strategy.
   * Default uses browser own defaults, typically relying on response headers
   **/
  strategy?: "cache-first" | "cache-only" | "network-first" | "network-only";
}
const DEFAULT_OPTIONS: IHttpRequestOptions = {
  expiry: "30d",
  strategy: "cache-first",
  retry: 2,
};

/**
 * Service to handle http requests, with custom request cache management
 * For more details see [Readme](./README.md)
 */
@Injectable({ providedIn: "root" })
export class HttpService extends AsyncServiceBase {
  private client = ky;
  public cache = new HttpCache();

  constructor() {
    super("HTTP Service");
    this.registerInitFunction(this.init);
  }

  private async init() {
    this.addClientHooks();
    await this.cache.init();
  }

  public async get(url: string, options: IHttpRequestOptions = {}) {
    const mergedOptions: IHttpRequestOptions = { ...DEFAULT_OPTIONS, ...options, method: "get" };
    const { strategy } = mergedOptions;

    switch (strategy) {
      case "cache-only":
        return this.handleCacheRequest(url, mergedOptions);

      case "cache-first":
        const cacheRes = await this.handleCacheRequest(url, mergedOptions);
        if (cacheRes.status === 200) {
          return cacheRes;
        }
        return this.handleNetworkRequest(url, mergedOptions);

      case "network-first":
        const networkRes = await this.handleNetworkRequest(url, mergedOptions);
        if (this.isSuccessStatus(networkRes.status)) {
          return networkRes;
        }
        return this.handleCacheRequest(url, mergedOptions);

      default:
        return this.handleNetworkRequest(url, mergedOptions);
    }
  }

  private isSuccessStatus(code: number) {
    // TODO - consider other cacheable response validation, e.g.
    // https://github.com/kornelski/http-cache-semantics
    return code >= 200 && code < 300;
  }

  private handleNetworkRequest(url: string, options: IHttpRequestOptions) {
    const { expiry } = options;

    // populate cache expiry header to handle in after-response hook
    options.headers ??= {};
    options.headers["x-cache-expiry"] = `${shorthandToTime(expiry)}`;

    return this.client.get(url, options);
  }

  private async handleCacheRequest(url: string, options: IHttpRequestOptions) {
    const key = generateRequestKey({ url, method: options.method });
    const cacheRes = await this.cache.get(key);
    const status = cacheRes ? 200 : 400;
    const headers = new Headers({ "x-res-source": "cache" });
    return new Response(cacheRes, { status, headers });
  }

  private async updateCache(req: Request, res: Response) {
    if (this.isSuccessStatus(res.status)) {
      const key = generateRequestKey({ url: req.url, method: req.method });
      const expiry = req.headers.get("x-cache-expiry");
      const expiryTime = expiry ? shorthandToTime(expiry) : undefined;

      // Use response clone to allow initial response to still be passed
      // TODO - handle streaming body response
      const clone = res.clone();

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

  private addClientHooks() {
    this.client = this.client.extend({
      hooks: {
        beforeRequest: [],
        afterResponse: [
          async (req, options, res) => {
            console.log("res", res);
            // delay cache updates to avoid blocking UI
            setTimeout(() => {
              this.updateCache(req, res);
            }, 500);
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
