import { Injectable, Injector } from "@angular/core";
import { FirebaseService } from "../../firebase/firebase.service";
import {
  IRemoteAssetProvider,
  IRemoteAssetConfig,
  IRemoteAssetDownloadOptions,
  IRemoteFileMetadata,
  appendCacheBuster,
  isAbortError,
} from "./base.remote-asset";
import { FirebaseStorage } from "@capacitor-firebase/storage";

@Injectable({
  providedIn: "root",
})
export class FirebaseRemoteAssetProvider implements IRemoteAssetProvider {
  private firebaseService: FirebaseService;
  private config: IRemoteAssetConfig;
  /**
   * Storage plugin binding, held as a field so tests can substitute it - `registerPlugin` returns a
   * Proxy that synthesises every method on property access, so the plugin cannot be spied on. Same
   * reason as the `fs` field on `HttpCacheAdapterFile`, but a field rather than a constructor
   * argument, which would fight `providedIn: "root"`.
   */
  private storage: typeof FirebaseStorage = FirebaseStorage;
  /**
   * Session-scoped switch for the public-URL fast path. Starts optimistic and flips on the first
   * forbidden response, so a deployment whose rules deny unauthenticated reads pays the wasted
   * request once rather than on every asset of every pack. Deliberately not persisted: rules can
   * change between sessions and rediscovering them costs a single request.
   */
  private publicUrlFastPathEnabled = true;

  async initialise(injector: Injector, config: IRemoteAssetConfig): Promise<void> {
    this.config = config;
    this.firebaseService = injector.get(FirebaseService);

    // Ensure Firebase app is initialized
    if (!this.firebaseService.app) {
      console.warn(`[Firebase Remote Asset] Firebase app not initialized`);
      return;
    }
  }

  public getPublicUrl(relativePath: string): string {
    if (!this.firebaseService.app || !this.firebaseService.app.options.storageBucket) {
      return "";
    }

    try {
      const filePath = `${this.config.folderName}/${relativePath}`;
      const bucketName = this.firebaseService.app.options.storageBucket;

      // Generate Firebase Storage public URL for CDN usage
      // This assumes files are stored as public in Firebase Storage
      const encodedPath = encodeURIComponent(filePath);
      return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedPath}?alt=media`;
    } catch (error) {
      console.error("[Firebase Remote Asset] Error getting public URL:", error);
      return "";
    }
  }

  public async downloadFile(
    relativePath: string,
    options: IRemoteAssetDownloadOptions = {}
  ): Promise<Blob | null> {
    if (!this.firebaseService.app) {
      return null;
    }

    try {
      // Prefer the deterministic public URL. `getDownloadUrl` is itself a network round trip, so
      // resolving locally costs one request per asset instead of two - a per-file latency tax that
      // dominates a pack of many small assets. Unauthenticated read (`allow read: if true`) is the
      // documented setup for Firebase asset packs, so this is the expected route, not a gamble.
      // An empty URL means no `storageBucket` in the JS config, which the native SDK can still
      // resolve from its own config, so that falls through rather than failing.
      if (this.publicUrlFastPathEnabled) {
        const publicUrl = this.getPublicUrl(relativePath);
        if (publicUrl) {
          // A throw here (offline, CORS, invalid URL) is left to the outer catch rather than
          // retried via the SDK: both routes share a host, so a throw almost never favours one URL
          // over the other.
          const response = await this.fetchStorageUrl(publicUrl, options);
          if (response.ok) {
            return await response.blob();
          }
          if (response.status !== 401 && response.status !== 403) {
            // No fallback here, deliberately. Anything that is not a permission failure says the
            // object is missing or storage is unhealthy, neither of which a tokenised URL fixes.
            // A wrong `storageBucket` would 404 here, but the same string is what web writes into
            // `_assets_contents`, so that deployment is already serving broken images - papering
            // over it on native would hide a fault that has to be fixed anyway.
            console.error(
              `[Firebase Remote Asset] HTTP ${response.status}: ${response.statusText}`
            );
            return null;
          }
          console.warn(
            `[Firebase Remote Asset] Unauthenticated read of ${relativePath} was forbidden (HTTP ${response.status}); using download URLs for the rest of this session`
          );
          this.publicUrlFastPathEnabled = false;
        }
      }

      // Safety net for a deployment whose rules deny unauthenticated reads, at the cost of the extra
      // round trip this method exists to avoid. Not private-bucket support: web writes
      // `getPublicUrl` straight into `_assets_contents` with no such fallback, and an
      // unauthenticated app cannot mint a URL for an object it is not allowed to read. Enforced App
      // Check also surfaces as 403 above, and will fail here too - `fetch` sends no App Check header.
      const fullPath = `${this.config.folderName}/${relativePath}`;
      const { downloadUrl } = await this.storage.getDownloadUrl({ path: fullPath });
      if (!downloadUrl) {
        return null;
      }

      const response = await this.fetchStorageUrl(downloadUrl, options);
      if (response.ok) {
        return await response.blob();
      }
      console.error(`[Firebase Remote Asset] HTTP ${response.status}: ${response.statusText}`);
      return null;
    } catch (error) {
      // Cancellation is not a download failure: reporting it as `null` would look like a missing
      // file and earn pointless retries against a transfer the caller has already abandoned
      if (isAbortError(error)) throw error;
      console.error("[Firebase Remote Asset] Error downloading file:", error);
      return null;
    }
  }

  /** Fetch a resolved storage URL - response format varies depending on platform */
  private fetchStorageUrl(url: string, options: IRemoteAssetDownloadOptions): Promise<Response> {
    const init: RequestInit = {};
    if (options.noCache) init.cache = "no-store";
    if (options.signal) init.signal = options.signal;
    return fetch(options.noCache ? appendCacheBuster(url) : url, init);
  }

  public async downloadFileAsText(
    relativePath: string,
    options: IRemoteAssetDownloadOptions = {}
  ): Promise<string | null> {
    try {
      const blob = await this.downloadFile(relativePath, options);

      if (!blob) {
        return null;
      }

      const textContent = await blob.text();
      // Check if the content is a data URL (Firebase's format sometimes)
      if (textContent.startsWith("data:application/json;base64")) {
        // Extract base64 content from data URL
        const commaIndex = textContent.indexOf(",");
        if (commaIndex !== -1 && commaIndex < textContent.length - 1) {
          const base64Content = textContent.substring(commaIndex + 1);
          return atob(base64Content);
        } else {
          console.warn(
            "[Firebase Remote Asset] Invalid data URL format returned from firebase, missing base64 content. Requested asset path: " +
              relativePath
          );
          return textContent;
        }
      }

      // Regular text content
      return textContent;
    } catch (error) {
      if (isAbortError(error)) throw error;
      console.error("[Firebase Remote Asset] Error downloading file as text:", error);
      return null;
    }
  }

  public async downloadFileFromPrivateBucket(filepath: string): Promise<Blob | null> {
    // Legacy method - delegate to downloadFile
    const relativePath = filepath.replace(`${this.config.folderName}/`, "");
    return this.downloadFile(relativePath);
  }

  public async getRemoteFileMetadata(relativePath: string): Promise<IRemoteFileMetadata | null> {
    if (!this.firebaseService.app) {
      return null;
    }

    try {
      const fullPath = `${this.config.folderName}/${relativePath}`;

      // Use Capacitor Firebase Storage to get file metadata
      const result = await this.storage.getMetadata({
        path: fullPath,
      });

      // The result contains metadata properties directly, not nested
      if (result) {
        return {
          name: relativePath.split("/").pop() || relativePath,
          size: result.size,
          lastModified: new Date(result.updatedAt).toISOString(),
          contentType: result.contentType,
        };
      }

      return null;
    } catch (error) {
      console.error("[Firebase Remote Asset] Error getting file metadata:", error);
      return null;
    }
  }
}
