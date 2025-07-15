import { DefaultParser, RowProcessor } from "./default.parser";
import { FlowTypes } from "data-models";

/**
 * yarn workspace scripts test -t default.parser.spec.ts
 *
 * TODO - add tests for rest of functionality, e.g. `@default` syntax, translated fields,
 * nested group extract, special field types, `@row` self-reference, metadata fields etc.
 */
describe("Default Parser", () => {
  const parser = new DefaultParser({ processedFlowHashmap: {} } as any);
  it("Cleans field values - handles strings consisting only of whitespace", () => {
    const output = parser.run({
      flow_name: "test_flow_input_empty",
      flow_type: "data_list",
      rows: [
        {
          type: "text",
          name: "empty",
          value: "",
        },
        {
          type: "text",
          name: "tab_empty",
          value: "\t\t",
        },
        {
          type: "text",
          name: "newline_empty",
          value: "\n\n",
        },
        {
          type: "text",
          name: "return_empty",
          value: "\r\r",
        },
        {
          type: "text",
          name: "newline_return_empty",
          value: "\r\n\n\r",
        },
      ],
    }) as FlowTypes.FlowTypeWithData;
    // not possible to use the actual objects as the function used is not exported
    expect(output.rows).toEqual([
      {
        type: "text",
        name: "empty",
        value: "",
      },
      {
        type: "text",
        name: "tab_empty",
        value: "",
      },
      {
        type: "text",
        name: "newline_empty",
        value: "",
      },
      {
        type: "text",
        name: "return_empty",
        value: "",
      },
      {
        type: "text",
        name: "newline_return_empty",
        value: "",
      },
    ]);
  });

  it("Cleans field values - trims whitespace from beginning and end of strings", () => {
    const output = parser.run({
      flow_name: "test_flow_input_nonempty",
      flow_type: "data_list",
      rows: [
        {
          type: "text",
          name: "spaces",
          value: "this is a test string with spaces",
        },
        {
          type: "text",
          name: "tab_and_spaces",
          value: "\tthis is a test string with spaces and tabs\t",
        },
        {
          type: "text",
          name: "newline_not_empty",
          value: "Cats and dogs are the best pets\nTrue?",
        },
        {
          type: "text",
          name: "newline_return_not_empty",
          value: "Hello,\rI like dogs...\but not cats at all!\r",
        },
        {
          type: "text",
          name: "return_not_empty",
          value: "\tThis is a test string with spaces and tabs\t",
        },
      ],
    }) as FlowTypes.FlowTypeWithData;
    expect(output.rows).toEqual([
      {
        type: "text",
        name: "spaces",
        value: "this is a test string with spaces",
      },
      {
        type: "text",
        name: "tab_and_spaces",
        value: "this is a test string with spaces and tabs",
      },
      {
        type: "text",
        name: "newline_not_empty",
        value: "Cats and dogs are the best pets\nTrue?",
      },
      {
        type: "text",
        name: "newline_return_not_empty",
        value: "Hello,\rI like dogs...\but not cats at all!",
      },
      {
        type: "text",
        name: "return_not_empty",
        value: "This is a test string with spaces and tabs",
      },
    ]);
  });
});

describe("RowProcessor - handleSpecialFieldTypes", () => {
  let processor: RowProcessor;
  beforeEach(() => {
    processor = new RowProcessor(null as any, null as any);
  });
  it("Converts columns with list suffix", () => {
    processor.row = { condition_list: "@field.should_show === true;" } as any;
    processor["handleSpecialFieldTypes"]();
    expect(processor.row).toEqual({
      condition_list: ["@field.should_show === true"],
    });
  });
  it("Converts columns named action_list", () => {
    processor.row = { action_list: "click | set_field : test_field : true" } as any;
    processor["handleSpecialFieldTypes"]();
    expect(processor.row).toEqual({
      action_list: [
        {
          trigger: "click",
          action_id: "set_field",
          args: ["test_field", true],
          _raw: "click | set_field : test_field : true",
          _cleaned: "click | set_field : test_field : true",
        },
      ],
    });
  });
  it("Ignores action_list column if containing dynamic reference", () => {
    processor.row = { action_list: "@local.example_action_list" } as any;
    processor["handleSpecialFieldTypes"]();
    expect(processor.row).toEqual({ action_list: "@local.example_action_list" });
  });
  it("Converts columns with date suffix", () => {
    processor.row = { "schedule.start_date": 33178 } as any;
    processor["handleSpecialFieldTypes"]();
    expect(processor.row).toEqual({
      "schedule.start_date": "1990-11-01T00:00:00.000",
    });
  });
  it("QC - Converts columns with empty string to correct format", () => {
    processor.row = { style_list: "" } as any;
    processor["handleSpecialFieldTypes"]();
    expect(processor.row).toEqual({
      style_list: [],
    });
  });
});
