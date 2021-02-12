/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const template: FlowTypes.Template[] = [
  {
    "flow_type": "template",
    "flow_name": "template_watch_together",
    "status": "released",
    "rows": [
      {
        "type": "set_variable",
        "name": "hide_intro",
        "value": false,
        "comments": "entries without type specified simply create a local variable. These can be referenced via @local syntax, e.g. @local.example_variable ",
        "__EMPTY": "All content will be hardcoded, so should not be changed without dev consult"
      },
      {
        "type": "set_variable",
        "name": "hide_activity",
        "value": true
      },
      {
        "type": "set_variable",
        "name": "theme_name",
        "value": "active"
      },
      {
        "type": "animated_section_group",
        "name": "welcome_section",
        "value": "fade_in_out",
        "hidden": "@local.hide_intro",
        "comments": "animated section value represents the name of predefined animations. Hidden criteria will be evaluated as TRUE or FALSE.",
        "rows": [
          {
            "type": "image",
            "name": "main_image",
            "value": "assets/plh_assets/plh_images/home_page/home_page_workshops.svg"
          },
          {
            "type": "title",
            "name": "main_title",
            "comments": "Blank values will assume an empty string"
          },
          {
            "type": "text",
            "name": "intro_text",
            "value": "This is the intro I guess? The value of a local varaible @local.hide_intro"
          },
          {
            "type": "display_group_group",
            "name": "nav_buttons",
            "comments": "Grouping content will display on same line",
            "rows": [
              {
                "type": "button",
                "name": "button_1",
                "value": "Next",
                "action_list": [
                  "set_value | hide_intro | true",
                  "set_value | hide_activity | false"
                ],
                "comments": "specific actions can be added to default click handlers where required. May require rethinking to know when to use triggered values vs initialized/formulae"
              },
              {
                "type": "button",
                "name": "button_2",
                "value": "Skip",
                "parameter_list": [
                  "color:secondary",
                  ""
                ],
                "comments": "additional parameters can be used where default functionality needs to be extended. (use sparingly)"
              }
            ]
          }
        ]
      },
      {
        "type": "animated_section_group",
        "name": "welcome_activity",
        "hidden": "@local.hide_activity",
        "rows": [
          {
            "type": "title",
            "name": "media_title"
          },
          {
            "type": "video",
            "name": "media_src",
            "value": "https://www.w3schools.com/html/mov_bbb.mp4"
          },
          {
            "type": "button",
            "name": "button_3",
            "value": "Continue"
          },
          {
            "type": "button",
            "name": "button_4",
            "value": "Back",
            "action_list": [
              "set_value | hide_intro | false",
              "set_value | hide_activity | true"
            ]
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "template_together_welcome",
    "status": "released",
    "rows": [
      {
        "type": "template_group",
        "name": "template_watch_together",
        "comments": "A template can call another template. All nested rows will override default values. Names are namespaced to a template so will not conflict between templates",
        "rows": [
          {
            "name": "theme_name",
            "value": "passive_theme"
          },
          {
            "name": "button_1",
            "value": "next slide"
          },
          {
            "name": "button_2",
            "value": "skip slide",
            "hidden": true,
            "comments": "Hidden condition will also evaluate function such as db lookup, e.g. @somevar=3"
          },
          {
            "name": "image_1",
            "value": "plh_images/characters/@fields.guidenumber/happy.svg"
          },
          {
            "name": "intro_text",
            "value": "Welcome @local.group_name!"
          }
        ]
      }
    ]
  }
]