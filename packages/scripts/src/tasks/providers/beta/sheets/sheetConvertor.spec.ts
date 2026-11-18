import * as xlsx from "xlsx";
import { FlowTypes } from "data-models";
import { SheetConvertor } from "./sheetConvertor";

/**
 * Create an xlsx workbook buffer from tabs of cell rows, where the first row is the header,
 * so test inputs can be laid out as they would appear in the spreadsheet
 */
function createWorkbook(tabs: { [tabName: string]: any[][] }): Buffer {
  const workbook = xlsx.utils.book_new();
  for (const [tabName, rows] of Object.entries(tabs)) {
    xlsx.utils.book_append_sheet(workbook, xlsx.utils.aoa_to_sheet(rows), tabName);
  }
  return xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
}

/** yarn workspace scripts test -t sheetConvertor.spec.ts */
describe("Beta SheetConvertor", () => {
  /** Each test lists the input workbook tabs followed by the full expected output flows */
  describe("sheetToFlow", () => {
    it("converts each content list entry to a flow with rows from the matching tab", () => {
      const input = {
        "==content_list==": [
          ["flow_type", "flow_name", "status", "override_target"],
          ["template", "home_screen", "released", "base_home"],
          ["data_list", "colours", "draft"],
          ["global", "app_globals"],
        ],
        home_screen: [
          ["type", "name", "value", "parameter_list"],
          ["title", "heading", "Welcome", "style: large"],
          ["text", null, "Unnamed text"],
        ],
        colours: [
          ["id", "label", "hex", "tags_list"],
          ["red", "Red", "#ff0000", "warm; bright"],
          ["blue", "Blue", "#0000ff"],
        ],
        app_globals: [
          ["type", "name", "value"],
          ["declare_global_constant", "app_name", "My App"],
          ["declare_field_default", "user_mode", true],
          ["declare_field_default", "count", 0],
        ],
        // tabs not listed in the content list are ignored
        notes: [["comment"], ["Not a flow"]],
      };
      const expected = [
        {
          flow_type: "template",
          flow_name: "home_screen",
          status: "released",
          override_target: "base_home",
          // row values are kept as authored, with empty cells omitted
          rows: [
            { type: "title", name: "heading", value: "Welcome", parameter_list: "style: large" },
            { type: "text", value: "Unnamed text" },
          ],
        },
        {
          flow_type: "data_list",
          flow_name: "colours",
          status: "draft",
          rows: [
            { id: "red", label: "Red", hex: "#ff0000", tags_list: "warm; bright" },
            { id: "blue", label: "Blue", hex: "#0000ff" },
          ],
        },
        {
          flow_type: "global",
          flow_name: "app_globals",
          rows: [
            { type: "declare_global_constant", name: "app_name", value: "My App" },
            { type: "declare_field_default", name: "user_mode", value: true },
            { type: "declare_field_default", name: "count", value: 0 },
          ],
        },
      ];
      expect(SheetConvertor.sheetToFlow(createWorkbook(input), "test.xlsx")).toEqual(expected);
    });

    it("skips content list entries without a flow_name or matching tab", () => {
      const input = {
        "==content_list==": [
          ["flow_type", "flow_name"],
          ["template", null],
          ["template", "missing_tab"],
          ["template", "present"],
        ],
        present: [
          ["type", "name"],
          ["text", "a"],
        ],
      };
      const expected = [
        { flow_type: "template", flow_name: "present", rows: [{ type: "text", name: "a" }] },
      ];
      expect(SheetConvertor.sheetToFlow(createWorkbook(input), "test.xlsx")).toEqual(expected);
    });

    it("returns no flows for a workbook without a content list", () => {
      const input = {
        home_screen: [
          ["type", "name"],
          ["text", "a"],
        ],
      };
      expect(SheetConvertor.sheetToFlow(createWorkbook(input), "test.xlsx")).toEqual([]);
    });
  });

  describe("flowToSheet", () => {
    it("builds a workbook that the sync parses back to the same flow, without _source", () => {
      const flow = {
        flow_type: "template",
        flow_name: "home_screen",
        status: "released",
        rows: [
          { type: "text", name: "title", value: "Hello" },
          { type: "button", name: "go", action_list: "click | go_to: next", hidden: true },
        ],
        _source: { name: "folder", path: "old.xlsx", url: "https://example.com" },
      } as FlowTypes.FlowTypeWithData;

      const workbook = SheetConvertor.flowToSheet(flow);
      const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
      const [parsed] = SheetConvertor.sheetToFlow(buffer, "test.xlsx");

      const { _source, ...expected } = flow;
      expect(parsed).toEqual(expected);
    });

    it("writes object values as json text", () => {
      const flow = {
        flow_type: "data_list",
        flow_name: "items",
        rows: [{ id: "a", options: { x: 1 } }],
      } as unknown as FlowTypes.FlowTypeWithData;
      const workbook = SheetConvertor.flowToSheet(flow);
      const rows = xlsx.utils.sheet_to_json(workbook.Sheets.items);
      expect(rows).toEqual([{ id: "a", options: '{"x":1}' }]);
    });

    it("builds one workbook with a content list and a tab per flow", () => {
      const flows = [
        {
          flow_type: "template",
          flow_name: "page_a",
          status: "released",
          rows: [{ type: "text", name: "title", value: "A" }],
        },
        {
          flow_type: "data_list",
          flow_name: "list_b",
          flow_subtype: "items",
          rows: [{ id: "b1", label: "B" }],
        },
      ] as FlowTypes.FlowTypeWithData[];

      const workbook = SheetConvertor.flowToSheet(flows);
      expect(workbook.SheetNames).toEqual(["==content_list==", "page_a", "list_b"]);
      const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
      expect(SheetConvertor.sheetToFlow(buffer, "test.xlsx")).toEqual(flows);
    });

    it("rejects the same flow name twice in one workbook", () => {
      const flow = { flow_type: "template", flow_name: "same", rows: [] } as any;
      const other = { flow_type: "data_list", flow_name: "same", rows: [] } as any;
      expect(() => SheetConvertor.flowToSheet([flow, other])).toThrow(/more than once/);
    });

    it("rejects flow names longer than an xlsx tab name allows", () => {
      const flow = { flow_type: "template", flow_name: "x".repeat(32), rows: [] } as any;
      expect(() => SheetConvertor.flowToSheet(flow)).toThrow(/longer than 31/);
    });
  });
});
