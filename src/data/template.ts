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
        "type": "animated_section_group_group",
        "rows": [
          {
            "type": "animated_section_group",
            "rows": [
              {
                "type": "image",
                "name": "main_image",
                "value": "plh_images/workshops/welcome1.svg"
              },
              {
                "type": "title",
                "name": "main_title",
                "value": "Welcome family group! ",
                "comments": "Blank values will assume an empty string"
              },
              {
                "type": "text",
                "name": "intro_text",
                "value": "This week we will be exploring Positive Instructions. \n\nBefore we start the session, select a person with a smartphone to be the informal facilitator."
              },
              {
                "type": "display_group_group",
                "rows": [
                  {
                    "type": "button",
                    "name": "button_1",
                    "value": "Start Session",
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
        "value": "The group name",
        "comments": "If a variable will be used in multiple places it could be assigned at the start, or just written inline where requred."
      },
      {
        "type": "title",
        "name": "outer_title",
        "value": "Template Together Welcome"
      },
      {
        "type": "template_group_group",
        "rows": [
          {
            "name": "theme_name",
            "value": "passive"
          },
          {
            "name": "button_1",
            "value": "Next"
          },
          {
            "name": "button_2",
            "value": "skip",
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
      },
      {
        "type": "template_group_group",
        "rows": []
      }
    ]
  }
]