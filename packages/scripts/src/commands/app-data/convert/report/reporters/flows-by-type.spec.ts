import { IParsedWorkbookData } from "../../types";
import { FlowByTypeReport } from "./flows-by-type";

const MOCK_WORKBOOK_DATA: IParsedWorkbookData = {
  template: [
    {
      flow_type: "template",
      flow_name: "mock_template_1",
      rows: [],
    },
    {
      flow_type: "data_list",
      flow_name: "mock_data_list_1",
      rows: [],
    },
    {
      flow_type: "data_list",
      flow_subtype: "mock_subtype",
      flow_name: "mock_data_list_2",
      rows: [],
    },
    {
      flow_type: "data_list",
      flow_name: "mock_data_list_3",
      rows: [],
    },
  ],
};

/** yarn workspace scripts test -t flows-by-type.spec.ts */
describe("Flows By Type Report", () => {
  it("Enumerates flows by type and subtype", async () => {
    const { flows_by_type } = await new FlowByTypeReport().process(MOCK_WORKBOOK_DATA);
    console.log(flows_by_type);
    expect(flows_by_type.data).toEqual([
      { type: "data_list", subtype: null, total: 2 },
      { type: "data_list", subtype: "mock_subtype", total: 1 },
      { type: "template", subtype: null, total: 1 },
    ]);
  });
});
