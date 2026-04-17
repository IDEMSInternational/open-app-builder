/// <reference lib="webworker" />

import { hashUrl, ICacheManifestEntry } from "../../cache/http-cache";
import { HTTPCacheAdapterOPFS } from "../../cache/adapters/opfs.adapter";
import { generateRequestKey, stripCacheHeaders } from "../../http.utils";

addEventListener("message", async (event: MessageEvent) => {
  const { id, url, options } = event.data;

  try {
    const requestHeaders = stripCacheHeaders(options.headers);
    const response = await fetch(url, { ...options, headers: requestHeaders });

    if (response.status >= 200 && response.status < 300) {
      const cacheName = options.cacheName || "cache";
      const key = generateRequestKey({ url, method: options.method || "get" });
      const storageKey = await hashUrl(key);

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
      await cache.set(`${storageKey}.data`, blob);

      // Write Meta sidecar
      const headers: Record<string, string> = {};
      response.headers.forEach((value, name) => {
        headers[name] = value;
      });

      const expiryStr = options.headers?.["x-cache-expiry"];
      const expiry = expiryStr ? Number(expiryStr) : undefined;

      const entry: ICacheManifestEntry = {
        contentType: headers["content-type"] || "application/octet-stream",
        created: Date.now(),
        headers,
        size: blob.size,
        status: response.status,
        expiry,
      };

      const metaBlob = new Blob([JSON.stringify(entry)], { type: "application/json" });
      await cache.set(`${storageKey}.meta`, metaBlob);
    }

    postMessage({ id });
  } catch (error: any) {
    postMessage({ id, error: error.message || "Worker Fetch Error" });
  }
});
