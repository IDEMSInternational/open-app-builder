import path from "path";
import { FlowTypes } from "data-models";
import { SCRIPTS_WORKSPACE_PATH } from "../../../../paths";
import { FlowParserProcessor } from "./flowParser";

const testDataDir = path.resolve(SCRIPTS_WORKSPACE_PATH, "test", "data");
const paths = {
  SHEETS_CACHE_FOLDER: path.resolve(testDataDir, "cache"),
  SHEETS_INPUT_FOLDER: path.resolve(testDataDir, "input"),
  SHEETS_OUTPUT_FOLDER: path.resolve(testDataDir, "output"),
};

const testInputs: FlowTypes.FlowTypeWithData[] = [
  {
    flow_type: "data_list",
    flow_subtype: "debug",
    flow_name: "example_data_list",
    status: "released",
    data_list_name: "example",
    rows: [],
    _xlsxPath: "sheets/example_data_list",
  },
  {
    flow_type: "template",
    flow_subtype: "debug",
    flow_name: "example_data_from_id",
    status: "released",
    rows: [],
    _xlsxPath: "sheets/example_data_list",
  },
  ,
];

let processor: FlowParserProcessor;
describe("FlowParser Processor", () => {
  beforeAll(() => {
    processor = new FlowParserProcessor(paths);
    processor.cache.clear();
  });
  afterAll(() => {
    processor.cache.clear();
  });
  // TODO - Handle errors
  // it("Throws on invalid flow_type", async () => {
  //   const invalidFlow: FlowTypes.FlowTypeWithData = {
  //     ...testInputs[0],
  //     flow_type: "test_invalid_type" as any,
  //   };
  //   await processor.process([invalidFlow]).catch((err) => {
  //     const { flow_name, flow_type, _xlsxPath } = invalidFlow;
  //     const expected = `No parser available for flow_type: ${flow_type}\n${flow_name}\n${_xlsxPath}`;
  //     expect(err.message).toEqual(expected);
  //   });
  // });
  // it("Throws on flow parse error", async () => {
  //   const brokenFlow: FlowTypes.FlowTypeWithData = {
  //     ...testInputs[0],
  //     flow_name: "test_broken_flow",
  //   };
  //   delete brokenFlow.rows;
  //   await processor.process([brokenFlow]).catch((err) => {
  //     expect(err.includes("Template Parse Error")).toBe(true);
  //   });
  // });
  it("Outputs flows by type", async () => {
    const output = await processor.process(testInputs);
    expect(Object.keys(output)).toEqual(["data_list", "template"]);
  });
  it("Uses cache", () => {
    const cacheName = processor.cache.generateCacheEntryName(testInputs[0]);
    expect(processor.cache.get(cacheName)).toBeTruthy();
  });
});
