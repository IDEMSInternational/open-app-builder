/** Name of the protected data list storing bundled and downloaded asset contents */
export const ASSET_CONTENTS_DATA_LIST = "_assets_contents";
/** Name of the protected data list to store asset pack metadata */
export const ASSET_PACKS_DATA_LIST = "_asset_packs";

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
}

export interface IAssetPackEnsureDownloadedParams {
  /** Single asset pack name */
  asset_pack?: string;
  /** One or more asset pack names */
  asset_pack_list?: string[];
}
