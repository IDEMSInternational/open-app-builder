import { DataListParser } from ".";
import { getTestFlowParserProcessor } from "../flowParser.spec";

const testFlow = {
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
};

describe("data_list Parser (single)", () => {
  let outputRows: any[];
  beforeAll(() => {
    const parser = new DataListParser({ processedFlowHashmap: {} } as any);
    const output = parser.run(testFlow as any);
    outputRows = output.rows;
  });
  it("Extracts condition_list", async () => {
    const { test_condition_list } = outputRows[0];
    expect(test_condition_list).toEqual([
      {
        condition_type: "calc",
        condition_args: { calc: "@fields.workshop_number == 1" },
        _raw: "@fields.workshop_number == 1",
      },
    ]);
  });
  it("Extracts nested properties", async () => {
    const { nested } = outputRows[0];
    expect(nested).toEqual({ test_1: 1, test_2: "two" });
  });
  // TODO - likely deprecated (can't see in codebase)
  it("Extracts notification_schedule", async () => {
    const { test_notification_schedule } = outputRows[0];
    expect(test_notification_schedule).toEqual({ key_1: "value_1", key_2: "value_2" });
  });
});

describe("data_list Parser (multiple)", () => {
  const parser = getTestFlowParserProcessor();
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
