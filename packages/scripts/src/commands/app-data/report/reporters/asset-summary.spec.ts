import { FlowTypes, IAssetEntryHashmap } from "data-models";
import { AssetsSummaryReport } from "./asset-summary";
import { IParsedWorkbookData } from "../../convert/types";

const MOCK_PROJECT_ASSETS: IAssetEntryHashmap = {
  "path/to/mock_image.jpg": { md5Checksum: "", size_kb: 512 },
  "unused_asset.mp3": { md5Checksum: "", size_kb: 512 },
};

const MOCK_TEMPLATE_ROWS: FlowTypes.TemplateRow[] = [
  {
    type: "button",
    _nested_name: "",
    name: "",
    parameter_list: {},
  },
  {
    type: "audio",
    _nested_name: "",
    name: "",
    value: "mock_audio.mp3",
    parameter_list: {},
  },
];

const MOCK_DATA_LIST_ROWS: FlowTypes.Data_listRow[] = [
  {
    text: "mock_text",
    icon: "path/to/mock_image.jpg",
    audio: "mock_audio.mp3",
    pdf: "mock_pdf.pdf",
  },
];

const MOCK_WORKBOOK_DATA: IParsedWorkbookData = {
  template: [
    {
      flow_type: "template",
      flow_name: "mock_template_1",
      rows: MOCK_TEMPLATE_ROWS,
    },
    {
      flow_type: "data_list",
      flow_name: "mock_data_list_1",
      rows: MOCK_DATA_LIST_ROWS,
    },
  ],
};

/** yarn workspace scripts test -t asset-summary.spec.ts */
describe("Asset Summary Report", () => {
  let reporter: AssetsSummaryReport;

  beforeEach(() => {
    reporter = new AssetsSummaryReport(MOCK_PROJECT_ASSETS);
  });

  it("Generates a list of file extension matches from asset data", () => {
    expect(reporter["assetExtensions"]).toEqual(["jpg", "mp3"]);
  });

  it("Enumerates assets from template and data_lists", async () => {
    const { asset_summary } = await reporter.process(MOCK_WORKBOOK_DATA);
    expect(asset_summary.data).toEqual([
      { path: "mock_audio.mp3", count: 2 },
      { path: "path/to/mock_image.jpg", count: 1 },
    ]);
  });
});
