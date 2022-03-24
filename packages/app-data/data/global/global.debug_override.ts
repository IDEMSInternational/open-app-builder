/* eslint-disable */
import { FlowTypes } from "data-models";
const global: FlowTypes.Global[] = [
  {
    flow_type: "global",
    flow_name: "example_glob_override_default",
    status: "released",
    flow_subtype: "debug_override",
    rows: [
      {
        type: "declare_global_constant",
        name: "example_glob_override",
        value: "Initial value",
        _translations: {
          value: {},
        },
        exclude_from_translation: true,
      },
    ],
    _xlsxPath: "quality_assurance/example_templates/example_overrides.xlsx",
  },
  {
    flow_type: "global",
    flow_name: "example_glob_override_es_sp",
    status: "released",
    flow_subtype: "debug_override",
    override_target: "example_glob_override_default",
    override_condition: '@fields._app_language.startsWith("es")',
    rows: [
      {
        type: "declare_global_constant",
        name: "example_glob_override",
        value: "Overridden value",
        _translations: {
          value: {},
        },
        exclude_from_translation: true,
      },
    ],
    _xlsxPath: "quality_assurance/example_templates/example_overrides.xlsx",
  },
];
export default global;
