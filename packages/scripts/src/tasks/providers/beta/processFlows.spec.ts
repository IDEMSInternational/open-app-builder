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

  it("keeps _source on flows in the google_drive folder", () => {
    writeFlow("google_drive/synced.json", "synced");
    processFlows({ sourceFlowsFolder: sheetsFolder, targetAppDataFolder: appDataFolder });
    expect(readOutput("synced")._source).toEqual(_source);
    expect(readContents().data_list.synced._source).toEqual(_source);
  });

  it("replaces _source with the folder for flows outside the google_drive folder", () => {
    writeFlow("copied.json", "copied");
    writeFlow("local/deeper/nested.json", "nested");
    processFlows({ sourceFlowsFolder: sheetsFolder, targetAppDataFolder: appDataFolder });
    expect(readOutput("copied")._source).toEqual({ folder: "" });
    expect(readOutput("nested")._source).toEqual({ folder: "local/deeper" });
    expect(readContents().data_list.copied._source).toEqual({ folder: "" });
  });

  it("does not treat a folder only starting with google_drive as synced", () => {
    writeFlow("google_drive_copy/flow.json", "flow");
    processFlows({ sourceFlowsFolder: sheetsFolder, targetAppDataFolder: appDataFolder });
    expect(readOutput("flow")._source).toEqual({ folder: "google_drive_copy" });
  });

  it("keeps all _source when keepAllSources is set", () => {
    writeFlow("transient.json", "transient");
    processFlows({
      sourceFlowsFolder: sheetsFolder,
      targetAppDataFolder: appDataFolder,
      keepAllSources: true,
    });
    expect(readOutput("transient")._source).toEqual(_source);
  });
});
