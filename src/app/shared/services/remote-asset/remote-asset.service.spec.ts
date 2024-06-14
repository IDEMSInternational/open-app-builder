import { TestBed } from "@angular/core/testing";

import { RemoteAssetService } from "./remote-asset.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { IAssetContents } from "src/app/data";
import { FlowTypes } from "../../model";

const MOCK_ASSETS_CONTENTS_LIST: IAssetContents = {
  "audio/test_audio.mp3": {
    md5Checksum: "5ddddf934d2187d084c75b7e27797fae",
    size_kb: 43.4,
  },
};

const MOCK_CORE_ASSET_PACK: FlowTypes.AssetPack = {
  flow_type: "asset_pack",
  flow_name: "core_assets",
  rows: [
    {
      id: "audio/test_audio.mp3",
      md5Checksum: "5ddddf934d2187d084c75b7e27797fae",
      size_kb: 43.4,
    },
  ],
  rowsHashmap: {
    "audio/test_audio.mp3": {
      id: "audio/test_audio.mp3",
      md5Checksum: "5ddddf934d2187d084c75b7e27797fae",
      size_kb: 43.4,
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
