import { Injectable } from "@angular/core";

import { IHttpActionParams } from "./http.actions";
import ky, { KyInstance } from "ky";

import { KyHeadersInit } from "ky/distribution/types/options";
import { shorthandToTime } from "./http.utils";
import { AsyncServiceBase } from "../asyncService.base";
import { HttpCache } from "./http-cache";

/**
 * Service to handle http requests, with custom request cache management
 * For more details see [Readme](./README.md)
 */
@Injectable({ providedIn: "root" })
export class HttpService extends AsyncServiceBase {
  private client: KyInstance;
  private cache: HttpCache;

  constructor() {
    super("HTTP Service");
    this.registerInitFunction(this.init);
  }

  private async init() {
    const client = this.setupApiClient();
    this.client = client;
    const cache = new HttpCache();
    await cache.init();
    this.cache = cache;
    // TODO - purge expired from cache
  }

  public async get(url: string, params: IHttpActionParams) {
    const { strategy, _id, expiry = "30d", max_retries = 2 } = params;
    // TODO - update custom header to pass expiry to use in afterResponse hook

    if (strategy === "cache-only") {
      // TODO
    }
    if (strategy === "cache-first") {
    }
    // Prepare request
    const headers: KyHeadersInit = {};
    const controller = new AbortController();
    const { signal } = controller;
    if (expiry) {
      headers["x-cache-expire"] = `${shorthandToTime(expiry)}`;
    }
    if (_id) {
      headers["x-cache-id"] = _id;
    }
    // Handle request
    await this.client.get(url, {
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

  private setupApiClient() {
    return ky.extend({
      hooks: {
        beforeRequest: [
          async (req) => {
            if (this.cache.has(req)) {
              const res = await this.cache.get(req);

              // TODO - mimic response?
              return new Response(res, { status: 200 });
            }
          },
        ],
        afterResponse: [
          async (req, options, res) => {
            console.log("res", res);
            // TODO - stream to cache? instead of set
            await this.cache.set(req, res);
          },
        ],
      },
    });
  }
}
