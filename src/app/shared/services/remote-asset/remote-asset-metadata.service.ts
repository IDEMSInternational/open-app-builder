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
   * The full shape of a pack row, used when a writer creates one for the first time.
   *
   * `dynamicDataService.update` with `upsert: true` inserts only the partial it is given, so
   * without this a first write would produce a row missing most of its fields. Row creation is
   * deliberately a privilege of the download path (see `setDownloadStatus`): `downloadStatus` is a
   * required argument rather than a defaulted field because there is no honest default, and
   * inventing one would put a fictional status into the data list.
   */
  private buildDefaultAssetPackRow(
    assetPackName: string,
    downloadStatus: IAssetPackDownloadStatus
  ): IDBAssetPack {
    return {
      id: assetPackName,
      name: assetPackName,
      download_status: downloadStatus,
      download_started_at: "",
      download_completed_at: "",
      download_status_updated_at: "",
      assets_total_count: 0,
      assets_downloaded_count: 0,
      version: "",
      available_version: "",
      update_available: false,
      has_completed_download: false,
      version_checked_at: "",
      version_check_attempted_at: "",
      version_check_status: "never",
    };
  }

  /**
   * Write only the fields this call owns, merging into any existing row.
   *
   * Deliberately a partial `update` rather than a full-document `upsert`: an upsert rebuilds the
   * whole row, so every field a writer does not know about is silently erased. Version and check
   * fields are written by other methods, so a status change must leave them untouched.
   */
  private async patchAssetPack(assetPackName: string, update: Partial<IDBAssetPack>) {
    return this.dynamicDataService.update<Partial<IDBAssetPack>>(
      "data_list",
      ASSET_PACKS_DATA_LIST,
      assetPackName,
      update
    );
  }

  /**
   * Run status writes one at a time, in issue order. `dynamicDataService.update` awaits internally
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
   * @param options.version manifest version to record. Only pass on a fully successful download -
   * see `IDBAssetPack.version`.
   */
  public setDownloadStatus(
    assetPackName: string,
    downloadStatus: IAssetPackDownloadStatus,
    timestamps: IAssetPackDownloadStatusTimestamps = {},
    assetCounts: IAssetPackAssetCounts = {},
    options: { signal?: AbortSignal; version?: string } = {}
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
      const update: Partial<IDBAssetPack> = {
        download_status: downloadStatus,
        download_started_at: downloadStartedAt,
        download_completed_at: downloadCompletedAt,
        download_status_updated_at: downloadStatusUpdatedAt,
      };
      if (assetCounts.assetsTotalCount !== undefined) {
        update.assets_total_count = assetCounts.assetsTotalCount;
      }
      if (assetCounts.assetsDownloadedCount !== undefined) {
        update.assets_downloaded_count = assetCounts.assetsDownloadedCount;
      }
      // Reaching `completed` is the only thing that advances the recorded version, and it must land
      // in the same write as the status - splitting them would leave a window in which the pack
      // reads as completed at the wrong version.
      if (downloadStatus === "completed") {
        update.has_completed_download = true;
        if (options.version !== undefined) {
          update.version = options.version;
          update.available_version = options.version;
          update.update_available = false;
          // A completed download walked the manifest, so it also *is* a successful version check -
          // recording it here keeps a forced `asset_pack: download` from leaving the check fields
          // reading as stale, and keeps the whole success write atomic.
          update.version_checked_at = downloadStatusUpdatedAt;
          update.version_check_attempted_at = downloadStatusUpdatedAt;
          update.version_check_status = "ok";
        }
      }
      if (!existingAssetPack) {
        return this.dynamicDataService.update<Partial<IDBAssetPack>>(
          "data_list",
          ASSET_PACKS_DATA_LIST,
          assetPackName,
          { ...this.buildDefaultAssetPackRow(assetPackName, downloadStatus), ...update },
          { upsert: true }
        );
      }
      return this.patchAssetPack(assetPackName, update);
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
    return this.patchAssetPack(assetPackName, update);
  }

  /**
   * Record that a version check reached the provider and failed (bad publish, 404, unparseable
   * manifest). Deliberately does not touch `download_status`: a pack that is already downloaded
   * and working must not be made to look broken because a *check* failed.
   */
  public async recordVersionCheckFailure(assetPackName: string) {
    return this.patchAssetPack(assetPackName, {
      version_check_attempted_at: this.createTimestamp(),
      version_check_status: "failed",
    });
  }

  /** Record a successful version check and whether it found an update */
  public async recordVersionCheckSuccess(assetPackName: string, availableVersion: string) {
    const existingAssetPack = await this.getAssetPack(assetPackName);
    const timestamp = this.createTimestamp();
    const downloadedVersion = existingAssetPack?.version || "";
    return this.patchAssetPack(assetPackName, {
      version_check_attempted_at: timestamp,
      version_checked_at: timestamp,
      version_check_status: "ok",
      available_version: availableVersion,
      // An unversioned manifest gives us nothing to compare, so it can never signal an update
      update_available: Boolean(availableVersion) && availableVersion !== downloadedVersion,
    });
  }

  /**
   * Flag the pack as having been usable, before starting a download that will move it off
   * `completed`. Legitimate only because updates are started for `completed` packs, and it is what
   * back-fills the flag for packs downloaded before versioning existed.
   *
   * Must be called while the row still reads `completed` - folding it into the `in_progress` write
   * would make the flag's survival depend on ordering within the very transition it exists to
   * survive. See `IDBAssetPack.has_completed_download`.
   */
  public async markHasCompletedDownload(assetPackName: string) {
    return this.patchAssetPack(assetPackName, { has_completed_download: true });
  }

  public async isDownloadCompleted(assetPackName: string) {
    const assetPack = await this.getAssetPack(assetPackName);
    return assetPack?.download_status === "completed";
  }

  /**
   * Whether the pack has ever been downloaded successfully, as persisted. Read raw rather than via
   * `getVersionCheckState`, whose coercion is a presentation convenience for reads: at the point a
   * download fails the status is `in_progress`, so that fallback would not apply anyway, and
   * inheriting a display rule here risks a later change to it silently altering whether a failed
   * first download is reported as `error`.
   */
  public async hasCompletedDownload(assetPackName: string) {
    const assetPack = await this.getAssetPack(assetPackName);
    return assetPack?.has_completed_download === true;
  }

  /**
   * State a version check needs, with defaults applied for rows written before these fields
   * existed. `has_completed_download` falls back to the pack's status because a legacy row sitting
   * at `completed` has demonstrably completed - self-healing for reads, with no write required.
   */
  public async getVersionCheckState(assetPackName: string) {
    const assetPack = await this.getAssetPack(assetPackName);
    return {
      version: assetPack?.version || "",
      availableVersion: assetPack?.available_version || "",
      hasCompletedDownload:
        assetPack?.has_completed_download ?? assetPack?.download_status === "completed",
      versionCheckedAt: assetPack?.version_checked_at || "",
      versionCheckAttemptedAt: assetPack?.version_check_attempted_at || "",
      versionCheckStatus: assetPack?.version_check_status || "never",
    };
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
