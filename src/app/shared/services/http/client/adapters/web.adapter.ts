import ky from "ky";
import { IHttpClientAdapter, IHttpAdapterResponse } from "../http-client";
import { IHttpRequestOptions } from "../../http.service";
import { HttpCache } from "../../cache/http-cache";
import { generateRequestKey } from "../../http.utils";

export class WebHttpClientAdapter implements IHttpClientAdapter {
  private client = ky.create();

  async request(
    url: string,
    options: IHttpRequestOptions,
    cache?: HttpCache
  ): Promise<IHttpAdapterResponse> {
    const response = await this.client.get(url, options as any);

    if (cache && response.status >= 200 && response.status < 300) {
      const key = generateRequestKey({ url, method: options.method || "get" });
      const expiryStr = options.headers?.["x-cache-expiry"] as string | undefined;
      const expiryVal = expiryStr ? Number(expiryStr) : undefined;
      // We clone the response immediately so we don't lock the return stream
      // but await the cache set to ensure synchronous guarantee as requested.
      await cache.set(key, response.clone(), expiryVal);
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
