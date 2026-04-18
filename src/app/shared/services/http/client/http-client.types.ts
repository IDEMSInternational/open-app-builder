import { IHttpRequestOptions } from "../http.service";
import { HttpCache } from "../cache/http-cache";

export interface IHttpAdapterResponse {
  /** Returns a safe URI (e.g., file:// on Native, blob:http:// on Web) */
  getUri(): Promise<{ src: string; revoke: () => void }>;
  /** Returns the raw data in the most efficient format for the platform */
  getRawData(): Promise<ArrayBuffer>;
  /** The HTTP Status code */
  status: number;
  /** Optional response headers */
  headers?: Record<string, string>;
}

export interface IHttpClientAdapter {
  /**
   * Fetches the resource and persists it directly to the relevant storage layer.
   * Returns an adapter response that safely exposes URIs or raw data.
   */
  request(
    url: string,
    options: IHttpRequestOptions,
    cache: HttpCache
  ): Promise<IHttpAdapterResponse>;
}
