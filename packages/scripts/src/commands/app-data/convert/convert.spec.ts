import { AppDataConverter } from "./index";

import path from "path";

import { SCRIPTS_WORKSPACE_PATH } from "../../../paths";
import { emptyDirSync, existsSync, readdirSync } from "fs-extra";
const testDataDir = path.resolve(SCRIPTS_WORKSPACE_PATH, "test", "data");

const paths = {
  inputFolder: path.resolve(testDataDir, "input"),
  outputFolder: path.resolve(testDataDir, "output"),
  cacheFolder: path.resolve(testDataDir, "cache"),
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

  // fit("Skips draft flows", async () => {
  //   const outputs = await processor.process(testInputs);
  //   console.log("outputs", outputs);
  // });

  // TODO - test errors and warnings are collated and output accordingly
});
