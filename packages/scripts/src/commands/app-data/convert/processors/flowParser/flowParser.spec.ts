import path from "path";
import { FlowTypes } from "data-models";
import { SCRIPTS_WORKSPACE_PATH } from "../../../../../paths";
import { clearLogs, getLogs } from "../../utils";
import { FlowParserProcessor } from "./flowParser";

const testDataDir = path.resolve(SCRIPTS_WORKSPACE_PATH, "test", "data");
const paths = {
  SHEETS_CACHE_FOLDER: path.resolve(testDataDir, "cache"),
  SHEETS_INPUT_FOLDER: path.resolve(testDataDir, "input"),
  SHEETS_OUTPUT_FOLDER: path.resolve(testDataDir, "output"),
};

// NOTE - inputs are just to test general structure and not run actual parser code
const testInputs: FlowTypes.FlowTypeWithData[] = [
  {
    flow_type: "data_list",
    flow_subtype: "debug",
    flow_name: "test_data_list",
    status: "released",
    data_list_name: "example",
    rows: [],
    _xlsxPath: "sheets/test_input.xlsx",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "test_template",
    status: "released",
    rows: [],
    _xlsxPath: "sheets/test_input.xlsx",
  },
  {
    flow_type: "data_pipe",
    flow_subtype: "debug",
    flow_name: "test_data_pipe",
    status: "released",
    rows: [],
    _xlsxPath: "sheets/test_input.xlsx",
  },
  ,
];

let processor: FlowParserProcessor;
describe("FlowParser Processor", () => {
  beforeAll(() => {
    processor = new FlowParserProcessor(paths);
    processor.cache.clear();
  });
  beforeEach(() => {
    clearLogs();
  });
  afterAll(() => {
    processor.cache.clear();
  });
  // TODO - Handle errors
  it("Logs error on invalid flow_type", async () => {
    const invalidFlow: FlowTypes.FlowTypeWithData = {
      ...testInputs[0],
      flow_type: "test_invalid_type" as any,
    };
    await processor.process([invalidFlow]);
    const errorLogs = getLogs("error");
    expect(errorLogs.length).toEqual(1);
    expect(errorLogs[0].message).toEqual("No parser available for flow_type: test_invalid_type");
  });
  it("Logs flow parse errors", async () => {
    const brokenFlow: FlowTypes.FlowTypeWithData = {
      ...testInputs[0],
      flow_name: "test_broken_flow",
    };
    delete brokenFlow.rows;
    await processor.process([brokenFlow]);
    const errorLogs = getLogs("error", "Template parse error");
    const foundError = errorLogs.find((l) => l.details?.flow_name === "test_broken_flow");
    expect(foundError).not.toBeUndefined();
  });
  it("Outputs flows by type", async () => {
    const output = await processor.process(testInputs);
    expect(Object.keys(output)).toEqual(["data_list", "template", "data_pipe"]);
    const errorLogs = getLogs("error");
    if (errorLogs.length > 0) {
      console.log("Unexpected Errors:\n", errorLogs);
    }
    expect(errorLogs.length).toEqual(0);
  });
  it("Caches outputs for conversions", () => {
    const cacheName = processor.cache.generateCacheEntryName(testInputs[0]);
    expect(processor.cache.get(cacheName)).toBeTruthy();
  });
});
