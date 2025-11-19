import { createHash } from "crypto";

import { AssetsPostProcessor } from "./assets";
import type { IDeploymentConfigJson } from "../../../commands/deployment/common";
import { type RecursivePartial } from "shared/src/types";

import { readJsonSync, readdirSync, statSync, existsSync } from "fs-extra";
import { vol } from "memfs";

// Use default imports to allow spying on functions and replacing with mock methods
import { ActiveDeployment } from "../../../commands/deployment/get";
import { resolve } from "path";
import { IAssetEntryHashmap } from "data-models/assets.model";
import { useMockLogger } from "../../../../test/helpers/utils";

// Mock all fs calls to use memfs implementation
jest.mock("fs", () => require("memfs"));

/** Mock file system folders for use in tests */
const mockDirs = {
  appAssets: "mock/app_data/assets",
  localAssets: "mock/local/assets",
};

const { file: mockFile, entry: mockFileEntry } = createMockFile(); // create mock 1MB file

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
      sourceAssetsFolders: [sourceA, sourceB],
      folderMetadata: new Map(), // No remote assets in tests
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

  it("Populates global assets from named or root folder", () => {
    mockLocalAssets({
      global: { "test1.jpg": mockFile },
      nested: { "test2.jpg": mockFile },
      "test3.jpg": mockFile,
    });
    runAssetsPostProcessor();
    const contents = readAppAssetContents();
    expect(contents).toEqual({
      "nested/test2.jpg": mockFileEntry,
      "test1.jpg": { ...mockFileEntry, filePath: "global/test1.jpg" },
      "test3.jpg": mockFileEntry,
    });
  });

  it("Populates assets with no overrides", () => {
    mockLocalAssets({ "test.jpg": mockFile });
    runAssetsPostProcessor();
    const contents = readAppAssetContents();
    const assetEntry = contents["test.jpg"];
    expect(assetEntry.overrides).toBeUndefined();
  });

  it("Populates translation override with default theme", () => {
    mockLocalAssets({
      "test.jpg": mockFile,
      tz_sw: { "test.jpg": mockFile },
    });
    runAssetsPostProcessor({ filter_language_codes: ["tz_sw"] });
    const contents = readAppAssetContents();
    const assetEntry = contents["test.jpg"];
    expect(assetEntry.overrides["theme_default"]).toEqual({
      tz_sw: { ...mockFileEntry, filePath: "tz_sw/test.jpg" },
    });
  });

  it("Populates theme override with global translation", () => {
    mockLocalAssets({
      "test.jpg": mockFile,
      theme_test: { "test.jpg": mockFile },
    });
    runAssetsPostProcessor({ app_themes_available: ["test"] });
    const contents = readAppAssetContents();
    expect(contents["test.jpg"].overrides).toEqual({
      theme_test: { global: { ...mockFileEntry, filePath: "theme_test/test.jpg" } },
    });
  });
  it("Populates combined theme and language overrides in any folder order", () => {
    mockLocalAssets({
      "test1.jpg": mockFile,
      "test2.jpg": mockFile,
      theme_test: {
        tz_sw: { "test1.jpg": mockFile },
      },
      tz_sw: {
        theme_test: {
          "test2.jpg": mockFile,
        },
      },
    });
    runAssetsPostProcessor({ app_themes_available: ["test"], filter_language_codes: ["tz_sw"] });
    const contents = readAppAssetContents();
    expect(contents).toEqual({
      "test1.jpg": {
        ...mockFileEntry,
        overrides: {
          theme_test: {
            tz_sw: { ...mockFileEntry, filePath: "theme_test/tz_sw/test1.jpg" },
          },
        },
      },
      "test2.jpg": {
        ...mockFileEntry,
        overrides: {
          theme_test: {
            tz_sw: { ...mockFileEntry, filePath: "tz_sw/theme_test/test2.jpg" },
          },
        },
      },
    });
  });

  it("Filters theme assets", () => {
    mockLocalAssets({
      "test.jpg": mockFile,
      theme_testTheme: { "test.jpg": mockFile },
      theme_ignored: { "test.jpg": mockFile },
    });
    runAssetsPostProcessor({ app_themes_available: ["testTheme"] });
    expect(readdirSync(mockDirs.appAssets).sort()).toEqual([
      "contents.json",
      "test.jpg",
      "theme_testTheme",
    ]);
  });

  it("Includes all language assets by default", () => {
    mockLocalAssets({
      "test.jpg": mockFile,
      tz_sw: { "test.jpg": mockFile },
      ke_sw: { "test.jpg": mockFile },
    });
    runAssetsPostProcessor({ filter_language_codes: undefined });
    const contents = readAppAssetContents();
    expect(contents).toEqual({
      "test.jpg": {
        ...mockFileEntry,
        overrides: {
          theme_default: {
            tz_sw: { ...mockFileEntry, filePath: "tz_sw/test.jpg" },
            ke_sw: { ...mockFileEntry, filePath: "ke_sw/test.jpg" },
          },
        },
      },
    });
  });

  it("Filters language assets", () => {
    mockLocalAssets({
      "test.jpg": mockFile,
      tz_sw: { "test.jpg": mockFile },
      ke_sw: { "test.jpg": mockFile },
    });
    runAssetsPostProcessor({ filter_language_codes: ["tz_sw"] });
    expect(readdirSync(mockDirs.appAssets).sort()).toEqual(["contents.json", "test.jpg", "tz_sw"]);
  });

  it("supports nested lang and theme folders", () => {
    mockLocalAssets({
      nested: {
        "test.jpg": mockFile,
        theme_test: {
          tz_sw: { "test.jpg": mockFile },
        },
        tz_sw: {
          "test.jpg": mockFile,
        },
      },
    });
    runAssetsPostProcessor({
      filter_language_codes: ["tz_sw"],
      app_themes_available: ["test"],
    });
    const contents = readAppAssetContents();
    expect(contents).toEqual({
      "nested/test.jpg": {
        ...mockFileEntry,
        overrides: {
          theme_default: {
            tz_sw: { ...mockFileEntry, filePath: "nested/tz_sw/test.jpg" },
          },
          theme_test: {
            tz_sw: { ...mockFileEntry, filePath: "nested/theme_test/tz_sw/test.jpg" },
          },
        },
      },
    });
  });

  // TODO - direct support for files named `test.theme_default.tz_sw.jpg`
  // it("supports inline theme and lang files", () => {});

  /** QA tests */
  it("throws error on duplicate overrides", () => {
    const mockLogger = useMockLogger();
    mockLocalAssets({
      "test.jpg": mockFile,
      theme_test: {
        tz_sw: { "test.jpg": mockFile },
      },
      tz_sw: {
        theme_test: { "test.jpg": mockFile },
      },
    });
    runAssetsPostProcessor({
      filter_language_codes: ["tz_sw"],
      app_themes_available: ["test"],
    });
    expect(mockLogger.error).toHaveBeenCalledTimes(1);
    expect(mockLogger.error).toHaveBeenCalledWith({
      msg1: "Duplicate overrides detected",
      msg2: "test.jpg [theme_test] [tz_sw]",
      logOnly: true,
    });
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
    const folderMetadata = new Map([[remoteFolder, { remote: true, folderName: "test_pack" }]]);
    const processor = new AssetsPostProcessor({
      sourceAssetsFolders: [coreFolder, remoteFolder],
      folderMetadata,
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
    const folderMetadata = new Map([[remoteFolder, { remote: true, folderName: "test_pack" }]]);
    const processor = new AssetsPostProcessor({
      sourceAssetsFolders: [remoteFolder],
      folderMetadata,
    });
    processor.run();

    // Check that manifest file exists
    const manifestPath = resolve("mock/app_data/remote_assets/test_pack/test_pack.json");
    expect(existsSync(manifestPath)).toEqual(true);

    // Check manifest format
    const manifest = readJsonSync(manifestPath);
    expect(manifest.flow_type).toEqual("asset_pack");
    expect(manifest.flow_name).toEqual("test_pack");
    expect(Array.isArray(manifest.rows)).toEqual(true);
    expect(manifest.rows.length).toBeGreaterThan(0);
    expect(manifest.rows[0]).toHaveProperty("id");
    expect(manifest.rows[0]).toHaveProperty("md5Checksum");
    expect(manifest.rows[0]).toHaveProperty("size_kb");
  });

  it("Handles remote assets with same paths as core assets", () => {
    mockLocalAssets({
      core: { "shared_asset.jpg": mockFile },
      remote: { "shared_asset.jpg": mockFile },
    });
    stubDeploymentConfig();
    const coreFolder = resolve(mockDirs.localAssets, "core");
    const remoteFolder = resolve(mockDirs.localAssets, "remote");
    const folderMetadata = new Map([[remoteFolder, { remote: true, folderName: "test_pack" }]]);
    const processor = new AssetsPostProcessor({
      sourceAssetsFolders: [coreFolder, remoteFolder],
      folderMetadata,
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
    const folderMetadata = new Map([[remoteFolder, { remote: true, folderName: "new_pack" }]]);

    // Create an old folder that should be cleaned up
    const oldPackPath = resolve("mock/app_data/remote_assets/old_pack");
    const { vol } = require("memfs");
    vol.mkdirSync(oldPackPath, { recursive: true });
    vol.writeFileSync(resolve(oldPackPath, "old_file.jpg"), mockFile);

    const processor = new AssetsPostProcessor({
      sourceAssetsFolders: [remoteFolder],
      folderMetadata,
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
    const folderMetadata = new Map([
      [remoteFolder1, { remote: true, folderName: "pack1" }],
      [remoteFolder2, { remote: true, folderName: "pack2" }],
    ]);
    const processor = new AssetsPostProcessor({
      sourceAssetsFolders: [remoteFolder1, remoteFolder2],
      folderMetadata,
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
    const folderMetadata1 = new Map([[remoteFolder, { remote: true, folderName: "test_pack" }]]);
    const processor1 = new AssetsPostProcessor({
      sourceAssetsFolders: [remoteFolder],
      folderMetadata: folderMetadata1,
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
    const folderMetadata2 = new Map([[remoteFolder, { remote: true, folderName: "test_pack" }]]);
    const processor2 = new AssetsPostProcessor({
      sourceAssetsFolders: [remoteFolder],
      folderMetadata: folderMetadata2,
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

function runAssetsPostProcessor(deploymentConfig: IDeploymentConfigStub = {}) {
  stubDeploymentConfig(deploymentConfig);
  const { localAssets } = mockDirs;
  const processor = new AssetsPostProcessor({
    sourceAssetsFolders: [localAssets],
    folderMetadata: new Map(), // No remote assets in tests
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
