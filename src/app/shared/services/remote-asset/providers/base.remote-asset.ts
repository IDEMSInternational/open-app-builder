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
  /**
   * Abort an in-flight transfer. Without this a cancel only takes effect at the next checkpoint, so
   * a large file keeps downloading after the user has cancelled and its bytes are thrown away.
   * Cancellation surfaces as a rejected `AbortError`, never as a `null` result, so callers can tell
   * "stopped on purpose" apart from "could not be fetched".
   */
  signal?: AbortSignal;
}

/**
 * Distinguish a cancelled transfer from a failed one. `fetch` rejects with a `DOMException` named
 * `AbortError`, which is not reliably an `instanceof Error`, so match on the name instead.
 */
export function isAbortError(error: unknown): boolean {
  return (error as { name?: string } | null | undefined)?.name === "AbortError";
}

/**
 * The rejection an aborted `fetch` produces, for the provider calls that have no signal of their own
 * to take. Raising it in place of making the call is the only way those honour a cancel that has
 * already landed, and matching `fetch`'s shape keeps `isAbortError` the single thing callers check.
 */
export function createAbortError(): Error {
  return new DOMException("The operation was aborted", "AbortError") as unknown as Error;
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
