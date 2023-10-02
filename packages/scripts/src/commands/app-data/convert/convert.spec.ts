import { AppDataConverter } from "./index";

import path, { resolve } from "path";

import { SCRIPTS_TEST_DATA_DIR } from "../../../paths";
import { emptyDirSync, existsSync, readdirSync, readJSONSync } from "fs-extra";
import { clearLogs, getLogs } from "./utils";
import { useMockErrorLogger } from "../../../../test/helpers/utils";

// Folders used for tests
const paths = {
  inputFolders: [path.resolve(SCRIPTS_TEST_DATA_DIR, "input", "sheets")],
  outputFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "output", "sheets"),
  cacheFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "cache"),
};

describe("App Data Converter", () => {
  let converter: AppDataConverter;
  beforeAll(() => {
    if (existsSync(paths.outputFolder)) {
      path.resolve(SCRIPTS_TEST_DATA_DIR, "output");
    }
  });
  beforeEach(() => {
    clearLogs();
    converter = new AppDataConverter(paths);
  });
  afterAll(() => {
    emptyDirSync(path.resolve(SCRIPTS_TEST_DATA_DIR, "output"));
  });
  it("Uses child caches", async () => {
    const cacheFolders = readdirSync(paths.cacheFolder);
    expect(cacheFolders.length).toBeGreaterThan(1);
  });
  it("Clears child caches on version change", async () => {
    const updatedConverter = new AppDataConverter(paths, { version: -1 });
    const cacheFolders = readdirSync(paths.cacheFolder);
    expect(cacheFolders.length).toEqual(1); // only contents file
  });
  it("Processes test_input xlsx without error", async () => {
    await converter.run();
    const errorLogs = getLogs("error");
    expect(errorLogs.length).toEqual(0);
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
        path.resolve(SCRIPTS_TEST_DATA_DIR, "input", "sheets_additional"),
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
  inputFolders: [path.resolve(SCRIPTS_TEST_DATA_DIR, "input", "errorChecking")],
  outputFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "output", "errorChecking"),
  cacheFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "cache"),
};
describe("App Data Converter - Error Checking", () => {
  let errorConverter: AppDataConverter;
  let errorLogger: jasmine.Spy;
  beforeAll(() => {
    if (existsSync(paths.outputFolder)) {
      emptyDirSync(paths.outputFolder);
    }
  });
  beforeEach(() => {
    errorLogger = useMockErrorLogger();
    errorConverter = new AppDataConverter(errorPaths);
  });
  it("Tracks conversion errors", async () => {
    await errorConverter.run();
    const loggerErrors = getLogs("error");
    const errorMessages = loggerErrors.map((err) => err.message);
    expect(errorMessages).toEqual([
      "Duplicate flow name",
      "No parser available for flow_type: test_invalid_type",
    ]);
  });
});
