import { Injectable, Injector, effect, signal, OnDestroy } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { Capacitor } from "@capacitor/core";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { FlowTypes } from "../../model";
import { AppConfigService } from "../app-config/app-config.service";
import { FileManagerService } from "../file-manager/file-manager.service";
import type { ISavedFileInfo } from "../file-manager/file-manager.service";
import { IAssetContents } from "src/app/data";
import { BehaviorSubject, Subscription } from "rxjs";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { TemplateAssetService } from "../../components/template/services/template-asset.service";
import { AsyncServiceBase } from "../asyncService.base";
import type {
  IAssetContentsEntryMinimal,
  IAssetEntry,
  IAssetOverrideProps,
} from "packages/data-models";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import { arrayToHashmap, convertBlobToBase64, deepMergeObjects } from "../../utils";
import { DeploymentService } from "../deployment/deployment.service";
import { IRemoteAssetProvider, IRemoteAssetConfig } from "./providers/base.remote-asset";
import { getRemoteAssetProvider } from "./providers";
import {
  ASSET_CONTENTS_DATA_LIST,
  ASSET_DOWNLOAD_RETRY_BASE_DELAY_MS,
  ASSET_DOWNLOAD_RETRY_LIMIT,
  REMOTE_ASSET_STORAGE_FOLDER,
  VERSION_CHECK_FAILURE_BACKOFF_MS,
  VERSION_CHECK_MIN_INTERVAL_MS,
  getLocalAssetTargetPath,
  toLocalAssetPath,
} from "./remote-asset.types";
import type {
  IActiveAssetPackDownload,
  IAssetPackDownloadStatus,
  IAssetPackDownloadStatusTimestamps,
  IDownloadAssetPackByNameOptions,
  IEnsureAssetPacksDownloadedOptions,
} from "./remote-asset.types";
import { NetworkService } from "../network/network.service";
import { isImmediateAssetPackAction, RemoteAssetActionFactory } from "./remote-asset.actions";
import { RemoteAssetMetadataService } from "./remote-asset-metadata.service";
import { SystemVariableService } from "../system-variable/system-variable.service";

@Injectable({
  providedIn: "root",
})
export class RemoteAssetService extends AsyncServiceBase implements OnDestroy {
  remoteAssetsEnabled = signal(false);
  provider: IRemoteAssetProvider;
  downloading: boolean = false;
  downloadProgress: number;
  downloadProgressCount = signal<{ completed: number; total: number } | null>(null);
  private currentAssetPackName: string | null = null;
  private activeAssetPackDownloads = new Map<string, IActiveAssetPackDownload>();

  private assetContentsSubscription: Subscription;
  private assetContentsData = signal<any[]>([]);

  constructor(
    private appConfigService: AppConfigService,
    private appDataService: AppDataService,
    private dynamicDataService: DynamicDataService,
    private fileManagerService: FileManagerService,
    private templateAssetService: TemplateAssetService,
    private templateActionRegistry: TemplateActionRegistry,
    private http: HttpClient,
    private deploymentService: DeploymentService,
    private networkService: NetworkService,
    private remoteAssetMetadataService: RemoteAssetMetadataService,
    private systemVariableService: SystemVariableService,
    private injector: Injector
  ) {
    super("RemoteAsset");
    this.registerInitFunction(this.initialise);

    effect(() => {
      if (this.remoteAssetsEnabled()) {
        const dataRows = this.assetContentsData();
        if (dataRows && dataRows.length > 0) {
          const assetContentsHashmap = arrayToHashmap(dataRows, "id") as IAssetContents;
          this.templateAssetService.assetsContentsList.set(assetContentsHashmap);
        }
      }
    });
  }

  private async initialise() {
    // Resolve where downloaded assets live in the current container before anything can read a
    // downloaded `filePath`. Done regardless of whether remote assets are currently enabled, so that
    // rows left by a previous configuration still resolve.
    await this.setLocalAssetPathConfig();

    // Initialize the remote asset provider
    const remoteAssetsConfig = this.deploymentService.config.remote_assets;
    if (remoteAssetsConfig?.provider) {
      this.provider = getRemoteAssetProvider(remoteAssetsConfig.provider);
      const providerConfig: IRemoteAssetConfig = {
        bucketName: remoteAssetsConfig.bucketName,
        folderName: remoteAssetsConfig.folderName,
      };
      await this.provider.initialise(this.injector, providerConfig);
      this.remoteAssetsEnabled.set(true);
      console.log("[Remote Asset] Remote asset provider initialized:", remoteAssetsConfig.provider);
    } else {
      this.remoteAssetsEnabled.set(false);
      this.syncAssetPackDownloadInProgressSystemVariable();
      console.log("[Remote Asset] Remote assets not enabled");
    }

    this.registerTemplateActionHandlers();

    if (this.remoteAssetsEnabled()) {
      await this.ensureAsyncServicesReady([this.templateAssetService, this.dynamicDataService]);
      this.ensureSyncServicesReady([
        this.appConfigService,
        this.appDataService,
        this.fileManagerService,
      ]);

      // Update asset contents signal via subscription to dynamic data
      // (limitations of rxjs/signal interop utils mean we can't use toSignal here)
      const { flow_type, flow_name } = this.generateAssetContentsPack(
        this.templateAssetService.assetsContentsList()
      );
      const assetContentsData$ = this.dynamicDataService.query$(flow_type, flow_name);
      this.assetContentsSubscription = assetContentsData$.subscribe({
        next: (dataRows) => this.assetContentsData.set(dataRows),
        error: (error) => console.error("[Remote Asset] Error in asset contents stream:", error),
      });

      // Resume any downloads interrupted by a previous app session (e.g. app killed mid-download).
      // Fire-and-forget: this is a blocking core service, so init must not wait on downloads.
      void this.resumeInterruptedAssetPackDownloads().catch((error) =>
        console.error("[REMOTE ASSETS] Failed to resume interrupted downloads", error)
      );
    }
  }

  /**
   * Restart downloads for packs left mid-flight by a previous session. A pack killed while
   * downloading stays `in_progress`/`waiting_for_connection` in `_asset_packs` (process death skips
   * cleanup), which is our resume signal. `error` packs wait for an explicit re-trigger and
   * `cancelled` packs reflect user intent, so both are excluded.
   */
  private async resumeInterruptedAssetPackDownloads() {
    const resumableStatuses: IAssetPackDownloadStatus[] = ["in_progress", "waiting_for_connection"];
    const assetPacks = await this.remoteAssetMetadataService.snapshotAssetPacks();
    const interruptedPackIds = assetPacks
      .filter(
        (assetPack) =>
          resumableStatuses.includes(assetPack.download_status) &&
          !this.activeAssetPackDownloads.has(assetPack.id)
      )
      .map((assetPack) => assetPack.id);
    if (!interruptedPackIds.length) return;
    console.log(
      `[REMOTE ASSETS] Resuming ${interruptedPackIds.length} interrupted asset pack download(s):`,
      interruptedPackIds
    );
    // Non-blocking: kicks off the first pack and chains the rest sequentially (existing behaviour).
    await this.ensureAssetPacksDownloaded(interruptedPackIds, { awaitCompletion: false });
  }

  /************************************************************************************
   *  Service Init methods
   ************************************************************************************/

  /**
   * Hand `TemplateAssetService` the current container path so it can resolve downloaded assets at
   * the point of display. Native only - on web `filePath` holds a provider URL and needs no
   * resolution. Failure is non-fatal: downloaded assets will not render, but bundled ones still do.
   */
  private async setLocalAssetPathConfig() {
    if (!Capacitor.isNativePlatform()) return;
    this.ensureSyncServicesReady([this.fileManagerService]);
    try {
      const pathConfig = await this.fileManagerService.getLocalAssetPathConfig();
      this.templateAssetService.localAssetPathConfig.set(pathConfig);
    } catch (error) {
      console.error("[REMOTE ASSETS] Failed to resolve local asset path config", error);
    }
  }

  private registerTemplateActionHandlers() {
    const { asset_pack } = new RemoteAssetActionFactory(this);
    this.templateActionRegistry.register({ asset_pack });
    this.templateActionRegistry.registerImmediate("asset_pack", isImmediateAssetPackAction);
  }

  /**
   * Initialise the `_assets_contents` pack from bundled (core) asset contents.
   * Downloaded asset packs are later merged into this same dynamic data flow.
   * */
  private generateAssetContentsPack(assetsContentsList: IAssetContents) {
    const contentsArray = [];
    for (const [relativePath, assetEntry] of Object.entries(assetsContentsList)) {
      contentsArray.push({ id: relativePath, ...assetEntry });
    }
    const assetContentsPack: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: ASSET_CONTENTS_DATA_LIST,
      rows: contentsArray,
    };
    // This will apply additional processing to to the asset pack data list, i.e. adding the rowsHashMap field
    this.appDataService.addRuntimeFlowToContents(assetContentsPack);
    return assetContentsPack;
  }

  /************************************************************************************
   *  Download methods
   ************************************************************************************/
  public async ensureAssetPacksDownloaded(
    assetPackList: string[],
    options: IEnsureAssetPacksDownloadedOptions = {}
  ) {
    if (!assetPackList?.length) {
      console.error(
        "[REMOTE ASSETS] Please provide at least one asset pack name via asset_pack or asset_pack_list"
      );
      return false;
    }

    const awaitCompletion = options.awaitCompletion ?? true;
    const debugDownloadDelayMs = options.debugDownloadDelayMs ?? 0;
    const checkForUpdates = options.checkForUpdates ?? true;
    const assetPacks = await this.remoteAssetMetadataService.snapshotAssetPacks();
    const completedPackIds = new Set(
      assetPacks
        .filter((assetPack) => assetPack.download_status === "completed")
        .map((assetPack) => assetPack.id)
    );
    const pendingPacks: string[] = [];
    const completedPacks: string[] = [];
    for (const assetPackName of assetPackList) {
      if (completedPackIds.has(assetPackName)) {
        console.log(`[REMOTE ASSETS] Asset pack already downloaded: ${assetPackName}`);
        completedPacks.push(assetPackName);
        continue;
      }
      pendingPacks.push(assetPackName);
    }

    // Checks are never awaited, whatever the caller asked for: `ensure_downloaded` guarantees a pack
    // is *usable*, not that it is the latest, and a manifest fetch per pack on the action queue is
    // exactly the latency this is meant to avoid. `asset_pack: download` is the way to block on
    // getting the latest.
    if (checkForUpdates && completedPacks.length) {
      void this.checkAssetPacksForUpdates(completedPacks, debugDownloadDelayMs).catch((error) =>
        console.error("[REMOTE ASSETS] Asset pack update check failed", error)
      );
    }

    if (!pendingPacks.length) {
      return true;
    }

    if (!awaitCompletion) {
      const [firstPendingPack, ...remainingPendingPacks] = pendingPacks;
      const downloadInBackground = (assetPackNames: string[]) => {
        if (!assetPackNames.length) return;
        void this.ensureAssetPacksDownloaded(assetPackNames, {
          awaitCompletion: true,
          debugDownloadDelayMs,
          // Already checked above; re-checking on retry would double the manifest fetches and
          // ignore a caller who asked for no checks at all
          checkForUpdates: false,
        }).catch((error) =>
          console.error("[REMOTE ASSETS] Background ensure_downloaded failed", error)
        );
      };
      const started = await this.downloadAssetPackByName(firstPendingPack, {
        awaitCompletion: false,
        debugDownloadDelayMs,
        onDownloadStarted: (completion) => {
          if (!remainingPendingPacks.length) {
            return;
          }
          void completion
            .finally(() => downloadInBackground(remainingPendingPacks))
            .catch((error) =>
              console.error("[REMOTE ASSETS] Background ensure_downloaded failed", error)
            );
        },
      });
      if (!started) {
        // The only way to be refused here is a *different* pack already downloading. Retry the whole
        // list once that settles rather than silently dropping every pack the caller asked for
        // (e.g. launch-time resume racing a template-triggered download).
        void this.waitForActiveAssetPackDownloads().then(() => downloadInBackground(pendingPacks));
        return false;
      }
      return true;
    }

    let allSucceeded = true;
    for (const assetPackName of pendingPacks) {
      const success = await this.downloadAssetPackByName(assetPackName, { debugDownloadDelayMs });
      if (!success) {
        allSucceeded = false;
      }
    }
    return allSucceeded;
  }

  /**
   * For each already-downloaded pack, fetch its manifest and compare the version against the one
   * recorded locally, starting a background download for any that differ.
   *
   * The version only decides *whether to walk the manifest*. Which individual files get re-fetched
   * remains the job of the per-slot resume gate comparing checksums, so an update transfers bytes
   * only for the files that actually changed.
   */
  private async checkAssetPacksForUpdates(assetPackNames: string[], debugDownloadDelayMs: number) {
    const packsToUpdate: { assetPackName: string; manifest: FlowTypes.AssetPack }[] = [];
    for (const assetPackName of assetPackNames) {
      // An in-flight walk is already reading a manifest at least as fresh as one we would fetch now
      if (this.activeAssetPackDownloads.has(assetPackName)) continue;
      // Offline is not a check failure: nothing is written at all, so `version_check_status` keeps
      // meaning "we reached the provider and something was wrong", and staleness shows up instead
      // as `version_checked_at` failing to advance.
      if (this.isOffline()) continue;

      const checkState = await this.remoteAssetMetadataService.getVersionCheckState(assetPackName);
      if (this.isVersionCheckThrottled(checkState)) continue;

      const manifest = await this.getAssetPackManifest(assetPackName);
      if (!manifest) {
        // Explicitly leaves `download_status` alone - a working pack must never be made to look
        // broken because a *check* failed.
        await this.remoteAssetMetadataService.recordVersionCheckFailure(assetPackName);
        continue;
      }
      const availableVersion = manifest.version ?? "";
      await this.remoteAssetMetadataService.recordVersionCheckSuccess(
        assetPackName,
        availableVersion
      );
      if (!availableVersion) {
        // Packs published before versioning existed carry no version. Treating that as "changed"
        // would re-walk them on every check forever, so take no action.
        console.log(
          `[REMOTE ASSETS] No version in manifest for ${assetPackName}; skipping update check`
        );
        continue;
      }
      if (availableVersion === checkState.version) continue;

      console.log(
        `[REMOTE ASSETS] Update available for ${assetPackName} (have "${checkState.version || "none"}", remote "${availableVersion}")`
      );
      // Record that the pack has been usable *before* the download moves it off `completed`. Folded
      // into the `in_progress` write it would not survive the app being killed mid-update, which is
      // the case it exists for. Also back-fills the flag for pre-versioning rows.
      await this.remoteAssetMetadataService.markHasCompletedDownload(assetPackName);
      packsToUpdate.push({ assetPackName, manifest });
    }

    // Downloads are applied after every pack has been checked, and one at a time. Starting them
    // inside the loop above would make the packs refuse *each other* - only one download may be
    // active - so with two packs needing updates the second would be dropped and then throttled out
    // of retrying for a full interval.
    // Awaiting here costs nothing: this whole routine is already fire-and-forget.
    for (const { assetPackName, manifest } of packsToUpdate) {
      await this.downloadAssetPackUpdate(assetPackName, manifest, debugDownloadDelayMs);
    }
  }

  /**
   * Start an update download, waiting for the current download to finish first if an unrelated one
   * holds the slot. Without the retry the update would be abandoned, having already recorded a
   * successful check - so nothing would try again until the throttle expired.
   */
  private async downloadAssetPackUpdate(
    assetPackName: string,
    manifest: FlowTypes.AssetPack,
    debugDownloadDelayMs: number
  ) {
    let completion: Promise<boolean> | undefined;
    const started = await this.downloadAssetPackByName(assetPackName, {
      // `awaitCompletion: false` so a refusal is reported rather than being indistinguishable from
      // a failed download; the completion handle is then used to keep updates serial.
      awaitCompletion: false,
      debugDownloadDelayMs,
      manifest,
      onDownloadStarted: (downloadCompletion) => (completion = downloadCompletion),
    });
    if (started) {
      await completion;
      return;
    }

    console.log(
      `[REMOTE ASSETS] Update for ${assetPackName} deferred behind an active download; will retry`
    );
    await this.waitForActiveAssetPackDownloads();
    // Deliberately without the prefetched manifest: an unrelated download has since run, so re-fetch
    // rather than walk a manifest that may already be out of date.
    await this.downloadAssetPackByName(assetPackName, { debugDownloadDelayMs });
  }

  /**
   * Whether a version check for this pack is too recent to repeat. A successful check holds for the
   * full interval; one that reached the provider and failed backs off for a shorter window, so a
   * single flaky response does not suppress updates for an hour.
   */
  private isVersionCheckThrottled(
    checkState: Awaited<ReturnType<RemoteAssetMetadataService["getVersionCheckState"]>>
  ) {
    const { versionCheckAttemptedAt, versionCheckStatus, version, availableVersion } = checkState;
    // An update we already know about is never throttled. The check that found it records success
    // *before* the download is known to have started, so throttling here would suppress exactly the
    // retry the pack needs after an update that failed, was cancelled, or never got its turn before
    // the app was killed - leaving it stuck until the interval expired.
    // Retrying is cheap: the resume gate skips every file the previous attempt did integrate.
    if (availableVersion && availableVersion !== version) return false;
    if (!versionCheckAttemptedAt) return false;
    const elapsedMs = Date.now() - Date.parse(versionCheckAttemptedAt);
    // An unparseable timestamp should mean "check again", not "never check again"
    if (Number.isNaN(elapsedMs)) return false;
    const throttleMs =
      versionCheckStatus === "failed"
        ? VERSION_CHECK_FAILURE_BACKOFF_MS
        : VERSION_CHECK_MIN_INTERVAL_MS;
    return elapsedMs < throttleMs;
  }

  public async downloadAssetPackByName(
    assetPackName: string,
    options: IDownloadAssetPackByNameOptions = {}
  ) {
    const awaitCompletion = options.awaitCompletion ?? true;
    if (!assetPackName) {
      console.error("[REMOTE ASSETS] Please provide an asset pack name to download");
      return false;
    }
    // If this exact pack is already downloading, join the in-flight attempt rather than reporting
    // failure (auto-resume on launch can race a template-triggered download for the same pack).
    const existingDownload = this.activeAssetPackDownloads.get(assetPackName);
    if (existingDownload) {
      console.log(
        `[REMOTE ASSETS] Download already active for ${assetPackName}; joining in-flight attempt`
      );
      if (!awaitCompletion) {
        options.onDownloadStarted?.(existingDownload.completion);
        return true;
      }
      return existingDownload.completion;
    }
    if (this.activeAssetPackDownloads.size > 0) {
      console.warn("[REMOTE ASSETS] A different asset pack download is already active");
      return false;
    }

    const downloadStartedAt = this.remoteAssetMetadataService.createTimestamp();
    const abortController = new AbortController();
    // Keep _asset_packs status aligned with connectivity while this download attempt is active.
    const removeAssetPackConnectionStatusListener = this.trackAssetPackConnectionStatus(
      assetPackName,
      downloadStartedAt,
      abortController.signal
    );
    // runAssetPackDownload runs synchronously up to its first await (no access to the downloads map
    // in that prefix), so its promise is available to store on the record before we register it -
    // guaranteeing any joiner always sees a `completion` to await.
    const completion = this.runAssetPackDownload(assetPackName, {
      abortController,
      downloadStartedAt,
      removeAssetPackConnectionStatusListener,
      debugDownloadDelayMs: options.debugDownloadDelayMs ?? 0,
      prefetchedManifest: options.manifest,
    });
    const activeDownload: IActiveAssetPackDownload = {
      abortController,
      downloadStartedAt,
      removeConnectionStatusListener: removeAssetPackConnectionStatusListener,
      completion,
    };
    this.activeAssetPackDownloads.set(assetPackName, activeDownload);
    this.syncAssetPackDownloadInProgressSystemVariable();

    if (!awaitCompletion) {
      options.onDownloadStarted?.(completion);
      void completion.catch((error) => {
        if (!this.isDownloadCancelled(error, abortController.signal)) {
          console.error(error);
        }
      });
      return true;
    }
    return completion;
  }

  private async runAssetPackDownload(
    assetPackName: string,
    {
      abortController,
      downloadStartedAt,
      removeAssetPackConnectionStatusListener,
      debugDownloadDelayMs,
      prefetchedManifest,
    }: {
      abortController: AbortController;
      downloadStartedAt: string;
      removeAssetPackConnectionStatusListener: () => void;
      prefetchedManifest?: FlowTypes.AssetPack;
      debugDownloadDelayMs: number;
    }
  ) {
    // Used for the first attempt only. A retry after parking offline may be much later, by which
    // point the pack could have been republished again, so every retry re-fetches.
    let manifestForAttempt = prefetchedManifest;
    try {
      while (true) {
        this.throwIfDownloadCancelled(abortController.signal);
        if (this.isOffline()) {
          await this.setAttemptDownloadStatus(
            assetPackName,
            "waiting_for_connection",
            abortController.signal,
            { downloadStartedAt }
          );
          await this.waitForConnection(abortController.signal);
        }

        this.throwIfDownloadCancelled(abortController.signal);
        await this.setAttemptDownloadStatus(assetPackName, "in_progress", abortController.signal, {
          downloadStartedAt,
        });

        // Re-check after the status write: a cancel can land during any await, and there is no
        // point spending a manifest fetch on an attempt that has already been abandoned
        this.throwIfDownloadCancelled(abortController.signal);

        try {
          const manifest =
            manifestForAttempt ??
            (await this.getAssetPackManifest(assetPackName, abortController.signal));
          manifestForAttempt = undefined;
          this.throwIfDownloadCancelled(abortController.signal);
          if (!manifest) {
            throw new Error(
              `[REMOTE ASSETS] Failed to load manifest for asset pack: ${assetPackName}`
            );
          }
          const assetEntries = (manifest.rows || []) as FlowTypes.Data_listRow<IAssetEntry>[];
          const total = this.countDownloadFiles(assetEntries);
          this.downloadProgressCount.set(total ? { completed: 0, total } : null);
          await this.remoteAssetMetadataService.setAssetCounts(assetPackName, {
            assetsTotalCount: total,
            assetsDownloadedCount: 0,
          });
          const { failedCount } = await this.downloadAndIntegrateAssetPack(
            { ...manifest, rows: assetEntries },
            abortController.signal,
            debugDownloadDelayMs
          );
          this.throwIfDownloadCancelled(abortController.signal);
          if (failedCount > 0) {
            // Do not mark a pack completed while files are missing. Throwing hands control to the
            // catch below: offline -> park and retry (cheap now that done files are skipped),
            // online -> surface as `error` so the pack stays resumable via explicit re-trigger.
            throw new Error(
              `[REMOTE ASSETS] ${failedCount} file(s) failed to download for asset pack: ${assetPackName}`
            );
          }
          removeAssetPackConnectionStatusListener();
          // Only a fully successful walk advances the recorded version. A partial update therefore
          // leaves it at the previous value, and the next check retries what is still outstanding.
          await this.setAttemptDownloadStatus(
            assetPackName,
            "completed",
            abortController.signal,
            {
              downloadStartedAt,
              downloadCompletedAt: this.remoteAssetMetadataService.createTimestamp(),
            },
            manifest.version ?? ""
          );
          console.log(
            `[REMOTE ASSETS] Asset pack download completed: ${assetPackName} (${total} files)`
          );
          return true;
        } catch (e) {
          if (this.isDownloadCancelled(e, abortController.signal)) {
            throw e;
          }
          if (this.isOffline()) {
            console.warn("[REMOTE ASSETS] Download waiting for connection to be restored", e);
            continue;
          }
          throw e;
        }
      }
    } catch (e) {
      removeAssetPackConnectionStatusListener();
      if (this.isDownloadCancelled(e, abortController.signal)) {
        // Confirms the download loop actually stopped, rather than running on in the background
        console.log(`[REMOTE ASSETS] Asset pack download stopped: ${assetPackName}`);
        return false;
      }
      console.error(e);
      await this.setTerminalFailureStatus(
        assetPackName,
        "error",
        downloadStartedAt,
        abortController.signal
      );
      return false;
    } finally {
      removeAssetPackConnectionStatusListener();
      const activeDownload = this.activeAssetPackDownloads.get(assetPackName);
      if (activeDownload?.abortController === abortController) {
        this.activeAssetPackDownloads.delete(assetPackName);
        this.syncAssetPackDownloadInProgressSystemVariable();
      }
      this.downloadProgressCount.set(null);
    }
  }

  public async cancelAssetPackDownloadByName(assetPackName: string) {
    if (!assetPackName) {
      console.error("[REMOTE ASSETS] Please provide an asset pack name to cancel");
      return false;
    }

    const activeDownload = this.activeAssetPackDownloads.get(assetPackName);
    if (!activeDownload) {
      console.warn(`[REMOTE ASSETS] No active asset pack download to cancel: ${assetPackName}`);
      return false;
    }

    activeDownload.abortController.abort();
    activeDownload.removeConnectionStatusListener();
    this.activeAssetPackDownloads.delete(assetPackName);
    this.syncAssetPackDownloadInProgressSystemVariable();
    const progress = this.downloadProgressCount();
    this.downloadProgressCount.set(null);
    const progressSummary = progress
      ? ` (stopped at ${progress.completed} of ${progress.total} files)`
      : "";
    console.log(
      `[REMOTE ASSETS] Cancelled asset pack download: ${assetPackName}${progressSummary}`
    );
    // Cancelling an attempt on a pack that already completed leaves it usable, so it goes back to
    // `completed` rather than `cancelled` - which would both misreport it and, since cancelled packs
    // never auto-resume, strand it there permanently. Do not pass the aborted signal: this write
    // *is* the cancel, and would otherwise skip itself.
    await this.setTerminalFailureStatus(
      assetPackName,
      "cancelled",
      activeDownload.downloadStartedAt
    );
    return true;
  }

  /**
   * Write the status for an attempt that failed or was cancelled.
   *
   * A pack that has completed before is still fully usable: files left untouched are the previous
   * version, files already updated were integrated as they went, and every asset still resolves. So
   * it is restored to `completed` rather than reported as `error`/`cancelled`, which would tell
   * authoring a working pack is broken. `version` is deliberately left alone, so the pack reads as
   * being at whatever version it fully completed, and the next check retries the update.
   *
   * Note this is *not* conditioned on the attempt being an update - an explicit `asset_pack:
   * download` on an already-completed pack takes the same path, for the same reason.
   *
   * Reads the raw persisted flag rather than `getVersionCheckState`, whose coercion is a
   * presentation convenience for reads: terminal handling must not inherit a display rule.
   */
  private async setTerminalFailureStatus(
    assetPackName: string,
    status: Extract<IAssetPackDownloadStatus, "error" | "cancelled">,
    downloadStartedAt: string,
    signal?: AbortSignal
  ) {
    const hasCompletedBefore =
      await this.remoteAssetMetadataService.hasCompletedDownload(assetPackName);
    if (hasCompletedBefore) {
      console.warn(
        `[REMOTE ASSETS] Attempt did not complete for ${assetPackName}; the previously downloaded files are still usable so the pack remains 'completed'`
      );
      return this.remoteAssetMetadataService.setDownloadStatus(
        assetPackName,
        "completed",
        { downloadStartedAt },
        {},
        { signal }
      );
    }
    return this.remoteAssetMetadataService.setDownloadStatus(
      assetPackName,
      status,
      { downloadStartedAt },
      {},
      { signal }
    );
  }

  private isOffline() {
    return this.networkService.isOffline();
  }

  private waitForConnection(signal: AbortSignal) {
    return this.networkService.waitUntilConnected(signal);
  }

  private trackAssetPackConnectionStatus(
    assetPackName: string,
    downloadStartedAt: string,
    signal: AbortSignal
  ) {
    return this.networkService.onStatusChange((status) => {
      const downloadStatus = status.connected ? "in_progress" : "waiting_for_connection";
      void this.setAttemptDownloadStatus(assetPackName, downloadStatus, signal, {
        downloadStartedAt,
      });
    });
  }

  /**
   * Persist a download status on behalf of a specific download attempt, skipping the write if that
   * attempt has since been cancelled. Every status write made while an attempt is in flight must go
   * through here - `cancel_download` bypasses the template action queue, so it can land between any
   * two awaits and must not be overwritten by the attempt it just cancelled.
   */
  private setAttemptDownloadStatus(
    assetPackName: string,
    downloadStatus: IAssetPackDownloadStatus,
    signal: AbortSignal,
    timestamps: IAssetPackDownloadStatusTimestamps = {},
    version?: string
  ) {
    return this.remoteAssetMetadataService.setDownloadStatus(
      assetPackName,
      downloadStatus,
      timestamps,
      {},
      { signal, version }
    );
  }

  private throwIfDownloadCancelled(signal: AbortSignal) {
    if (!signal.aborted) return;
    throw this.createDownloadCancelledError();
  }

  private createDownloadCancelledError() {
    const error = new Error("Asset pack download cancelled");
    error.name = "AbortError";
    return error;
  }

  private isDownloadCancelled(error: unknown, signal?: AbortSignal) {
    return signal?.aborted || (error instanceof Error && error.name === "AbortError");
  }

  /**
   * Manual testing aid: pause before an asset file so a download can be reliably interrupted.
   * Driven by the `debug_download_delay_ms` action param, so it is 0 (a no-op) unless an author
   * asked for it on this specific action call.
   */
  private waitForArtificialDownloadDelay(signal: AbortSignal, delayMs: number) {
    if (delayMs <= 0) {
      return Promise.resolve();
    }
    this.throwIfDownloadCancelled(signal);
    console.warn(`[REMOTE ASSETS] Artificial download delay enabled: ${delayMs}ms`);

    return this.abortableDelay(delayMs, signal);
  }

  /**
   * Sleep that rejects rather than resolving if the download is cancelled while it waits, so a
   * pause never outlives the attempt it belongs to.
   */
  private abortableDelay(delayMs: number, signal?: AbortSignal) {
    // `addEventListener("abort")` never fires on an already-aborted signal, so without this the
    // timer would run to completion and the cancel would only be noticed after the wait it was
    // meant to cut short
    if (signal?.aborted) {
      return Promise.reject(this.createDownloadCancelledError());
    }
    return new Promise<void>((resolve, reject) => {
      const handleAbort = () => {
        clearTimeout(timeout);
        reject(this.createDownloadCancelledError());
      };
      const timeout = setTimeout(() => {
        signal?.removeEventListener("abort", handleAbort);
        resolve();
      }, delayMs);
      signal?.addEventListener("abort", handleAbort, { once: true });
    });
  }

  /**
   * Run one download, retrying a few times before treating it as failed. Used for both asset slots
   * and pack manifests: a manifest blip fails an attempt before any slot retry can help, so leaving
   * it unretried would leave the same "one blip fails the pack" hole this closes.
   *
   * Providers report failure as a `null` result with no error channel, so a genuinely missing object
   * is retried too and costs a couple of wasted requests before failing anyway. That is the cheaper
   * mistake: not retrying spends nothing on missing objects, but sends packs to `error` that would
   * otherwise have completed, and an `error` pack needs an explicit re-trigger to make progress.
   *
   * Going offline is deliberately not retried - the pack-level handler parks the download as
   * `waiting_for_connection` and resumes it, which is a far better answer than burning attempts
   * against a connection known to be down. Checked both when an attempt fails and again after any
   * backoff, since connectivity can drop while waiting.
   */
  private async withDownloadRetry<T>(
    label: string,
    attemptDownload: () => Promise<T | null>,
    signal: AbortSignal | undefined
  ): Promise<T | null> {
    const totalAttempts = ASSET_DOWNLOAD_RETRY_LIMIT + 1;
    for (let attempt = 0; attempt < totalAttempts; attempt++) {
      if (signal) this.throwIfDownloadCancelled(signal);
      // Connectivity can drop during a backoff, so re-check before spending the next attempt
      if (attempt > 0 && this.isOffline()) return null;
      try {
        const result = await attemptDownload();
        if (result) return result;
      } catch (error) {
        if (this.isDownloadCancelled(error, signal)) throw error;
        console.error(`[REMOTE ASSETS] Error downloading ${label}:`, error);
      }
      if (this.isOffline()) return null;
      const isLastAttempt = attempt === totalAttempts - 1;
      if (!isLastAttempt) {
        const delayMs = ASSET_DOWNLOAD_RETRY_BASE_DELAY_MS * 2 ** attempt;
        console.warn(
          `[REMOTE ASSETS] Retrying ${label} in ${delayMs}ms (attempt ${attempt + 2} of ${totalAttempts})`
        );
        if (signal) this.throwIfDownloadCancelled(signal);
        await this.abortableDelay(delayMs, signal);
      }
    }
    return null;
  }

  /**
   * Construct full path for remote storage, prepending asset pack name if processing an asset pack
   * Keeping the asset pack name out of the relative path allows for referencing a file in authoring to be agnostic about its origin (e.g. core or remote)
   * @param relativePath Relative path to the file
   * @returns Full path including asset pack name if applicable
   */
  private getFullRemotePath(relativePath: string): string {
    return this.currentAssetPackName
      ? `${this.currentAssetPackName}/${relativePath}`
      : relativePath;
  }

  /**
   * Construct full path for local storage, relative to the deployment folder that
   * `FileManagerService.saveFile` writes into. Every pack shares this folder and files are keyed
   * only by their manifest-relative path, matching how `_assets_contents` is keyed - so an asset
   * shipped by more than one pack is stored once, and the second pack's resume check finds it
   * already downloaded.
   * @param relativePath Relative path to the file
   * @returns Full path within the shared remote assets folder
   */
  private getFullLocalPath(relativePath: string): string {
    return `${REMOTE_ASSET_STORAGE_FOLDER}/${relativePath}`;
  }

  private async downloadAndIntegrateAssetPack(
    assetPackManifest: FlowTypes.AssetPack,
    signal: AbortSignal,
    debugDownloadDelayMs = 0
  ): Promise<{ failedCount: number }> {
    let failedCount = 0;
    try {
      this.currentAssetPackName = assetPackManifest.flow_name;
      const assetEntries = (assetPackManifest.rows || []) as IAssetEntry[];

      // If running on native device, download assets and populate to filesystem, adding local
      // filesystem path to asset entry in contents list for consumption by template asset service
      if (Capacitor.isNativePlatform()) {
        // Snapshot the already-integrated contents once up front so per-file resume checks can
        // detect stale files (a pack whose content changed) without re-reading per file. Reading
        // it before any writes in this attempt keeps recorded checksums pointing at the old pack.
        const existingContents = await this.snapshotAssetContents();
        // TODO: implement queue system for downloads (see template-action service, or use of 3rd party p-queue elsewhere)
        for (const [index, assetEntry] of assetEntries.entries()) {
          this.throwIfDownloadCancelled(signal);
          await this.waitForArtificialDownloadDelay(signal, debugDownloadDelayMs);
          failedCount += await this.handleAssetDownload(
            assetEntry,
            index,
            assetEntries.length,
            signal,
            existingContents
          );
        }
      }

      // On web, update contents list with asset's public URL for consumption by template asset service
      // (files will be served remotely via provider CDN)
      else {
        for (const [index, assetEntry] of assetEntries.entries()) {
          this.throwIfDownloadCancelled(signal);
          await this.waitForArtificialDownloadDelay(signal, debugDownloadDelayMs);
          console.log(
            `[REMOTE ASSETS] Processing asset entry ${index + 1} of ${assetEntries.length}.`
          );
          await this.addRemoteFilepathToAssetContentsEntry(assetEntry, signal);
        }
      }
    } finally {
      this.currentAssetPackName = null;
    }
    return { failedCount };
  }

  /** Snapshot the current `_assets_contents` rows as a hashmap keyed by id (asset relative path). */
  private async snapshotAssetContents(): Promise<Record<string, IAssetEntry>> {
    const rows = await this.dynamicDataService.snapshot<IAssetEntry & { id: string }>(
      "asset_pack",
      ASSET_CONTENTS_DATA_LIST
    );
    return arrayToHashmap(rows, "id") as Record<string, IAssetEntry>;
  }

  /**
   * Download the asset pack manifest for a named asset pack from the remote provider.
   * Returns null rather than throwing if the manifest cannot be fetched or parsed, leaving callers
   * to decide what a missing manifest means - a download treats it as a failure, a version check
   * must treat it as "could not check" and leave the pack's status alone.
   */
  private async getAssetPackManifest(
    assetPackName: string,
    signal?: AbortSignal
  ): Promise<FlowTypes.AssetPack | null> {
    const relativePath = `${assetPackName}/${assetPackName}.json`;

    try {
      console.log(`[REMOTE ASSETS] Downloading manifest for asset pack: ${assetPackName}`);

      // Use provider's downloadFileAsText method to handle different blob formats (Firebase data URLs vs Supabase regular blobs)
      // `noCache` is essential, not an optimisation: buckets serve long cache headers, and a cached
      // manifest reports a stale version, so updates would silently never reach anyone.
      const jsonText = await this.withDownloadRetry(
        `manifest for ${assetPackName}`,
        () => this.provider.downloadFileAsText(relativePath, { noCache: true }),
        signal
      );

      if (!jsonText) {
        console.error(`[REMOTE ASSETS] Failed to download manifest for ${assetPackName}`);
        return null;
      }
      const manifest: FlowTypes.AssetPack = JSON.parse(jsonText);
      console.log("[REMOTE ASSETS] Manifest loaded", manifest);
      return manifest;
    } catch (error) {
      console.error(`[REMOTE ASSETS] Error downloading manifest for ${assetPackName}:`, error);
      return null;
    }
  }

  /**
   * Native platforms only:
   * Download an asset from an asset pack, including any overrides,
   * and update the contents list so that the filepath is the path to the file in local storage.
   * @returns the number of file slots (base and/or overrides) that failed to download.
   */
  private async handleAssetDownload(
    assetEntry: IAssetEntry,
    fileIndex: number,
    totalFiles: number | undefined,
    signal: AbortSignal | undefined,
    existingContents: Record<string, IAssetEntry>
  ): Promise<number> {
    let failedCount = 0;
    // Download the top level asset, unless overridesOnly is specified
    if (!assetEntry.overridesOnly) {
      try {
        const succeeded = await this.downloadAssetAndUpdateContentsList(
          assetEntry.id,
          assetEntry,
          fileIndex,
          totalFiles,
          signal,
          undefined,
          existingContents
        );
        if (!succeeded) failedCount += 1;
      } catch (error) {
        if (this.isDownloadCancelled(error, signal)) throw error;
        console.error(error);
        failedCount += 1;
      }
    }

    const { overrides } = assetEntry;
    if (overrides) {
      for (const [themeName, languageOverrides] of Object.entries(overrides)) {
        for (const [languageCode, assetContentsEntry] of Object.entries(languageOverrides)) {
          const overrideProps = { themeName, languageCode };
          try {
            const succeeded = await this.downloadAssetAndUpdateContentsList(
              assetContentsEntry.filePath,
              assetEntry,
              fileIndex,
              totalFiles,
              signal,
              overrideProps,
              existingContents
            );
            if (!succeeded) failedCount += 1;
          } catch (error) {
            if (this.isDownloadCancelled(error, signal)) throw error;
            console.error(error);
            failedCount += 1;
          }
        }
      }
    }
    return failedCount;
  }

  /**
   * Web platform only:
   * Update the contents list with the contents of an asset pack, including any overrides,
   * updating filepath to be a public remote provider CDN URL
   */
  public async addRemoteFilepathToAssetContentsEntry(
    assetEntry: IAssetEntry,
    signal?: AbortSignal
  ) {
    if (signal) this.throwIfDownloadCancelled(signal);
    // Update the contents entry for the top level asset, unless overridesOnly is specified
    if (!assetEntry.overridesOnly) {
      const topLevelAssetUrl =
        this.provider.getPublicUrl(this.getFullRemotePath(assetEntry.id)) || "";
      await this.updateAssetContents(assetEntry, topLevelAssetUrl);
      if (signal) this.throwIfDownloadCancelled(signal);
      await this.incrementDownloadProgress();
    }
    const { overrides } = assetEntry;
    if (overrides) {
      for (const [themeName, languageOverrides] of Object.entries(overrides)) {
        for (const [languageCode, overrideAssetEntry] of Object.entries(languageOverrides)) {
          const overrideProps = { themeName, languageCode };
          const filepath =
            this.provider.getPublicUrl(this.getFullRemotePath(overrideAssetEntry.filePath)) || "";
          await this.updateAssetContents(assetEntry, filepath, overrideProps);
          if (signal) this.throwIfDownloadCancelled(signal);
          await this.incrementDownloadProgress();
        }
      }
    }
  }

  /**
   * Native platforms only:
   * Download a single asset from an asset pack, save to local native storage and update the assets
   * contents list. If a valid copy is already on disk (resume after interruption) the network fetch
   * is skipped and the existing file is (re-)integrated instead.
   * @returns true if the slot ended up present and integrated (downloaded or skipped), false on failure.
   * */
  private async downloadAssetAndUpdateContentsList(
    relativePath: string,
    assetEntry: IAssetEntry,
    fileIndex: number,
    totalFiles: number | undefined,
    signal: AbortSignal | undefined,
    overrideProps: IAssetOverrideProps | undefined,
    existingContents: Record<string, IAssetEntry>
  ): Promise<boolean> {
    const { targetPath, slotChecksum, slotSizeKb } = this.resolveAssetSlot(
      assetEntry,
      overrideProps
    );

    // Resume: if a valid copy already exists on disk, skip the network fetch and re-integrate it.
    if (signal) this.throwIfDownloadCancelled(signal);
    const savedFileInfo = await this.fileManagerService.getSavedFileInfo(targetPath);
    if (signal) this.throwIfDownloadCancelled(signal);
    if (
      this.isSavedAssetSlotTrustworthy(savedFileInfo, {
        targetPath,
        slotChecksum,
        slotSizeKb,
        existingContents,
        assetEntryId: assetEntry.id,
        overrideProps,
      })
    ) {
      console.log(
        `[REMOTE ASSETS] Skipping already-downloaded file ${fileIndex + 1} of ${totalFiles || "?"}: ${targetPath}`
      );
      await this.updateAssetContents(assetEntry, toLocalAssetPath(targetPath), overrideProps);
      if (signal) this.throwIfDownloadCancelled(signal);
      await this.incrementDownloadProgress();
      return true;
    }

    console.log(`[REMOTE ASSETS] Downloading file ${fileIndex + 1} of ${totalFiles || "?"}`);

    try {
      if (signal) this.throwIfDownloadCancelled(signal);
      // Use provider's direct download method, retrying transient failures
      const remotePath = this.getFullRemotePath(relativePath);
      const blob = await this.withDownloadRetry(
        remotePath,
        () => this.provider.downloadFile(remotePath),
        signal
      );
      if (signal) this.throwIfDownloadCancelled(signal);

      if (blob) {
        await this.fileManagerService.saveFile({ data: blob, targetPath });
        if (signal) this.throwIfDownloadCancelled(signal);
        await this.updateAssetContents(assetEntry, toLocalAssetPath(targetPath), overrideProps);
        if (signal) this.throwIfDownloadCancelled(signal);
        console.log(`[REMOTE ASSETS] File ${fileIndex + 1} of ${totalFiles} downloaded to cache`);
        await this.incrementDownloadProgress();
        return true;
      } else {
        console.error(`[REMOTE ASSETS] Failed to download ${relativePath}`);
        return false;
      }
    } catch (error) {
      if (this.isDownloadCancelled(error, signal)) throw error;
      console.error(`[REMOTE ASSETS] Error downloading ${relativePath}:`, error);
      return false;
    }
  }

  /**
   * Resolve the local storage target path and the manifest integrity metadata (checksum/size) for a
   * single asset slot - either the base entry or a specific theme/language override.
   * `targetPath` is the slot's location in local storage, i.e. the value stored (prefixed) as the
   * recorded entry's `filePath` once integration has overwritten it.
   */
  private resolveAssetSlot(assetEntry: IAssetEntry, overrideProps?: IAssetOverrideProps) {
    if (overrideProps) {
      const { themeName, languageCode } = overrideProps;
      const overrideAssetEntry = assetEntry.overrides[themeName][languageCode];
      return {
        targetPath: this.getFullLocalPath(overrideAssetEntry.filePath),
        slotChecksum: overrideAssetEntry.md5Checksum,
        slotSizeKb: overrideAssetEntry.size_kb,
      };
    }
    return {
      targetPath: this.getFullLocalPath(assetEntry.id),
      slotChecksum: assetEntry.md5Checksum,
      slotSizeKb: assetEntry.size_kb,
    };
  }

  /**
   * Native platforms only:
   * Decide whether an asset slot already has a trustworthy file on disk and so can skip its download.
   * Only skips on POSITIVE evidence: the file exists, its size matches the manifest, and a prior run
   * integrated THIS slot from the current manifest - i.e. the recorded `_assets_contents` entry both
   * carries the manifest checksum and has had its `filePath` rewritten to a local asset path.
   * Anything unverified re-downloads:
   *  - size unverifiable or mismatched -> truncated / wrong file
   *  - no/differing recorded checksum -> never integrated, or pack content changed (file is stale)
   *  - filePath not a local asset path -> saved but never integrated (interrupted mid-write)
   * The filePath check is what makes the evidence per-slot: integrating a base asset writes the whole
   * manifest entry, so it also copies in every override's checksum, and only a rewritten `filePath`
   * distinguishes a slot this app actually saved from one merely described by the manifest (whose
   * override entries carry a pack-relative path that is never itself a local asset path).
   * `getLocalAssetTargetPath` also accepts the absolute paths written before the `local://` marker
   * existed, so upgrading from an older app version resumes rather than re-downloading the pack.
   * NB verifying on-disk bytes directly (MD5) is intentionally deferred to a future `asset_pack:
   * verify` action; it needs an MD5 dependency and would only add value for external corruption of an
   * already-integrated file, which is out of scope for interrupt-resume.
   */
  private isSavedAssetSlotTrustworthy(
    savedFileInfo: ISavedFileInfo,
    slot: {
      targetPath: string;
      slotChecksum: string | undefined;
      slotSizeKb: number | undefined;
      existingContents: Record<string, IAssetEntry>;
      assetEntryId: string;
      overrideProps: IAssetOverrideProps | undefined;
    }
  ): boolean {
    const { targetPath, slotChecksum, slotSizeKb, existingContents, assetEntryId, overrideProps } =
      slot;
    if (!savedFileInfo.exists) return false;

    // Size gate: require a verifiable, matching size (cheap rejection of truncated/wrong files).
    if (slotSizeKb === undefined || savedFileInfo.sizeBytes === undefined) {
      console.warn(`[REMOTE ASSETS] Cannot verify size for ${targetPath}; re-downloading`);
      return false;
    }
    const localSizeKb = Math.round(savedFileInfo.sizeBytes / 102.4) / 10;
    if (localSizeKb !== slotSizeKb) {
      console.log(
        `[REMOTE ASSETS] On-disk size ${localSizeKb}kb != manifest ${slotSizeKb}kb for ${targetPath}; re-downloading`
      );
      return false;
    }

    // Integrity gate: only skip when a prior run integrated this exact file from the current manifest.
    const recordedSlot = this.getRecordedSlot(existingContents, assetEntryId, overrideProps);
    if (!recordedSlot?.md5Checksum || !slotChecksum || recordedSlot.md5Checksum !== slotChecksum) {
      console.log(`[REMOTE ASSETS] No confirming checksum for ${targetPath}; re-downloading`);
      return false;
    }
    const deploymentName = this.deploymentService.config.name;
    if (
      !recordedSlot.filePath ||
      getLocalAssetTargetPath(recordedSlot.filePath, deploymentName) === undefined
    ) {
      console.log(`[REMOTE ASSETS] ${targetPath} was saved but never integrated; re-downloading`);
      return false;
    }

    return true;
  }

  /**
   * Read the entry recorded in a snapshot of `_assets_contents` for a given slot, or undefined if the
   * asset has no row yet. Rows are keyed by the base asset id; override entries live nested under
   * `overrides[theme][language]`.
   */
  private getRecordedSlot(
    existingContents: Record<string, IAssetEntry>,
    assetEntryId: string,
    overrideProps?: IAssetOverrideProps
  ): IAssetContentsEntryMinimal | undefined {
    const row = existingContents[assetEntryId];
    if (!row) return undefined;
    if (overrideProps) {
      const { themeName, languageCode } = overrideProps;
      return row.overrides?.[themeName]?.[languageCode];
    }
    return row;
  }

  /**
   * Save updates to asset contents in dynamic data, including file path.
   * On native this should be a `local://` path (see `LOCAL_ASSET_PATH_PREFIX`) and on web a remote
   * provider URL - never an absolute device path, which does not survive an app update on iOS.
   * */
  private async updateAssetContents(
    assetEntry: IAssetEntry,
    filepath: string,
    overrideProps?: IAssetOverrideProps
  ) {
    const update = this.addFilePathToAssetEntry(assetEntry, filepath, overrideProps);
    // Update the asset contents pack in dynamic data, adding an entry for the asset or
    // updating an existing entry if it already exists
    await this.dynamicDataService.update<IAssetEntry & { id: string }>(
      "asset_pack",
      ASSET_CONTENTS_DATA_LIST,
      assetEntry.id,
      update,
      { upsert: true }
    );
  }

  private addFilePathToAssetEntry(
    assetEntry: IAssetEntry,
    filePath: string,
    overrideProps?: IAssetOverrideProps
  ): IAssetEntry {
    // In the case that the asset is an override, add the new filepath to the nested override entry
    if (overrideProps) {
      const { themeName, languageCode } = overrideProps;
      const update = {
        overrides: {
          [themeName]: {
            [languageCode]: {
              filePath,
            },
          },
        },
      };
      // Deep clone to ensure mutable object before merging (RxDB objects are immutable)
      const mutableAssetEntry = JSON.parse(JSON.stringify(assetEntry));
      return deepMergeObjects(mutableAssetEntry, update);
    } else {
      return { ...assetEntry, filePath };
    }
  }

  /** A general function to download a file from a URL */
  private downloadFileFromUrl(
    url: string,
    responseType: "blob" | "base64" = "base64",
    headers = {}
  ) {
    // Always use direct HTTP download since providers don't handle this directly
    // If downloading from local assets ignore cache
    if (!url.startsWith("http")) {
      headers = {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
        ...headers,
      };
    }

    // subscribe and share updates
    let subscription = new Subscription();
    let progress = 0;
    let data: Blob | string;

    // share initial update with request and subscription objects to allow dl interrupt via unsubscribe method
    const updates$ = new BehaviorSubject<{
      progress: number;
      subscription: Subscription;
      data?: Blob | string;
    }>({ progress, subscription });

    subscription = this.http
      .get(url, {
        responseType: "blob",
        reportProgress: true,
        headers,
        observe: "events",
      })
      .subscribe({
        error: (err) => updates$.error(err),
        next: async (event) => {
          // handle progress update
          if (event.type === HttpEventType.DownloadProgress) {
            if (event.total) {
              progress = Math.round((100 * event.loaded) / event.total);
            }
          }
          // handle full response received
          if (event.type === HttpEventType.Response) {
            data = event.body as Blob;
          }
          updates$.next({ progress, subscription, data });
        },
        complete: async () => {
          if (responseType === "base64") {
            data = await convertBlobToBase64(data as Blob);
          }
          updates$.next({ progress: 100, data, subscription });
          updates$.complete();
        },
      });
    return updates$;
  }

  /**
   * Download from a private bucket using the provider method. Not currently used.
   * NB this method does not support tracking download progress
   * */
  public async downloadFileFromPrivateBucket(filepath: string) {
    if (!this.provider) {
      console.error("[REMOTE ASSETS] No provider available for private bucket download");
      return null;
    }

    try {
      this.downloading = true;
      const data = await this.provider.downloadFileFromPrivateBucket(
        this.getFullRemotePath(filepath)
      );
      if (data) {
        console.log("blob:", data);
      }
      return data;
    } catch (error) {
      console.error("[REMOTE ASSETS] Error downloading from private bucket:", error);
      return null;
    } finally {
      this.downloading = false;
    }
  }

  /**
   * Reset every asset pack to its state before any remote assets were downloaded: cancel active
   * downloads, delete downloaded files from the device, and clear both data lists.
   *
   * All or nothing: if the files cannot be deleted the data lists are left alone, so the app keeps
   * describing what is actually on disk and the reset can simply be retried. Clearing them anyway
   * would leave the app believing nothing is downloaded while the storage stayed occupied.
   * @returns true if the reset completed, false if deleting the files failed
   * */
  public async reset() {
    // Capture the in-flight attempts before cancelling, which removes them from the map. Aborting
    // does not interrupt a `saveFile` already underway, so without waiting for them to settle a
    // straggling write could re-create files under the folder we are about to delete.
    const cancelledDownloads = [...this.activeAssetPackDownloads.values()];
    await this.cancelActiveAssetPackDownloads();
    await this.waitForActiveAssetPackDownloads(cancelledDownloads);

    try {
      await this.deleteAssetPackFiles();
    } catch (error) {
      console.error("[REMOTE ASSETS] Reset aborted: failed to delete downloaded files", error);
      return false;
    }
    await Promise.all([
      this.dynamicDataService.resetFlow("asset_pack", ASSET_CONTENTS_DATA_LIST),
      this.remoteAssetMetadataService.resetAssetPacks(),
    ]);
    return true;
  }

  /**
   * Delete every downloaded asset pack file from the device. No-op on web, where nothing is
   * downloaded - assets are served from the provider CDN.
   *
   * Always targets the `remote_assets` folder, never the deployment folder, which is shared with
   * other features (the cached auth profile picture, for one).
   *
   * Having nothing to delete is a success; a real filesystem failure throws, so callers can avoid
   * reporting a reset that did not reclaim anything.
   * @returns true if files were deleted, false if there were none to delete
   */
  private async deleteAssetPackFiles() {
    if (!Capacitor.isNativePlatform()) return false;
    const deleted = await this.fileManagerService.deleteSavedFolder(REMOTE_ASSET_STORAGE_FOLDER);
    console.log(
      deleted
        ? "[REMOTE ASSETS] Deleted all downloaded asset pack files"
        : "[REMOTE ASSETS] No downloaded asset pack files to delete"
    );
    return deleted;
  }

  /**
   * Resolve once every given download attempt has settled, defaulting to those active right now.
   * Callers that first cancel must capture the records themselves, since cancelling removes them
   * from the map. Rejections are absorbed: callers wait for the attempts to finish, they do not
   * inherit their outcome.
   */
  private async waitForActiveAssetPackDownloads(
    activeDownloads = [...this.activeAssetPackDownloads.values()]
  ) {
    if (!activeDownloads.length) return;
    await Promise.allSettled(activeDownloads.map(({ completion }) => completion));
  }

  /** @returns the names of the asset packs whose downloads were cancelled */
  public async cancelActiveAssetPackDownloads() {
    const activeAssetPackNames = [...this.activeAssetPackDownloads.keys()];
    if (activeAssetPackNames.length === 0) {
      console.log("[REMOTE ASSETS] No active asset pack downloads to cancel");
      return [];
    }
    const results = await Promise.all(
      activeAssetPackNames.map((assetPackName) => this.cancelAssetPackDownloadByName(assetPackName))
    );
    return activeAssetPackNames.filter((_, index) => results[index]);
  }

  ngOnDestroy(): void {
    for (const activeDownload of this.activeAssetPackDownloads.values()) {
      activeDownload.abortController.abort();
      activeDownload.removeConnectionStatusListener();
    }
    this.activeAssetPackDownloads.clear();
    this.syncAssetPackDownloadInProgressSystemVariable();
    if (this.assetContentsSubscription) {
      this.assetContentsSubscription.unsubscribe();
    }
  }

  private syncAssetPackDownloadInProgressSystemVariable() {
    const inProgress = this.activeAssetPackDownloads.size > 0;
    this.systemVariableService.set("ASSET_PACK_DOWNLOAD_IN_PROGRESS", inProgress.toString());
  }

  private async incrementDownloadProgress() {
    const progress = this.downloadProgressCount();
    if (!progress) return;
    const completed = Math.min(progress.completed + 1, progress.total);
    this.downloadProgressCount.set({ ...progress, completed });
    if (!this.currentAssetPackName) return;
    // Awaited so writes to the row don't overlap and clobber each other. Never fail a download
    // over a metadata write.
    try {
      await this.remoteAssetMetadataService.setAssetCounts(this.currentAssetPackName, {
        assetsDownloadedCount: completed,
      });
    } catch (error) {
      console.warn("[REMOTE ASSETS] Failed to persist asset download count", error);
    }
  }

  private countDownloadFiles(assetEntries: IAssetEntry[] = []) {
    let total = 0;
    for (const assetEntry of assetEntries) {
      // Count base entry unless marked overridesOnly
      if (!assetEntry.overridesOnly) {
        total += 1;
      }
      const { overrides } = assetEntry;
      if (overrides) {
        for (const themeOverrides of Object.values(overrides)) {
          total += Object.keys(themeOverrides).length;
        }
      }
    }
    return total;
  }
}
