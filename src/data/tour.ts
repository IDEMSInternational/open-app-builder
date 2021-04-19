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
    "_xlsxPath": "plh_sheets_beta/plh_templating/tutorials/tour.xlsx"
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
        "template_component_name": "workshop_button_0",
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
      },
      {
        "type": "step",
        "title": "Settings",
        "message_text": "Come here to change your settings",
        "route": "settings"
      },
      {
        "type": "step",
        "title": "Workshop",
        "route": "template/w_self_care_stepper?nav_parent=w_self_care_buttons_temp&nav_parent_triggered_by=individual_button"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/tutorials/tour.xlsx"
  },
  {
    "flow_type": "tour",
    "flow_name": "intro_tour",
    "status": "released",
    "rows": [
      {
        "type": "step",
        "title": "Welcome to ParentApp",
        "message_text": "Welcome to ParentApp.\n\nYou Desreve to feel good, and have happier family relationships.\n\nThis app will support you with three major components",
        "template_component_name": "home_screen",
        "route": "template/home_screen"
      },
      {
        "type": "step",
        "title": "Weekly Workshops",
        "message_text": "This tile takes you to the weekly workshops. \n\nThese include key tools for self-care and parenting a teenager. \n\nYou can choose to do them by yourself or as a group with family or friends.",
        "template_component_name": "tile_weekly_workshops",
        "route": "template/home_screen"
      },
      {
        "type": "step",
        "title": "Parent Points",
        "message_text": "This tile takes you to the Parent points.\n\nSee your success in self-care and parenting. \n\nCelebrate your daily achievements!",
        "template_component_name": "tile_parent_points",
        "route": "template/home_screen"
      },
      {
        "type": "step",
        "title": "Parent Library",
        "message_text": "This tile takes you to the parent library.\n\nStacked with the resources you need whenever you want. \n\nInstant access to help sections with Essential Tools for each skill, extra information and local resources.",
        "template_component_name": "tile_parent_centre",
        "route": "template/home_screen"
      },
      {
        "type": "step",
        "title": "Quick Starts",
        "message_text": "These buttons appear when you have content to do. \n\nThis first message involves a task which asks you a few questions and customises your app experience.",
        "template_component_name": "quick_start_parent_centre",
        "route": "template/home_screen"
      },
      {
        "type": "step",
        "title": "Jump into a workshop",
        "message_text": "This quick start would jump you straight into a first workshop which is all about self-care.\n\nAs a parent looking after yourself is the basis of look after your family.",
        "template_component_name": "quick_start_weekly_workshops",
        "route": "template/home_screen"
      },
      {
        "type": "step",
        "title": "Set-up",
        "message_text": "Another good starting point is with the weekly workshop tile.\n\nPress it for the first time to set yourself up to do the workshops your way.\n\nHowever you start, just the fact you are here shows you care.",
        "template_component_name": "tile_weekly_workshops",
        "route": "template/home_screen"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/tutorials/tour.xlsx"
  }
]