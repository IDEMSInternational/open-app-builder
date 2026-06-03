import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { FileTransfer } from "@capacitor/file-transfer";
import { IHttpClientAdapter, IHttpAdapterResponse } from "../http-client.types";
import { IHttpRequestOptions } from "../../http.service";
import { HttpCache } from "../../cache/http-cache";

export class CapacitorHttpClientAdapter implements IHttpClientAdapter {
  async request(
    url: string,
    options: IHttpRequestOptions,
    cache: HttpCache
  ): Promise<IHttpAdapterResponse> {
    const { cacheName = "cache", cacheKey, cacheExpiry, headers } = options;
    const folder = `http-cache-${cacheName}`;

    let absolutePath = "";

    try {
      // Ensure folder exists and obtain absolute base path for Cache securely to pass to native plugin
      const cacheDirInfo = await Filesystem.getUri({ directory: Directory.Cache, path: folder });
      absolutePath = `${cacheDirInfo.uri}/${cacheKey}`;
    } catch {
      await Filesystem.mkdir({ path: folder, directory: Directory.Cache, recursive: true });
      const cacheDirInfo = await Filesystem.getUri({ directory: Directory.Cache, path: folder });
      absolutePath = `${cacheDirInfo.uri}/${cacheKey}`;
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
        headers,
      });

      // Populate cache meta entry
      const expiry = cacheExpiry ? Number(cacheExpiry) : undefined;

      const { size } = await Filesystem.stat({ path: absolutePath });

      await cache.setMeta(cacheKey, {
        contentType: "application/octet-stream",
        headers: {}, // no specific response headers
        size,
        status: 200,
        expiry,
        url,
      });
      //

      return {
        status: 200,
        getUri: async () => {
          const src = Capacitor.convertFileSrc(absolutePath);
          return { src, revoke: () => null };
        },
        getRawData: async () => {
          const src = Capacitor.convertFileSrc(absolutePath);
          const response = await fetch(src);
          return response.blob();
        },
      };
    } catch (e: any) {
      // Return error adapter responses or throw standard error
      throw new Error(`FileTransfer failed: ${e.message}`);
    }
  }
}
