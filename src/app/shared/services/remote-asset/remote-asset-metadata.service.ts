import { Injectable } from "@angular/core";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { ASSET_PACKS_DATA_LIST } from "./remote-asset.types";
import type {
  IAssetPackAssetCounts,
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
    timestamps: IAssetPackDownloadStatusTimestamps = {},
    assetCounts: IAssetPackAssetCounts = {}
  ) {
    const existingAssetPack = await this.getAssetPack(assetPackName);
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
      assets_total_count:
        assetCounts.assetsTotalCount ?? existingAssetPack?.assets_total_count ?? 0,
      assets_downloaded_count:
        assetCounts.assetsDownloadedCount ?? existingAssetPack?.assets_downloaded_count ?? 0,
    };
    return this.dynamicDataService.upsert("data_list", ASSET_PACKS_DATA_LIST, dbAssetPack);
  }

  public async setAssetCounts(assetPackName: string, assetCounts: IAssetPackAssetCounts) {
    const update: Partial<IDBAssetPack> = {};
    if (assetCounts.assetsTotalCount !== undefined) {
      update.assets_total_count = assetCounts.assetsTotalCount;
    }
    if (assetCounts.assetsDownloadedCount !== undefined) {
      update.assets_downloaded_count = assetCounts.assetsDownloadedCount;
    }
    return this.dynamicDataService.update<Partial<IDBAssetPack>>(
      "data_list",
      ASSET_PACKS_DATA_LIST,
      assetPackName,
      update
    );
  }

  public async isDownloadCompleted(assetPackName: string) {
    const assetPack = await this.getAssetPack(assetPackName);
    return assetPack?.download_status === "completed";
  }

  private async getAssetPack(assetPackName: string) {
    const assetPacks = await this.dynamicDataService.snapshot<IDBAssetPack>(
      "data_list",
      ASSET_PACKS_DATA_LIST
    );
    return assetPacks.find((assetPack) => assetPack.id === assetPackName);
  }

  public resetAssetPacks() {
    return this.dynamicDataService.resetFlow("data_list", ASSET_PACKS_DATA_LIST);
  }
}
