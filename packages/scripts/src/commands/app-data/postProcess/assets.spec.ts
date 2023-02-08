import { AssetsPostProcessor } from "./assets";
import type { IDeploymentConfigJson } from "../../deployment/common";

import fs from "fs-extra";
import mockFs from "mock-fs";

// Use default imports to allow spying on functions and replacing with mock methods
import { ActiveDeployment } from "../../deployment/get";
import { Logger } from "../../../utils/logging.utils";
import path from "path";

/** Mock file system folders for use in tests */
const mockDirs = {
  appAssets: "mock/app_data/assets",
  localAssets: "mock/local/assets",
};

const mockFile = Buffer.alloc(1 * 1024 * 1024); // create mock 1MB file

/** Mock file system contents. Nesting will create folders and populate filename:contents mock files  */
const mockDirContents = {
  app_data: {},
  local: {
    assets: {
      global: {
        "test.jpg": mockFile,
      },
      theme_demoTheme: {
        global: {
          "test.jpg": mockFile,
        },
      },
      theme_excluded: {
        global: {
          "test.jpg": mockFile,
        },
      },
      // language code not included
      tz_na: {
        "test.jpg": mockFile,
      },
      tz_sw: {
        "test.jpg": mockFile,
      },
    },
    sheets: {},
    translations: {},
  },
};

/** Mock function that will replace default `Logger` function to instead just record any invocations */
const mockErrorLogger = jasmine.createSpy("mockErrorLogger", Logger.error);

describe("Assets PostProcess", () => {
  /** Initial setup */
  // replace prettier codeTidying method
  // relpace `Logger` function with created spy method
  beforeAll(() => {
    spyOn(Logger, "error").and.callFake(mockErrorLogger);
  });
  // Populate a fake file system before each test. This will automatically be called for any fs operations
  // Restore regular file functionality after each test.
  beforeEach(() => {
    mockFs({ mock: mockDirContents });
  });
  afterEach(() => {
    mockFs.restore();
  });

  /** Mock setup testing (can be removed once working consistenctly) */
  it("mocks file system for testing", () => {
    const contents = fs.readdirSync(mockDirs.localAssets);
    expect(contents).toEqual(Object.keys(mockDirContents.local.assets));
    const testFilePath = path.resolve(mockDirs.localAssets, "global", "test.jpg");
    expect(fs.statSync(testFilePath).size).toEqual(1 * 1024 * 1024);
  });

  /** Main tests */
  it("Copies assets from local to app", () => {
    runAssetsPostProcessor();
    const appGlobalAssetsDir = path.join(mockDirs.localAssets, "global");
    const appGlobalAssets = fs.readdirSync(appGlobalAssetsDir);
    expect(appGlobalAssets).toEqual(["test.jpg"]);
  });

  it("populates contents json", () => {
    runAssetsPostProcessor();
    const contentsPath = path.resolve(mockDirs.appAssets, "contents.json");
    expect(fs.existsSync(contentsPath)).toBeTrue();
    const contents = fs.readJSONSync(contentsPath);
    expect("test.jpg" in contents).toBeTrue();
  });

  it("Populates unfiltered translation assets", () => {
    runAssetsPostProcessor();
    const contents = fs.readJSONSync(path.resolve(mockDirs.appAssets, "contents.json"));
    const { translations } = contents["test.jpg"];
    expect(translations).toEqual({
      tz_sw: { size_kb: 1024, md5Checksum: "b6d81b360a5672d80c27430f39153e2c" },
      tz_na: { size_kb: 1024, md5Checksum: "b6d81b360a5672d80c27430f39153e2c" },
    });
  });

  it("Populates filtered translation assets", () => {
    runAssetsPostProcessor({ filter_language_codes: ["tz_sw"] });
    const contents = fs.readJSONSync(path.resolve(mockDirs.appAssets, "contents.json"));
    const { translations } = contents["test.jpg"];
    expect(translations).toEqual({
      tz_sw: { size_kb: 1024, md5Checksum: "b6d81b360a5672d80c27430f39153e2c" },
    });
  });

  it("Populates theme assets", () => {
    runAssetsPostProcessor({ app_themes_available: ["demoTheme"] });
    const contents = fs.readJSONSync(path.resolve(mockDirs.appAssets, "contents.json"));
    const { themeVariations } = contents["test.jpg"];
    expect(themeVariations).toEqual({
      demoTheme: { size_kb: 1024, md5Checksum: "b6d81b360a5672d80c27430f39153e2c" },
    });
  });

  /** QA tests */
  it("throws error when global assets not found", () => {
    const { localAssets } = mockDirs;
    fs.emptyDirSync(localAssets);
    stubDeploymentConfig({
      assets_filter_function: () => false,
    });
    const copy = new AssetsPostProcessor({ sourceAssetsFolder: localAssets });
    copy.run();
    expect(mockErrorLogger).toHaveBeenCalledWith({
      msg1: "Assets global folder not found",
      msg2: 'Assets folder should include a folder named "global"',
    });
  });

  // TODO - check functioanlity for invalid language folders and add test
  // it("warns on invalid language codes", () => {});

  // TODO - will require refactoring warning like error logger
  // it("warns on untracked assets", () => {
  //   const { localAssets } = mockDirs;
  //   const untrackedPath = path.resolve(localAssets, "tz_sw", "untracked.jpg");
  //   fs.writeFileSync(untrackedPath, mockFile);
  //   runAssetsPostProcessor();
  //   expect(mockWarningLogger).toHaveBeenCalledWith({
  //     msg1: "Translated assets found without corresponding global",
  //     msg2: "untracked.jpg",
  //   });
  // });
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
  const filter_language_codes = stub.filter_language_codes ?? [];
  const assets_filter_function = stub.assets_filter_function
    ? stub.assets_filter_function
    : () => true;
  const app_themes_available = stub.app_themes_available ?? [];

  const stubDeployment: Partial<IDeploymentConfigJson> = {
    _workspace_path: "mock",
    app_data: { assets_filter_function, output_path: "mock/app_data" },
    translations: { filter_language_codes },
    app_config: {
      APP_THEMES: { available: app_themes_available },
    } as any,
  };
  spyOn(ActiveDeployment, "get").and.returnValue(stubDeployment as IDeploymentConfigJson);
}
