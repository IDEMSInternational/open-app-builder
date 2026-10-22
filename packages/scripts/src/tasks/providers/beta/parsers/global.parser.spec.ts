import { FlowTypes } from "data-models";
import fs from "fs-extra";
import os from "os";
import path from "path";
import { combineGlobals, createCombinedGlobal, replaceGlobalSheetRows } from "./global.parser";

/** Create a global flow with the given rows */
function globalFlow(flow_name: string, rows: any[]) {
  return { flow_type: "global", flow_name, rows } as FlowTypes.FlowTypeWithData;
}

/**
 * Each test lists the input global sheets followed by the full expected output
 *
 * yarn workspace scripts test -t global.parser.spec.ts
 */
describe("Beta Global Parser", () => {
  let targetFolder: string;

  beforeEach(() => {
    targetFolder = fs.mkdtempSync(path.join(os.tmpdir(), "beta-global-parser-"));
  });
  afterEach(() => {
    fs.removeSync(targetFolder);
  });

  it("combines all global sheets into a single _global flow ordered by sheet", () => {
    const input = [
      {
        sheet: "menus/app_menu",
        flow: globalFlow("app_menu", [
          { type: "declare_field_default", name: "user_mode", value: true },
        ]),
      },
      {
        sheet: "app_globals",
        flow: globalFlow("app_globals", [
          { type: "declare_global_constant", name: "app_name", value: "My App" },
          { type: "declare_global_constant", name: "app_version", value: 2 },
        ]),
      },
    ];
    const expected = {
      flow_type: "global",
      flow_name: "_global",
      status: "released",
      rows: [
        {
          type: "declare_global_constant",
          name: "app_name",
          value: "My App",
          _sheet: "app_globals",
        },
        { type: "declare_global_constant", name: "app_version", value: 2, _sheet: "app_globals" },
        { type: "declare_field_default", name: "user_mode", value: true, _sheet: "menus/app_menu" },
      ],
    };
    expect(combineGlobals(input, targetFolder)).toEqual(expected);
  });

  it("writes _global.json and removes any previous global output", () => {
    fs.writeJsonSync(path.resolve(targetFolder, "old_globals.json"), {});
    const input = [
      {
        sheet: "app_globals",
        flow: globalFlow("app_globals", [{ type: "declare_global_constant", name: "a", value: 1 }]),
      },
    ];
    const combined = combineGlobals(input, targetFolder);

    expect(fs.readdirSync(targetFolder)).toEqual(["_global.json"]);
    expect(fs.readJsonSync(path.resolve(targetFolder, "_global.json"))).toEqual(combined);
  });

  it("writes an empty _global flow when there are no global sheets", () => {
    const expected = { flow_type: "global", flow_name: "_global", status: "released", rows: [] };
    expect(combineGlobals([], targetFolder)).toEqual(expected);
  });

  describe("replaceGlobalSheetRows", () => {
    const combined = {
      ...createCombinedGlobal(),
      rows: [
        { type: "declare_global_constant", name: "a", value: 1, _sheet: "sheet_a" },
        { type: "declare_global_constant", name: "b", value: 1, _sheet: "sheet_b" },
        { type: "declare_global_constant", name: "b2", value: 1, _sheet: "sheet_b" },
        { type: "declare_global_constant", name: "c", value: 1, _sheet: "sheet_c" },
      ],
    };

    it("replaces rows from a sheet in their original position", () => {
      const input = [{ type: "declare_global_constant", name: "b_new", value: 2 }];
      const expected = [
        { type: "declare_global_constant", name: "a", value: 1, _sheet: "sheet_a" },
        { type: "declare_global_constant", name: "b_new", value: 2, _sheet: "sheet_b" },
        { type: "declare_global_constant", name: "c", value: 1, _sheet: "sheet_c" },
      ];
      expect(replaceGlobalSheetRows(combined, "sheet_b", input as any).rows).toEqual(expected);
    });

    it("appends rows from a new sheet", () => {
      const input = [{ type: "declare_field_default", name: "d", value: false }];
      const expected = [
        ...combined.rows,
        { type: "declare_field_default", name: "d", value: false, _sheet: "sheet_d" },
      ];
      expect(replaceGlobalSheetRows(combined, "sheet_d", input as any).rows).toEqual(expected);
    });

    it("removes rows from a sheet when replaced with no rows", () => {
      const expected = [
        { type: "declare_global_constant", name: "a", value: 1, _sheet: "sheet_a" },
        { type: "declare_global_constant", name: "c", value: 1, _sheet: "sheet_c" },
      ];
      expect(replaceGlobalSheetRows(combined, "sheet_b", []).rows).toEqual(expected);
    });

    it("does not modify the original flow", () => {
      const original = JSON.parse(JSON.stringify(combined));
      replaceGlobalSheetRows(combined, "sheet_b", []);
      expect(combined).toEqual(original);
    });
  });
});
