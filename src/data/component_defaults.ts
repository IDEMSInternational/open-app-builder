/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const component_defaults: FlowTypes.Component_defaults[] = [
  {
    "flow_type": "component_defaults",
    "flow_name": "nav_group",
    "status": "released",
    "rows": [
      {
        "parameter": "next_button_text",
        "default_value": "Next"
      },
      {
        "parameter": "back_button_text",
        "default_value": "Back"
      },
      {
        "parameter": "skip_button_text",
        "default_value": "Skip"
      },
      {
        "parameter": "finish_button_text",
        "default_value": "Finish"
      },
      {
        "parameter": "restart_button_text",
        "default_value": "Restart"
      },
      {
        "parameter": "show_skip_button",
        "default_value": false
      },
      {
        "parameter": "show_back_button",
        "default_value": true
      },
      {
        "parameter": "show_restart_button",
        "default_value": false
      }
    ]
  },
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
    ]
  }
]