import { createHash } from "crypto";

import { AssetsPostProcessor } from "./assets";
import type { IDeploymentConfigJson } from "../../deployment/common";
import type { RecursivePartial } from "data-models/appConfig";

import fs, { readJsonSync, readdirSync } from "fs-extra";
import mockFs from "mock-fs";

// Use default imports to allow spying on functions and replacing with mock methods
import { ActiveDeployment } from "../../deployment/get";
import path from "path";
import { IAssetEntryHashmap } from "data-models/deployment.model";
import { useMockErrorLogger } from "../../../../test/helpers/utils";

/** Mock file system folders for use in tests */
const mockDirs = {
  appAssets: "mock/app_data/assets",
  localAssets: "mock/local/assets",
};

const { file: mockFile, entry: mockFileEntry } = createMockFile(); // create mock 1MB file

/** Parse the contents.json file populated to the app assets folder and return */
function readAppAssetContents() {
  const contentsPath = path.resolve(mockDirs.appAssets, "contents.json");
  return readJsonSync(contentsPath) as IAssetEntryHashmap;
}

/** Create mock entries on file system corresponding to local assets folder */
function mockLocalAssets(assets: Record<string, any>) {
  return mockFs({
    mock: {
      local: {
        assets,
      },
    },
  });
}

function createMockFile(size_kb = 1024) {
  const file = Buffer.alloc(1 * 1024 * size_kb);
  const entry = { size_kb, md5Checksum: createHash("md5").update(file).digest("hex") };
  return { file, entry };
}

describe("Assets PostProcess", () => {
  /** Initial setup */
  // replace prettier codeTidying method
  // replace `Logger` function with created spy method
  beforeAll(() => {});
  // Populate a fake file system before each test. This will automatically be called for any fs operations
  // Restore regular file functionality after each test.
  beforeEach(() => {
    mockLocalAssets({});
  });
  afterEach(() => {
    mockFs.restore();
  });

  /** Mock setup testing (can be removed once working consistenctly) */
  it("mocks file system for testing", () => {
    mockLocalAssets({ folder: { "file.jpg": mockFile } });
    const testFilePath = path.resolve(mockDirs.localAssets, "folder", "file.jpg");
    expect(fs.statSync(testFilePath).size).toEqual(1 * 1024 * 1024);
  });

  /** Main tests */
  it("Copies assets from local to app", () => {
    mockLocalAssets({ folder: { "file.jpg": mockFile } });
    runAssetsPostProcessor();
    const testFilePath = path.resolve(mockDirs.appAssets, "folder", "file.jpg");
    expect(fs.statSync(testFilePath).size).toEqual(1 * 1024 * 1024);
  });

  it("populates contents json", () => {
    mockLocalAssets({ "test.jpg": mockFile });
    runAssetsPostProcessor();
    const contents = readAppAssetContents();
    expect("test.jpg" in contents).toBeTrue();
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
    mockFs.restore();
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
  it("Populates combined theme and language overrides in any folder order ", () => {
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
    expect(readdirSync(mockDirs.appAssets)).toEqual([
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
    expect(readdirSync(mockDirs.appAssets)).toEqual(["contents.json", "test.jpg", "tz_sw"]);
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
    const errorLogger = useMockErrorLogger();
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
    expect(errorLogger).toHaveBeenCalledOnceWith({
      msg1: "Duplicate overrides detected",
      msg2: "test.jpg [theme_test] [tz_sw]",
      logOnly: true,
    });
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
    const untrackedPath = path.resolve(localAssets, "tz_sw", "untracked.jpg");
    fs.writeFileSync(untrackedPath, mockFile);
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
  const processor = new AssetsPostProcessor({ sourceAssetsFolder: localAssets });
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
  spyOn(ActiveDeployment, "get").and.returnValue(stubDeployment as IDeploymentConfigJson);
}
