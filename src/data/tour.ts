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
      },
      {
        "type": "step",
        "title": "Select a module",
        "message_text": "Click the modules side panel to select a module",
        "element": "#main-content > plh-module-list > div > div > plh-module-focus-skin > div > plh-slide-panel-right > section > h3",
        "route": "module_list"
      },
      {
        "type": "step",
        "title": "Then click on a module section",
        "message_text": "Click on one of the sections to continue the module",
        "element": "#main-content > plh-module-page > ion-content > div > div > plh-module-focus-skin > div > plh-module-page-flow-component:nth-child(3) > module-list-flow-step-group > div:nth-child(1) > module-list-flow-step-item > div > div.step-item-button",
        "route": "module_page/mod_welcome_page"
      }
    ]
  }
]