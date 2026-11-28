import { FlowTypes } from "data-models";
import fs from "fs-extra";
import os from "os";
import path from "path";
import { writeExternalFlows } from "./writeFlows";

function flow(flow_name: string, workbook = "workbook") {
  return {
    flow_type: "template",
    flow_name,
    rows: [{ type: "text", value: "edited" }],
    _source: { name: "drive-folder-id", path: workbook, url: `https://example.com/${workbook}` },
  } as FlowTypes.FlowTypeWithData;
}

/** Flow json as written without `_source` */
function withoutSource(flow_name: string, workbook = "workbook") {
  const { _source, ...data } = flow(flow_name, workbook);
  return data;
}

/** yarn workspace scripts test -t writeFlows.spec.ts */
describe("Beta writeExternalFlows", () => {
  let tempDir: string;
  let sheetsFolder: string;

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "beta-write-flows-"));
    sheetsFolder = path.join(tempDir, "sheets");
  });
  afterEach(() => fs.removeSync(tempDir));

  function writeExisting(relativePath: string, flow_name: string) {
    const existing = { flow_type: "template", flow_name, rows: [{ value: "original" }] };
    fs.outputJsonSync(path.join(sheetsFolder, relativePath), existing);
  }
  function read(relativePath: string) {
    return fs.readJsonSync(path.join(sheetsFolder, relativePath));
  }
  function exists(relativePath: string) {
    return fs.existsSync(path.join(sheetsFolder, relativePath));
  }

  describe("transient settings (sheets folder, excluding google_drive, no _source)", () => {
    const write = (flows: FlowTypes.FlowTypeWithData[]) =>
      writeExternalFlows(flows, {
        targetFolder: sheetsFolder,
        excludeFolders: ["google_drive"],
        includeSource: false,
      });

    it("replaces an existing flow json in its current folder, without _source", () => {
      writeExisting("home/home_screen.json", "home_screen");
      const { updatedPaths } = write([flow("home_screen")]);
      expect(updatedPaths).toEqual([path.join(sheetsFolder, "home/home_screen.json")]);
      expect(read("home/home_screen.json")).toEqual(withoutSource("home_screen"));
    });

    it("does not replace flows in excluded folders", () => {
      writeExisting("google_drive/home_screen.json", "home_screen");
      write([flow("home_screen")]);
      expect(read("google_drive/home_screen.json").rows).toEqual([{ value: "original" }]);
      expect(read("home_screen.json")).toEqual(withoutSource("home_screen"));
    });

    it("writes new flows alongside existing flows from the same workbook", () => {
      writeExisting("home/home_screen.json", "home_screen");
      write([flow("home_screen"), flow("new_flow")]);
      expect(read("home/new_flow.json")).toEqual(withoutSource("new_flow"));
    });

    it("writes new flows from a workbook with no existing flows to the target folder root", () => {
      writeExisting("home/home_screen.json", "home_screen");
      write([flow("home_screen"), flow("other", "other_workbook")]);
      expect(read("other.json")).toEqual(withoutSource("other", "other_workbook"));
    });

    it("skips unchanged files", () => {
      write([flow("home_screen")]);
      expect(write([flow("home_screen")]).updatedPaths).toEqual([]);
    });
  });

  describe("fixed settings (google_drive folder, _source, delete removed)", () => {
    const driveFolder = () => path.join(sheetsFolder, "google_drive");
    const write = (flows: FlowTypes.FlowTypeWithData[]) =>
      writeExternalFlows(flows, {
        targetFolder: driveFolder(),
        includeSource: true,
        deleteRemoved: true,
        flowsFolder: sheetsFolder,
      });

    it("writes flows with _source", () => {
      write([flow("home_screen")]);
      expect(read("google_drive/home_screen.json")).toEqual(flow("home_screen"));
    });

    it("deletes flow jsons in the target folder that were not written", () => {
      writeExisting("google_drive/core/removed.json", "removed");
      writeExisting("local/kept.json", "kept");
      const { deletedPaths } = write([flow("home_screen")]);
      expect(deletedPaths).toEqual([path.join(driveFolder(), "core/removed.json")]);
      expect(exists("google_drive/core")).toBe(false);
      expect(exists("local/kept.json")).toBe(true);
    });

    it("does not replace flows outside the target folder", () => {
      writeExisting("local/home_screen.json", "home_screen");
      write([flow("home_screen")]);
      expect(read("local/home_screen.json").rows).toEqual([{ value: "original" }]);
      expect(read("google_drive/home_screen.json")).toEqual(flow("home_screen"));
    });
  });
});
