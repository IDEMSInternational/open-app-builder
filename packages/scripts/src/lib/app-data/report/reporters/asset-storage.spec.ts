import { AssetStorageReport } from "./asset-storage";
import type { IAssetStorageData } from "../load-asset-entries";

const BUNDLED: IAssetStorageData["bundled"] = {
  "image.png": { md5Checksum: "", size_kb: 2000 },
};

const generate = async (data: Omit<IAssetStorageData, "contentKB">) =>
  (await new AssetStorageReport({ ...data, contentKB: 1000 }).process()).app_size_on_device;

/** yarn workspace scripts test -t asset-storage.spec.ts */
describe("Asset Storage Report", () => {
  it("reports a single total when there are no asset packs", async () => {
    const report = await generate({ bundled: BUNDLED, packs: [] });
    expect(report.data).toEqual([
      { item: "App code (estimate)", download: "-", on_device: "16.2 MB" },
      { item: "App content (sheets and translations)", download: "-", on_device: "1 MB" },
      { item: "Bundled assets", download: "-", on_device: "2 MB" },
      { item: "Total", download: "-", on_device: "19.2 MB" },
    ]);
  });

  it("breaks down bundled assets only when there are overrides", async () => {
    const report = await generate({
      bundled: {
        "image.png": {
          md5Checksum: "",
          size_kb: 2000,
          overrides: { theme_default: { es_sp: { md5Checksum: "", size_kb: 500 } } },
        },
      },
      packs: [],
    });
    expect(report.data.slice(2, 5)).toEqual([
      { item: "Bundled assets", download: "-", on_device: "2.5 MB" },
      { item: "Bundled assets: base", download: "-", on_device: "2 MB" },
      { item: "Bundled assets: theme_default / es_sp", download: "-", on_device: "0.5 MB" },
    ]);
  });

  it("reports pack sizes and totals with and without packs", async () => {
    const report = await generate({
      bundled: BUNDLED,
      packs: [
        { packName: "pack_a", archiveBytes: 1024 * 3000, fileSizesKB: { "a.mp3": 4000 } },
        { packName: "pack_b", archiveBytes: 1024 * 1000, fileSizesKB: { "b.mp3": 2000 } },
      ],
    });
    expect(report.data.slice(3)).toEqual([
      { item: "Total without asset packs", download: "-", on_device: "19.2 MB" },
      { item: "Asset pack: pack_a", download: "3 MB", on_device: "4 MB" },
      { item: "Asset pack: pack_b", download: "1 MB", on_device: "2 MB" },
      { item: "Total with all asset packs", download: "4 MB", on_device: "25.2 MB" },
    ]);
  });

  it("counts files shared between packs once in the on-device total", async () => {
    const report = await generate({
      bundled: BUNDLED,
      packs: [
        { packName: "pack_a", archiveBytes: 1024, fileSizesKB: { "shared.mp3": 4000 } },
        { packName: "pack_b", archiveBytes: 1024, fileSizesKB: { "shared.mp3": 4000 } },
      ],
    });
    expect(report.data[report.data.length - 1].on_device).toEqual("23.2 MB");
  });

  it("omits download sizes that cannot be measured", async () => {
    const report = await generate({
      bundled: BUNDLED,
      packs: [
        { packName: "pack_a", archiveBytes: 1024 * 3000, fileSizesKB: { "a.mp3": 4000 } },
        { packName: "pack_b", fileSizesKB: { "b.mp3": 2000 } },
      ],
    });
    expect(report.data.slice(-2)).toEqual([
      { item: "Asset pack: pack_b", download: "-", on_device: "2 MB" },
      { item: "Total with all asset packs", download: "-", on_device: "25.2 MB" },
    ]);
  });
});
