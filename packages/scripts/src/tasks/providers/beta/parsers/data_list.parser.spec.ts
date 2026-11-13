import { FlowTypes } from "data-models";
import { parseDataList } from "./data_list.parser";

/** Parse data_list rows and return the output rows */
function parseRows(rows: any[]) {
  const flow = { flow_type: "data_list", flow_name: "test_data_list", rows };
  return parseDataList(flow as FlowTypes.FlowTypeWithData).rows;
}

/**
 * Each test lists the authored input rows (as converted from the sheet) followed by the
 * full expected output rows
 *
 * yarn workspace scripts test -t data_list.parser.spec.ts
 */
describe("Beta Data List Parser", () => {
  it("parses list columns and leaves other values unchanged", () => {
    const input = [
      { id: "a", tags_list: "x; y;", number: 3, flag: false, empty_list: "" },
      // unlike templates, rows with a name ending _list do not have their value parsed
      { id: "b", name: "values_list", value: "kept; as string" },
      { id: "c", item_list_2: "one;two" },
      // NOTE - action_list is not yet parsed into actions (unlike the legacy parser)
      { id: "d", action_list: "click | go_to: home" },
    ];
    const expected = [
      { id: "a", tags_list: ["x", "y"], number: 3, flag: false, empty_list: "" },
      { id: "b", name: "values_list", value: "kept; as string" },
      { id: "c", item_list_2: ["one", "two"] },
      { id: "d", action_list: ["click | go_to: home"] },
    ];
    expect(parseRows(input)).toEqual(expected);
  });

  it("removes language suffixes from columns, using the flow language", () => {
    const flow = {
      flow_type: "data_list",
      flow_name: "test_data_list",
      language: "spa",
      rows: [{ id: "a", title: "Hola", "title::eng": "Hello", "tags_list::eng": "x; y" }],
    } as FlowTypes.FlowTypeWithData;
    expect(parseDataList(flow).rows).toEqual([
      {
        id: "a",
        title: "Hola",
        tags_list: ["x", "y"],
        _translatedFields: { title: { spa: "Hola", eng: "Hello" }, tags_list: { eng: "x; y" } },
      },
    ]);
  });

  it("assigns _metadata from a ${metadata} row, removing it from the rows", () => {
    const flow = {
      flow_type: "data_list",
      flow_name: "test_data_list",
      rows: [
        { id: "${metadata}", completed: "type: boolean", "count::eng": "type: number" },
        { id: "a", "count::eng": 1 },
      ],
    } as FlowTypes.FlowTypeWithData;
    const parsed = parseDataList(flow);
    expect(parsed.rows).toEqual([{ id: "a", count: 1, _translatedFields: { count: { eng: 1 } } }]);
    expect((parsed as FlowTypes.Data_list)._metadata).toEqual({
      completed: { type: "boolean" },
      count: { type: "number" },
    });
  });

  it("infers _metadata from the data without a ${metadata} row", () => {
    const flow = {
      flow_type: "data_list",
      flow_name: "test_data_list",
      rows: [{ id: "a", title: "Hello", number: 1 }],
    } as FlowTypes.FlowTypeWithData;
    expect((parseDataList(flow) as FlowTypes.Data_list)._metadata).toEqual({
      number: { type: "number" },
    });
  });

  it("keeps flow properties other than rows", () => {
    const flow = {
      flow_type: "data_list",
      flow_name: "test_data_list",
      status: "released",
      rows: [],
    } as FlowTypes.FlowTypeWithData;
    expect(parseDataList(flow)).toEqual({ ...flow, _source: { type: "transient" } });
  });

  describe("_source", () => {
    const _source = { name: "folder", path: "workbook.xlsx", url: "https://example.com/sheet" };
    const flow = {
      flow_type: "data_list",
      flow_name: "test_source",
      rows: [],
      _source,
    } as FlowTypes.FlowTypeWithData;
    const path = "/deployment/app_data/sheets/test_source.json";

    it("removes name and url from transient flows, which is the default", () => {
      expect(parseDataList(flow, { path })._source).toEqual({ path, type: "transient" });
      expect(parseDataList(flow, { path, type: "transient" })._source).toEqual({
        path,
        type: "transient",
      });
      expect(flow._source).toEqual(_source);
    });

    it("keeps name and url of fixed flows, replacing the path", () => {
      expect(parseDataList(flow, { path, type: "fixed" })._source).toEqual({
        ..._source,
        path,
        type: "fixed",
      });
    });

    it("adds _source when missing", () => {
      const { _source: _, ...withoutSource } = flow;
      const parsed = parseDataList(withoutSource as FlowTypes.FlowTypeWithData, {
        path,
        type: "fixed",
      });
      expect(parsed._source).toEqual({ path, type: "fixed" });
    });
  });
});
