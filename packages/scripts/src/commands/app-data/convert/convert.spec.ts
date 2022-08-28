import { AppDataConverter } from "./index";

import path from "path";

import { SCRIPTS_TEST_DATA_DIR } from "../../../paths";
import { emptyDirSync, existsSync, readdirSync } from "fs-extra";

const paths = {
  inputFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "input"),
  outputFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "output"),
  cacheFolder: path.resolve(SCRIPTS_TEST_DATA_DIR, "cache"),
};

describe("App Data Converter", () => {
  const converter = new AppDataConverter(paths);
  beforeAll(() => {
    if (existsSync(paths.outputFolder)) {
      emptyDirSync(paths.outputFolder);
    }
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
  it("Populates output to folder by data type", async () => {
    await converter.run();
    expect(readdirSync(paths.outputFolder)).toEqual(["data_list", "template"]);
    const testFileOutput = ["data_list", "spec_test", "test_data_list.json"];
    const expectedOutput = path.resolve(paths.outputFolder, ...testFileOutput);
    expect(existsSync(expectedOutput)).toBeTrue();
  });
  it("Tracks number of conversion errors", async () => {
    const { errors } = await converter.run();
    expect(errors.length).toBeGreaterThan(0);
  });
  it("Throws on duplicate flows", async () => {
    await converter.run().catch((err) => {
      expect(err.message.includes("Duplicate flows found"));
    });
  });
});
