/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const component_defaults: FlowTypes.Component_defaults[] = [
  {
    "flow_type": "component_defaults",
    "flow_name": "timer",
    "status": "released",
    "rows": [
      {
        "name": "title",
        "value": "Title"
      },
      {
        "name": "help",
        "value": "Help text for timer."
      },
      {
        "name": "duration",
        "value": 10
      },
      {
        "name": "duration_extension",
        "value": 1
      },
      {
        "type": "timer",
        "name": "timer",
        "parameter_list": [
          "title | @local.title",
          "duration_extension | @local.duration_extension",
          "help | @local.help",
          "duration | @local.duration"
        ]
      }
    ]
  }
]