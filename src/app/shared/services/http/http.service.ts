import { Injectable } from "@angular/core";

import ky, { KyInstance } from "ky";

import { KyHeadersInit } from "ky/distribution/types/options";
import { shorthandToTime } from "./http.utils";
import { AsyncServiceBase } from "../asyncService.base";
import { HttpCache } from "./cache/http-cache";

export interface IHttpRequestOptions {
  /** Shorthand ttl, e.g. 1m (60000) 1h (3600000) 1d (86400000). Default 1m */
  expiry?: string;

  /**
   * Specify strategy.
   * Default uses browser own defaults, typically relying on response headers
   **/
  strategy?: "cache-first" | "cache-only" | "network-first" | "network-only";

  /** Maximum number of times to re-attempt failed request. Default 2*/
  max_retries?: number;
}
const DEFAULT_OPTIONS: IHttpRequestOptions = {
  max_retries: 2,
  expiry: "30d",
  strategy: "cache-first",
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

    // TODO - purge expired from cache
  }

  public async get(url: string, options: IHttpRequestOptions = {}) {
    const { strategy, expiry, max_retries } = { ...DEFAULT_OPTIONS, ...options };

    // Forward header used in request
    const headers: KyHeadersInit = {
      "x-cache-expiry": `${shorthandToTime(expiry)}`,
      "x-cache-strategy": strategy,
    };
    const controller = new AbortController();
    const { signal } = controller;

    // TODO - consider handling cache-only/cache-first response here???
    // TODO - probably yes, and work with IDs instead of requests....

    // Handle request
    // NOTE - cache requests still go through client api for consistent response format
    return this.client.get(url, {
      headers,
      onDownloadProgress: (p) => {
        console.log("progress", p);
      },
      signal,
      retry: max_retries,
      // use custom caching (?) - or maybe default if not strategy selected
      // this would use request headers.. maybe use response headers?
      cache: strategy === "network-only" ? "no-cache" : "default",
    });
  }

  private addClientHooks() {
    this.client = this.client.extend({
      hooks: {
        beforeRequest: [
          async (req) => {
            const strategy = req.headers.get("x-cache-strategy") as IHttpRequestOptions["strategy"];
            console.log("send request", strategy);
            if (strategy === "cache-only") {
              const headers = new Headers({ "x-res-source": "cache" });
              const cacheRes = await this.cache.get(req);
              const status = cacheRes ? 200 : 400;
              return new Response(cacheRes, { status, headers });
            }
            if (this.cache.has(req)) {
              const res = await this.cache.get(req);

              // TODO - mimic response?
              // return new Response(res, { status: 200,headers:{""} });
            }
          },
        ],
        afterResponse: [
          async (req, options, res) => {
            console.log("res", res);
            if (res.status === 200) {
              console.log("after res");
              // TODO - consider conditions when to clone and extract to cache
              // vs just returning as-is
              const clone = res.clone();
              // TODO - stream to cache? instead of set
              // will depend on body type - to review

              // delay cache updates to avoid blocking UI
              setTimeout(() => {
                this.cache.set(req, clone);
              }, 500);
            }
          },
        ],
      },
    });
  }
}
