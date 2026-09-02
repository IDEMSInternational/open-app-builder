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
import { zipSync } from "fflate";
import { arrayToHashmap } from "../../utils";
import { DeploymentService } from "../deployment/deployment.service";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";
import type { IRemoteAssetProvider } from "./providers/base.remote-asset";
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
    download_progress_percent: 100,
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
  // `_assets_contents` rows are written in bulk by the archive path. Applying them to the same
  // store the snapshots read from matters: after an archive fails the service re-snapshots to see
  // what it already integrated, and would otherwise re-fetch the lot.
  mock.bulkUpsert.and.callFake(async (_type, flow_name, bulkRows: any[]) => {
    const byId = new Map((otherFlowRows[flow_name] || []).map((row: any) => [row.id, row]));
    for (const row of bulkRows) byId.set(row.id, clone(row));
    otherFlowRows[flow_name] = [...byId.values()];
  });
  mock.snapshot.and.callFake(async (_type, flow_name) => {
    if (flow_name === "_asset_packs") return [...rows.values()] as any;
    return (otherFlowRows[flow_name] || []) as any;
  });

  return {
    /** Preload rows, e.g. a pack left behind by a previous session */
    seed: (...seedRows: IDBAssetPack[]) => seedRows.forEach((row) => rows.set(row.id, { ...row })),
    setFlowRows: (flow_name: string, flowRows: any[]) => (otherFlowRows[flow_name] = flowRows),
    /** Rows currently stored for a non-`_asset_packs` flow, e.g. integrated `_assets_contents` */
    getFlowRows: (flow_name: string) => (otherFlowRows[flow_name] || []) as any[],
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
      "bulkUpsert",
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

  it("does not count an override with no file path as a downloadable slot", () => {
    // A corrupt or hand-edited manifest can carry one. Counting it would set a total the download
    // can never reach, leaving the pack permanently short of complete.
    const total = service["countDownloadFiles"]([
      {
        id: "audio/a.mp3",
        overrides: {
          theme_default: {
            tz_sw: { filePath: "tz_sw/audio/a.mp3", md5Checksum: "x", size_kb: 1 },
            ke_sw: { filePath: "", md5Checksum: "y", size_kb: 1 },
          },
        },
      } as unknown as IAssetEntry,
    ]);
    expect(total).toBe(2);
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
      jasmine.objectContaining({
        assets_total_count: 0,
        assets_downloaded_count: 0,
        download_progress_percent: 0,
      })
    );
    // Progress is written once more on success regardless of throttling, so a completed pack can
    // never be left showing a partial bar
    expect(rows[2]).toEqual(jasmine.objectContaining({ download_progress_percent: 100 }));
    expect(rows[3]).toEqual(
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
        download_progress_percent: 0,
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

    // `_asset_packs` state comes from the shared store; feed `_assets_contents` from the fixture
    assetPacks.setFlowRows("_assets_contents", existingContentsRows);

    return {
      downloadFileSpy,
      saveFileSpy,
      getAssetPackRow: () => assetPacks.get(assetPackName),
    };
  }
  /* eslint-enable jasmine/no-unsafe-spy */

  it("skips downloading a file already present on disk with matching size and recorded checksum", async () => {
    const { downloadFileSpy, saveFileSpy, getAssetPackRow } = setupNativeDownload(
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
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.resolveTo({
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
    const { downloadFileSpy } = setupNativeDownload(
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
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.resolveTo({
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
    const { downloadFileSpy, saveFileSpy } = setupNativeDownload(
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
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.resolveTo({
      exists: true,
      sizeBytes: 999,
    });

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
  });

  it("re-downloads a present file whose recorded checksum differs from the manifest (stale pack)", async () => {
    const { downloadFileSpy } = setupNativeDownload(
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
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.resolveTo({
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
    const { downloadFileSpy } = setupNativeDownload([
      clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>,
    ]);
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.resolveTo({
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
    const { downloadFileSpy, saveFileSpy } = setupNativeDownload(
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
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.callFake(
      async (targetPath: string) => ({
        exists: true,
        sizeBytes: targetPath === packPath("audio/asset_with_overrides.mp3") ? 44442 : 22118,
      })
    );

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    // Base skipped (genuinely integrated), override re-downloaded (only described by the manifest)
    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
    expect(downloadFileSpy).toHaveBeenCalledWith(
      "asset_pack_1/tz_sw/audio/asset_with_overrides.mp3"
    );
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
  });

  it("resumes per slot: skips a present base asset but downloads a missing override", async () => {
    const { downloadFileSpy, saveFileSpy } = setupNativeDownload(
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
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.callFake(
      async (targetPath: string) =>
        // base present with matching size (44442 bytes -> 43.4kb); override missing
        targetPath === packPath("audio/asset_with_overrides.mp3")
          ? { exists: true, sizeBytes: 44442 }
          : { exists: false }
    );

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
    expect(downloadFileSpy).toHaveBeenCalledWith(
      "asset_pack_1/tz_sw/audio/asset_with_overrides.mp3"
    );
    expect(saveFileSpy).toHaveBeenCalledTimes(1);
    expect(saveFileSpy).toHaveBeenCalledWith(
      jasmine.objectContaining({ targetPath: packPath("tz_sw/audio/asset_with_overrides.mp3") })
    );
  });

  it("saves files under the shared remote_assets folder, not a per-pack one", async () => {
    const { saveFileSpy } = setupNativeDownload([
      clone(MOCK_ASSET_ENTRY_WITH_OVERRIDES) as FlowTypes.Data_listRow<IAssetEntry>,
    ]);
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.resolveTo({ exists: false });

    await service.downloadAssetPackByName("asset_pack_1");

    // Local paths carry no pack name, so a file is stored once however many packs ship it
    expect(saveFileSpy.calls.allArgs().map(([{ targetPath }]) => targetPath)).toEqual([
      "remote_assets/audio/asset_with_overrides.mp3",
      "remote_assets/tz_sw/audio/asset_with_overrides.mp3",
    ]);
    // The remote path still identifies the pack - only local storage is shared
    expect(service["provider"].downloadFile).toHaveBeenCalledWith(
      "asset_pack_1/audio/asset_with_overrides.mp3"
    );
  });

  it("reuses a file already fetched by a different asset pack", async () => {
    // Two packs shipping the same asset share one `_assets_contents` row and one stored file, so
    // the second pack's resume check finds the first pack's download and skips the fetch. This is
    // the de-duplication that per-pack storage folders would prevent.
    const { downloadFileSpy, saveFileSpy } = setupNativeDownload(
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
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.resolveTo({
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
    const { downloadFileSpy, getAssetPackRow } = setupNativeDownload([
      clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>,
    ]);
    // File not on disk, and the network download fails (null blob)
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.resolveTo({ exists: false });
    downloadFileSpy.and.resolveTo(null);

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeFalse();
    expect(downloadFileSpy).toHaveBeenCalledTimes(1);
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
  describe("asset pack archives", () => {
    /** Manifest entry sized to match the bytes a fixture file will actually contain */
    const archiveEntry = (id: string, bytes: number, extra: Partial<IAssetEntry> = {}) =>
      ({
        id,
        md5Checksum: `checksum-${id}`,
        size_kb: Math.round(bytes / 102.4) / 10,
        ...extra,
      }) as FlowTypes.Data_listRow<IAssetEntry>;

    const fileOfLength = (length: number, fill = 97) => new Uint8Array(length).fill(fill);

    /** Byte offset of the second entry's local file header, i.e. just past the first entry */
    function secondEntryOffset(zipBytes: Uint8Array) {
      let found = 0;
      for (let i = 0; i < zipBytes.length - 3; i++) {
        const isLocalHeader =
          zipBytes[i] === 0x50 &&
          zipBytes[i + 1] === 0x4b &&
          zipBytes[i + 2] === 0x03 &&
          zipBytes[i + 3] === 0x04;
        if (isLocalHeader && ++found === 2) return i;
      }
      throw new Error("Test archive has fewer than two entries");
    }

    /** Serve bytes as a genuine chunked ReadableStream, so the streaming path is really exercised */
    function streamingResponse(body: Uint8Array, { chunkSize = 64, status = 200 } = {}) {
      return {
        ok: status >= 200 && status < 300,
        status,
        headers: { get: (name: string) => (name === "content-length" ? `${body.length}` : null) },
        body: {
          getReader: () => {
            let offset = 0;
            return {
              read: async () => {
                if (offset >= body.length) return { done: true, value: undefined };
                const value = body.slice(offset, offset + chunkSize);
                offset += chunkSize;
                return { done: false, value };
              },
              cancel: async () => undefined,
            };
          },
        },
      } as any;
    }

    /* eslint-disable jasmine/no-unsafe-spy */
    function setupArchiveDownload(options: {
      manifestRows: FlowTypes.Data_listRow<IAssetEntry>[];
      /** Contents of the archive, keyed by pack-relative path */
      archiveFiles: Record<string, Uint8Array>;
      existingContentsRows?: Partial<IAssetEntry>[];
      version?: string;
      /** Deflate these entries, to prove both compression methods extract */
      deflatePaths?: string[];
      /** Return this instead of the archive bytes */
      respondWith?: () => any;
      assetPackName?: string;
    }) {
      const {
        manifestRows,
        archiveFiles,
        existingContentsRows = [],
        version = "v1",
        deflatePaths = [],
        respondWith,
        assetPackName = "asset_pack_1",
      } = options;

      spyOn(Capacitor, "isNativePlatform").and.returnValue(true);
      spyOn<any>(service, "isOffline").and.returnValue(false);
      const manifest: FlowTypes.AssetPack = {
        flow_type: "asset_pack",
        flow_name: assetPackName,
        version,
        rows: manifestRows,
      };
      spyOn<any>(service, "getAssetPackManifest").and.resolveTo(manifest);

      const zipInput: Record<string, any> = {};
      for (const [path, data] of Object.entries(archiveFiles)) {
        zipInput[path] = [data, { level: deflatePaths.includes(path) ? 6 : 0 }];
      }
      const archiveBytes = zipSync(zipInput);

      const downloadFileSpy = jasmine.createSpy("downloadFile").and.resolveTo(new Blob(["x"]));
      const getFetchableUrlSpy = jasmine
        .createSpy("getFetchableUrl")
        .and.resolveTo("https://storage.example/packs/asset_pack_1.zip?alt=media&token=abc");
      service["provider"] = {
        downloadFile: downloadFileSpy,
        getFetchableUrl: getFetchableUrlSpy,
      } as any;

      const fetchSpy = spyOn(window, "fetch").and.callFake(async () =>
        respondWith ? respondWith() : streamingResponse(archiveBytes)
      );

      const fileManager = service["fileManagerService"];
      // Model local storage, so files the archive writes are visible to any later resume check.
      // Without this a fallback after a partial archive would re-fetch files it already has, and
      // the test would pass while hiding exactly the behaviour it is meant to prove.
      const savedFiles = new Map<string, number>();
      const saveFileSpy = spyOn(fileManager, "saveFile").and.callFake(
        async ({ targetPath, data }) => {
          savedFiles.set(targetPath, data.size);
          return { localFilepath: `file:///data/${targetPath}`, src: localSrc(targetPath) };
        }
      );
      const getSavedFileInfoSpy = spyOn(fileManager, "getSavedFileInfo").and.callFake(
        async (targetPath: string) =>
          savedFiles.has(targetPath)
            ? { exists: true, sizeBytes: savedFiles.get(targetPath) }
            : { exists: false }
      );

      assetPacks.setFlowRows("_assets_contents", existingContentsRows);

      return {
        downloadFileSpy,
        getFetchableUrlSpy,
        fetchSpy,
        saveFileSpy,
        getSavedFileInfoSpy,
        savedFiles,
        archiveBytes,
        getAssetPackRow: () => assetPacks.get(assetPackName),
        contentsRow: (id: string) =>
          assetPacks.getFlowRows("_assets_contents").find((row) => row.id === id),
      };
    }
    /* eslint-enable jasmine/no-unsafe-spy */

    it("downloads a pack as one archive when nothing is present locally", async () => {
      const { fetchSpy, downloadFileSpy, saveFileSpy, getAssetPackRow, contentsRow } =
        setupArchiveDownload({
          manifestRows: [archiveEntry("images/a.png", 2048), archiveEntry("images/b.png", 1024)],
          archiveFiles: {
            "images/a.png": fileOfLength(2048),
            "images/b.png": fileOfLength(1024),
          },
        });

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeTrue();
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      // The whole point: no per-asset requests once the archive has been paid for
      expect(downloadFileSpy).not.toHaveBeenCalled();
      expect(saveFileSpy).toHaveBeenCalledTimes(2);
      // Written to the shared remote_assets folder, matching where the resume gate looks
      expect(saveFileSpy).toHaveBeenCalledWith(
        jasmine.objectContaining({ targetPath: packPath("images/a.png") })
      );
      expect(contentsRow("images/a.png").filePath).toBe(localAssetPath(packPath("images/a.png")));
      expect(getAssetPackRow()).toEqual(
        jasmine.objectContaining({
          download_status: "completed",
          assets_downloaded_count: 2,
          download_progress_percent: 100,
          version: "v1",
        })
      );
    });

    it("stamps the archive url with the manifest version without touching the storage key", async () => {
      const { fetchSpy, getFetchableUrlSpy } = setupArchiveDownload({
        manifestRows: [archiveEntry("images/a.png", 2048)],
        archiveFiles: { "images/a.png": fileOfLength(2048) },
        version: "abc123",
      });

      await service.downloadAssetPackByName("asset_pack_1");

      // The key must stay a real object path - a `?` in it simply does not exist in the bucket
      expect(getFetchableUrlSpy).toHaveBeenCalledWith("asset_pack_1/asset_pack_1.zip");
      // Joined with `&` because provider download urls already carry their own query
      expect(fetchSpy.calls.mostRecent().args[0]).toBe(
        "https://storage.example/packs/asset_pack_1.zip?alt=media&token=abc&v=abc123"
      );
    });

    it("extracts both stored and deflated entries", async () => {
      const { saveFileSpy } = setupArchiveDownload({
        manifestRows: [archiveEntry("images/a.png", 2048), archiveEntry("data/b.svg", 4096)],
        archiveFiles: {
          "images/a.png": fileOfLength(2048),
          "data/b.svg": fileOfLength(4096, 60),
        },
        deflatePaths: ["data/b.svg"],
      });

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeTrue();
      expect(saveFileSpy).toHaveBeenCalledTimes(2);
    });

    it("does not extract entries whose slot is already present on disk", async () => {
      const present = archiveEntry("images/present.png", 2048);
      const missing = archiveEntry("images/missing.png", 1024);
      const setup = setupArchiveDownload({
        manifestRows: [present, missing, archiveEntry("images/other.png", 4096)],
        archiveFiles: {
          "images/present.png": fileOfLength(2048),
          "images/missing.png": fileOfLength(1024),
          "images/other.png": fileOfLength(4096),
        },
        existingContentsRows: [
          {
            id: "images/present.png",
            md5Checksum: present.md5Checksum,
            size_kb: present.size_kb,
            filePath: localAssetPath(packPath("images/present.png")),
          },
        ],
      });
      setup.getSavedFileInfoSpy.and.callFake(async (targetPath: string) =>
        targetPath === packPath("images/present.png")
          ? { exists: true, sizeBytes: 2048 }
          : { exists: false }
      );

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeTrue();
      // Re-writing a present file wastes a write and, with shared storage, can clobber a file
      // another pack owns
      const savedPaths = setup.saveFileSpy.calls.allArgs().map(([args]) => args.targetPath);
      expect(savedPaths).not.toContain(packPath("images/present.png"));
      expect(savedPaths).toContain(packPath("images/missing.png"));
      // ...but it is still integrated, so its row carries the local path
      expect(setup.contentsRow("images/present.png").filePath).toBe(
        localAssetPath(packPath("images/present.png"))
      );
    });

    it("fetches individually when only a small fraction of the pack's bytes are missing", async () => {
      const big = archiveEntry("audio/big.mp3", 102400);
      const small = archiveEntry("images/small.png", 1024);
      const setup = setupArchiveDownload({
        manifestRows: [big, small],
        archiveFiles: {
          "audio/big.mp3": fileOfLength(102400),
          "images/small.png": fileOfLength(1024),
        },
        existingContentsRows: [
          {
            id: "audio/big.mp3",
            md5Checksum: big.md5Checksum,
            size_kb: big.size_kb,
            filePath: localAssetPath(packPath("audio/big.mp3")),
          },
        ],
      });
      setup.getSavedFileInfoSpy.and.callFake(async (targetPath: string) =>
        targetPath === packPath("audio/big.mp3")
          ? { exists: true, sizeBytes: 102400 }
          : { exists: false }
      );

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeTrue();
      // 1kb of 101kb is nowhere near worth re-pulling the whole pack
      expect(setup.fetchSpy).not.toHaveBeenCalled();
      expect(setup.downloadFileSpy).toHaveBeenCalledTimes(1);
    });

    it("uses the archive when few files but most bytes are missing", async () => {
      const big = archiveEntry("audio/big.mp3", 102400);
      const small = archiveEntry("images/small.png", 1024);
      const setup = setupArchiveDownload({
        manifestRows: [big, small],
        archiveFiles: {
          "audio/big.mp3": fileOfLength(102400),
          "images/small.png": fileOfLength(1024),
        },
        existingContentsRows: [
          {
            id: "images/small.png",
            md5Checksum: small.md5Checksum,
            size_kb: small.size_kb,
            filePath: localAssetPath(packPath("images/small.png")),
          },
        ],
      });
      setup.getSavedFileInfoSpy.and.callFake(async (targetPath: string) =>
        targetPath === packPath("images/small.png")
          ? { exists: true, sizeBytes: 1024 }
          : { exists: false }
      );

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeTrue();
      // One file of two, but ~99% of the bytes: a slot count would have got this backwards
      expect(setup.fetchSpy).toHaveBeenCalledTimes(1);
      expect(setup.downloadFileSpy).not.toHaveBeenCalled();
    });

    it("never uses an archive for a manifest with no version", async () => {
      const setup = setupArchiveDownload({
        manifestRows: [archiveEntry("images/a.png", 2048)],
        archiveFiles: { "images/a.png": fileOfLength(2048) },
        version: "",
      });

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeTrue();
      // Without a version there is nothing to stamp the url with, so a CDN could serve a stale
      // archive indefinitely and it would be recorded as current
      expect(setup.fetchSpy).not.toHaveBeenCalled();
      expect(setup.downloadFileSpy).toHaveBeenCalledTimes(1);
    });

    it("falls back to per-file downloads when no archive is published, once per session", async () => {
      const setup = setupArchiveDownload({
        manifestRows: [archiveEntry("images/a.png", 2048), archiveEntry("images/b.png", 2048)],
        archiveFiles: {},
        respondWith: () => ({ ok: false, status: 404, headers: { get: () => null } }),
      });

      expect(await service.downloadAssetPackByName("asset_pack_1")).toBeTrue();
      expect(setup.downloadFileSpy).toHaveBeenCalledTimes(2);

      setup.downloadFileSpy.calls.reset();
      setup.fetchSpy.calls.reset();
      expect(await service.downloadAssetPackByName("asset_pack_1")).toBeTrue();

      // Latched: a pack with no archive must not re-probe on every download
      expect(setup.fetchSpy).not.toHaveBeenCalled();
      expect(setup.downloadFileSpy).toHaveBeenCalledTimes(2);
    });

    it("fetches only the remainder after an archive fails midway", async () => {
      const rows = [
        archiveEntry("images/a.png", 2048),
        archiveEntry("images/b.png", 2048),
        archiveEntry("images/c.png", 2048),
      ];
      const files = {
        "images/a.png": fileOfLength(2048),
        "images/b.png": fileOfLength(2048),
        "images/c.png": fileOfLength(2048),
      };
      const full = zipSync({
        "images/a.png": [files["images/a.png"], { level: 0 }],
        "images/b.png": [files["images/b.png"], { level: 0 }],
        "images/c.png": [files["images/c.png"], { level: 0 }],
      });
      const setup = setupArchiveDownload({
        manifestRows: rows,
        archiveFiles: files,
        // Cut the stream partway through the second entry, so only the first one completes
        respondWith: () => streamingResponse(full.slice(0, secondEntryOffset(full) + 10)),
      });

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeTrue();
      // Whatever the archive did deliver is kept; only the rest is fetched individually
      const individually = setup.downloadFileSpy.calls
        .allArgs()
        .map(([path]) => path as string)
        .sort();
      expect(individually).toEqual(["asset_pack_1/images/b.png", "asset_pack_1/images/c.png"]);
      expect(setup.contentsRow("images/a.png").filePath).toBe(
        localAssetPath(packPath("images/a.png"))
      );
    });

    it("rejects an archive entry that escapes the pack root", async () => {
      const setup = setupArchiveDownload({
        manifestRows: [archiveEntry("images/a.png", 2048)],
        archiveFiles: { "images/a.png": fileOfLength(2048) },
        respondWith: () =>
          streamingResponse(zipSync({ "../escaped.png": [fileOfLength(2048), { level: 0 }] })),
      });

      await service.downloadAssetPackByName("asset_pack_1");

      const savedPaths = setup.saveFileSpy.calls.allArgs().map(([args]) => args.targetPath);
      expect(savedPaths.some((path) => path.includes(".."))).toBeFalse();
    });

    it("does not advance the recorded version when the archive is short of files", async () => {
      const setup = setupArchiveDownload({
        manifestRows: [archiveEntry("images/a.png", 2048), archiveEntry("images/b.png", 2048)],
        // Archive omits b, and the per-file fallback cannot supply it either
        archiveFiles: { "images/a.png": fileOfLength(2048) },
      });
      setup.downloadFileSpy.and.resolveTo(null);

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeFalse();
      expect(setup.getAssetPackRow()).toEqual(
        jasmine.objectContaining({ download_status: "error", version: "" })
      );
    });

    it("rejects an archive entry whose size disagrees with the manifest", async () => {
      const setup = setupArchiveDownload({
        manifestRows: [archiveEntry("images/a.png", 2048)],
        // Manifest says 2048 bytes, archive holds 4096
        archiveFiles: { "images/a.png": fileOfLength(4096) },
      });
      setup.downloadFileSpy.and.resolveTo(null);

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeFalse();
      const savedPaths = setup.saveFileSpy.calls.allArgs().map(([args]) => args.targetPath);
      expect(savedPaths).not.toContain(packPath("images/a.png"));
    });

    it("writes a row once, carrying both a base and an override local path", async () => {
      const entry = archiveEntry("audio/track.mp3", 2048, {
        overrides: {
          theme_default: {
            tz_sw: {
              filePath: "tz_sw/audio/track.mp3",
              md5Checksum: "override-checksum",
              size_kb: 1,
            },
          },
        },
      });
      const setup = setupArchiveDownload({
        manifestRows: [entry],
        // Deliberately non-adjacent ordering is impossible with two entries, so rely on the
        // override arriving last and assert the row was still written complete
        archiveFiles: {
          "audio/track.mp3": fileOfLength(2048),
          "tz_sw/audio/track.mp3": fileOfLength(1024),
        },
      });

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeTrue();
      const row = setup.contentsRow("audio/track.mp3");
      expect(row.filePath).toBe(localAssetPath(packPath("audio/track.mp3")));
      expect(row.overrides.theme_default.tz_sw.filePath).toBe(
        localAssetPath(packPath("tz_sw/audio/track.mp3"))
      );
      // One row, written once, rather than a half-updated row followed by a completion
      const bulkCalls = mockDynamicDataService.bulkUpsert.calls
        .allArgs()
        .filter(([, flow]) => flow === "_assets_contents");
      expect(bulkCalls.length).toBe(1);
    });

    it("preserves bundled keys the pack manifest does not mention", async () => {
      // A core row already carrying a base file and one override language, of which the pack
      // supplies only a second language
      const existingRow = Object.freeze({
        id: "audio/track.mp3",
        md5Checksum: "core-checksum",
        size_kb: 20,
        filePath: localAssetPath(packPath("audio/track.mp3")),
        overrides: Object.freeze({
          theme_default: Object.freeze({
            tz_sw: Object.freeze({
              filePath: localAssetPath(packPath("tz_sw/audio/track.mp3")),
              md5Checksum: "bundled-override",
              size_kb: 1,
            }),
          }),
        }),
      });
      const entry = archiveEntry("audio/track.mp3", 2048, {
        overridesOnly: true,
        overrides: {
          theme_default: {
            ke_sw: {
              filePath: "ke_sw/audio/track.mp3",
              md5Checksum: "pack-override",
              size_kb: 1,
            },
          },
        },
      });
      const setup = setupArchiveDownload({
        manifestRows: [entry],
        archiveFiles: { "ke_sw/audio/track.mp3": fileOfLength(1024) },
        existingContentsRows: [existingRow as any],
      });

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeTrue();
      const row = setup.contentsRow("audio/track.mp3");
      // The pack's new override landed...
      expect(row.overrides.theme_default.ke_sw.filePath).toBe(
        localAssetPath(packPath("ke_sw/audio/track.mp3"))
      );
      // ...without dropping the bundled base file or the bundled language
      expect(row.filePath).toBe(localAssetPath(packPath("audio/track.mp3")));
      expect(row.overrides.theme_default.tz_sw.filePath).toBe(
        localAssetPath(packPath("tz_sw/audio/track.mp3"))
      );
    });

    it("reports progress that only ever moves forward and ends at 100", async () => {
      const setup = setupArchiveDownload({
        manifestRows: [
          archiveEntry("images/a.png", 2048),
          archiveEntry("images/b.png", 2048),
          archiveEntry("images/c.png", 2048),
        ],
        archiveFiles: {
          "images/a.png": fileOfLength(2048),
          "images/b.png": fileOfLength(2048),
          "images/c.png": fileOfLength(2048),
        },
      });

      await service.downloadAssetPackByName("asset_pack_1");

      const percentages = assetPacks.history
        .map((row) => row.download_progress_percent)
        .filter((percent) => percent !== undefined);
      expect(percentages.length).toBeGreaterThan(1);
      // A bar that jumps backwards is the visible symptom of unordered progress writes
      const sorted = [...percentages].sort((a, b) => a - b);
      expect(percentages).toEqual(sorted);
      expect(setup.getAssetPackRow().download_progress_percent).toBe(100);
      // The file count stays a genuine file count throughout
      expect(setup.getAssetPackRow().assets_downloaded_count).toBe(3);
    });

    /** Every percentage the pack row was written with, in write order */
    const persistedPercentages = () =>
      assetPacks.history
        .map((row) => row.download_progress_percent)
        .filter((percent): percent is number => percent !== undefined);

    const expectNonDecreasing = (values: number[]) => {
      const decreases = values.filter((value, index) => index > 0 && value < values[index - 1]);
      // A bar that runs backwards reads as a broken download
      expect(decreases).toEqual([]);
    };

    it("does not rewind progress when an archive follows files already on disk", async () => {
      const present = archiveEntry("images/present.png", 51200);
      const missing = archiveEntry("images/missing.png", 51200);
      const another = archiveEntry("images/another.png", 51200);
      const setup = setupArchiveDownload({
        manifestRows: [present, missing, another],
        archiveFiles: {
          "images/present.png": fileOfLength(51200),
          "images/missing.png": fileOfLength(51200),
          "images/another.png": fileOfLength(51200),
        },
        existingContentsRows: [
          {
            id: "images/present.png",
            md5Checksum: present.md5Checksum,
            size_kb: present.size_kb,
            filePath: localAssetPath(packPath("images/present.png")),
          },
        ],
      });
      setup.savedFiles.set(packPath("images/present.png"), 51200);

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeTrue();
      // A third of the pack was integrated as a file count before the archive began measuring
      // bytes; without a shared baseline the second metric would restart from zero
      expectNonDecreasing(persistedPercentages());
      expect(setup.getAssetPackRow().download_progress_percent).toBe(100);
    });

    it("does not rewind progress when a truncated archive falls back to per-file", async () => {
      const rows = [
        archiveEntry("images/a.png", 2048),
        archiveEntry("images/b.png", 2048),
        archiveEntry("images/c.png", 2048),
      ];
      const files = {
        "images/a.png": fileOfLength(2048),
        "images/b.png": fileOfLength(2048),
        "images/c.png": fileOfLength(2048),
      };
      const full = zipSync({
        "images/a.png": [files["images/a.png"], { level: 0 }],
        "images/b.png": [files["images/b.png"], { level: 0 }],
        "images/c.png": [files["images/c.png"], { level: 0 }],
      });
      const setup = setupArchiveDownload({
        manifestRows: rows,
        archiveFiles: files,
        respondWith: () => streamingResponse(full.slice(0, secondEntryOffset(full) + 10)),
      });

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeTrue();
      // The per-file pass restarts its file count from zero, so the percentage has to hold where
      // the archive left it and resume from there rather than following the count down
      expectNonDecreasing(persistedPercentages());
      expect(setup.getAssetPackRow().download_progress_percent).toBe(100);
    });

    it("parks rather than blaming the archive when the connection drops", async () => {
      const setup = setupArchiveDownload({
        manifestRows: [archiveEntry("images/a.png", 2048), archiveEntry("images/b.png", 2048)],
        archiveFiles: {
          "images/a.png": fileOfLength(2048),
          "images/b.png": fileOfLength(2048),
        },
      });
      // The connection drops *during* the transfer, twice - enough to disable archives for the
      // session if a dropped connection were counted as an archive failure
      let offline = false;
      let attempts = 0;
      (service["isOffline"] as jasmine.Spy).and.callFake(() => offline);
      setup.fetchSpy.and.callFake(async () => {
        if (++attempts <= 2) {
          offline = true;
          throw new TypeError("Failed to fetch");
        }
        return streamingResponse(setup.archiveBytes);
      });
      mockNetworkService.waitUntilConnected.and.callFake(async () => {
        offline = false;
      });

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeTrue();
      // Losing the connection says nothing about the archive, so the retry still uses one, and
      // no per-file pass was spent on a request that was always going to fail
      expect(setup.downloadFileSpy).not.toHaveBeenCalled();
      expect(setup.fetchSpy.calls.count()).toBe(3);
      expect(assetPacks.statusTransitions()).toContain("waiting_for_connection");
    });

    it("tags every progress write with the attempt it belongs to", async () => {
      const setAssetCountsSpy = spyOn(
        service["remoteAssetMetadataService"],
        "setAssetCounts"
      ).and.callThrough();
      setupArchiveDownload({
        manifestRows: [archiveEntry("images/a.png", 2048), archiveEntry("images/b.png", 2048)],
        archiveFiles: {
          "images/a.png": fileOfLength(2048),
          "images/b.png": fileOfLength(2048),
        },
      });

      await service.downloadAssetPackByName("asset_pack_1");

      // Progress is reported at chunk rate and written without being awaited, so a straggler from
      // a cancelled attempt would otherwise land on the row a re-trigger has already started
      // filling. The signal is what lets the write be discarded at write time.
      expect(setAssetCountsSpy.calls.count()).toBeGreaterThan(0);
      const untagged = setAssetCountsSpy.calls
        .allArgs()
        .filter(([, , , options]) => !(options as { signal?: AbortSignal })?.signal);
      expect(untagged).toEqual([]);
    });

    it("tries archives again after a reset", async () => {
      const setup = setupArchiveDownload({
        manifestRows: [archiveEntry("images/a.png", 2048), archiveEntry("images/b.png", 2048)],
        archiveFiles: {},
        respondWith: () => ({ ok: false, status: 404, headers: { get: () => null } }),
      });

      await service.downloadAssetPackByName("asset_pack_1");
      setup.fetchSpy.calls.reset();

      await service.reset();
      await service.downloadAssetPackByName("asset_pack_1");

      // Reset means back to the pre-download state. Silently staying on the per-file path because
      // of something that happened before the reset would be unexplainable from the outside.
      expect(setup.fetchSpy).toHaveBeenCalled();
    });

    it("aborts the archive request when a download is cancelled", async () => {
      let capturedSignal: AbortSignal | undefined;
      const setup = setupArchiveDownload({
        manifestRows: [archiveEntry("images/a.png", 2048)],
        archiveFiles: { "images/a.png": fileOfLength(2048) },
      });
      setup.fetchSpy.and.callFake(async (_url: any, init: any) => {
        capturedSignal = init?.signal;
        await service.cancelAssetPackDownloadByName("asset_pack_1");
        const error = new Error("aborted");
        error.name = "AbortError";
        throw error;
      });

      const success = await service.downloadAssetPackByName("asset_pack_1");

      expect(success).toBeFalse();
      // Passed to fetch, not merely checked between files: an archive is one long request, so a
      // cancel that only stopped a loop would let the whole pack finish downloading
      expect(capturedSignal).toBeDefined();
      expect(capturedSignal.aborted).toBeTrue();
      expect(setup.getAssetPackRow().download_status).toBe("cancelled");
    });
  });

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
    });
  });

  describe("asset pack metadata", () => {
    let metadata: RemoteAssetMetadataService;

    beforeEach(() => {
      metadata = service["remoteAssetMetadataService"];
    });

    it("drops progress writes belonging to an aborted attempt", async () => {
      await metadata.setDownloadStatus("asset_pack_1", "in_progress");
      const controller = new AbortController();
      controller.abort();

      await metadata.setAssetCounts(
        "asset_pack_1",
        { assetsDownloadedCount: 7 },
        { downloadProgressPercent: 62 },
        { signal: controller.signal }
      );

      // Checked at write time rather than issue time, so a chunk-rate straggler cannot report a
      // stale figure onto a row a later attempt has already started filling
      expect(assetPacks.get()).toEqual(
        jasmine.objectContaining({ assets_downloaded_count: 0, download_progress_percent: 0 })
      );
    });

    it("writes progress for an attempt that is still live", async () => {
      await metadata.setDownloadStatus("asset_pack_1", "in_progress");

      await metadata.setAssetCounts(
        "asset_pack_1",
        { assetsDownloadedCount: 7 },
        { downloadProgressPercent: 62 },
        { signal: new AbortController().signal }
      );

      expect(assetPacks.get()).toEqual(
        jasmine.objectContaining({ assets_downloaded_count: 7, download_progress_percent: 62 })
      );
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
        download_progress_percent: 0,
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
