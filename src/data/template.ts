/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const template: FlowTypes.Template[] = [
  {
    "flow_type": "template",
    "flow_name": "box_tools",
    "status": "released",
    "rows": [
      {
        "type": "display_group",
        "rows": [
          {
            "type": "image",
            "name": "icon",
            "value": "plh_images/icons/star.svg",
            "comments": "placeholder"
          },
          {
            "type": "title",
            "name": "title",
            "value": "@global.essential_tools "
          },
          {
            "type": "title",
            "name": "tools_title"
          }
        ]
      },
      {
        "type": "template",
        "name": "tool_1",
        "value": "essential_tool",
        "rows": []
      },
      {
        "type": "template",
        "name": "tool_2",
        "value": "essential_tool",
        "rows": []
      },
      {
        "type": "template",
        "name": "tool_3",
        "value": "essential_tool",
        "rows": []
      },
      {
        "type": "template",
        "name": "tool_4",
        "value": "essential_tool",
        "hidden": "true",
        "rows": []
      },
      {
        "type": "template",
        "name": "tool_5",
        "value": "essential_tool",
        "hidden": "true",
        "rows": []
      },
      {
        "type": "text",
        "name": "bottom_text"
      },
      {
        "type": "text",
        "name": "tip_text",
        "value": "You can always find these tools in the @global.parent_centre ",
        "parameter_list": [
          "alert:true"
        ]
      },
      {
        "type": "template",
        "name": "nav_buttons",
        "value": "nav_buttons",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_essential_tools.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "essential_tool",
    "status": "released",
    "rows": [
      {
        "type": "title",
        "name": "title"
      },
      {
        "type": "subtitle",
        "name": "subtitle_1",
        "hidden": "true"
      },
      {
        "type": "text",
        "name": "text_1"
      },
      {
        "type": "subtitle",
        "name": "subtitle_2",
        "hidden": "true"
      },
      {
        "type": "text",
        "name": "text_2",
        "hidden": "true"
      },
      {
        "type": "image",
        "name": "image",
        "hidden": "true"
      },
      {
        "type": "button",
        "name": "button",
        "hidden": "true"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_essential_tools.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "workshop_buttons_temp",
    "status": "released",
    "rows": [
      {
        "type": "button",
        "name": "workshop_button_0",
        "value": "@global.w_self_care",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_self_care_stepper"
            ],
            "_raw": "click | go_to:w_self_care_stepper",
            "_cleaned": "click | go_to:w_self_care_stepper"
          }
        ]
      },
      {
        "type": "button",
        "name": "workshop_button_1",
        "value": "@global.w_1on1",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_1on1_stepper"
            ],
            "_raw": "click | go_to:w_1on1_stepper",
            "_cleaned": "click | go_to:w_1on1_stepper"
          }
        ]
      },
      {
        "type": "button",
        "name": "workshop_button_2",
        "value": "@global.w_praise",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_praise_stepper"
            ],
            "_raw": "click | go_to:w_praise_stepper",
            "_cleaned": "click | go_to:w_praise_stepper"
          }
        ]
      },
      {
        "type": "button",
        "name": "workshop_button_3",
        "value": "@global.w_instruct",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_instruct_stepper"
            ],
            "_raw": "click | go_to:w_instruct_stepper",
            "_cleaned": "click | go_to:w_instruct_stepper"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_navigation_temporary.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "widget_audio",
    "status": "released",
    "rows": [
      {
        "type": "display_group",
        "rows": [
          {
            "type": "title",
            "name": "title",
            "value": "Audio"
          }
        ]
      },
      {
        "type": "audio",
        "name": "audio_src",
        "value": "plh_audio/sample.mp3",
        "comments": "this will get more parameters"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_widgets.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "widget_video",
    "status": "released",
    "rows": [
      {
        "type": "display_group",
        "rows": [
          {
            "type": "title",
            "name": "title",
            "value": "Video",
            "comments": "For consistency with the other widgets, it would make sense if the title and help fit inside the widget frame."
          },
          {
            "name": "help",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "video",
        "name": "video_src",
        "value": "plh_video/lets_slow_down.mp4",
        "comments": "Needs option for full screen mode"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_widgets.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "widget_timer",
    "status": "released",
    "rows": [
      {
        "name": "duration",
        "value": 10,
        "comments": "default in minutes, can be set to seconds in parameter_list",
        "type": "set_variable"
      },
      {
        "name": "duration_extension",
        "value": 1,
        "type": "set_variable"
      },
      {
        "type": "display_group",
        "rows": [
          {
            "type": "title",
            "name": "title",
            "value": "Timer"
          },
          {
            "name": "help",
            "comments": "should be type: help\nIn case of text pop-up, use value. If launching something else, use action_list",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "timer",
        "name": "timer",
        "parameter_list": [
          "duration_extension:@local.duration_extension",
          "duration:@local.duration"
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_widgets.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "widget_slider",
    "status": "released",
    "rows": [
      {
        "name": "min_value",
        "value": 1,
        "type": "set_variable"
      },
      {
        "name": "max_value",
        "value": 10,
        "type": "set_variable"
      },
      {
        "name": "step",
        "value": 1,
        "type": "set_variable"
      },
      {
        "name": "min_text",
        "value": "Low",
        "type": "set_variable"
      },
      {
        "name": "max_text",
        "value": "High",
        "type": "set_variable"
      },
      {
        "name": "unit_text",
        "value": "units",
        "type": "set_variable"
      },
      {
        "name": "default_value",
        "value": "null",
        "type": "set_variable"
      },
      {
        "name": "_value",
        "value": "@local.default_value",
        "comments": "should be type: set_default",
        "type": "set_variable"
      },
      {
        "type": "slider",
        "name": "slider",
        "parameter_list": [
          "min:@local.min_value",
          "min_value_label:@local.min_text",
          "max:@local.max_value",
          "max_value_label:@local.max_text",
          "step:@local.step",
          "help: @local.help",
          "title: @local.title"
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_widgets.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "workshop_stepper",
    "status": "released",
    "rows": [
      {
        "name": "progress_bar_value",
        "type": "set_variable"
      },
      {
        "name": "progress_bar_num_items",
        "type": "set_variable"
      },
      {
        "name": "progress_bar",
        "value": "@local.progress_bar_value",
        "parameter_list": [
          "num_items:@local.progress_bar_num_items"
        ],
        "type": "set_variable"
      },
      {
        "type": "nav_group",
        "name": "nav_template_list"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshops.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "workshop_activity",
    "status": "released",
    "rows": [
      {
        "name": "activity_image_src",
        "value": "src/assets/not-found-image.png",
        "comments": "A workshop activity corresponds to a column in Figma. It typically consists of intro and content. It occasionally has an outro.",
        "type": "set_variable"
      },
      {
        "name": "activity_title",
        "value": "Title of this activity",
        "type": "set_variable"
      },
      {
        "name": "include_outro",
        "value": "false",
        "type": "set_variable"
      },
      {
        "name": "hide_intro",
        "value": "false",
        "type": "set_variable"
      },
      {
        "name": "hide_content",
        "value": "true",
        "type": "set_variable"
      },
      {
        "name": "hide_outro",
        "value": "true",
        "type": "set_variable"
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
            "name": "intro_image_src",
            "value": "@local.activity_image",
            "parameter_list": [
              "background_box"
            ]
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
            "name": "intro_nav_buttons",
            "value": "nav_buttons",
            "action_list": [
              {
                "trigger": "completed",
                "action_id": "set_local",
                "args": [
                  "hide_content",
                  "false"
                ],
                "_raw": "completed | set_local:hide_content:false",
                "_cleaned": "completed | set_local:hide_content:false"
              },
              {
                "trigger": "completed",
                "action_id": "set_local",
                "args": [
                  "hide_intro",
                  "true"
                ],
                "_raw": "completed | set_local:hide_intro:true",
                "_cleaned": "completed | set_local:hide_intro:true"
              },
              {
                "trigger": "uncompleted",
                "action_id": "emit",
                "args": [
                  "uncompleted"
                ],
                "_raw": "uncompleted | emit:uncompleted",
                "_cleaned": "uncompleted | emit:uncompleted"
              }
            ],
            "comments": "completed | set_local:hide_content:false; completed | set_local:hide_intro:true; uncompleted | emit:uncompleted ",
            "rows": [
              {
                "name": "button_uncompleted",
                "value": "Skip",
                "hidden": "!@local._completed",
                "comments": "default: set_properties\nuse extend_properties to add to an existing list of properties",
                "type": "set_variable"
              }
            ]
          }
        ]
      },
      {
        "type": "animated_section",
        "name": "content",
        "hidden": "@local.hide_content",
        "rows": [
          {
            "type": "display_group",
            "name": "activity_banner",
            "hidden": "true",
            "rows": [
              {
                "type": "title",
                "name": "banner_title",
                "value": "@local.activity_title"
              },
              {
                "type": "image",
                "name": "banner_image_src",
                "value": "@local.activity_image",
                "parameter_list": [
                  "background_box"
                ]
              }
            ]
          },
          {
            "type": "template",
            "name": "content_box",
            "action_list": [
              {
                "trigger": "completed",
                "action_id": "set_local",
                "args": [
                  "hide_content",
                  "true"
                ],
                "_raw": "completed | set_local:hide_content:true",
                "_cleaned": "completed | set_local:hide_content:true"
              },
              {
                "trigger": "completed",
                "action_id": "set_local",
                "args": [
                  "hide_outro",
                  "false"
                ],
                "_raw": "completed | set_local:hide_outro:false",
                "_cleaned": "completed | set_local:hide_outro:false"
              },
              {
                "trigger": "uncompleted",
                "action_id": "set_local",
                "args": [
                  "hide_intro",
                  "false"
                ],
                "_raw": "uncompleted | set_local:hide_intro:false",
                "_cleaned": "uncompleted | set_local:hide_intro:false"
              },
              {
                "trigger": "uncompleted",
                "action_id": "set_local",
                "args": [
                  "hide_content",
                  "true"
                ],
                "_raw": "uncompleted | set_local:hide_content:true",
                "_cleaned": "uncompleted | set_local:hide_content:true"
              }
            ],
            "hidden": "!@local.include_outro",
            "comments": "Do this row when include_outro = TRUE\n!@local.include_outro",
            "rows": []
          },
          {
            "type": "template",
            "name": "content_box",
            "action_list": [
              {
                "trigger": "completed",
                "action_id": "emit",
                "args": [
                  "completed"
                ],
                "_raw": "completed | emit:completed",
                "_cleaned": "completed | emit:completed"
              },
              {
                "trigger": "uncompleted",
                "action_id": "set_local",
                "args": [
                  "hide_intro",
                  "false"
                ],
                "_raw": "uncompleted | set_local:hide_intro:false",
                "_cleaned": "uncompleted | set_local:hide_intro:false"
              },
              {
                "trigger": "uncompleted",
                "action_id": "set_local",
                "args": [
                  "hide_content",
                  "true"
                ],
                "_raw": "uncompleted | set_local:hide_content:true",
                "_cleaned": "uncompleted | set_local:hide_content:true"
              }
            ],
            "hidden": "@local.include_outro",
            "comments": "Do this row when include_outro = FALSE\n@local.include_outro",
            "rows": []
          }
        ]
      },
      {
        "type": "animated_section",
        "name": "outro",
        "hidden": "@local.hide_outro",
        "rows": [
          {
            "type": "image",
            "name": "outro_image_src",
            "value": "@local.activity_image",
            "parameter_list": [
              "background_box"
            ]
          },
          {
            "type": "title",
            "name": "outro_title",
            "value": "@local.activity_title",
            "hidden": "true"
          },
          {
            "type": "text",
            "name": "outro_text"
          },
          {
            "type": "button",
            "name": "outro_button",
            "hidden": "true"
          },
          {
            "type": "text",
            "name": "outro_habit_text",
            "parameter_list": [
              "alert:plh_images/icons/star_circle.svg"
            ]
          },
          {
            "type": "template",
            "name": "outro_nav_buttons",
            "value": "nav_buttons",
            "action_list": [
              {
                "trigger": "completed",
                "action_id": "emit",
                "args": [
                  "completed"
                ],
                "_raw": "completed | emit:completed",
                "_cleaned": "completed | emit:completed"
              }
            ],
            "rows": []
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshops.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "nav_buttons",
    "status": "released",
    "rows": [
      {
        "type": "display_group",
        "rows": [
          {
            "type": "button",
            "name": "button_info",
            "value": "Describe",
            "hidden": "true",
            "parameter_list": [
              "colour:secondary"
            ]
          },
          {
            "type": "button",
            "name": "button_completed",
            "value": "Next",
            "action_list": [
              {
                "trigger": "click",
                "action_id": "emit",
                "args": [
                  "completed"
                ],
                "_raw": "click | emit:completed",
                "_cleaned": "click | emit:completed"
              }
            ]
          },
          {
            "type": "button",
            "name": "button_uncompleted",
            "value": "Back",
            "action_list": [
              {
                "trigger": "click",
                "action_id": "emit",
                "args": [
                  "uncompleted"
                ],
                "_raw": "click | emit:uncompleted",
                "_cleaned": "click | emit:uncompleted"
              }
            ],
            "hidden": "true"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshops.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "pair",
    "status": "released",
    "rows": [
      {
        "name": "hide_animated_section_1",
        "value": "false",
        "type": "set_variable"
      },
      {
        "name": "hide_animated_section_2",
        "value": "true",
        "type": "set_variable"
      },
      {
        "type": "animated_section",
        "name": "animated_section_1",
        "hidden": "@local.hide_animated_section_1",
        "rows": [
          {
            "type": "template",
            "name": "box_1",
            "action_list": [
              {
                "trigger": "completed",
                "action_id": "set_local",
                "args": [
                  "hide_animated_section_1",
                  "true"
                ],
                "_raw": "completed | set_local:hide_animated_section_1:true",
                "_cleaned": "completed | set_local:hide_animated_section_1:true"
              },
              {
                "trigger": "completed",
                "action_id": "set_local",
                "args": [
                  "hide_animated_section_2",
                  "false"
                ],
                "_raw": "completed | set_local:hide_animated_section_2:false",
                "_cleaned": "completed | set_local:hide_animated_section_2:false"
              },
              {
                "trigger": "uncompleted",
                "action_id": "emit",
                "args": [
                  "uncompleted"
                ],
                "_raw": "uncompleted | emit:uncompleted",
                "_cleaned": "uncompleted | emit:uncompleted"
              }
            ],
            "rows": []
          }
        ]
      },
      {
        "type": "animated_section",
        "name": "animated_section_2",
        "hidden": "@local.hide_animated_section_2",
        "rows": [
          {
            "type": "template",
            "name": "box_2",
            "action_list": [
              {
                "trigger": "completed",
                "action_id": "emit",
                "args": [
                  "completed"
                ],
                "_raw": "completed | emit:completed",
                "_cleaned": "completed | emit:completed"
              },
              {
                "trigger": "uncompleted",
                "action_id": "set_local",
                "args": [
                  "hide_animated_section_1",
                  "false"
                ],
                "_raw": "uncompleted | set_local:hide_animated_section_1:false",
                "_cleaned": "uncompleted | set_local:hide_animated_section_1:false"
              },
              {
                "trigger": "uncompleted",
                "action_id": "set_local",
                "args": [
                  "hide_animated_section_2",
                  "true"
                ],
                "_raw": "uncompleted  | set_local:hide_animated_section_2:true",
                "_cleaned": "uncompleted  | set_local:hide_animated_section_2:true"
              }
            ],
            "rows": []
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshops.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "box_video",
    "status": "released",
    "rows": [
      {
        "name": "video_src",
        "type": "set_variable"
      },
      {
        "name": "video_title",
        "value": "Video",
        "type": "set_variable"
      },
      {
        "name": "video_help",
        "type": "set_variable"
      },
      {
        "type": "template",
        "name": "widget_video",
        "value": "widget_video",
        "rows": [
          {
            "name": "video_src",
            "value": "plh_video/lets_slow_down.mp4",
            "type": "set_variable"
          },
          {
            "name": "title",
            "value": "@local.video_title",
            "type": "set_variable"
          },
          {
            "name": "help",
            "value": "@local.video_help",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "nav_buttons",
        "value": "nav_buttons",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshop_boxes.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "box_audio",
    "status": "released",
    "rows": [
      {
        "name": "audio_src",
        "value": "plh_audio/sample.mp3",
        "type": "set_variable"
      },
      {
        "name": "audio_title",
        "value": "Audio",
        "type": "set_variable"
      },
      {
        "name": "audio_help",
        "type": "set_variable"
      },
      {
        "type": "text",
        "name": "text"
      },
      {
        "type": "template",
        "name": "widget_audio",
        "value": "widget_audio",
        "rows": [
          {
            "name": "audio_src",
            "value": "@local.audio_src",
            "type": "set_variable"
          },
          {
            "name": "title",
            "value": "@local.audio_title",
            "type": "set_variable"
          },
          {
            "name": "help",
            "value": "@local.audio_help",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "nav_buttons",
        "value": "nav_buttons",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshop_boxes.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "box_image",
    "status": "released",
    "rows": [
      {
        "type": "image",
        "name": "image_src",
        "value": "plh_images/workshops/praise/read/slide_1.svg"
      },
      {
        "type": "text",
        "name": "text"
      },
      {
        "type": "text",
        "name": "habit_text",
        "hidden": "true",
        "parameter_list": [
          "alert:plh_images/icons/star_circle.svg"
        ]
      },
      {
        "type": "template",
        "name": "nav_buttons",
        "value": "nav_buttons",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshop_boxes.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "box_buttons",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text_1"
      },
      {
        "type": "button",
        "name": "button_1"
      },
      {
        "type": "text",
        "name": "text_2",
        "hidden": "true"
      },
      {
        "type": "button",
        "name": "button_2",
        "hidden": "true"
      },
      {
        "type": "text",
        "name": "text_3",
        "hidden": "true"
      },
      {
        "type": "button",
        "name": "button_3",
        "hidden": "true"
      },
      {
        "type": "text",
        "name": "habit_text",
        "parameter_list": [
          "alert:plh_images/icons/star_circle.svg"
        ]
      },
      {
        "type": "template",
        "name": "nav_buttons",
        "value": "nav_buttons",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshop_boxes.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "box_timer",
    "status": "released",
    "rows": [
      {
        "name": "timer_duration",
        "value": 10,
        "type": "set_variable"
      },
      {
        "name": "timer_duration_extension",
        "value": 2,
        "type": "set_variable"
      },
      {
        "name": "timer_title",
        "value": "Timer",
        "type": "set_variable"
      },
      {
        "name": "timer_help",
        "type": "set_variable"
      },
      {
        "type": "text",
        "name": "text"
      },
      {
        "type": "template",
        "name": "widget_timer",
        "value": "widget_timer",
        "rows": [
          {
            "name": "duration",
            "value": "@local.timer_duration",
            "type": "set_variable"
          },
          {
            "name": "duration_extension",
            "value": "@local.timer_duration_extension",
            "type": "set_variable"
          },
          {
            "value": "@local.timer_title",
            "type": "set_variable"
          },
          {
            "name": "title",
            "value": "@local.timer_help",
            "type": "set_variable"
          },
          {
            "name": "help",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "nav_buttons",
        "value": "nav_buttons",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "button_info",
            "value": "Further Instructions",
            "hidden": "true",
            "type": "set_variable"
          },
          {
            "name": "button_completed",
            "value": "Finish",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshop_boxes.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "tools_activity",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide_2/light_bulb.svg",
            "hidden": "@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/group/light_bulb.svg",
            "hidden": "!@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Essential Tools",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "These tools can help you remember what you've learnt this week.",
            "comments": "placeholder",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\essential_tools_activity.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "home_practice",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide_2/with_teen.svg",
            "hidden": "@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/group/with_teen.svg",
            "hidden": "!@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Home Practice",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "You could try and put some of what you've learnt in this workshop into practice this week!",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_banner",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "intro_nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Explain what to do",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "box_buttons",
            "rows": []
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\home_practice.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "listen",
    "status": "released",
    "rows": [
      {
        "name": "audio_src",
        "value": "plh_audio/sample.mp3",
        "type": "set_variable"
      },
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide_2/wave.svg",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Listen",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's listen to an audio!",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Listen Together",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's listen to an audio together!",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_banner",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "nav_buttons",
            "comments": "intro_nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Go to audio",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "box_audio",
            "rows": [
              {
                "name": "audio_src",
                "value": "@local.audio_src",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\listen.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "question_time",
    "status": "released",
    "rows": [
      {
        "name": "text_1",
        "type": "set_variable"
      },
      {
        "name": "question_text_1",
        "type": "set_variable"
      },
      {
        "name": "answer_list_1",
        "type": "set_variable"
      },
      {
        "name": "user_input_1",
        "type": "set_variable"
      },
      {
        "name": "reply_1",
        "type": "set_variable"
      },
      {
        "name": "text_2",
        "type": "set_variable"
      },
      {
        "name": "question_text_2",
        "type": "set_variable"
      },
      {
        "name": "answer_list_2",
        "type": "set_variable"
      },
      {
        "name": "user_input_2",
        "type": "set_variable"
      },
      {
        "name": "reply_2",
        "type": "set_variable"
      },
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "activity_title",
            "value": "Question Time",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide_2/notes.svg",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "It's time for some questions!",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_banner",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "intro_nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Go to questions",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "box_duo_combo_box",
            "rows": [
              {
                "type": "nested_properties",
                "name": "combo_box_1",
                "rows": [
                  {
                    "name": "text",
                    "value": "@local.text_1",
                    "type": "set_variable"
                  },
                  {
                    "name": "question_text",
                    "value": "@local.question_text_1",
                    "parameter_list": [
                      "\"\""
                    ],
                    "type": "set_variable"
                  },
                  {
                    "name": "answer_list",
                    "value": "@local.answer_list_1",
                    "type": "set_variable"
                  },
                  {
                    "name": "user_input",
                    "value": "@local.user_input_1",
                    "type": "set_variable"
                  },
                  {
                    "name": "reply",
                    "value": "@local.reply_1",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "type": "nested_properties",
                "name": "combo_box_2",
                "rows": [
                  {
                    "name": "text",
                    "value": "@local.text_2",
                    "type": "set_variable"
                  },
                  {
                    "name": "question_text",
                    "value": "@local.question_text_2",
                    "parameter_list": [
                      "\"\""
                    ],
                    "type": "set_variable"
                  },
                  {
                    "name": "answer_list",
                    "value": "@local.answer_list_2",
                    "type": "set_variable"
                  },
                  {
                    "name": "user_input",
                    "value": "@local.user_input_2",
                    "type": "set_variable"
                  },
                  {
                    "name": "reply",
                    "value": "@local.reply_2",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\question_time.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "read",
    "status": "released",
    "rows": [
      {
        "name": "number_of_slides",
        "value": 3,
        "type": "set_variable"
      },
      {
        "name": "slide_text_1",
        "type": "set_variable"
      },
      {
        "name": "slide_text_2",
        "type": "set_variable"
      },
      {
        "name": "slide_text_3",
        "type": "set_variable"
      },
      {
        "name": "slide_text_4",
        "type": "set_variable"
      },
      {
        "name": "slide_text_5",
        "type": "set_variable"
      },
      {
        "name": "slide_text_6",
        "type": "set_variable"
      },
      {
        "name": "slide_text_7",
        "type": "set_variable"
      },
      {
        "name": "slide_text_8",
        "type": "set_variable"
      },
      {
        "name": "slide_image_src_1",
        "type": "set_variable"
      },
      {
        "name": "slide_image_src_2",
        "type": "set_variable"
      },
      {
        "name": "slide_image_src_3",
        "type": "set_variable"
      },
      {
        "name": "slide_image_src_4",
        "type": "set_variable"
      },
      {
        "name": "slide_image_src_5",
        "type": "set_variable"
      },
      {
        "name": "slide_image_src_6",
        "type": "set_variable"
      },
      {
        "name": "slide_image_src_7",
        "type": "set_variable"
      },
      {
        "name": "slide_image_src_8",
        "type": "set_variable"
      },
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide_2/read.svg",
            "hidden": "@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Read",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's read a story!",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/group/read.svg",
            "hidden": "!@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Read Together",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's read a story together!",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "intro_nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Start story",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "box_image",
            "hidden": "@local.number_of_slides = 1",
            "rows": [
              {
                "name": "image_src",
                "value": "@local.slide_image_src_1",
                "type": "set_variable"
              },
              {
                "name": "text",
                "value": "@local.slide_text_1",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "pair",
            "hidden": "@local.number_of_slides > 1",
            "rows": [
              {
                "type": "nested_properties",
                "name": "box_1",
                "value": "box_image",
                "rows": [
                  {
                    "name": "image_src",
                    "value": "@local.slide_image_src_1",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "@local.slide_text_1",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "type": "nested_properties",
                "name": "box_2",
                "value": "box_image",
                "hidden": "@local.number_of_slides = 2",
                "rows": [
                  {
                    "name": "image_src",
                    "value": "@local.slide_image_src_2",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "@local.slide_text_2",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "type": "nested_properties",
                "name": "box_2",
                "value": "pair",
                "hidden": "@local.number_of_slides > 2",
                "rows": [
                  {
                    "type": "nested_properties",
                    "name": "box_1",
                    "value": "box_image",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "@local.slide_image_src_2",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@local.slide_text_2",
                        "type": "set_variable"
                      }
                    ]
                  },
                  {
                    "type": "nested_properties",
                    "name": "box_2",
                    "value": "box_image",
                    "hidden": "@local.number_of_slides = 3",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "@local.slide_image_src_3",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@local.slide_text_3",
                        "type": "set_variable"
                      }
                    ]
                  },
                  {
                    "type": "nested_properties",
                    "name": "box_2",
                    "value": "pair",
                    "hidden": "@local.number_of_slides > 3",
                    "rows": [
                      {
                        "type": "nested_properties",
                        "name": "box_1",
                        "value": "box_image",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "@local.slide_image_src_3",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@local.slide_text_3",
                            "type": "set_variable"
                          }
                        ]
                      },
                      {
                        "type": "nested_properties",
                        "name": "box_2",
                        "value": "box_image",
                        "hidden": "@local.number_of_slides = 4",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "@local.slide_image_src_4",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@local.slide_text_4",
                            "type": "set_variable"
                          }
                        ]
                      },
                      {
                        "type": "nested_properties",
                        "name": "box_2",
                        "value": "pair",
                        "hidden": "@local.number_of_slides > 4",
                        "rows": [
                          {
                            "type": "nested_properties",
                            "name": "box_1",
                            "value": "box_image",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "@local.slide_image_src_4",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@local.slide_text_4",
                                "type": "set_variable"
                              }
                            ]
                          },
                          {
                            "type": "nested_properties",
                            "name": "box_2",
                            "value": "box_image",
                            "hidden": "@local.number_of_slides = 5",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "@local.slide_image_src_5",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@local.slide_text_5",
                                "type": "set_variable"
                              }
                            ]
                          },
                          {
                            "type": "nested_properties",
                            "name": "box_2",
                            "value": "pair",
                            "hidden": "@local.number_of_slides > 5",
                            "rows": [
                              {
                                "type": "nested_properties",
                                "name": "box_1",
                                "value": "box_image",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "@local.slide_image_src_5",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "@local.slide_text_5",
                                    "type": "set_variable"
                                  }
                                ]
                              },
                              {
                                "type": "nested_properties",
                                "name": "box_2",
                                "value": "box_image",
                                "hidden": "@local.number_of_slides = 6",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "@local.slide_image_src_6",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "@local.slide_text_6",
                                    "type": "set_variable"
                                  }
                                ]
                              },
                              {
                                "type": "nested_properties",
                                "name": "box_2",
                                "value": "pair",
                                "hidden": "@local.number_of_slides > 6",
                                "rows": [
                                  {
                                    "type": "nested_properties",
                                    "name": "box_1",
                                    "value": "box_image",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "@local.slide_image_src_6",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "@local.slide_text_6",
                                        "type": "set_variable"
                                      }
                                    ]
                                  },
                                  {
                                    "type": "nested_properties",
                                    "name": "box_2",
                                    "value": "box_image",
                                    "hidden": "@local.number_of_slides = 7",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "@local.slide_image_src_7",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "@local.slide_text_7",
                                        "type": "set_variable"
                                      }
                                    ]
                                  },
                                  {
                                    "type": "nested_properties",
                                    "name": "box_2",
                                    "value": "pair",
                                    "hidden": "@local.number_of_slides > 7",
                                    "rows": [
                                      {
                                        "type": "nested_properties",
                                        "name": "box_1",
                                        "value": "box_image",
                                        "rows": [
                                          {
                                            "name": "image_src",
                                            "value": "@local.slide_image_src_7",
                                            "type": "set_variable"
                                          },
                                          {
                                            "name": "text",
                                            "value": "@local.slide_text_7",
                                            "type": "set_variable"
                                          }
                                        ]
                                      },
                                      {
                                        "type": "nested_properties",
                                        "name": "box_2",
                                        "value": "box_image",
                                        "hidden": "@local.number_of_slides = 8",
                                        "rows": [
                                          {
                                            "name": "image_src",
                                            "value": "@local.slide_image_src_8",
                                            "type": "set_variable"
                                          },
                                          {
                                            "name": "text",
                                            "value": "@local.slide_text_8",
                                            "type": "set_variable"
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\read.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "read_temp",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide_2/read.svg",
            "hidden": "@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Read",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's read a story!",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/group/read.svg",
            "hidden": "!@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Read Together",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's read a story together!",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "intro_nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Start story",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\read.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "think",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "read",
        "value": "read",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "activity_image",
                "value": "plh_images/workshop_modes/guide2/happy.svg",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "activity_title",
                "value": "Think",
                "hidden": "@field.do_workshops_together",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "It's time to think!",
                "hidden": "@field.do_workshops_together",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "activity_title",
                "value": "Think Together",
                "hidden": "!@field.do_workshops_together",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "It's time to think together!",
                "hidden": "!@field.do_workshops_together",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "intro_nav_buttons",
                "rows": [
                  {
                    "name": "button_completed",
                    "value": "Start",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\read.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "think_temp",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide2/happy.svg",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Think",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "It's time to think!",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Think Together",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "It's time to think together!",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "intro_nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Start",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\read.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "learn",
    "status": "released",
    "rows": [
      {
        "name": "number_of_slides",
        "value": 3,
        "type": "set_variable"
      },
      {
        "name": "slide_text_1",
        "type": "set_variable"
      },
      {
        "name": "slide_text_2",
        "type": "set_variable"
      },
      {
        "name": "slide_text_3",
        "type": "set_variable"
      },
      {
        "name": "slide_text_4",
        "type": "set_variable"
      },
      {
        "name": "slide_text_5",
        "type": "set_variable"
      },
      {
        "name": "slide_text_6",
        "type": "set_variable"
      },
      {
        "name": "slide_text_7",
        "type": "set_variable"
      },
      {
        "name": "slide_text_8",
        "type": "set_variable"
      },
      {
        "name": "slide_habit_text_1",
        "type": "set_variable"
      },
      {
        "name": "slide_habit_text_2",
        "type": "set_variable"
      },
      {
        "name": "slide_habit_text_3",
        "type": "set_variable"
      },
      {
        "name": "slide_habit_text_4",
        "type": "set_variable"
      },
      {
        "name": "slide_habit_text_5",
        "type": "set_variable"
      },
      {
        "name": "slide_habit_text_6",
        "type": "set_variable"
      },
      {
        "name": "slide_habit_text_7",
        "type": "set_variable"
      },
      {
        "name": "slide_habit_text_8",
        "type": "set_variable"
      },
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide2/writing.svg",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Learn",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "It's time to learn and practice!",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Learn Together",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "It's time to learn and practice together!",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_banner",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "box_image",
            "hidden": "@local.number_of_slides = 1",
            "rows": [
              {
                "name": "text",
                "value": "@local.slide_text_1",
                "type": "set_variable"
              },
              {
                "name": "habit_text",
                "value": "@local.slide_habit_text_1",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "pair",
            "hidden": "@local.number_of_slides > 1",
            "rows": [
              {
                "type": "nested_properties",
                "name": "box_1",
                "value": "box_image",
                "rows": [
                  {
                    "name": "text",
                    "value": "@local.slide_text_1",
                    "type": "set_variable"
                  },
                  {
                    "name": "habit_text",
                    "value": "@local.slide_habit_text_1",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "type": "nested_properties",
                "name": "box_2",
                "value": "box_image",
                "hidden": "@local.number_of_slides = 2",
                "rows": [
                  {
                    "name": "text",
                    "value": "@local.slide_text_2",
                    "type": "set_variable"
                  },
                  {
                    "name": "habit_text",
                    "value": "@local.slide_habit_text_2",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "type": "nested_properties",
                "name": "box_2",
                "value": "pair",
                "hidden": "@local.number_of_slides > 2",
                "rows": [
                  {
                    "type": "nested_properties",
                    "name": "box_1",
                    "value": "box_image",
                    "rows": [
                      {
                        "name": "text",
                        "value": "@local.slide_text_2",
                        "type": "set_variable"
                      },
                      {
                        "name": "habit_text",
                        "value": "@local.slide_habit_text_2",
                        "type": "set_variable"
                      }
                    ]
                  },
                  {
                    "type": "nested_properties",
                    "name": "box_2",
                    "value": "box_image",
                    "hidden": "@local.number_of_slides = 3",
                    "rows": [
                      {
                        "name": "text",
                        "value": "@local.slide_text_3",
                        "type": "set_variable"
                      },
                      {
                        "name": "habit_text",
                        "value": "@local.slide_habit_text_3",
                        "type": "set_variable"
                      }
                    ]
                  },
                  {
                    "type": "nested_properties",
                    "name": "box_2",
                    "value": "pair",
                    "hidden": "@local.number_of_slides > 3",
                    "rows": [
                      {
                        "type": "nested_properties",
                        "name": "box_1",
                        "value": "box_image",
                        "rows": [
                          {
                            "name": "habit_text",
                            "value": "@local.slide_habit_text_3",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@local.slide_text_3",
                            "type": "set_variable"
                          }
                        ]
                      },
                      {
                        "type": "nested_properties",
                        "name": "box_2",
                        "value": "box_image",
                        "hidden": "@local.number_of_slides = 4",
                        "rows": [
                          {
                            "name": "text",
                            "value": "@local.slide_text_4",
                            "type": "set_variable"
                          },
                          {
                            "name": "habit_text",
                            "value": "@local.slide_habit_text_4",
                            "type": "set_variable"
                          }
                        ]
                      },
                      {
                        "type": "nested_properties",
                        "name": "box_2",
                        "value": "pair",
                        "hidden": "@local.number_of_slides > 4",
                        "rows": [
                          {
                            "type": "nested_properties",
                            "name": "box_1",
                            "value": "box_image",
                            "rows": [
                              {
                                "name": "text",
                                "value": "@local.slide_text_4",
                                "type": "set_variable"
                              },
                              {
                                "name": "habit_text",
                                "value": "@local.slide_habit_text_4",
                                "type": "set_variable"
                              }
                            ]
                          },
                          {
                            "type": "nested_properties",
                            "name": "box_2",
                            "value": "box_image",
                            "hidden": "@local.number_of_slides = 5",
                            "rows": [
                              {
                                "name": "text",
                                "value": "@local.slide_text_5",
                                "type": "set_variable"
                              },
                              {
                                "name": "habit_text",
                                "value": "@local.slide_habit_text_5",
                                "type": "set_variable"
                              }
                            ]
                          },
                          {
                            "type": "nested_properties",
                            "name": "box_2",
                            "value": "pair",
                            "hidden": "@local.number_of_slides > 5",
                            "rows": [
                              {
                                "type": "nested_properties",
                                "name": "box_1",
                                "value": "box_image",
                                "rows": [
                                  {
                                    "name": "text",
                                    "value": "@local.slide_text_5",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "habit_text",
                                    "value": "@local.slide_habit_text_5",
                                    "type": "set_variable"
                                  }
                                ]
                              },
                              {
                                "type": "nested_properties",
                                "name": "box_2",
                                "value": "box_image",
                                "hidden": "@local.number_of_slides = 6",
                                "rows": [
                                  {
                                    "name": "text",
                                    "value": "@local.slide_text_6",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "habit_text",
                                    "value": "@local.slide_habit_text_6",
                                    "type": "set_variable"
                                  }
                                ]
                              },
                              {
                                "type": "nested_properties",
                                "name": "box_2",
                                "value": "pair",
                                "hidden": "@local.number_of_slides > 6",
                                "rows": [
                                  {
                                    "type": "nested_properties",
                                    "name": "box_1",
                                    "value": "box_image",
                                    "rows": [
                                      {
                                        "name": "text",
                                        "value": "@local.slide_text_6",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "habit_text",
                                        "value": "@local.slide_habit_text_6",
                                        "type": "set_variable"
                                      }
                                    ]
                                  },
                                  {
                                    "type": "nested_properties",
                                    "name": "box_2",
                                    "value": "box_image",
                                    "hidden": "@local.number_of_slides = 7",
                                    "rows": [
                                      {
                                        "name": "text",
                                        "value": "@local.slide_text_7",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "habit_text",
                                        "value": "@local.slide_habit_text_7",
                                        "type": "set_variable"
                                      }
                                    ]
                                  },
                                  {
                                    "type": "nested_properties",
                                    "name": "box_2",
                                    "value": "pair",
                                    "hidden": "@local.number_of_slides > 7",
                                    "rows": [
                                      {
                                        "type": "nested_properties",
                                        "name": "box_1",
                                        "value": "box_image",
                                        "rows": [
                                          {
                                            "name": "text",
                                            "value": "@local.slide_text_7",
                                            "type": "set_variable"
                                          },
                                          {
                                            "name": "habit_text",
                                            "value": "@local.slide_habit_text_7",
                                            "type": "set_variable"
                                          }
                                        ]
                                      },
                                      {
                                        "type": "nested_properties",
                                        "name": "box_2",
                                        "value": "box_image",
                                        "hidden": "@local.number_of_slides = 8",
                                        "rows": [
                                          {
                                            "name": "text",
                                            "value": "@local.slide_text_8",
                                            "type": "set_variable"
                                          },
                                          {
                                            "name": "habit_text",
                                            "value": "@local.slide_habit_text_8",
                                            "type": "set_variable"
                                          }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\read.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "learn_temp",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide2/writing.svg",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Learn",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "It's time to learn and practice!",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Learn Together",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "It's time to learn and practice together!",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_banner",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "intro_nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Start",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\read.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "relax",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "include_outro",
            "value": "true",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide_2/relax.svg",
            "hidden": "@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Relax",
            "hidden": "@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's calm down.",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/group/relax.svg",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Relax Together",
            "hidden": "!@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's calm down together.",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Start relax",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "button_skipped",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "box_audio",
            "rows": [
              {
                "type": "nested_properties",
                "name": "nav_buttons",
                "rows": [
                  {
                    "name": "button_info",
                    "value": "Read instructions",
                    "hidden": "false",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_completed",
                    "value": "Finish relax",
                    "comments": "placeholder",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          },
          {
            "name": "outro_title",
            "hidden": "true",
            "type": "set_variable"
          },
          {
            "name": "outro_text",
            "value": "You are a star! \n\nToday, also remember to RECOGNISE something you have done well, and REWARD yourself with something that makes you happy. You matter.",
            "type": "set_variable"
          },
          {
            "name": "outro_habit_text",
            "value": "Every time you do a relax, mark your @global.parent_point to track your success.",
            "hidden": "false",
            "comments": "needs star icon attached",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\relax.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "talk_together",
    "status": "released",
    "rows": [
      {
        "name": "discussion_text",
        "type": "set_variable"
      },
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "activity_title",
            "value": "Talk Together",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/group/talk.svg",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Time for a group discussion!",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_banner",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "intro_nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Start discussion",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "box_timer",
            "rows": [
              {
                "name": "text",
                "value": "@local.discussion_text",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "nav_buttons",
                "rows": [
                  {
                    "name": "button_info",
                    "value": "Ideas",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_completed",
                    "value": "Finish discussion",
                    "comments": "placeholder",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\talk_together.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "review_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "activity_title",
            "value": "Review Together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/group/talk.svg",
            "type": "set_variable"
          },
          {
            "name": "intro_title",
            "value": "Home Practice Problem-Solving",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's talk about how your home practice went last week.",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_banner",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "name": "include_outro",
            "value": "true",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "intro_nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Start discussion",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "pair",
            "rows": [
              {
                "type": "nested_properties",
                "name": "box_1",
                "value": "box_timer",
                "rows": [
                  {
                    "name": "text",
                    "value": "Each person say how this week’s home practice was for them. What went well? What was difficult? Remember to encourage and praise each other for trying!",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "type": "nested_properties",
                "name": "box_2",
                "value": "box_timer",
                "rows": [
                  {
                    "name": "text",
                    "value": "We often have challenges with home practice. Let’s support each other! Think together about possible ways of solving each other’s challenges. It is so good to share problems and help each other as a team.",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          },
          {
            "name": "outro_text",
            "value": "You can use the top challenges and solutions that parents have.",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "outro_button",
            "value": "Challenges and solutions",
            "hidden": "false",
            "comments": "placeholder",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\talk_together.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "care_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "activity_title",
            "value": "Care Together",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/group/talk.svg",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's start with caring for you.",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_banner",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "intro_nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Start",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "box_timer",
            "rows": [
              {
                "name": "text",
                "value": "Can each of you say how you are feeling today? \n\nEach of you think of one thing that every person in your group has done well this week, and praise them for it.  ",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "nav_buttons",
                "rows": [
                  {
                    "name": "button_completed",
                    "value": "Finish",
                    "comments": "placeholder",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\talk_together.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "watch",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide_2/wave.svg",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Watch",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's watch a video!",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Watch Together",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's watch a video together!",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "intro_nav_buttons",
            "comments": "intro_nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Show video",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "box_video",
            "rows": [
              {
                "name": "video_help",
                "value": "override value",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\welcome.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "welcome_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "watch",
        "value": "watch",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "activity_title",
                "value": "Welcome @field.group_name",
                "type": "set_variable"
              },
              {
                "name": "activity_image",
                "value": "plh_images/workshop_modes/guide_2/wave.svg",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "It's great to see you again! ",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "intro_nav_buttons",
                "rows": [
                  {
                    "name": "button_uncompleted",
                    "hidden": "false",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_completed",
                    "value": "Start song",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "video_title",
                    "value": "Let's Slow Down",
                    "type": "set_variable"
                  },
                  {
                    "name": "video_src",
                    "value": "plh_video/lets_slow_down.mp4",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\welcome.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "ending",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "watch",
        "value": "watch",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "activity_title",
                "value": "You've finished!",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "activity_image",
                "value": "plh_images/workshop_modes/guide_2/cup.svg",
                "hidden": "@field.do_workshops_together",
                "type": "set_variable"
              },
              {
                "name": "activity_image",
                "value": "plh_images/workshop_modes/group/cup.svg",
                "hidden": "!@field.do_workshops_together",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Well done for completing this week's workshop! See you next week! ",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "nav_buttons_1",
                "rows": [
                  {
                    "name": "button_completed",
                    "value": "Finish with song",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_skipped",
                    "value": "Skip song",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "video_title",
                    "value": "Let's Slow Down",
                    "type": "set_variable"
                  },
                  {
                    "name": "video_src",
                    "value": "plh_video/lets_slow_down.mp4",
                    "type": "set_variable"
                  },
                  {
                    "type": "nested_properties",
                    "name": "nav_buttons",
                    "rows": [
                      {
                        "name": "button_completed",
                        "value": "Finish",
                        "type": "set_variable"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\mode_templates\\welcome.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_nesting_variables",
    "status": "released",
    "rows": [
      {
        "type": "set_local",
        "name": "var_text_2",
        "value": "This is text_2"
      },
      {
        "type": "set_local",
        "name": "var_text_4",
        "value": "This is text_4"
      },
      {
        "type": "template",
        "name": "debug_two_texts",
        "value": "debug_two_texts",
        "rows": [
          {
            "name": "text_1",
            "value": "This is text_1 overridden directly in the value",
            "type": "set_variable"
          },
          {
            "name": "text_2",
            "value": "@local.var_text_2 overridden by calling a variable",
            "comments": "@local.var_text_2 is not printed",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "text",
        "name": "text_3",
        "value": "This is text_3 written directly in the value"
      },
      {
        "type": "text",
        "name": "text_4",
        "value": "@local.var_text_4 calling a variable"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_nesting_variables.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_two_texts",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text_1",
        "value": "Text 1"
      },
      {
        "type": "text",
        "name": "text_2",
        "value": "Text 2"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_nesting_variables.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_nesting_variables_global",
    "status": "released",
    "rows": [
      {
        "type": "set_local",
        "name": "var_text_2",
        "value": "This is text_2"
      },
      {
        "type": "set_local",
        "name": "var_text_4",
        "value": "This is text_4"
      },
      {
        "type": "template",
        "name": "debug_two_texts",
        "value": "debug_two_texts",
        "rows": [
          {
            "name": "text_1",
            "value": "This is text_1 overridden directly in the value",
            "type": "set_variable"
          },
          {
            "name": "text_2",
            "value": "@global.teen_girl_1 overridden by calling a variable",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "text",
        "name": "text_3",
        "value": "This is text_3 written directly in the value"
      },
      {
        "type": "text",
        "name": "text_4",
        "value": "@local.var_text_4 calling a variable"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_nesting_variables.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_video_1",
    "status": "released",
    "rows": [
      {
        "type": "video",
        "name": "video_src",
        "value": "plh_video/lets_slow_down.mp4"
      },
      {
        "type": "video",
        "name": "video_src",
        "value": "https://www.w3schools.com/html/mov_bbb.mp4"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_timer_icons_1",
    "status": "released",
    "rows": [
      {
        "type": "timer",
        "name": "timer",
        "parameter_list": [
          "duration_extension:1",
          "duration:10"
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_negation",
    "status": "released",
    "rows": [
      {
        "name": "var_true",
        "value": "true",
        "type": "set_variable"
      },
      {
        "name": "var_false",
        "value": "false",
        "type": "set_variable"
      },
      {
        "type": "text",
        "name": "true_true",
        "value": "Variable true  (this text is hidden)",
        "hidden": "@local.var_true"
      },
      {
        "type": "text",
        "name": "true_false",
        "value": "Variable true Hidden negated (this text is visible)",
        "hidden": "!@local.var_true"
      },
      {
        "type": "text",
        "name": "false_true",
        "value": "Variable false (this text is visible)",
        "hidden": "@local.var_false"
      },
      {
        "type": "text",
        "name": "false_false",
        "value": "Variable false Hidden negated (this text is hidden)",
        "hidden": "!@local.var_false"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_set_local",
    "status": "released",
    "rows": [
      {
        "name": "debug_variable_one",
        "value": "Value of the first debug variable.",
        "type": "set_variable"
      },
      {
        "name": "debug_variable_two",
        "value": "Value of the second debug variable",
        "type": "set_variable"
      },
      {
        "name": "debug_variable_3",
        "value": "Value of the third debug variable",
        "type": "set_variable"
      },
      {
        "type": "set_local",
        "name": "debug_variable_four",
        "value": "Value of the fourth debug variable"
      },
      {
        "name": "debug_variable_five",
        "value": "Value of the fifth debug variable",
        "type": "set_variable"
      },
      {
        "type": "text",
        "name": "debug_text_1",
        "value": "Text that includes @local.debug_variable_one"
      },
      {
        "type": "text",
        "name": "debug_text_2",
        "value": "Text that includes @local.debug_variable_two"
      },
      {
        "type": "text",
        "name": "debug_text_3",
        "value": "Text that includes @local.debug_variable_3"
      },
      {
        "type": "text",
        "name": "debug_text_4",
        "value": "Text that includes @local.debug_variable_four"
      },
      {
        "type": "text",
        "name": "debug_text_5",
        "value": "Text that includes @local.debug_variable-five"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_set_local_image",
    "status": "released",
    "rows": [
      {
        "type": "set_local",
        "name": "debug_variable",
        "value": "plh_images/workshop_modes/guide_2/wave.svg"
      },
      {
        "type": "image",
        "name": "direct_image",
        "value": "plh_images/workshop_modes/guide_2/wave.svg"
      },
      {
        "type": "text",
        "name": "text",
        "value": "Text below the direct image and above the variable image."
      },
      {
        "type": "image",
        "name": "variable_image",
        "value": "plh_images/workshop_modes/guide_2/wave.svg"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_set_global_2",
    "status": "released",
    "rows": [
      {
        "type": "title",
        "name": "title",
        "value": "@global.debug_variable_1"
      },
      {
        "type": "text",
        "name": "text",
        "value": "Text that includes @global.debug_variable_1"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_set_field_1",
    "status": "released",
    "rows": [
      {
        "type": "set_field",
        "name": "variable",
        "value": "Value of the field"
      },
      {
        "type": "text",
        "name": "text_1",
        "value": "Field value is @field.variable",
        "comments": "Before we switched to templating, this used to be @fields -- but I don't see why it should be plural"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_set_field_2",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text_1",
        "value": "Field value is @field.variable"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_hidden_text",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text_1",
        "value": "Placeholder Text to create separation"
      },
      {
        "type": "text",
        "name": "text_2",
        "comments": "This is text_2 which should be hidden since the value (row??) is blank"
      },
      {
        "type": "text",
        "name": "text_3",
        "value": "Placeholder Text to create separation"
      },
      {
        "type": "text",
        "name": "text_4",
        "value": "This is text_4 which should be hidden as we set hidden to true",
        "hidden": "true"
      },
      {
        "type": "text",
        "name": "text_5",
        "value": "Placeholder Text to create separation"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_hidden_buttons",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text_1",
        "value": "Placeholder Text to create separation"
      },
      {
        "type": "button",
        "name": "button_1",
        "comments": "This is button_1 which should be hidden since the value is blank"
      },
      {
        "type": "text",
        "name": "text_2",
        "value": "Placeholder Text to create separation.."
      },
      {
        "type": "text",
        "name": "button_2",
        "value": "Hidden Button",
        "hidden": "true"
      },
      {
        "type": "text",
        "name": "text_3",
        "value": "Placeholder Text to create separation"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_audio_1",
    "status": "released",
    "rows": [
      {
        "type": "audio",
        "name": "audio_src",
        "value": "plh_audio/sample.mp3"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_evaluate_hidden",
    "status": "released",
    "rows": [
      {
        "name": "var_true",
        "value": "true",
        "type": "set_variable"
      },
      {
        "name": "var_number_1",
        "value": 1,
        "type": "set_variable"
      },
      {
        "type": "text",
        "name": "true_true",
        "value": "This text is hidden if var_true is true.",
        "hidden": "@local.var_true"
      },
      {
        "type": "text",
        "name": "true_false",
        "value": "This text is hidden if var_true is false.",
        "hidden": "!@local.var_true"
      },
      {
        "type": "text",
        "name": "number_1",
        "value": "This text is hidden if var_number_1 is 1.",
        "hidden": "@local.var_number_1=1"
      },
      {
        "type": "text",
        "name": "number_not_1",
        "value": "This text is hidden if var_number_1 not 1.",
        "hidden": "!@local.var_number_1=1"
      },
      {
        "type": "text",
        "name": "number_greater_1",
        "value": "This text is hidden if var_number_1 is greater than 1.",
        "hidden": "@local.var_number_1>1"
      },
      {
        "type": "text",
        "name": "number_not_1",
        "value": "This text is hidden if var_number_1 is not greater than 1.",
        "hidden": "!@local.var_number_1>1"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_text_paragraphs",
    "status": "released",
    "rows": [
      {
        "type": "title",
        "name": "title",
        "value": "Two paragraphs of text"
      },
      {
        "type": "text",
        "name": "text",
        "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_go_to_1",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text",
        "value": "This template demonstates 4 types of go-to buttons. \n\nWrite x for the template example_emit.",
        "comments": "A template is finished if it emits something, this can be completed or uncompleted."
      },
      {
        "type": "button",
        "name": "button_go_to_1",
        "value": "Go to x and come back",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "example_emit"
            ],
            "_raw": "click | go_to:example_emit",
            "_cleaned": "click | go_to:example_emit"
          }
        ],
        "comments": "This returns to the current template after finishing example_emit"
      },
      {
        "type": "button",
        "name": "button_go_to_2",
        "value": "Go to x and don't come  back",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "example_emit"
            ],
            "_raw": "click | go_to:example_emit",
            "_cleaned": "click | go_to:example_emit"
          },
          {
            "trigger": "click",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "click | emit:completed",
            "_cleaned": "click | emit:completed"
          }
        ],
        "comments": "This does not return to the current template after finishing example_emit"
      },
      {
        "type": "button",
        "name": "button_go_to_3",
        "value": "Go to x and come back if x uncompleted",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "example_emit"
            ],
            "_raw": "click | go_to:example_emit",
            "_cleaned": "click | go_to:example_emit"
          },
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "comments": "This returns to the current template and completes the current template if it returns completed or does nothing if example_emit emits uncompleted",
        "cc_comments": "how does the action imply the comment? If we are overriding default actions in the template need a better syntax to specify"
      },
      {
        "type": "button",
        "name": "button_go_to_4",
        "value": "Go to x and come back if x completed",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "example_emit"
            ],
            "_raw": "click | go_to:example_emit",
            "_cleaned": "click | go_to:example_emit"
          },
          {
            "trigger": "uncompleted",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "uncompleted | emit:completed",
            "_cleaned": "uncompleted | emit:completed"
          }
        ],
        "comments": "This returns to the current template IF AND ONLY IF example_emit emits completed"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_actions.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_emit",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text",
        "value": "This is the example emit template."
      },
      {
        "type": "button",
        "name": "button_completed",
        "value": "Emit completed",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "click | emit:completed",
            "_cleaned": "click | emit:completed"
          }
        ]
      },
      {
        "type": "button",
        "name": "button_uncompleted",
        "value": "Emit uncompleted",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "emit",
            "args": [
              "uncompleted"
            ],
            "_raw": "click | emit:uncompleted",
            "_cleaned": "click | emit:uncompleted"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_actions.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_pop_ups",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text",
        "value": "This is the main template demonstrating three types of pop-ups."
      },
      {
        "type": "button",
        "name": "button_pop_up_1",
        "value": "Simple text pop-up",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "example_text"
            ],
            "_raw": "click | pop_up:example_text",
            "_cleaned": "click | pop_up:example_text"
          }
        ],
        "comments": "This launches a simple pop-up (without buttons)"
      },
      {
        "type": "button",
        "name": "button_pop_up_2",
        "value": "Pop-up with go-to buttons that return",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "example_go_to_2"
            ],
            "_raw": "click | pop_up:example_go_to_2",
            "_cleaned": "click | pop_up:example_go_to_2"
          }
        ],
        "comments": "This launches a pop-up with a go-to button. When the destination template emits something (completed or uncompleted),  it comes back to the pop-up or to the main template."
      },
      {
        "type": "button",
        "name": "button_pop_up_3",
        "value": "Pop-up with go-to buttons that don't return",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "pop_up",
            "args": [
              "example_go_to_3"
            ],
            "_raw": "click | pop_up:example_go_to_3",
            "_cleaned": "click | pop_up:example_go_to_3"
          },
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "comments": "This launches a pop-up with a go-to button. This does not return if you click the go-to button but does if you close."
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_actions.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_text",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text",
        "value": "This is the example text template."
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_actions.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_go_to_2",
    "status": "released",
    "rows": [
      {
        "type": "button",
        "name": "button_go_to_1",
        "value": "Go to example_emit and come back to this pop-up",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "example_emit"
            ],
            "_raw": "click | go_to: example_emit",
            "_cleaned": "click | go_to: example_emit"
          }
        ],
        "comments": "This returns to the current template after finishing example_emit"
      },
      {
        "type": "button",
        "name": "button_go_to_2",
        "value": "Go to example_emit and come back to the main template",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "example_emit"
            ],
            "_raw": "click | go_to:example_emit",
            "_cleaned": "click | go_to:example_emit"
          },
          {
            "trigger": "click",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "click | emit:completed",
            "_cleaned": "click | emit:completed"
          }
        ],
        "comments": "This does not return to the current template after finishing example_emit"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_actions.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_go_to_3",
    "status": "released",
    "rows": [
      {
        "type": "button",
        "name": "button_go_to",
        "value": "Go to example_emit and don't come back",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "example_emit"
            ],
            "_raw": "click | go_to:example_emit",
            "_cleaned": "click | go_to:example_emit"
          },
          {
            "trigger": "click",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "click | emit:completed",
            "_cleaned": "click | emit:completed"
          }
        ],
        "comments": "This does not return to the current template after finishing example_emit"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_actions.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_call_global_constants",
    "status": "released",
    "rows": [
      {
        "type": "title",
        "name": "title",
        "value": "@global.example_global_constant_title"
      },
      {
        "type": "text",
        "name": "text_1",
        "value": "Text that includes @global.example_global_constant_text"
      },
      {
        "type": "image",
        "name": "image_src",
        "value": "@global.example_global_constant_image"
      },
      {
        "type": "text",
        "name": "text_2",
        "value": "There should be an image above this text, whose source is example_global_image"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_global_field.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_set_fields_in_action",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text_0",
        "value": "The value of field_0 is @field.field_0"
      },
      {
        "type": "button",
        "name": "button_1",
        "value": "Override field_1",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "field_1",
              "\"New value of Field 1\""
            ],
            "_raw": "click | set_field:field_1:\"New value of Field 1\"",
            "_cleaned": "click | set_field:field_1:\"New value of Field 1\""
          }
        ],
        "comments": "Overrides the value of field_1"
      },
      {
        "type": "text",
        "name": "text_1",
        "value": "The value of field_1 is @field.field_1"
      },
      {
        "type": "button",
        "name": "button_2",
        "value": "Create field_2",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "field_2",
              "\"Value of Field 2\""
            ],
            "_raw": "click | set_field:field_2:\"Value of Field 2\"",
            "_cleaned": "click | set_field:field_2:\"Value of Field 2\""
          }
        ],
        "comments": "Creates a new field called field_2 with value Value of Field 2"
      },
      {
        "type": "text",
        "name": "text_2",
        "value": "The value of field_2 is @field.field_2",
        "comments": "this text would be The value of field_2 is 'undefined' so presumably an empty string or even @field.field_2? until the button is pressed in which case it would change to The value of field_2 is Value of Field 2"
      },
      {
        "type": "text",
        "name": "text_hidden_4",
        "value": "This should be hidden when field_4 is TRUE",
        "hidden": "@field.field_4",
        "comments": "There could be more complex conditions for shown ie @filed.field_4>3)"
      },
      {
        "type": "text",
        "name": "text_not_hidden_4",
        "value": "This should be hidden when field_4 is FALSE",
        "hidden": "!@field.field_4"
      },
      {
        "type": "text",
        "name": "text_hidden_5",
        "value": "This should be hidden when field_5 is more than 2",
        "hidden": "@field.field_5>2",
        "comments": "Not currently implemented?"
      },
      {
        "type": "text",
        "name": "text_not_hidden_5_a",
        "value": "This should be hidden when field_5 is less than or equal to 2",
        "hidden": "@field.field_5<=2",
        "comments": "Not currently implemented?"
      },
      {
        "type": "text",
        "name": "text_not_hidden_5_b",
        "value": "This should be hidden when field_5 is less than or equal to 2",
        "hidden": "!@field.field_5>2",
        "comments": "Not currently implemented?"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_global_field.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_stepper",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_stepper_together",
        "value": "workshop_stepper",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "hidden": "!@field.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_example_welcome_together;\nw_example_listen; w_example_read;\nw_example_talk_together; w_example_tools_activity;\nw_example_home_practice;\nw_example_ending",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "workshop_stepper_individual",
        "value": "workshop_stepper",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "hidden": "true",
        "comments": "@field.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_example_listen",
            "comments": "w_example_listen;\nw_example_read;\nw_example_question_time;\nw_example_tools_activity;\nw_example_home_practice;\nw_example_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_workshop.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_welcome_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "welcome_together",
        "value": "welcome_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "watch",
            "rows": [
              {
                "type": "nested_properties",
                "name": "workshop_activity",
                "rows": [
                  {
                    "name": "intro_text",
                    "value": "This is the introduction text of the welcome together.",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_workshop.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_listen",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "listen",
        "value": "listen",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "audio_src",
            "value": "plh_audio/sample.mp3",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_workshop.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_read",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "read",
        "value": "read",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "number_of_slides",
            "value": 3,
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_1",
            "value": "plh_images/modules/mod_instruct/thought_experiment/te_1.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_1",
            "value": "This is the text on the first slide.",
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_2",
            "value": "plh_images/modules/mod_instruct/thought_experiment/te_2.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_2",
            "value": "This is the text on the second slide.",
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_3",
            "value": "plh_images/modules/mod_instruct/thought_experiment/te_3.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_3",
            "value": "This is the text on the third slide.",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_workshop.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_talk_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "talk_together",
        "value": "talk_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "discussion_text",
            "value": "This text describes what should be discussed.",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_workshop.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_tools",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "box_tools",
        "value": "box_tools",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "title",
            "name": "tools_title",
            "value": "Example Workshop"
          },
          {
            "type": "nested_properties",
            "name": "tool_1",
            "rows": [
              {
                "name": "title",
                "value": "First tool",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Text describing the first tool.",
                "type": "set_variable"
              },
              {
                "name": "button",
                "value": "Button",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_2",
            "rows": [
              {
                "name": "title",
                "value": "Second tool",
                "type": "set_variable"
              },
              {
                "name": "subtitle_1",
                "value": "Subtitle 1",
                "hidden": "false",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Some text.",
                "type": "set_variable"
              },
              {
                "name": "subtitle_2",
                "value": "Subtitle 2",
                "hidden": "false",
                "type": "set_variable"
              },
              {
                "name": "text_2",
                "value": "More text.",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_3",
            "rows": [
              {
                "name": "title",
                "value": "Third tool",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Text describing the third tool.",
                "type": "set_variable"
              },
              {
                "name": "image",
                "value": "plh_images/modules/mod_instruct/thought_experiment/te_1.svg",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_workshop.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_tools_activity",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "tools_activity",
        "value": "tools_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "w_example_tools",
                "rows": []
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_workshop.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_home_practice",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "home_practice",
        "value": "home_practice",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text_1",
                    "value": "First bit of text. The next button takes you to the story.",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "Pop-up button",
                    "action_list": [
                      {
                        "trigger": "click",
                        "action_id": "pop_up",
                        "args": [
                          "w_example_pop-up"
                        ],
                        "_raw": "click | pop_up:w_example_pop-up",
                        "_cleaned": "click | pop_up:w_example_pop-up"
                      }
                    ],
                    "hidden": "false",
                    "type": "set_variable"
                  },
                  {
                    "name": "text_2",
                    "value": "Second bit of text. The button below takes you to the audio activity.",
                    "hidden": "false",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_2",
                    "value": "Button 2",
                    "action_list": [
                      {
                        "trigger": "click",
                        "action_id": "go_to",
                        "args": [
                          "w_example_listen"
                        ],
                        "_raw": "click | go_to:w_example_listen",
                        "_cleaned": "click | go_to:w_example_listen"
                      }
                    ],
                    "hidden": "false",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_workshop.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_ending",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "ending",
        "value": "ending",
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\quality_assurance\\example_templates\\example_workshop.xlsx"
  },
  {
    "flow_type": "template",
    "module": "1on1",
    "flow_name": "w_1on1_stepper",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_stepper_together",
        "value": "workshop_stepper",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "hidden": "!@field.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_1on1_welcome_together;\nw_1on1_care_together; \nw_1on1_relax; \nw_1on1_intro; \nw_1on1_talk;\nw_1on1_tools_activity;  \nw_1on1_home_practice; \nw_1on1_ending",
            "comments": "w_1on1_welcome_together;\nw_1on1_care_together; \nw_1on1_relax; \nw_1on1_intro; \nw_1on1_talk;\nw_1on1_tools_activity;  \nw_1on1_home_practice; \nw_1on1_ending;",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "workshop_stepper_individual",
        "value": "workshop_stepper",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "hidden": "true",
        "comments": "@field.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_1on1_relax; w_1on1_intro",
            "comments": "w_1on1_welcome_individual; w_1on1_care_together; w_1on1_relax; w_1on1_intro; w_1on1_think; w_1on1_tools_activity;  w_1on1_home_practice; w_1on1_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "1on1",
    "flow_name": "w_1on1_welcome_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "welcome_together",
        "value": "welcome_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "1on1",
    "flow_name": "w_1on1_care_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "care_together",
        "value": "care_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "1on1",
    "flow_name": "w_1on1_relax",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "relax",
        "value": "relax",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "We’re proud of you. Let’s do a 30 second relax together now.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "1on1",
    "flow_name": "w_1on1_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "listen",
        "value": "listen",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "audio_src",
            "value": "plh_audio/sample.mp3",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "activity_title",
                "value": "Why @global.w_1on1?",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "This week is about spending one-on-one time with your teen.",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Being a parent can be so hard. Sometimes it feels like our children never listen to us.\n\nBut science shows that spending just a few minutes each day of focused one-on-one time with your teen helps build trust and love.\n\nIt’s a time when you focus on them, without TV or phones. Let them lead what you do or talk about.",
                    "comments": "placeholder",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "1on1",
    "flow_name": "w_1on1_talk",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "talk_together",
        "value": "talk_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "include_outro",
                "value": "true",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Talk together about ways to spend one-on-one time with your teen.\n\nFeel like you have NO TIME and you are exhausted? Remember to also think of ways that don't take up extra time.",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "type": "nested_properties",
                    "name": "nav_buttons",
                    "rows": [
                      {
                        "name": "button_info",
                        "value": "Examples",
                        "hidden": "false",
                        "comments": "Walking to the shops\nGet water together \nDoing a chore together \nPrepare dinner \nEat breakfast/lunch/dinner \nHave tea after school \nWatch a T.V. show  \nReview homework \nChat before bedtime \nPlay a game/sport ",
                        "type": "set_variable"
                      },
                      {
                        "name": "button_completed",
                        "value": "Finish",
                        "comments": "placeholder",
                        "type": "set_variable"
                      }
                    ]
                  }
                ]
              },
              {
                "name": "outro_text",
                "value": "It may not have instant results, but it will make a difference over the long term. You are an amazing parent for trying this.",
                "type": "set_variable"
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you do one-on-one time, mark your @global.parent_point to track your success",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "1on1",
    "flow_name": "w_1on1_think",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "think",
        "value": "think_temp",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "include_outro",
                "value": "true",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Let's think about what activities you could do for one-on-one time.",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "box_image",
                "rows": [
                  {
                    "name": "image_src",
                    "value": "plh_images/workshops/instruct/guide_2/think/slide_1.svg",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "Think of ways to spend one-on-one time with your teen.\n\nFeel like you have NO TIME and you are exhausted? Remember to also think of ways that don't take up extra time.",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "type": "nested_properties",
                    "name": "nav_buttons",
                    "rows": [
                      {
                        "name": "button_info",
                        "value": "Examples",
                        "hidden": "false",
                        "comments": "Same list as in w_1on1_talk",
                        "type": "set_variable"
                      }
                    ]
                  }
                ]
              },
              {
                "name": "outro_text",
                "value": "It may not have instant results, but it will make a difference over the long term. You are an amazing parent for trying this.",
                "type": "set_variable"
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you do one-on-one time, mark your @global.parent_point to track your success",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "1on1",
    "flow_name": "w_1on1_tools",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "box_tools",
        "value": "box_tools",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "title",
            "name": "tools_title",
            "value": "@global.w_1on1"
          },
          {
            "type": "nested_properties",
            "name": "tool_1",
            "rows": [
              {
                "name": "title",
                "value": "DAY",
                "type": "set_variable"
              },
              {
                "name": "subtitle_1",
                "value": "Try to do it every day",
                "hidden": "false",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Find 5 minutes (or more!) each day when your teen does not have something else they want to do. .",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_2",
            "rows": [
              {
                "name": "title",
                "value": "PLAY",
                "type": "set_variable"
              },
              {
                "name": "subtitle_1",
                "value": "Let your teen choose",
                "hidden": "false",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Tell your teen that you would like to spend some time with them and that they can choose what to do or talk about. They might think this is weird at first, but will come to enjoy this time with you!",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_3",
            "rows": [
              {
                "name": "title",
                "value": "STAY",
                "type": "set_variable"
              },
              {
                "name": "subtitle_1",
                "value": "Focus on your teen",
                "hidden": "false",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Switch off TV and put aside phones. Look at your teen. Nod or say “I see” to show you are really paying attention. Accept what they say without judging them.",
                "type": "set_variable"
              }
            ]
          },
          {
            "name": "bottom_text",
            "value": "One-on-one time with your teen can be fun for you, too! It might even make you feel less stressed.",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "1on1",
    "flow_name": "w_1on1_tools_activity",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "tools_activity",
        "value": "tools_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "w_1on1_tools",
                "rows": []
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "1on1",
    "flow_name": "w_1on1_home_practice",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "home_practice",
        "value": "home_practice",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text_1",
                    "value": "This week, can you try 5 minutes of one-on-one time with your teen every day that you can?",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "Examples",
                    "comments": "Same examples as in w_1on1_talk",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_2",
                    "value": "Essential Tools",
                    "type": "set_variable"
                  },
                  {
                    "name": "habit_text",
                    "value": "Every time you do one-on-one time, mark your @global.parent_point to track your success",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "1on1",
    "flow_name": "w_1on1_ending",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "ending",
        "value": "ending",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_stepper",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_stepper",
        "value": "workshop_stepper",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "hidden": "!@field.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_instruct_welcome_together; w_instruct_care_together; w_instruct_relax; w_instruct_review_together; w_instruct_intro; w_instruct_think_1; w_instruct_read_1; w_instruct_talk_1; w_instruct_read_2; w_instruct_talk_2; w_instruct_tools_activity; w_instruct_talk_3; w_instruct_home_practice; w_instruct_ending",
            "comments": "w_instruct_welcome_together; w_instruct_care_together; w_instruct_review_together; w_instruct_relax; w_instruct_intro; w_instruct_think_1; w_instruct_read_1; w_instruct_talk_1; w_instruct_read_2; w_instruct_talk_2; w_instruct_tools_activity; w_instruct_talk_3; w_instruct_home_practice; w_instruct_ending",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "workshop_stepper",
        "value": "workshop_stepper",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "hidden": "true",
        "comments": "@field.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_instruct_welcome_individual; w_instruct_intro; w_instruct_think; w_instruct_read_1; w_instruct_read_2; w_instruct_tools_activity; w_instruct_home_practice; w_instruct_ending",
            "comments": "w_instruct_welcome_individual; w_instruct_review_individual; w_instruct_relax; w_instruct_intro; w_instruct_think_1; w_instruct_read_1; w_instruct_question_1; w_instruct_read_2; w_instruct_question_2; w_instruct_tools_activity; w_instruct_think_2; w_instruct_home_practice; w_instruct_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_welcome_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "welcome_together",
        "value": "welcome_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_care_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "care_together",
        "value": "care_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_review_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "review_together",
        "value": "review_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "outro_text",
                "value": "You can use the top 8 challenges and solutions that parents have with praise.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_relax",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "relax",
        "value": "relax",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "Let’s slow down for a moment together.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "listen",
        "value": "listen",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "audio_src",
            "value": "plh_audio/sample.mp3",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "activity_title",
                "value": "@global.w_instruct",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "This week is about positive instructions.",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_think_1",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "think",
        "value": "think_temp",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "It's time for a thought experiment!",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "pair",
                "rows": [
                  {
                    "type": "nested_properties",
                    "name": "box_1",
                    "value": "box_image",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/instruct/guide_2/teen_phone_2.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.guide_2_name: \"Stop making so much noise!\" \n@global.guide_teen_name: \"I hate you!\"",
                        "type": "set_variable"
                      }
                    ]
                  },
                  {
                    "type": "nested_properties",
                    "name": "box_2",
                    "value": "pair",
                    "rows": [
                      {
                        "type": "nested_properties",
                        "name": "box_1",
                        "value": "box_image",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/instruct/guide_2/teen_phone_1.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "It is so hard to tell teenagers what to do! What really helped me was to change how to ask my teen to do things. Now, I tell them what they should do instead of what they shouldn’t. Let me show you how it works!",
                            "type": "set_variable"
                          }
                        ]
                      },
                      {
                        "type": "nested_properties",
                        "name": "box_2",
                        "value": "pair",
                        "rows": [
                          {
                            "type": "nested_properties",
                            "name": "box_1",
                            "value": "box_image",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/instruct/guide_2/think/slide_1.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "DO NOT THINK ABOUT AN ELEPHANT \n\nWhat are you thinking about?",
                                "type": "set_variable"
                              }
                            ]
                          },
                          {
                            "type": "nested_properties",
                            "name": "box_2",
                            "value": "pair",
                            "rows": [
                              {
                                "type": "nested_properties",
                                "name": "box_1",
                                "value": "box_image",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/instruct/guide_2/think/slide_2.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "‘Don’t do’ instructions make teens think about that thing. Sometimes they don’t understand what we do want from them. Also often they hate being told not to do things (don’t we all?)",
                                    "type": "set_variable"
                                  }
                                ]
                              },
                              {
                                "type": "nested_properties",
                                "name": "box_2",
                                "value": "pair",
                                "rows": [
                                  {
                                    "type": "nested_properties",
                                    "name": "box_1",
                                    "value": "box_image",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "plh_images/workshops/instruct/guide_2/think/slide_1.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "THINK ABOUT A FURRY TIGER, THANK YOU! \n\nWhat are you thinking about?",
                                        "type": "set_variable"
                                      }
                                    ]
                                  },
                                  {
                                    "type": "nested_properties",
                                    "name": "box_2",
                                    "value": "box_image",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "plh_images/workshops/instruct/guide_2/think/slide_3.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "Positive, clear instructions help teens focus on what they should be doing. They also feel more respectful to a teenager.",
                                        "type": "set_variable"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_read_1",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "read",
        "value": "read_temp",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "This happened with @global.w_instruct_teen_girl and her @global.w_instruct_female_caregiver the other day: ",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "pair",
                "rows": [
                  {
                    "type": "nested_properties",
                    "name": "box_1",
                    "value": "box_image",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/instruct/read_1/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_instruct_female_caregiver was cleaning the house while @global.w_instruct_teen_girl was with her friends practicing dance moves.\n\n@global.w_instruct_female_caregiver: “Don’t make such a mess while I am cleaning the house. You are in the way!”",
                        "type": "set_variable"
                      }
                    ]
                  },
                  {
                    "type": "nested_properties",
                    "name": "box_2",
                    "value": "pair",
                    "rows": [
                      {
                        "type": "nested_properties",
                        "name": "box_1",
                        "value": "box_image",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/instruct/read_1/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_instruct_teen_girl: “But I need to practice for the school competition. You never let me do anything.”\n\n@global.w_instruct_female_caregiver: “Don’t you talk back to me!”",
                            "type": "set_variable"
                          }
                        ]
                      },
                      {
                        "type": "nested_properties",
                        "name": "box_2",
                        "value": "box_image",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/instruct/read_1/slide_3.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_instruct_teen_girl: “Arrg!! Why am I being yelled at all the time????.”\n\n(inside) @global.w_instruct_female_caregiver to herself: “That child is always making trouble.”",
                            "type": "set_variable"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_talk_1",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "talk_together",
        "value": "talk_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "Let's discuss what happened in this story.",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "How do you think @global.w_instruct_teen_girl felt about the way @global.w_instruct_female_caregiver responded?  \n\nWhat could @global.w_instruct_female_caregiver have done differently? ",
                    "comments": "placeholder",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_read_2",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "read",
        "value": "read_temp",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "Thank you for thinking along! Let’s go back in time and see what happens!",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "pair",
                "rows": [
                  {
                    "type": "nested_properties",
                    "name": "box_1",
                    "value": "box_image",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/instruct/read_2/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_instruct_female_caregiver was cleaning the house while @global.w_instruct_teen_girl was with her friends practicing dance moves.  \n\n@global.w_instruct_female_caregiver: “@global.w_instruct_teen_girl, it is nice to see you practicing your dance moves with your friends. Please take it outside so I can finish cleaning the house. Afterwards, you can show me your dance.\"\n\n@global.w_instruct_teen_girl: “Okay, @global.w_instruct_female_caregiver!”",
                        "type": "set_variable"
                      }
                    ]
                  },
                  {
                    "type": "nested_properties",
                    "name": "box_2",
                    "value": "pair",
                    "rows": [
                      {
                        "type": "nested_properties",
                        "name": "box_1",
                        "value": "box_image",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/instruct/read_2/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "hidden": "true",
                            "type": "set_variable"
                          }
                        ]
                      },
                      {
                        "type": "nested_properties",
                        "name": "box_2",
                        "value": "pair",
                        "rows": [
                          {
                            "type": "nested_properties",
                            "name": "box_1",
                            "value": "box_image",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/instruct/read_2/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@fields.w_instruct_female_caregiver: \"Thank you for practicing outside while I finished cleaning the house, @fields.w_instruct_teen_girl . Now I have some time to watch your dance.\"",
                                "type": "set_variable"
                              }
                            ]
                          },
                          {
                            "type": "nested_properties",
                            "name": "box_2",
                            "value": "box_image",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/instruct/read_2/slide_4.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@fields.w_instruct_female_caregiver: \"Wow, @fields.w_instruct_teen_girl! You have such good dance moves!\"",
                                "type": "set_variable"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_talk_2",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "talk_together",
        "value": "talk_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "Let's discuss what happened this time.",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Why do you think it worked better for @global.w_instruct_female_caregiver this time? \n\nWhat do you think worked well? ",
                    "comments": "placeholder",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_tools",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "box_tools",
        "value": "box_tools",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "title",
            "name": "tools_title",
            "value": "@global.w_instruct"
          },
          {
            "type": "nested_properties",
            "name": "tool_1",
            "rows": [
              {
                "name": "title",
                "value": "GET REAL",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Can your teen actually do what you are about to ask? It may be impossible for them to read quietly all day, but half an hour when you really need it is realistic.",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_2",
            "rows": [
              {
                "name": "title",
                "value": "GET POSITIVE",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Smile, look them in the eye and use positive words. Praise them as soon as they start to do what you ask!",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_3",
            "rows": [
              {
                "name": "title",
                "value": "GET  CLEAR",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Often we know what we want in our head, but we don’t say it clearly enough. Say exactly what you want them to do. Try ‘please come home by 7pm’ instead of ‘Come home in time’.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_tools_activity",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "tools_activity",
        "value": "tools_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "w_instruct_tools",
                "rows": []
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_talk_3",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "talk_together",
        "value": "talk_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "Let's practice giving REAL, POSITIVE and CLEAR instructions. ",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Try giving positive instructions to each other! And give each other encouragement and praise – you deserve it.\n\n",
                    "type": "set_variable"
                  },
                  {
                    "type": "nested_properties",
                    "name": "nav_buttons",
                    "rows": [
                      {
                        "name": "button_info",
                        "value": "Examples",
                        "hidden": "false",
                        "comments": "This has to be authored as a pop-up text:\n\nExample of a negative instruction: Please stop making that noise all the time! \n\nExamples of positive instructions: I like your music, but could you turn it down so that we can talk whilst we have dinner? Thank you – I really appreciate this. \nThat’s great. Who is the singer? Please turn this off when you come in the house but you can play it in your room quietly if you want. Thank you!",
                        "type": "set_variable"
                      },
                      {
                        "name": "button_completed",
                        "value": "Finish",
                        "comments": "placeholder",
                        "type": "set_variable"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_home_practice",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "home_practice",
        "value": "home_practice",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text_1",
                    "value": "This week's home practice is to give your teen positive instructions.\n\nRemember – GET REAL, GET POSITIVE, GET CLEAR = GET EXACTLY WHAT YOU WANT (as much as is possible with a teenager!) ",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "Examples",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_2",
                    "value": "@global.essential_tools",
                    "hidden": "false",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_ending",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "value": "ending",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [],
        "name": "ending"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_stepper",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_stepper",
        "value": "workshop_stepper",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "hidden": "!@field.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_praise_welcome_together; w_praise_care_together; w_praise_relax; w_praise_review_together; w_praise_intro; w_praise_talk_1; w_praise_read; w_praise_talk_2; w_praise_tools_activity; w_praise_talk_3; w_praise_home_practice; w_praise_ending",
            "comments": "w_praise_welcome_together; w_praise_care_together; w_praise_review_together; w_praise_relax; w_praise_intro; w_praise_talk_1; w_praise_read; w_praise_talk_2; w_praise_tools_activity; w_praise_talk_3; w_praise_home_practice; w_praise_ending",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "workshop_stepper",
        "value": "workshop_stepper",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "hidden": "true",
        "comments": "@field.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_praise_welcome_individual; w_praise_intro; w_praise_read; w_praise_tools_activity; w_praise_home_practice; w_praise_ending",
            "comments": "w_praise_welcome_individual; w_praise_review_individual; w_praise_relax; w_praise_intro; w_praise_question_1; w_praise_read; w_praise_question_2; w_praise_tools_activity; w_praise_think_1; w_praise_home_practice; w_praise_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_welcome_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "welcome_together",
        "value": "welcome_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_care_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "care_together",
        "value": "care_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Can you each say how you are feeling today? Remember that no matter how you feel, it’s great you are all here! \n\nEach person think of something the others have done well this week and praise them for it!",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_review_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "review_together",
        "value": "review_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "outro_text",
                "value": "You can use the top 8 challenges and solutions that parents have with one-on-one time.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_relax",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "relax",
        "value": "relax",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "Let’s do a quick relax together.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "listen",
        "value": "listen",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "audio_src",
            "value": "plh_audio/sample.mp3",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "activity_title",
                "value": "@global.w_praise",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "This week is about praise and positive reinforcement.",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_talk_1",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "talk_together",
        "value": "talk_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "Praise is a powerful parenting skill.",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "box_timer",
                "rows": [
                  {
                    "name": "text",
                    "value": "Think about the last time someone thanked you or said you’d done something great. Tell each other about it, and how it made you feel.\n\nParents usually don’t get thanked or praised enough. Can you tell each other how it feels not to be thanked or praised for what you do? ",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_read",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "read",
        "value": "read_temp",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "Sometimes we tell our teens to do 20 things and they ignore us. Often we just want to scream. But then they still ignore us.\n\nBut the other day, @global.w_praise_female_caregiver was surprised by her teens! Let me tell you:",
                "comments": "placeholder; should be rewritten without \"me\" and \"my teen\"",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "pair",
                "rows": [
                  {
                    "type": "nested_properties",
                    "name": "box_1",
                    "value": "box_image",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/praise/read/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_praise_female_caregiver_name was busy and her older daughter actually helped her sister with her homework. Usually they just fight!",
                        "type": "set_variable"
                      }
                    ]
                  },
                  {
                    "type": "nested_properties",
                    "name": "box_2",
                    "value": "box_image",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/praise/read/slide_2.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "Here’s the parenting skill: if we tell our teens how proud we are of them for doing this, then they will want to do it again.",
                        "type": "set_variable"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_talk_2",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "talk_together",
        "value": "talk_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "include_outro",
                "value": "true",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Let's discuss what happened.",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "How do you think what @global.w_instruct_female_caregiver said made her teens feel?  \n\nWhy did she praise them?",
                    "type": "set_variable"
                  },
                  {
                    "type": "nested_properties",
                    "name": "nav_buttons",
                    "rows": [
                      {
                        "name": "button_info",
                        "value": "Ideas",
                        "hidden": "false",
                        "comments": "This should be a pop-up:\n\n@global.w_instruct_female_caregiver praised her teens...\n... to get them to do it more often\n... to help him finish his work \n... to make them feel good \n... to make himself feel good ",
                        "type": "set_variable"
                      },
                      {
                        "name": "button_completed",
                        "value": "Finish",
                        "comments": "placeholder",
                        "type": "set_variable"
                      }
                    ]
                  }
                ]
              },
              {
                "name": "outro_text",
                "value": "All of those things are true! When his teens are happy, @global.w_instruct_female_caregiver feels happy. And she got her work done. The same can work for you!",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you praise your teen, mark your @global.parent_point to track your success.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_tools",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "box_tools",
        "value": "box_tools",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "title",
            "name": "tools_title",
            "value": "@global.w_praise"
          },
          {
            "type": "nested_properties",
            "name": "tool_1",
            "rows": [
              {
                "name": "title",
                "value": "SEE IT",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Look for anything your teen does that is helpful or good, and praise them. They may not show it, but you’ll see them doing that good thing again. It will also reassure them that you notice and care.",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_2",
            "rows": [
              {
                "name": "title",
                "value": "SAY IT",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Be enthusiastic – really mean it when you say it!",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_3",
            "rows": [
              {
                "name": "title",
                "value": "REPEAT IT",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Try to find something every day to thank them for. Even something really small.",
                "type": "set_variable"
              }
            ]
          },
          {
            "name": "bottom_text",
            "value": "You can also praise other adults in your household, too. Notice how they respond!",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_tools_activity",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "tools_activity",
        "value": "tools_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "w_praise_tools",
                "rows": []
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_talk_3",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "talk_together",
        "value": "talk_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "Let's practice giving praise.",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Can you each think of something to praise your teen for, and tell the others – you can also help each other think of ideas.\n\nCan you praise each other for something each person has done well in this workshop? Have they listened, or been thoughtful, or caring? Give praise and see how it makes you both feel. ",
                    "type": "set_variable"
                  },
                  {
                    "type": "nested_properties",
                    "name": "nav_buttons",
                    "rows": [
                      {
                        "name": "button_info",
                        "value": "Ideas",
                        "hidden": "false",
                        "comments": "This has to be authored as a pop-up text:\n\nSometimes it’s hard to think of what to praise your teen for! Here are some ideas.\n\nBeing kind to someone \nCleaning their room \nJoining a family meal \nGreeting other family members \nLooking after siblings \nComing home in time \nShowing thoughtfulness \nSaying 'please' or  'thank you' \nGoing to school  \nDoing chores or schoolwork  \nGetting through mealtime peacefully ",
                        "type": "set_variable"
                      },
                      {
                        "name": "button_completed",
                        "value": "Finish",
                        "comments": "placeholder",
                        "type": "set_variable"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_home_practice",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "home_practice",
        "value": "home_practice",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text_1",
                    "value": "This week's home practice is to praise your teen once a day. It will only take 10 seconds!",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "Ideas",
                    "comments": "same ideas as in w_praise_talk_3",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_2",
                    "value": "Essential Tools",
                    "hidden": "false",
                    "type": "set_variable"
                  },
                  {
                    "name": "habit_text",
                    "value": "Every time you praise your teen, mark your @global.parent_point to track your success.",
                    "hidden": "false",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_ending",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "value": "ending",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [],
        "name": "ending"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_stepper",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_stepper_together",
        "value": "workshop_stepper",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "hidden": "!@field.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_self_care_welcome_together; w_self_care_intro; w_self_care_relax;  w_self_care_recognise; w_self_care_reward;  w_self_care_tools_activity; w_self_care_home_practice; w_self_care_ending",
            "comments": "w_self_care_welcome_together; w_self_care_intro; w_self_care_relax; w_self_care_recognise; w_self_care_reward;  w_self_care_tools_activity; w_self_care_home_practice; w_self_care_ending",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "workshop_stepper_individual",
        "value": "workshop_stepper",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "hidden": "true",
        "comments": "@field.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_self_care_welcome_individual; w_self_care_intro; w_self_care_recognise; w_self_care_reward;  w_self_care_tools_activity; w_self_care_home_practice; w_self_care_ending",
            "comments": "w_self_care_welcome_individual; w_self_care_intro; w_self_care_relax; w_self_care_recognise; w_self_care_reward;  w_self_care_tools_activity; w_self_care_survey_activity; w_self_care_home_practice; w_self_care_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_welcome_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "welcome_together",
        "value": "welcome_together",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "watch",
            "rows": [
              {
                "type": "nested_properties",
                "name": "workshop_activity",
                "rows": [
                  {
                    "name": "intro_text",
                    "value": "It’s great to have you here. ",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "listen",
        "value": "listen",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "name": "audio_src",
            "value": "plh_audio/sample.mp3",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "activity_title",
                "value": "@global.w_self_care",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "This week is about you.",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Parents don’t look after themselves enough. But this is so important. Reducing our stress and treating ourselves well helps us and our teenagers. \n\nHere are three brief things to do every day.\n\nRELAX – RECOGNISE – REWARD",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_relax",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "relax",
        "value": "relax",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "Let’s do a 30 second quick relaxation activity",
                "type": "set_variable"
              },
              {
                "name": "outro_text",
                "value": "Today, make sure to RECOGNISE and REWARD yourself.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_recognise",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "think",
        "value": "think_temp",
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "include_outro",
                "value": "true",
                "type": "set_variable"
              },
              {
                "name": "activity_title",
                "value": "Recognise",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Take a moment and think of one thing YOU have done recently that you have done well!",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "box_image",
                "rows": [
                  {
                    "name": "image_src",
                    "value": "plh_images/workshops/instruct/guide_2/think/slide_1.svg",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "Say it aloud if you can \"Well done for …\"\n\nHere is one thing we know you deserve a praise for -  you started using ParentApp!  \nSo... WELL DONE for using ParentApp! ",
                    "type": "set_variable"
                  },
                  {
                    "type": "nested_properties",
                    "name": "nav_buttons",
                    "rows": [
                      {
                        "name": "button_info",
                        "value": "More examples",
                        "hidden": "false",
                        "comments": "Pop-up with examples of things to praise yourself for:\n1. Showing love to my children \n2. Getting up even though I felt tired \n3. Smiling at someone \n4. Making food to stay strong \n5. Spending time with my children \n6. Helping my children with schoolwork",
                        "type": "set_variable"
                      }
                    ]
                  }
                ]
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you praise yourself, mark your @global.parent_point to track your success.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_reward",
    "status": "released",
    "comments": "w_self_care_welcome_together; w_self_care_intro; w_self_care_relax;  w_self_care_recognise; w_self_care_reward;  w_self_care_tools_activity; w_self_care_home_practice; w_self_care_ending",
    "rows": [
      {
        "type": "template",
        "name": "think",
        "value": "think_temp",
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "include_outro",
                "value": "true",
                "type": "set_variable"
              },
              {
                "name": "activity_title",
                "value": "Reward",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Remember you deserve your quality time too!",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "box_image",
                "rows": [
                  {
                    "name": "image_src",
                    "value": "plh_images/workshops/instruct/guide_2/think/slide_1.svg",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "What makes you happy? \n\nHave a hot drink \nCall a friend or family \nHave a relaxed bath \nRead \nWatch TV \nWrite your own ____________ \n\nTaking care of yourself is an important parenting skill!  ",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you treat yourself well, mark your @global.parent_point to track your success.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_tools",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "box_tools",
        "value": "box_tools",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "title",
            "name": "tools_title",
            "value": "@global.w_self_care"
          },
          {
            "type": "nested_properties",
            "name": "tool_1",
            "rows": [
              {
                "name": "title",
                "value": "RELAX",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Do a 30 second quick relaxation activity.",
                "type": "set_variable"
              },
              {
                "name": "button",
                "value": "Relax activity",
                "hidden": "false",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_2",
            "rows": [
              {
                "name": "title",
                "value": "RECOGNISE",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Take a moment and think of one thing YOU have done recently that you have done well! Say it aloud if you can \"Well done for …\"",
                "type": "set_variable"
              },
              {
                "name": "button",
                "value": "Recognise activity",
                "hidden": "false",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_3",
            "rows": [
              {
                "name": "title",
                "value": "REWARD",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Remember you deserve your quality time too! What makes you happy?",
                "type": "set_variable"
              },
              {
                "name": "button",
                "value": "Reward activity",
                "hidden": "false",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_tools_activity",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "tools_activity",
        "value": "tools_activity",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "w_self_care_tools",
                "rows": []
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_home_practice",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "home_practice",
        "value": "home_practice",
        "action_list": [
          {
            "trigger": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ],
            "_raw": "completed | emit:completed",
            "_cleaned": "completed | emit:completed"
          }
        ],
        "rows": [
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text_1",
                    "value": "This week's home practice is to relax, recognise and reward yourself. ",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "Relax activity",
                    "hidden": "false",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_2",
                    "value": "Recognise activity",
                    "hidden": "false",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_3",
                    "value": "Reward activity",
                    "hidden": "false",
                    "comments": "placeholder",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_ending",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "ending",
        "value": "ending",
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self_care.xlsx"
  }
]