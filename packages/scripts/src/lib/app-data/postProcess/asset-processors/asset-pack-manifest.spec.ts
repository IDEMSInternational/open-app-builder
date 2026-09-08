import type { FlowTypes, IAssetEntry } from "data-models";
import { convertAssetPackRowsToHashmap } from "./asset-pack-manifest";

const fixtureRows = (): FlowTypes.Data_listRow<IAssetEntry>[] => [
  { id: "images/a.jpg", md5Checksum: "aaa111", size_kb: 1 },
  {
    id: "images/b.jpg",
    md5Checksum: "bbb222",
    size_kb: 2,
    overridesOnly: true,
    overrides: {
      theme_default: {
        es_sp: { md5Checksum: "bbb222", size_kb: 2, filePath: "images/es_sp/b.jpg" },
      },
    },
  },
];

/** yarn workspace scripts test -t asset-pack-manifest.spec.ts */
describe("convertAssetPackRowsToHashmap", () => {
  it("keys entries by row id and strips id from the value", () => {
    const hashmap = convertAssetPackRowsToHashmap(fixtureRows());

    expect(Object.keys(hashmap)).toEqual(["images/a.jpg", "images/b.jpg"]);
    expect(hashmap["images/a.jpg"]).toEqual({ md5Checksum: "aaa111", size_kb: 1 });
    expect(hashmap["images/a.jpg"].id).toBeUndefined();
  });

  it("preserves overrides and overridesOnly", () => {
    const hashmap = convertAssetPackRowsToHashmap(fixtureRows());

    expect(hashmap["images/b.jpg"]).toEqual({
      md5Checksum: "bbb222",
      size_kb: 2,
      overridesOnly: true,
      overrides: {
        theme_default: {
          es_sp: { md5Checksum: "bbb222", size_kb: 2, filePath: "images/es_sp/b.jpg" },
        },
      },
    });
  });

  it("returns an empty hashmap for missing or empty rows", () => {
    expect(convertAssetPackRowsToHashmap(undefined)).toEqual({});
    expect(convertAssetPackRowsToHashmap([])).toEqual({});
  });

  it("skips rows without an id", () => {
    const hashmap = convertAssetPackRowsToHashmap([
      { md5Checksum: "aaa111", size_kb: 1 } as FlowTypes.Data_listRow<IAssetEntry>,
      { id: "kept.jpg", md5Checksum: "ccc333", size_kb: 3 },
    ]);

    expect(Object.keys(hashmap)).toEqual(["kept.jpg"]);
  });
});
