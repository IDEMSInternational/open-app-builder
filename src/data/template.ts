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
        "value": "fade_in_out",
        "rows": [
          {
            "type": "animated_section",
            "name": "welcome_section",
            "hidden": "@local.hide_intro",
            "comments": "animated section value represents the name of predefined animations. Hidden criteria will be evaluated as TRUE or FALSE.",
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
                "type": "display_group",
                "name": "nav_buttons",
                "comments": "Grouping content will display on same line",
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
            "type": "animated_section",
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
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "template_together_welcome",
    "status": "released",
    "rows": [
      {
        "name": "group_name",
        "value": "The group name",
        "comments": "If a variable will be used in multiple places it could be assigned at the start, or just written inline where requred."
      },
      {
        "name": "intro_nav_button_text",
        "value": "Next"
      },
      {
        "name": "outro_nav_button_text",
        "value": "Next 2"
      },
      {
        "type": "title",
        "name": "outer_title",
        "value": "Template Together Welcome"
      },
      {
        "type": "template_group",
        "value": "template_watch_together",
        "comments": "A template can call another template. All nested rows will override default values. Names are namespaced to a template so will not conflict between templates",
        "rows": [
          {
            "name": "theme_name",
            "value": "passive"
          },
          {
            "name": "button_1",
            "value": "@local.intro_nav_button_text"
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
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "multi_template",
    "status": "released",
    "rows": [
      {
        "name": "group_name",
        "value": "The group name",
        "comments": "If a variable will be used in multiple places it could be assigned at the start, or just written inline where requred."
      },
      {
        "name": "intro_nav_button_text",
        "value": "Next"
      },
      {
        "name": "outro_nav_button_text",
        "value": "Next 2"
      },
      {
        "type": "title",
        "name": "outer_title",
        "value": "Template Together Welcome"
      },
      {
        "type": "template_group",
        "name": "template_watch_together",
        "comments": "A template can call another template. All nested rows will override default values. Names are namespaced to a template so will not conflict between templates",
        "rows": [
          {
            "name": "theme_name",
            "value": "passive"
          },
          {
            "name": "button_1",
            "value": "@local.intro_nav_button_text"
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
        "type": "template_group",
        "name": "template_watch_together",
        "rows": [
          {
            "name": "theme_name",
            "value": "passive"
          },
          {
            "name": "button_1",
            "value": "@local.outro_nav_button_text"
          },
          {
            "name": "button_2",
            "value": "skip"
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
  },
  {
    "flow_type": "template",
    "flow_name": "workshop_activity",
    "status": "released",
    "rows": [
      {
        "name": "hide_intro",
        "value": false,
        "comments": "A workshop activity corresponds to a column in Figma. It typically consists of intro and content."
      },
      {
        "name": "hide_activity",
        "value": true
      },
      {
        "name": "hide_activity_banner",
        "value": true
      },
      {
        "name": "activity_image",
        "value": "src/assets/not-found-image.png"
      },
      {
        "name": "activity_title",
        "value": "Title of this section"
      },
      {
        "type": "display_theme",
        "name": "display_theme",
        "value": "passive_theme"
      },
      {
        "type": "animated_section",
        "name": "intro",
        "value": "fade_in_out",
        "hidden": "@local.hide_intro",
        "rows": [
          {
            "type": "image",
            "name": "intro_image",
            "value": "@local.activity_image"
          },
          {
            "type": "title",
            "name": "intro_title",
            "value": "@local.activity_title"
          },
          {
            "type": "text",
            "name": "intro_text"
          },
          {
            "type": "template",
            "name": "nav_buttons",
            "value": "buttons",
            "rows": [
              {
                "name": "button_completed",
                "action_list": [
                  "set_local | hide_intro | true",
                  "set_local | hide_activity | false"
                ]
              },
              {
                "name": "button_skipped",
                "hidden": "!@local._completed"
              }
            ]
          }
        ]
      },
      {
        "type": "animated_section",
        "name": "content",
        "hidden": "@local.hide_activity",
        "rows": [
          {
            "type": "display_group",
            "name": "activity_banner",
            "hidden": "@local.hide_activity_banner",
            "rows": [
              {
                "type": "title",
                "name": "banner_title",
                "value": "@local.activity_title"
              },
              {
                "type": "image",
                "name": "banner_image",
                "value": "@local.activity_image"
              }
            ]
          },
          {
            "type": "template",
            "name": "content_box",
            "action_list": [
              "respond_to_action | exit | mark_as_completed",
              "respond_to_action | exit | exit"
            ],
            "rows": []
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "test_wa_extend",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "value": "workshop_activity",
        "rows": [
          {
            "name": "activity_image",
            "value": "plh_images/menu_icons/menu_care_packages_icon.svg"
          },
          {
            "type": "nested_properties",
            "name": "intro",
            "rows": [
              {
                "type": "nested_properties",
                "name": "nav_buttons",
                "rows": [
                  {
                    "name": "button_completed",
                    "value": "Complete Override"
                  }
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
    "flow_name": "buttons",
    "status": "released",
    "rows": [
      {
        "type": "display_group",
        "rows": [
          {
            "type": "button",
            "name": "button_describe",
            "value": "Describe",
            "parameter_list": [
              "colour | secondary"
            ]
          },
          {
            "type": "button",
            "name": "button_completed",
            "value": "Next",
            "action_list": [
              "exit",
              "mark_as_completed"
            ]
          },
          {
            "type": "button",
            "name": "button_skipped",
            "value": "Skip",
            "action_list": [
              "exit",
              "mark_as_skipped"
            ]
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "a",
    "status": "released",
    "rows": [
      {
        "type": "title",
        "name": "a_title",
        "value": "Template A"
      },
      {
        "type": "template",
        "name": "buttons",
        "value": "buttons",
        "rows": [
          {
            "name": "button_completed",
            "value": "Next 2"
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "b",
    "status": "released",
    "rows": [
      {
        "type": "title",
        "name": "b_title",
        "value": "Template B"
      },
      {
        "type": "template",
        "value": "a",
        "rows": [
          {
            "name": "a_title",
            "value": "Template A Title Overridden"
          },
          {
            "type": "nested_properties",
            "name": "buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Next 3"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "button_example",
    "status": "released",
    "rows": [
      {
        "type": "button",
        "name": "button_1",
        "value": "Button 1"
      },
      {
        "type": "display_group",
        "rows": [
          {
            "type": "button",
            "name": "previous_button",
            "value": "Previous",
            "parameter_list": [
              "color: primary"
            ]
          },
          {
            "type": "button",
            "name": "next_button",
            "value": "Next",
            "parameter_list": [
              "color: secondary"
            ]
          }
        ]
      }
    ]
  }
]