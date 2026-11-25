import type { FlowTypes } from "../../model";
import type { IAssetEntry, IAssetOverrideProps } from "packages/data-models";

/** Name of the protected data list storing bundled and downloaded asset contents */
export const ASSET_CONTENTS_DATA_LIST = "_assets_contents";

/** Name of the protected data list to store asset pack metadata */
export const ASSET_PACKS_DATA_LIST = "_asset_packs";

/**
 * Folder (within the deployment's local storage) that all downloaded asset pack files live under,
 * shared across packs and keyed only by manifest-relative path. NB the deployment folder also holds
 * non-asset files (e.g. the cached auth profile picture), so deletion must always target this
 * subfolder rather than the deployment folder itself.
 */
export const REMOTE_ASSET_STORAGE_FOLDER = "remote_assets";

/**
 * Minimum interval between successful remote version checks for a given pack. Checks cost a
 * manifest fetch per pack, so without this an `ensure_downloaded` on every template entry would
 * mean a round trip every time.
 */
export const VERSION_CHECK_MIN_INTERVAL_MS = 1000 * 60 * 60; // 1 hour

/**
 * Shorter retry window after a check that reached the network and failed, so one flaky response
 * does not suppress updates for the full interval.
 * NB `asset_pack: download` bypasses both throttles, so it doubles as the manual-testing and
 * recovery escape hatch.
 */
export const VERSION_CHECK_FAILURE_BACKOFF_MS = 1000 * 60 * 15; // 15 minutes

/**
 * Consecutive archive failures (corrupt stream, 5xx, unzip error) after which a pack falls back to
 * per-file downloads for the rest of the session. Being offline does not count - that is parked
 * and retried, not a failure of the archive.
 *
 * Held in memory only: persisting it would strand a pack on the slow path after two transient
 * blips, with nothing to clear it.
 */
export const ASSET_PACK_ARCHIVE_FAILURE_LIMIT = 2;

/**
 * How many completed `_assets_contents` rows to accumulate before writing them as one bulk
 * operation. Bounds how much written-but-unrecorded work an interruption discards: unflushed
 * files are on disk but re-download next attempt, which is the safe direction but wasted effort.
 */
export const ASSET_CONTENTS_FLUSH_INTERVAL = 25;

/** Minimum gap between persisted download-progress writes, to keep chunk-rate updates off the db */
export const DOWNLOAD_PROGRESS_WRITE_INTERVAL_MS = 500;

/**
 * Headroom required on top of a pack's outstanding size before its download may start. The check is
 * an estimate: block rounding adds a little per file, and the device keeps being used meanwhile.
 */
export const ASSET_PACK_STORAGE_MARGIN_RATIO = 0.1;

/**
 * Floor on that headroom: 10% of a 2MB pack is 200kb, which protects nothing. A floor on the
 * MARGIN, not on free space - a pack with nothing outstanding skips the check, so an up-to-date
 * pack is never refused for room it does not need.
 *
 * 50MB, DECIDED against the 100MB originally proposed in #3677: a 100MB floor refuses a 2MB pack
 * on a device with 99MB free, which is room for it fifty times over. Please do not raise it back
 * without a device-measured reason to.
 */
export const ASSET_PACK_STORAGE_MARGIN_MIN_BYTES = 50 * 1024 * 1024; // 50MB

/**
 * Retries allowed for a single download (asset slot or pack manifest) before it counts as failed.
 * A pack only completes when every slot does, so without retries one transient blip on one file of
 * a hundred sends the pack to `error` and it needs an explicit re-trigger - by far the most likely
 * way a pack fails on the connections these are fetched over.
 */
export const ASSET_DOWNLOAD_RETRY_LIMIT = 2;

/**
 * Base for the exponential backoff between slot attempts, giving 300ms then 600ms. Long enough to
 * ride out a brief drop, short enough that a pack of failing assets still fails promptly.
 */
export const ASSET_DOWNLOAD_RETRY_BASE_DELAY_MS = 300;

/**
 * Consecutive asset slot failures (each already having spent its full retry allowance) that end the
 * pack walk early. Downloads are serial, so without this a dead bucket or an unpublished pack pays
 * every file's full allowance in turn - retries and backoff included - before the pack can reach
 * `error`, which on a pack of a few hundred files is minutes of sleeping to reach a conclusion that
 * was clear after the first handful.
 *
 * Counted *consecutively* and reset by any slot that succeeds (including one skipped as already on
 * disk), so this only trips when nothing is getting through. A bad publish missing scattered files
 * still walks the whole pack and downloads everything that is there.
 */
export const ASSET_DOWNLOAD_CONSECUTIVE_FAILURE_LIMIT = 5;

/**
 * Prefix marking an `_assets_contents` `filePath` as a file this app downloaded to native storage.
 * What follows the prefix is the pack-relative target path, i.e. the same value passed to
 * `FileManagerService.saveFile`.
 *
 * An absolute path must never be persisted here. iOS relocates the app container on update (Apple
 * TN2285: "the absolute path to the app's container [...] will change [...] you must only save paths
 * to files relative to your application container"), so a stored absolute path silently goes stale
 * and every downloaded asset stops rendering while `_asset_packs` still reports the pack as
 * downloaded. Storing the relative path instead lets it be resolved against the *current* container
 * at read time, every session.
 */
export const LOCAL_ASSET_PATH_PREFIX = "local://";

/**
 * Marks an absolute webview path written by an app version predating `local://`.
 * `Capacitor.convertFileSrc` always routes local files through this segment, whatever scheme the
 * platform is configured with - `capacitor://localhost/_capacitor_file_/...` on iOS,
 * `http(s)://localhost/_capacitor_file_/...` on Android (see `server.androidScheme`) - so matching
 * the segment rather than the scheme keeps every platform's legacy rows recognisable.
 */
const LEGACY_WEBVIEW_FILE_SEGMENT = "/_capacitor_file_/";

/** Format a pack-relative target path for storage in `_assets_contents.filePath` */
export function toLocalAssetPath(targetPath: string) {
  return `${LOCAL_ASSET_PATH_PREFIX}${targetPath}`;
}

/**
 * Recover the pack-relative target path from an `_assets_contents` `filePath`.
 *
 * Also handles the absolute paths written before `local://` existed: those embed a container path
 * that may now be stale, but everything after the deployment folder is still the target path, so
 * rows written by an older app version resolve correctly without needing a migration.
 *
 * NB legacy parsing keys off the *current* deployment name, since that is the folder `saveFile`
 * inserts. Renaming a deployment therefore orphans any legacy row still holding the old name - such
 * rows re-download once and are then stored as `local://`, so it self-corrects at the cost of one
 * fetch rather than breaking.
 *
 * @returns the target path, or undefined if the value is not a locally downloaded asset (a bundled
 * asset's relative path, or a provider URL on web)
 */
export function getLocalAssetTargetPath(filePath: string, deploymentName: string) {
  if (filePath.startsWith(LOCAL_ASSET_PATH_PREFIX)) {
    return filePath.slice(LOCAL_ASSET_PATH_PREFIX.length);
  }
  const isLegacyLocalPath =
    filePath.includes(LEGACY_WEBVIEW_FILE_SEGMENT) || filePath.startsWith("file://");
  if (!isLegacyLocalPath) return undefined;
  // e.g. "capacitor://localhost/_capacitor_file_/<container>/Documents/<deployment>/<targetPath>"
  // Taking the FIRST match: the container prefix ahead of it is OS-structured (a UUID path on iOS,
  // the package dir on Android) and so will not contain the deployment folder, whereas an authored
  // target path is free to contain a folder that happens to share the deployment's name.
  const deploymentFolder = `/${deploymentName}/`;
  const deploymentFolderIndex = filePath.indexOf(deploymentFolder);
  if (deploymentFolderIndex === -1) return undefined;
  return filePath.slice(deploymentFolderIndex + deploymentFolder.length);
}

/**
 * Represents an asset pack entry stored in the `_asset_packs` protected data list.
 */
export type IAssetPackDownloadStatus =
  | "in_progress"
  | "waiting_for_connection"
  | "cancelled"
  | "completed"
  | "error"
  | "insufficient_storage";

export interface IDBAssetPack {
  /** Asset pack name, used as the unique row identifier */
  id: string;
  /** Human-readable asset pack name (mirrors id for now; may diverge if display names are added) */
  name: string;
  /** Last known download status. Rows are upserted, so this reflects the most recent attempt */
  download_status: IAssetPackDownloadStatus;
  /** ISO timestamp for when the current download attempt started */
  download_started_at: string;
  /** ISO timestamp for when the current download attempt completed, empty until completed */
  download_completed_at: string;
  /** ISO timestamp for the most recent status change */
  download_status_updated_at: string;
  /** Total number of asset files in the pack, inferred from the manifest */
  assets_total_count: number;
  /**
   * Megabytes that must be free for this pack's download to go ahead, for an author's out-of-space
   * warning. This is the threshold the check applied - outstanding manifest size plus the margin
   * (`ASSET_PACK_STORAGE_MARGIN_*`) - NOT the raw pack size, so a user who frees this much is
   * guaranteed to get past the check. Reporting the raw size instead would send them round a loop
   * of freeing the stated amount and being refused again.
   *
   * Set by `insufficient_storage` and cleared by the statuses that settle a pack (`completed`,
   * `error`, `cancelled`), so it cannot linger on a pack that has since downloaded. It deliberately
   * SURVIVES `in_progress` and `waiting_for_connection`: a retry passes through those before it can
   * re-check, and clearing there would blink an author's warning to "needs 0 MB" and back. So a
   * non-zero value means "last refused needing this much", not "out of space right now" - gate the
   * warning on `download_status`, as the author docs' example does.
   *
   * Manifest size plus a fixed constant carries nothing of the free-space reading Apple's E174.1
   * forbids leaving the device - see `FileManagerService.getFreeDiskSpaceBytes`.
   */
  download_size_mb: number;
  /** Number of asset files downloaded so far in the current attempt */
  assets_downloaded_count: number;
  /**
   * Percentage complete for the current attempt, 0-100.
   *
   * Exists because `assets_downloaded_count` is a coarse bar: pack files range from under a
   * kilobyte to a couple of megabytes, so a file count jumps unevenly. This tracks bytes when
   * downloading an archive and files otherwise, so authors get one field that moves smoothly
   * whichever way a pack was fetched - which matters because that choice is invisible to
   * authoring.
   */
  download_progress_percent: number;
  /**
   * Manifest version at which every file in the pack was verified downloaded. Only advances on a
   * fully successful download, so a partially applied update leaves it at the previous value and
   * the next check retries. Empty for packs downloaded before versioning existed.
   */
  version: string;
  /** Manifest version last seen remotely. Empty until a version check has succeeded */
  available_version: string;
  /** True when a successful check found a remote version differing from the downloaded one */
  update_available: boolean;
  /**
   * True once the pack has reached `completed` at least once, and never cleared except by `reset`.
   * Means "this pack has been usable before" - NOT "this attempt is an update". It is what lets a
   * failed or cancelled attempt restore `completed` instead of stranding a working pack in
   * `error`, and it must survive process death: a killed update sits at `in_progress`, which is
   * otherwise indistinguishable from a first download when resumed on next launch.
   */
  has_completed_download: boolean;
  /** ISO timestamp of the last SUCCESSFUL version check. Drives staleness reporting */
  version_checked_at: string;
  /**
   * ISO timestamp of the last version check ATTEMPT, successful or not. Drives throttling.
   * Always >= `version_checked_at`, and strictly greater exactly when the last attempt failed.
   */
  version_check_attempted_at: string;
  /**
   * "failed" means the network was reached and the check still failed (bad publish, 404,
   * unparseable manifest) - a more alarming signal than simply being offline, which records
   * nothing at all and shows up as `version_checked_at` going stale.
   */
  version_check_status: IAssetPackVersionCheckStatus;
}

export type IAssetPackVersionCheckStatus = "never" | "ok" | "failed";

/**
 * What a storage check found for one pack. Every figure comes from the manifest and
 * `_assets_contents` EXCEPT `freeBytes`, which comes from the disk-space API.
 */
export interface IAssetPackStorageReport {
  /** Manifest size of every slot not already held at the current version */
  outstandingBytes: number;
  /** `outstandingBytes` plus the margin: what the device must actually have free. 0 when nothing
   * is outstanding, or when no outstanding file declared a size */
  requiredBytes: number;
  /** Slots still to download */
  outstandingSlotCount: number;
  /** Outstanding slots with no `size_kb`. They count as 0, so the pack is under-estimated */
  unknownSizeSlotCount: number;

  /** Free space, or undefined when it could not be read. Never persist or display this */
  freeBytes?: number;
  /** False only when free space is known AND falls short; unknown is always sufficient */
  isSufficient: boolean;
}

/**
 * Stops a download the device has no room for. Its own type because it must not be retried as an
 * offline park, and resolves to its own `download_status` rather than `error`.
 *
 * The `message` must never quote `report.freeBytes`. Error messages can reach Crashlytics via
 * `ErrorHandlerService`, and E174.1 forbids the free-space reading leaving the device - the sizes
 * below come from the manifest, which is why the message is safe to log. For the same reason the
 * handler for this logs `e.message`, never the error object, which does carry `freeBytes`.
 */
export class AssetPackInsufficientStorageError extends Error {
  constructor(
    public assetPackName: string,
    public report: IAssetPackStorageReport
  ) {
    super(
      `[REMOTE ASSETS] Not enough free space to download asset pack: ${assetPackName} ` +
        `(needs ${formatBytesAsMb(report.requiredBytes)}MB free for ` +
        `${formatBytesAsMb(report.outstandingBytes)}MB of files)`
    );
    this.name = "AssetPackInsufficientStorageError";
  }
}

/**
 * Bytes as megabytes to one decimal place, for author-facing figures and logs. A non-zero size
 * never rounds to 0, since "needs 0 MB" reads as a bug.
 */
export function formatBytesAsMb(bytes: number) {
  const mb = Math.round((bytes / (1024 * 1024)) * 10) / 10;
  return bytes > 0 ? Math.max(mb, 0.1) : 0;
}

export interface IAssetPackDownloadStatusTimestamps {
  downloadStartedAt?: string;
  downloadCompletedAt?: string;
}

export interface IAssetPackAssetCounts {
  assetsTotalCount?: number;
  assetsDownloadedCount?: number;
}

export interface IAssetPackProgress {
  /** Percentage complete for the current attempt, 0-100. See `IDBAssetPack.download_progress_percent` */
  downloadProgressPercent?: number;
}

/**
 * One downloadable file within a pack - a manifest entry's base file, or one of its theme/language
 * overrides - resolved against local storage before any fetching begins.
 */
export interface IAssetPackSlotPlan {
  assetEntry: IAssetEntry;
  overrideProps?: IAssetOverrideProps;
  /** Path within the pack: the archive entry name, and the suffix of the remote object path */
  relativePath: string;
  /** Where the file lives in local storage */
  targetPath: string;
  slotChecksum: string | undefined;
  slotSizeKb: number | undefined;
  /** Whether the resume gate found a trustworthy local copy already on disk */
  alreadyDownloaded?: boolean;
  /** Whether this attempt has written and integrated the slot */
  settled?: boolean;
  /**
   * Whether the slot's outcome has been handed to the `AssetContentsWriter`. Distinct from
   * `settled`, which means the file was actually integrated: a slot the archive delivered at the
   * wrong size, or failed to save, is settled with the writer as a *failure* while staying
   * unintegrated. Tracking both is what stops the end-of-stream sweep settling such a slot twice
   * and releasing its row before the rest of it has arrived.
   */
  writerSettled?: boolean;
}

export interface IActiveAssetPackDownload {
  abortController: AbortController;
  downloadStartedAt: string;
  removeConnectionStatusListener: () => void;
  /**
   * Resolves with the download result. Set when the record is created so a concurrent request for
   * the same pack can always join this in-flight attempt by awaiting it.
   */
  completion: Promise<boolean>;
}

/** Params accepted by every `asset_pack` action that starts a download */
export interface IAssetPackDownloadParams {
  /**
   * Single asset pack name. For `download` this is an alternative to naming the pack as an action
   * arg (`asset_pack: download: my_pack`), so both download actions can be authored the same way.
   */
  asset_pack?: string;
  /**
   * Manual testing aid: artificially pause for this many ms before each asset file, to open a
   * reliable window for interrupting a download (e.g. force-quitting the app mid-pack).
   * Omit outside local testing - the delay applies to skipped files too, so it also masks the
   * speed-up that resume is supposed to give.
   */
  debug_download_delay_ms?: number | string;
  /**
   * Manual testing aid: treat the device as having this many MB free, instead of reading it. Lets
   * the out-of-space path be exercised without filling a device - `debug_free_space_mb: 0` refuses
   * any pack - and, upward, lets a genuinely full test device through.
   *
   * Simulates the *reading*, not the threshold, so the margin maths and the `download_size_mb` an
   * author's warning shows are the real ones a user would get. Omit outside local testing: left in,
   * it would decide every download on this pack.
   */
  debug_free_space_mb?: number | string;
}

export interface IAssetPackEnsureDownloadedParams extends IAssetPackDownloadParams {
  /** One or more asset pack names, as an array or JSON string array */
  asset_pack_list?: string | string[];
  /** When true, block the action queue until downloads finish. Defaults to false (background). */
  await?: boolean | string;
  /**
   * When false, skip the remote version check for packs already downloaded. Defaults to true.
   * Checks never block the action queue regardless of `await`.
   */
  check_for_updates?: boolean | string;
}

/**
 * Testing-only overrides, resolved from an attempt's `debug_*` action params and carried down to
 * wherever each takes effect. Grouped so the download paths thread one value rather than a growing
 * list of bare numbers.
 */
export interface IAssetPackDebugOverrides {
  /** See `IAssetPackDownloadParams.debug_download_delay_ms`. Defaults to 0 (no delay). */
  debugDownloadDelayMs?: number;
  /**
   * See `IAssetPackDownloadParams.debug_free_space_mb`, in bytes. Undefined reads the real device.
   */
  debugFreeSpaceBytes?: number;
}

/** Options shared by the service methods that start a download */
interface IAssetPackDownloadOptions extends IAssetPackDebugOverrides {
  /** When false, return once a download is registered without waiting for completion. Defaults to true. */
  awaitCompletion?: boolean;
}

export interface IEnsureAssetPacksDownloadedOptions extends IAssetPackDownloadOptions {
  /**
   * When false, skip the remote version check for packs already downloaded. Defaults to true.
   * Checks are always started off the action queue, so this does not interact with awaitCompletion.
   */
  checkForUpdates?: boolean;
}

export interface IDownloadAssetPackByNameOptions extends IAssetPackDownloadOptions {
  /** Called synchronously once a background download is registered. Only used when awaitCompletion is false. */
  onDownloadStarted?: (completion: Promise<boolean>) => void;
  /**
   * Manifest already fetched by a version check, used in place of the first fetch to avoid a
   * duplicate round trip. Deliberately used for the first download attempt only - a retry after an
   * offline park may be much later, by which point the pack could have been republished again.
   */
  manifest?: FlowTypes.AssetPack;
}
