/* eslint-disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const tour: FlowTypes.Tour[] = [
  {
    "flow_type": "tour",
    "flow_name": "intro_tour",
    "status": "released",
    "rows": [
      {
        "type": "step",
        "title": "Welcome to @global.parent_app",
        "message_text": "<p>Welcome to @global.parent_app.</p>\n\n<p>You deserve to feel good, and have happier family relationships.</p>\n\n<p>This app will support you and your family in three ways.</p>",
        "template_component_name": "home_screen",
        "route": "template/home_screen"
      },
      {
        "type": "step",
        "title": "@global.weekly_workshops",
        "message_text": "<p>This big button takes you to your @global.weekly_workshops </p>\n\n<p> Once per week a new workshop will be ready for you - every time focusing on a different a parenting skill. </p>",
        "template_component_name": "tile_weekly_workshops",
        "route": "template/home_screen"
      },
      {
        "type": "step",
        "title": "Set up your @global.weekly_workshops",
        "message_text": "<p>The round button appears whenever there is something ready for you to do.</p> \n\n<p>Click <img src=\"plh_images/icons/play_outline.svg\" width=\"30\" height=\"30\"> to tell us more about yourself, and choose when and how to do your @global.weekly_workshops  </p>",
        "template_component_name": "tile_weekly_workshops",
        "route": "template/home_screen"
      },
      {
        "type": "step",
        "title": "@global.parent_points",
        "message_text": "<p>This button takes you to the @global.parent_points </p>\n\n<p>See your success in self-care and parenting. </p>\n\n<p>Celebrate your daily achievements!</p>",
        "template_component_name": "tile_parent_points",
        "route": "template/home_screen"
      },
      {
        "type": "step",
        "title": "Do a relaxation activity",
        "message_text": "<p>The round button appears whenever there is something ready for you to do.</p> \n\n<p>Click <img src=\"plh_images/icons/smile_outline.svg\" width=\"30\" height=\"30\">  to try out a quick relaxation activity </p>",
        "template_component_name": "tile_parent_points",
        "route": "template/home_screen"
      },
      {
        "type": "step",
        "title": "@global.parent_centre",
        "message_text": "<p>This button takes you to the @global.parent_centre </p>\n\n<p>Stacked with the resources you need whenever you want. </p>\n\n<p>Instant access to help sections with @global.essential_tools for each skill, extra information and local resources.</p>",
        "template_component_name": "tile_parent_centre",
        "route": "template/home_screen"
      },
      {
        "type": "step",
        "title": "Customise your @global.parent_app",
        "message_text": "<p>The round button appears whenever there is something ready for you to do.</p> \n\n<p>Click <img src=\"plh_images/icons/letter_outline.svg\" width=\"30\" height=\"30\"> to customise your app experience </p>",
        "template_component_name": "tile_parent_centre",
        "route": "template/home_screen"
      },
      {
        "type": "step",
        "message_text": "<p>However you start, just the fact you are here shows you care.</p>",
        "route": "template/home_screen"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/tutorials/tour.xlsx"
  }
]