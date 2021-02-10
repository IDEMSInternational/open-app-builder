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
        "value": true,
        "comments": "entries without type specified simply create a local variable. These can be referenced via @local syntax, e.g. @local.example_variable ",
        "__EMPTY": "All content will be hardcoded, so should not be changed without dev consult"
      },
      {
        "type": "set_variable",
        "name": "hide_activity",
        "value": false
      },
      {
        "type": "set_variable",
        "name": "theme_name",
        "value": "active"
      },
      {
        "type": "animated_section_group",
        "rows": [
          {
            "type": "image",
            "name": "main_image",
            "value": "src/assets/not-found-image.png"
          },
          {
            "type": "title",
            "name": "main_title",
            "comments": "Blank values will assume an empty string"
          },
          {
            "type": "text",
            "name": "intro_text"
          },
          {
            "type": "display_group_group",
            "rows": [
              {
                "type": "button",
                "name": "button_1",
                "value": "Next",
                "action_list": [
                  "set_value | show_intro | false",
                  "set_value | show_activity | true"
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
            ],
            "name": "nav_buttons"
          }
        ],
        "name": "welcome_section"
      },
      {
        "type": "animated_section_group",
        "rows": [
          {
            "type": "title",
            "name": "media_title"
          },
          {
            "type": "video",
            "name": "media_src"
          },
          {
            "type": "button",
            "name": "button_3",
            "value": "Continue"
          }
        ],
        "name": "welcome_activity"
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "template_together_welcome",
    "status": "released",
    "rows": [
      {
        "type": "set_variable",
        "name": "group_name",
        "value": "@fields.group_name",
        "comments": "If a variable will be used in multiple places it could be assigned at the start, or just written inline where requred."
      },
      {
        "type": "template_group",
        "rows": [
          {
            "name": "theme_name",
            "value": "passive_theme"
          },
          {
            "name": "button_1",
            "value": "next",
            "action_list": [
              "go_to | somewhere"
            ]
          },
          {
            "name": "button_2",
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
        ],
        "name": "template_watch_together"
      }
    ]
  }
]