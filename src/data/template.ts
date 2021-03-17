/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const template: FlowTypes.Template[] = [
  {
    "flow_type": "template",
    "flow_name": "tools_component",
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
        "value": "You can always find these tools in the @local.parent_centre ",
        "parameter_list": [
          "alert"
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
        "type": "display_group",
        "rows": [
          {
            "type": "title",
            "name": "title"
          },
          {
            "name": "help",
            "comments": "should be type: help",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "display_group",
        "rows": [
          {
            "type": "slider",
            "name": "slider",
            "parameter_list": [
              "min_value:@local.min_value",
              "min_text:@local.min_text",
              "max_value:@max_value",
              "max_text:@local.max_text",
              "step:@local.step",
              "unit_text:@local.unit_text"
            ]
          },
          {
            "comments": "no_answer",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_widgets.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "widget_number_selector",
    "status": "released",
    "rows": [
      {
        "name": "min_value",
        "value": 0,
        "type": "set_variable"
      },
      {
        "name": "max_value",
        "value": 20,
        "type": "set_variable"
      },
      {
        "name": "category_size",
        "value": 1,
        "type": "set_variable"
      },
      {
        "name": "category_list",
        "type": "set_variable"
      },
      {
        "name": "first_display_term",
        "value": 0,
        "type": "set_variable"
      },
      {
        "name": "height",
        "comments": "short or normal for the case with a title. This determines the font size if it has a title",
        "type": "set_variable"
      },
      {
        "name": "default_value",
        "value": "null",
        "type": "set_variable"
      },
      {
        "type": "set_default",
        "name": "_value",
        "value": "@local.default_value"
      },
      {
        "type": "title",
        "name": "title"
      },
      {
        "type": "number_selector",
        "name": "number_selector",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_value",
            "args": [],
            "_raw": "set_value",
            "_cleaned": "click | set_value"
          }
        ],
        "parameter_list": [
          "min_value:@local.min_value",
          "max_value:@max_value",
          "max_text:@local.max_text",
          "category_size:@local.category_size",
          "category_list:@local.category_list",
          "first_display_term:@local.first_display_term",
          "height:@local.height"
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_widgets.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "widget_text_box",
    "status": "released",
    "rows": [
      {
        "name": "blank_display_text",
        "value": "Click here to answer",
        "comments": "text shown inside box before clicking on it",
        "type": "set_variable"
      },
      {
        "name": "default_value",
        "value": "null",
        "type": "set_variable"
      },
      {
        "type": "set_default",
        "name": "_value",
        "value": "@local.default_value"
      },
      {
        "type": "text_box",
        "name": "text_box",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_value",
            "args": [],
            "_raw": "set_value",
            "_cleaned": "click | set_value"
          }
        ],
        "parameter_list": [
          "blank_display_text:@local.blank_display_text"
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_widgets.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "widget_combo_box",
    "status": "released",
    "rows": [
      {
        "name": "combo_box_style",
        "value": "pop-up",
        "type": "set_variable"
      },
      {
        "name": "blank_display_text",
        "value": "Click here to answer",
        "type": "set_variable"
      },
      {
        "name": "user_input",
        "value": "true",
        "type": "set_variable"
      },
      {
        "name": "answer_list",
        "type": "set_variable"
      },
      {
        "name": "default_value",
        "value": "null",
        "type": "set_variable"
      },
      {
        "type": "set_default",
        "name": "_value",
        "value": "@local.default_value"
      },
      {
        "type": "combo_box",
        "name": "combo_box",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_value",
            "args": [],
            "_raw": "set_value",
            "_cleaned": "click | set_value"
          }
        ],
        "parameter_list": [
          "combo_box_style:@local.combo_box_style",
          "blank_display_text:@local.blank_display_text",
          "answer_list:@local.answer_list",
          "user_input:@local.user_input"
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
            "value": "@local.activity_title"
          },
          {
            "type": "text",
            "name": "outro_text"
          },
          {
            "type": "button",
            "name": "outro_button"
          },
          {
            "type": "text",
            "name": "outro_habit_text",
            "parameter_list": [
              "alert"
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
    "flow_name": "info_button",
    "status": "released",
    "rows": [
      {
        "type": "button",
        "name": "button_info",
        "value": "Describe",
        "parameter_list": [
          "colour | secondary"
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshops.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "video_component",
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshop_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "audio_component",
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshop_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "image_component",
    "status": "released",
    "rows": [
      {
        "type": "image",
        "name": "image_src"
      },
      {
        "type": "text",
        "name": "text"
      },
      {
        "type": "text",
        "name": "habit_text",
        "parameter_list": [
          "alert"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshop_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "timer_component",
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshop_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "button_component",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text_1"
      },
      {
        "type": "button",
        "name": "button_1",
        "hidden": "true"
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
          "alert"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\core_templates\\core_templates_workshop_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_nesting_sheet_1",
    "status": "released",
    "rows": [
      {
        "type": "title",
        "name": "title",
        "value": "title for debug sheet 1"
      },
      {
        "type": "text",
        "name": "text",
        "value": "text for debug sheet 1"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_nesting.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_nesting_sheet_2",
    "status": "released",
    "rows": [
      {
        "type": "title",
        "name": "title",
        "value": "title for debug sheet 2"
      },
      {
        "type": "text",
        "name": "text",
        "value": "text for debug sheet 2"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_nesting.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_nesting_test_1",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "name_1",
        "value": "debug_sheet_1",
        "rows": [
          {
            "name": "title",
            "value": "title for sheet 1 was overwritten",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "name_2",
        "value": "debug_sheet_2",
        "rows": [
          {
            "name": "title",
            "value": "title for sheet 2 was overwritten",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "name_3",
        "value": "debug_sheet_1",
        "rows": [
          {
            "name": "text",
            "value": "text for sheet 1 was overwritten",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_nesting.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_nesting_test_2",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "other_name",
        "value": "debug_test_1",
        "rows": [
          {
            "type": "nested_properties",
            "name": "name_1",
            "rows": [
              {
                "name": "title",
                "value": "title for sheet 1 was overwritten twice",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_nesting.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_nesting_test_1_1",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "debug_sheet_1",
        "value": "debug_sheet_1",
        "rows": [
          {
            "name": "title",
            "value": "title for sheet 1 was overwritten",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "debug_sheet_2",
        "value": "debug_sheet_2",
        "rows": [
          {
            "name": "title",
            "value": "title for sheet 2 was overwritten",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "debug_sheet_1",
        "value": "debug_sheet_1",
        "rows": [
          {
            "name": "text",
            "value": "text for sheet 1 was overwritten",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_nesting.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_nesting_test_1_2",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "debug_override_1",
        "value": "debug_override_1",
        "rows": [
          {
            "type": "nested_properties",
            "name": "debug_sheet_1",
            "rows": [
              {
                "name": "title",
                "value": "title for sheet 1 was overwritten",
                "type": "set_variable"
              }
            ]
          }
        ]
      },
      {
        "type": "template",
        "name": "debug_sheet_2",
        "value": "debug_sheet_2",
        "rows": [
          {
            "name": "title",
            "value": "title for sheet 2 was overwritten",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "debug_override_2",
        "value": "debug_override_2",
        "rows": [
          {
            "type": "nested_properties",
            "name": "debug_sheet_1",
            "rows": [
              {
                "name": "text",
                "value": "text for sheet 1 was overwritten",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_nesting.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_nesting_override_1",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "debug_sheet_1",
        "value": "debug_sheet_1",
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_nesting.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_nesting_override_2",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "debug_sheet_1",
        "value": "debug_sheet_1",
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_nesting.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_small_issues.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_small_issues.xlsx"
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
        "value": "Variable true Hidden true",
        "hidden": "@local.var_true"
      },
      {
        "type": "text",
        "name": "true_false",
        "value": "Variable true Hidden false",
        "hidden": "!@local.var_true"
      },
      {
        "type": "text",
        "name": "false_true",
        "value": "Variable false Hidden true",
        "hidden": "@local.var_false"
      },
      {
        "type": "text",
        "name": "false_false",
        "value": "Variable false Hidden false",
        "hidden": "!@local.var_false"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_set_local",
    "status": "released",
    "rows": [
      {
        "type": "set_local",
        "name": "debug_variable",
        "value": "Value of the debug variable"
      },
      {
        "type": "text",
        "name": "debug_text",
        "value": "Text that includes @local.debug_variable"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_set_global_1",
    "status": "released",
    "rows": [
      {
        "type": "set_global",
        "name": "debug_variable_1",
        "value": "Value of the first debug variable"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_set_global_2",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "debug_text",
        "value": "Text that includes @global.debug_variable_1"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_set_global_3",
    "status": "released",
    "rows": [
      {
        "type": "set_global",
        "name": "debug_variable_2",
        "value": "Value of the second debug variable"
      },
      {
        "type": "text",
        "name": "debug_text",
        "value": "Text that includes @global.debug_variable_2"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\debug_templates\\debug_small_issues.xlsx"
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
            "hidden": "@fields.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/group/light_bulb.svg",
            "hidden": "!@fields.do_workshops_together",
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
            "hidden": "@fields.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/group/with_teen.svg",
            "hidden": "!@fields.do_workshops_together",
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
            "value": "button_component",
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
            "hidden": "@fields.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's listen to an audio!",
            "hidden": "@fields.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Listen Together",
            "hidden": "!@fields.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's listen to an audio together!",
            "hidden": "!@fields.do_workshops_together",
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
            "value": "audio_component",
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
            "hidden": "@fields.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Read",
            "hidden": "@fields.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's read a story!",
            "hidden": "@fields.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/group/read.svg",
            "hidden": "!@fields.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Read Together",
            "hidden": "!@fields.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's read a story together!",
            "hidden": "!@fields.do_workshops_together",
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
            "value": "image_component",
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
                "value": "image_component",
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
                "value": "image_component",
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
                    "value": "image_component",
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
                    "value": "image_component",
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
                        "value": "image_component",
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
                        "value": "image_component",
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
                            "value": "image_component",
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
                            "value": "image_component",
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
                                "value": "image_component",
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
                                "value": "image_component",
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
                                    "value": "image_component",
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
                                    "value": "image_component",
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
                                        "value": "image",
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
                                        "value": "image_component",
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
                "hidden": "@fields.do_workshops_together",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "It's time to think!",
                "hidden": "@fields.do_workshops_together",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "activity_title",
                "value": "Think Together",
                "hidden": "!@fields.do_workshops_together",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "It's time to think together!",
                "hidden": "!@fields.do_workshops_together",
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
            "hidden": "@fields.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "It's time to learn and practice!",
            "hidden": "@fields.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Learn Together",
            "hidden": "!@fields.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "It's time to learn and practice together!",
            "hidden": "!@fields.do_workshops_together",
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
            "value": "image_component",
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
                "value": "image_component",
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
                "value": "image_component",
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
                    "value": "image_component",
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
                    "value": "image_component",
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
                        "value": "image_component",
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
                        "value": "image_component",
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
                            "value": "image_component",
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
                            "value": "image_component",
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
                                "value": "image_component",
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
                                "value": "image_component",
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
                                    "value": "image_component",
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
                                    "value": "image_component",
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
                                        "value": "image",
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
                                        "value": "image_component",
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
            "hidden": "@fields.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Relax",
            "hidden": "@fields.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's calm down.",
            "hidden": "@fields.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/group/relax.svg",
            "hidden": "!@fields.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Relax Together",
            "hidden": "!@fields.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's calm down together.",
            "hidden": "!@fields.do_workshops_together",
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
            "value": "audio_component",
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
                "comments": "needs star icon attached",
                "type": "set_variable"
              }
            ]
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
            "value": "timer_component",
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
                "value": "timer_component",
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
                "value": "timer_component",
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
            "value": "timer_component",
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
            "hidden": "@fields.do_workshops_together",
            "__EMPTY": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's watch a video!",
            "hidden": "@fields.do_workshops_together",
            "__EMPTY": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Watch Together",
            "hidden": "!@fields.do_workshops_together",
            "__EMPTY": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's watch a video together!",
            "hidden": "!@fields.do_workshops_together",
            "__EMPTY": "placeholder",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "intro_nav_buttons",
            "__EMPTY": "intro_nav_buttons",
            "rows": [
              {
                "name": "button_completed",
                "value": "Show video",
                "__EMPTY": "placeholder",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "video_component",
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
                "value": "Welcome @fields.group_name",
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
                "value": "You've completed the workshop! ",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "activity_image",
                "value": "plh_images/workshop_modes/guide_2/cup.svg",
                "hidden": "@fields.do_workshops_together",
                "type": "set_variable"
              },
              {
                "name": "activity_image",
                "value": "plh_images/workshop_modes/group/cup.svg",
                "hidden": "!@fields.do_workshops_together",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Well done! See you next week! ",
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
        "hidden": "!@fields.do_workshops_together",
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
        "comments": "@fields.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_example_welcome_together;\nw_example_listen;",
            "comments": "w_example_listen;\nw_example_read;\nw_example_question_time;\nw_example_tools_activity;\nw_example_home_practice;\nw_example_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\example_templates\\workshop_example.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\example_templates\\workshop_example.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\example_templates\\workshop_example.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\example_templates\\workshop_example.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\example_templates\\workshop_example.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_tools",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "tools_component",
        "value": "tools_component",
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\example_templates\\workshop_example.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\example_templates\\workshop_example.xlsx"
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
                    "value": "Button 1",
                    "action_list": [
                      {
                        "trigger": "click",
                        "action_id": "go_to",
                        "args": [
                          "w_example_read"
                        ],
                        "_raw": "click | go_to:w_example_read",
                        "_cleaned": "click | go_to:w_example_read"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\example_templates\\workshop_example.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\example_templates\\workshop_example.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "home_screen_variables",
    "status": "released",
    "rows": [
      {
        "type": "set_global",
        "name": "weekly_workshops",
        "value": "Weekly Workshops"
      },
      {
        "type": "set_global",
        "name": "weekly_workshop",
        "value": "Weekly Workshop"
      },
      {
        "type": "set_global",
        "name": "weekly_workshops_image",
        "value": "plh_images/characters/@fields.guidenumber/happy.svg",
        "comments": "placeholder"
      },
      {
        "type": "set_global",
        "name": "parent_points",
        "value": "Parent Points"
      },
      {
        "type": "set_global",
        "name": "parent_point",
        "value": "Parent Point"
      },
      {
        "type": "set_global",
        "name": "parent_points_image",
        "value": "plh_images/characters/@fields.guidenumber/happy.svg",
        "comments": "placeholder"
      },
      {
        "type": "set_global",
        "name": "parent_centre",
        "value": "Parent Centre"
      },
      {
        "type": "set_global",
        "name": "parent_centre_image",
        "value": "plh_images/characters/@fields.guidenumber/happy.svg",
        "comments": "placeholder"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\navigation_templates\\global_variables_navigation.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "parent_centre_variables",
    "status": "released",
    "rows": [
      {
        "type": "set_global",
        "name": "help",
        "value": "Help"
      },
      {
        "type": "set_global",
        "name": "help_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "set_global",
        "name": "essential_tools",
        "value": "Essential Tools"
      },
      {
        "type": "set_global",
        "name": "essential_tools_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "set_global",
        "name": "covid",
        "value": "COVID"
      },
      {
        "type": "set_global",
        "name": "covid_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "set_global",
        "name": "relax_and_activities",
        "value": "Relax & Activities"
      },
      {
        "type": "set_global",
        "name": "relax_and_activities_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "set_global",
        "name": "extra",
        "value": "Extra"
      },
      {
        "type": "set_global",
        "name": "extra_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "set_global",
        "name": "support_contacts",
        "value": "Support Contacts"
      },
      {
        "type": "set_global",
        "name": "support_contacts_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "set_global",
        "name": "evidence_base",
        "value": "Evidence Base"
      },
      {
        "type": "set_global",
        "name": "evidence_base_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      },
      {
        "type": "set_global",
        "name": "technical_support",
        "value": "Technical Support"
      },
      {
        "type": "set_global",
        "name": "technical_support_icon",
        "value": "plh_images/icons/heart.svg",
        "comments": "placeholder"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\navigation_templates\\global_variables_navigation.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "parent_point_variables",
    "status": "released",
    "rows": [
      {
        "type": "set_global",
        "name": "parent_point_relax",
        "value": "Relax"
      },
      {
        "type": "set_global",
        "name": "parent_point_relax_image",
        "value": "plh_images/habits/habit_relax_image.svg"
      },
      {
        "type": "set_global",
        "name": "parent_point_treat_yourself",
        "value": "Treat yourself well"
      },
      {
        "type": "set_global",
        "name": "parent_point_treat_yourself_image",
        "value": "plh_images/habits/habit_treat_yourself_image.svg"
      },
      {
        "type": "set_global",
        "name": "parent_point_praise_yourself",
        "value": "Praise yourself"
      },
      {
        "type": "set_global",
        "name": "parent_point_praise_yourself_image",
        "value": "plh_images/habits/habit_praise_yourself_image.svg"
      },
      {
        "type": "set_global",
        "name": "parent_point_spend_time",
        "value": "One on one time"
      },
      {
        "type": "set_global",
        "name": "parent_point_spend_time_image",
        "value": "plh_images/habits/habit_spend_time_image.svg"
      },
      {
        "type": "set_global",
        "name": "parent_point_praise_teen",
        "value": "Praise your teen"
      },
      {
        "type": "set_global",
        "name": "parent_point_praise_teen_image",
        "value": "plh_images/habits/habit_praise_teen_image.svg"
      },
      {
        "type": "set_global",
        "name": "parent_point_breathe",
        "value": "Breathe not yell"
      },
      {
        "type": "set_global",
        "name": "parent_point_breathe_image",
        "value": "plh_images/habits/habit_breathe_image.svg"
      },
      {
        "type": "set_global",
        "name": "parent_point_money",
        "value": "Good money choice"
      },
      {
        "type": "set_global",
        "name": "parent_point_money_image",
        "value": "plh_images/habits/habit_money_image.svg"
      },
      {
        "type": "set_global",
        "name": "parent_point_consequence",
        "value": "Calm consequence"
      },
      {
        "type": "set_global",
        "name": "parent_point_consequence_image",
        "value": "plh_images/habits/habit_consequence_image.svg"
      },
      {
        "type": "set_global",
        "name": "parent_point_safe",
        "value": "Safe"
      },
      {
        "type": "set_global",
        "name": "parent_point_safe_image",
        "value": "plh_images/habits/habit_safe_image.svg"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\parent_point_templates\\global_variables_parent_points.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "workshop_titles",
    "status": "released",
    "rows": [
      {
        "type": "set_global",
        "name": "w_self-care",
        "value": "Self-Care",
        "comments": "self-care"
      },
      {
        "type": "set_global",
        "name": "w_self-care_short",
        "value": "Self-Care",
        "comments": "ETW 1 -- done"
      },
      {
        "type": "set_global",
        "name": "w_1on1",
        "value": "One-on-One Time",
        "comments": "1on1"
      },
      {
        "type": "set_global",
        "name": "w_1on1_short",
        "value": "1 on 1",
        "comments": "ETW 3 -- done"
      },
      {
        "type": "set_global",
        "name": "w_praise",
        "value": "Praise & Positive Reinforcement",
        "comments": "praise"
      },
      {
        "type": "set_global",
        "name": "w_praise_short",
        "value": "Praise",
        "comments": "ETW 4 -- done"
      },
      {
        "type": "set_global",
        "name": "w_instruct",
        "value": "Positive Instructions",
        "comments": "instruct"
      },
      {
        "type": "set_global",
        "name": "w_instruct_short",
        "value": "Instructions",
        "comments": "ETW 2 -- done"
      },
      {
        "type": "set_global",
        "name": "w_stress",
        "value": "Managing Anger & Stress",
        "comments": "stress"
      },
      {
        "type": "set_global",
        "name": "w_stress_short",
        "value": "Stress",
        "comments": "SB 1"
      },
      {
        "type": "set_global",
        "name": "w_money",
        "value": "Family Budgeting",
        "comments": "money"
      },
      {
        "type": "set_global",
        "name": "w_money_short",
        "value": "Money"
      },
      {
        "type": "set_global",
        "name": "w_rules",
        "value": "Rules",
        "comments": "rules"
      },
      {
        "type": "set_global",
        "name": "w_rules_short",
        "value": "Rules"
      },
      {
        "type": "set_global",
        "name": "w_responsibility",
        "value": "Accepting Responsibility",
        "comments": "responsibility"
      },
      {
        "type": "set_global",
        "name": "w_responsibility_short",
        "value": "Consequences"
      },
      {
        "type": "set_global",
        "name": "w_solve",
        "value": "Problem Solving",
        "comments": "solve"
      },
      {
        "type": "set_global",
        "name": "w_solve_short",
        "value": "Problem Solve"
      },
      {
        "type": "set_global",
        "name": "w_safe",
        "value": "Keeping Your Teen Safe",
        "comments": "safe"
      },
      {
        "type": "set_global",
        "name": "w_safe_short",
        "value": "Safety"
      },
      {
        "type": "set_global",
        "name": "w_crisis",
        "value": "Dealing with Crisis",
        "comments": "crisis"
      },
      {
        "type": "set_global",
        "name": "w_crisis_short",
        "value": "Crisis"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\global_variables_workshops.xlsx"
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
        "hidden": "!@fields.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_1on1_welcome_together;\nw_1on1_care_together; \nw_1on1_relax; \nw_1on1_intro; \nw_1on1_talk;\nw_1on1_tools_activity;  \nw_1on1_home_practice; \nw_1on1_ending",
            "comments": "w_1on1_welcome_together;\nw_1on1_care_together; \nw_1on1_relax; \nw_1on1_intro; \nw_1on1_talk;\nw_1on1_tools_activity;  \nw_1on1_home_practice; \nw_1on1_ending",
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
        "hidden": "@fields.do_workshops_together",
        "comments": "@fields.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
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
                "value": "timer_component",
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
    "flow_name": "w_1on1_tools",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "tools_component",
        "value": "tools_component",
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
        "hidden": "!@fields.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_instruct_welcome_together; w_instruct_care_together; w_instruct_review_together; w_instruct_relax; w_instruct_intro; w_instruct_think_1; w_instruct_read_1; w_instruct_talk_1; w_instruct_read_2; w_instruct_talk_2; w_instruct_tools_activity; w_instruct_talk_3; w_instruct_home_practice; w_instruct_ending",
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
        "hidden": "@fields.do_workshops_together",
        "comments": "@fields.do_workshops_together",
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
                "value": "You can use the top 8 challenges and solutions that parents have with positive instructions.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
        "value": "think",
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
            "name": "read",
            "rows": [
              {
                "name": "number_of_slides",
                "value": 5,
                "type": "set_variable"
              },
              {
                "name": "slide_image_src_1",
                "value": "plh_images/modules/mod_instruct/teen_shout.svg",
                "type": "set_variable"
              },
              {
                "name": "slide_text_1",
                "value": "@fields.neighbour: \"Stop making so much noise!\" \n@fields.guide_teen: \"I hate you!\"\n\nIt is so hard to tell teenagers what to do! What really helped me was to change how to ask my teen to do things. Now, I tell them what they should do instead of what they shouldn’t. Let me show you how it works!",
                "type": "set_variable"
              },
              {
                "name": "slide_image_src_2",
                "value": "plh_images/modules/mod_instruct/thought_experiment/te_1.svg",
                "type": "set_variable"
              },
              {
                "name": "slide_text_2",
                "value": "DO NOT THINK ABOUT AN ELEPHANT \n\nWhat are you thinking about?",
                "type": "set_variable"
              },
              {
                "name": "slide_image_src_3",
                "value": "plh_images/modules/mod_instruct/thought_experiment/te_2.svg",
                "type": "set_variable"
              },
              {
                "name": "slide_text_3",
                "value": "‘Don’t do’ instructions make teens think about that thing. Sometimes they don’t understand what we do want from them. Also often they hate being told not to do things (don’t we all?)",
                "type": "set_variable"
              },
              {
                "name": "slide_image_src_4",
                "value": "plh_images/modules/mod_instruct/thought_experiment/te_1.svg",
                "type": "set_variable"
              },
              {
                "name": "slide_text_4",
                "value": "THINK ABOUT A FURRY TIGER, THANK YOU! \n\nWhat are you thinking about?",
                "type": "set_variable"
              },
              {
                "name": "slide_image_src_5",
                "value": "plh_images/modules/mod_instruct/thought_experiment/te_3.svg",
                "type": "set_variable"
              },
              {
                "name": "slide_text_5",
                "value": "Positive, clear instructions help teens focus on what they should be doing. They also feel more respectful to a teenager.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
            "name": "intro_text",
            "value": "This happened with @global.w_instruct_teen_girl and her @global.w_instruct_female_caregiver the other day: ",
            "type": "set_variable"
          },
          {
            "name": "number_of_slides",
            "value": 3,
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_1",
            "value": "plh_images/modules/mod_instruct/illustrated_story/is_1.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_1",
            "value": "@global.w_instruct_female_caregiver was cleaning the house while @global.w_instruct_teen_girl was with her friends practicing dance moves.\n\n@global.w_instruct_female_caregiver: “Don’t make such a mess while I am cleaning the house. You are in the way!”",
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_2",
            "value": "plh_images/modules/mod_instruct/illustrated_story/is_2.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_2",
            "value": "@global.w_instruct_teen_girl: “But I need to practice for the school competition. You never let me do anything.”\n\n@global.w_instruct_female_caregiver: “Don’t you talk back to me!”",
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_3",
            "value": "plh_images/modules/mod_instruct/illustrated_story/is_3.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_3",
            "value": "@global.w_instruct_teen_girl: “Arrg!! Why Am I being yelled at all the time????.”\n\n(inside) @global.w_instruct_female_caregiver to herself: “That child is always making trouble.”",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
            "name": "discussion_text",
            "value": "How do you think @global.w_instruct_teen_girl felt about the way @global.w_instruct_female_caregiver responded?  \n\nWhat could @global.w_instruct_female_caregiver have done differently? ",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "Let's discuss what happened in this story.",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
            "value": 5,
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_1",
            "value": "plh_images/modules/mod_instruct/illustrated_story/is_4.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_1",
            "value": "@global.w_instruct_female_caregiver was cleaning the house while @global.w_instruct_teen_girl was with her friends practicing dance moves.  ",
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_2",
            "value": "plh_images/modules/mod_instruct/illustrated_story/is_5.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_2",
            "value": "@global.w_instruct_female_caregiver: “@global.w_instruct_teen_girl, it is nice to see you practicing your dance moves with your friends. Please take it outside so I can finish cleaning the house. Afterwards, you can show me your dance.\"\n\n@global.w_instruct_teen_girl: “Okay, @global.w_instruct_female_caregiver!”",
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_3",
            "value": "plh_images/modules/mod_instruct/illustrated_story/is_6.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_4",
            "value": "plh_images/modules/mod_instruct/illustrated_story/is_7.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_4",
            "value": "@fields.w_instruct_female_caregiver: \"Thank you for practicing outside while I finished cleaning the house, @fields.w_instruct_teen_girl . Now I have some time to watch your dance.\"",
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_5",
            "value": "plh_images/modules/mod_instruct/illustrated_story/is_8.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_5",
            "value": "@fields.w_instruct_female_caregiver: \"Wow, @fields.w_instruct_teen_girl! You have such good dance moves!\"",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "Thank you for thinking along! Let’s go back in time and see what happens!",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
            "name": "discussion_text",
            "value": "Why do you think it worked better for @global.w_instruct_female_caregiver this time? \n\nWhat do you think worked well? ",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "Let's discuss what happened this time.",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_tools",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "tools_component",
        "value": "tools_component",
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
                "value": "timer_component",
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
                    "value": "Essential Tools",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self-care_stepper",
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
        "hidden": "!@fields.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_self-care_welcome_together; w_self-care_intro; w_self-care_relax;  w_self-care_recognise; w_self-care_reward;  w_self-care_tools_activity; w_self-care_home_practice; w_self-care_ending",
            "comments": "w_self-care_welcome_together; w_self-care_intro; w_self-care_relax; w_self-care_recognise; w_self-care_reward;  w_self-care_tools_activity; w_self-care_home_practice; w_self-care_ending",
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
        "hidden": "@fields.do_workshops_together",
        "comments": "@fields.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_self-care_welcome_individual; w_self-care_intro; w_self-care_recognise; w_self-care_reward;  w_self-care_tools_activity; w_self-care_home_practice; w_self-care_ending",
            "comments": "w_self-care_welcome_individual; w_self-care_intro; w_self-care_relax; w_self-care_recognise; w_self-care_reward;  w_self-care_tools_activity; w_self-care_survey_activity; w_self-care_home_practice; w_self-care_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self-care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self-care_welcome_together",
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self-care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self-care_intro",
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
                "value": "@local.w_self-care",
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self-care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self-care_relax",
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self-care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self-care_recognise",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "learn",
        "value": "learn",
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
            "value": 1,
            "type": "set_variable"
          },
          {
            "name": "slide_text_1",
            "value": "Say it aloud if you can \"Well done for …\"\n\nHere is one thing we know you deserve a praise for -  you started using ParentApp!  \nSo... WELL DONE for using ParentApp! \n\nHere are more examples of things you might have done recently and deserve a praise: \n\n1. Showing love to my children \n2. Getting up even though I felt tired \n3. Smiling at someone \n4. Making food to stay strong \n5. Spending time with my children \n6. Helping my children with schoolwork ",
            "type": "set_variable"
          },
          {
            "name": "slide_habit_text_1",
            "value": "Every time you praise yourself, mark your @local.parent_point to track your success.",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "activity_title",
                "value": "Recognise",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Take a moment and think of one thing YOU have done recently that you have done well!",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self-care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self-care_reward",
    "status": "released",
    "comments": "w_self-care_welcome_together; w_self-care_intro; w_self-care_relax;  w_self-care_recognise; w_self-care_reward;  w_self-care_tools_activity; w_self-care_home_practice; w_self-care_ending",
    "rows": [
      {
        "type": "template",
        "name": "learn",
        "value": "learn",
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
            "value": 1,
            "type": "set_variable"
          },
          {
            "name": "slide_text_1",
            "value": "What makes you happy? \n\nHave a hot drink \nCall a friend or family \nHave a relaxed bath \nRead \nWatch TV \nWrite your own ____________ \n\nTaking care of yourself is an important parenting skill!  \n\nStart now. Relax, recognise and reward yourself.  \n",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "activity_title",
                "value": "Reward",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Remember you deserve your quality time too!",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self-care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self-care_tools",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "tools_component",
        "value": "tools_component",
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
            "value": "@global.w_self-care"
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
                "value": "Do a 30 second quick relaxation activity. Here's one: \n1. Close your eyes.   \n2. Listen to your breath as it goes in and out five times, noticing how you feel.  \n3. When you are ready open your eyes again. You are in control! ",
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self-care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self-care_tools_activity",
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
                "value": "w_self-care_tools",
                "rows": []
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self-care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self-care_home_practice",
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
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self-care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self-care_ending",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "ending",
        "value": "ending",
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\plh_templating\\top_templates\\workshop_templates\\workshop_self-care.xlsx"
  }
]