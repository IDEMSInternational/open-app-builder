import { FlowTypes } from "data-models";
import { parseTemplate } from "./template.parser";

/** Parse template rows and return the output rows */
function parseRows(rows: any[]) {
  const flow = { flow_type: "template", flow_name: "test_template", rows };
  return parseTemplate(flow as FlowTypes.FlowTypeWithData).rows;
}

/**
 * Each test lists the authored input rows (as converted from the sheet) followed by the
 * full expected output rows
 *
 * yarn workspace scripts test -t template.parser.spec.ts
 */
describe("Beta Template Parser", () => {
  it("defaults row type and parses list columns and list rows", () => {
    const input = [
      { name: "untyped", value: "hello" },
      { type: "", name: "empty_type", value: 0 },
      { type: "set_variable", name: "colours_list", value: "red; green ;blue;" },
      { type: "text", name: "tagged", value: "hi", style_list: "large; bold", empty_list: "" },
    ];
    const expected = [
      { type: "set_variable", name: "untyped", value: "hello", _nested_name: "untyped" },
      { type: "set_variable", name: "empty_type", value: 0, _nested_name: "empty_type" },
      {
        type: "set_variable",
        name: "colours_list",
        value: ["red", "green", "blue"],
        _nested_name: "colours_list",
      },
      {
        type: "text",
        name: "tagged",
        value: "hi",
        style_list: ["large", "bold"],
        empty_list: "",
        _nested_name: "tagged",
      },
    ];
    expect(parseRows(input)).toEqual(expected);
  });

  it("parses parameter_list and action_list", () => {
    const input = [
      {
        type: "button",
        name: "btn",
        value: "Go",
        parameter_list: "style: primary; disabled; link: https://example.com/a",
        action_list: "click | go_to: home; completed | set_field: done: true",
      },
      { type: "button", name: "ref", action_list: "@item.action_list" },
    ];
    const expected = [
      {
        type: "button",
        name: "btn",
        value: "Go",
        parameter_list: { style: "primary", disabled: "true", link: "https://example.com/a" },
        action_list: [
          {
            trigger: "click",
            action_id: "go_to",
            args: ["home"],
            _raw: "click | go_to: home",
          },
          {
            trigger: "completed",
            action_id: "set_field",
            args: ["done", true],
            _raw: "completed | set_field: done: true",
          },
        ],
        _nested_name: "btn",
      },
      {
        type: "button",
        name: "ref",
        // action lists referencing a variable are kept as the reference
        action_list: "@item.action_list",
        _nested_name: "ref",
        _dynamicFields: {
          action_list: [
            {
              fullExpression: "@item.action_list",
              matchedExpression: "@item.action_list",
              type: "item",
              fieldName: "action_list",
            },
          ],
        },
        _dynamicDependencies: { "@item.action_list": ["action_list"] },
      },
    ];
    expect(parseRows(input)).toEqual(expected);
  });

  it("nests begin and end rows and generates row names", () => {
    const input = [
      { type: "title", value: "Title" },
      { type: "template", value: "header_template" },
      { type: "begin_display_group", name: "group" },
      { type: "text", value: "In group" },
      { type: "begin_accordion" },
      { type: "text", name: "inner", value: "Nested" },
      { type: "end_accordion" },
      { type: "end_display_group" },
      { type: "begin_items", name: "list", value: "@data.items" },
      { type: "text", value: "@item.label" },
      { type: "end_items" },
    ];
    const expected = [
      // top-level generated names are numbered from 2 (matching sheet row without header)
      { type: "title", value: "Title", name: "title_2", _nested_name: "title_2" },
      // template rows are named after the target template
      {
        type: "template",
        value: "header_template",
        name: "header_template",
        _nested_name: "header_template",
      },
      {
        type: "display_group",
        name: "group",
        _nested_name: "group",
        rows: [
          // display_group parents are not included in nested names
          { type: "text", value: "In group", name: "text_1", _nested_name: "text_1" },
          {
            type: "accordion",
            name: "accordion_2",
            _nested_name: "accordion_2",
            rows: [
              { type: "text", name: "inner", value: "Nested", _nested_name: "accordion_2.inner" },
            ],
          },
        ],
      },
      {
        type: "items",
        name: "list",
        value: "@data.items",
        _nested_name: "list",
        rows: [
          // unnamed item child rows reference the item id
          {
            type: "text",
            value: "@item.label",
            name: "text_1_@item.id",
            _nested_name: "list.text_1_@item.id",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@item.label",
                  matchedExpression: "@item.label",
                  type: "item",
                  fieldName: "label",
                },
              ],
              name: [
                {
                  fullExpression: "text_1_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
              _nested_name: [
                {
                  fullExpression: "list.text_1_@item.id",
                  matchedExpression: "@item.id",
                  type: "item",
                  fieldName: "id",
                },
              ],
            },
            _dynamicDependencies: {
              "@item.label": ["value"],
              "@item.id": ["name", "_nested_name"],
            },
          },
        ],
        _dynamicFields: {
          value: [
            {
              fullExpression: "@data.items",
              matchedExpression: "@data.items",
              type: "data",
              fieldName: "items",
            },
          ],
        },
        _dynamicDependencies: { "@data.items": ["value"] },
      },
    ];
    expect(parseRows(input)).toEqual(expected);
  });

  it("skips unmatched end rows and closes unfinished groups", () => {
    const input = [
      { type: "end_accordion" },
      { type: "begin_display_group", name: "open" },
      { type: "text", name: "a" },
    ];
    const expected = [
      {
        type: "display_group",
        name: "open",
        _nested_name: "open",
        rows: [{ type: "text", name: "a", _nested_name: "a" }],
      },
    ];
    expect(parseRows(input)).toEqual(expected);
  });

  it("assigns dynamic fields and dependencies to top-level and nested rows", () => {
    const input = [
      { type: "set_variable", name: "count", value: 1 },
      {
        type: "text",
        name: "msg",
        value: "Count is @local.count",
        condition: "@fields.show",
        // comments are not evaluated
        comments: "@local.ignored",
      },
      { type: "begin_display_group", name: "g", hidden: "!@local.visible" },
      {
        type: "text",
        name: "child",
        value: "@global.app_name",
        parameter_list: "style: @local.style",
      },
      { type: "end_display_group" },
    ];
    const expected = [
      { type: "set_variable", name: "count", value: 1, _nested_name: "count" },
      {
        type: "text",
        name: "msg",
        value: "Count is @local.count",
        condition: "@fields.show",
        comments: "@local.ignored",
        _nested_name: "msg",
        _dynamicFields: {
          value: [
            {
              fullExpression: "Count is @local.count",
              matchedExpression: "@local.count",
              type: "local",
              fieldName: "count",
            },
          ],
          condition: [
            {
              fullExpression: "@fields.show",
              matchedExpression: "@fields.show",
              type: "fields",
              fieldName: "show",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.count": ["value"],
          "@fields.show": ["condition"],
        },
      },
      {
        type: "display_group",
        name: "g",
        hidden: "!@local.visible",
        _nested_name: "g",
        // nested row dynamic fields are managed by the nested rows themselves
        _dynamicFields: {
          hidden: [
            {
              fullExpression: "!@local.visible",
              matchedExpression: "!@local.visible",
              type: "local",
              fieldName: "visible",
            },
          ],
        },
        _dynamicDependencies: { "!@local.visible": ["hidden"] },
        rows: [
          {
            type: "text",
            name: "child",
            value: "@global.app_name",
            parameter_list: { style: "@local.style" },
            _nested_name: "child",
            _dynamicFields: {
              value: [
                {
                  fullExpression: "@global.app_name",
                  matchedExpression: "@global.app_name",
                  type: "global",
                  fieldName: "app_name",
                },
              ],
              parameter_list: {
                style: [
                  {
                    fullExpression: "@local.style",
                    matchedExpression: "@local.style",
                    type: "local",
                    fieldName: "style",
                  },
                ],
              },
            },
            _dynamicDependencies: {
              "@global.app_name": ["value"],
              "@local.style": ["parameter_list.style"],
            },
          },
        ],
      },
    ];
    expect(parseRows(input)).toEqual(expected);
  });

  it("keeps flow properties other than rows", () => {
    const flow = {
      flow_type: "template",
      flow_name: "test_template",
      status: "released",
      override_target: "other_template",
      rows: [],
    } as FlowTypes.FlowTypeWithData;
    expect(parseTemplate(flow)).toEqual(flow);
  });
});
