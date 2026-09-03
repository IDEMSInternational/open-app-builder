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
}

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
}

export interface IAssetPackEnsureDownloadedParams extends IAssetPackDownloadParams {
  /** One or more asset pack names, as an array or JSON string array */
  asset_pack_list?: string | string[];
  /** When false, start downloads without blocking the action queue. Defaults to true. */
  await?: boolean | string;
}

/** Options shared by the service methods that start a download */
interface IAssetPackDownloadOptions {
  /** When false, return once a download is registered without waiting for completion. Defaults to true. */
  awaitCompletion?: boolean;
  /** See `IAssetPackDownloadParams.debug_download_delay_ms`. Defaults to 0 (no delay). */
  debugDownloadDelayMs?: number;
}

export type IEnsureAssetPacksDownloadedOptions = IAssetPackDownloadOptions;

export interface IDownloadAssetPackByNameOptions extends IAssetPackDownloadOptions {
  /** Called synchronously once a background download is registered. Only used when awaitCompletion is false. */
  onDownloadStarted?: (completion: Promise<boolean>) => void;
}
