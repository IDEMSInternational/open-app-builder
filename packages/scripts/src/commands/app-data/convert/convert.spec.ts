import { AppDataConverter } from "./index";

import path from "path";

import { SCRIPTS_TEST_DATA_DIR } from "../../../paths";
import { emptyDirSync, existsSync, readdirSync } from "fs-extra";
import { clearLogs, getLogs } from "./utils";

const paths = {
  inputFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "input", "sheets"),
  outputFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "output", "sheets"),
  cacheFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "cache"),
};

describe("App Data Converter", () => {
  const converter = new AppDataConverter(paths);
  beforeAll(() => {
    if (existsSync(paths.outputFolder)) {
      path.resolve(SCRIPTS_TEST_DATA_DIR, "output");
    }
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
    clearLogs();
    await converter.run();
    const errorLogs = getLogs("error");
    expect(errorLogs.length).toEqual(0);
  });
  it("Populates output to folder by data type", async () => {
    await converter.run();
    const outputFolders = readdirSync(paths.outputFolder);
    expect(outputFolders).toEqual(["data_list", "data_pipe", "template"]);
  });
  it("Tracks conversion errors", async () => {
    const errorPaths = {
      inputFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "input", "errorChecking"),
      outputFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "output", "errorChecking"),
      cacheFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "cache"),
    };
    const errorConverter = new AppDataConverter(errorPaths);
    await errorConverter.run();
    const errors = getLogs("error");
    const errorMessages = errors.map((err) => err.message);
    expect(errorMessages).toEqual([
      "Duplicate flow name",
      "No parser available for flow_type: test_invalid_type",
    ]);
  });
  it("Throws on duplicate flows", async () => {
    await converter.run().catch((err) => {
      expect(err.message.includes("Duplicate flows found")).toEqual(true);
    });
  });
});

describe("App Data Converter - Error Checking", () => {
  const errorPaths = {
    inputFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "input", "errorChecking"),
    outputFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "output", "errorChecking"),
    cacheFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "cache"),
  };
  let errorConverter = new AppDataConverter(errorPaths);
  beforeAll(() => {
    if (existsSync(paths.outputFolder)) {
      emptyDirSync(paths.outputFolder);
    }
  });
  beforeEach(() => {
    errorConverter = new AppDataConverter(errorPaths);
  });
  it("Tracks number of conversion errors", async () => {
    errorConverter = new AppDataConverter(errorPaths);
    const { errors } = await errorConverter.run();
    expect(errors.length).toBeGreaterThan(0);
  });
  it("Throws on duplicate flows (2)", async () => {
    await errorConverter.run().catch((err) => {
      expect(err.message.includes("Duplicate flows found")).toBeTrue();
    });
  });
});
