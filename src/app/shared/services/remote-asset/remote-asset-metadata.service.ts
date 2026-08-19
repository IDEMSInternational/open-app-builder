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

  /** Tail of the chain that keeps status writes in the order they were issued */
  private statusWriteQueue: Promise<unknown> = Promise.resolve();

  public createTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Run status writes one at a time, in issue order. `dynamicDataService.upsert` awaits internally
   * before it writes, so two concurrent status writes can otherwise be *applied* in the opposite
   * order to the one they were issued in - and `cancel_download` runs immediately, mid-attempt, so
   * that reordering is reachable: the cancelled attempt's `in_progress` write lands after the
   * `cancelled` one and the pack looks resumable again on next launch.
   * Serialising is also what makes the guards in `setDownloadStatus` meaningful, since they then run
   * at write time rather than at issue time. Only db writes are queued, never a download, so a
   * cancel still takes effect immediately - it aborts and deregisters its attempt synchronously,
   * before any of this is awaited.
   */
  private queueStatusWrite<T>(write: () => Promise<T>) {
    const result = this.statusWriteQueue.then(write, write);
    // a rejected write must not wedge every write queued behind it
    this.statusWriteQueue = result.catch(() => undefined);
    return result;
  }

  /**
   * @param options.signal abort signal of the download attempt this status belongs to, if any. An
   * aborted attempt writes nothing - `cancel_download` runs immediately, so it can land at any point
   * mid-attempt, and a write from the attempt it cancelled must not resurrect the pack.
   */
  public setDownloadStatus(
    assetPackName: string,
    downloadStatus: IAssetPackDownloadStatus,
    timestamps: IAssetPackDownloadStatusTimestamps = {},
    assetCounts: IAssetPackAssetCounts = {},
    options: { signal?: AbortSignal } = {}
  ) {
    return this.queueStatusWrite(async () => {
      if (options.signal?.aborted) return;
      const existingAssetPack = await this.getAssetPack(assetPackName);
      if (options.signal?.aborted) return;
      const downloadStatusUpdatedAt = this.createTimestamp();
      const downloadStartedAt = timestamps.downloadStartedAt || downloadStatusUpdatedAt;
      // `cancelled` is sticky against the attempt that was cancelled, whether or not that attempt
      // passed us a signal. Only a *new* attempt clears it, identified by a later start timestamp,
      // so an explicit re-trigger still works while a straggling write cannot undo the cancel.
      if (
        existingAssetPack?.download_status === "cancelled" &&
        downloadStatus !== "cancelled" &&
        downloadStartedAt <= existingAssetPack.download_started_at
      ) {
        return;
      }
      const downloadCompletedAt =
        downloadStatus === "completed"
          ? timestamps.downloadCompletedAt || downloadStatusUpdatedAt
          : "";
      const dbAssetPack: IDBAssetPack = {
        id: assetPackName,
        name: assetPackName,
        download_status: downloadStatus,
        download_started_at: downloadStartedAt,
        download_completed_at: downloadCompletedAt,
        download_status_updated_at: downloadStatusUpdatedAt,
        assets_total_count:
          assetCounts.assetsTotalCount ?? existingAssetPack?.assets_total_count ?? 0,
        assets_downloaded_count:
          assetCounts.assetsDownloadedCount ?? existingAssetPack?.assets_downloaded_count ?? 0,
      };
      return this.dynamicDataService.upsert("data_list", ASSET_PACKS_DATA_LIST, dbAssetPack);
    });
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

  public snapshotAssetPacks() {
    return this.dynamicDataService.snapshot<IDBAssetPack>("data_list", ASSET_PACKS_DATA_LIST);
  }

  private async getAssetPack(assetPackName: string) {
    const assetPacks = await this.snapshotAssetPacks();
    return assetPacks.find((assetPack) => assetPack.id === assetPackName);
  }

  public resetAssetPacks() {
    return this.dynamicDataService.resetFlow("data_list", ASSET_PACKS_DATA_LIST);
  }
}
