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
      additional: false,
    },
  ],
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
  it("Infers column metadata from data (for non-string columns)", () => {
    const { _metadata } = parser.postProcessFlow(MOCK_DATA_LIST());
    expect(_metadata).toEqual({
      number: { type: "number" },
      boolean: { type: "boolean" },
      nested: { type: "object" },
      // data missing or undefined in first row identified from subsequent
      additional: { type: "boolean" },
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
    const { _metadata } = parser.postProcessFlow(flowWithMetadataRow);
    expect(_metadata).toEqual({
      number: { type: "number" },
    });
  });
  it("Omits metadata when all columns are strings", () => {
    const flowWithStringColumns = {
      ...MOCK_DATA_LIST(),
      rows: [{ id: "id_1", text: "hello" }],
    };
    const { _metadata } = parser.postProcessFlow(flowWithStringColumns);
    expect(_metadata).toBeUndefined();
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // it("QC metadata", () => {
  //   const loggerSpy = useMockLogger(false);
  //   const flowWithMetadataRow = {
  //     ...MOCK_DATA_LIST(),
  //     rows: [{ id: "id_1", number: 1, text: undefined }],
  //   };
  //   parser.postProcessFlow(flowWithMetadataRow);
  //   expect(loggerSpy.warning).toHaveBeenCalledTimes(1);
  //   expect(loggerSpy.warning).toHaveBeenCalledWith({
  //     msg1: "[mock_data_list] Data List validation has (1) warnings",
  //     msg2: "/mock/data/path",
  //   });
  // });
});

/***********************************************************************
 * Advanced use cases
 **********************************************************************/

const MOCK_DATA_LIST_FLOW_ADVANCED = (): FlowTypes.Data_list => ({
  flow_type: "data_list",
  flow_name: "mock_data_list_advanced",
  rows: [
    {
      id: "test_1",
      test_notification_schedule: "key_1:value_1; key_2:value_2",
      test_condition_list: "@fields.workshop_number == 1",
      "nested.test_1": 1,
      "nested.test_2": "two",
    },
  ],
});

describe("data_list Parser (single)", () => {
  let parser: DataListParser;

  beforeAll(() => {
    parser = new DataListParser({ processedFlowHashmap: {} } as any);
  });

  it("Extracts condition_list", async () => {
    const { rows } = parser.run(MOCK_DATA_LIST_FLOW_ADVANCED() as any);
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
    const { rows } = parser.run(MOCK_DATA_LIST_FLOW_ADVANCED() as any);
    const { nested } = rows[0];
    expect(nested).toEqual({ test_1: 1, test_2: "two" });
  });
  // TODO - likely deprecated (can't see in codebase)
  it("Extracts notification_schedule", async () => {
    const { rows } = parser.run(MOCK_DATA_LIST_FLOW_ADVANCED() as any);
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
