import { FlowTypes } from "data-models";
import { IParsedWorkbookData } from "../../types";
import { TemplateSummaryReport } from "./template-summary";

const MOCK_ROWS_1: FlowTypes.TemplateRow[] = [
  {
    type: "button",
    _nested_name: "",
    name: "",
    action_list: [
      { action_id: "share", args: [], trigger: "click" },
      { action_id: "audio_play", args: [], trigger: "click" },
    ],
  },
  {
    type: "text",
    _nested_name: "",
    name: "",
    action_list: [
      { action_id: "emit", args: ["force_reprocess"], trigger: "click" },
      { action_id: "emit", args: ["completed"], trigger: "click" },
    ],
  },
];
const MOCK_ROWS_2: FlowTypes.TemplateRow[] = [
  {
    type: "button",
    _nested_name: "",
    name: "",
    action_list: [{ action_id: "share", args: [], trigger: "click" }],
  },
];

const MOCK_WORKBOOK_DATA: IParsedWorkbookData = {
  template: [
    {
      flow_type: "template",
      flow_name: "mock_template_1",
      rows: MOCK_ROWS_1,
    },
    {
      flow_type: "template",
      flow_name: "mock_template_2",
      rows: MOCK_ROWS_2,
    },
  ],
};

/** yarn workspace scripts test -t template-summary.spec.ts */
describe("Template Summary Report", () => {
  it("Enumerates component references", async () => {
    const { template_components } = await new TemplateSummaryReport().process(MOCK_WORKBOOK_DATA);
    expect(template_components.data).toEqual([
      { type: "button", count: 2 },
      { type: "text", count: 1 },
    ]);
  });
  it("Enumerates action references", async () => {
    const { template_actions } = await new TemplateSummaryReport().process(MOCK_WORKBOOK_DATA);
    // NOTE - emit actions should be enumerated by subtype from args
    expect(template_actions.data).toEqual([
      { type: "audio_play", count: 1 },
      { type: "emit: completed", count: 1 },
      { type: "emit: force_reprocess", count: 1 },
      { type: "share", count: 2 },
    ]);
  });
});
