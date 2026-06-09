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

  beforeEach(() => {
    mockDynamicDataService = jasmine.createSpyObj<DynamicDataService>("DynamicDataService", [
      "upsert",
      "resetFlow",
    ]);
    mockDynamicDataService.upsert.and.resolveTo();
    mockDynamicDataService.resetFlow.and.resolveTo();

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: DeploymentService, useValue: new MockDeploymentService(MOCK_DEPLOYMENT_CONFIG) },
        { provide: DynamicDataService, useValue: mockDynamicDataService },
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
    await service["reset"]();

    expect(mockDynamicDataService.resetFlow.calls.allArgs()).toEqual([
      ["asset_pack", "_assets_contents"],
      ["data_list", "_asset_packs"],
    ]);
  });

  it("stores in-progress and completed status for asset pack downloads", async () => {
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
    const upsertCalls = mockDynamicDataService.upsert.calls.allArgs() as [
      FlowTypes.FlowType,
      string,
      unknown,
    ][];

    expect(success).toBeTrue();
    expect(upsertCalls).toEqual([
      [
        "data_list",
        "_asset_packs",
        { id: "asset_pack_1", name: "asset_pack_1", download_status: "in_progress" },
      ],
      [
        "data_list",
        "_asset_packs",
        { id: "asset_pack_1", name: "asset_pack_1", download_status: "completed" },
      ],
    ]);
  });

  it("stores error status for failed asset pack downloads", async () => {
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
    const upsertCalls = mockDynamicDataService.upsert.calls.allArgs() as [
      FlowTypes.FlowType,
      string,
      unknown,
    ][];

    expect(success).toBeFalse();
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(upsertCalls).toEqual([
      [
        "data_list",
        "_asset_packs",
        { id: "asset_pack_1", name: "asset_pack_1", download_status: "in_progress" },
      ],
      [
        "data_list",
        "_asset_packs",
        { id: "asset_pack_1", name: "asset_pack_1", download_status: "error" },
      ],
    ]);
  });

  it("does not integrate a stale manifest when manifest download fails", async () => {
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
