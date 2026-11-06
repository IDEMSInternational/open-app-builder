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

  it("keeps flow properties other than rows", () => {
    const flow = {
      flow_type: "data_list",
      flow_name: "test_data_list",
      status: "released",
      rows: [],
    } as FlowTypes.FlowTypeWithData;
    expect(parseDataList(flow)).toEqual(flow);
  });
});
