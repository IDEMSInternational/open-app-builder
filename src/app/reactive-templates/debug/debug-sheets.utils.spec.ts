import { FlowTypes } from "packages/data-models";
import {
  buildFolderTree,
  getFolderSheetStates,
  IDebugSheet,
  normaliseSourcePath,
  NO_PATH_FOLDER,
  parseTransientSheetsList,
  toDebugSheets,
} from "./debug-sheets.utils";

function sheet(flow_name: string, path?: string): IDebugSheet {
  return { flow_type: "template", flow_name, path, isTransient: false };
}

describe("debug sheets utils", () => {
  describe("normaliseSourcePath", () => {
    it("keeps relative paths", () => {
      expect(normaliseSourcePath("google_drive/core/home.json")).toEqual(
        "google_drive/core/home.json"
      );
    });
    it("strips absolute paths up to the sheets folder", () => {
      expect(normaliseSourcePath("C:\\repo\\app_data\\sheets\\local\\home.json")).toEqual(
        "local/home.json"
      );
      expect(normaliseSourcePath("/repo/app_data/sheets/home.json")).toEqual("home.json");
    });
    it("returns undefined without a path", () => {
      expect(normaliseSourcePath(undefined)).toBeUndefined();
    });
  });

  describe("toDebugSheets", () => {
    const entries = [
      { flow_type: "template", flow_name: "fixed", _source: { url: "u1", type: "fixed" } },
      { flow_type: "template", flow_name: "local", _source: { type: "transient" } },
      { flow_type: "template", flow_name: "listed", _source: { type: "transient" } },
    ] as FlowTypes.FlowTypeBase[];

    it("marks listed flows as transient, with the url of their transient sheet", () => {
      const listed = [{ flow_type: "template", flow_name: "listed", url: "u3" }];
      const sheets = toDebugSheets("template", entries, listed);
      expect(sheets.map((s) => [s.flow_name, s.isTransient, s.url])).toEqual([
        ["fixed", false, "u1"],
        ["local", false, undefined],
        ["listed", true, "u3"],
      ]);
    });
    it("ignores list entries of another flow type", () => {
      const listed = [{ flow_type: "data_list", flow_name: "listed", url: "u3" }];
      expect(toDebugSheets("template", entries, listed)[2].isTransient).toBe(false);
    });
  });

  describe("parseTransientSheetsList", () => {
    const entry = { flow_type: "template", flow_name: "home", url: "u1" };
    it("reads sheets from the list", () => {
      expect(parseTransientSheetsList({ folder: { id: "f" }, sheets: [entry] })).toEqual([entry]);
    });
    it("reads older lists of sheets", () => {
      expect(parseTransientSheetsList([entry])).toEqual([entry]);
    });
    it("returns no sheets for invalid lists", () => {
      expect(parseTransientSheetsList(undefined)).toEqual([]);
      expect(parseTransientSheetsList({ sheets: [{ flow_name: "no_url" }] })).toEqual([]);
    });
  });

  describe("buildFolderTree", () => {
    it("nests sheets by folder, sorted, with sheets without a path last", () => {
      const tree = buildFolderTree([
        sheet("b", "google_drive/core/b.json"),
        sheet("a", "google_drive/core/a.json"),
        sheet("c", "google_drive/c.json"),
        sheet("root", "root.json"),
        sheet("none"),
        sheet("d", "alpha/d.json"),
      ]);
      expect(tree.count).toEqual(6);
      expect(tree.sheets.map((s) => s.flow_name)).toEqual(["root"]);
      expect(tree.folders.map((f) => f.name)).toEqual(["alpha", "google_drive", NO_PATH_FOLDER]);
      const drive = tree.folders[1];
      expect(drive.count).toEqual(3);
      expect(drive.sheets.map((s) => s.flow_name)).toEqual(["c"]);
      expect(drive.folders[0].path).toEqual("google_drive/core");
      expect(drive.folders[0].sheets.map((s) => s.flow_name)).toEqual(["a", "b"]);
    });
  });
  describe("getFolderSheetStates", () => {
    it("allows creating a sheet for a folder with no sheets, from its direct flows only", () => {
      const states = getFolderSheetStates([
        sheet("a", "local/a.json"),
        sheet("b", "local/b.json"),
        sheet("c", "local/sub/c.json"),
        sheet("root", "root.json"),
        sheet("none"),
      ]);
      const local = states.get("local");
      expect(local?.canCreate).toBeTrue();
      expect(local?.url).toBeUndefined();
      expect(local?.flows.map((s) => s.flow_name)).toEqual(["a", "b"]);
      expect(states.get("local/sub")?.flows.map((s) => s.flow_name)).toEqual(["c"]);
      // No actions for the root folder or sheets without a path
      expect(states.has("")).toBeFalse();
      expect(states.has(NO_PATH_FOLDER)).toBeFalse();
    });

    it("does not allow creating a sheet if any flow has one", () => {
      const states = getFolderSheetStates([
        sheet("a", "local/a.json"),
        { ...sheet("b", "local/b.json"), url: "https://sheet/b", isTransient: true },
      ]);
      expect(states.get("local")?.canCreate).toBeFalse();
      expect(states.get("local")?.url).toBeUndefined();
    });

    it("returns the url of the folder sheet", () => {
      const url = "https://sheet/local";
      const states = getFolderSheetStates([
        { ...sheet("a", "local/a.json"), url, isTransient: true, sheetFolder: "local" },
        { ...sheet("b", "local/b.json"), url, isTransient: true, sheetFolder: "local" },
      ]);
      expect(states.get("local")?.canCreate).toBeFalse();
      expect(states.get("local")?.url).toEqual(url);
    });
  });

  it("toDebugSheets adds the folder of a folder sheet", () => {
    const entries = [{ flow_type: "template", flow_name: "a" } as FlowTypes.FlowTypeBase];
    const [result] = toDebugSheets("template", entries, [
      { flow_type: "template", flow_name: "a", url: "https://sheet", folder: "local" },
    ]);
    expect(result.sheetFolder).toEqual("local");
  });
});
