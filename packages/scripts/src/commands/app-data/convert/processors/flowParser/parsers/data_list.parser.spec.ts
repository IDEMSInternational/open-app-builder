import { FlowTypes } from "data-models";
import { DataListParser } from ".";
import { TEST_DATA_PATHS, useMockLogger } from "../../../../../../../test/helpers/utils";
import { FlowParserProcessor } from "../flowParser";

const MOCK_DATA_LIST = (): FlowTypes.Data_list => ({
  flow_type: "data_list",
  flow_name: "mock_data_list",
  rows: [
    {
      id: "id_1",
      number: 1,
      text: "hello",
      boolean: true,
      nested: { string: "hello" },
    },
    {
      id: "id_1",
      number: 1,
      text: "hello",
      boolean: true,
      nested: { string: "hello" },
      additional: "included",
    },
  ],
  metadata: {},
  _xlsxPath: "/mock/data/path",
});

/***********************************************************************
 * Basic
 **********************************************************************/

/** yarn workspace scripts test -t  data_list.parser.spec.ts **/
describe("data_list Parser Metadata", () => {
  let parser: DataListParser;

  beforeAll(() => {
    parser = new DataListParser({ processedFlowHashmap: {} } as any);
  });
  it("Infers column metadata from data", () => {
    const metadata = parser["getFlowMetadata"](MOCK_DATA_LIST());
    expect(metadata).toEqual({
      number: { type: "number" },
      text: { type: "string" },
      boolean: { type: "boolean" },
      nested: { type: "object" },
      // data missing or undefined in first row identified from subsequent
      additional: { type: "string" },
    });
  });
  it("Assigns column metadata from metadata row", () => {
    const flowWithMetadataRow = {
      ...MOCK_DATA_LIST(),
      rows: [
        { id: "@metadata", number: "type: number", text: "type: string" },
        { id: "id_1", number: undefined, text: undefined },
      ],
    };
    const metadata = parser["getFlowMetadata"](flowWithMetadataRow);
    expect(metadata).toEqual({
      number: { type: "number" },
      text: { type: "string" },
    });
  });
  it("QC metadata", () => {
    const loggerSpy = useMockLogger(false);
    const flowWithMetadataRow = {
      ...MOCK_DATA_LIST(),
      rows: [{ id: "id_1", number: 1, text: undefined }],
    };
    parser["getFlowMetadata"](flowWithMetadataRow);
    expect(loggerSpy.error).toHaveBeenCalledTimes(1);
    expect(loggerSpy.error).toHaveBeenCalledWith({
      msg1: "[mock_data_list] Data List validation has (1) errors",
      msg2: "/mock/data/path",
    });
  });
});

/***********************************************************************
 * Advanced use cases
 **********************************************************************/

const testFlow: FlowTypes.Data_list = {
  flow_type: "data_list",
  flow_name: "test_data_list",
  rows: [
    {
      id: "test_1",
      test_notification_schedule: "key_1:value_1; key_2:value_2",
      test_condition_list: "@fields.workshop_number == 1",
      "nested.test_1": 1,
      "nested.test_2": "two",
    },
  ],
  metadata: {},
};

describe("data_list Parser (single)", () => {
  let parser: DataListParser;

  beforeAll(() => {
    parser = new DataListParser({ processedFlowHashmap: {} } as any);
  });

  it("Extracts condition_list", async () => {
    const { rows } = parser.run(testFlow as any);
    const { test_condition_list } = rows[0];
    expect(test_condition_list).toEqual([
      {
        condition_type: "calc",
        condition_args: { calc: "@fields.workshop_number == 1" },
        _raw: "@fields.workshop_number == 1",
      },
    ]);
  });
  it("Extracts nested properties", async () => {
    const { rows } = parser.run(testFlow as any);
    const { nested } = rows[0];
    expect(nested).toEqual({ test_1: 1, test_2: "two" });
  });
  // TODO - likely deprecated (can't see in codebase)
  it("Extracts notification_schedule", async () => {
    const { rows } = parser.run(testFlow as any);
    const { test_notification_schedule } = rows[0];
    expect(test_notification_schedule).toEqual({ key_1: "value_1", key_2: "value_2" });
  });
});

describe("data_list Parser (multiple)", () => {
  const parser = new FlowParserProcessor(TEST_DATA_PATHS);
  beforeAll(() => {
    parser.cache.clear();
  });
  afterAll(() => {
    parser.cache.clear();
  });
  it("Adds override targets to flows", async () => {
    await parser.process([
      { flow_type: "data_list", flow_name: "list_1", rows: [] },
      {
        flow_type: "data_list",
        flow_name: "list_1_override",
        rows: [],
        override_target: "list_1",
        override_condition: "example_condition",
      },
    ]);
    const { processedFlowHashmapWithMeta } = parser;
    expect(processedFlowHashmapWithMeta.data_list.list_1).toEqual({
      flow_type: "data_list",
      flow_name: "list_1",
      rows: [],
      _overrides: { list_1_override: "example_condition" },
    });
  });
});
