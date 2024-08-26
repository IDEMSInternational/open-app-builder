import { AppDataConverter } from "./index";

import { resolve } from "path";

import { SCRIPTS_TEST_DATA_DIR } from "../../../paths";
import { emptyDirSync, existsSync, readdirSync, readJSONSync, ensureDirSync } from "fs-extra";
import { clearLogs } from "shared";

// Folders used for tests
// TODO - consider using memfs instead of scripts file cache
const paths = {
  inputFolders: [resolve(SCRIPTS_TEST_DATA_DIR, "input", "sheets")],
  outputFolder: resolve(SCRIPTS_TEST_DATA_DIR, "output", "sheets"),
  cacheFolder: resolve(SCRIPTS_TEST_DATA_DIR, "cache"),
};

/** yarn workspace scripts test -t convert.spec.ts */
describe("App Data Converter", () => {
  let converter: AppDataConverter;
  beforeAll(() => {
    ensureDirSync(paths.outputFolder);
    emptyDirSync(paths.outputFolder);
    ensureDirSync(paths.cacheFolder);
    emptyDirSync(paths.cacheFolder);
  });
  beforeEach(() => {
    converter = new AppDataConverter(paths);
  });

  it("Uses child caches", async () => {
    await converter.run();
    const cacheFolders = readdirSync(paths.cacheFolder);
    // expect contents file and cached conversions
    expect(cacheFolders.length).toBeGreaterThan(1);
  });
  it("Clears child caches on version change", async () => {
    const updatedConverter = new AppDataConverter(paths, { version: new Date().getTime() });
    // no need to run the converter, simply creating should clear the cache
    const cacheFolders = readdirSync(paths.cacheFolder);
    expect(cacheFolders).toHaveLength(1); // only contents file
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
      inputFolders: [
        ...paths.inputFolders,
        resolve(SCRIPTS_TEST_DATA_DIR, "input", "sheets_additional"),
      ],
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
});

// Folders used for error tests
const errorPaths = {
  inputFolders: [resolve(SCRIPTS_TEST_DATA_DIR, "input", "errorChecking")],
  outputFolder: resolve(SCRIPTS_TEST_DATA_DIR, "output", "errorChecking"),
  cacheFolder: resolve(SCRIPTS_TEST_DATA_DIR, "cache"),
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
    const { errors } = await errorConverter.run();
    const errorMessages = errors.map((err) => err.message);
    expect(errorMessages).toEqual([
      "Duplicate flow name",
      "No parser available for flow_type: test_invalid_type",
    ]);
  });
});
