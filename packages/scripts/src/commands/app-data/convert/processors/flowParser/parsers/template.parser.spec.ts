import { FlowTypes } from "data-models";
import { TemplateParser } from "./template.parser";

const ROW_BASE: FlowTypes.TemplateRow = {
  _nested_name: "",
  name: "",
  type: "" as any,
};

describe("Template Parser PostProcessor", () => {
  let parser: TemplateParser;
  beforeEach(() => {
    parser = new TemplateParser({} as any);
  });

  it("Remove empty rows", () => {
    const res = parser.postProcessRow({} as any);
    expect(res).toEqual(undefined);
  });

  it("Replaces empty row type with set_variable", () => {
    const res = parser.postProcessRow({ ...ROW_BASE, type: "" as any });
    expect(res.type).toEqual("set_variable");
  });

  // TODO - notify authors of change (can now auto gen multiple)
  it("Generates default row names when omitted for multiple rows", () => {
    const res = parser.run({
      flow_name: "test_name_generate_multiple",
      flow_type: "template",
      rows: [
        { ...ROW_BASE, name: "", type: "accordion" },
        { ...ROW_BASE, name: "", type: "accordion" },
      ],
    });
    expect(res.rows).toEqual([
      // Note - suffix numbers start at 2 as flow sheet would typically have row 1 as header row
      {
        _nested_name: "accordion_2",
        name: "accordion_2",
        type: "accordion",
      },
      {
        _nested_name: "accordion_3",
        name: "accordion_3",
        type: "accordion",
      },
    ]);
  });

  it("Converts rows ending _list or containing _list_ in name to templated list", () => {
    // CASE 0 - Do not convert rows unless explicit includes _list_ or ends _list
    const case0_1 = parser.postProcessRow({
      ...ROW_BASE,
      name: "test_listen",
      value: "item_1; item_2; item_3;",
    });
    expect(case0_1.value).toEqual("item_1; item_2; item_3;");

    // CASE 1 - List items defined inline
    const case1 = parser.postProcessRow({
      ...ROW_BASE,
      name: "test_list",
      value: "item_1; item_2; item_3;",
    });
    expect(case1.value).toEqual(["item_1", "item_2", "item_3"]);
    // CASE 2 - List refers to variable (do not parse)
    const case2 = parser.postProcessRow({
      ...ROW_BASE,
      name: "test_list_2",
      value: "@local.some_list",
    });
    expect(case2.value).toEqual("@local.some_list");
    // CASE 3 - List items include variables
    const case3 = parser.postProcessRow({
      ...ROW_BASE,
      name: "test_list_3",
      value: "@local.item_1; @local.item_2",
    });
    expect(case3.value).toEqual(["@local.item_1", "@local.item_2"]);
    // CASE 4 - List items as json (mix dynamic and missing)
    const case4 = parser.postProcessRow({
      ...ROW_BASE,
      name: "test_list_4",
      value: "key_1a: textValue | key_1b: @local.value; key_2a:  | key_2b: 5",
    });
    expect(case4.value).toEqual([
      { key_1a: "textValue", key_1b: "@local.value" },
      { key_2a: "", key_2b: 5 },
    ]);
  });

  it("Converts rows with _collection in name to templated collection", () => {
    const res = parser.postProcessRow({
      ...ROW_BASE,
      name: "test_collection",
      value: "key_1:value_1; key_2:value_2",
    });
    expect(res.value).toEqual({ key_1: "value_1", key_2: "value_2" });
  });

  it("Parses parameter lists", () => {
    const res = parser.postProcessRow({
      ...ROW_BASE,
      // NOTE - list already array due to defaultParser initial parse
      parameter_list: ["key_1:val_1", "key_2: val_trailing_spaces   ", "key_3_no_value"] as any,
    });
    // TODO - anymore advanced cases?
    expect(res.parameter_list).toEqual({
      key_1: "val_1",
      key_2: "val_trailing_spaces",
      key_3_no_value: "true",
    });
  });

  it("Replaces action list self-references", () => {
    const res = parser.postProcessRow({
      ...ROW_BASE,
      name: "my_action_list",
      action_list: [
        { trigger: "click", action_id: "", args: ["@local.my_action_list", "some_value"] },
      ],
    });
    expect(res.action_list[0].args).toEqual(["this.value", "some_value"]);
  });

  it("Extracts dynamic fields", () => {
    const res = parser.postProcessRow({
      ...ROW_BASE,
      value: "@local.dynamic_value",
    });
    expect(res._dynamicFields).toEqual({
      value: [
        {
          fullExpression: "@local.dynamic_value",
          matchedExpression: "@local.dynamic_value",
          type: "local",
          fieldName: "dynamic_value",
        },
      ],
    });
  });

  it("Extracts dynamic dependencies", () => {
    const res = parser.postProcessRow({
      ...ROW_BASE,
      value: "@local.dynamic_value",
    });
    expect(res._dynamicDependencies).toEqual({ "@local.dynamic_value": ["value"] });
  });

  it("Creates nested path names for child rows", () => {
    const rows: FlowTypes.TemplateRow[] = [
      {
        _nested_name: "my_items",
        name: "my_items",
        type: "items",
        // Handle case of both named and unnamed nested row names
        rows: [
          {
            ...ROW_BASE,
            type: "text",
            name: "named_text",
          },
          { ...ROW_BASE, type: "text" },
        ],
      },
    ];
    const res = parser.run({ flow_type: "template", flow_name: "test_nested", rows });
    const itemRows = res.rows[0].rows;
    const nestedNames = itemRows.map((n) => n._nested_name);
    expect(nestedNames).toEqual(["my_items.named_text", "my_items.text_2"]);
  });
});

describe("Template Parser [QC]", () => {
  // TODO - confirm what checks to include and add to code
  // it("Ensures answer_list parameters refer to list variables", () => {
  // });
});
