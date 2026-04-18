/// <reference lib="webworker" />

import { ICacheManifestEntry } from "../../cache/http-cache";
import { HTTPCacheAdapterOPFS } from "../../cache/adapters/opfs.adapter";
import { IHttpRequestOptions } from "../../http.service";

addEventListener("message", async (event: MessageEvent) => {
  const { id, url, options } = event.data;
  const { cacheExpiry, cacheKey, cacheName, headers } = options as IHttpRequestOptions;

  try {
    const response = await fetch(url, { ...options, headers });

    if (response.status >= 200 && response.status < 300) {
      // Initialize OPFS
      const opfsRoot = await navigator.storage.getDirectory();
      const directoryHandle = await opfsRoot.getDirectoryHandle(`http-cache-${cacheName}`, {
        create: true,
      });
      const cache = new HTTPCacheAdapterOPFS(directoryHandle);

      // Extract headers before consuming body
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, name) => {
        responseHeaders[name] = value;
      });

      const contentType = responseHeaders["content-type"] || "application/octet-stream";
      const contentLength = responseHeaders["content-length"];

      // Save Data using streaming for memory efficiency with large files
      if (!response.body) {
        throw new Error("Response body is null");
      }
      await cache.setStream(cacheKey, response.body);

      const expiry = cacheExpiry ? Number(cacheExpiry) : undefined;

      const entry: ICacheManifestEntry = {
        contentType,
        created: Date.now(),
        headers: responseHeaders,
        size: contentLength ? Number(contentLength) : 0,
        status: response.status,
        expiry,
        url,
      };

      const metaBlob = new Blob([JSON.stringify(entry)], { type: "application/json" });
      await cache.set(`${cacheKey}.meta.json`, metaBlob);
    }

    postMessage({ id });
  } catch (error: any) {
    postMessage({ id, error: error.message || "Worker Fetch Error" });
  }
});
