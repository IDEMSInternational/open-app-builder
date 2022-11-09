import { AppDataCopy } from "./copy";
import { IDeploymentConfigJson } from "../deployment/set";

import fs from "fs-extra";
import mockFs from "mock-fs";

// Use default imports to allow spying on functions and replacing with mock methods
import * as spyDeployment from "../deployment/get";
import * as spyLoggingUtils from "../../utils/logging.utils";
import path from "path";

/** Mock file system folders for use in tests */
const mockDirs = {
  appAssetsFolder: "mock/appAssetsFolder",
  appSheetsFolder: "mock/appSheetsFolder",
  appTranslationsFolder: "mock/appTranslationsFolder",
  localAssetsFolder: "mock/localAssetsFolder",
  localSheetsFolder: "mock/localSheetsFolder",
  localTranslationsFolder: "mock/localTranslationsFolder",
};
/** Mock file system contents. Nesting will create folders and populate filename:contents mock files  */
const mockDirContents = {
  "mock/appAssetsFolder": {
    global: {},
  },
  "mock/appSheetsFolder": {},
  "mock/appTranslationsFolder": {},
  "mock/localAssetsFolder": {
    "_contents.json": `[{"relativePath":"global/some_file.jpg"}]`, // specify file contents
    global: {
      "some_file.jpg": Buffer.alloc(1 * 1024 * 1024), // create mock 1MB file
    },
  },
  "mock/localSheetsFolder": {},
  "mock/localTranslationsFolder": {},
};
/** Mock function that will replace default `logError` function to instead just record any invocations */
const mockErrorLogger = jasmine.createSpy("mockErrorLogger", spyLoggingUtils.logError);

describe("App Data Converter", () => {
  /** Initial setup */
  // replace prettier codeTidying method
  // relpace `logError` function with created spy method
  beforeAll(() => {
    spyOn(AppDataCopy.prototype, "runPrettierCodeTidy" as any).and.stub();
    spyOn(spyLoggingUtils, "logError").and.callFake(mockErrorLogger);
  });
  // Populate a fake file system before each test. This will automatically be called for any fs operations
  // Restore regular file functionality after each test.
  beforeEach(() => {
    mockFs(mockDirContents);
  });
  afterEach(() => {
    mockFs.restore();
  });

  /** Mock setup testing (can be removed once working consistenctly) */
  it("mocks file system for testing", () => {
    const contents = fs.readdirSync(mockDirs.localAssetsFolder);
    expect(contents).toEqual(Object.keys(mockDirContents["mock/localAssetsFolder"]));
    const testFilePath = path.resolve(mockDirs.localAssetsFolder, "global", "some_file.jpg");
    expect(fs.statSync(testFilePath).size).toEqual(1 * 1024 * 1024);
  });

  /** Main tests */
  it("Copies assets from local to app", () => {
    stubDeploymentConfig();
    const copyCmd = new AppDataCopy(mockDirs);
    copyCmd.run();
    const appGlobalAssetsDir = path.join(mockDirs.localAssetsFolder, "global");
    const appGlobalAssets = fs.readdirSync(appGlobalAssetsDir);
    expect(appGlobalAssets).toEqual(["some_file.jpg"]);
  });

  /** QA tests */
  it("throws error when global assets not found", () => {
    console.log("global missing test");
    fs.emptyDirSync(mockDirs.localAssetsFolder);
    stubDeploymentConfig({
      assets_filter_function: () => false,
      filter_language_codes: [],
    });
    const copy = new AppDataCopy(mockDirs);
    copy.run();
    expect(mockErrorLogger).toHaveBeenCalledWith({
      msg1: "Assets global folder not found",
      msg2: 'Assets folder should include a folder named "global"',
    });
  });
});

/** Test Utilities */

type IAssetsFilterFunction = IDeploymentConfigJson["app_data"]["assets_filter_function"];
/**
 * Populated mock values when getActiveDeployment method called from main command
 * Limited to just values referenced in the copy method
 **/
function stubDeploymentConfig(
  stub: {
    filter_language_codes?: string[];
    assets_filter_function?: IAssetsFilterFunction;
    app_themes_available?: string[];
  } = {}
) {
  const filter_language_codes = stub.filter_language_codes ?? [];
  const assets_filter_function = stub.assets_filter_function
    ? stub.assets_filter_function
    : () => true;
  const app_themes_available = stub.app_themes_available ?? [];

  const stubDeployment: Partial<IDeploymentConfigJson> = {
    app_data: { assets_filter_function },
    translations: { filter_language_codes },
    app_config: { APP_THEMES: { available: app_themes_available } },
  };
  spyOn(spyDeployment, "getActiveDeployment").and.returnValue(
    stubDeployment as IDeploymentConfigJson
  );
}
