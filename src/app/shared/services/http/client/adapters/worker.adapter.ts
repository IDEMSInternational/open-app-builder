import { IHttpClientAdapter, IHttpAdapterResponse } from "../http-client.types";
import { IHttpRequestOptions } from "../../http.service";
import { HttpCache } from "../../cache/http-cache";

export class WorkerHttpClientAdapter implements IHttpClientAdapter {
  private worker: Worker;

  constructor() {
    if (typeof Worker !== "undefined") {
      // Initialize the web worker
      this.worker = new Worker(new URL("../worker/http.worker", import.meta.url), {
        type: "module",
      });
    } else {
      throw new Error("Web Workers are not supported in this environment.");
    }
  }

  async request(
    url: string,
    options: IHttpRequestOptions,
    cache: HttpCache
  ): Promise<IHttpAdapterResponse> {
    return new Promise((resolve, reject) => {
      const messageId = Math.random().toString(36).substring(2, 15);
      const { cacheKey } = options;

      const handleMessage = (event: MessageEvent) => {
        if (event.data.id === messageId) {
          this.worker.removeEventListener("message", handleMessage);

          if (event.data.error) {
            reject(new Error(event.data.error));
          } else {
            // The file has already been saved to OPFS by the worker.
            // We read directly from the cache to return URI / Raw Data.
            resolve({
              status: 200,
              getUri: async () => cache.adapter.getUrl(cacheKey),
              getRawData: async () => cache.adapter.get(cacheKey),
            });
          }
        }
      };

      this.worker.addEventListener("message", handleMessage);

      // We instruct the worker to perform the network fetch and save it
      // directly to the named cache via OPFS.
      this.worker.postMessage({
        id: messageId,
        url,
        options,
      });
    });
  }
}
