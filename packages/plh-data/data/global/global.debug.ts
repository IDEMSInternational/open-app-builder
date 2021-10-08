/* eslint-disable */
import { FlowTypes } from "data-models";
const global: FlowTypes.Global[] = [
  {
    flow_type: "global",
    flow_subtype: "debug",
    flow_name: "debug_campaign_global",
    status: "released",
    rows: [
      {
        type: "declare_global_constant",
        name: "example_text",
        value: "example_text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
      },
      {
        type: "declare_global_constant",
        name: "some_global",
        value: "some_field",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_campaigns.xlsx",
  },
  {
    flow_type: "global",
    flow_name: "debug_full_stop_golbals",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "declare_global_constant",
        name: "global_full_stop",
        value: "Global with a full stop",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
      },
      {
        type: "declare_field_default",
        name: "field_full_stop",
        value: "Field with a full stop",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_full_stop_after_var.xlsx",
  },
  {
    flow_type: "global",
    flow_name: "debug_some_globals",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "declare_global_constant",
        name: "debug_item_1",
        value: "Item 1 text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
      },
      {
        type: "declare_global_constant",
        name: "debug_item_2",
        value: "Item 2 text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
      },
      {
        type: "declare_global_constant",
        name: "debug_item_3",
        value: "Item 3 text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_global.xlsx",
  },
  {
    flow_type: "global",
    flow_name: "debug_set_global_1",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "declare_global_constant",
        name: "debug_variable_1",
        value: "Value of the first debug variable",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
  {
    flow_type: "global",
    flow_name: "example_initialise_global",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "declare_global_constant",
        name: "example_global_constant_text",
        value: "Example Global Constant Text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
      },
      {
        type: "declare_global_constant",
        name: "example_global_constant_title",
        value: "Example Global Constant Title",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
      },
      {
        type: "declare_global_constant",
        name: "example_global_constant_image",
        value: "plh_images/habits/habit_relax_image.svg",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
      },
      {
        type: "declare_field_default",
        name: "field_1",
        value: "Value of Field 1",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
      },
      {
        type: "declare_field_default",
        name: "field_0",
        value: "Value of field 0",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
        exclude_from_translation: true,
      },
      {
        type: "declare_field_default",
        name: "field_4",
        value: true,
        exclude_from_translation: true,
      },
      {
        type: "declare_field_default",
        name: "field_5",
        value: 5,
        exclude_from_translation: true,
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_global_field.xlsx",
  },
  {
    flow_type: "global",
    flow_name: "example_lang_global",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        type: "declare_global_constant",
        name: "languge_global",
        value: "This is a global variable set in a global",
        _translations: {
          value: {
            spa: true,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
      },
      {
        type: "declare_field_default",
        name: "language_field_1",
        value: "This is a field set by default",
        _translations: {
          value: {
            spa: true,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
      },
      {
        type: "declare_field_default",
        name: "language_field_2",
        value: "@data.example_lang.example_lang_3.text",
        _translations: {
          value: {
            spa: false,
            tsa: false,
            xho: false,
            zul: false,
          },
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_languages.xlsx",
  },
];
export default global;
