import { logOutput } from "shared";
import { logAssetSizeSummary } from "./asset-size";

jest.mock("shared", () => ({
  ...jest.requireActual("shared"),
  logOutput: jest.fn(),
  logWarning: jest.fn(),
}));

/** yarn workspace scripts test -t asset-size.spec.ts */
describe("Asset Size Summary", () => {
  beforeEach(() => jest.clearAllMocks());

  it("lists asset packs in name order", () => {
    logAssetSizeSummary({
      packs: [
        { packName: "pack_b", archiveBytes: 1024 * 1000, rawBytes: 1024 * 2000 },
        { packName: "pack_a", archiveBytes: 1024 * 3000, rawBytes: 1024 * 4000 },
      ],
    });
    expect(logOutput).toHaveBeenCalledWith({
      msg1: "Assets Summary",
      msg2: [
        "Asset packs (managed in remote assets storage):",
        "  pack_a: 3 MB download (4 MB unzipped)",
        "  pack_b: 1 MB download (2 MB unzipped)",
      ].join("\n"),
    });
  });
});
