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

      // Save Data
      // Note: While streaming using ReadableStream is preferable for RAM,
      // some platforms (iOS) struggle with WritableStreams, so we rely on the existing Blob integration
      const blob = await response.blob();
      await cache.set(cacheKey, blob);

      const expiry = cacheExpiry ? Number(cacheExpiry) : undefined;

      const entry: ICacheManifestEntry = {
        contentType: headers["content-type"] || "application/octet-stream",
        created: Date.now(),
        headers,
        size: blob.size,
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
