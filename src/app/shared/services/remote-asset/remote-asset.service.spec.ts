import { TestBed } from "@angular/core/testing";
import { Capacitor } from "@capacitor/core";
import { RemoteAssetService } from "./remote-asset.service";
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
import type { IDBAssetPack } from "./remote-asset.types";
import { NetworkService } from "../network/network.service";
import {
  resolveDebugDownloadDelayMs,
  resolveEnsureDownloadedAssetPackList,
  shouldAwaitEnsureDownloaded,
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

/**
 * The webview `src` that a file saved to local storage resolves to. A recorded `_assets_contents`
 * filePath only looks like this once THIS app integrated the slot - manifest entries carry the
 * pack-relative path instead - so tests use it to distinguish integrated slots from described ones.
 */
const localSrc = (targetPath: string) =>
  `capacitor://localhost/_capacitor_file_/data/${targetPath}`;

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
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/remote-asset/remote-asset.service.spec.ts
 */
describe("RemoteAssetsService", () => {
  let service: RemoteAssetService;
  let mockDynamicDataService: jasmine.SpyObj<DynamicDataService>;
  let mockNetworkService: jasmine.SpyObj<NetworkService>;
  let mockSystemVariableService: jasmine.SpyObj<SystemVariableService>;

  beforeEach(() => {
    mockDynamicDataService = jasmine.createSpyObj<DynamicDataService>("DynamicDataService", [
      "upsert",
      "update",
      "snapshot",
      "resetFlow",
    ]);
    mockDynamicDataService.upsert.and.resolveTo();
    mockDynamicDataService.update.and.resolveTo();
    mockDynamicDataService.snapshot.and.resolveTo([]);
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

  it("stores in-progress and completed status for asset pack downloads", async () => {
    spyOn<any>(service, "isOffline").and.returnValue(false);
    const assetPackManifest: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: "asset_pack_1",
      rows: [],
    };
    spyOn<any>(service, "getAssetPackManifest").and.callFake(async () => {
      service.manifest = assetPackManifest;
      return assetPackManifest;
    });
    spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo({ failedCount: 0 });

    const success = await service.downloadAssetPackByName("asset_pack_1");
    const upsertRows = mockDynamicDataService.upsert.calls
      .allArgs()
      .map(([, , row]) => row as IDBAssetPack);

    expect(success).toBeTrue();
    expect(upsertRows.map((row) => row.download_status)).toEqual(["in_progress", "completed"]);
    expect(upsertRows[0]).toEqual(
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
    expect(upsertRows[1]).toEqual(
      jasmine.objectContaining({
        id: "asset_pack_1",
        name: "asset_pack_1",
        download_status: "completed",
        download_started_at: upsertRows[0].download_started_at,
        download_completed_at: jasmine.any(String),
        download_status_updated_at: jasmine.any(String),
        assets_total_count: 0,
        assets_downloaded_count: 0,
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
    spyOn<any>(service, "getAssetPackManifest").and.callFake(async () => {
      service.manifest = assetPackManifest;
      return assetPackManifest;
    });

    // Stateful `_asset_packs` row so the "completed" upsert reads back the counts written during the
    // download rather than a stale/empty snapshot
    let assetPackRow: IDBAssetPack | undefined;
    mockDynamicDataService.upsert.and.callFake(async (_type, flow_name, row: any) => {
      if (flow_name === "_asset_packs") assetPackRow = { ...row };
    });
    mockDynamicDataService.update.and.callFake(async (_type, flow_name, _id, update: any) => {
      if (flow_name === "_asset_packs" && assetPackRow) {
        assetPackRow = { ...assetPackRow, ...update };
      }
    });
    mockDynamicDataService.snapshot.and.callFake(async (_type, flow_name) =>
      flow_name === "_asset_packs" && assetPackRow ? ([assetPackRow] as any) : []
    );

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(assetPackRow).toEqual(
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
    spyOn<any>(service, "getAssetPackManifest").and.callFake(async () => {
      service.manifest = assetPackManifest;
      return assetPackManifest;
    });
    spyOn<any>(service, "downloadAndIntegrateAssetPack").and.rejectWith(
      new Error("Download failed")
    );

    const success = await service.downloadAssetPackByName("asset_pack_1");
    const upsertRows = mockDynamicDataService.upsert.calls
      .allArgs()
      .map(([, , row]) => row as IDBAssetPack);

    expect(success).toBeFalse();
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(upsertRows.map((row) => row.download_status)).toEqual(["in_progress", "error"]);
    expect(upsertRows[1]).toEqual(
      jasmine.objectContaining({
        id: "asset_pack_1",
        name: "asset_pack_1",
        download_status: "error",
        download_started_at: upsertRows[0].download_started_at,
        download_completed_at: "",
        download_status_updated_at: jasmine.any(String),
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
    spyOn<any>(service, "getAssetPackManifest").and.callFake(async () => {
      service.manifest = assetPackManifest;
      return assetPackManifest;
    });
    spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo({ failedCount: 0 });

    const success = await service.downloadAssetPackByName("asset_pack_1");
    const upsertRows = mockDynamicDataService.upsert.calls
      .allArgs()
      .map(([, , row]) => row as IDBAssetPack);

    expect(success).toBeTrue();
    expect(waitForConnectionSpy).toHaveBeenCalled();
    expect(upsertRows.map((row) => row.download_status)).toEqual([
      "waiting_for_connection",
      "in_progress",
      "completed",
    ]);
    expect(upsertRows[1].download_started_at).toBe(upsertRows[0].download_started_at);
    expect(upsertRows[2].download_started_at).toBe(upsertRows[0].download_started_at);
  });

  it("updates asset_pack_download_in_progress while downloading", async () => {
    spyOn<any>(service, "isOffline").and.returnValue(false);
    const assetPackManifest: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: "asset_pack_1",
      rows: [],
    };
    spyOn<any>(service, "getAssetPackManifest").and.callFake(async () => {
      service.manifest = assetPackManifest;
      return assetPackManifest;
    });
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
    const upsertRows = mockDynamicDataService.upsert.calls
      .allArgs()
      .map(([, , row]) => row as IDBAssetPack);

    expect(cancelSuccess).toBeTrue();
    expect(downloadSuccess).toBeFalse();
    expect(removeConnectionStatusListener).toHaveBeenCalled();
    expect(upsertRows.map((row) => row.download_status)).toEqual([
      "waiting_for_connection",
      "cancelled",
    ]);
    expect(upsertRows[1].download_started_at).toBe(upsertRows[0].download_started_at);
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

  it("does not integrate a stale manifest when manifest download fails", async () => {
    spyOn<any>(service, "isOffline").and.returnValue(false);
    spyOn(console, "error");
    const staleManifest: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: "stale_asset_pack",
      rows: [MOCK_ASSET_ENTRY as FlowTypes.Data_listRow<IAssetEntry>],
    };
    const mockProvider = jasmine.createSpyObj<IRemoteAssetProvider>("IRemoteAssetProvider", [
      "downloadFileAsText",
    ]);
    mockProvider.downloadFileAsText.and.resolveTo(null);
    service.provider = mockProvider;
    service.manifest = staleManifest;
    const integrateSpy = spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo({
      failedCount: 0,
    });

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeFalse();
    expect(service.manifest).toBeNull();
    expect(integrateSpy).not.toHaveBeenCalled();
  });

  it("skips asset packs that are already completed when using ensureAssetPacksDownloaded", async () => {
    const completedPack: IDBAssetPack = {
      id: "asset_pack_1",
      name: "asset_pack_1",
      download_status: "completed",
      download_started_at: "2024-01-01T00:00:00.000Z",
      download_completed_at: "2024-01-01T00:01:00.000Z",
      download_status_updated_at: "2024-01-01T00:01:00.000Z",
      assets_total_count: 1,
      assets_downloaded_count: 1,
    };
    mockDynamicDataService.snapshot.and.resolveTo([completedPack]);
    const downloadSpy = spyOn(service, "downloadAssetPackByName").and.resolveTo(true);

    const success = await service.ensureAssetPacksDownloaded(["asset_pack_1"]);

    expect(success).toBeTrue();
    expect(downloadSpy).not.toHaveBeenCalled();
  });

  it("downloads asset packs that are missing or not completed when using ensureAssetPacksDownloaded", async () => {
    const errorPack: IDBAssetPack = {
      id: "asset_pack_1",
      name: "asset_pack_1",
      download_status: "error",
      download_started_at: "2024-01-01T00:00:00.000Z",
      download_completed_at: "",
      download_status_updated_at: "2024-01-01T00:01:00.000Z",
      assets_total_count: 1,
      assets_downloaded_count: 0,
    };
    mockDynamicDataService.snapshot.and.callFake(async (_type, flow_name) =>
      flow_name === "_asset_packs" ? ([errorPack] as any) : []
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
    mockDynamicDataService.snapshot.and.resolveTo([]);
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
    mockDynamicDataService.snapshot.and.resolveTo([]);
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
    const completedPack: IDBAssetPack = {
      id: "asset_pack_1",
      name: "asset_pack_1",
      download_status: "completed",
      download_started_at: "2024-01-01T00:00:00.000Z",
      download_completed_at: "2024-01-01T00:01:00.000Z",
      download_status_updated_at: "2024-01-01T00:01:00.000Z",
      assets_total_count: 1,
      assets_downloaded_count: 1,
    };
    mockDynamicDataService.snapshot.and.resolveTo([completedPack]);
    mockSystemVariableService.set.calls.reset();

    const success = await service.ensureAssetPacksDownloaded(["asset_pack_1"], {
      awaitCompletion: false,
    });

    expect(success).toBeTrue();
    expect(mockSystemVariableService.set).not.toHaveBeenCalledWith(
      "ASSET_PACK_DOWNLOAD_IN_PROGRESS",
      "true"
    );
  });

  it("retries packs refused by a different in-flight download rather than dropping them", async () => {
    mockDynamicDataService.snapshot.and.resolveTo([]);
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
    existingContentsRows: Partial<IAssetEntry>[] = []
  ) {
    spyOn(Capacitor, "isNativePlatform").and.returnValue(true);
    spyOn<any>(service, "isOffline").and.returnValue(false);
    const manifest: FlowTypes.AssetPack = {
      flow_type: "asset_pack",
      flow_name: "asset_pack_1",
      rows: manifestRows,
    };
    spyOn<any>(service, "getAssetPackManifest").and.callFake(async () => {
      service.manifest = manifest;
      return manifest;
    });
    const downloadFileSpy = jasmine.createSpy("downloadFile").and.resolveTo(new Blob(["x"]));
    service["provider"] = { downloadFile: downloadFileSpy } as any;

    const fileManager = service["fileManagerService"];
    const saveFileSpy = spyOn(fileManager, "saveFile").and.callFake(async ({ targetPath }) => ({
      localFilepath: `file:///data/${targetPath}`,
      src: localSrc(targetPath),
    }));

    // Stateful `_asset_packs` row + `_assets_contents` snapshot fed from `existingContentsRows`
    let assetPackRow: IDBAssetPack | undefined;
    mockDynamicDataService.upsert.and.callFake(async (_type, flow_name, row: any) => {
      if (flow_name === "_asset_packs") assetPackRow = { ...row };
    });
    mockDynamicDataService.update.and.callFake(async (_type, flow_name, _id, update: any) => {
      if (flow_name === "_asset_packs" && assetPackRow) {
        assetPackRow = { ...assetPackRow, ...update };
      }
    });
    mockDynamicDataService.snapshot.and.callFake(async (_type, flow_name) => {
      if (flow_name === "_asset_packs") return assetPackRow ? ([assetPackRow] as any) : [];
      if (flow_name === "_assets_contents") return existingContentsRows as any;
      return [];
    });

    return {
      downloadFileSpy,
      saveFileSpy,
      getAssetPackRow: () => assetPackRow,
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
          filePath: localSrc("images/asset.png"),
        },
      ]
    );
    // 102400 bytes -> size_kb 100, matching MOCK_ASSET_ENTRY
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.resolveTo({
      exists: true,
      sizeBytes: 102400,
      src: localSrc("images/asset.png"),
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
      jasmine.objectContaining({ filePath: localSrc("images/asset.png") }),
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

  it("skips a file whose recorded local path does not string-match the stat result", async () => {
    // The recorded path comes from `saveFile` (convertFileSrc of a write_blob path); resume only has
    // convertFileSrc of a `Filesystem.stat` uri. Those need not be byte-identical on device (e.g. iOS
    // /private/var vs /var), and such a divergence must not silently disable resume: any path that is
    // no longer the manifest's own value is proof this app integrated the slot.
    const { downloadFileSpy } = setupNativeDownload(
      [clone(MOCK_ASSET_ENTRY) as FlowTypes.Data_listRow<IAssetEntry>],
      [
        {
          id: "images/asset.png",
          md5Checksum: MOCK_ASSET_ENTRY.md5Checksum,
          size_kb: 100,
          filePath: "capacitor://localhost/_capacitor_file_/private/var/data/images/asset.png",
        },
      ]
    );
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.resolveTo({
      exists: true,
      sizeBytes: 102400,
      src: localSrc("images/asset.png"),
    });

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeTrue();
    expect(downloadFileSpy).not.toHaveBeenCalled();
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
          filePath: localSrc("images/asset.png"),
        },
      ]
    );
    // Wrong size on disk (truncated / stale) -> must not be trusted
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.resolveTo({
      exists: true,
      sizeBytes: 999,
      src: localSrc("images/asset.png"),
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
          filePath: localSrc("images/asset.png"),
        },
      ]
    );
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.resolveTo({
      exists: true,
      sizeBytes: 102400,
      src: localSrc("images/asset.png"),
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
      src: localSrc("images/asset.png"),
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
          filePath: localSrc("audio/asset_with_overrides.mp3"),
          overrides: clone(MOCK_ASSET_ENTRY_WITH_OVERRIDES.overrides),
        },
      ]
    );
    // Both slots are present on disk at their manifest sizes (44442 -> 43.4kb, 22118 -> 21.6kb),
    // so only the integration evidence separates them
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.callFake(
      async (targetPath: string) => ({
        exists: true,
        sizeBytes: targetPath === "audio/asset_with_overrides.mp3" ? 44442 : 22118,
        src: localSrc(targetPath),
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
          filePath: localSrc("audio/asset_with_overrides.mp3"),
        },
      ]
    );
    spyOn(service["fileManagerService"], "getSavedFileInfo").and.callFake(
      async (targetPath: string) =>
        // base present with matching size (44442 bytes -> 43.4kb); override missing
        targetPath === "audio/asset_with_overrides.mp3"
          ? { exists: true, sizeBytes: 44442, src: localSrc(targetPath) }
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
      jasmine.objectContaining({ targetPath: "tz_sw/audio/asset_with_overrides.mp3" })
    );
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
    const packs: IDBAssetPack[] = [
      { id: "p_in_progress", download_status: "in_progress" } as IDBAssetPack,
      { id: "p_waiting", download_status: "waiting_for_connection" } as IDBAssetPack,
      { id: "p_error", download_status: "error" } as IDBAssetPack,
      { id: "p_cancelled", download_status: "cancelled" } as IDBAssetPack,
      { id: "p_completed", download_status: "completed" } as IDBAssetPack,
    ];
    mockDynamicDataService.snapshot.and.resolveTo(packs);
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
