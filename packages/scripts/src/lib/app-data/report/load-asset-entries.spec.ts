import * as fs from "fs-extra";
import * as os from "os";
import * as path from "path";
import type { FlowTypes, IAssetEntry } from "data-models";
import { logWarning } from "shared";
import { loadAssetEntries } from "./load-asset-entries";

jest.mock("shared", () => ({
  ...jest.requireActual("shared"),
  logWarning: jest.fn(),
}));

const CORE_ASSETS = { "core.png": { md5Checksum: "core", size_kb: 1 } };

function writeJson(filePath: string, data: unknown) {
  fs.ensureDirSync(path.dirname(filePath));
  fs.writeJsonSync(filePath, data);
}

function writePack(
  appDataDir: string,
  packName: string,
  rows: FlowTypes.Data_listRow<IAssetEntry>[]
) {
  const manifest: FlowTypes.AssetPack = {
    flow_type: "asset_pack",
    flow_name: packName,
    version: "v1",
    rows,
  };
  writeJson(path.join(appDataDir, "remote_assets", packName, `${packName}.json`), manifest);
}

/** yarn workspace scripts test -t load-asset-entries.spec.ts */
describe("loadAssetEntries", () => {
  let appDataDir: string;

  beforeEach(() => {
    appDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "asset-report-"));
    (logWarning as jest.Mock).mockClear();
    writeJson(path.join(appDataDir, "assets", "contents.json"), CORE_ASSETS);
  });

  afterEach(() => {
    fs.removeSync(appDataDir);
  });

  it("loads core assets when there is no remote_assets folder", async () => {
    expect(await loadAssetEntries(appDataDir)).toEqual(CORE_ASSETS);
    expect(logWarning).not.toHaveBeenCalled();
  });

  it("merges pack manifest entries, keyed by row id", async () => {
    writePack(appDataDir, "pack_a", [
      { id: "remote.jpg", md5Checksum: "remote", size_kb: 2 },
      {
        id: "translated.png",
        md5Checksum: "override",
        size_kb: 3,
        overridesOnly: true,
        overrides: {
          theme_default: {
            es_sp: { md5Checksum: "override", size_kb: 3, filePath: "es_sp/translated.png" },
          },
        },
      },
    ]);
    writePack(appDataDir, "pack_b", [{ id: "other.jpg", md5Checksum: "other", size_kb: 4 }]);
    // Sibling archive must not be treated as a pack
    fs.writeFileSync(path.join(appDataDir, "remote_assets", "pack_a", "pack_a.v1.zip"), "zip");

    const contents = await loadAssetEntries(appDataDir);

    expect(contents["core.png"]).toEqual({ md5Checksum: "core", size_kb: 1 });
    expect(contents["remote.jpg"]).toEqual({ md5Checksum: "remote", size_kb: 2 });
    expect(contents["other.jpg"]).toEqual({ md5Checksum: "other", size_kb: 4 });
    expect(contents["translated.png"]).toMatchObject({ overridesOnly: true, size_kb: 3 });
    expect(contents["translated.png"].id).toBeUndefined();
    expect(logWarning).not.toHaveBeenCalled();
  });

  it("warns and skips packs with a missing or unreadable manifest", async () => {
    fs.ensureDirSync(path.join(appDataDir, "remote_assets", "no_manifest"));
    fs.ensureDirSync(path.join(appDataDir, "remote_assets", "corrupt_pack"));
    fs.writeFileSync(
      path.join(appDataDir, "remote_assets", "corrupt_pack", "corrupt_pack.json"),
      "{ not json"
    );
    writePack(appDataDir, "valid_pack", [{ id: "valid.jpg", md5Checksum: "valid", size_kb: 2 }]);

    const contents = await loadAssetEntries(appDataDir);

    // A bad pack is skipped rather than failing the whole report
    expect(Object.keys(contents)).toEqual(["core.png", "valid.jpg"]);
    expect(logWarning).toHaveBeenCalledWith({
      msg1: 'Skipping asset pack "no_manifest"',
      msg2: expect.stringContaining("Could not read remote_assets/no_manifest/no_manifest.json"),
    });
    expect(logWarning).toHaveBeenCalledWith({
      msg1: 'Skipping asset pack "corrupt_pack"',
      msg2: expect.stringContaining("Could not read remote_assets/corrupt_pack/corrupt_pack.json"),
    });
  });
});
