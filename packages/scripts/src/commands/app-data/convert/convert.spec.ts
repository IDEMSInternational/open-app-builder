import { AppDataConverter } from "./index";

import { resolve } from "path";

import {
  emptyDirSync,
  existsSync,
  readdirSync,
  readJSONSync,
  ensureDirSync,
  pathExistsSync,
} from "fs-extra";
import { clearLogs } from "shared";

import { TEST_DATA_PATHS } from "../../../../test/helpers/utils";
import { ActiveDeployment } from "../../deployment/get";
import { IDeploymentConfigJson } from "data-models";

const { SHEETS_CACHE_FOLDER, SHEETS_INPUT_FOLDER, SHEETS_OUTPUT_FOLDER, TEST_DATA_DIR } =
  TEST_DATA_PATHS;

const paths = {
  inputFolders: [resolve(SHEETS_INPUT_FOLDER, "sheets")],
  outputFolder: resolve(SHEETS_OUTPUT_FOLDER, "sheets"),
  cacheFolder: resolve(SHEETS_CACHE_FOLDER),
  reportsFolder: resolve(TEST_DATA_DIR, "reports"),
};

const mockDeployment: Partial<IDeploymentConfigJson> = {
  app_data: {
    sheets_filter_function: () => true,
    assets_filter_function: () => true,
    output_path: paths.outputFolder,
  },
  // HACK - output reports get populated relative to workspace path so use test_data DIR
  _workspace_path: TEST_DATA_DIR,
};

// HACK - avoid loading active deployment
jest.spyOn(ActiveDeployment, "get").mockReturnValue(mockDeployment as IDeploymentConfigJson);

/** yarn workspace scripts test -t convert.spec.ts */
describe("App Data Converter", () => {
  let converter: AppDataConverter;

  beforeEach(() => {
    ensureDirSync(paths.outputFolder);
    emptyDirSync(paths.outputFolder);
    ensureDirSync(paths.cacheFolder);
    emptyDirSync(paths.cacheFolder);
    converter = new AppDataConverter(paths);
    // HACK - Tests failing on CI due to logs persisting between runs
    clearLogs(true);
  });

  it("Uses child caches", async () => {
    await converter.run();
    const cacheFolders = readdirSync(paths.cacheFolder);
    // expect contents file and cached conversions
    expect(cacheFolders.length).toBeGreaterThan(1);
  });

  it("Processes test_input xlsx without error", async () => {
    const { errors, result } = await converter.run();
    expect(errors).toHaveLength(0);
    expect(Object.values(result).length).toBeGreaterThan(0);
  });
  it("Populates output to folder by data type", async () => {
    await converter.run();
    const outputFolders = readdirSync(paths.outputFolder);
    expect(outputFolders).toEqual(["data_list", "data_pipe", "template"]);
  });
  it("Supports input from multiple source folders", async () => {
    const multipleSourceConverter = new AppDataConverter({
      ...paths,
      inputFolders: [...paths.inputFolders, resolve(SHEETS_INPUT_FOLDER, "sheets_additional")],
    });
    await multipleSourceConverter.run();
    const replaceDataListPath = resolve(
      paths.outputFolder,
      "data_list",
      "spec_test",
      "test_data_list.json"
    );
    expect(existsSync(replaceDataListPath)).toBe(true);
    const flow = readJSONSync(replaceDataListPath);
    expect(flow.rows[0].value).toEqual("data from additional input");
  });
  it("Populates sheet_json representation", async () => {
    await converter.run();
    const sheetJsonPath = resolve(
      paths.outputFolder,
      "../",
      "sheet_json",
      "sheets",
      "test_input.json"
    );
    expect(pathExistsSync(sheetJsonPath)).toEqual(true);
    const sheetJson = readJSONSync(sheetJsonPath);
    expect(Object.keys(sheetJson)).toEqual([
      "==content_list==",
      "test_data_list",
      "test_template",
      "test_draft",
      "test_data_pipe",
      "test_data_pipe_list",
    ]);
  });
  it("Merges custom metadata from google drive downloader", async () => {
    await converter.run();
    const sheetJsonMetadataPath = resolve(
      paths.outputFolder,
      "../",
      "sheet_json",
      "sheets",
      "_metadata.json"
    );
    expect(pathExistsSync(sheetJsonMetadataPath)).toEqual(true);
    const sheetJsonMeta = readJSONSync(sheetJsonMetadataPath);
    expect(sheetJsonMeta).toEqual({
      "test_input.xlsx": {
        folderName: "sheets",
        relativePath: "test_input.xlsx",
        size_kb: 215,
        md5Checksum: "f06d85d016a02622869ec54c34df8d79",
        modifiedTime: "2025-08-15T17:23:35.657Z",
        modifiedBy: "Test User",
        remoteUrl: "https://docs.google.com/spreadsheets/d/mock-gdrive-id",
      },
    });
  });
});

// Folders used for error tests
const errorPaths = {
  inputFolders: [resolve(SHEETS_INPUT_FOLDER, "errorChecking")],
  outputFolder: resolve(SHEETS_OUTPUT_FOLDER, "errorChecking"),
  cacheFolder: resolve(SHEETS_CACHE_FOLDER),
};
describe("App Data Converter - Error Checking", () => {
  let errorConverter: AppDataConverter;
  beforeAll(() => {
    if (existsSync(paths.outputFolder)) {
      emptyDirSync(paths.outputFolder);
    }
  });
  beforeEach(() => {
    errorConverter = new AppDataConverter(errorPaths);
  });
  it("Tracks conversion errors", async () => {
    clearLogs(true);
    const { errors, warnings, result } = await errorConverter.run();
    expect(errors.length).toEqual(1);
    const errorMessages = errors.map((err) => err.message);
    expect(errorMessages).toEqual(["No parser available for flow_type: test_invalid_type"]);
  });
});
