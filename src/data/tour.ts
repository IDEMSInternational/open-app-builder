/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const tour: FlowTypes.Tour[] = [
  {
    "flow_type": "tour",
    "flow_name": "test_tour",
    "status": "released",
    "rows": [
      {
        "type": "step",
        "title": "Title 1",
        "message_text": "This is the text below the title",
        "route": "module_list"
      },
      {
        "type": "step",
        "title": "Title 2",
        "message_text": "This highlights an element",
        "element": "#main-content > plh-module-list > div > div > plh-module-focus-skin > div > div > div > ion-button",
        "route": "module_list"
      },
      {
        "type": "step",
        "title": "Title 3",
        "message_text": "Even more text",
        "route": "module_list"
      }
    ]
  }
]