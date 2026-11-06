import fs from "fs-extra";
import os from "os";
import path from "path";
import { processFlows } from "./processFlows";

const _source = { name: "folder", path: "workbook.xlsx", url: "https://example.com/sheet" };

/** yarn workspace scripts test -t processFlows.spec.ts */
describe("Beta processFlows", () => {
  let tempDir: string;
  let sheetsFolder: string;
  let appDataFolder: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "beta-process-sheets-"));
    sheetsFolder = path.join(tempDir, "sheets");
    appDataFolder = path.join(tempDir, "app_data");
  });
  afterEach(() => fs.removeSync(tempDir));

  function writeFlow(relativePath: string, flow_name: string) {
    const flow = { flow_type: "data_list", flow_name, rows: [{ id: "a" }], _source };
    fs.outputJsonSync(path.join(sheetsFolder, relativePath), flow);
  }
  function readOutput(flow_name: string) {
    return fs.readJsonSync(path.join(appDataFolder, "sheets", "data_list", `${flow_name}.json`));
  }
  function readContents() {
    return fs.readJsonSync(path.join(appDataFolder, "sheets", "contents.json"));
  }

  function sourcePath(relativePath: string) {
    return path.resolve(sheetsFolder, relativePath);
  }

  it("keeps _source on flows in the google_drive folder, adding path and type", () => {
    writeFlow("google_drive/synced.json", "synced");
    processFlows({ sourceFlowsFolder: sheetsFolder, targetAppDataFolder: appDataFolder });
    const expected = { ..._source, path: sourcePath("google_drive/synced.json"), type: "fixed" };
    expect(readOutput("synced")._source).toEqual(expected);
    expect(readContents().data_list.synced._source).toEqual(expected);
  });

  it("marks flows outside the google_drive folder as transient, without name or url", () => {
    writeFlow("copied.json", "copied");
    writeFlow("local/deeper/nested.json", "nested");
    processFlows({ sourceFlowsFolder: sheetsFolder, targetAppDataFolder: appDataFolder });
    expect(readOutput("copied")._source).toEqual({
      path: sourcePath("copied.json"),
      type: "transient",
    });
    expect(readOutput("nested")._source).toEqual({
      path: sourcePath("local/deeper/nested.json"),
      type: "transient",
    });
    expect(readContents().data_list.copied._source.type).toEqual("transient");
  });

  it("does not treat a folder only starting with google_drive as fixed", () => {
    writeFlow("google_drive_copy/flow.json", "flow");
    processFlows({ sourceFlowsFolder: sheetsFolder, targetAppDataFolder: appDataFolder });
    expect(readOutput("flow")._source.type).toEqual("transient");
  });

  it("uses the given type for all flows", () => {
    writeFlow("local.json", "local");
    processFlows({
      sourceFlowsFolder: sheetsFolder,
      targetAppDataFolder: appDataFolder,
      type: "fixed",
    });
    expect(readOutput("local")._source).toEqual({
      ..._source,
      path: sourcePath("local.json"),
      type: "fixed",
    });
  });
});
