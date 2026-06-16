/**
 * Represents an asset pack entry stored in the `_asset_packs` protected data list.
 */
export type IAssetPackDownloadStatus = "in_progress" | "completed" | "error";

export interface IDBAssetPack {
  /** Asset pack name, used as the unique row identifier */
  id: string;
  /** Human-readable asset pack name (mirrors id for now; may diverge if display names are added) */
  name: string;
  /** Last known download status. Rows are upserted, so this reflects the most recent attempt */
  download_status: IAssetPackDownloadStatus;
}
