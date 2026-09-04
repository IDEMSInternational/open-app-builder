import { createHash } from "crypto";

import { AssetsPostProcessor, generateAssetPackVersion } from "./assets";
import type { IDeploymentConfigJson } from "../../../commands/deployment/common";
import { type RecursivePartial } from "shared/src/types";

import { readJsonSync, statSync, existsSync } from "fs-extra";
import { vol } from "memfs";

// Use default imports to allow spying on functions and replacing with mock methods
import { ActiveDeployment } from "../../../commands/deployment/get";
import { resolve } from "path";
import { IAssetEntryHashmap, IAssetEntry } from "data-models/assets.model";
import type { FlowTypes } from "data-models";

// Mock all fs calls to use memfs implementation
jest.mock("fs", () => require("memfs"));

/** Mock file system folders for use in tests */
const mockDirs = {
  appAssets: "mock/app_data/assets",
  localAssets: "mock/local/assets",
};

const { file: mockFile } = createMockFile(); // create mock 1MB file

/** Parse the contents.json file populated to the app assets folder and return */
function readAppAssetContents() {
  const contentsPath = resolve(mockDirs.appAssets, "contents.json");
  return readJsonSync(contentsPath) as IAssetEntryHashmap;
}

/** Create mock entries on file system corresponding to local assets folder */
function mockLocalAssets(assets: Record<string, any> = {}) {
  vol.fromNestedJSON(assets, mockDirs.localAssets);
}

function createMockFile(size_kb: number = 1024) {
  const file = Buffer.alloc(1 * 1024 * size_kb);
  const entry = {
    size_kb,
    md5Checksum: createHash("md5")
      .update(file as any)
      .digest("hex"),
  };
  return { file, entry };
}

/** yarn workspace scripts test -t assets.spec.ts */
describe("Assets PostProcess", () => {
  // Populate a fake file system before each test. This will automatically be called for any fs operations
  // Restore regular file functionality after each test.
  beforeEach(() => {
    mockLocalAssets();
  });
  afterEach(() => {
    vol.reset();
  });

  /** Mock setup testing (can be removed once working consistenctly) */
  it("mocks file system for testing", () => {
    mockLocalAssets({ folder: { "file.jpg": mockFile } });
    const testFilePath = resolve(mockDirs.localAssets, "folder", "file.jpg");
    console.log({ testFilePath });
    console.log(existsSync(testFilePath));
    expect(existsSync(testFilePath)).toEqual(true);
    expect(statSync(testFilePath).size).toEqual(1 * 1024 * 1024);
  });

  /** Main tests */
  it("Copies assets from local to app", () => {
    mockLocalAssets({ folder: { "file.jpg": mockFile } });
    runAssetsPostProcessor();
    const testFilePath = resolve(mockDirs.appAssets, "folder", "file.jpg");
    expect(statSync(testFilePath).size).toEqual(1 * 1024 * 1024);
  });

  it("Supports multiple input folders", () => {
    // Use override file with specified size for testing output
    const overrideFileSize = 123;
    const { file: mockFileOverride } = createMockFile(overrideFileSize);
    // Instead of testing all assets from top-level folder test as 2 independent folders
    // which happen to both sit as subfolders within the testing folder structures
    mockLocalAssets({
      source_a: { folder: { "file_a.jpg": mockFile, "file_b.jpg": mockFile } },
      source_b: {
        folder: { "file_b.jpg": mockFileOverride, "file_c.jpg": mockFile },
      },
    });
    stubDeploymentConfig();
    const sourceA = resolve(mockDirs.localAssets, "source_a");
    const sourceB = resolve(mockDirs.localAssets, "source_b");
    const processor = new AssetsPostProcessor({
      sources: [
        { path: sourceA, name: "source_a" },
        { path: sourceB, name: "source_b" },
      ],
    });
    processor.run();
    // test merged file outputs
    const contents = readAppAssetContents();
    const expectedFiles = ["folder/file_a.jpg", "folder/file_b.jpg", "folder/file_c.jpg"];
    expect(Object.keys(contents)).toEqual(expectedFiles);
    // test file_b overidden from source_b
    const overiddenFilePath = resolve(mockDirs.appAssets, "folder", "file_b.jpg");
    expect(statSync(overiddenFilePath).size).toEqual(1 * 1024 * overrideFileSize);
  });

  it("populates contents json", () => {
    mockLocalAssets({ "test.jpg": mockFile });
    runAssetsPostProcessor();
    const contents = readAppAssetContents();
    expect("test.jpg" in contents).toEqual(true);
  });

  /** Remote asset pack tests */
  it("Processes remote assets separately from core assets", () => {
    mockLocalAssets({
      core: { "core_asset.jpg": mockFile },
      remote: { "remote_asset.jpg": mockFile },
    });
    stubDeploymentConfig();
    const coreFolder = resolve(mockDirs.localAssets, "core");
    const remoteFolder = resolve(mockDirs.localAssets, "remote");
    const processor = new AssetsPostProcessor({
      sources: [
        { path: coreFolder, name: "core" },
        {
          path: remoteFolder,
          name: "test_pack",
          remote: true,
        },
      ],
    });
    processor.run();

    // Core assets should be in app_data/assets
    const coreAssetPath = resolve(mockDirs.appAssets, "core_asset.jpg");
    expect(existsSync(coreAssetPath)).toEqual(true);

    // Remote assets should be in app_data/remote_assets/test_pack
    const remoteAssetsPath = resolve("mock/app_data/remote_assets/test_pack");
    const remoteAssetPath = resolve(remoteAssetsPath, "remote_asset.jpg");
    expect(existsSync(remoteAssetPath)).toEqual(true);
  });

  it("Generates AssetPack manifest for remote asset packs", () => {
    mockLocalAssets({
      remote: { "test.jpg": mockFile },
    });
    stubDeploymentConfig();
    const remoteFolder = resolve(mockDirs.localAssets, "remote");
    const processor = new AssetsPostProcessor({
      sources: [
        {
          path: remoteFolder,
          name: "test_pack",
          remote: true,
        },
      ],
    });
    processor.run();

    // Check that manifest file exists
    const manifestPath = resolve("mock/app_data/remote_assets/test_pack/test_pack.json");
    expect(existsSync(manifestPath)).toEqual(true);

    // A pack folder gets no contents.json: the manifest is built from the in-memory entries, and
    // nothing reads the file at runtime or at build time, so writing it only added dead weight to
    // every manual upload
    const contentsPath = resolve("mock/app_data/remote_assets/test_pack/contents.json");
    expect(existsSync(contentsPath)).toEqual(false);

    // Check manifest format
    const manifest = readJsonSync(manifestPath);
    expect(manifest.flow_type).toEqual("asset_pack");
    expect(manifest.flow_name).toEqual("test_pack");
    expect(Array.isArray(manifest.rows)).toEqual(true);
    expect(manifest.rows.length).toBeGreaterThan(0);
    expect(manifest.rows[0]).toHaveProperty("id");
    expect(manifest.rows[0]).toHaveProperty("md5Checksum");
    expect(manifest.rows[0]).toHaveProperty("size_kb");
    // Version drives the app's "does this pack need updating?" check
    expect(manifest.version).toMatch(/^[0-9a-f]{32}$/);
  });

  /**
   * End-to-end counterpart to the `generateAssetPackVersion` unit tests: those pin the algorithm
   * against hand-built rows, this proves the version actually tracks real file content through the
   * whole pipeline. A version that never changed would silently disable updates for every
   * deployment, and a version that changed on every sync would make every install re-walk.
   */
  it("Generates a manifest version that tracks asset content", () => {
    const remoteFolder = resolve(mockDirs.localAssets, "remote");
    const manifestPath = resolve("mock/app_data/remote_assets/test_pack/test_pack.json");
    const runWith = (assets: Record<string, any>) => {
      vol.reset();
      mockLocalAssets(assets);
      stubDeploymentConfig();
      new AssetsPostProcessor({
        sources: [{ path: remoteFolder, name: "test_pack", remote: true }],
      }).run();
      return readJsonSync(manifestPath).version as string;
    };

    const original = runWith({ remote: { "test.jpg": mockFile } });
    const unchanged = runWith({ remote: { "test.jpg": mockFile } });
    const contentChanged = runWith({ remote: { "test.jpg": createMockFile(64).file } });
    const fileAdded = runWith({
      remote: { "test.jpg": mockFile, "extra.jpg": createMockFile(32).file },
    });

    expect(unchanged).toEqual(original);
    expect(contentChanged).not.toEqual(original);
    expect(fileAdded).not.toEqual(original);
  });

  it("Handles remote assets with same paths as core assets", () => {
    mockLocalAssets({
      core: { "shared_asset.jpg": mockFile },
      remote: { "shared_asset.jpg": mockFile },
    });
    stubDeploymentConfig();
    const coreFolder = resolve(mockDirs.localAssets, "core");
    const remoteFolder = resolve(mockDirs.localAssets, "remote");
    const processor = new AssetsPostProcessor({
      sources: [
        { path: coreFolder, name: "core" },
        {
          path: remoteFolder,
          name: "test_pack",
          remote: true,
        },
      ],
    });
    processor.run();

    // Both should exist in their respective folders
    const coreAssetPath = resolve(mockDirs.appAssets, "shared_asset.jpg");
    const remoteAssetPath = resolve("mock/app_data/remote_assets/test_pack/shared_asset.jpg");
    expect(existsSync(coreAssetPath)).toEqual(true);
    expect(existsSync(remoteAssetPath)).toEqual(true);
  });

  it("Cleans up old remote asset pack folders", () => {
    mockLocalAssets({
      remote: { "test.jpg": mockFile },
    });
    stubDeploymentConfig();
    const remoteFolder = resolve(mockDirs.localAssets, "remote");

    // Create an old folder that should be cleaned up
    const oldPackPath = resolve("mock/app_data/remote_assets/old_pack");
    const { vol } = require("memfs");
    vol.mkdirSync(oldPackPath, { recursive: true });
    vol.writeFileSync(resolve(oldPackPath, "old_file.jpg"), mockFile);

    const processor = new AssetsPostProcessor({
      sources: [
        {
          path: remoteFolder,
          name: "new_pack",
          remote: true,
        },
      ],
    });
    processor.run();

    // Old pack should be removed
    expect(existsSync(oldPackPath)).toEqual(false);
    // New pack should exist
    const newPackPath = resolve("mock/app_data/remote_assets/new_pack");
    expect(existsSync(newPackPath)).toEqual(true);
  });

  it("Processes multiple remote asset packs", () => {
    mockLocalAssets({
      remote1: { "asset1.jpg": mockFile },
      remote2: { "asset2.jpg": mockFile },
    });
    stubDeploymentConfig();
    const remoteFolder1 = resolve(mockDirs.localAssets, "remote1");
    const remoteFolder2 = resolve(mockDirs.localAssets, "remote2");
    const processor = new AssetsPostProcessor({
      sources: [
        {
          path: remoteFolder1,
          name: "pack1",
          remote: true,
        },
        {
          path: remoteFolder2,
          name: "pack2",
          remote: true,
        },
      ],
    });
    processor.run();

    // Both packs should exist
    const pack1Path = resolve("mock/app_data/remote_assets/pack1");
    const pack2Path = resolve("mock/app_data/remote_assets/pack2");
    expect(existsSync(pack1Path)).toEqual(true);
    expect(existsSync(pack2Path)).toEqual(true);
    expect(existsSync(resolve(pack1Path, "asset1.jpg"))).toEqual(true);
    expect(existsSync(resolve(pack2Path, "asset2.jpg"))).toEqual(true);
  });

  it("Removes old assets when remote asset pack is reprocessed", () => {
    const { vol } = require("memfs");
    const remoteFolder = resolve(mockDirs.localAssets, "remote");
    const packPath = resolve("mock/app_data/remote_assets/test_pack");

    // First run: create pack with old_asset.jpg
    mockLocalAssets({
      remote: { "old_asset.jpg": mockFile },
    });
    stubDeploymentConfig();
    const processor1 = new AssetsPostProcessor({
      sources: [
        {
          path: remoteFolder,
          name: "test_pack",
          remote: true,
        },
      ],
    });
    processor1.run();

    // Verify old asset exists
    expect(existsSync(resolve(packPath, "old_asset.jpg"))).toEqual(true);

    // Create an extra file that shouldn't be there (simulating old asset)
    vol.writeFileSync(resolve(packPath, "orphaned_asset.jpg"), mockFile);
    expect(existsSync(resolve(packPath, "orphaned_asset.jpg"))).toEqual(true);

    // Second run: pack now only has new_asset.jpg
    vol.reset();
    mockLocalAssets({
      remote: { "new_asset.jpg": mockFile },
    });
    stubDeploymentConfig();
    const processor2 = new AssetsPostProcessor({
      sources: [
        {
          path: remoteFolder,
          name: "test_pack",
          remote: true,
        },
      ],
    });
    processor2.run();

    // Old assets should be removed, only new asset should exist
    expect(existsSync(resolve(packPath, "old_asset.jpg"))).toEqual(false);
    expect(existsSync(resolve(packPath, "orphaned_asset.jpg"))).toEqual(false);
    expect(existsSync(resolve(packPath, "new_asset.jpg"))).toEqual(true);
  });

  /**
  
  it("Warns if overrides have no source target",()=>{
    // TODO - will require processing all non-overrides first
  })

  it("Warns on untracked assets", () => {
    // TODO - will require refactoring warning like error logger
  });

  it("Warns on too large assets ", () => {
    // TODO - will require refactoring warning like error logger
  });

  it("warns on untracked assets", () => {
    const { localAssets } = mockDirs;
    const untrackedPath = resolve(localAssets, "tz_sw", "untracked.jpg");
    writeFileSync(untrackedPath, mockFile);
    runAssetsPostProcessor();
    expect(mockWarningLogger).toHaveBeenCalledWith({
      msg1: "Translated assets found without corresponding global",
      msg2: "untracked.jpg",
    });
  });

   */
});

/** yarn workspace scripts test -t assets.spec.ts */
describe("generateAssetPackVersion", () => {
  /**
   * A pack covering all three line shapes: a plain base entry, an `overridesOnly` entry (which
   * carries a copy of its first override's checksum), and a base entry with two overrides.
   */
  const fixtureRows = (): FlowTypes.Data_listRow<IAssetEntry>[] => [
    { id: "images/a.jpg", md5Checksum: "aaa111", size_kb: 1 },
    {
      id: "images/b.jpg",
      md5Checksum: "bbb222",
      size_kb: 2,
      overridesOnly: true,
      overrides: { default: { us_en: { md5Checksum: "bbb222", size_kb: 2 } } },
    },
    {
      id: "images/c.jpg",
      md5Checksum: "ccc333",
      size_kb: 3,
      overrides: {
        default: {
          us_en: { md5Checksum: "ddd444", size_kb: 4 },
          ke_sw: { md5Checksum: "eee555", size_kb: 5 },
        },
      },
    },
  ];

  /**
   * Golden hash. Changing the serialisation re-versions every pack in every deployment and forces
   * a manifest walk on every install, so this must only ever be updated deliberately.
   */
  it("matches the pinned hash for a known pack", () => {
    expect(generateAssetPackVersion(fixtureRows())).toEqual("0441648c332c2d4b536fa1c2df9bdb3e");
  });

  it("is stable across runs", () => {
    expect(generateAssetPackVersion(fixtureRows())).toEqual(
      generateAssetPackVersion(fixtureRows())
    );
  });

  it("ignores the order entries arrive in", () => {
    const reversed = fixtureRows().reverse();
    expect(generateAssetPackVersion(reversed)).toEqual(generateAssetPackVersion(fixtureRows()));
  });

  it("ignores object key order within overrides", () => {
    const rows = fixtureRows();
    // Same two overrides, declared the other way round
    rows[2].overrides = {
      default: {
        ke_sw: { md5Checksum: "eee555", size_kb: 5 },
        us_en: { md5Checksum: "ddd444", size_kb: 4 },
      },
    };
    expect(generateAssetPackVersion(rows)).toEqual(generateAssetPackVersion(fixtureRows()));
  });

  it("changes when a base checksum changes", () => {
    const rows = fixtureRows();
    rows[0].md5Checksum = "changed";
    expect(generateAssetPackVersion(rows)).not.toEqual(generateAssetPackVersion(fixtureRows()));
  });

  it("changes when only an override checksum changes", () => {
    // The case a base-only hash would miss: a pack whose sole change is a translated asset
    const rows = fixtureRows();
    rows[2].overrides.default.ke_sw.md5Checksum = "changed";
    expect(generateAssetPackVersion(rows)).not.toEqual(generateAssetPackVersion(fixtureRows()));
  });

  it("changes when an entry is added or removed", () => {
    const withoutFirst = fixtureRows().slice(1);
    expect(generateAssetPackVersion(withoutFirst)).not.toEqual(
      generateAssetPackVersion(fixtureRows())
    );
  });

  it("ignores fields that do not describe content", () => {
    // size_kb and filePath either duplicate the checksum's signal or vary without content changing
    const rows = fixtureRows();
    rows[0].size_kb = 999;
    rows[0].filePath = "some/other/path.jpg";
    expect(generateAssetPackVersion(rows)).toEqual(generateAssetPackVersion(fixtureRows()));
  });

  it("hashes an empty pack rather than throwing", () => {
    // An empty remote folder is valid config; the shared md5 helper throws on falsy input
    expect(generateAssetPackVersion([])).toEqual("d41d8cd98f00b204e9800998ecf8427e");
  });

  it("distinguishes an overridesOnly entry from a base entry with the same checksum", () => {
    // Guards the "omit the base line for overridesOnly rows" rule: without it, both would emit
    // the same base line and two structurally different packs would share a version
    const asOverridesOnly: FlowTypes.Data_listRow<IAssetEntry>[] = [
      {
        id: "images/x.jpg",
        md5Checksum: "xxx999",
        size_kb: 1,
        overridesOnly: true,
        overrides: { default: { us_en: { md5Checksum: "xxx999", size_kb: 1 } } },
      },
    ];
    const asBaseEntry: FlowTypes.Data_listRow<IAssetEntry>[] = [
      { id: "images/x.jpg", md5Checksum: "xxx999", size_kb: 1 },
    ];
    expect(generateAssetPackVersion(asOverridesOnly)).not.toEqual(
      generateAssetPackVersion(asBaseEntry)
    );
  });
});

function runAssetsPostProcessor(deploymentConfig: IDeploymentConfigStub = {}) {
  stubDeploymentConfig(deploymentConfig);
  const { localAssets } = mockDirs;
  const processor = new AssetsPostProcessor({
    sources: [{ path: localAssets, name: "mock" }],
  });
  processor.run();
}

/** Test Utilities */

type IAssetsFilterFunction = IDeploymentConfigJson["app_data"]["assets_filter_function"];

interface IDeploymentConfigStub {
  filter_language_codes?: string[];
  assets_filter_function?: IAssetsFilterFunction;
  app_themes_available?: string[];
}
/**
 * Populated mock values when getActiveDeployment method called from main command
 * Limited to just values referenced in the copy method
 **/
function stubDeploymentConfig(stub: IDeploymentConfigStub = {}) {
  const filter_language_codes = stub.filter_language_codes;
  const assets_filter_function = stub.assets_filter_function
    ? stub.assets_filter_function
    : () => true;
  const app_themes_available = stub.app_themes_available ?? [];

  const stubDeployment: RecursivePartial<IDeploymentConfigJson> = {
    _workspace_path: "mock",
    app_data: { assets_filter_function, output_path: "mock/app_data" },
    translations: { filter_language_codes },
    app_config: {
      APP_THEMES: { available: app_themes_available },
    } as any,
  };
  jest.spyOn(ActiveDeployment, "get").mockReturnValue(stubDeployment as IDeploymentConfigJson);
}
