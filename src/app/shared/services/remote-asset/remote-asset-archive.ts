import { Unzip, UnzipInflate } from "fflate";

export interface IStreamAssetPackArchiveOptions {
  /** Fully-resolved, fetchable archive URL, including its version parameter */
  url: string;
  /** Abort signal of the download attempt. Passed to `fetch`, so a cancel stops the transfer */
  signal: AbortSignal;
  /**
   * Expected total bytes, used for progress only when the response carries no `Content-Length`.
   * The archive is compressed so this over-estimates, hence the cap in `onProgress` callers.
   */
  fallbackTotalBytes?: number;
  /**
   * Whether an entry is wanted. Entries answering false are still read off the stream and then
   * discarded, rather than left unread - see the note on `start()` in the implementation.
   */
  shouldExtract: (entryPath: string) => boolean;
  /** Called with the complete bytes of each wanted entry, awaited before reading continues */
  onEntry: (entryPath: string, data: Uint8Array) => Promise<void>;
  /** Called as bytes arrive. `totalBytes` is undefined when neither source could supply one */
  onProgress: (bytesRead: number, totalBytes: number | undefined) => void;
}

/** Raised when the archive URL is absent from the bucket, which means falling back to per-file */
export class AssetPackArchiveNotFoundError extends Error {
  constructor(url: string) {
    super(`[REMOTE ASSETS] Asset pack archive not found: ${url}`);
    this.name = "AssetPackArchiveNotFoundError";
  }
}

/**
 * Reject entries whose path escapes the archive root. We generate these archives ourselves, so
 * this should never fire - but an extraction routine that writes wherever an archive tells it to
 * is worth two lines to not have.
 */
function isSafeEntryPath(entryPath: string): boolean {
  if (!entryPath || entryPath.startsWith("/") || entryPath.includes("\\")) return false;
  return !entryPath.split("/").some((segment) => segment === ".." || segment === ".");
}

function concatChunks(chunks: Uint8Array[], totalLength: number): Uint8Array {
  const merged = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.length;
  }
  return merged;
}

/**
 * Download an asset pack archive and hand back each wanted entry as it arrives.
 *
 * Streamed rather than fetched as a blob: real packs reach ~35MB compressed, and buffering the
 * whole response only to copy it into an `ArrayBuffer` for decompression peaks at roughly twice
 * that before any entry is inflated - enough to matter on low-end devices. Feeding chunks
 * straight into the unzipper keeps the peak to a few chunks plus the single largest entry.
 *
 * NB that peak only holds if every entry is `start()`ed, wanted or not - see `onfile` below.
 *
 * NB entry bytes are only checked against the manifest's recorded size, by the caller. fflate's
 * read path neither verifies the per-entry CRC nor exposes it to this streaming API, so checking
 * it would mean hand-parsing zip headers. Corruption is caught in practice by the deflate stream
 * failing, by that size check, and by the version-stamped URL ruling out a stale archive.
 */
export async function streamAssetPackArchive(
  options: IStreamAssetPackArchiveOptions
): Promise<void> {
  const { url, signal, fallbackTotalBytes, shouldExtract, onEntry, onProgress } = options;

  const response = await fetch(url, { signal });
  if (response.status === 404) {
    throw new AssetPackArchiveNotFoundError(url);
  }
  if (!response.ok) {
    throw new Error(`[REMOTE ASSETS] Archive download failed: HTTP ${response.status}`);
  }
  if (!response.body) {
    throw new Error("[REMOTE ASSETS] Archive response has no readable body");
  }

  const contentLengthHeader = Number(response.headers.get("content-length"));
  const totalBytes =
    Number.isFinite(contentLengthHeader) && contentLengthHeader > 0
      ? contentLengthHeader
      : fallbackTotalBytes;

  // Entries complete inside fflate's synchronous callbacks, so they are queued here and drained
  // between reads. That is what applies backpressure: without it a fast connection would race
  // ahead of the (async) file writes and hold the whole archive in memory after all.
  const readyEntries: { entryPath: string; data: Uint8Array }[] = [];
  let streamError: Error | undefined;

  const unzipper = new Unzip();
  unzipper.register(UnzipInflate);
  unzipper.onfile = (file) => {
    if (!isSafeEntryPath(file.name)) {
      streamError ??= new Error(`[REMOTE ASSETS] Unsafe archive entry path: ${file.name}`);
      return;
    }
    const wanted = shouldExtract(file.name);
    const chunks: Uint8Array[] = [];
    let length = 0;
    file.ondata = (error, chunk, final) => {
      if (error) {
        streamError ??= error;
        return;
      }
      // Unwanted entries are read and dropped rather than left unread - see `start()` below
      if (!wanted) return;
      if (chunk?.length) {
        // Copy: fflate hands back views over buffers it reuses for subsequent chunks
        chunks.push(chunk.slice());
        length += chunk.length;
      }
      if (final) {
        readyEntries.push({ entryPath: file.name, data: concatChunks(chunks, length) });
        chunks.length = 0;
      }
    };
    // Started even when the entry is unwanted. Skipping by *not* calling `start()` reads as the
    // cheaper option and is how fflate documents skipping, but it leaks: an unstarted entry has no
    // decompressor attached, so `Unzip.push` diverts its raw compressed bytes into a per-file
    // buffer (kept so a later `start()` could still replay them) that is never released. Skipping
    // every entry therefore retains the entire archive - the exact thing streaming exists to avoid,
    // and worst on a resumed install, where most entries are already on disk.
    //
    // Reading and discarding costs a copy per stored entry and an inflate per deflated one. That is
    // affordable precisely because generation stores media and deflates only text: the bulk of a
    // pack is stored, so the bulk of this is a memcpy.
    file.start();
  };

  const drainReadyEntries = async () => {
    while (readyEntries.length > 0) {
      const { entryPath, data } = readyEntries.shift();
      await onEntry(entryPath, data);
    }
  };

  const reader = response.body.getReader();
  let bytesRead = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (value?.length) {
        bytesRead += value.length;
        unzipper.push(value, false);
        onProgress(bytesRead, totalBytes);
      }
      if (done) {
        unzipper.push(new Uint8Array(0), true);
      }
      await drainReadyEntries();
      if (streamError) throw streamError;
      if (done) break;
    }
  } finally {
    // A cancelled or failed attempt must not leave the body half-read and the connection open
    reader.cancel().catch(() => undefined);
  }
}
