import { Injectable } from "@angular/core";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { ASSET_PACKS_DATA_LIST } from "./remote-asset.types";
import type {
  IAssetPackDownloadStatus,
  IAssetPackDownloadStatusTimestamps,
  IDBAssetPack,
} from "./remote-asset.types";

@Injectable({
  providedIn: "root",
})
/** Handles `_asset_packs` metadata persistence for remote asset downloads. */
export class RemoteAssetMetadataService {
  constructor(private dynamicDataService: DynamicDataService) {}

  public createTimestamp() {
    return new Date().toISOString();
  }

  public async setDownloadStatus(
    assetPackName: string,
    downloadStatus: IAssetPackDownloadStatus,
    timestamps: IAssetPackDownloadStatusTimestamps = {}
  ) {
    const downloadStatusUpdatedAt = this.createTimestamp();
    const downloadCompletedAt =
      downloadStatus === "completed"
        ? timestamps.downloadCompletedAt || downloadStatusUpdatedAt
        : "";
    const dbAssetPack: IDBAssetPack = {
      id: assetPackName,
      name: assetPackName,
      download_status: downloadStatus,
      download_started_at: timestamps.downloadStartedAt || downloadStatusUpdatedAt,
      download_completed_at: downloadCompletedAt,
      download_status_updated_at: downloadStatusUpdatedAt,
    };
    return this.dynamicDataService.upsert("data_list", ASSET_PACKS_DATA_LIST, dbAssetPack);
  }

  public resetAssetPacks() {
    return this.dynamicDataService.resetFlow("data_list", ASSET_PACKS_DATA_LIST);
  }
}
