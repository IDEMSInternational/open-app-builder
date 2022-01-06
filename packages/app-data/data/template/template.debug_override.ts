/* eslint-disable */
import { FlowTypes } from "data-models";
const template: FlowTypes.Template[] = [
  {
    flow_type: "template",
    flow_name: "example_override_default",
    status: "released",
    flow_subtype: "debug_override",
    rows: [
      {
        type: "set_variable",
        name: "a_or_b",
        value: "a",
        _translations: {
          value: {},
        },
        _nested_name: "a_or_b",
      },
      {
        type: "title",
        name: "title_1",
        value: "Override Template Default",
        _translations: {
          value: {},
        },
        exclude_from_translation: true,
        _nested_name: "title_1",
      },
      {
        type: "text",
        name: "text_a",
        value: "Change language below to apply override",
        _translations: {
          value: {},
        },
        condition: '@local.a_or_b === "a"',
        _nested_name: "text_a",
        _dynamicFields: {
          condition: [
            {
              fullExpression: '@local.a_or_b === "a"',
              matchedExpression: "@local.a_or_b",
              type: "local",
              fieldName: "a_or_b",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.a_or_b": ["condition"],
        },
      },
      {
        type: "text",
        name: "text_b",
        value: "Template has been overridden",
        _translations: {
          value: {},
        },
        condition: '@local.a_or_b === "b"',
        _nested_name: "text_b",
        _dynamicFields: {
          condition: [
            {
              fullExpression: '@local.a_or_b === "b"',
              matchedExpression: "@local.a_or_b",
              type: "local",
              fieldName: "a_or_b",
            },
          ],
        },
        _dynamicDependencies: {
          "@local.a_or_b": ["condition"],
        },
      },
      {
        type: "template",
        name: "example_lang_select",
        value: "example_lang_select",
        rows: [],
        _nested_name: "example_lang_select",
      },
    ],
    _xlsxPath: "quality_assurance/example_templates/example_template_overrides.xlsx",
    _overrides: {
      example_override_es_sp: '@fields._app_language.startsWith("es")',
    },
  },
  {
    flow_type: "template",
    flow_name: "example_override_es_sp",
    status: "released",
    flow_subtype: "debug_override",
    override_target: "example_override_default",
    override_condition: '@fields._app_language.startsWith("es")',
    comments: "condition used to apply override to all es users (e.g. es_spa)",
    rows: [
      {
        type: "title",
        name: "title_1",
        value: "ES_SP Overridden Template",
        _translations: {
          value: {},
        },
        exclude_from_translation: true,
        _nested_name: "title_1",
      },
      {
        type: "template",
        name: "example_override_default",
        value: "example_override_default",
        exclude_from_translation: true,
        is_override_target: true,
        rows: [
          {
            name: "a_or_b",
            value: "b",
            _translations: {
              value: {},
            },
            type: "set_variable",
            _nested_name: "example_override_default.a_or_b",
          },
        ],
        _nested_name: "example_override_default",
      },
    ],
    _xlsxPath: "quality_assurance/example_templates/example_template_overrides.xlsx",
  },
];
export default template;
