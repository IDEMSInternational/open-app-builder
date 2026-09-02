import { Injector } from "@angular/core";

export interface IRemoteAssetProvider {
  /** Initialize the provider with configuration */
  initialise(injector: Injector, config: IRemoteAssetConfig): Promise<void>;

  /** Deterministic public URL for a file. Assumes the bucket allows unauthenticated read. */
  getPublicUrl(relativePath: string): string;

  /** Download file using provider's own SDK/methods (preferred) */
  downloadFile(relativePath: string, options?: IRemoteAssetDownloadOptions): Promise<Blob | null>;

  /** Download file and return as text string (for JSON/XML files) */
  downloadFileAsText(
    relativePath: string,
    options?: IRemoteAssetDownloadOptions
  ): Promise<string | null>;

  /** Download file from private bucket (legacy method) */
  downloadFileFromPrivateBucket(filepath: string): Promise<Blob | null>;

  /** Get file metadata */
  getRemoteFileMetadata(relativePath: string): Promise<IRemoteFileMetadata | null>;
}

export interface IRemoteAssetConfig {
  /** Supabase bucket name only; Firebase reads `firebase.config.storageBucket` instead. */
  bucketName: string;
  /** Prefix prepended to object paths within the bucket (all providers). */
  folderName: string;
}

export interface IRemoteAssetDownloadOptions {
  /**
   * Bypass every cache between the app and the bucket. Only needed for asset pack manifests, whose
   * whole purpose is to report the *current* published version - a cached manifest silently means
   * updates are never detected, and does so in a way that passes every test on a fresh install.
   * Asset files themselves are fetched once and keyed by checksum, so they do not need it.
   */
  noCache?: boolean;
}

/**
 * Defeat CDN and proxy caching by making the URL unique per request. Complements `cache: "no-store"`,
 * which only governs the local HTTP cache - an intermediary can still serve a stale object for a URL
 * it has seen before.
 */
export function appendCacheBuster(url: string): string {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}_oab_ts=${Date.now()}`;
}

export interface IRemoteFileMetadata {
  name: string;
  size?: number;
  lastModified?: string;
  contentType?: string;
}
