/* eslint-disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const component_defaults: FlowTypes.Component_defaults[] = [
  {
    "flow_type": "component_defaults",
    "flow_name": "timer",
    "status": "released",
    "rows": [
      {
        "parameter": "title",
        "default_value": "Title"
      },
      {
        "parameter": "help",
        "default_value": "Help text for timer."
      },
      {
        "parameter": "duration",
        "default_value": 10
      },
      {
        "parameter": "duration_extension",
        "default_value": 1
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\ver_7_design\\quality_assurance\\template_component_defaults.xlsx"
  }
]