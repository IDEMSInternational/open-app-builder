import ky from "ky";
import { IHttpClientAdapter, IHttpAdapterResponse } from "../http-client.types";
import { IHttpRequestOptions } from "../../http.service";
import { HttpCache } from "../../cache/http-cache";
import { stripCacheHeaders } from "../../http.utils";
import { deferTask } from "packages/shared/src";

export class WebHttpClientAdapter implements IHttpClientAdapter {
  private client = ky.create();

  async request(
    url: string,
    options: IHttpRequestOptions,
    cache: HttpCache
  ): Promise<IHttpAdapterResponse> {
    const requestHeaders = stripCacheHeaders(options.headers);
    const response = await this.client.get(url, { ...options, headers: requestHeaders } as any);

    // handle caching
    if (cache && response.status >= 200 && response.status < 300) {
      deferTask(async () => {
        const { cacheExpiry, cacheKey } = options;
        const expiryVal = cacheExpiry ? Number(cacheExpiry) : undefined;
        // We clone the response immediately so we don't lock the return stream
        // but await the cache set to ensure synchronous guarantee as requested.
        const cacheBody = await response.clone().blob();

        const headers: Record<string, string> = {};
        response.headers.forEach((value, name) => {
          headers[name] = value;
        });

        await cache.adapter.set(cacheKey, cacheBody);
        await cache.setMeta(cacheKey, {
          contentType: cacheBody.type,
          expiry: expiryVal,
          headers,
          size: cacheBody.size,
          status: response.status,
          url,
        });
      });
    }

    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return {
      status: response.status,
      headers,
      getUri: async () => {
        const blob = await response.clone().blob();
        const src = URL.createObjectURL(blob);
        return { src, revoke: () => URL.revokeObjectURL(src) };
      },
      getRawData: async () => {
        return response.clone().arrayBuffer();
      },
    };
  }
}
