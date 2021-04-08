/* eslint-disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const tour: FlowTypes.Tour[] = [
  {
    "flow_type": "tour",
    "flow_name": "test_tour",
    "status": "released",
    "rows": [
      {
        "type": "step",
        "title": "Weekly Workshops",
        "message_text": "Click this button to access the weekly workshops",
        "element": "#main-content > plh-home > ion-content > div > div:nth-child(1)",
        "route": "home"
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
    ],
    "_xlsxPath": "plh_sheets_beta/ver_7_design/support/tour.xlsx"
  },
  {
    "flow_type": "tour",
    "flow_name": "home_page_tour",
    "status": "released",
    "rows": [
      {
        "type": "step",
        "title": "Weekly Workshops",
        "message_text": "Click this button to access the weekly workshops",
        "element": "#main-content > plh-home > ion-content > div > div:nth-child(1)",
        "route": "home"
      },
      {
        "type": "step",
        "title": "Start a workshop",
        "message_text": "Click here to continue your last workshop",
        "element": "#main-content > plh-template-testing > ion-content > plh-template-container > div > plh-template-component:nth-child(2)",
        "route": "template/workshop_buttons_temp"
      },
      {
        "type": "step",
        "title": "Parent Points",
        "message_text": "Click here to view your parent points",
        "element": "#main-content > plh-home > ion-content > div > div:nth-child(2)",
        "route": "home"
      },
      {
        "type": "step",
        "title": "Parent Centre",
        "message_text": "Click here to view the parent centre",
        "element": "#main-content > plh-home > ion-content > div > div:nth-child(3)",
        "route": "home"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/ver_7_design/support/tour.xlsx"
  }
]