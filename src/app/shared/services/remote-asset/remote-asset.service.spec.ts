import { TestBed } from "@angular/core/testing";
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

  beforeEach(() => {
    mockDynamicDataService = jasmine.createSpyObj<DynamicDataService>("DynamicDataService", [
      "upsert",
      "resetFlow",
    ]);
    mockDynamicDataService.upsert.and.resolveTo();
    mockDynamicDataService.resetFlow.and.resolveTo();
    mockNetworkService = jasmine.createSpyObj<NetworkService>("NetworkService", [
      "isOffline",
      "waitUntilConnected",
      "onStatusChange",
    ]);
    mockNetworkService.isOffline.and.returnValue(false);
    mockNetworkService.waitUntilConnected.and.resolveTo();
    mockNetworkService.onStatusChange.and.returnValue(() => undefined);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: DeploymentService, useValue: new MockDeploymentService(MOCK_DEPLOYMENT_CONFIG) },
        { provide: DynamicDataService, useValue: mockDynamicDataService },
        { provide: NetworkService, useValue: mockNetworkService },
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
    spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo();

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
    spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo();

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
    const integrateSpy = spyOn<any>(service, "downloadAndIntegrateAssetPack").and.resolveTo();

    const success = await service.downloadAssetPackByName("asset_pack_1");

    expect(success).toBeFalse();
    expect(service.manifest).toBeNull();
    expect(integrateSpy).not.toHaveBeenCalled();
  });
});
