/* eslint-disable */
import { FlowTypes } from "../../model/flowTypes";
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
        exclude_from_translation: true,
      },
      {
        type: "declare_global_constant",
        name: "some_global",
        value: "some_field",
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
        exclude_from_translation: true,
      },
      {
        type: "declare_field_default",
        name: "field_full_stop",
        value: "Field with a full stop",
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
        exclude_from_translation: true,
      },
      {
        type: "declare_global_constant",
        name: "debug_item_2",
        value: "Item 2 text",
        exclude_from_translation: true,
      },
      {
        type: "declare_global_constant",
        name: "debug_item_3",
        value: "Item 3 text",
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
        exclude_from_translation: true,
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx",
  },
];
export default global;
