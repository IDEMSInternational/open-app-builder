import { FlowTypes, IAssetEntryHashmap } from "data-models";
import { AssetsSummaryReport } from "./asset-summary";
import { IParsedWorkbookData } from "../../convert/types";

const MOCK_PROJECT_ASSETS: IAssetEntryHashmap = {
  "path/to/mock_image.jpg": { md5Checksum: "", size_kb: 512 },
  "mock_audio.mp3": { md5Checksum: "", size_kb: 512 },
  "unused_asset.png": { md5Checksum: "", size_kb: 512 },
};

const MOCK_TEMPLATE_ROWS: FlowTypes.TemplateRow[] = [
  {
    type: "button",
    _nested_name: "",
    name: "",
    parameter_list: {
      icon: "path/to/mock_image.jpg",
    },
  },
  {
    type: "audio",
    _nested_name: "",
    name: "",
    value: "mock_audio.mp3",
  },
];

const MOCK_DATA_LIST_ROWS: FlowTypes.Data_listRow[] = [
  {
    text: "mock_text",
    icon: "path/to/mock_image.jpg",
    audio: "missing_audio.mp3",
    // NOTE - this will not be captured. No other pdf assets
    // exist in project assets, so file extension not checked.
    pdf: "missing_pdf.pdf",
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
    expect(reporter["assetExtensions"]).toEqual(["jpg", "mp3", "png"]);
  });

  it("Enumerates assets from template and data_lists", async () => {
    const { asset_summary } = await reporter.process(MOCK_WORKBOOK_DATA);
    expect(asset_summary.data).toEqual([
      { path: "mock_audio.mp3", count: 1 },
      { path: "path/to/mock_image.jpg", count: 2 },
    ]);
  });

  it("identifies missing assets", async () => {
    const { assets_missing } = await reporter.process(MOCK_WORKBOOK_DATA);
    expect(assets_missing.data).toEqual([{ path: "missing_audio.mp3", count: 1, missing: true }]);
  });

  it("identifies unused assets", async () => {
    const { assets_unused } = await reporter.process(MOCK_WORKBOOK_DATA);
    expect(assets_unused.data).toEqual([{ path: "unused_asset.png", size_kb: 512 }]);
  });
});
