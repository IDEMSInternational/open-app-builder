/* eslint-disable */
import { FlowTypes } from "../../model/flowTypes";
const tour: FlowTypes.Tour[] = [
  {
    flow_type: "tour",
    flow_name: "demo_essential_tools_tour",
    status: "released",
    rows: [
      {
        type: "step",
        title: "Essential Tools Overview",
        message_text:
          "<p>You can find all the  Essential Tools in the @global.parent_centre. This tutorial will show you how to do so.</p>",
        route: "template/demo_navigation",
        exclude_from_translation: true,
      },
      {
        type: "step",
        title: "Going to the Home Screen",
        message_text:
          "<p>You can get to the home screen by selecting ParentApp on the top bar.</p>",
        element: "body > app-root > ion-app > div > plh-main-header",
        route: "template/demo_navigation",
        exclude_from_translation: true,
      },
      {
        type: "step",
        title: "Accessing the @global.parent_centre",
        message_text: "<p>Select the @global.parent_centre tile.</p>",
        template_component_name: "tile_parent_centre",
        route: "home",
        exclude_from_translation: true,
      },
      {
        type: "step",
        title: "Accessing the Essential Tools",
        message_text: "<p>Select the Essential Tools tile to get to the full list of tools.</p>",
        template_component_name: "tile_essential_tools",
        route: "template/parent_centre",
        exclude_from_translation: true,
      },
      {
        type: "step",
        title: "Essential Tools List",
        message_text: "<p>You can find all the Essential Tools here.</p>",
        template_component_name: "parent_centre_essential_tools",
        route: "template/parent_centre_essential_tools",
        exclude_from_translation: true,
      },
      {
        type: "step",
        message_text:
          "<p>You can access the Essential tools in this way from anywhere in the app.</p>",
        template_component_name: "demo_navigation",
        route: "template/demo_navigation",
        exclude_from_translation: true,
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/demo_templates/demo_navigation.xlsx",
  },
  {
    flow_type: "tour",
    flow_name: "intro_tour",
    status: "released",
    rows: [
      {
        type: "step",
        title: "Welcome to @global.parent_app",
        message_text:
          "<p>Welcome to @global.parent_app.</p>\n\n<p>You deserve to feel good, and have happier family relationships.</p>\n\n<p>@global.parent_app will support you and your family in three ways:</p>",
        template_component_name: "home_screen",
        route: "template/home_screen",
      },
      {
        type: "step",
        title: "@global.weekly_workshops",
        message_text:
          "<p>This big button takes you to your @global.weekly_workshops </p>\n\n<p> Once per week a new workshop will be ready for you - every time focusing on a different a parenting skill. Press it to start your first workshop!</p>",
        template_component_name: "tile_weekly_workshops",
        route: "template/home_screen",
      },
      {
        type: "step",
        title: "@global.weekly_workshops quick start",
        message_text:
          "<p>The round button appears when a new @global.weekly_workshop is ready for you to do.</p> ",
        template_component_name: "tile_weekly_workshops",
        route: "template/home_screen",
      },
      {
        type: "step",
        title: "@global.parent_points",
        message_text:
          "<p>Press this big button to get you to your @global.parent_points screen.</p>\n\n<p>Track your success in self-care and parenting. </p>\n\n<p>See your progress.</p>\n\n<p>Celebrate your daily achievements!</p>",
        template_component_name: "tile_parent_points",
        route: "template/home_screen",
      },
      {
        type: "step",
        title: "@global.parent_centre",
        message_text:
          "<p>This button takes you to the @global.parent_centre </p>\n\n<p>Stacked with the resources you need whenever you want. </p>\n\n<p> Instant access to help sections with @global.essential_tools for each skill.</p>\r\n\n<p> Extra information and local resources.</p>",
        template_component_name: "tile_parent_centre",
        route: "template/home_screen",
      },
      {
        type: "step",
        message_text: "<p>However you start, just the fact you are here shows you care.</p>",
        route: "template/home_screen",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/tutorials/home_screen_tour.xlsx",
  },
  {
    flow_type: "tour",
    flow_name: "intro_tour_quickstart",
    status: "released",
    rows: [
      {
        type: "step",
        title: "Welcome to @global.parent_app",
        message_text:
          "<p>Welcome to @global.parent_app.</p>\n\n<p>You deserve to feel good, and have happier family relationships.</p>\n\n<p>@global.parent_app will support you and your family in three ways:</p>",
        template_component_name: "home_screen",
        route: "template/home_screen",
      },
      {
        type: "step",
        title: "@global.weekly_workshops",
        message_text:
          "<p>This big button takes you to your @global.weekly_workshops </p>\n\n<p> Once per week a new workshop will be ready for you - every time focusing on a different a parenting skill. Press it to start your first workshop!</p>",
        template_component_name: "tile_weekly_workshops",
        route: "template/home_screen",
      },
      {
        type: "step",
        title: "@global.weekly_workshops quick start",
        message_text:
          "<p>The round button appears when a new @global.weekly_workshop is ready for you to do.</p> ",
        template_component_name: "tile_weekly_workshops",
        route: "template/home_screen",
      },
      {
        type: "step",
        title: "@global.parent_points",
        message_text:
          "<p>Press this big button to get you to your @global.parent_points screen.</p>\n\n<p>Track your success in self-care and parenting. </p>\n\n<p>See your progress.</p>\n\n<p>Celebrate your daily achievements!</p>",
        template_component_name: "tile_parent_points",
        route: "template/home_screen",
      },
      {
        type: "step",
        title: "@global.parent_centre",
        message_text:
          "<p>This button takes you to the @global.parent_centre </p>\n\n<p>Stacked with the resources you need whenever you want. </p>\n\n<p> Instant access to help sections with @global.essential_tools for each skill.</p>\r\n\n<p> Extra information and local resources.</p>",
        template_component_name: "tile_parent_centre",
        route: "template/home_screen",
      },
      {
        type: "step",
        message_text: "<p>However you start, just the fact you are here shows you care.</p>",
        route: "template/home_screen",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/tutorials/home_screen_tour.xlsx",
  },
  {
    flow_type: "tour",
    flow_name: "weekly_workshop_options_tour",
    status: "released",
    rows: [
      {
        type: "step",
        title: "Go to the @global.weekly_workshops",
        message_text:
          "<p>Press this button on the home screen to go to the @global.weekly_workshops </p>",
        template_component_name: "tile_weekly_workshops",
        route: "template/home_screen",
      },
      {
        type: "step",
        title: "Go to the @global.weekly_workshop_options",
        message_text: "<p>Press this button to go to the @global.weekly_workshop_options </p> ",
        template_component_name: "options_button",
        route: "template/weekly_workshops",
      },
      {
        type: "step",
        title: "@global.weekly_workshop_options",
        message_text:
          "<p>Use the @global.weekly_workshop_options to change your workshop settings. </p>",
        route: "template/workshop_options_page",
      },
      {
        type: "step",
        message_text: "<p> You can change your name here. </p>",
        template_component_name: "text_box_1",
        route: "template/workshop_options_page",
      },
      {
        type: "step",
        message_text:
          "<p> This shows the day of the week that your new @global.weekly_workshop becomes available. </p>\n\n<p> If you want to change it, just press it. </p>",
        template_component_name: "combo_box_2",
        route: "template/workshop_options_page",
      },
      {
        type: "step",
        message_text: "<p> This shows the @global.weekly_workshop that you're currently on. </p>",
        template_component_name: "combo_box_3",
        route: "template/workshop_options_page",
      },
      {
        type: "step",
        message_text:
          "<p> You can change here whether you want to do your @global.weekly_workshops as a group or by yourself. </p>",
        template_component_name: "radio_group_4",
        route: "template/workshop_options_page",
      },
      {
        type: "step",
        message_text: "<p> Tap here to change your group name. </p>",
        template_component_name: "text_box_5",
        route: "template/workshop_options_page",
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/tutorials/weekly_workshops_tour.xlsx",
  },
];
export default tour;
