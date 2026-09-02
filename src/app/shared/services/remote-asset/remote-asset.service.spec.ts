import { TestBed } from "@angular/core/testing";
import { Injector } from "@angular/core";
import { Capacitor } from "@capacitor/core";
import { RemoteAssetService } from "./remote-asset.service";
import { TemplateActionService } from "../../components/template/services/instance/template-action.service";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { TemplateNavService } from "../../components/template/services/template-nav.service";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { MockDeploymentService } from "../deployment/deployment.service.mock.spec";
import { IAssetContents } from "src/app/data";
import { FlowTypes } from "../../model";
import { IAssetEntry, IDeploymentRuntimeConfig } from "data-models";
import clone from "clone";
import { arrayToHashmap } from "../../utils";
import { DeploymentService } from "../deployment/deployment.service";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import type { IRemoteAssetProvider } from "./providers/base.remote-asset";
import {
  ASSET_DOWNLOAD_RETRY_BASE_DELAY_MS,
  ASSET_DOWNLOAD_RETRY_LIMIT,
} from "./remote-asset.types";
import type { IDBAssetPack } from "./remote-asset.types";
import { RemoteAssetMetadataService } from "./remote-asset-metadata.service";
import { NetworkService } from "../network/network.service";
import {
  isImmediateAssetPackAction,
  resolveDebugDownloadDelayMs,
  resolveDownloadAssetPackName,
  resolveEnsureDownloadedAssetPackList,
  shouldAwaitEnsureDownloaded,
  shouldCheckForUpdates,
  RemoteAssetActionFactory,
} from "./remote-asset.actions";
import { SystemVariableService } from "../system-variable/system-variable.service";

const MOCK_ASSETS_CONTENTS_LIST: IAssetContents = {
  "images/asset.png": {
    md5Checksum: "b4e6f1e9ba6e5bcdd2e404bc432ba745",
    size_kb: 100,
  },
  "audio/asset_with_overrides.mp3": {
    md5Checksum: "5ddddf934d2187d084c75b7e27797fae",
    size_kb: 43.4,
    overrides: {
      theme_default: {
        tz_sw: {
          filePath: "tz_sw/audio/asset_with_overrides.mp3",
          md5Checksum: "d851eef52c8d12fdbf0497210961a407",
          size_kb: 21.6,
        },
      },
    },
  },
  "audio/asset_override_only.mp3": {
    md5Checksum: "5ddddf934d2187d084c75b7e27797hol",
    size_kb: 42.4,
    overrides: {
      theme_default: {
        tz_sw: {
          filePath: "tz_sw/audio/asset_override_only.mp3",
          md5Checksum: "5ddddf934d2187d084c75b7e27797hol",
          size_kb: 42.4,
        },
      },
    },
    overridesOnly: true,
  },
};

const MOCK_ASSET_ENTRY: IAssetEntry = {
  id: "images/asset.png",
  md5Checksum: "b4e6f1e9ba6e5bcdd2e404bc432ba745",
  size_kb: 100,
};
const MOCK_ASSET_ENTRY_WITH_OVERRIDES: IAssetEntry = {
  id: "audio/asset_with_overrides.mp3",
  md5Checksum: "5ddddf934d2187d084c75b7e27797fae",
  size_kb: 43.4,
  overrides: {
    theme_default: {
      tz_sw: {
        filePath: "tz_sw/audio/asset_with_overrides.mp3",
        md5Checksum: "d851eef52c8d12fdbf0497210961a407",
        size_kb: 21.6,
      },
    },
  },
};
const MOCK_ASSET_ENTRY_OVERRIDES_ONLY: IAssetEntry = {
  id: "audio/asset_override_only.mp3",
  md5Checksum: "5ddddf934d2187d084c75b7e27797hol",
  size_kb: 42.4,
  overrides: {
    theme_default: {
      tz_sw: {
        filePath: "tz_sw/audio/asset_override_only.mp3",
        md5Checksum: "5ddddf934d2187d084c75b7e27797hol",
        size_kb: 42.4,
      },
    },
  },
  overridesOnly: true,
};

/** The absolute webview `src` that `saveFile` resolves a file on device to */
const localSrc = (targetPath: string) =>
  `capacitor://localhost/_capacitor_file_/data/${targetPath}`;

/**
 * Local storage path a downloaded asset file is saved under. Deliberately not namespaced per pack,
 * so a file fetched by one pack is found (and skipped) by the next pack that ships it.
 */
const packPath = (relativePath: string) => `remote_assets/${relativePath}`;

/**
 * The value recorded in `_assets_contents.filePath` once THIS app integrated the slot. Manifest
 * entries carry the pack-relative path instead, so tests use it to distinguish integrated slots
 * from ones merely described by the manifest.
 */
const localAssetPath = (targetPath: string) => `local://${targetPath}`;

/**
 * An absolute path as recorded by app versions before `local://` existed, embedding a container
 * that iOS has since relocated. `MOCK` is the deployment name from `MOCK_DEPLOYMENT_CONFIG`.
 */
const legacyLocalSrc = (targetPath: string) =>
  `capacitor://localhost/_capacitor_file_/var/mobile/Containers/Data/Application/OLD-UUID/Documents/MOCK/${targetPath}`;

/** Build an `_asset_packs` row, so fixtures only state the fields the test is about */
function buildMockAssetPack(overrides: Partial<IDBAssetPack> = {}): IDBAssetPack {
  return {
    id: "asset_pack_1",
    name: "asset_pack_1",
    download_status: "completed",
    download_started_at: "2024-01-01T00:00:00.000Z",
    download_completed_at: "2024-01-01T00:01:00.000Z",
    download_status_updated_at: "2024-01-01T00:01:00.000Z",
    assets_total_count: 1,
    assets_downloaded_count: 1,
    version: "",
    available_version: "",
    update_available: false,
    has_completed_download: false,
    version_checked_at: "",
    version_check_attempted_at: "",
    version_check_status: "never",
    ...overrides,
  };
}

/**
 * Stateful `_asset_packs` store modelling the real DynamicDataService write semantics, so tests can
 * assert on the state a row actually ends up in rather than on which write method produced it:
 * `update` merges into an existing row (omitted keys survive) and inserts only when `upsert: true`,
 * while `upsert` replaces the whole document. Writing without either is a genuine error in the real
 * service, so the fake throws rather than silently doing nothing.
 */
function installAssetPackStore(mock: jasmine.SpyObj<DynamicDataService>) {
  const rows = new Map<string, IDBAssetPack>();
  const history: IDBAssetPack[] = [];
  /** Rows for flows other than `_asset_packs`, set by tests that need them */
  const otherFlowRows: Record<string, any[]> = {};
  const record = (id: string) => history.push(clone(rows.get(id)));

  mock.upsert.and.callFake(async (_type, flow_name, row: any) => {
    if (flow_name !== "_asset_packs") return;
    rows.set(row.id, { ...row });
    record(row.id);
  });
  mock.update.and.callFake(async (_type, flow_name, id: string, update: any, options?: any) => {
    if (flow_name !== "_asset_packs") return;
    const existing = rows.get(id);
    if (existing) rows.set(id, { ...existing, ...update });
    else if (options?.upsert) rows.set(id, { ...update });
    else throw new Error(`[Update Fail] no doc exists for data_list:_asset_packs with id: ${id}`);
    record(id);
  });
  mock.snapshot.and.callFake(async (_type, flow_name) => {
    if (flow_name === "_asset_packs") return [...rows.values()] as any;
    return (otherFlowRows[flow_name] || []) as any;
  });

  return {
    /** Preload rows, e.g. a pack left behind by a previous session */
    seed: (...seedRows: IDBAssetPack[]) => seedRows.forEach((row) => rows.set(row.id, { ...row })),
    setFlowRows: (flow_name: string, flowRows: any[]) => (otherFlowRows[flow_name] = flowRows),
    /** Row state after each write - i.e. the sequence of states a pack moved through */
    history,
    /** The stored row, failing loudly rather than yielding undefined if it was never written */
    get: (id = "asset_pack_1"): IDBAssetPack => {
      const row = rows.get(id);
      if (!row) throw new Error(`No _asset_packs row for ${id}`);
      return row;
    },
    has: (id: string) => rows.has(id),
    /**
     * Statuses the pack moved through, ignoring writes that left the status unchanged (progress
     * counts, version-check bookkeeping). Tests care about the transitions, not how many unrelated
     * writes happened to land in between.
     */
    statusTransitions: () =>
      history
        .map((row) => row.download_status)
        .filter((status, index, all) => index === 0 || status !== all[index - 1]),
  };
}

const MOCK_ASSET_CONTENTS_PACK_ROWS: FlowTypes.Data_listRow<IAssetEntry>[] = [
  clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>,
  clone(MOCK_ASSET_ENTRY_WITH_OVERRIDES) as FlowTypes.Data_listRow<IAssetEntry>,
  clone(MOCK_ASSET_ENTRY_OVERRIDES_ONLY) as FlowTypes.Data_listRow<IAssetEntry>,
];

const MOCK_ASSET_CONTENTS_PACK_ROWS_HASHMAP: Record<
  string,
  FlowTypes.Data_listRow<IAssetEntry>
> = arrayToHashmap(MOCK_ASSET_CONTENTS_PACK_ROWS, "id");

const MOCK_ASSET_CONTENTS_PACK: FlowTypes.AssetPack = {
  flow_type: "asset_pack",
  flow_name: "_assets_contents",
  rows: MOCK_ASSET_CONTENTS_PACK_ROWS,
  rowsHashmap: MOCK_ASSET_CONTENTS_PACK_ROWS_HASHMAP,
};

const MOCK_DEPLOYMENT_CONFIG: Partial<IDeploymentRuntimeConfig> = {
  name: "MOCK",
  supabase: {
    enabled: true,
  },
};

/**
 * `TemplateActionService` resolves its dependencies from the injector on demand, so a stub only has
 * to answer the registry under test plus the handful of services `handleActions` touches
 */
const mockTemplateActionInjector = (registry: TemplateActionRegistry): Injector =>
  ({
    get: (token: any) => {
      if (token === TemplateActionRegistry) return registry;
      if (token === TemplateNavService) {
        return { handleNavActionsFromChild: () => null, isReady: () => true, ready: () => true };
      }
      return { ready: () => true, isReady: () => true };
    },
  }) as Injector;

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/remote-asset/remote-asset.service.spec.ts
 */
describe("RemoteAssetsService", () => {
  let service: RemoteAssetService;
  let mockDynamicDataService: jasmine.SpyObj<DynamicDataService>;
  let mockNetworkService: jasmine.SpyObj<NetworkService>;
  let mockSystemVariableService: jasmine.SpyObj<SystemVariableService>;
  let assetPacks: ReturnType<typeof installAssetPackStore>;

  beforeEach(() => {
    mockDynamicDataService = jasmine.createSpyObj<DynamicDataService>("DynamicDataService", [
      "upsert",
      "update",
      "snapshot",
      "resetFlow",
    ]);
    assetPacks = installAssetPackStore(mockDynamicDataService);
    mockDynamicDataService.resetFlow.and.resolveTo();
    mockNetworkService = jasmine.createSpyObj<NetworkService>("NetworkService", [
      "isOffline",
      "waitUntilConnected",
      "onStatusChange",
    ]);
    mockNetworkService.isOffline.and.returnValue(false);
    mockNetworkService.waitUntilConnected.and.resolveTo();
    mockNetworkService.onStatusChange.and.returnValue(() => undefined);
    mockSystemVariableService = jasmine.createSpyObj<SystemVariableService>(
      "SystemVariableService",
      ["set", "get", "remove"]
    );

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: DeploymentService, useValue: new MockDeploymentService(MOCK_DEPLOYMENT_CONFIG) },
        { provide: DynamicDataService, useValue: mockDynamicDataService },
        { provide: NetworkService, useValue: mockNetworkService },
        { provide: SystemVariableService, useValue: mockSystemVariableService },
      ],
    });
    service = TestBed.inject(RemoteAssetService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("generates an asset contents pack from asset contents", () => {
    const assetContentsPack = service["generateAssetContentsPack"](MOCK_ASSETS_CONTENTS_LIST);
    expect(assetContentsPack).toEqual(MOCK_ASSET_CONTENTS_PACK);
  });

  it("adds filepath to asset entry for asset without overrides", () => {
    const assetEntryWithFilePath = service["addFilePathToAssetEntry"](
      MOCK_ASSET_ENTRY,
      "new/path/to/asset.png"
    );
    expect(assetEntryWithFilePath).toEqual({
      ...MOCK_ASSET_ENTRY,
      filePath: "new/path/to/asset.png",
    });
  });

  it("adds filepath to asset entry for asset with overrides", () => {
    const assetEntryWithOverrideWithFilePath = service["addFilePathToAssetEntry"](
      MOCK_ASSET_ENTRY_WITH_OVERRIDES,
      "new/path/to/asset_with_overrides.mp3",
      { themeName: "theme_default", languageCode: "tz_sw" }
    );
    expect(assetEntryWithOverrideWithFilePath).toEqual({
      id: "audio/asset_with_overrides.mp3",
      md5Checksum: "5ddddf934d2187d084c75b7e27797fae",
      size_kb: 43.4,
      overrides: {
        theme_default: {
          tz_sw: {
            filePath: "new/path/to/asset_with_overrides.mp3",
            md5Checksum: "d851eef52c8d12fdbf0497210961a407",
            size_kb: 21.6,
          },
        },
      },
    });
  });

  it("adds filepath to asset entry for asset that is solely an override", () => {
    const assetEntryWithOverrideWithFilePath = service["addFilePathToAssetEntry"](
      MOCK_ASSET_ENTRY_WITH_OVERRIDES,
      "new/path/to/asset_with_overrides.mp3",
      { themeName: "theme_default", languageCode: "tz_sw" }
    );
    expect(assetEntryWithOverrideWithFilePath).toEqual({
      id: "audio/asset_with_overrides.mp3",
      md5Checksum: "5ddddf934d2187d084c75b7e27797fae",
      size_kb: 43.4,
      overrides: {
        theme_default: {
          tz_sw: {
            filePath: "new/path/to/asset_with_overrides.mp3",
            md5Checksum: "d851eef52c8d12fdbf0497210961a407",
            size_kb: 21.6,
          },
        },
      },
    });
  });

  it("counts download files including overrides and excludes base for overridesOnly", () => {
    const total = service["countDownloadFiles"]([
      MOCK_ASSET_ENTRY,
      MOCK_ASSET_ENTRY_WITH_OVERRIDES,
      MOCK_ASSET_ENTRY_OVERRIDES_ONLY,
    ]);
    expect(total).toBe(4);
  });

  it("resets downloaded asset pack contents and metadata", async () => {
    await service.reset();

    expect(mockDynamicDataService.resetFlow.calls.allArgs()).toEqual([
      ["asset_pack", "_assets_contents"],
      ["data_list", "_asset_packs"],
    ]);
  });

  it("cancels active asset pack downloads before resetting contents and metadata", async () => {
    spyOn(service, "cancelActiveAssetPackDownloads").and.resolveTo();

    await service.reset();

    expect(service.cancelActiveAssetPackDownloads).toHaveBeenCalled();
    expect(mockDynamicDataService.resetFlow.calls.allArgs()).toEqual([
      ["asset_pack", "_assets_contents"],
      ["data_list", "_asset_packs"],
    ]);
  });

  it("deletes every pack's downloaded files when resetting", async () => {
    spyOn(Capacitor, "isNativePlatform").and.returnValue(true);
    const deleteSavedFolderSpy = spyOn(
      service["fileManagerService"],
      "deleteSavedFolder"
    ).and.resolveTo(true);

    await service.reset();

    // The whole remote_assets folder, never the deployment folder (which also holds non-asset files)
    expect(deleteSavedFolderSpy).toHaveBeenCalledWith("remote_assets");
  });

  it("waits for a cancelled download to finish writing before deleting storage", async () => {
    spyOn(Capacitor, "isNativePlatform").and.returnValue(true);
    // Aborting does not interrupt a `saveFile` already underway, so reset has to wait for the
    // attempt to settle - otherwise a straggling write re-creates files just after the delete
    let finishDownload!: () => void;
    const downloadWriting = new Promise<void>((resolve) => (finishDownload = resolve));
    let downloadFinished = false;
    let deletedWhileStillWriting = false;
    spyOn<any>(service, "runAssetPackDownload").and.returnValue(
      downloadWriting.then(() => {
        downloadFinished = true;
        return true;
      })
    );
    spyOn(service["fileManagerService"], "deleteSavedFolder").and.callFake(async () => {
      deletedWhileStillWriting = !downloadFinished;
      return true;
    });
    /** Run every pending continuation; only microtasks are involved, so this settles the chain */
    const flush = async () => {
      for (let i = 0; i < 100; i++) await Promise.resolve();
    };

    await service.downloadAssetPackByName("asset_pack_1", { awaitCompletion: false });
    const resetComplete = service.reset();
    // Give reset every chance to run ahead of the still-writing download before releasing it
    await flush();
    finishDownload();
    await resetComplete;

    expect(deletedWhileStillWriting).toBeFalse();
  });

  it("leaves the data lists alone when deleting files fails", async () => {
    spyOn(console, "error");
    spyOn(Capacitor, "isNativePlatform").and.returnValue(true);
    spyOn(service["fileManagerService"], "deleteSavedFolder").and.rejectWith(new Error("EACCES"));

    const success = await service.reset();

    // Clearing them anyway would claim nothing is downloaded while the storage stayed occupied
    expect(success).toBeFalse();
    expect(mockDynamicDataService.resetFlow).not.toHaveBeenCalled();
  });

  it("does not attempt to delete files when resetting on web", async () => {
    spyOn(Capacitor, "isNativePlatform").and.returnValue(false);
    const deleteSavedFolderSpy = spyOn(service["fileManagerService"], "deleteSavedFolder");

    await service.reset();

    expect(deleteSavedFolderSpy).not.toHaveBeenCalled();
    expect(mockDynamicDataService.resetFlow).toHaveBeenCalled();
  });

  it("stores in-progress and completed status for asset pack downloads", async () => {
    spyOn<any>(service, "isOffline").and.returnValue(false);
    const assetPackManifest: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: "asset_pack_1",
      rows: [],
    };
    spyOn<any>(service, "getAssetPackManifest").and.resolveTo(assetPackManifest);
    spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo({ failedCount: 0 });

    const success = await service.downloadAssetPackByName("asset_pack_1");
    const rows = assetPacks.history;

    expect(success).toBeTrue();
    expect(assetPacks.statusTransitions()).toEqual(["in_progress", "completed"]);
    expect(rows[0]).toEqual(
      jasmine.objectContaining({
        id: "asset_pack_1",
        name: "asset_pack_1",
        download_status: "in_progress",
        download_started_at: jasmine.any(String),
        download_completed_at: "",
        download_status_updated_at: jasmine.any(String),
        assets_total_count: 0,
        assets_downloaded_count: 0,
      })
    );
    // Counts are written separately, merging into the row rather than replacing it
    expect(rows[1]).toEqual(
      jasmine.objectContaining({ assets_total_count: 0, assets_downloaded_count: 0 })
    );
    expect(rows[2]).toEqual(
      jasmine.objectContaining({
        id: "asset_pack_1",
        name: "asset_pack_1",
        download_status: "completed",
        download_started_at: rows[0].download_started_at,
        download_completed_at: jasmine.any(String),
        download_status_updated_at: jasmine.any(String),
        assets_total_count: 0,
        assets_downloaded_count: 0,
        // Completing is what marks the pack as having been usable
        has_completed_download: true,
      })
    );
    expect(mockDynamicDataService.update).toHaveBeenCalledWith(
      "data_list",
      "_asset_packs",
      "asset_pack_1",
      {
        assets_total_count: 0,
        assets_downloaded_count: 0,
      }
    );
  });

  it("persists a downloaded count covering every asset, including overrides", async () => {
    spyOn<any>(service, "isOffline").and.returnValue(false);
    // Stub a provider so the (web) download path can resolve public URLs without real network calls
    service["provider"] = {
      getPublicUrl: (path: string) => `https://cdn.example.com/${path}`,
    } as any;
    // 3 rows but 4 files: a base asset, a base asset + 1 override, and 1 override-only asset
    const assetPackManifest: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: "asset_pack_1",
      rows: [
        clone(MOCK_ASSET_ENTRY),
        clone(MOCK_ASSET_ENTRY_WITH_OVERRIDES),
        clone(MOCK_ASSET_ENTRY_OVERRIDES_ONLY),
      ] as FlowTypes.Data_listRow<IAssetEntry>[],
    };
    spyOn<any>(service, "getAssetPackManifest").and.resolveTo(assetPackManifest);

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(assetPacks.get()).toEqual(
      jasmine.objectContaining({
        download_status: "completed",
        assets_total_count: 4,
        assets_downloaded_count: 4,
      })
    );
  });

  it("stores error status for failed asset pack downloads", async () => {
    spyOn<any>(service, "isOffline").and.returnValue(false);
    const consoleErrorSpy = spyOn(console, "error");
    const assetPackManifest: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: "asset_pack_1",
      rows: [],
    };
    spyOn<any>(service, "getAssetPackManifest").and.resolveTo(assetPackManifest);
    spyOn<any>(service, "downloadAndIntegrateAssetPack").and.rejectWith(
      new Error("Download failed")
    );

    const success = await service.downloadAssetPackByName("asset_pack_1");
    const rows = assetPacks.history;

    expect(success).toBeFalse();
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(assetPacks.statusTransitions()).toEqual(["in_progress", "error"]);
    // A first download that fails has nothing usable to fall back on, so it does surface as `error`
    expect(assetPacks.get()).toEqual(
      jasmine.objectContaining({
        id: "asset_pack_1",
        name: "asset_pack_1",
        download_status: "error",
        download_started_at: rows[0].download_started_at,
        download_completed_at: "",
        download_status_updated_at: jasmine.any(String),
        has_completed_download: false,
      })
    );
  });

  it("stores waiting status and resumes asset pack downloads when connection returns", async () => {
    const waitForConnectionSpy = spyOn<any>(service, "waitForConnection").and.resolveTo();
    spyOn<any>(service, "isOffline").and.returnValues(true, false);
    const assetPackManifest: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: "asset_pack_1",
      rows: [],
    };
    spyOn<any>(service, "getAssetPackManifest").and.resolveTo(assetPackManifest);
    spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo({ failedCount: 0 });

    const success = await service.downloadAssetPackByName("asset_pack_1");
    const rows = assetPacks.history;

    expect(success).toBeTrue();
    expect(waitForConnectionSpy).toHaveBeenCalled();
    expect(assetPacks.statusTransitions()).toEqual([
      "waiting_for_connection",
      "in_progress",
      "completed",
    ]);
    // The whole attempt keeps one start timestamp, across parking and resuming
    expect(rows.every((row) => row.download_started_at === rows[0].download_started_at)).toBeTrue();
  });

  it("updates asset_pack_download_in_progress while downloading", async () => {
    spyOn<any>(service, "isOffline").and.returnValue(false);
    const assetPackManifest: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: "asset_pack_1",
      rows: [],
    };
    spyOn<any>(service, "getAssetPackManifest").and.resolveTo(assetPackManifest);
    spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo({ failedCount: 0 });

    await service.downloadAssetPackByName("asset_pack_1");

    expect(mockSystemVariableService.set.calls.allArgs()).toContain([
      "ASSET_PACK_DOWNLOAD_IN_PROGRESS",
      "true",
    ]);
    expect(mockSystemVariableService.set.calls.allArgs()).toContain([
      "ASSET_PACK_DOWNLOAD_IN_PROGRESS",
      "false",
    ]);
  });

  it("cancels an active asset pack download while waiting for connection", async () => {
    let resolveWaitStarted!: () => void;
    const waitStarted = new Promise<void>((resolve) => {
      resolveWaitStarted = resolve;
    });
    const removeConnectionStatusListener = jasmine.createSpy("removeConnectionStatusListener");
    spyOn<any>(service, "isOffline").and.returnValue(true);
    mockNetworkService.onStatusChange.and.returnValue(removeConnectionStatusListener);
    mockNetworkService.waitUntilConnected.and.callFake((signal?: AbortSignal) => {
      resolveWaitStarted();
      return new Promise<void>((_resolve, reject) => {
        signal?.addEventListener(
          "abort",
          () => {
            const error = new Error("Download cancelled");
            error.name = "AbortError";
            reject(error);
          },
          { once: true }
        );
      });
    });

    const downloadPromise = service.downloadAssetPackByName("asset_pack_1");
    await waitStarted;
    const cancelSuccess = await service.cancelAssetPackDownloadByName("asset_pack_1");
    const downloadSuccess = await downloadPromise;
    const rows = assetPacks.history;

    expect(cancelSuccess).toBeTrue();
    expect(downloadSuccess).toBeFalse();
    expect(removeConnectionStatusListener).toHaveBeenCalled();
    // Never completed before, so cancelling leaves it `cancelled` rather than restoring `completed`
    expect(assetPacks.statusTransitions()).toEqual(["waiting_for_connection", "cancelled"]);
    expect(rows[1].download_started_at).toBe(rows[0].download_started_at);
  });

  /**
   * `cancel_download` bypasses the template action queue so it can land at any point mid-attempt,
   * including while a status write from that attempt is mid-flight. If such a write completed it
   * would overwrite `cancelled` with `in_progress` and the pack would auto-resume on next launch,
   * silently undoing the cancel.
   */
  it("does not let a cancelled attempt's in-flight status write overwrite the cancelled status", async () => {
    spyOn<any>(service, "isOffline").and.returnValue(false);
    let releaseSnapshot!: () => void;
    let signalSnapshotStarted!: () => void;
    const snapshotBlocked = new Promise<void>((resolve) => (releaseSnapshot = resolve));
    const snapshotStarted = new Promise<void>((resolve) => (signalSnapshotStarted = resolve));
    // Park the download inside the read half of its "in_progress" write, then cancel underneath it
    let blockNextSnapshot = true;
    mockDynamicDataService.snapshot.and.callFake(async (_type, flow_name) => {
      if (flow_name === "_asset_packs" && blockNextSnapshot) {
        blockNextSnapshot = false;
        signalSnapshotStarted();
        await snapshotBlocked;
      }
      return [] as any;
    });
    const manifestSpy = spyOn<any>(service, "getAssetPackManifest").and.resolveTo(null);

    const downloadPromise = service.downloadAssetPackByName("asset_pack_1");
    await snapshotStarted;
    // the cancel takes effect synchronously, but its own write queues behind the parked one
    const cancelPromise = service.cancelAssetPackDownloadByName("asset_pack_1");
    await new Promise((resolve) => setTimeout(resolve, 0));
    releaseSnapshot();
    const [cancelSuccess, downloadSuccess] = await Promise.all([cancelPromise, downloadPromise]);
    const updateRows = mockDynamicDataService.update.calls
      .allArgs()
      .filter(([, flow_name]) => flow_name === "_asset_packs")
      .map(([, , , row]) => row as Partial<IDBAssetPack>);

    expect(cancelSuccess).toBeTrue();
    expect(downloadSuccess).toBeFalse();
    expect(updateRows.map((row) => row.download_status)).toEqual(["cancelled"]);
    // the cancelled attempt abandoned the download rather than continuing to the manifest
    expect(manifestSpy).not.toHaveBeenCalled();
  });

  /**
   * The abort checks above cannot catch a write that was already issued when the cancel landed:
   * `dynamicDataService.update` awaits internally before it writes, so an attempt's `in_progress`
   * write can be applied *after* the `cancelled` one that was issued later. Status writes are
   * serialised to keep them in issue order.
   */
  it("does not let a status write already in flight overwrite the cancelled status", async () => {
    spyOn<any>(service, "isOffline").and.returnValue(false);
    let releaseFirstUpdate!: () => void;
    let signalFirstUpdateStarted!: () => void;
    const firstUpdateBlocked = new Promise<void>((resolve) => (releaseFirstUpdate = resolve));
    const firstUpdateStarted = new Promise<void>((resolve) => (signalFirstUpdateStarted = resolve));
    // Stateful row so the assertion reads the value that actually survived, not the write order
    let assetPackRow: IDBAssetPack | undefined;
    let blockNextUpdate = true;
    mockDynamicDataService.update.and.callFake(
      async (_type, flow_name, _id: string, update: any) => {
        if (flow_name !== "_asset_packs") return;
        // stand in for the await inside the dynamic-data write, holding this write open mid-flight
        if (blockNextUpdate) {
          blockNextUpdate = false;
          signalFirstUpdateStarted();
          await firstUpdateBlocked;
        }
        assetPackRow = { ...(assetPackRow || { id: _id }), ...update };
      }
    );
    mockDynamicDataService.snapshot.and.callFake(async (_type, flow_name) =>
      flow_name === "_asset_packs" && assetPackRow ? ([assetPackRow] as any) : []
    );
    spyOn<any>(service, "getAssetPackManifest").and.resolveTo(null);

    const downloadPromise = service.downloadAssetPackByName("asset_pack_1");
    await firstUpdateStarted;
    const cancelPromise = service.cancelAssetPackDownloadByName("asset_pack_1");
    // Flush pending microtasks: an unserialised cancel writes `cancelled` here, while the attempt's
    // own `in_progress` write is still parked and would land afterwards
    await new Promise((resolve) => setTimeout(resolve, 0));
    releaseFirstUpdate();
    const [cancelSuccess, downloadSuccess] = await Promise.all([cancelPromise, downloadPromise]);

    expect(cancelSuccess).toBeTrue();
    expect(downloadSuccess).toBeFalse();
    expect(assetPackRow?.download_status).toBe("cancelled");
  });

  /**
   * The bug this whole mechanism exists for: a download and a cancel button authored on the same
   * template share one `TemplateActionService` queue, and the download holds that queue for its full
   * duration. Drives both through the real action service to prove the cancel is not appended to it.
   */
  it("cancels a download that is holding the same template action queue", async () => {
    const registry = TestBed.inject(TemplateActionRegistry);
    // init is deferred in tests, so register the handlers the way `initialise` would
    if (!registry.has("asset_pack")) service["registerTemplateActionHandlers"]();
    service.remoteAssetsEnabled.set(true);
    spyOn<any>(service, "isOffline").and.returnValue(false);
    let assetPackRow: IDBAssetPack | undefined;
    mockDynamicDataService.update.and.callFake(
      async (_type, flow_name, id: string, update: any) => {
        if (flow_name === "_asset_packs") assetPackRow = { ...(assetPackRow || { id }), ...update };
      }
    );
    mockDynamicDataService.snapshot.and.callFake(async (_type, flow_name) =>
      flow_name === "_asset_packs" && assetPackRow ? ([assetPackRow] as any) : []
    );
    // Hold the download open inside the manifest fetch, standing in for a real pack download
    let releaseManifest!: () => void;
    let signalManifestRequested!: () => void;
    const manifestBlocked = new Promise<void>((resolve) => (releaseManifest = resolve));
    const manifestRequested = new Promise<void>((resolve) => (signalManifestRequested = resolve));
    spyOn<any>(service, "getAssetPackManifest").and.callFake(async () => {
      signalManifestRequested();
      await manifestBlocked;
      return { flow_type: "asset_pack", flow_name: "asset_pack_1", rows: [] };
    });
    const actionService = new TemplateActionService(mockTemplateActionInjector(registry));

    let downloadActionSettled = false;
    const downloadAction = actionService
      .handleActions([
        { trigger: "click", action_id: "asset_pack", args: ["download", "asset_pack_1"] },
      ])
      .then(() => (downloadActionSettled = true));
    await manifestRequested;
    await actionService.handleActions([
      { trigger: "click", action_id: "asset_pack", args: ["cancel_download"] },
    ]);

    // the cancel ran to completion while the download still held the queue
    expect(downloadActionSettled).toBeFalse();
    expect(assetPackRow?.download_status).toBe("cancelled");
    releaseManifest();
    await downloadAction;
    expect(assetPackRow?.download_status).toBe("cancelled");
    expect(service["activeAssetPackDownloads"].size).toBe(0);
  });

  it("does not start a second asset pack download while another is active", async () => {
    spyOn(console, "warn");
    service["activeAssetPackDownloads"].set("asset_pack_1", {
      abortController: new AbortController(),
      downloadStartedAt: new Date().toISOString(),
      removeConnectionStatusListener: () => undefined,
      completion: Promise.resolve(false),
    });
    const manifestSpy = spyOn<any>(service, "getAssetPackManifest").and.resolveTo(null);

    const success = await service.downloadAssetPackByName("asset_pack_2");

    expect(success).toBeFalse();
    expect(manifestSpy).not.toHaveBeenCalled();
  });

  it("does not integrate anything when manifest download fails", async () => {
    // The manifest is now a return value rather than service state, so there is no stale manifest
    // left over from a previous pack to integrate by mistake - but a failed fetch must still abort
    spyOn<any>(service, "isOffline").and.returnValue(false);
    spyOn(console, "error");
    const mockProvider = jasmine.createSpyObj<IRemoteAssetProvider>("IRemoteAssetProvider", [
      "downloadFileAsText",
    ]);
    mockProvider.downloadFileAsText.and.resolveTo(null);
    service.provider = mockProvider;
    const integrateSpy = spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo({
      failedCount: 0,
    });

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeFalse();
    expect(integrateSpy).not.toHaveBeenCalled();
    expect(assetPacks.get().download_status).toBe("error");
  });

  it("skips asset packs that are already completed when using ensureAssetPacksDownloaded", async () => {
    assetPacks.seed(buildMockAssetPack({ download_status: "completed" }));
    const downloadSpy = spyOn(service, "downloadAssetPackByName").and.resolveTo(true);

    // No version check requested, so a completed pack is skipped without any remote lookup
    const success = await service.ensureAssetPacksDownloaded(["asset_pack_1"], {
      checkForUpdates: false,
    });

    expect(success).toBeTrue();
    expect(downloadSpy).not.toHaveBeenCalled();
  });

  it("downloads asset packs that are missing or not completed when using ensureAssetPacksDownloaded", async () => {
    assetPacks.seed(
      buildMockAssetPack({
        download_status: "error",
        download_completed_at: "",
        assets_downloaded_count: 0,
      })
    );
    const downloadSpy = spyOn(service, "downloadAssetPackByName").and.resolveTo(true);

    const success = await service.ensureAssetPacksDownloaded(["asset_pack_1", "asset_pack_2"]);

    expect(success).toBeTrue();
    expect(downloadSpy.calls.allArgs()).toEqual([
      ["asset_pack_1", { debugDownloadDelayMs: 0 }],
      ["asset_pack_2", { debugDownloadDelayMs: 0 }],
    ]);
  });

  it("downloads asset packs sequentially when using ensureAssetPacksDownloaded", async () => {
    const downloadOrder: string[] = [];
    spyOn(service, "downloadAssetPackByName").and.callFake(async (assetPackName) => {
      downloadOrder.push(assetPackName);
      return true;
    });

    await service.ensureAssetPacksDownloaded(["asset_pack_1", "asset_pack_2", "asset_pack_3"]);

    expect(downloadOrder).toEqual(["asset_pack_1", "asset_pack_2", "asset_pack_3"]);
  });

  it("sets asset_pack_download_in_progress before returning when awaitCompletion is false", async () => {
    spyOn<any>(service, "isOffline").and.returnValue(false);
    let resolveManifest!: () => void;
    const manifestPromise = new Promise<FlowTypes.AssetPack>((resolve) => {
      resolveManifest = () =>
        resolve({
          flow_type: "asset_pack",
          flow_name: "asset_pack_1",
          rows: [],
        });
    });
    spyOn<any>(service, "getAssetPackManifest").and.returnValue(manifestPromise);
    spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo({ failedCount: 0 });
    mockSystemVariableService.set.calls.reset();

    const success = await service.ensureAssetPacksDownloaded(["asset_pack_1"], {
      awaitCompletion: false,
    });

    expect(success).toBeTrue();
    expect(mockSystemVariableService.set).toHaveBeenCalledWith(
      "ASSET_PACK_DOWNLOAD_IN_PROGRESS",
      "true"
    );
    expect(service["downloadAndIntegrateAssetPack"]).not.toHaveBeenCalled();

    resolveManifest();
    await manifestPromise;
  });

  it("returns immediately without setting asset_pack_download_in_progress when all packs are completed", async () => {
    assetPacks.seed(buildMockAssetPack({ download_status: "completed" }));
    mockSystemVariableService.set.calls.reset();

    const success = await service.ensureAssetPacksDownloaded(["asset_pack_1"], {
      awaitCompletion: false,
      checkForUpdates: false,
    });

    expect(success).toBeTrue();
    expect(mockSystemVariableService.set).not.toHaveBeenCalledWith(
      "ASSET_PACK_DOWNLOAD_IN_PROGRESS",
      "true"
    );
  });

  it("retries packs refused by a different in-flight download rather than dropping them", async () => {
    // Drive each attempt by hand, mirroring the real cleanup that frees the single download slot
    const attempted: string[] = [];
    const settleAttempt: Record<string, () => void> = {};
    spyOn<any>(service, "runAssetPackDownload").and.callFake(async (assetPackName: string) => {
      attempted.push(assetPackName);
      await new Promise<void>((resolve) => (settleAttempt[assetPackName] = resolve));
      service["activeAssetPackDownloads"].delete(assetPackName);
      return true;
    });
    /** Run every pending continuation; only microtasks are involved, so this settles the chain */
    const flush = async () => {
      for (let i = 0; i < 100; i++) await Promise.resolve();
    };

    await service.downloadAssetPackByName("asset_pack_1", { awaitCompletion: false });
    const started = await service.ensureAssetPacksDownloaded(["asset_pack_2", "asset_pack_3"], {
      awaitCompletion: false,
    });

    // Refused while asset_pack_1 holds the slot, but the queue must survive the refusal
    expect(started).toBeFalse();
    expect(attempted).toEqual(["asset_pack_1"]);

    settleAttempt["asset_pack_1"]();
    await flush();
    expect(attempted).toEqual(["asset_pack_1", "asset_pack_2"]);

    settleAttempt["asset_pack_2"]();
    await flush();
    expect(attempted).toEqual(["asset_pack_1", "asset_pack_2", "asset_pack_3"]);

    settleAttempt["asset_pack_3"]();
    await flush();
  });

  /**
   * Configure a native download so the real download/integrate path runs against spies.
   * Returns the provider `downloadFile` spy and the mocked file manager for per-test assertions.
   * Spies are safe: this is invoked synchronously from within each `it`, so Jasmine still
   * auto-restores them (the no-unsafe-spy rule cannot see through the helper call).
   */
  /* eslint-disable jasmine/no-unsafe-spy */
  function setupNativeDownload(
    manifestRows: FlowTypes.Data_listRow<IAssetEntry>[],
    existingContentsRows: Partial<IAssetEntry>[] = [],
    assetPackName = "asset_pack_1"
  ) {
    spyOn(Capacitor, "isNativePlatform").and.returnValue(true);
    spyOn<any>(service, "isOffline").and.returnValue(false);
    const manifest: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: assetPackName,
      rows: manifestRows,
    };
    spyOn<any>(service, "getAssetPackManifest").and.resolveTo(manifest);
    const downloadFileSpy = jasmine.createSpy("downloadFile").and.resolveTo(new Blob(["x"]));
    service["provider"] = { downloadFile: downloadFileSpy } as any;

    const fileManager = service["fileManagerService"];
    const saveFileSpy = spyOn(fileManager, "saveFile").and.callFake(async ({ targetPath }) => ({
      localFilepath: `file:///data/${targetPath}`,
      src: localSrc(targetPath),
    }));
    // Native is faked, so an unstubbed stat would hit the real Capacitor Filesystem plugin and can
    // hang until Jasmine's timeout. Default to "nothing on disk"; tests that need a present file
    // override via the returned spy.
    const getSavedFileInfoSpy = spyOn(fileManager, "getSavedFileInfo").and.resolveTo({
      exists: false,
    });

    // `_asset_packs` state comes from the shared store; feed `_assets_contents` from the fixture
    assetPacks.setFlowRows("_assets_contents", existingContentsRows);

    return {
      downloadFileSpy,
      saveFileSpy,
      getSavedFileInfoSpy,
      getAssetPackRow: () => assetPacks.get(assetPackName),
    };
  }
  /* eslint-enable jasmine/no-unsafe-spy */

  it("skips downloading a file already present on disk with matching size and recorded checksum", async () => {
    const { downloadFileSpy, saveFileSpy, getAssetPackRow, getSavedFileInfoSpy } =
      setupNativeDownload(
        [clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>],
        // Previously integrated from this manifest (recorded checksum matches, filePath points at the
        // local file) -> trustworthy on disk
        [
          {
            id: "images/asset.png",
            md5Checksum: MOCK_ASSET_ENTRY.md5Checksum,
            size_kb: 100,
            filePath: localAssetPath(packPath("images/asset.png")),
          },
        ]
      );
    // 102400 bytes -> size_kb 100, matching MOCK_ASSET_ENTRY
    getSavedFileInfoSpy.and.resolveTo({
      exists: true,
      sizeBytes: 102400,
    });

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(downloadFileSpy).not.toHaveBeenCalled();
    expect(saveFileSpy).not.toHaveBeenCalled();
    // Still integrated into the contents list
    expect(mockDynamicDataService.update).toHaveBeenCalledWith(
      "asset_pack",
      "_assets_contents",
      "images/asset.png",
      jasmine.objectContaining({ filePath: localAssetPath(packPath("images/asset.png")) }),
      { upsert: true }
    );
    expect(getAssetPackRow()).toEqual(
      jasmine.objectContaining({
        download_status: "completed",
        assets_total_count: 1,
        assets_downloaded_count: 1,
      })
    );
  });

  it("skips a file recorded by an older app version as an absolute (now stale) path", async () => {
    // Upgrade path: rows written before `local://` existed hold an absolute path into a container
    // iOS has since relocated. The file itself is still on disk, so this must resume (and rewrite
    // the path) rather than re-download an entire pack for every user who takes the update.
    const { downloadFileSpy, getSavedFileInfoSpy } = setupNativeDownload(
      [clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>],
      [
        {
          id: "images/asset.png",
          md5Checksum: MOCK_ASSET_ENTRY.md5Checksum,
          size_kb: 100,
          filePath: legacyLocalSrc(packPath("images/asset.png")),
        },
      ]
    );
    getSavedFileInfoSpy.and.resolveTo({
      exists: true,
      sizeBytes: 102400,
    });

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(downloadFileSpy).not.toHaveBeenCalled();
    // and the stale absolute path is replaced with a container-independent one
    expect(mockDynamicDataService.update).toHaveBeenCalledWith(
      "asset_pack",
      "_assets_contents",
      "images/asset.png",
      jasmine.objectContaining({ filePath: localAssetPath(packPath("images/asset.png")) }),
      { upsert: true }
    );
  });

  it("re-downloads a present file whose on-disk size does not match the manifest", async () => {
    const { downloadFileSpy, saveFileSpy, getSavedFileInfoSpy } = setupNativeDownload(
      [clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>],
      // Fully integrated previously, so only the size mismatch should force a re-download
      [
        {
          id: "images/asset.png",
          md5Checksum: MOCK_ASSET_ENTRY.md5Checksum,
          size_kb: 100,
          filePath: localAssetPath(packPath("images/asset.png")),
        },
      ]
    );
    // Wrong size on disk (truncated / stale) -> must not be trusted
    getSavedFileInfoSpy.and.resolveTo({
      exists: true,
      sizeBytes: 999,
    });

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
  });

  it("retries a failed asset download and succeeds without failing the pack", async () => {
    const { downloadFileSpy, saveFileSpy } = setupNativeDownload([
      clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>,
    ]);
    // Backoff is real time in production; skip the waiting so the test does not sleep
    const delaySpy = spyOn<any>(service, "abortableDelay").and.resolveTo();
    let attempts = 0;
    downloadFileSpy.and.callFake(async () => (++attempts === 1 ? null : new Blob(["recovered"])));

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(downloadFileSpy).toHaveBeenCalledTimes(2);
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    // First backoff only, since the second attempt succeeded
    expect(delaySpy.calls.allArgs().map(([ms]) => ms)).toEqual([
      ASSET_DOWNLOAD_RETRY_BASE_DELAY_MS,
    ]);
  });

  it("retries an asset download that throws, not just one returning null", async () => {
    // The throw is the point of the test, so keep its expected logging out of the Karma output
    spyOn(console, "error");
    spyOn(console, "warn");
    const { downloadFileSpy } = setupNativeDownload([
      clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>,
    ]);
    spyOn<any>(service, "abortableDelay").and.resolveTo();
    let attempts = 0;
    downloadFileSpy.and.callFake(async () => {
      if (++attempts === 1) throw new Error("socket hang up");
      return new Blob(["recovered"]);
    });

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(downloadFileSpy).toHaveBeenCalledTimes(2);
  });

  it("gives up on an asset after the retry limit, backing off between attempts", async () => {
    spyOn(console, "error");
    spyOn(console, "warn");
    const { downloadFileSpy, getAssetPackRow } = setupNativeDownload([
      clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>,
    ]);
    const delaySpy = spyOn<any>(service, "abortableDelay").and.resolveTo();
    downloadFileSpy.and.resolveTo(null);

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeFalse();
    expect(downloadFileSpy).toHaveBeenCalledTimes(ASSET_DOWNLOAD_RETRY_LIMIT + 1);
    expect(delaySpy.calls.allArgs().map(([ms]) => ms)).toEqual([
      ASSET_DOWNLOAD_RETRY_BASE_DELAY_MS,
      ASSET_DOWNLOAD_RETRY_BASE_DELAY_MS * 2,
    ]);
    expect(getAssetPackRow()).toEqual(jasmine.objectContaining({ download_status: "error" }));
  });

  it("rejects a backoff whose signal has already aborted, rather than waiting it out", async () => {
    // `addEventListener("abort")` never fires on an already-aborted signal, so a naive
    // implementation sits out the full timer before anyone notices the cancel
    const controller = new AbortController();
    controller.abort();
    const startedAt = Date.now();

    await expectAsync(service["abortableDelay"](5000, controller.signal)).toBeRejectedWithError(
      "Asset pack download cancelled"
    );
    expect(Date.now() - startedAt).toBeLessThan(1000);
  });

  it("stops retrying immediately when a download is cancelled, without serving the backoff", async () => {
    spyOn(console, "error");
    spyOn(console, "warn");
    spyOn<any>(service, "isOffline").and.returnValue(false);
    const controller = new AbortController();
    // Cancel lands while the first attempt is in flight; the retry must not wait 300ms to notice
    const downloadFileSpy = jasmine.createSpy("downloadFile").and.callFake(async () => {
      controller.abort();
      return null;
    });
    service["provider"] = { downloadFile: downloadFileSpy } as any;
    const startedAt = Date.now();

    await expectAsync(
      service["withDownloadRetry"](
        "images/asset.png",
        () => service["provider"].downloadFile("images/asset.png"),
        controller.signal
      )
    ).toBeRejectedWithError("Asset pack download cancelled");

    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
    expect(Date.now() - startedAt).toBeLessThan(ASSET_DOWNLOAD_RETRY_BASE_DELAY_MS);
  });

  it("does not start another attempt if the device goes offline during the backoff", async () => {
    spyOn(console, "error");
    spyOn(console, "warn");
    let offline = false;
    spyOn<any>(service, "isOffline").and.callFake(() => offline);
    // Connectivity drops while waiting to retry, so the queued attempt must be abandoned
    spyOn<any>(service, "abortableDelay").and.callFake(async () => {
      offline = true;
    });
    const downloadFileSpy = jasmine.createSpy("downloadFile").and.resolveTo(null);
    service["provider"] = { downloadFile: downloadFileSpy } as any;

    const result = await service["withDownloadRetry"](
      "images/asset.png",
      () => service["provider"].downloadFile("images/asset.png"),
      undefined
    );

    expect(result).toBeNull();
    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
  });

  it("retries a failed manifest fetch before failing the pack attempt", async () => {
    spyOn(console, "error");
    spyOn(console, "warn");
    spyOn(Capacitor, "isNativePlatform").and.returnValue(true);
    spyOn<any>(service, "isOffline").and.returnValue(false);
    spyOn<any>(service, "abortableDelay").and.resolveTo();
    const manifest: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: "asset_pack_1",
      rows: [clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>],
    };
    // A manifest blip fails the attempt before any slot retry could help, so it needs its own
    let manifestAttempts = 0;
    const downloadFileAsTextSpy = jasmine
      .createSpy("downloadFileAsText")
      .and.callFake(async () => (++manifestAttempts === 1 ? null : JSON.stringify(manifest)));
    service["provider"] = {
      downloadFileAsText: downloadFileAsTextSpy,
      downloadFile: jasmine.createSpy("downloadFile").and.resolveTo(new Blob(["x"])),
    } as any;
    spyOn(service["fileManagerService"], "saveFile").and.resolveTo({
      localFilepath: "file:///data/x",
      src: "x",
    });

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(downloadFileAsTextSpy).toHaveBeenCalledTimes(2);
  });

  it("hands the attempt's abort signal to the provider so a transfer can stop in flight", async () => {
    const { downloadFileSpy } = setupNativeDownload([
      clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>,
    ]);

    await service.downloadAssetPackByName("asset_pack_1");

    const [, options] = downloadFileSpy.calls.argsFor(0);
    expect(options.signal).toEqual(jasmine.any(AbortSignal));
    expect(options.signal.aborted).toBeFalse();
  });

  it("does not retry a transfer the provider reports as aborted", async () => {
    spyOn(console, "error");
    spyOn(console, "warn");
    spyOn<any>(service, "isOffline").and.returnValue(false);
    const controller = new AbortController();
    const downloadFileSpy = jasmine.createSpy("downloadFile").and.callFake(async () => {
      controller.abort();
      throw new DOMException("The operation was aborted", "AbortError");
    });
    service["provider"] = { downloadFile: downloadFileSpy } as any;

    // An abort is the caller's own doing, so it must propagate rather than be spent on retries
    await expectAsync(
      service["withDownloadRetry"](
        "images/asset.png",
        () => service["provider"].downloadFile("images/asset.png", { signal: controller.signal }),
        controller.signal
      )
    ).toBeRejected();

    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
  });

  it("treats an abort as cancellation even before the signal reports aborted", async () => {
    spyOn(console, "error");
    spyOn(console, "warn");
    spyOn<any>(service, "isOffline").and.returnValue(false);
    const delaySpy = spyOn<any>(service, "abortableDelay").and.resolveTo();
    // Not an `instanceof Error` (a cross-realm DOMException behaves the same), and the signal has
    // not been observed as aborted - so only matching on the name keeps this from being retried
    const downloadFileSpy = jasmine
      .createSpy("downloadFile")
      .and.rejectWith({ name: "AbortError" });
    service["provider"] = { downloadFile: downloadFileSpy } as any;

    await expectAsync(
      service["withDownloadRetry"](
        "images/asset.png",
        () => service["provider"].downloadFile("images/asset.png"),
        new AbortController().signal
      )
    ).toBeRejected();

    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
    expect(delaySpy).not.toHaveBeenCalled();
  });

  it("surfaces a cancelled manifest fetch as an abort, not as a missing manifest", async () => {
    spyOn(console, "error");
    const controller = new AbortController();
    // Reported as null this becomes "no manifest", which the caller turns into an `error` pack
    const downloadFileAsTextSpy = jasmine.createSpy("downloadFileAsText").and.callFake(async () => {
      controller.abort();
      throw new DOMException("The operation was aborted", "AbortError");
    });
    service["provider"] = { downloadFileAsText: downloadFileAsTextSpy } as any;

    await expectAsync(
      service["getAssetPackManifest"]("asset_pack_1", controller.signal)
    ).toBeRejected();
    expect(downloadFileAsTextSpy).toHaveBeenCalledTimes(1);
  });

  it("stops retrying an asset once the device goes offline", async () => {
    // Driven directly rather than through a pack download: an offline pack parks and resumes in a
    // loop by design, which would mask what this asserts - that the slot itself stops trying and
    // hands recovery to that pack-level handler.
    spyOn<any>(service, "isOffline").and.returnValue(true);
    const delaySpy = spyOn<any>(service, "abortableDelay").and.resolveTo();
    const downloadFileSpy = jasmine.createSpy("downloadFile").and.resolveTo(null);
    service["provider"] = { downloadFile: downloadFileSpy } as any;

    const result = await service["withDownloadRetry"](
      "images/asset.png",
      () => service["provider"].downloadFile("images/asset.png"),
      undefined
    );

    expect(result).toBeNull();
    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
    expect(delaySpy).not.toHaveBeenCalled();
  });

  it("retries each slot independently rather than sharing an allowance", async () => {
    const { downloadFileSpy, saveFileSpy } = setupNativeDownload([
      clone(MOCK_ASSET_ENTRY_WITH_OVERRIDES) as FlowTypes.Data_listRow<IAssetEntry>,
    ]);
    spyOn<any>(service, "abortableDelay").and.resolveTo();
    // Base slot fails once then recovers; the override slot must start with a full allowance
    const slotResults = [null, new Blob(["base"]), null, new Blob(["override"])];
    let attempts = 0;
    downloadFileSpy.and.callFake(async () => slotResults[attempts++]);

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(downloadFileSpy).toHaveBeenCalledTimes(4);
    expect(saveFileSpy).toHaveBeenCalledTimes(2);
  });

  it("re-downloads a present file whose recorded checksum differs from the manifest (stale pack)", async () => {
    const { downloadFileSpy, getSavedFileInfoSpy } = setupNativeDownload(
      [clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>],
      // Previously integrated with a different checksum -> pack content changed
      [
        {
          id: "images/asset.png",
          md5Checksum: "OUTDATED-CHECKSUM",
          size_kb: 100,
          filePath: localAssetPath(packPath("images/asset.png")),
        },
      ]
    );
    getSavedFileInfoSpy.and.resolveTo({
      exists: true,
      sizeBytes: 102400,
    });

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
  });

  it("re-downloads a present, correctly-sized file that was never integrated (no recorded checksum)", async () => {
    // Interrupted after saveFile but before the contents upsert: the file exists with the right size
    // but there is no recorded checksum to confirm it, so it must not be skipped on trust.
    const { downloadFileSpy, getSavedFileInfoSpy } = setupNativeDownload([
      clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>,
    ]);
    getSavedFileInfoSpy.and.resolveTo({
      exists: true,
      sizeBytes: 102400,
    });

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
  });

  it("re-downloads an override recorded only by a previous base-asset integration", async () => {
    // Integrating a base asset upserts the whole manifest entry, so the row also gains every
    // override's checksum. That must not count as evidence for the override slots themselves: only
    // the recorded filePath (still the pack-relative manifest path here) proves this app saved one.
    const { downloadFileSpy, saveFileSpy, getSavedFileInfoSpy } = setupNativeDownload(
      [clone(MOCK_ASSET_ENTRY_WITH_OVERRIDES) as FlowTypes.Data_listRow<IAssetEntry>],
      [
        {
          id: "audio/asset_with_overrides.mp3",
          md5Checksum: MOCK_ASSET_ENTRY_WITH_OVERRIDES.md5Checksum,
          size_kb: 43.4,
          filePath: localAssetPath(packPath("audio/asset_with_overrides.mp3")),
          overrides: clone(MOCK_ASSET_ENTRY_WITH_OVERRIDES.overrides),
        },
      ]
    );
    // Both slots are present on disk at their manifest sizes (44442 -> 43.4kb, 22118 -> 21.6kb),
    // so only the integration evidence separates them
    getSavedFileInfoSpy.and.callFake(async (targetPath: string) => ({
      exists: true,
      sizeBytes: targetPath === packPath("audio/asset_with_overrides.mp3") ? 44442 : 22118,
    }));

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    // Base skipped (genuinely integrated), override re-downloaded (only described by the manifest)
    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
    expect(downloadFileSpy).toHaveBeenCalledWith(
      "asset_pack_1/tz_sw/audio/asset_with_overrides.mp3",
      { signal: jasmine.any(AbortSignal) }
    );
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
  });

  it("resumes per slot: skips a present base asset but downloads a missing override", async () => {
    const { downloadFileSpy, saveFileSpy, getSavedFileInfoSpy } = setupNativeDownload(
      [clone(MOCK_ASSET_ENTRY_WITH_OVERRIDES) as FlowTypes.Data_listRow<IAssetEntry>],
      // Base was integrated previously (recorded checksum and filePath match); the override never was
      [
        {
          id: "audio/asset_with_overrides.mp3",
          md5Checksum: MOCK_ASSET_ENTRY_WITH_OVERRIDES.md5Checksum,
          size_kb: 43.4,
          filePath: localAssetPath(packPath("audio/asset_with_overrides.mp3")),
        },
      ]
    );
    getSavedFileInfoSpy.and.callFake(async (targetPath: string) =>
      // base present with matching size (44442 bytes -> 43.4kb); override missing
      targetPath === packPath("audio/asset_with_overrides.mp3")
        ? { exists: true, sizeBytes: 44442 }
        : { exists: false }
    );

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
    expect(downloadFileSpy).toHaveBeenCalledWith(
      "asset_pack_1/tz_sw/audio/asset_with_overrides.mp3",
      { signal: jasmine.any(AbortSignal) }
    );
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ targetPath: packPath("tz_sw/audio/asset_with_overrides.mp3") })
    );
  });

  it("saves files under the shared remote_assets folder, not a per-pack one", async () => {
    const { saveFileSpy, getSavedFileInfoSpy } = setupNativeDownload([
      clone(MOCK_ASSET_ENTRY_WITH_OVERRIDES) as FlowTypes.Data_listRow<IAssetEntry>,
    ]);
    getSavedFileInfoSpy.and.resolveTo({ exists: false });

    await service.downloadAssetPackByName("asset_pack_1");

    // Local paths carry no pack name, so a file is stored once however many packs ship it
    expect(saveFileSpy.calls.allArgs().map(([{ targetPath }]) => targetPath)).toEqual([
      "remote_assets/audio/asset_with_overrides.mp3",
      "remote_assets/tz_sw/audio/asset_with_overrides.mp3",
    ]);
    // The remote path still identifies the pack - only local storage is shared
    expect(service["provider"].downloadFile).toHaveBeenCalledWith(
      "asset_pack_1/audio/asset_with_overrides.mp3",
      { signal: jasmine.any(AbortSignal) }
    );
  });

  it("reuses a file already fetched by a different asset pack", async () => {
    // Two packs shipping the same asset share one `_assets_contents` row and one stored file, so
    // the second pack's resume check finds the first pack's download and skips the fetch. This is
    // the de-duplication that per-pack storage folders would prevent.
    const { downloadFileSpy, saveFileSpy, getSavedFileInfoSpy } = setupNativeDownload(
      [clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>],
      // Integrated earlier by asset_pack_1; the row records no pack, only the shared local path
      [
        {
          id: "images/asset.png",
          md5Checksum: MOCK_ASSET_ENTRY.md5Checksum,
          size_kb: 100,
          filePath: localAssetPath(packPath("images/asset.png")),
        },
      ],
      "asset_pack_2"
    );
    getSavedFileInfoSpy.and.resolveTo({
      exists: true,
      sizeBytes: 102400,
    });

    const success = await service.downloadAssetPackByName("asset_pack_2");

    expect(success).toBeTrue();
    expect(downloadFileSpy).not.toHaveBeenCalled();
    expect(saveFileSpy).not.toHaveBeenCalled();
  });

  it("marks a pack with a failed file as error rather than completed", async () => {
    spyOn(console, "error");
    spyOn(console, "warn");
    const { downloadFileSpy, getAssetPackRow, getSavedFileInfoSpy } = setupNativeDownload([
      clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>,
    ]);
    spyOn<any>(service, "abortableDelay").and.resolveTo();
    // File not on disk, and the network download fails (null blob) on every attempt
    getSavedFileInfoSpy.and.resolveTo({ exists: false });
    downloadFileSpy.and.resolveTo(null);

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeFalse();
    // Retries are exhausted first, then the slot counts as failed
    expect(downloadFileSpy).toHaveBeenCalledTimes(ASSET_DOWNLOAD_RETRY_LIMIT + 1);
    expect(getAssetPackRow()).toEqual(jasmine.objectContaining({ download_status: "error" }));
  });

  it("resumes interrupted packs on init but not cancelled/error/completed ones", async () => {
    assetPacks.seed(
      buildMockAssetPack({ id: "p_in_progress", download_status: "in_progress" }),
      buildMockAssetPack({ id: "p_waiting", download_status: "waiting_for_connection" }),
      buildMockAssetPack({ id: "p_error", download_status: "error" }),
      buildMockAssetPack({ id: "p_cancelled", download_status: "cancelled" }),
      buildMockAssetPack({ id: "p_completed", download_status: "completed" })
    );
    const ensureSpy = spyOn(service, "ensureAssetPacksDownloaded").and.resolveTo(true);

    await service["resumeInterruptedAssetPackDownloads"]();

    expect(ensureSpy).toHaveBeenCalledWith(["p_in_progress", "p_waiting"], {
      awaitCompletion: false,
    });
  });

  it("joins an in-flight download for the same pack instead of reporting failure", async () => {
    const manifestSpy = spyOn<any>(service, "getAssetPackManifest").and.resolveTo(null);
    service["activeAssetPackDownloads"].set("asset_pack_1", {
      abortController: new AbortController(),
      downloadStartedAt: new Date().toISOString(),
      removeConnectionStatusListener: () => undefined,
      completion: Promise.resolve(true),
    });

    const awaited = await service.downloadAssetPackByName("asset_pack_1");
    expect(awaited).toBeTrue();

    const onDownloadStarted = jasmine.createSpy("onDownloadStarted");
    const started = await service.downloadAssetPackByName("asset_pack_1", {
      awaitCompletion: false,
      onDownloadStarted,
    });
    expect(started).toBeTrue();
    expect(onDownloadStarted).toHaveBeenCalled();
    // Joined the existing attempt; no new download was kicked off
    expect(manifestSpy).not.toHaveBeenCalled();
  });

  /**
   * A pack that has completed before is still fully usable whatever happens to a later attempt, so
   * no failure or cancellation may leave it reading as broken. The signal has to be persisted:
   * `resumeInterruptedAssetPackDownloads` filters purely on `download_status`, so an update killed
   * mid-flight comes back as a plain `in_progress` row with nothing in memory to say otherwise.
   */
  describe("attempts on a pack that has completed before", () => {
    /* eslint-disable jasmine/no-unsafe-spy -- helper is only ever called from within an `it` */
    /** Fail the download once it is under way, without the manifest fetch itself failing */
    function setupFailingAttempt() {
      spyOn<any>(service, "isOffline").and.returnValue(false);
      spyOn(console, "error");
      spyOn(console, "warn");
      spyOn<any>(service, "getAssetPackManifest").and.resolveTo({
        flow_type: "asset_pack",
        flow_name: "asset_pack_1",
        rows: [],
        version: "v2",
      } as FlowTypes.AssetPack);
      spyOn<any>(service, "downloadAndIntegrateAssetPack").and.rejectWith(
        new Error("Download failed")
      );
    }
    /* eslint-enable jasmine/no-unsafe-spy */

    it("restores completed when an interrupted update is resumed and then fails", async () => {
      // The launch-resume path: killed mid-update, so the row is `in_progress` and only the
      // persisted flag distinguishes it from a first download that never finished
      assetPacks.seed(
        buildMockAssetPack({
          download_status: "in_progress",
          version: "v1",
          available_version: "v2",
          update_available: true,
          has_completed_download: true,
        })
      );
      setupFailingAttempt();

      await service["resumeInterruptedAssetPackDownloads"]();
      // Resume is fire-and-forget, but registers the download before returning, so the attempt can
      // be awaited to completion rather than guessed at with a microtask flush
      await service["waitForActiveAssetPackDownloads"]();
      const row = assetPacks.get();

      expect(row.download_status).toBe("completed");
      // Still at the version it last fully completed, so the next check retries the update
      expect(row.version).toBe("v1");
      expect(row.update_available).toBeTrue();
    });

    it("restores completed for a pre-versioning row with no flag recorded", async () => {
      // Rows written before versioning existed have none of the new keys at all. The flag is
      // back-filled before the status leaves `completed`, which is what makes the rollout safe.
      assetPacks.seed({
        id: "asset_pack_1",
        name: "asset_pack_1",
        download_status: "completed",
      } as IDBAssetPack);
      setupFailingAttempt();

      await service["remoteAssetMetadataService"].markHasCompletedDownload("asset_pack_1");
      // The flag must be persisted while the row still reads `completed` - asserting only the end
      // state would also pass with the back-fill folded into the `in_progress` transition
      expect(assetPacks.get()).toEqual(
        jasmine.objectContaining({ download_status: "completed", has_completed_download: true })
      );

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeFalse();
      expect(assetPacks.get().download_status).toBe("completed");
    });

    it("restores completed when an explicit download fails, not only an update", async () => {
      // The flag means "has been usable before", not "this attempt is an update"
      assetPacks.seed(buildMockAssetPack({ version: "v1", has_completed_download: true }));
      setupFailingAttempt();

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeFalse();
      expect(assetPacks.statusTransitions()).toEqual(["in_progress", "completed"]);
      expect(assetPacks.get().version).toBe("v1");
    });

    it("restores completed when an attempt is cancelled", async () => {
      // `cancelled` packs never auto-resume, so cancelling a refresh would otherwise strand a
      // working pack permanently
      assetPacks.seed(buildMockAssetPack({ has_completed_download: true }));
      let resolveWaitStarted!: () => void;
      const waitStarted = new Promise<void>((resolve) => (resolveWaitStarted = resolve));
      spyOn<any>(service, "isOffline").and.returnValue(true);
      spyOn(console, "warn");
      mockNetworkService.waitUntilConnected.and.callFake((signal?: AbortSignal) => {
        resolveWaitStarted();
        return new Promise<void>((_resolve, reject) => {
          signal?.addEventListener(
            "abort",
            () => {
              const error = new Error("Download cancelled");
              error.name = "AbortError";
              reject(error);
            },
            { once: true }
          );
        });
      });

      const downloadPromise = service.downloadAssetPackByName("asset_pack_1");
      await waitStarted;
      await service.cancelAssetPackDownloadByName("asset_pack_1");
      await downloadPromise;

      expect(assetPacks.get().download_status).toBe("completed");
    });

    it("records the manifest version on a successful download", async () => {
      spyOn<any>(service, "isOffline").and.returnValue(false);
      spyOn<any>(service, "getAssetPackManifest").and.resolveTo({
        flow_type: "asset_pack",
        flow_name: "asset_pack_1",
        rows: [],
        version: "v2",
      } as FlowTypes.AssetPack);
      spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo({ failedCount: 0 });
      assetPacks.seed(
        buildMockAssetPack({ version: "v1", available_version: "v2", update_available: true })
      );

      await service.downloadAssetPackByName("asset_pack_1");
      const row = assetPacks.get();

      expect(row.version).toBe("v2");
      expect(row.update_available).toBeFalse();
      // A forced re-walk is also a successful check, so the check fields must not read as stale
      expect(row.version_check_status).toBe("ok");
      expect(row.version_checked_at).not.toBe("");
    });

    it("leaves version empty when the manifest is unversioned", async () => {
      // Packs published before versioning existed carry no version, and must not be re-versioned
      spyOn<any>(service, "isOffline").and.returnValue(false);
      spyOn<any>(service, "getAssetPackManifest").and.resolveTo({
        flow_type: "asset_pack",
        flow_name: "asset_pack_1",
        rows: [],
      } as FlowTypes.AssetPack);
      spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo({ failedCount: 0 });

      await service.downloadAssetPackByName("asset_pack_1");

      expect(assetPacks.get().version).toBe("");
      expect(assetPacks.get().update_available).toBeFalse();
    });
  });

  /**
   * The version answers only "should I walk the manifest at all?". Which files then get re-fetched
   * stays with the per-slot checksum gate, so an update transfers bytes only for what changed.
   */
  describe("version checks for downloaded packs", () => {
    /* eslint-disable jasmine/no-unsafe-spy -- helper is only ever called from within an `it` */
    /** Stub the manifest a check will fetch, and short-circuit the download it may trigger */
    function stubRemoteVersion(version?: string) {
      const manifestSpy = spyOn<any>(service, "getAssetPackManifest").and.resolveTo({
        flow_type: "asset_pack",
        flow_name: "asset_pack_1",
        rows: [],
        ...(version === undefined ? {} : { version }),
      } as FlowTypes.AssetPack);
      spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo({ failedCount: 0 });
      spyOn<any>(service, "isOffline").and.returnValue(false);
      return manifestSpy;
    }
    /* eslint-enable jasmine/no-unsafe-spy */

    /** Run every pending continuation; the mocked download path involves only microtasks */
    const flush = async () => {
      for (let i = 0; i < 100; i++) await Promise.resolve();
    };

    /** `ensure_downloaded` never awaits checks, so drain the queue they run on and let them finish */
    const settleChecks = async () => {
      await flush();
      await service["waitForActiveAssetPackDownloads"]();
    };

    it("does nothing but record the check when the version is unchanged", async () => {
      assetPacks.seed(buildMockAssetPack({ version: "v1", has_completed_download: true }));
      const manifestSpy = stubRemoteVersion("v1");

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      await settleChecks();

      expect(manifestSpy).toHaveBeenCalledTimes(1);
      expect(assetPacks.statusTransitions()).toEqual(["completed"]);
      const row = assetPacks.get();
      expect(row.version_check_status).toBe("ok");
      expect(row.update_available).toBeFalse();
    });

    it("downloads when the remote version differs", async () => {
      assetPacks.seed(buildMockAssetPack({ version: "v1", has_completed_download: true }));
      stubRemoteVersion("v2");

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      await settleChecks();

      expect(assetPacks.statusTransitions()).toEqual(["completed", "in_progress", "completed"]);
      expect(assetPacks.get().version).toBe("v2");
    });

    it("reuses the manifest the check fetched rather than fetching it twice", async () => {
      assetPacks.seed(buildMockAssetPack({ version: "v1", has_completed_download: true }));
      const manifestSpy = stubRemoteVersion("v2");

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      await settleChecks();

      expect(manifestSpy).toHaveBeenCalledTimes(1);
    });

    it("marks the pack as previously usable before the status leaves completed", async () => {
      // Written as its own operation while the row still reads `completed`; folded into the
      // `in_progress` write it would not survive the app being killed mid-update
      assetPacks.seed(buildMockAssetPack({ version: "v1" }));
      stubRemoteVersion("v2");

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      await settleChecks();

      const flagWrite = assetPacks.history.findIndex((row) => row.has_completed_download);
      const inProgressWrite = assetPacks.history.findIndex(
        (row) => row.download_status === "in_progress"
      );
      expect(flagWrite).toBeGreaterThan(-1);
      expect(flagWrite).toBeLessThan(inProgressWrite);
      expect(assetPacks.history[flagWrite].download_status).toBe("completed");
    });

    it("leaves a working pack alone when the manifest cannot be fetched", async () => {
      assetPacks.seed(buildMockAssetPack({ version: "v1", has_completed_download: true }));
      spyOn<any>(service, "isOffline").and.returnValue(false);
      spyOn<any>(service, "getAssetPackManifest").and.resolveTo(null);

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      await settleChecks();

      const row = assetPacks.get();
      // The pack is still downloaded and usable - only the *check* failed
      expect(row.download_status).toBe("completed");
      expect(row.version).toBe("v1");
      expect(row.version_check_status).toBe("failed");
      expect(Date.parse(row.version_check_attempted_at)).toBeGreaterThan(
        Date.parse(row.version_checked_at || "1970-01-01T00:00:00.000Z")
      );
    });

    it("writes nothing at all when offline", async () => {
      // Being offline is not a check failure. Recording one would both add a write on every launch
      // and destroy "failed" as a signal that something is actually wrong with the published pack.
      assetPacks.seed(buildMockAssetPack({ version: "v1", has_completed_download: true }));
      spyOn<any>(service, "isOffline").and.returnValue(true);
      const manifestSpy = spyOn<any>(service, "getAssetPackManifest").and.resolveTo(null);

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      await settleChecks();

      expect(manifestSpy).not.toHaveBeenCalled();
      expect(assetPacks.history).toEqual([]);
    });

    it("skips the check when one succeeded recently", async () => {
      assetPacks.seed(
        buildMockAssetPack({
          version: "v1",
          version_check_attempted_at: new Date().toISOString(),
          version_check_status: "ok",
        })
      );
      const manifestSpy = stubRemoteVersion("v2");

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      await settleChecks();

      expect(manifestSpy).not.toHaveBeenCalled();
    });

    it("still retries a known pending update inside the throttle window", async () => {
      // The check that found the update recorded success before the download was known to have
      // started, so throttling on that would suppress the retry after an update that failed, was
      // cancelled, or never got its turn before the app was killed
      assetPacks.seed(
        buildMockAssetPack({
          version: "v1",
          available_version: "v2",
          update_available: true,
          has_completed_download: true,
          version_check_attempted_at: new Date().toISOString(),
          version_checked_at: new Date().toISOString(),
          version_check_status: "ok",
        })
      );
      stubRemoteVersion("v2");

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      await settleChecks();

      expect(assetPacks.get().version).toBe("v2");
    });

    it("retries sooner after a failed check than after a successful one", async () => {
      // A single flaky response must not suppress updates for the full interval
      const thirtyMinutesAgo = new Date(Date.now() - 1000 * 60 * 30).toISOString();
      assetPacks.seed(
        buildMockAssetPack({
          version: "v1",
          has_completed_download: true,
          version_check_attempted_at: thirtyMinutesAgo,
          version_check_status: "failed",
        })
      );
      const manifestSpy = stubRemoteVersion("v1");

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      await settleChecks();

      expect(manifestSpy).toHaveBeenCalledTimes(1);
    });

    it("skips the check when check_for_updates is false", async () => {
      assetPacks.seed(buildMockAssetPack({ version: "v1" }));
      const manifestSpy = stubRemoteVersion("v2");

      await service.ensureAssetPacksDownloaded(["asset_pack_1"], { checkForUpdates: false });
      await settleChecks();

      expect(manifestSpy).not.toHaveBeenCalled();
    });

    it("takes no action for an unversioned manifest", async () => {
      // Packs published before versioning carry no version; treating that as "changed" would make
      // every install re-walk them on every check, forever
      assetPacks.seed(buildMockAssetPack({ version: "", has_completed_download: true }));
      stubRemoteVersion(undefined);

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      await settleChecks();

      expect(assetPacks.statusTransitions()).toEqual(["completed"]);
      expect(assetPacks.get().update_available).toBeFalse();
    });

    it("updates a pack downloaded before versioning existed", async () => {
      // The rollout path: local version empty, manifest now versioned. Walking is cheap (a stat per
      // file, no bytes for unchanged ones) and is the only way to be sure of what is on disk.
      assetPacks.seed(buildMockAssetPack({ version: "" }));
      stubRemoteVersion("v1");

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      await settleChecks();

      expect(assetPacks.get().version).toBe("v1");
    });

    it("skips the check while a download for that pack is already active", async () => {
      // An in-flight walk is already reading a manifest at least as fresh as one we would fetch
      assetPacks.seed(buildMockAssetPack({ version: "v1" }));
      const manifestSpy = stubRemoteVersion("v2");
      service["activeAssetPackDownloads"].set("asset_pack_1", {
        abortController: new AbortController(),
        downloadStartedAt: new Date().toISOString(),
        removeConnectionStatusListener: () => undefined,
        completion: Promise.resolve(true),
      });

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      await settleChecks();

      expect(manifestSpy).not.toHaveBeenCalled();
    });

    it("updates every pack that needs it, not just the first", async () => {
      // Downloads are serial, so starting them inside the check loop would make the packs refuse
      // each other - and a refused pack has already recorded a successful check, so nothing would
      // retry it until the throttle expired
      assetPacks.seed(
        buildMockAssetPack({ id: "asset_pack_1", version: "v1", has_completed_download: true }),
        buildMockAssetPack({ id: "asset_pack_2", version: "v1", has_completed_download: true })
      );
      spyOn<any>(service, "isOffline").and.returnValue(false);
      spyOn<any>(service, "getAssetPackManifest").and.callFake(async (name: string) => ({
        flow_type: "asset_pack",
        flow_name: name,
        rows: [],
        version: "v2",
      }));
      // Hold each download open, so the first is genuinely still occupying the single download slot
      // while the second is checked. An instantly-resolving download would free the slot during the
      // second pack's own awaits, and the test would pass either way.
      const releaseDownload: (() => void)[] = [];
      spyOn<any>(service, "downloadAndIntegrateAssetPack").and.callFake(
        () => new Promise((resolve) => releaseDownload.push(() => resolve({ failedCount: 0 })))
      );

      await service.ensureAssetPacksDownloaded(["asset_pack_1", "asset_pack_2"]);
      // Let each held download finish in turn, freeing the slot for the next
      for (let i = 0; i < 5; i++) {
        await flush();
        releaseDownload.splice(0).forEach((release) => release());
      }
      await settleChecks();

      expect(assetPacks.get("asset_pack_1").version).toBe("v2");
      expect(assetPacks.get("asset_pack_2").version).toBe("v2");
    });

    it("retries an update refused by an unrelated active download", async () => {
      assetPacks.seed(buildMockAssetPack({ version: "v1", has_completed_download: true }));
      stubRemoteVersion("v2");
      // A different pack holds the single download slot
      let settleOther!: () => void;
      const otherCompletion = new Promise<boolean>(
        (resolve) => (settleOther = () => resolve(true))
      );
      service["activeAssetPackDownloads"].set("other_pack", {
        abortController: new AbortController(),
        downloadStartedAt: new Date().toISOString(),
        removeConnectionStatusListener: () => undefined,
        completion: otherCompletion,
      });

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      // Flush only - the update is parked waiting on the other download, so awaiting active
      // downloads here would deadlock the test on a promise it has not released yet
      await flush();
      // Refused so far, but not abandoned
      expect(assetPacks.get().version).toBe("v1");

      service["activeAssetPackDownloads"].delete("other_pack");
      settleOther();
      await flush();

      expect(assetPacks.get().version).toBe("v2");
    });

    it("takes no action when the remote manifest has no version but the local one does", async () => {
      // Never downgrade a versioned pack because a manifest was republished without a version
      assetPacks.seed(buildMockAssetPack({ version: "v1", has_completed_download: true }));
      stubRemoteVersion(undefined);

      await service.ensureAssetPacksDownloaded(["asset_pack_1"]);
      await settleChecks();

      expect(assetPacks.statusTransitions()).toEqual(["completed"]);
      expect(assetPacks.get().version).toBe("v1");
      expect(assetPacks.get().update_available).toBeFalse();
    });

    it("does not block the action queue on the check", async () => {
      // `ensure_downloaded` promises the pack is usable, not that it is the latest
      assetPacks.seed(buildMockAssetPack({ version: "v1" }));
      spyOn<any>(service, "isOffline").and.returnValue(false);
      let releaseManifest!: () => void;
      spyOn<any>(service, "getAssetPackManifest").and.returnValue(
        new Promise((resolve) => (releaseManifest = () => resolve(null)))
      );

      const success = await service.ensureAssetPacksDownloaded(["asset_pack_1"]);

      // Resolved while the manifest fetch is still outstanding
      expect(success).toBeTrue();
      releaseManifest();
      await settleChecks();
    });
  });

  it("fetches the manifest with caching bypassed", async () => {
    // Buckets serve long cache headers, so a cached manifest reports a stale version and updates
    // silently never land - and would still pass every test on a fresh install
    const mockProvider = jasmine.createSpyObj<IRemoteAssetProvider>("IRemoteAssetProvider", [
      "downloadFileAsText",
    ]);
    mockProvider.downloadFileAsText.and.resolveTo(null);
    service.provider = mockProvider;
    spyOn<any>(service, "isOffline").and.returnValue(false);
    spyOn(console, "error");

    await service.downloadAssetPackByName("asset_pack_1");

    expect(mockProvider.downloadFileAsText).toHaveBeenCalledWith("asset_pack_1/asset_pack_1.json", {
      noCache: true,
      signal: jasmine.any(AbortSignal),
    });
  });

  describe("asset pack metadata", () => {
    let metadata: RemoteAssetMetadataService;

    beforeEach(() => {
      metadata = service["remoteAssetMetadataService"];
    });

    /**
     * The guard against the write mechanism regressing to a full-document upsert, which silently
     * erases every field the status writer does not name. Deliberately asserts the version fields
     * survive *without* `setDownloadStatus` knowing they exist - naming them here would test the
     * carry-through rather than the merge.
     */
    it("preserves fields a status change knows nothing about", async () => {
      assetPacks.seed(
        buildMockAssetPack({
          version: "v1",
          available_version: "v2",
          update_available: true,
          has_completed_download: true,
          version_checked_at: "2024-06-01T00:00:00.000Z",
          version_check_attempted_at: "2024-06-01T00:00:00.000Z",
          version_check_status: "ok",
        })
      );

      await metadata.setDownloadStatus("asset_pack_1", "in_progress");

      expect(assetPacks.get()).toEqual(
        jasmine.objectContaining({
          download_status: "in_progress",
          version: "v1",
          available_version: "v2",
          update_available: true,
          has_completed_download: true,
          version_checked_at: "2024-06-01T00:00:00.000Z",
          version_check_attempted_at: "2024-06-01T00:00:00.000Z",
          version_check_status: "ok",
        })
      );
    });

    /**
     * The success write is a single operation covering status, version and check bookkeeping.
     * Splitting it would leave a window where the pack reads completed at the wrong version, and
     * omitting the check fields would make a forced `download` leave them looking stale.
     */
    it("records version and check state in the same write as completion", async () => {
      assetPacks.seed(
        buildMockAssetPack({
          download_status: "in_progress",
          version: "v1",
          available_version: "v2",
          update_available: true,
          version_checked_at: "2024-06-01T00:00:00.000Z",
        })
      );

      await metadata.setDownloadStatus("asset_pack_1", "completed", {}, {}, { version: "v2" });
      const row = assetPacks.get();

      expect(row.download_status).toBe("completed");
      expect(row.version).toBe("v2");
      expect(row.available_version).toBe("v2");
      expect(row.update_available).toBeFalse();
      expect(row.has_completed_download).toBeTrue();
      // Walking the manifest to completion is itself a successful check
      expect(row.version_check_status).toBe("ok");
      expect(row.version_checked_at).toBe(row.download_status_updated_at);
      expect(row.version_check_attempted_at).toBe(row.version_checked_at);
      // A single write, so there is never a moment where status and version disagree
      expect(assetPacks.history.length).toBe(1);
    });

    it("leaves version untouched when completing without one", async () => {
      // e.g. restoring `completed` after a failed update: the pack is usable but still at its old
      // version, and the next check must therefore still see an update available
      assetPacks.seed(
        buildMockAssetPack({
          download_status: "in_progress",
          version: "v1",
          update_available: true,
        })
      );

      await metadata.setDownloadStatus("asset_pack_1", "completed");
      const row = assetPacks.get();

      expect(row.version).toBe("v1");
      expect(row.update_available).toBeTrue();
      expect(row.has_completed_download).toBeTrue();
    });

    it("creates a complete row when a download writes status for an unknown pack", async () => {
      await metadata.setDownloadStatus("new_pack", "in_progress");

      // Every field present, so later partial writes always merge into a well-formed row
      expect(assetPacks.get("new_pack")).toEqual({
        id: "new_pack",
        name: "new_pack",
        download_status: "in_progress",
        download_started_at: jasmine.any(String),
        download_completed_at: "",
        download_status_updated_at: jasmine.any(String),
        assets_total_count: 0,
        assets_downloaded_count: 0,
        version: "",
        available_version: "",
        update_available: false,
        has_completed_download: false,
        version_checked_at: "",
        version_check_attempted_at: "",
        version_check_status: "never",
      });
    });

    /**
     * Row creation is a privilege of the download path. A version check only ever runs against a
     * pack that already completed, so conjuring a row from one would mean inventing a
     * `download_status` that never happened.
     */
    it("does not create a row from version check bookkeeping", async () => {
      await expectAsync(metadata.recordVersionCheckSuccess("ghost_pack", "v1")).toBeRejected();
      await expectAsync(metadata.recordVersionCheckFailure("ghost_pack")).toBeRejected();
      await expectAsync(metadata.markHasCompletedDownload("ghost_pack")).toBeRejected();

      expect(assetPacks.has("ghost_pack")).toBeFalse();
    });

    it("records a successful check, leaving download status untouched", async () => {
      assetPacks.seed(buildMockAssetPack({ version: "v1" }));

      await metadata.recordVersionCheckSuccess("asset_pack_1", "v2");
      const row = assetPacks.get();

      expect(row.download_status).toBe("completed");
      expect(row.available_version).toBe("v2");
      expect(row.update_available).toBeTrue();
      expect(row.version_check_status).toBe("ok");
      // A successful check leaves the two timestamps equal
      expect(row.version_check_attempted_at).toBe(row.version_checked_at);
    });

    it("leaves download status untouched when a check fails", async () => {
      assetPacks.seed(
        buildMockAssetPack({ version: "v1", version_checked_at: "2024-06-01T00:00:00.000Z" })
      );

      await metadata.recordVersionCheckFailure("asset_pack_1");
      const row = assetPacks.get();

      // The invariant authoring reads: attempted later than checked means the last check failed
      expect(row.download_status).toBe("completed");
      expect(row.version_check_status).toBe("failed");
      expect(Date.parse(row.version_check_attempted_at)).toBeGreaterThan(
        Date.parse(row.version_checked_at)
      );
      expect(row.version).toBe("v1");
    });

    it("does not report an update available for an unversioned manifest", async () => {
      assetPacks.seed(buildMockAssetPack({ version: "v1" }));

      await metadata.recordVersionCheckSuccess("asset_pack_1", "");

      // Nothing to compare against, so an unversioned pack can never signal an update
      expect(assetPacks.get().update_available).toBeFalse();
    });

    it("treats a legacy completed row as having been downloaded", async () => {
      // Rows written before these fields existed have none of the keys at all
      assetPacks.seed({
        id: "asset_pack_1",
        name: "asset_pack_1",
        download_status: "completed",
      } as IDBAssetPack);

      const state = await metadata.getVersionCheckState("asset_pack_1");

      expect(state).toEqual({
        version: "",
        availableVersion: "",
        hasCompletedDownload: true,
        versionCheckedAt: "",
        versionCheckAttemptedAt: "",
        versionCheckStatus: "never",
      });
    });
  });
});

describe("resolveEnsureDownloadedAssetPackList", () => {
  it("returns a single-item list from asset_pack", () => {
    expect(resolveEnsureDownloadedAssetPackList({ asset_pack: "asset_pack_1" })).toEqual([
      "asset_pack_1",
    ]);
  });

  it("returns asset_pack_list when provided", () => {
    expect(
      resolveEnsureDownloadedAssetPackList({
        asset_pack_list: ["asset_pack_1", "asset_pack_2"],
      })
    ).toEqual(["asset_pack_1", "asset_pack_2"]);
  });

  it("parses asset_pack_list from a JSON string array", () => {
    expect(
      resolveEnsureDownloadedAssetPackList({
        asset_pack_list: '["debug_asset_pack_1","pack_2"]',
      })
    ).toEqual(["debug_asset_pack_1", "pack_2"]);
  });

  it("parses a single asset pack name from asset_pack_list string", () => {
    expect(
      resolveEnsureDownloadedAssetPackList({
        asset_pack_list: "asset_pack_1",
      })
    ).toEqual(["asset_pack_1"]);
  });

  it("prefers asset_pack_list when both params are provided", () => {
    expect(
      resolveEnsureDownloadedAssetPackList({
        asset_pack: "asset_pack_solo",
        asset_pack_list: ["asset_pack_1", "asset_pack_2"],
      })
    ).toEqual(["asset_pack_1", "asset_pack_2"]);
  });

  it("returns null when no asset pack params are provided", () => {
    expect(resolveEnsureDownloadedAssetPackList({})).toBeNull();
    expect(resolveEnsureDownloadedAssetPackList()).toBeNull();
  });
});

describe("shouldAwaitEnsureDownloaded", () => {
  it("defaults to true when await is omitted", () => {
    expect(shouldAwaitEnsureDownloaded({ asset_pack: "asset_pack_1" })).toBeTrue();
    expect(shouldAwaitEnsureDownloaded()).toBeTrue();
  });

  it("parses authored boolean strings for await", () => {
    expect(shouldAwaitEnsureDownloaded({ await: false })).toBeFalse();
    expect(shouldAwaitEnsureDownloaded({ await: "false" })).toBeFalse();
    expect(shouldAwaitEnsureDownloaded({ await: true })).toBeTrue();
    expect(shouldAwaitEnsureDownloaded({ await: "true" })).toBeTrue();
  });
});

describe("shouldCheckForUpdates", () => {
  it("defaults to true when check_for_updates is omitted", () => {
    expect(shouldCheckForUpdates({ asset_pack: "asset_pack_1" })).toBeTrue();
    expect(shouldCheckForUpdates()).toBeTrue();
  });

  it("parses authored boolean strings for check_for_updates", () => {
    expect(shouldCheckForUpdates({ check_for_updates: false })).toBeFalse();
    expect(shouldCheckForUpdates({ check_for_updates: "false" })).toBeFalse();
    expect(shouldCheckForUpdates({ check_for_updates: true })).toBeTrue();
    expect(shouldCheckForUpdates({ check_for_updates: "true" })).toBeTrue();
  });

  it("still checks when given an unparseable value", () => {
    // Keeping downloaded packs current is the normal case, so anything short of an explicit `false`
    // checks - a typo must not silently leave a deployment stuck on old content
    expect(shouldCheckForUpdates({ check_for_updates: "yes please" })).toBeTrue();
  });
});

describe("RemoteAssetActionFactory ensure_downloaded", () => {
  it("passes awaitCompletion false when await is false", async () => {
    const mockService = {
      remoteAssetsEnabled: () => true,
      ensureAssetPacksDownloaded: jasmine
        .createSpy("ensureAssetPacksDownloaded")
        .and.resolveTo(true),
    } as unknown as RemoteAssetService;
    const { asset_pack } = new RemoteAssetActionFactory(mockService);

    await asset_pack({
      trigger: "click",
      action_id: "asset_pack",
      args: ["ensure_downloaded"],
      params: { asset_pack: "asset_pack_1", await: false },
    });

    expect(mockService.ensureAssetPacksDownloaded).toHaveBeenCalledWith(["asset_pack_1"], {
      awaitCompletion: false,
      debugDownloadDelayMs: 0,
      checkForUpdates: true,
    });
  });

  it("passes awaitCompletion true by default", async () => {
    const mockService = {
      remoteAssetsEnabled: () => true,
      ensureAssetPacksDownloaded: jasmine
        .createSpy("ensureAssetPacksDownloaded")
        .and.resolveTo(true),
    } as unknown as RemoteAssetService;
    const { asset_pack } = new RemoteAssetActionFactory(mockService);

    await asset_pack({
      trigger: "click",
      action_id: "asset_pack",
      args: ["ensure_downloaded"],
      params: { asset_pack: "asset_pack_1" },
    });

    expect(mockService.ensureAssetPacksDownloaded).toHaveBeenCalledWith(["asset_pack_1"], {
      awaitCompletion: true,
      debugDownloadDelayMs: 0,
      checkForUpdates: true,
    });
  });

  it("passes an authored debug_download_delay_ms to ensureAssetPacksDownloaded", async () => {
    const mockService = {
      remoteAssetsEnabled: () => true,
      ensureAssetPacksDownloaded: jasmine
        .createSpy("ensureAssetPacksDownloaded")
        .and.resolveTo(true),
    } as unknown as RemoteAssetService;
    const { asset_pack } = new RemoteAssetActionFactory(mockService);

    await asset_pack({
      trigger: "click",
      action_id: "asset_pack",
      args: ["ensure_downloaded"],
      // Authoring params arrive as strings
      params: { asset_pack: "asset_pack_1", debug_download_delay_ms: "3000" },
    });

    expect(mockService.ensureAssetPacksDownloaded).toHaveBeenCalledWith(["asset_pack_1"], {
      awaitCompletion: true,
      debugDownloadDelayMs: 3000,
      checkForUpdates: true,
    });
  });
});

describe("RemoteAssetActionFactory download", () => {
  it("passes an authored debug_download_delay_ms to downloadAssetPackByName", async () => {
    const mockService = {
      remoteAssetsEnabled: () => true,
      downloadAssetPackByName: jasmine.createSpy("downloadAssetPackByName").and.resolveTo(true),
    } as unknown as RemoteAssetService;
    const { asset_pack } = new RemoteAssetActionFactory(mockService);

    await asset_pack({
      trigger: "click",
      action_id: "asset_pack",
      args: ["download", "asset_pack_1"],
      params: { debug_download_delay_ms: 3000 },
    });

    expect(mockService.downloadAssetPackByName).toHaveBeenCalledWith("asset_pack_1", {
      debugDownloadDelayMs: 3000,
    });
  });

  it("takes the asset pack name from an asset_pack param when given no arg", async () => {
    const mockService = {
      remoteAssetsEnabled: () => true,
      downloadAssetPackByName: jasmine.createSpy("downloadAssetPackByName").and.resolveTo(true),
    } as unknown as RemoteAssetService;
    const { asset_pack } = new RemoteAssetActionFactory(mockService);

    await asset_pack({
      trigger: "click",
      action_id: "asset_pack",
      args: ["download"],
      params: { asset_pack: "asset_pack_1" },
    });

    expect(mockService.downloadAssetPackByName).toHaveBeenCalledWith("asset_pack_1", {
      debugDownloadDelayMs: 0,
    });
  });

  it("does not download when no asset pack name is provided", async () => {
    spyOn(console, "error");
    const mockService = {
      remoteAssetsEnabled: () => true,
      downloadAssetPackByName: jasmine.createSpy("downloadAssetPackByName").and.resolveTo(true),
    } as unknown as RemoteAssetService;
    const { asset_pack } = new RemoteAssetActionFactory(mockService);

    await asset_pack({ trigger: "click", action_id: "asset_pack", args: ["download"], params: {} });

    expect(mockService.downloadAssetPackByName).not.toHaveBeenCalled();
  });
});

describe("resolveDownloadAssetPackName", () => {
  it("reads the name from the action arg", () => {
    expect(resolveDownloadAssetPackName(["asset_pack_1"])).toEqual("asset_pack_1");
  });

  it("falls back to the asset_pack param", () => {
    expect(resolveDownloadAssetPackName([], { asset_pack: "asset_pack_1" })).toEqual(
      "asset_pack_1"
    );
    expect(resolveDownloadAssetPackName(undefined, { asset_pack: " asset_pack_1 " })).toEqual(
      "asset_pack_1"
    );
  });

  it("prefers the action arg when both are provided", () => {
    expect(
      resolveDownloadAssetPackName(["asset_pack_arg"], { asset_pack: "asset_pack_param" })
    ).toEqual("asset_pack_arg");
  });

  it("returns null when no name is provided", () => {
    expect(resolveDownloadAssetPackName()).toBeNull();
    expect(resolveDownloadAssetPackName([""], { asset_pack: "  " })).toBeNull();
  });
});

describe("isImmediateAssetPackAction", () => {
  const action = { trigger: "click", action_id: "asset_pack" } as FlowTypes.TemplateRowAction;

  it("marks cancel_download as immediate so it can interrupt a download holding the queue", () => {
    expect(isImmediateAssetPackAction({ ...action, args: ["cancel_download"] })).toBeTrue();
  });

  it("leaves every other asset_pack action on the queue", () => {
    expect(
      isImmediateAssetPackAction({ ...action, args: ["download", "asset_pack_1"] })
    ).toBeFalse();
    expect(isImmediateAssetPackAction({ ...action, args: ["ensure_downloaded"] })).toBeFalse();
    expect(isImmediateAssetPackAction({ ...action, args: ["reset"] })).toBeFalse();
    expect(isImmediateAssetPackAction({ ...action, args: undefined })).toBeFalse();
  });
});

describe("resolveDebugDownloadDelayMs", () => {
  it("defaults to no delay when the param is absent or empty", () => {
    expect(resolveDebugDownloadDelayMs()).toBe(0);
    expect(resolveDebugDownloadDelayMs({})).toBe(0);
    expect(resolveDebugDownloadDelayMs({ debug_download_delay_ms: "" })).toBe(0);
  });

  it("parses authored numbers and numeric strings", () => {
    expect(resolveDebugDownloadDelayMs({ debug_download_delay_ms: 3000 })).toBe(3000);
    expect(resolveDebugDownloadDelayMs({ debug_download_delay_ms: "3000" })).toBe(3000);
  });

  it("falls back to no delay for unparseable or negative values", () => {
    spyOn(console, "warn");
    expect(resolveDebugDownloadDelayMs({ debug_download_delay_ms: "soon" })).toBe(0);
    expect(resolveDebugDownloadDelayMs({ debug_download_delay_ms: -1 })).toBe(0);
  });
});
