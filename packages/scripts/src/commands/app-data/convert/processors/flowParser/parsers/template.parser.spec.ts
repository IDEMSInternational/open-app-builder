import { FlowTypes } from "data-models";
import { TemplateParser } from "./template.parser";

const ROW_BASE: FlowTypes.TemplateRow = {
  _nested_name: "",
  name: "",
  type: "" as any,
};
/** yarn workspace scripts test -t template.parser.spec.ts */
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

  it("Generates row names for nested item rows", () => {
    const itemRows = [{ type: "text" }, { type: "button", name: "btn_@item.id" }];

    const res = parser.run({
      flow_name: "",
      flow_type: "template",
      rows: [{ ...ROW_BASE, name: "", type: "data_items", rows: itemRows }],
    });
    const [textRow, buttonRow] = res.rows[0].rows;
    // default generate base name and item suffix
    expect(textRow.name).toEqual("text_1_@item.id");
    // allow author-provided value
    expect(buttonRow.name).toEqual("btn_@item.id");
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
    // CASE 5 - Action_list
    const case5 = parser.postProcessRow({
      ...ROW_BASE,
      name: "test_action_list",
      value: "click | set_field : test_field : hello",
    });
    expect(case5.value).toEqual([
      {
        trigger: "click",
        action_id: "set_field",
        args: ["test_field", "hello"],
        _raw: "click | set_field : test_field : hello",
        _cleaned: "click | set_field : test_field : hello",
      },
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

  it("Converts rows with _action_list in name to templated action_list", () => {
    const res = parser.postProcessRow({
      ...ROW_BASE,
      name: "test_action_list",
      value: "click | set_field : test : true; click | go_to : example",
    });
    expect(res.value).toEqual([
      {
        _cleaned: "click | set_field : test : true",
        _raw: "click | set_field : test : true",
        action_id: "set_field",
        args: ["test", true],
        trigger: "click",
      },
      {
        _cleaned: "click | go_to : example",
        _raw: "click | go_to : example",
        action_id: "go_to",
        args: ["example"],
        trigger: "click",
      },
    ]);
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
        {
          trigger: "click",
          action_id: "",
          args: ["@local.my_action_list", "some_value"],
          params: { param_1: "@local.my_action_list", param_2: "some_value" },
        },
      ],
    });
    // Should replace self references in args and params
    expect(res.action_list[0].args).toEqual(["this.value", "some_value"]);
    expect(res.action_list[0].params).toEqual({ param_1: "this.value", param_2: "some_value" });
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
        _nested_name: "dg",
        name: "dg",
        type: "display_group",
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
    expect(nestedNames).toEqual(["dg.named_text", "dg.text_2"]);
  });
});

describe("Template Parser PostProcess", () => {
  let parser: TemplateParser;
  beforeEach(() => {
    parser = new TemplateParser({} as any);
  });
  it("hoists variable references from display_groups", () => {
    const rows: FlowTypes.TemplateRow[] = [
      {
        _nested_name: "dg",
        name: "dg",
        type: "display_group",
        rows: [
          {
            _nested_name: "db.inner_var",
            type: "set_variable",
            name: "inner_var",
            value: "inner_val",
          },
        ],
      },
    ];
    const res = parser.postProcessFlow({ flow_name: "", flow_type: "template", rows });
    // hoisting should move inner set_variable to top-level, resulting in 2 flat rows
    // the hoisted row should also have its nested_name updated to reflect new position
    expect(res.rows.length).toEqual(2);
    expect(res.rows[0].type).toEqual("set_variable");
    expect(res.rows[0]._nested_name).toEqual("inner_var");
    expect(res.rows[1].type).toEqual("display_group");
  });

  it("hoisting variable references from display_groups preserves order", () => {
    const rows: FlowTypes.TemplateRow[] = [
      {
        _nested_name: "var1",
        name: "var1",
        type: "set_variable",
        value: "value1",
      },
      {
        _nested_name: "dg1",
        name: "dg1",
        type: "display_group",
        rows: [
          {
            _nested_name: "dg1.var2",
            type: "set_variable",
            name: "var2",
            value: "value2",
          },
          {
            _nested_name: "dg1.button1",
            type: "button",
            name: "button1",
          },
        ],
      },
      {
        _nested_name: "var3",
        name: "var3",
        type: "set_variable",
        value: "value3",
      },
      {
        _nested_name: "dg2",
        name: "dg2",
        type: "display_group",
        rows: [
          {
            _nested_name: "dg2.var4",
            type: "set_variable",
            name: "var4",
            value: "value4",
          },
        ],
      },
    ];
    const res = parser.postProcessFlow({ flow_name: "", flow_type: "template", rows });

    // Should have 6 rows total: var1, var2 (hoisted), dg1, var3, var4 (hoisted), dg2
    expect(res.rows.length).toEqual(6);

    // Check that order is preserved - hoisted variables appear before their display_groups
    expect(res.rows[0].name).toEqual("var1");
    expect(res.rows[1].name).toEqual("var2"); // hoisted from dg1
    expect(res.rows[2].name).toEqual("dg1"); // display_group with var2 removed
    expect(res.rows[3].name).toEqual("var3");
    expect(res.rows[4].name).toEqual("var4"); // hoisted from dg2
    expect(res.rows[5].name).toEqual("dg2"); // display_group with var4 removed

    // Verify hoisted variables have correct _nested_name
    expect(res.rows[1]._nested_name).toEqual("var2");
    expect(res.rows[4]._nested_name).toEqual("var4");

    // Verify display_groups no longer contain the hoisted variables
    expect(res.rows[2].rows.length).toEqual(1); // only button1 remains
    expect(res.rows[2].rows[0].name).toEqual("button1");
    expect(res.rows[5].rows.length).toEqual(0); // empty after var4 hoisted
  });
});

describe("Template Parser [QC]", () => {
  // TODO - confirm what checks to include and add to code
  // it("Ensures answer_list parameters refer to list variables", () => {
  // });
});
