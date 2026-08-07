import type { FlowTypes } from "../../model";

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
 * Represents an asset pack entry stored in the `_asset_packs` protected data list.
 */
export type IAssetPackDownloadStatus =
  | "in_progress"
  | "waiting_for_connection"
  | "cancelled"
  | "completed"
  | "error";

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
  /** Number of asset files downloaded so far in the current attempt */
  assets_downloaded_count: number;
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

export interface IAssetPackDownloadStatusTimestamps {
  downloadStartedAt?: string;
  downloadCompletedAt?: string;
}

export interface IAssetPackAssetCounts {
  assetsTotalCount?: number;
  assetsDownloadedCount?: number;
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
   * Manual testing aid: artificially pause for this many ms before each asset file, to open a
   * reliable window for interrupting a download (e.g. force-quitting the app mid-pack).
   * Omit outside local testing - the delay applies to skipped files too, so it also masks the
   * speed-up that resume is supposed to give.
   */
  debug_download_delay_ms?: number | string;
}

export interface IAssetPackEnsureDownloadedParams extends IAssetPackDownloadParams {
  /** Single asset pack name */
  asset_pack?: string;
  /** One or more asset pack names, as an array or JSON string array */
  asset_pack_list?: string | string[];
  /** When false, start downloads without blocking the action queue. Defaults to true. */
  await?: boolean | string;
  /**
   * When false, skip the remote version check for packs already downloaded. Defaults to true.
   * Checks never block the action queue regardless of `await`.
   */
  check_for_updates?: boolean | string;
}

/** Options shared by the service methods that start a download */
interface IAssetPackDownloadOptions {
  /** When false, return once a download is registered without waiting for completion. Defaults to true. */
  awaitCompletion?: boolean;
  /** See `IAssetPackDownloadParams.debug_download_delay_ms`. Defaults to 0 (no delay). */
  debugDownloadDelayMs?: number;
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
