import { TestBed } from "@angular/core/testing";

import { RemoteAssetService } from "./remote-asset.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { IAssetContents } from "src/app/data";
import { FlowTypes } from "../../model";

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
};

const MOCK_CORE_ASSET_PACK: FlowTypes.AssetPack = {
  flow_type: "asset_pack",
  flow_name: "core_assets",
  rows: [
    {
      id: "images/asset.png",
      md5Checksum: "b4e6f1e9ba6e5bcdd2e404bc432ba745",
      size_kb: 100,
    },
    {
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
    },
  ],
  rowsHashmap: {
    "images/asset.png": {
      id: "images/asset.png",
      md5Checksum: "b4e6f1e9ba6e5bcdd2e404bc432ba745",
      size_kb: 100,
    },
    "audio/asset_with_overrides.mp3": {
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
    },
  },
};

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/services/remote-asset/remote-asset.service.spec.ts
 */
describe("RemoteAssetsService", () => {
  let service: RemoteAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RemoteAssetService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("generates a core asset pack from asset contents", () => {
    const coreAssetPack = service["generateCoreAssetPack"](MOCK_ASSETS_CONTENTS_LIST);
    expect(coreAssetPack).toEqual(MOCK_CORE_ASSET_PACK);
  });
});
