import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { FileTransfer } from "@capacitor/file-transfer";
import { IHttpClientAdapter, IHttpAdapterResponse } from "../http-client";
import { IHttpRequestOptions } from "../../http.service";
import { HttpCache, ICacheManifestEntry, hashUrl } from "../../cache/http-cache";
import { generateRequestKey, stripCacheHeaders } from "../../http.utils";

export class CapacitorHttpClientAdapter implements IHttpClientAdapter {
  async request(
    url: string,
    options: IHttpRequestOptions,
    cache?: HttpCache
  ): Promise<IHttpAdapterResponse> {
    const key = generateRequestKey({ url, method: options.method || "get" });
    const storageKey = await hashUrl(key);
    const cacheName = options.cacheName || "cache";
    const folder = `http-cache-${cacheName}`;
    const requestHeaders = stripCacheHeaders(options.headers);

    let absolutePath = "";

    try {
      // Ensure folder exists and obtain absolute base path for Cache securely to pass to native plugin
      const cacheDirInfo = await Filesystem.getUri({ directory: Directory.Cache, path: folder });
      absolutePath = `${cacheDirInfo.uri}/${storageKey}`;
    } catch {
      await Filesystem.mkdir({ path: folder, directory: Directory.Cache, recursive: true });
      const cacheDirInfo = await Filesystem.getUri({ directory: Directory.Cache, path: folder });
      absolutePath = `${cacheDirInfo.uri}/${storageKey}`;
    }

    try {
      // Perform direct-to-disk download using FileTransfer
      // Note: FileTransfer plugin does not expose response headers, so we cannot
      // retrieve the actual Content-Type from the server. Using "application/octet-stream"
      // as a generic binary fallback. If you need accurate content-type, consider using
      // the Capacitor Http plugin instead (which does support headers).
      await FileTransfer.downloadFile({
        url,
        path: absolutePath,
        method: options.method || "GET",
        headers: requestHeaders as any,
      });

      if (cache) {
        const headers = { "content-type": "application/octet-stream" }; // Fallback - plugin doesn't expose response headers
        const expiryStr = options.headers?.["x-cache-expiry"] as string | undefined;
        const expiry = expiryStr ? Number(expiryStr) : undefined;

        const entry: ICacheManifestEntry = {
          contentType: headers["content-type"],
          created: Date.now(),
          headers,
          size: (await Filesystem.stat({ path: absolutePath })).size,
          status: 200,
          expiry,
        };

        const metaPath = `${folder}/${storageKey}.meta.json`;
        await Filesystem.writeFile({
          path: metaPath,
          directory: Directory.Cache,
          data: JSON.stringify(entry),
          encoding: Encoding.UTF8,
        });
      }

      return {
        status: 200,
        getUri: async () => {
          const src = Capacitor.convertFileSrc(absolutePath);
          return { src, revoke: () => {} };
        },
        getRawData: async () => {
          const src = Capacitor.convertFileSrc(absolutePath);
          const response = await fetch(src);
          return response.arrayBuffer();
        },
      };
    } catch (e: any) {
      // Return error adapter responses or throw standard error
      throw new Error(`FileTransfer failed: ${e.message}`);
    }
  }
}
