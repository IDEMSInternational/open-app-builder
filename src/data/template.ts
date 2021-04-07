/* eslint-disable */
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
          }
        ]
      },
      {
        "type": "title",
        "name": "title",
        "value": "@global.essential_tools: "
      },
      {
        "type": "title",
        "name": "tools_title"
      },
      {
        "type": "text",
        "name": "top_text",
        "hidden": "true"
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
        "name": "bottom_text",
        "hidden": "true"
      },
      {
        "type": "button",
        "name": "button_1",
        "hidden": "true"
      },
      {
        "type": "button",
        "name": "button_2",
        "hidden": "true"
      },
      {
        "type": "text",
        "name": "tip_text",
        "value": "You can always find these tools in the @global.parent_centre ",
        "parameter_list": {
          "alert": "true"
        }
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_essential_tools.xlsx"
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
        "type": "button",
        "name": "button_1",
        "hidden": "true"
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
        "name": "image_src",
        "hidden": "true"
      },
      {
        "type": "button",
        "name": "button_2",
        "hidden": "true"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_essential_tools.xlsx"
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
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "true"
            ],
            "_raw": "click | set_field:do_workshops_together:true",
            "_cleaned": "click | set_field:do_workshops_together:true"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "group_name",
              "Friends"
            ],
            "_raw": "click | set_field:group_name:Friends",
            "_cleaned": "click | set_field:group_name:Friends"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "user_name",
              "Lucie"
            ],
            "_raw": "click | set_field:user_name:Lucie",
            "_cleaned": "click | set_field:user_name:Lucie"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_self_care_stepper"
            ],
            "_raw": "click | go_to:w_self_care_stepper",
            "_cleaned": "click | go_to:w_self_care_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      },
      {
        "type": "button",
        "name": "workshop_button_1",
        "value": "@global.w_1on1",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "true"
            ],
            "_raw": "click | set_field:do_workshops_together:true",
            "_cleaned": "click | set_field:do_workshops_together:true"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "group_name",
              "Friends"
            ],
            "_raw": "click | set_field:group_name:Friends",
            "_cleaned": "click | set_field:group_name:Friends"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "user_name",
              "Lucie"
            ],
            "_raw": "click | set_field:user_name:Lucie",
            "_cleaned": "click | set_field:user_name:Lucie"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_1on1_stepper"
            ],
            "_raw": "click | go_to:w_1on1_stepper",
            "_cleaned": "click | go_to:w_1on1_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      },
      {
        "type": "button",
        "name": "workshop_button_2",
        "value": "@global.w_praise",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "true"
            ],
            "_raw": "click | set_field:do_workshops_together:true",
            "_cleaned": "click | set_field:do_workshops_together:true"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "group_name",
              "Friends"
            ],
            "_raw": "click | set_field:group_name:Friends",
            "_cleaned": "click | set_field:group_name:Friends"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "user_name",
              "Lucie"
            ],
            "_raw": "click | set_field:user_name:Lucie",
            "_cleaned": "click | set_field:user_name:Lucie"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_praise_stepper"
            ],
            "_raw": "click | go_to:w_praise_stepper",
            "_cleaned": "click | go_to:w_praise_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      },
      {
        "type": "button",
        "name": "workshop_button_3",
        "value": "@global.w_instruct",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "true"
            ],
            "_raw": "click | set_field:do_workshops_together:true",
            "_cleaned": "click | set_field:do_workshops_together:true"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "group_name",
              "Friends"
            ],
            "_raw": "click | set_field:group_name:Friends",
            "_cleaned": "click | set_field:group_name:Friends"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "user_name",
              "Lucie"
            ],
            "_raw": "click | set_field:user_name:Lucie",
            "_cleaned": "click | set_field:user_name:Lucie"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_instruct_stepper"
            ],
            "_raw": "click | go_to:w_instruct_stepper",
            "_cleaned": "click | go_to:w_instruct_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      },
      {
        "type": "button",
        "name": "workshop_button_4",
        "value": "@global.w_stress",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "true"
            ],
            "_raw": "click | set_field:do_workshops_together:true",
            "_cleaned": "click | set_field:do_workshops_together:true"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "group_name",
              "Friends"
            ],
            "_raw": "click | set_field:group_name:Friends",
            "_cleaned": "click | set_field:group_name:Friends"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "user_name",
              "Lucie"
            ],
            "_raw": "click | set_field:user_name:Lucie",
            "_cleaned": "click | set_field:user_name:Lucie"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_stress_stepper"
            ],
            "_raw": "click | go_to:w_stress_stepper",
            "_cleaned": "click | go_to:w_stress_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      },
      {
        "type": "button",
        "name": "workshop_button_5",
        "value": "@global.w_money",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "true"
            ],
            "_raw": "click | set_field:do_workshops_together:true",
            "_cleaned": "click | set_field:do_workshops_together:true"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "group_name",
              "Friends"
            ],
            "_raw": "click | set_field:group_name:Friends",
            "_cleaned": "click | set_field:group_name:Friends"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "user_name",
              "Lucie"
            ],
            "_raw": "click | set_field:user_name:Lucie",
            "_cleaned": "click | set_field:user_name:Lucie"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_money_stepper"
            ],
            "_raw": "click | go_to:w_money_stepper",
            "_cleaned": "click | go_to:w_money_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      },
      {
        "type": "button",
        "name": "workshop_button_6",
        "value": "@global.w_rules",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "true"
            ],
            "_raw": "click | set_field:do_workshops_together:true",
            "_cleaned": "click | set_field:do_workshops_together:true"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "group_name",
              "Friends"
            ],
            "_raw": "click | set_field:group_name:Friends",
            "_cleaned": "click | set_field:group_name:Friends"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "user_name",
              "Lucie"
            ],
            "_raw": "click | set_field:user_name:Lucie",
            "_cleaned": "click | set_field:user_name:Lucie"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_rules_stepper"
            ],
            "_raw": "click | go_to:w_rules_stepper",
            "_cleaned": "click | go_to:w_rules_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      },
      {
        "type": "button",
        "name": "workshop_button_7",
        "value": "@global.w_consequence",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "true"
            ],
            "_raw": "click | set_field:do_workshops_together:true",
            "_cleaned": "click | set_field:do_workshops_together:true"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "group_name",
              "Friends"
            ],
            "_raw": "click | set_field:group_name:Friends",
            "_cleaned": "click | set_field:group_name:Friends"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "user_name",
              "Lucie"
            ],
            "_raw": "click | set_field:user_name:Lucie",
            "_cleaned": "click | set_field:user_name:Lucie"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_consequence_stepper"
            ],
            "_raw": "click | go_to:w_consequence_stepper",
            "_cleaned": "click | go_to:w_consequence_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      },
      {
        "type": "button",
        "name": "workshop_button_8",
        "value": "@global.w_solve",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "true"
            ],
            "_raw": "click | set_field:do_workshops_together:true",
            "_cleaned": "click | set_field:do_workshops_together:true"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "group_name",
              "Friends"
            ],
            "_raw": "click | set_field:group_name:Friends",
            "_cleaned": "click | set_field:group_name:Friends"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "user_name",
              "Lucie"
            ],
            "_raw": "click | set_field:user_name:Lucie",
            "_cleaned": "click | set_field:user_name:Lucie"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_solve_stepper"
            ],
            "_raw": "click | go_to:w_solve_stepper",
            "_cleaned": "click | go_to:w_solve_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      },
      {
        "type": "button",
        "name": "workshop_button_9",
        "value": "@global.w_safe",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "true"
            ],
            "_raw": "click | set_field:do_workshops_together:true",
            "_cleaned": "click | set_field:do_workshops_together:true"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "group_name",
              "Friends"
            ],
            "_raw": "click | set_field:group_name:Friends",
            "_cleaned": "click | set_field:group_name:Friends"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "user_name",
              "Lucie"
            ],
            "_raw": "click | set_field:user_name:Lucie",
            "_cleaned": "click | set_field:user_name:Lucie"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_safe_stepper"
            ],
            "_raw": "click | go_to:w_safe_stepper",
            "_cleaned": "click | go_to:w_safe_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      },
      {
        "type": "button",
        "name": "workshop_button_10",
        "value": "@global.w_crisis",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "true"
            ],
            "_raw": "click | set_field:do_workshops_together:true",
            "_cleaned": "click | set_field:do_workshops_together:true"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "group_name",
              "Friends"
            ],
            "_raw": "click | set_field:group_name:Friends",
            "_cleaned": "click | set_field:group_name:Friends"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "user_name",
              "Lucie"
            ],
            "_raw": "click | set_field:user_name:Lucie",
            "_cleaned": "click | set_field:user_name:Lucie"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_crisis_stepper"
            ],
            "_raw": "click | go_to:w_crisis_stepper",
            "_cleaned": "click | go_to:w_crisis_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      },
      {
        "type": "button",
        "name": "workshop_button_11",
        "value": "@global.w_celebrate",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "true"
            ],
            "_raw": "click | set_field:do_workshops_together:true",
            "_cleaned": "click | set_field:do_workshops_together:true"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "group_name",
              "Friends"
            ],
            "_raw": "click | set_field:group_name:Friends",
            "_cleaned": "click | set_field:group_name:Friends"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "user_name",
              "Lucie"
            ],
            "_raw": "click | set_field:user_name:Lucie",
            "_cleaned": "click | set_field:user_name:Lucie"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_celebrate_stepper"
            ],
            "_raw": "click | go_to:w_celebrate_stepper",
            "_cleaned": "click | go_to:w_celebrate_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_navigation_temporary.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_buttons_temp",
    "status": "released",
    "rows": [
      {
        "type": "button",
        "name": "together_button",
        "value": "@global.together",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "true"
            ],
            "_raw": "click | set_field:do_workshops_together:true",
            "_cleaned": "click | set_field:do_workshops_together:true"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_self_care_stepper"
            ],
            "_raw": "click | go_to:w_self_care_stepper",
            "_cleaned": "click | go_to:w_self_care_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      },
      {
        "type": "button",
        "name": "individual_button",
        "value": "@global.individual",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_workshops_together",
              "false"
            ],
            "_raw": "click | set_field:do_workshops_together:false",
            "_cleaned": "click | set_field:do_workshops_together:false"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_self_care_stepper"
            ],
            "_raw": "click | go_to:w_self_care_stepper",
            "_cleaned": "click | go_to:w_self_care_stepper"
          }
        ],
        "parameter_list": {
          "style": "passive full-width"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_navigation_temporary.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "widget_audio",
    "status": "released",
    "rows": [
      {
        "name": "audio_src",
        "value": "plh_audio/sample.mp3",
        "type": "set_variable"
      },
      {
        "name": "audio_title",
        "value": "Widget title",
        "type": "set_variable"
      },
      {
        "type": "audio",
        "name": "audio_player",
        "value": "@local.audio_src",
        "parameter_list": {
          "title": "@local.audio_title"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_widgets.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_widgets.xlsx"
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
        "type": "timer",
        "name": "timer",
        "parameter_list": {
          "duration_extension": "@local.duration_extension",
          "duration": "@local.duration"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_widgets.xlsx"
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
        "parameter_list": {
          "min": "@local.min_value",
          "min_value_label": "@local.min_text",
          "max": "@local.max_value",
          "max_value_label": "@local.max_text",
          "step": "@local.step",
          "help": "@local.help",
          "title": "@local.title"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_widgets.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_workshop_boxes.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "box_audio",
    "status": "released",
    "rows": [
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
            "type": "set_variable",
            "name": "audio_title",
            "value": "Box title"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_workshop_boxes.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "box_image",
    "status": "released",
    "rows": [
      {
        "type": "image",
        "name": "image_src"
      },
      {
        "type": "title",
        "name": "title",
        "hidden": "true"
      },
      {
        "type": "text",
        "name": "text"
      },
      {
        "type": "text",
        "name": "habit_text",
        "hidden": "true",
        "parameter_list": {
          "alert": "plh_images/icons/star_circle.svg"
        }
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_workshop_boxes.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "box_image_more",
    "status": "released",
    "rows": [
      {
        "type": "image",
        "name": "image_src"
      },
      {
        "type": "title",
        "name": "title",
        "hidden": "true"
      },
      {
        "type": "text",
        "name": "text"
      },
      {
        "type": "text",
        "name": "habit_text",
        "hidden": "true",
        "parameter_list": {
          "alert": "plh_images/icons/star_circle.svg"
        }
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
            "name": "button_completed",
            "value": "@global.more_button",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_workshop_boxes.xlsx"
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
        "hidden": "true",
        "parameter_list": {
          "alert": "plh_images/icons/star_circle.svg"
        }
      },
      {
        "type": "text",
        "name": "bottom_text",
        "hidden": "true"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_workshop_boxes.xlsx"
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
        "type": "button",
        "name": "button",
        "hidden": "true"
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
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_workshop_boxes.xlsx"
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
        "parameter_list": {
          "num_items": "@local.progress_bar_num_items"
        },
        "type": "set_variable"
      },
      {
        "type": "nav_group",
        "name": "nav_template_list"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_workshops.xlsx"
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
            "parameter_list": {
              "background_box": "true"
            }
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
                "name": "button_completed",
                "value": "Let's go!",
                "type": "set_variable"
              },
              {
                "name": "button_uncompleted",
                "value": "Skip",
                "hidden": "true",
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
                "parameter_list": {
                  "background_box": "true"
                }
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
            "parameter_list": {
              "background_box": "true"
            }
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
            "parameter_list": {
              "alert": "plh_images/icons/star_circle.svg"
            }
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_workshops.xlsx"
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
            "value": "@global.ideas_button",
            "hidden": "true",
            "parameter_list": {
              "colour": "secondary"
            }
          },
          {
            "type": "button",
            "name": "button_completed",
            "value": "Done!",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_workshops.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_workshops.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "workshops_navigation_page",
    "status": "released",
    "rows": [
      {
        "type": "display_group",
        "rows": [
          {
            "type": "title",
            "value": "Weekly Workshops",
            "parameter_list": {
              "help": "seme help"
            }
          },
          {
            "type": "button",
            "name": "options_button",
            "value": "Options",
            "action_list": [
              {
                "trigger": "click",
                "action_id": "pop_up",
                "args": [],
                "_raw": "pop_up | workshop_options_popup",
                "_cleaned": "click | pop_up | workshop_options_popup"
              }
            ]
          }
        ]
      },
      {
        "type": "tile_component",
        "name": "quick_start",
        "value": "@local.group_name\nStart @local.next_workshop_name",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "@local.next_workshop"
            ],
            "_raw": "click | go_to : @local.next_workshop",
            "_cleaned": "click | go_to : @local.next_workshop"
          }
        ],
        "hidden": " ",
        "parameter_list": {
          "first_line_text": "My Group",
          "second_line_text": "Start week one",
          "style": "quick_start",
          "icon_src": "plh_images/icons/star.svg"
        },
        "comments": "Not sure how to do this"
      },
      {
        "type": "workshops_accordion",
        "parameter_list": {
          "current_workshop_num": "3"
        },
        "comments": "Could make this more generic name such as\nbegin_accordion_stepper\nBut this would require extra info on syntax for workshop completion / partial completion",
        "rows": [
          {
            "type": "accordion_section",
            "value": 100,
            "parameter_list": {
              "state": "closed",
              "title": "@global.w_self_care_short"
            },
            "rows": [
              {
                "type": "template",
                "name": "workshop_1",
                "value": "nav_w_self_care",
                "rows": []
              }
            ]
          },
          {
            "type": "accordion_section",
            "parameter_list": {
              "state": "closed",
              "title": "Description of week four"
            },
            "rows": [
              {
                "type": "button",
                "name": "btn_example_1",
                "value": "First",
                "parameter_list": {
                  "style": "active"
                }
              }
            ]
          },
          {
            "type": "accordion_section",
            "parameter_list": {
              "state": "closed",
              "status": "uncompleted",
              "title": "Description of week five"
            },
            "rows": [
              {
                "type": "button",
                "name": "btn_example_1",
                "value": "First",
                "parameter_list": {
                  "style": "active"
                }
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_workshops_navigation.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "nav_w_self_care",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text_1",
        "value": "How would you like to access this workshop?"
      },
      {
        "type": "button",
        "name": "group_workshop",
        "value": "As a Group",
        "parameter_list": {
          "style": "active full-width high"
        }
      },
      {
        "type": "button",
        "name": "individual_workshop",
        "value": "As an Individual",
        "parameter_list": {
          "style": "active full-width high"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_workshops_navigation.xlsx"
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
            "value": "plh_images/workshop_modes/group/light_bulb.svg",
            "hidden": "!@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide_2/light_bulb.svg",
            "hidden": "@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "Essential Tools",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "This week’s takeaway skills! Use them at home and find them anytime in your @global.parent_centre",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/essential_tools_activity.xlsx"
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
            "value": "plh_images/workshop_modes/group/with_teen.svg",
            "hidden": "!@field.do_workshops_together",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide_2/with_teen.svg",
            "hidden": "@field.do_workshops_together",
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
            "value": "Small actions, big results! Parents who practice their workshop skills at home get better results. Every day is best!",
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
            "value": "box_buttons",
            "rows": [
              {
                "name": "bottom_text",
                "value": "Next week, you’ll share with your group how your home practice has gone. You can also support and remind each other during the week.",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/home_practice.xlsx"
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
            "name": "activity_banner",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "box_audio",
            "rows": []
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/listen.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "topic_intro",
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
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "type": "nested_properties",
                    "name": "widget_audio",
                    "rows": [
                      {
                        "type": "set_variable",
                        "name": "audio_title",
                        "value": "Hear Sbo's message"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/listen.xlsx"
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
                    "parameter_list": {
                      "\"\"": "true"
                    },
                    "type": "set_variable"
                  },
                  {
                    "name": "answer_list",
                    "value": [
                      "@local.answer_list_1"
                    ],
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
                    "parameter_list": {
                      "\"\"": "true"
                    },
                    "type": "set_variable"
                  },
                  {
                    "name": "answer_list",
                    "value": [
                      "@local.answer_list_2"
                    ],
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/question_time.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/read.xlsx"
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
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/read.xlsx"
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
                "value": "plh_images/workshop_modes/guide2/wave.svg",
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
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/read.xlsx"
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
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/read.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/read.xlsx"
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
            "value": "plh_images/workshop_modes/group/notes.svg",
            "hidden": "!@field.do_workshops_together",
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
            "name": "activity_image",
            "value": "plh_images/workshop_modes/guide2/writing.svg",
            "hidden": "@field.do_workshops_together",
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
            "name": "activity_banner",
            "hidden": "false",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/read.xlsx"
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
            "value": "Let’s do a 30 second relaxation activity together.",
            "hidden": "!@field.do_workshops_together",
            "comments": "placeholder",
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
            "value": "Let’s do a 30 second relaxation activity.",
            "hidden": "@field.do_workshops_together",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "content_box",
            "value": "box_audio",
            "rows": [
              {
                "type": "nested_properties",
                "name": "widget_audio",
                "rows": [
                  {
                    "name": "audio_title",
                    "value": "Listen and relax",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "type": "nested_properties",
                "name": "nav_buttons",
                "rows": [
                  {
                    "name": "button_info",
                    "value": "Read and relax",
                    "hidden": "false",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_completed",
                    "value": "Done!",
                    "comments": "placeholder",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          },
          {
            "name": "outro_text",
            "value": "You are a star! \n\nEvery day recognise something you have done well.\n\nAnd reward yourself with something that makes you happy.\n\nYou matter.",
            "type": "set_variable"
          },
          {
            "name": "outro_habit_text",
            "value": "Click it!",
            "hidden": "false",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/relax.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "talk_together",
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
            "value": "Share ideas, support each other!",
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
            "value": "box_timer",
            "rows": [
              {
                "name": "text",
                "type": "set_variable"
              },
              {
                "name": "button",
                "value": "@global.ideas_button",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/talk_together.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "reflect_together",
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
            "value": "@global.home_practice_problem_solving",
            "comments": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "activity_image",
            "value": "plh_images/workshop_modes/group/talk.svg",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Home practice is how we make our family life better. But it often brings challenges. \n\nLet's share our successes and problems, and help each other find new ideas to try. ",
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
                "value": "@global.more_button",
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
                "value": "Take turns to discuss how your home activities went:\n\n(1) What went well and what was a problem?\n(2) What solutions can you think of together?\n(3) Pick one solution and try it later with your teen! \n\n(Or you can even practice it now so it will be easier later!)",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "widget_timer",
                "rows": [
                  {
                    "name": "duration",
                    "value": 20,
                    "type": "set_variable"
                  }
                ]
              },
              {
                "type": "nested_properties",
                "name": "nav_buttons",
                "rows": [
                  {
                    "name": "button_info",
                    "value": "@global.ideas_button",
                    "hidden": "false",
                    "comments": "This button takes you to the corresponding challenges and solutions flow of the in-week content",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/talk_together.xlsx"
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
            "value": "Start Positively Together",
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
            "name": "content_box",
            "value": "box_timer",
            "rows": [
              {
                "name": "text",
                "value": "Share with each other:\n(-) How are you feeling today? \n(-) What has someone else done well this week? Praise them for it!\n\nRemember that no matter how you feel, it’s great you are here! You all deserve praise!",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/talk_together.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "suggestions",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "description_text",
        "value": "Ideas from other families:"
      },
      {
        "type": "text",
        "name": "list_text"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/talk_together.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "welcome_individual",
    "status": "released",
    "rows": [
      {
        "name": "reply_happy",
        "value": "Wonderful, I am so happy!. Keep up the good work.",
        "type": "set_variable"
      },
      {
        "name": "reply_ok",
        "value": "Sorry that things are difficult . All families struggle. We are here to help!",
        "type": "set_variable"
      },
      {
        "name": "reply_sad",
        "value": "Whatever  went ‘wrong’ today, let it go and try again tomorrow. It’s okay!  ",
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
            "value": "Welcome @field.user_name",
            "__EMPTY": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "It's great to see you again! ",
            "__EMPTY": "placeholder",
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
            "value": "box_radio_buttons",
            "rows": [
              {
                "name": "radio_button_list",
                "value": [
                  "name:Happy | image:plh_images/stickers/faces/happier.svg",
                  "name:OK | image:plh_images/stickers/faces/neutral.svg",
                  "name:Sad | image:plh_images/stickers/faces/sadder.svg"
                ],
                "type": "set_variable"
              },
              {
                "name": "radio_button_type",
                "value": "image",
                "type": "set_variable"
              },
              {
                "name": "question_text",
                "value": "How are you feeling today?",
                "type": "set_variable"
              },
              {
                "name": "reply",
                "value": "@local.reply_happy",
                "hidden": "!@local.radio_buttons._value=Happy",
                "type": "set_variable"
              },
              {
                "name": "reply",
                "value": "@local.reply_ok",
                "hidden": "!@local.radio_buttons._value=OK",
                "type": "set_variable"
              },
              {
                "name": "reply",
                "value": "@local.reply_sad",
                "hidden": "!@local.radio_buttons._value=Sad",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/welcome.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "reflect_individual",
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
            "value": "plh_images/workshop_modes/guide_2/star.svg",
            "type": "set_variable"
          },
          {
            "name": "activity_title",
            "value": "@global.parent_points",
            "__EMPTY": "placeholder",
            "type": "set_variable"
          },
          {
            "name": "intro_text",
            "value": "Let's see how this week has been.",
            "__EMPTY": "placeholder",
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
            "value": "box_parent_points",
            "rows": [
              {
                "name": "top_text",
                "value": "This week you have done...",
                "__EMPTY": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "bottom_text",
                "value": "You are showing such commitment to being a parent and to caring for yourself. You are fantastic.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/welcome.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/welcome.xlsx"
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
                "value": "It's great to see you again! Let’s start with a song for families everywhere.",
                "type": "set_variable"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/welcome.xlsx"
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
                "value": "Well done!",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "activity_image",
                "value": "plh_images/workshop_modes/group/cup.svg",
                "hidden": "!@field.do_workshops_together",
                "type": "set_variable"
              },
              {
                "name": "activity_image",
                "value": "plh_images/workshop_modes/guide_2/cup.svg",
                "hidden": "@field.do_workshops_together",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "You’ve completed this week’s workshop. See you soon.",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "intro_nav_buttons",
                "rows": [
                  {
                    "name": "button_completed",
                    "value": "Goodbye!",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/mode_templates/welcome.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_go_to_nest_top",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text",
        "value": "This text is followed by the template debug_go_to_nest_bottom"
      },
      {
        "type": "template",
        "name": "name_debug_go_to_nest_bottom",
        "value": "debug_go_to_nest_bottom",
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_go_to_nested.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_go_to_nest_bottom",
    "status": "released",
    "rows": [
      {
        "type": "button",
        "name": "button",
        "value": "Go to example_emit and come back",
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
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_go_to_nested.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_pop_ups_override",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "example_pop_ups",
        "value": "example_pop_ups",
        "rows": [
          {
            "name": "text_1",
            "value": "This is template shows how buttons can be overwritten.",
            "type": "set_variable"
          },
          {
            "name": "text_2",
            "value": "Button 1 has a new button text, but the action_list is unaltered.",
            "type": "set_variable"
          },
          {
            "name": "button_pop_up_1",
            "value": "New Button 1 ",
            "type": "set_variable"
          },
          {
            "name": "text_3",
            "value": "Button 2 has an altered action_list. It now launches a simple text pop-up.",
            "type": "set_variable"
          },
          {
            "name": "button_pop_up_2",
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
            "type": "set_variable"
          },
          {
            "name": "text_4",
            "value": "Button 3 is unaltered. ",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_nesting_variables",
    "status": "released",
    "rows": [
      {
        "name": "local_text_2",
        "value": "Success: text_2",
        "comments": "variables declared can be used anywhere on the sheet, including in child templates",
        "__EMPTY": "declare_variable",
        "type": "set_variable"
      },
      {
        "name": "global_text",
        "value": "@global.debug_variable_1",
        "comments": "declared variables will not be overwritten by parents",
        "__EMPTY": "declare_variable",
        "type": "set_variable"
      },
      {
        "name": "local_text_4",
        "value": "Success: text_4",
        "__EMPTY": "declare_variable",
        "type": "set_variable"
      },
      {
        "type": "template",
        "name": "debug_two_texts",
        "value": "debug_two_texts",
        "rows": [
          {
            "type": "set_variable",
            "name": "child_text_1",
            "value": "Success: text_1"
          },
          {
            "type": "set_variable",
            "name": "child_text_2",
            "value": "Expected: \"Success: text_2\"\nResult: @local.local_text_2"
          },
          {
            "type": "set_variable",
            "name": "child_text_3",
            "value": "Expected: global.debug_variable_1 lookup\nResult: @local.global_text"
          },
          {
            "type": "set_variable",
            "name": "child_local_variable",
            "value": "Success: nesting local variable"
          }
        ]
      },
      {
        "type": "text",
        "name": "text_3",
        "value": "Success: text_3"
      },
      {
        "type": "text",
        "name": "text_4",
        "value": "Expected: \"Success: text_4\" \nResult: @local.local_text_4"
      },
      {
        "type": "text",
        "name": "text_5",
        "value": "Expected: global.debug_variable_1 lookup\nResult: @local.global_text"
      },
      {
        "type": "text",
        "name": "text_6",
        "value": "Global text test: @global.debug_variable_1"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_two_texts",
    "status": "released",
    "rows": [
      {
        "name": "child_local_variable",
        "value": "Failed: \"local_variable_1\"",
        "comments": "declare_variable",
        "type": "set_variable"
      },
      {
        "type": "text",
        "name": "child_text_1",
        "value": "Failed: \"text_1\""
      },
      {
        "type": "text",
        "name": "child_text_2",
        "value": "Failed: \"text_2\""
      },
      {
        "type": "text",
        "name": "child_text_3",
        "value": "Falied: \"text_global\""
      },
      {
        "type": "text",
        "name": "child_text_4",
        "value": "@local.child_local_variable"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_nesting_variables_global",
    "status": "released",
    "rows": [
      {
        "name": "var_text_2",
        "value": "This is text_2",
        "comments": "declare_variable",
        "type": "set_variable"
      },
      {
        "name": "var_text_4",
        "value": "This is text_4",
        "comments": "declare_variable",
        "type": "set_variable"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx"
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
      },
      {
        "type": "text",
        "name": "my_text",
        "value": "This is My Text"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_timer_icons_1",
    "status": "released",
    "rows": [
      {
        "type": "timer",
        "name": "timer",
        "parameter_list": {
          "duration_extension": "1",
          "duration": "10"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
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
        "name": "debug_variable_four",
        "value": "Value of the fourth debug variable",
        "type": "set_variable"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_set_local_image",
    "status": "released",
    "rows": [
      {
        "name": "debug_variable",
        "value": "plh_images/workshop_modes/guide_2/wave.svg",
        "type": "set_variable"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_text",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text_1",
        "value": "Some text"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_hidden",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "box_1",
        "value": "debug_text",
        "rows": [
          {
            "name": "text_1",
            "value": "First row: This text is hidden",
            "hidden": "true",
            "type": "set_variable"
          },
          {
            "name": "text_1",
            "value": "Second row: This text is visible",
            "hidden": "false",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "template",
        "name": "box_2",
        "value": "debug_text",
        "rows": [
          {
            "name": "text_1",
            "value": "First row: This text is visible",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "name": "text_1",
            "value": "Second row: This text is hidden",
            "hidden": "true",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_audio_1",
    "status": "released",
    "rows": [
      {
        "type": "audio",
        "name": "audio_src",
        "value": "plh_audio/sample.mp3",
        "parameter_list": {
          "title": "Test title"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
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
        "hidden": "@local.var_number_1 == 1"
      },
      {
        "type": "text",
        "name": "number_not_1",
        "value": "This text is hidden if var_number_1 not 1.",
        "hidden": "@local.var_number_1 != 1"
      },
      {
        "type": "text",
        "name": "number_greater_1",
        "value": "This text is hidden if var_number_1 is greater than 1.",
        "hidden": "@local.var_number_1 > 1"
      },
      {
        "type": "text",
        "name": "number_not_1",
        "value": "This text is hidden if var_number_1 is not greater than 1.",
        "hidden": "!(@local.var_number_1 > 1)"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
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
        "value": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
        "parameter_list": {
          "style": "standart primary",
          "text_align": "center"
        }
      },
      {
        "type": "text",
        "name": "text_2",
        "value": "This is the first line in first 'paragraph'.\nThis is the second line in first 'paragraph'.\n",
        "parameter_list": {
          "style": "small",
          "text_align": "left"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "debug_print_global",
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
                "value": "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
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
                    "value": "plh_images/workshops/instruct/read_1/slide_1.svg",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "@global.w_instruct_female_caregiver @global.w_instruct_teen_girl @global.parent_point @global.w_instruct @global.guide_teen_name",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_small_issues.xlsx"
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
        "value": "Go to x",
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
        "comments": "This returns to the current template and completes the current template if it returns completed or does nothing if example_emit emits uncompleted"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_actions.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_actions.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_pop_ups",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text_1",
        "value": "This is the main template demonstrating three types of pop-ups."
      },
      {
        "type": "text",
        "name": "text_2",
        "value": "Button 1 is a simple text pop-up:"
      },
      {
        "type": "button",
        "name": "button_pop_up_1",
        "value": "Button 1",
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
        "type": "text",
        "name": "text_3",
        "value": "Button 2 (example_go_to_2) dismisses on all:"
      },
      {
        "type": "button",
        "name": "button_pop_up_2",
        "value": "Button 2",
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
        "comments": "This launches a popup with navigation. Return actions will be ignored (no complete/uncomplete handling), and popup will close on return"
      },
      {
        "type": "text",
        "name": "text_4",
        "value": "Button 3 (example_go_to_3) dismisses on completed:"
      },
      {
        "type": "button",
        "name": "button_pop_up_3",
        "value": "Button 3",
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
        "comments": "This launches a popup with navigation. As there is a completed listener it will stay open until that is received"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_actions.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_actions.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_go_to_2",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text_1",
        "value": "Button 1: Go to example emit"
      },
      {
        "type": "button",
        "name": "button_go_to_1",
        "value": "Button 1",
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
        "type": "text",
        "name": "text_2",
        "value": "Button 2: Go to example_emit and mark as completed"
      },
      {
        "type": "button",
        "name": "button_go_to_2",
        "value": "Button 2",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_actions.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_go_to_3",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text_1",
        "value": "Button 1: Go to example_emit and emit completed"
      },
      {
        "type": "button",
        "name": "button_go_to",
        "value": "Button 1",
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
        "comments": "This does not return to the current template after finishing example_emit as there is no completed/uncompleted action"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_actions.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_component_variables",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "example_1a",
        "value": "Basic Example"
      },
      {
        "type": "text",
        "name": "example_1b",
        "value": "The text above is: @local.example_1a"
      },
      {
        "name": "answer_list",
        "value": [
          "name:name_var_1 | text:Option 1",
          "name:name_var_2 | text: Option 2",
          "name:name_var_3 | text: Option 3"
        ],
        "type": "set_variable"
      },
      {
        "type": "radio_group",
        "name": "option_buttons",
        "parameter_list": {
          "radio_button_type": "btn_text",
          "answer_list": "@local.answer_list",
          "style": "passive"
        }
      },
      {
        "type": "text",
        "name": "text_with_option",
        "value": "The option currently selecte is @local.option_buttons"
      },
      {
        "type": "text",
        "name": "text_option_1",
        "value": "This is the text to show if option 1 is selected",
        "hidden": "\"@local.option_buttons\"==\"name_var_1\""
      },
      {
        "type": "text",
        "name": "text_option_2",
        "value": "This is the text to show if option 2 is selected",
        "hidden": "\"@local.option_buttons\"==\"name_var_2\""
      },
      {
        "type": "text",
        "name": "text_option_3",
        "value": "This is the text to show if option 3 is selected",
        "hidden": "\"@local.option_buttons\"==\"name_var_3\""
      },
      {
        "name": "output_fieldname",
        "value": "this_will_be_overwritten",
        "type": "set_variable"
      },
      {
        "type": "radio_group",
        "name": "option_buttons_2"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_component_variables.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_double_ref_comp_var",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "first_template",
        "value": "example_component_variables",
        "rows": []
      },
      {
        "type": "template",
        "name": "second_template",
        "value": "example_component_variables",
        "rows": []
      },
      {
        "type": "text",
        "name": "text_with_double_ref_options",
        "value": "text should be what is in the comment",
        "comments": "Finding nested valeus for the first @first_template.option_buttons._value and the second @second_template.option_buttons._value "
      },
      {
        "comments": "Long term (access nested row value)",
        "type": "set_variable"
      },
      {
        "comments": "@first_template.option_buttons",
        "type": "set_variable"
      },
      {
        "comments": "Short term (set a variable that can be overwritten and accessed)",
        "type": "set_variable"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_component_variables.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_nested_comp_var",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "nested_options_template",
        "value": "example_double_ref_comp_var",
        "rows": [
          {
            "type": "nested_properties",
            "name": "first_template",
            "value": "example_component_variables",
            "rows": [
              {
                "name": "answer_list",
                "value": [
                  "name:name_var_1 | text:Option a",
                  "name:name_var_2 | text: Option b",
                  "name:name_var_3 | text: Option c"
                ],
                "type": "set_variable"
              }
            ]
          }
        ]
      },
      {
        "type": "text",
        "name": "text_with_nested_options",
        "value": "text should be what is in the comment",
        "comments": "Finding nested vales for the first @nested_options_template.first_template.option_buttons._value and the second @nested_options_template.second_template.option_buttons._value "
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_component_variables.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_global_field.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_global_field.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_widget_audio_def",
    "status": "released",
    "rows": [
      {
        "type": "audio",
        "name": "audio_1",
        "value": "plh_audio/sample.mp3"
      },
      {
        "name": "help_text",
        "value": "This is the text for the questionmark icon",
        "type": "set_variable"
      },
      {
        "type": "audio",
        "name": "audio_2",
        "parameter_list": {
          "src": "plh_audio/sample.mp3",
          "title": "New Title Test",
          "help": "@local.help_text",
          "rangeBarDisabled": "true",
          "timeToRewind": "2"
        }
      },
      {
        "type": "audio",
        "name": "audio_3",
        "value": "plh_audio/sample.mp3",
        "parameter_list": {
          "title": "New Title Test",
          "help": "@local.help_text",
          "rangeBarDisabled": "true",
          "timeToRewind": "2"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_widgets.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_widget_nesting_audio",
    "status": "released",
    "rows": [
      {
        "name": "source_file",
        "value": "plh_audio/sample.mp3",
        "type": "set_variable"
      },
      {
        "name": "title_name",
        "value": "This title has been overridden correctly",
        "type": "set_variable"
      },
      {
        "name": "help_msg",
        "value": "This help message has been overriden correctly",
        "type": "set_variable"
      },
      {
        "name": "no_range_bar",
        "value": "true",
        "type": "set_variable"
      },
      {
        "name": "rew_time",
        "value": 12,
        "type": "set_variable"
      },
      {
        "type": "template",
        "name": "overridden_audio",
        "value": "example_widget_audio_def",
        "rows": [
          {
            "name": "audio_1",
            "value": "@local.source_file",
            "parameter_list": {
              "title": "@local.title_name"
            },
            "type": "set_variable"
          },
          {
            "name": "audio_2",
            "hidden": "true",
            "type": "set_variable"
          }
        ]
      },
      {
        "type": "audio",
        "name": "audio_3",
        "parameter_list": {
          "title": "@local.title_name",
          "src": "@local.source_file",
          "help": "@local.help_msg",
          "rangeBarDisabled": "@local.no_range_bar",
          "timeToRewind": "@local.rew_time"
        }
      },
      {
        "type": "text",
        "name": "helping_text",
        "value": "@local.title_name"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_widgets.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_widget_combo_box",
    "status": "released",
    "rows": [
      {
        "name": "question_text",
        "value": "This is the question",
        "type": "set_variable"
      },
      {
        "name": "answers_list",
        "value": [
          "[Option 1",
          "Option 2",
          "Option 3]"
        ],
        "type": "set_variable"
      },
      {
        "type": "text",
        "name": "question",
        "value": "@local.question_text"
      },
      {
        "type": "combo_box",
        "name": "combo_box_1",
        "parameter_list": {
          "text": "@local.question_text",
          "input_allowed": "true",
          "input_position": "top",
          "placeholder": "Answer Prompt",
          "answer_placeholder": "Enter Your Own Answer",
          "answers_list": "@local.answers_list"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_widgets.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "example_widget_radio_button_box",
    "status": "released",
    "rows": [
      {
        "name": "answer_list",
        "value": [
          "name:name_var_1 | text:happy",
          "name:name_var_2 | text: ok",
          "name:name_var_3 | text: sad"
        ],
        "type": "set_variable"
      },
      {
        "type": "radio_group",
        "name": "radio_group_square_ex_1",
        "parameter_list": {
          "radio_button_type": "btn_triangle",
          "answer_list": "@local.answer_list",
          "style": "passive"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_widgets.xlsx"
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
        "parameter_list": {
          "theme": "@global.theme"
        },
        "rows": [
          {
            "name": "nav_template_list",
            "value": [
              "w_example_welcome_together",
              "w_example_listen",
              "w_example_read",
              "w_example_talk_together",
              "w_example_tools_activity",
              "w_example_home_practice",
              "w_example_ending"
            ],
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
            "value": [
              "w_example_listen"
            ],
            "comments": "w_example_listen;\nw_example_read;\nw_example_question_time;\nw_example_tools_activity;\nw_example_home_practice;\nw_example_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_workshop.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_workshop.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_workshop.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_workshop.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_workshop.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_workshop.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_workshop.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_workshop.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_workshop.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_tile",
    "status": "released",
    "rows": [
      {
        "comments": "Frame # 538",
        "type": "set_variable"
      },
      {
        "type": "tile_component",
        "name": "tile_example_1",
        "parameter_list": {
          "icon_src": "plh_images/icons/star.svg",
          "first_line_text": "First item text",
          "second_line_text": "Second item text",
          "style": "quick_start_passive"
        }
      },
      {
        "name": "icon_src",
        "type": "set_variable"
      },
      {
        "name": "first_line_text",
        "type": "set_variable"
      },
      {
        "name": "second_line_text",
        "type": "set_variable"
      },
      {
        "name": "style",
        "type": "set_variable"
      },
      {
        "type": "tile_component",
        "name": "tile_example_2",
        "parameter_list": {
          "first_line_text": "Second item text",
          "second_line_text": "Second item text",
          "style": "quick_start"
        }
      },
      {
        "name": "first_line_text",
        "type": "set_variable"
      },
      {
        "name": "second_line_text",
        "type": "set_variable"
      },
      {
        "name": "style",
        "type": "set_variable"
      },
      {
        "type": "tile_component",
        "name": "tile_example_3",
        "parameter_list": {
          "first_line_text": "Third item text",
          "second_line_text": "Third item text",
          "style": "quick_start_blue"
        }
      },
      {
        "name": "first_line_text",
        "type": "set_variable"
      },
      {
        "name": "second_line_text",
        "type": "set_variable"
      },
      {
        "name": "style",
        "type": "set_variable"
      },
      {
        "type": "tile_component",
        "name": "tile_example_3",
        "parameter_list": {
          "first_line_text": "Fourth item text",
          "second_line_text": "Fourth item text",
          "style": "quick_start_red"
        }
      },
      {
        "name": "first_line_text",
        "type": "set_variable"
      },
      {
        "name": "second_line_text",
        "type": "set_variable"
      },
      {
        "name": "style",
        "type": "set_variable"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_timer",
    "status": "released",
    "rows": [
      {
        "name": "help_text",
        "value": "some help",
        "type": "set_variable"
      },
      {
        "type": "timer",
        "name": "timer_with_help",
        "parameter_list": {
          "help": "@local.help_text",
          "title": "with help"
        }
      },
      {
        "type": "timer",
        "name": "timer_is_editable_on_playing",
        "parameter_list": {
          "help": "@local.help_text",
          "title": "is editable on playing",
          "is_editable_on_playing": "true"
        }
      },
      {
        "type": "timer",
        "name": "timer_with_starting_minutes_5",
        "parameter_list": {
          "help": "@local.help_text",
          "title": "with starting minutes 5",
          "starting_minutes": "5"
        }
      },
      {
        "type": "timer",
        "name": "timer_with_starting_seconds_20",
        "parameter_list": {
          "help": "@local.help_text",
          "title": "with starting seconds 20",
          "starting_seconds": "20"
        }
      },
      {
        "type": "timer",
        "name": "timer_with_duration_extension_2",
        "parameter_list": {
          "help": "@local.help_text",
          "title": "with duration_extension 2",
          "duration_extension": "2"
        },
        "comments": "there is a problem when we extend by more than one minute, the icon doesn`t change "
      },
      {
        "type": "timer",
        "name": "timer_with_value",
        "value": 5,
        "parameter_list": {
          "help": "@local.help_text",
          "title": "with value 5"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_slider",
    "status": "released",
    "rows": [
      {
        "name": "help_text",
        "value": "some help",
        "type": "set_variable"
      },
      {
        "type": "slider",
        "name": "slider_with_help",
        "parameter_list": {
          "help": "@local.help_text",
          "min": "0",
          "max": "7",
          "title": "test title",
          "min_value_label": "0",
          "max_value_label": "7",
          "labels_count": "8",
          "no_value": "false"
        }
      },
      {
        "type": "slider",
        "name": "slider_without_help",
        "parameter_list": {
          "min": "0",
          "max": "7",
          "title": "without help",
          "min_value_label": "0",
          "max_value_label": "7",
          "labels_count": "8",
          "no_value": "false"
        }
      },
      {
        "type": "slider",
        "name": "slider_with_value_2",
        "value": 2,
        "parameter_list": {
          "help": "@local.help_text",
          "min": "0",
          "max": "7",
          "title": "with value 2",
          "min_value_label": "0",
          "max_value_label": "7",
          "labels_count": "8",
          "no_value": "false"
        }
      },
      {
        "type": "slider",
        "name": "slider_with_step_2",
        "parameter_list": {
          "help": "@local.help_text",
          "min": "0",
          "max": "8",
          "title": "step = 2",
          "step": "2",
          "min_value_label": "0",
          "max_value_label": "8",
          "labels_count": "8",
          "no_value": "false"
        }
      },
      {
        "type": "slider",
        "name": "slider_without_value",
        "parameter_list": {
          "help": "@local.help_text",
          "min": "0",
          "max": "7",
          "title": "no value",
          "min_value_label": "0",
          "max_value_label": "7",
          "labels_count": "8",
          "no_value": "true"
        }
      },
      {
        "type": "slider",
        "name": "slider_without_max_3",
        "parameter_list": {
          "min": "0",
          "help": "@local.help_text",
          "max": "3",
          "title": "with max = 3",
          "min_value_label": "0",
          "max_value_label": "3",
          "labels_count": "8",
          "no_value": "false"
        }
      },
      {
        "type": "slider",
        "name": "slider_without_value_labels",
        "parameter_list": {
          "min": "0",
          "help": "@local.help_text",
          "max": "3",
          "title": "without value labels",
          "no_value": "false"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_text_box",
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
        "parameter_list": {
          "blank_display_text": "@local.blank_display_text",
          "help": "some help text"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_combo_box",
    "status": "released",
    "rows": [
      {
        "name": "answer_list",
        "value": [
          "First",
          "Second",
          "Third"
        ],
        "type": "set_variable"
      },
      {
        "type": "combo_box",
        "name": "combo_box_defaults",
        "parameter_list": {
          "answer_list": "@local.answer_list"
        }
      },
      {
        "type": "combo_box",
        "name": "combo_box_text_in_pop_up",
        "parameter_list": {
          "answer_list": "@local.answer_list",
          "text": "Text above the answers"
        }
      },
      {
        "type": "combo_box",
        "name": "combo_box_with_placeholder",
        "parameter_list": {
          "answer_list": "@local.answer_list",
          "placeholder": "Click here to answer"
        },
        "comments": "Placeholder should look different from preselected answer"
      },
      {
        "type": "combo_box",
        "name": "combo_box_allow_input",
        "parameter_list": {
          "answer_list": "@local.answer_list",
          "placeholder": "Click here to answer",
          "input_allowed": "true",
          "answer_placeholder": "Type your own"
        }
      },
      {
        "type": "combo_box",
        "name": "combo_box_preselected",
        "value": "First",
        "parameter_list": {
          "answer_list": "@local.answer_list"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_radio_group",
    "status": "released",
    "rows": [
      {
        "name": "answer0_list",
        "value": [
          "name:name_var_1 | text:Single | image:/plh_images/icons/heart.svg | image_checked: /plh_images/icons/tick.svg",
          "name:name_var_2 | text:Pair | image:/plh_images/icons/heart.svg | image_checked: /plh_images/icons/tick.svg"
        ],
        "type": "set_variable"
      },
      {
        "name": "options_per_row",
        "value": 2,
        "comments": "if you have more options than this number you have multiple rows",
        "type": "set_variable"
      },
      {
        "name": "radio_button_type",
        "value": "btn_square",
        "type": "set_variable"
      },
      {
        "type": "radio_group",
        "name": "radio_group_square",
        "value": "Pair",
        "parameter_list": {
          "radio_button_type": "btn_square",
          "answer_list": "@local.answer0_list",
          "options_per_row": "@local.options_per_row",
          "style": "active"
        }
      },
      {
        "name": "answer1_list",
        "value": [
          "name:name_var_1 | text:Woman | image:/plh_images/icons/heart.svg",
          "name:name_var_2 | text:Man | image:/plh_images/icons/heart.svg"
        ],
        "type": "set_variable"
      },
      {
        "name": "radio_button_type",
        "value": "btn_square",
        "type": "set_variable"
      },
      {
        "type": "radio_group",
        "name": "radio_group_square_ex1",
        "value": "Black",
        "parameter_list": {
          "radio_button_type": "btn_text",
          "answer_list": "@local.answer2_list",
          "options_per_row": "3",
          "style": "passive"
        }
      },
      {
        "name": "answer2_list",
        "value": [
          "name:name_var_1 | text:Black| image:/plh_images/icons/heart.svg",
          "name:name_var_2| image:/plh_images/icons/heart.svg | text:White",
          "name:name_var_2| image:/plh_images/icons/heart.svg | text:Blue"
        ],
        "type": "set_variable"
      },
      {
        "name": "radio_button_type",
        "value": "btn_text",
        "type": "set_variable"
      },
      {
        "type": "radio_group",
        "name": "radio_group_square_ex2",
        "value": "Black",
        "parameter_list": {
          "radio_button_type": "@local.radio_button_type",
          "answer_list": "@local.answer2_list",
          "options_per_row": "@local.options_per_row"
        }
      },
      {
        "name": "answer3_list",
        "value": [
          "name:name_var_1 | text:Smile | image:/plh_images/icons/heart.svg",
          "name:name_var_1 | text: Sad | image:/plh_images/icons/heart.svg"
        ],
        "type": "set_variable"
      },
      {
        "type": "radio_group",
        "name": "radio_group_square_ex3",
        "value": "Smile",
        "parameter_list": {
          "radio_button_type": "btn_icon",
          "answer_list": "@local.answer3_list",
          "options_per_row": "@local.options_per_row"
        }
      },
      {
        "type": "text",
        "name": "text_result_ex_1",
        "value": "@local.radio_group_square_ex1"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_radio_group_2",
    "status": "released",
    "rows": [
      {
        "name": "answer_list_1",
        "value": [
          "name:name_var_1 | text:First | image:/plh_images/icons/heart.svg | image_checked: /plh_images/icons/tick.svg",
          "name:name_var_2 | text:Second | image:/plh_images/icons/heart.svg | image_checked: /plh_images/icons/tick.svg",
          "name:name_var_1 | text: Third | image:/plh_images/icons/heart.svg | image_checked: /plh_images/icons/tick.svg",
          "name:name_var_2 | text:Fourth | image:/plh_images/icons/heart.svg | image_checked: /plh_images/icons/tick.svg"
        ],
        "comments": "Suggestion: \n\nradio_button_type: btn_text (default), btn_image, btn_both\nstyle: passive (default), active, outline\noptions_per_row: 3 (default), 2, 1\nSelection should be done by name, not by text\n\n",
        "type": "set_variable"
      },
      {
        "name": "answer_list_2",
        "value": [
          "name:name_var_1 | text:First | image:/plh_images/icons/heart.svg",
          "name:name_var_2 | text:Second | image:/plh_images/icons/heart.svg"
        ],
        "type": "set_variable"
      },
      {
        "name": "answer_list_3",
        "value": [
          "name:name_var_1 | text:First | image:/plh_images/icons/heart.svg | image_checked: /plh_images/icons/tick.svg",
          "name:name_var_2 | text:Second | image:/plh_images/icons/heart.svg | image_checked: /plh_images/icons/tick.svg"
        ],
        "type": "set_variable"
      },
      {
        "name": "answer_list_4",
        "value": [
          "text:First",
          "text:Second",
          "text:Third"
        ],
        "type": "set_variable"
      },
      {
        "name": "answer_list_5",
        "value": [
          "name:name_var_1 | image:/plh_images/icons/heart.svg",
          "name:name_var_2 | image:/plh_images/icons/star_outline.svg"
        ],
        "type": "set_variable"
      },
      {
        "type": "radio_group",
        "name": "radio_group_defaults",
        "parameter_list": {
          "answer_list": "@local.answer_list_1"
        },
        "comments": "default radio_button_type: btn_text"
      },
      {
        "type": "radio_group",
        "name": "radio_group_preselected",
        "value": "Second",
        "parameter_list": {
          "answer_list": "@local.answer_list_1"
        }
      },
      {
        "type": "radio_group",
        "name": "radio_group_active",
        "value": "name_var_2",
        "parameter_list": {
          "answer_list": "@local.answer_list_1",
          "style": "active"
        },
        "comments": "This should use the name, not the text (otherwise it doesn't work for images without text)"
      },
      {
        "type": "radio_group",
        "name": "radio_group_two_per_row",
        "parameter_list": {
          "answer_list": "@local.answer_list_1",
          "options_per_row": "2"
        }
      },
      {
        "type": "radio_group",
        "name": "radio_group_both",
        "parameter_list": {
          "radio_button_type": "btn_square",
          "answer_list": "@local.answer_list_2"
        },
        "comments": "radio_button_type: btn_both;\nanswer_list: @local.answer_list_2;"
      },
      {
        "type": "radio_group",
        "name": "radio_group_both_with_tick",
        "parameter_list": {
          "radio_button_type": "btn_square",
          "answer_list": "@local.answer_list_3"
        },
        "comments": "radio_button_type: btn_both;\nanswer_list: @local.answer_list_3;"
      },
      {
        "type": "radio_group",
        "name": "radio_group_both_active",
        "parameter_list": {
          "radio_button_type": "btn_square",
          "answer_list": "@local.answer_list_2",
          "style": "active"
        },
        "comments": "radio_button_type: btn_both;\nanswer_list: @local.answer_list_2;\nstyle:active;"
      },
      {
        "type": "radio_group",
        "name": "radio_group_both_active_with_tick",
        "parameter_list": {
          "radio_button_type": "btn_square",
          "answer_list": "@local.answer_list_3",
          "style": "active"
        },
        "comments": "radio_button_type: btn_both;\nanswer_list: @local.answer_list_3;\nstyle:active;"
      },
      {
        "type": "radio_group",
        "name": "radio_group_both_outline",
        "parameter_list": {
          "radio_button_type": "btn_icon",
          "answer_list": "@local.answer_list_2"
        },
        "comments": "radio_button_type: btn_both;\nanswer_list: @local.answer_list_2;\nstyle:outline;"
      },
      {
        "type": "radio_group",
        "name": "radio_group_both_outline_with_tick",
        "parameter_list": {
          "radio_button_type": "btn_icon",
          "answer_list": "@local.answer_list_3"
        },
        "comments": "radio_button_type: btn_both;\nanswer_list: @local.answer_list_3;\nstyle:outline;"
      },
      {
        "type": "radio_group",
        "name": "radio_group_text",
        "parameter_list": {
          "answer_list": "@local.answer_list_4"
        }
      },
      {
        "type": "radio_group",
        "name": "radio_group_image",
        "parameter_list": {
          "radio_button_type": "btn_square",
          "answer_list": "@local.answer_list_5"
        },
        "comments": "radio_button_type: btn_image; \nanswer_list: @local.answer_list_5;"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_display_group",
    "status": "released",
    "rows": [
      {
        "type": "display_group",
        "name": "example_dp_gr",
        "parameter_list": {
          "style": "light_orange"
        },
        "style_list": [
          "margin: 10px 15px",
          "min_height: 40px"
        ],
        "rows": [
          {
            "type": "title",
            "name": "title_ex_s",
            "value": "Example title light_orange",
            "parameter_list": {
              "style": "primary"
            },
            "style_list": [
              "margin: 10px 10px"
            ]
          },
          {
            "type": "text",
            "name": "text_ex_text",
            "value": "Text for display light_orange",
            "parameter_list": {
              "text_align": "center"
            }
          }
        ]
      },
      {
        "type": "display_group",
        "name": "dg_example_2",
        "parameter_list": {
          "style": "orange"
        },
        "style_list": [
          "margin: 10px 15px",
          "min_height: 40px"
        ],
        "rows": [
          {
            "type": "title",
            "name": "title_ex_s",
            "value": "Example title orange",
            "parameter_list": {
              "style": "primary"
            },
            "style_list": [
              "margin: 10px 10px"
            ]
          },
          {
            "type": "text",
            "name": "text_ex_text",
            "value": "Text for display orange",
            "parameter_list": {
              "text_align": "right"
            }
          }
        ]
      },
      {
        "type": "display_group",
        "name": "dg_example_3",
        "parameter_list": {
          "style": "light_blue"
        },
        "style_list": [
          "margin: 10px 15px",
          "min_height: 40px"
        ],
        "rows": [
          {
            "type": "title",
            "name": "title_ex_s",
            "value": "Example title light_blue",
            "parameter_list": {
              "style": "primary"
            },
            "style_list": [
              "margin: 10px 10px"
            ]
          },
          {
            "type": "text",
            "name": "text_ex_text",
            "value": "Text for display light_blue",
            "parameter_list": {
              "text_align": "left"
            }
          }
        ]
      },
      {
        "type": "display_group",
        "name": "dg_example_4",
        "parameter_list": {
          "style": "blue"
        },
        "style_list": [
          "margin: 10px 15px",
          "min_height: 40px"
        ],
        "rows": [
          {
            "type": "title",
            "name": "title_ex_s",
            "value": "Example title blue",
            "parameter_list": {
              "style": "primary"
            },
            "style_list": [
              "margin: 10px 10px"
            ]
          },
          {
            "type": "text",
            "name": "text_ex_text",
            "value": "Text for display blue",
            "parameter_list": {
              "text_align": "center"
            }
          }
        ]
      },
      {
        "type": "display_group",
        "name": "dg_example_6",
        "parameter_list": {
          "style": "dark_blue"
        },
        "style_list": [
          "margin: 10px 15px",
          "min_height: 40px"
        ],
        "rows": [
          {
            "type": "title",
            "name": "title_ex_s",
            "value": "Example title dark_blue",
            "parameter_list": {
              "style": "primary"
            },
            "style_list": [
              "margin: 10px 10px"
            ]
          },
          {
            "type": "text",
            "name": "text_ex_text",
            "value": "Text for display dark_blue",
            "parameter_list": {
              "text_align": "right"
            }
          }
        ]
      },
      {
        "type": "display_group",
        "name": "dg_example_7",
        "parameter_list": {
          "style": "banner_active",
          "offset": "30"
        },
        "style_list": [
          "margin: 10px 15px",
          "min_height: 40px"
        ],
        "rows": [
          {
            "type": "title",
            "name": "title_ex_s",
            "value": "Example title with offset",
            "parameter_list": {
              "style": "primary"
            },
            "style_list": [
              "margin: 10px 10px"
            ]
          },
          {
            "type": "image",
            "name": "image",
            "value": "plh_images/characters/group/talk_together.png",
            "style_list": [
              "max-width: 250px"
            ]
          }
        ]
      },
      {
        "type": "display_group",
        "name": "dg_example_8",
        "parameter_list": {
          "style": "white_box"
        },
        "style_list": [
          "margin: 10px 15px",
          "min_height: 40px"
        ],
        "rows": [
          {
            "type": "title",
            "name": "title_ex_s",
            "value": "Example title white box",
            "parameter_list": {
              "style": "primary"
            },
            "style_list": [
              "margin: 10px 10px"
            ]
          },
          {
            "type": "text",
            "name": "text_ex_text",
            "value": "Text for display white box",
            "parameter_list": {
              "text_align": "left"
            }
          }
        ]
      },
      {
        "type": "display_group",
        "name": "dg_example_8",
        "parameter_list": {
          "style": "white_box"
        },
        "style_list": [
          "margin: 10px 15px",
          "min_height: 40px"
        ],
        "rows": [
          {
            "type": "title",
            "name": "title_ex_s",
            "value": "Example title white box",
            "parameter_list": {
              "style": "primary"
            },
            "style_list": [
              "margin: 10px 10px"
            ]
          },
          {
            "type": "text",
            "name": "text_ex_text",
            "value": "Text for display white box",
            "parameter_list": {
              "text_align": "left"
            }
          }
        ]
      },
      {
        "type": "display_group",
        "name": "dg_example_8",
        "parameter_list": {
          "style": "navigation"
        },
        "style_list": [
          "margin: 10px 15px",
          "min_height: 40px"
        ],
        "rows": [
          {
            "type": "button",
            "name": "btn_example",
            "value": "Continue",
            "parameter_list": {
              "style": "blue"
            }
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_title",
    "status": "released",
    "rows": [
      {
        "type": "title",
        "name": "title_debug_with_help_tooltip",
        "value": "text title1",
        "parameter_list": {
          "help": "some help",
          "tooltip_position": "right",
          "text_align": "left",
          "style": "primary"
        }
      },
      {
        "type": "title",
        "name": "title_debug_without_help_tooltip",
        "value": "text title2",
        "parameter_list": {
          "text_align": "left",
          "style": "primary"
        }
      },
      {
        "type": "title",
        "name": "title_debug_text_aligh_center",
        "value": "text title3",
        "parameter_list": {
          "help": "some help",
          "tooltip_position": "right",
          "text_align": "center",
          "style": "primary"
        }
      },
      {
        "type": "title",
        "name": "title_debug_text_aligh_left",
        "value": "text title4",
        "parameter_list": {
          "help": "some help",
          "tooltip_position": "right",
          "text_align": "left",
          "style": "primary"
        }
      },
      {
        "type": "title",
        "name": "title_debug_text_aligh_right",
        "value": "text title5",
        "parameter_list": {
          "help": "some help",
          "tooltip_position": "right",
          "text_align": "right",
          "style": "primary"
        }
      },
      {
        "type": "title",
        "name": "title_debug_style_white",
        "value": "text title6",
        "parameter_list": {
          "help": "some help",
          "tooltip_position": "right",
          "text_align": "left",
          "style": "white"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_buttons",
    "status": "released",
    "rows": [
      {
        "comments": "Full-width should be an option for any button. \n\nSuggested parameters:\nstyle: active_1 (default), passive_1, active_2, passive_2, nested_color (takes the colour from the background it's on, but \"one shade\" darker)\nwidth: full (default), responsive (i.e. suited to the amount of text)\nbutton_align: center (default), left, right\ntext_align: center (default), left, right",
        "type": "set_variable"
      },
      {
        "type": "button",
        "name": "btn_example_1",
        "value": "First",
        "parameter_list": {
          "style": "active full-width high",
          "button_align": "right"
        },
        "comments": "style: active high; \nbutton_align:left;\n"
      },
      {
        "type": "button",
        "name": "btn_example_2",
        "value": "Second",
        "parameter_list": {
          "style": "passive",
          "text_align": "left",
          "button_align": "left"
        },
        "comments": "style: passive_1; \ntext_align: left;"
      },
      {
        "type": "button",
        "name": "btn_example_3",
        "value": "Third",
        "parameter_list": {
          "style": "make-me-smile",
          "text_align": "right"
        },
        "comments": "style: passive_2;\ntext_align: left;"
      },
      {
        "type": "button",
        "name": "btn_example_4",
        "value": "Fourth",
        "parameter_list": {
          "style": "get-me-going full-width",
          "text_align": "center"
        },
        "comments": "style: active_2;\ntext_align: left;"
      },
      {
        "type": "button",
        "name": "btn_example_5",
        "value": "Light blue",
        "parameter_list": {
          "style": "light_blue full-width",
          "text_align": "center"
        },
        "comments": "style: tool;"
      },
      {
        "type": "button",
        "name": "btn_example_6",
        "value": "Dark blue",
        "parameter_list": {
          "style": "dark_blue full-width",
          "text_align": "center"
        },
        "comments": "style: tool;"
      },
      {
        "type": "button",
        "name": "btn_example_7",
        "value": "Orange",
        "parameter_list": {
          "style": "orange full-width",
          "text_align": "center"
        },
        "comments": "style: tool;"
      },
      {
        "type": "button",
        "name": "btn_example_8",
        "value": "Light orange",
        "parameter_list": {
          "style": "light_orange full-width",
          "text_align": "center"
        },
        "comments": "style: tool;"
      },
      {
        "type": "button",
        "name": "btn_example_9",
        "value": "Blue",
        "parameter_list": {
          "style": "blue full-width",
          "text_align": "center"
        },
        "comments": "style: tool;"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_dashed_box",
    "status": "released",
    "rows": [
      {
        "type": "dashed_box",
        "name": "dashed_box_passive",
        "value": "Every time you do a relax, mark your star in ParentPoints to track your success. ",
        "parameter_list": {
          "style": "banner_passive",
          "icon_src": "plh_images/icons/star.svg",
          "icon_position": "top-right"
        }
      },
      {
        "type": "dashed_box",
        "name": "dashed_box_active",
        "value": "Every time you do a relax, mark your star in ParentPoints to track your success. ",
        "parameter_list": {
          "style": "banner_active",
          "icon_src": "plh_images/icons/star.svg",
          "icon_position": "top-left"
        }
      },
      {
        "type": "dashed_box",
        "name": "dashed_box_passive",
        "value": "Every time you do a relax, mark your star in ParentPoints to track your success. ",
        "parameter_list": {
          "style": "banner_passive",
          "icon_src": "plh_images/icons/star.svg",
          "icon_position": "bottom-left"
        }
      },
      {
        "type": "dashed_box",
        "name": "dashed_box_active",
        "value": "Every time you do a relax, mark your star in ParentPoints to track your success. ",
        "parameter_list": {
          "style": "banner_active",
          "icon_src": "plh_images/icons/star.svg",
          "icon_position": "bottom-right"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_subtitle",
    "status": "released",
    "rows": [
      {
        "type": "subtitle",
        "name": "subtitle_debug_style_primary",
        "value": "primary style",
        "parameter_list": {
          "style": "primary"
        }
      },
      {
        "type": "subtitle",
        "name": "subtitle_debug_style_active",
        "value": "white style",
        "parameter_list": {
          "style": "white"
        }
      },
      {
        "type": "subtitle",
        "name": "subtitle_debug_text_align_left",
        "value": "text align left",
        "parameter_list": {
          "text_align": "left"
        }
      },
      {
        "type": "subtitle",
        "name": "subtitle_debug_text_align_center",
        "value": "text align center",
        "parameter_list": {
          "text_align": "center"
        }
      },
      {
        "type": "subtitle",
        "name": "subtitle_debug_text_right",
        "value": "text align right",
        "parameter_list": {
          "text_align": "right"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_workshops_page",
    "status": "released",
    "rows": [
      {
        "type": "display_group",
        "rows": [
          {
            "type": "title",
            "value": "Weekly Workshops",
            "parameter_list": {
              "help": "seme help"
            }
          },
          {
            "type": "button",
            "name": "options_button",
            "value": "Options",
            "action_list": [
              {
                "trigger": "click",
                "action_id": "pop_up",
                "args": [],
                "_raw": "pop_up | workshop_options_popup",
                "_cleaned": "click | pop_up | workshop_options_popup"
              }
            ]
          }
        ]
      },
      {
        "type": "tile_component",
        "name": "quick_start",
        "value": "@local.group_name\nStart @local.next_workshop_name",
        "action_list": [
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "@local.next_workshop"
            ],
            "_raw": "click | go_to : @local.next_workshop",
            "_cleaned": "click | go_to : @local.next_workshop"
          }
        ],
        "hidden": " ",
        "parameter_list": {
          "first_line_text": "My Group",
          "second_line_text": "Start week one",
          "style": "quick_start",
          "icon_src": "plh_images/icons/star.svg"
        },
        "comments": "Not sure how to do this"
      },
      {
        "type": "workshops_accordion",
        "parameter_list": {
          "current_workshop_num": "3"
        },
        "comments": "Could make this more generic name such as\nbegin_accordion_stepper\nBut this would require extra info on syntax for workshop completion / partial completion",
        "rows": [
          {
            "type": "accordion_section",
            "value": 100,
            "parameter_list": {
              "state": "closed",
              "status": "completed",
              "title": "Description of week one"
            },
            "comments": "title - accordion tile title, value - number 0-100, state: open | closed, status: completed | uncompleted | disabled",
            "rows": [
              {
                "type": "button",
                "name": "button_completed",
                "value": "Emit completed",
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
                ],
                "parameter_list": {
                  "style": "active"
                }
              }
            ]
          },
          {
            "type": "accordion_section",
            "value": 100,
            "parameter_list": {
              "state": "closed",
              "status": "completed",
              "title": "With template"
            },
            "rows": [
              {
                "type": "template",
                "name": "test_template",
                "value": "care_together",
                "rows": []
              }
            ]
          },
          {
            "type": "accordion_section",
            "value": 70,
            "parameter_list": {
              "state": "open",
              "title": "Description of week three"
            },
            "rows": [
              {
                "type": "template",
                "name": "test_template",
                "value": "debug_navigation_group",
                "rows": []
              }
            ]
          },
          {
            "type": "accordion_section",
            "parameter_list": {
              "state": "closed",
              "status": "disabled",
              "title": "Description of week four"
            },
            "rows": [
              {
                "type": "button",
                "name": "btn_example_1",
                "value": "First",
                "parameter_list": {
                  "style": "active"
                }
              }
            ]
          },
          {
            "type": "accordion_section",
            "parameter_list": {
              "state": "closed",
              "status": "disabled",
              "title": "Description of week five"
            },
            "rows": [
              {
                "type": "button",
                "name": "btn_example_1",
                "value": "First",
                "parameter_list": {
                  "style": "active"
                }
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "feature_essential_tools",
    "status": "released",
    "rows": [
      {
        "type": "display_group",
        "parameter_list": {
          "style": "tool_1"
        },
        "style_list": [
          "padding: 10px 15px"
        ],
        "rows": [
          {
            "type": "title",
            "name": "ft",
            "value": "GET REAL",
            "parameter_list": {
              "style": "white"
            },
            "style_list": [
              "margin-top:20px"
            ]
          },
          {
            "type": "text",
            "name": "ftt",
            "value": "Can your teen actually do what you are about to ask? It may be impossible for them to read quietly all day, but half an hour when you really need it is realistic.",
            "parameter_list": {
              "text_align": "left",
              "style": "whiteText"
            },
            "style_list": [
              "margin-top: 15px",
              "max-width: 320px"
            ]
          },
          {
            "type": "button",
            "name": "bt_1",
            "value": "Button"
          }
        ]
      },
      {
        "type": "display_group",
        "parameter_list": {
          "style": "tool_2"
        },
        "style_list": [
          "padding: 10px 15px"
        ],
        "rows": [
          {
            "type": "title",
            "name": "ft",
            "value": "GET REAL",
            "parameter_list": {
              "style": "white"
            },
            "style_list": [
              "margin-top:20px"
            ]
          },
          {
            "type": "subtitle",
            "name": "ss",
            "value": "Subtitle",
            "parameter_list": {
              "style": "white"
            },
            "style_list": [
              "margin-top: 15px"
            ]
          },
          {
            "type": "text",
            "name": "ftt",
            "value": "Can your teen actually do what you are about to ask? It may be impossible for them to read quietly all day, but half an hour when you really need it is realistic.",
            "parameter_list": {
              "text_align": "left",
              "style": "whiteText"
            },
            "style_list": [
              "margin-top: 15px",
              "max-width: 320px"
            ]
          }
        ]
      },
      {
        "type": "display_group",
        "parameter_list": {
          "style": "tool_3"
        },
        "style_list": [
          "padding: 10px 15px"
        ],
        "rows": [
          {
            "type": "title",
            "name": "ft",
            "value": "GET REAL",
            "parameter_list": {
              "style": "white"
            },
            "style_list": [
              "margin-top:20px"
            ]
          },
          {
            "type": "subtitle",
            "name": "ss",
            "value": "Subtitle",
            "parameter_list": {
              "style": "white"
            },
            "style_list": [
              "margin-top: 15px"
            ]
          },
          {
            "type": "text",
            "name": "ftt",
            "value": "Can your teen actually do what you are about to ask? It may be impossible for them to read quietly all day, but half an hour when you really need it is realistic.",
            "parameter_list": {
              "text_align": "left",
              "style": "whiteText"
            },
            "style_list": [
              "margin-top: 15px",
              "max-width: 320px"
            ]
          }
        ]
      },
      {
        "type": "display_group",
        "parameter_list": {
          "style": "tool_4"
        },
        "style_list": [
          "padding: 10px 15px"
        ],
        "rows": [
          {
            "type": "title",
            "name": "ft",
            "value": "GET REAL",
            "parameter_list": {
              "style": "white"
            },
            "style_list": [
              "margin-top:20px"
            ]
          },
          {
            "type": "subtitle",
            "name": "ss",
            "value": "Subtitle",
            "parameter_list": {
              "style": "white"
            },
            "style_list": [
              "margin-top: 15px"
            ]
          },
          {
            "type": "text",
            "name": "ftt",
            "value": "Can your teen actually do what you are about to ask? It may be impossible for them to read quietly all day, but half an hour when you really need it is realistic.",
            "parameter_list": {
              "text_align": "left",
              "style": "whiteText"
            },
            "style_list": [
              "margin-top: 15px",
              "max-width: 320px"
            ]
          }
        ]
      },
      {
        "type": "display_group",
        "parameter_list": {
          "style": "tool_5"
        },
        "style_list": [
          "padding: 10px 15px"
        ],
        "rows": [
          {
            "type": "title",
            "name": "ft",
            "value": "GET REAL",
            "parameter_list": {
              "style": "white"
            },
            "style_list": [
              "margin-top:20px"
            ]
          },
          {
            "type": "subtitle",
            "name": "ss",
            "value": "Subtitle",
            "parameter_list": {
              "style": "white"
            },
            "style_list": [
              "margin-top: 15px"
            ]
          },
          {
            "type": "text",
            "name": "ftt",
            "value": "Can your teen actually do what you are about to ask? It may be impossible for them to read quietly all day, but half an hour when you really need it is realistic.",
            "parameter_list": {
              "text_align": "left",
              "style": "whiteText"
            },
            "style_list": [
              "margin-top: 15px",
              "max-width: 320px"
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/feature_templates/feature_template_components.xlsx"
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
            "value": [
              "w_1on1_welcome_together",
              "w_1on1_care_together",
              "w_1on1_relax",
              "w_1on1_intro",
              "w_1on1_talk",
              "w_1on1_tools_activity",
              "w_1on1_home_practice",
              "w_1on1_ending"
            ],
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
            "value": [
              "w_1on1_relax",
              "w_1on1_intro"
            ],
            "comments": "w_1on1_welcome_individual; w_1on1_care_together; w_1on1_relax; w_1on1_intro; w_1on1_think; w_1on1_tools_activity;  w_1on1_home_practice; w_1on1_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_1on1.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_1on1.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_1on1.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "1on1",
    "flow_name": "w_1on1_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "topic_intro",
        "value": "topic_intro",
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
            "name": "listen",
            "rows": [
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
                    "value": "Being a parent can be so hard. Sometimes it feels like our children never listen to us.\n\nBut science shows that spending just a few minutes each day of focused one-on-one time with your teen helps build trust and love.",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "type": "nested_properties",
                    "name": "nav_buttons",
                    "rows": [
                      {
                        "name": "button_completed",
                        "value": "@global.more_button",
                        "type": "set_variable"
                      }
                    ]
                  },
                  {
                    "type": "nested_properties",
                    "name": "content_box",
                    "rows": [
                      {
                        "name": "text",
                        "value": "One-on-one time is when you focus on them, without TV or phones. Let them lead what you do or talk about.\n\nIt is great if you can do twenty minutes a day, but even five minutes a day is really good.",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_1on1.xlsx"
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
                "name": "intro_text",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Share ideas! What are things you could do to spend one-on-one time with your teens?\n\nFeel like you have NO TIME and you are exhausted? Think together about one-on-one time that doesn't take up extra time, like walking to the shop together.",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "action_list": [
                      {
                        "trigger": "click",
                        "action_id": "pop_up",
                        "args": [
                          "w_1on1_talk_pop"
                        ],
                        "_raw": "click | pop_up:w_1on1_talk_pop",
                        "_cleaned": "click | pop_up:w_1on1_talk_pop"
                      }
                    ],
                    "hidden": "false",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "name": "outro_text",
                "value": "One-on-one time may not have instant results, but it will make a difference over the long term. You are an amazing parent for trying this.",
                "type": "set_variable"
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you do one-on-one time, click the @global.parent_point and celebrate your success",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "1on1",
    "flow_name": "w_1on1_talk_pop",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "suggestions",
        "value": "suggestions",
        "rows": [
          {
            "name": "list_text",
            "value": "(-) Walking to the shops\n(-) Get water together \n(-) Doing a chore together \n(-) Prepare dinner \n(-) Eat breakfast/lunch/dinner \n(-) Have tea after school \n(-) Watch a T.V. show  \n(-) Review homework \n(-) Chat before bedtime \n(-) Play a game/sport ",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_1on1.xlsx"
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
                        "action_list": [
                          {
                            "trigger": "click",
                            "action_id": "pop_up",
                            "args": [
                              "w_1on1_talk_pop"
                            ],
                            "_raw": "click | pop_up:w_1on1_talk_pop",
                            "_cleaned": "click | pop_up:w_1on1_talk_pop"
                          }
                        ],
                        "hidden": "false",
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
                "value": "Every time you do one-on-one time, click the @global.parent_point and celebrate your success",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_1on1.xlsx"
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
            "name": "tools_title",
            "value": "@global.w_1on1",
            "type": "set_variable"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_1on1.xlsx"
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
        "parameter_list": {
          "style": "active"
        },
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_1on1.xlsx"
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
                    "value": "Every day you can this week spend 5-20 minutes of one-on-one time with your teen.",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "@global.ideas_button",
                    "action_list": [
                      {
                        "trigger": "click",
                        "action_id": "pop_up",
                        "args": [
                          "w_1on1_talk_pop"
                        ],
                        "_raw": "click | pop_up:w_1on1_talk_pop",
                        "_cleaned": "click | pop_up:w_1on1_talk_pop"
                      }
                    ],
                    "type": "set_variable"
                  },
                  {
                    "name": "button_2",
                    "value": "@global.essential_tools",
                    "action_list": [
                      {
                        "trigger": "click",
                        "action_id": "go_to",
                        "args": [
                          "w_1on1_tools_activity"
                        ],
                        "_raw": "click | go_to:w_1on1_tools_activity",
                        "_cleaned": "click | go_to:w_1on1_tools_activity"
                      }
                    ],
                    "hidden": "false",
                    "type": "set_variable"
                  },
                  {
                    "name": "habit_text",
                    "value": "Every time you do one-on-one time, click the @global.parent_point and celebrate your success",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_1on1.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_1on1.xlsx"
  },
  {
    "flow_type": "template",
    "module": "celebrate",
    "flow_name": "w_celebrate_stepper",
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
            "value": [
              "w_celebrate_welcome_together",
              "w_celebrate_care_together",
              "w_celebrate_relax",
              "w_celebrate_reflect_together",
              "w_celebrate_intro",
              "w_celebrate_talk_1",
              "w_celebrate_read_temp",
              "w_celebrate_talk_2",
              "w_celebrate_ending"
            ],
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
            "comments": "w_celebrate_welcome_individual; w_celebrate_relax; w_celebrate_reflect_individual; w_celebrate_intro; w_celebrate_tools_activity; w_celebrate_home_practice; w_celebrate_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_celebrate.xlsx"
  },
  {
    "flow_type": "template",
    "module": "celebrate",
    "flow_name": "w_celebrate_welcome_together",
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
                    "name": "activity_image",
                    "value": "plh_images/workshop_modes/guide_2/final/wave.svg",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_celebrate.xlsx"
  },
  {
    "flow_type": "template",
    "module": "celebrate",
    "flow_name": "w_celebrate_welcome_individual",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "welcome_individual",
        "value": "welcome_individual",
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
                "value": "plh_images/workshop_modes/guide_2/final/wave.svg",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "hidden": "true",
                    "type": "set_variable"
                  },
                  {
                    "name": "question_text",
                    "value": "How are you feeling today?",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          },
          {
            "name": "reply_happy",
            "value": "Fantastic!  We are proud of you for all you have done over the past weeks.",
            "type": "set_variable"
          },
          {
            "name": "reply_ok",
            "value": "We’re sorry it’s a difficult day. We are proud of you for all you have done over the past weeks.",
            "type": "set_variable"
          },
          {
            "name": "reply_sad",
            "value": "We’re sorry it’s a difficult day. We are proud of you for all you have done over the past weeks.",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_celebrate.xlsx"
  },
  {
    "flow_type": "template",
    "module": "celebrate",
    "flow_name": "w_celebrate_care_together",
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
                "name": "activity_image",
                "value": "plh_images/workshop_modes/group/final/talk.svg",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_celebrate.xlsx"
  },
  {
    "flow_type": "template",
    "module": "celebrate",
    "flow_name": "w_celebrate_relax",
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
                "name": "activity_image",
                "value": "plh_images/workshop_modes/group/final/relax.svg",
                "hidden": "!@field.do_workshops_together",
                "type": "set_variable"
              },
              {
                "name": "activity_image",
                "value": "plh_images/workshop_modes/guide_2/final/relax.svg",
                "hidden": "@field.do_workshops_together",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_celebrate.xlsx"
  },
  {
    "flow_type": "template",
    "module": "celebrate",
    "flow_name": "w_celebrate_reflect_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_together",
        "value": "reflect_together",
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
                "value": "plh_images/workshop_modes/group/final/talk.svg",
                "type": "set_variable"
              },
              {
                "name": "activity_title",
                "value": "@global.home_practice_problem_solving: @global.w_crisis",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_celebrate.xlsx"
  },
  {
    "flow_type": "template",
    "module": "celebrate",
    "flow_name": "w_celebrate_reflect_individual",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_individual",
        "value": "reflect_individual",
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
                "value": "plh_images/workshop_modes/guide_2/final/star.svg",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "bottom_text",
                    "value": "Well done!",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_celebrate.xlsx"
  },
  {
    "flow_type": "template",
    "module": "celebrate",
    "flow_name": "w_celebrate_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "topic_intro",
        "value": "topic_intro",
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
            "name": "listen",
            "rows": [
              {
                "type": "nested_properties",
                "name": "workshop_activity",
                "rows": [
                  {
                    "name": "activity_title",
                    "value": "@global.w_celebrate",
                    "type": "set_variable"
                  },
                  {
                    "name": "activity_image",
                    "value": "plh_images/workshop_modes/guide_2/final/wave.svg",
                    "type": "set_variable"
                  },
                  {
                    "name": "intro_text",
                    "value": "CONGRATULATIONS! You have done it! You have built 11 important parenting skills. \n\nThis is a huge achievement. It shows such care for your family. \n\nLet’s celebrate you, and plan your future parenting support.",
                    "hidden": "!@field.do_workshops_together",
                    "type": "set_variable"
                  },
                  {
                    "name": "intro_text",
                    "value": "CONGRATULATIONS! You have done it! You have built 11 important parenting skills. \n\nThis is a huge achievement. It shows such care for your family. \n\nLet’s celebrate you, and plan your future ParentApp support.",
                    "hidden": "@field.do_workshops_together",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_celebrate.xlsx"
  },
  {
    "flow_type": "template",
    "module": "celebrate",
    "flow_name": "w_celebrate_talk_1",
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
                "name": "activity_image",
                "value": "plh_images/workshop_modes/group/final/talk.svg",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "You and your family have learnt so much. Let's think back and see what has changed.",
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
                    "value": "box_audio",
                    "rows": [
                      {
                        "type": "nested_properties",
                        "name": "widget_audio",
                        "rows": [
                          {
                            "name": "audio_title",
                            "value": "Reflect with Sbo",
                            "comments": "Users may need some time to reflect themselves before sharing:\n\n- Close eyes and relax\n- Recall family life before ParentApp\n- Summary of workshop topics\n- Reflect on key experiences (discussions, looking at comics, sharing experiences, practicing skills)\n- Reflect on changes in self & family\n- Consider how to continue to use new skills",
                            "type": "set_variable"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "nested_properties",
                    "name": "box_2",
                    "value": "box_image",
                    "rows": [
                      {
                        "name": "text",
                        "value": "Discuss together:\n\n(-) What has changed in your family?\n(-) What are you proud of that you have done?\n\nRemember to praise and encourage each other!",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_celebrate.xlsx"
  },
  {
    "flow_type": "template",
    "module": "celebrate",
    "flow_name": "w_celebrate_read_temp",
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
                "name": "activity_title",
                "value": "Supporting Each Other",
                "type": "set_variable"
              },
              {
                "name": "activity_image",
                "value": "plh_images/workshop_modes/group/final/read.svg",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "How will you support each other going forward? Here are some ideas from other families. ",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/celebrate/read/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "title",
                        "value": "Idea 1",
                        "hidden": "false",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "Keep meeting regularly to give each other parenting support.",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/celebrate/read/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "title",
                            "value": "Idea 2",
                            "hidden": "false",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "Be ‘parenting buddies’ to call when you are upset or don’t know what to do.",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/celebrate/read/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "title",
                                "value": "Idea 3",
                                "hidden": "false",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "Text each other every week to share what you’ve done well.",
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
                                "type": "set_variable"
                              },
                              {
                                "name": "title",
                                "value": "Idea 4",
                                "hidden": "false",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "Share @global.parent_app and help other families start their journey.",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_celebrate.xlsx"
  },
  {
    "flow_type": "template",
    "module": "celebrate",
    "flow_name": "w_celebrate_talk_2",
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
                "name": "activity_image",
                "value": "plh_images/workshop_modes/group/final/talk.svg",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Plan how you will support each other going forward. \n\nYou can use the ideas from other families, or make up your own!",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_celebrate.xlsx"
  },
  {
    "flow_type": "template",
    "module": "celebrate",
    "flow_name": "w_celebrate_ending",
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
                    "name": "activity_image",
                    "value": "plh_images/workshop_modes/group/final/cup.svg",
                    "hidden": "!@field.do_workshops_together",
                    "type": "set_variable"
                  },
                  {
                    "name": "activity_image",
                    "value": "plh_images/workshop_modes/guide_2/final/cup.svg",
                    "hidden": "@field.do_workshops_together",
                    "type": "set_variable"
                  },
                  {
                    "name": "intro_text",
                    "value": "We are so proud of you. You have shown strength, courage, and love for your family. Parents are amazing. You are amazing. \n\nThis song is for parents everywhere. Listen, dance together and celebrate yourselves!  ",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_celebrate.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_stepper",
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
            "value": [
              "w_consequence_welcome_together",
              "w_consequence_care_together",
              "w_consequence_relax",
              "w_consequence_reflect_together",
              "w_consequence_intro",
              "w_consequence_read_1_temp",
              "w_consequence_talk_1",
              "w_consequence_read_2_temp",
              "w_consequence_tools_activity",
              "w_consequence_talk_2",
              "w_consequence_read_3_temp",
              "w_consequence_talk_3",
              "w_consequence_talk_4",
              "w_consequence_home_practice",
              "w_consequence_ending"
            ],
            "comments": "w_consequence_welcome_together; w_consequence_care_together; w_consequence_relax; w_consequence_reflect_together; w_consequence_intro; w_consequence_read_1; w_consequence_talk; w_consequence_read_2; w_consequence_think; w_consequence_tools_activity; w_consequence_home_practice; w_consequence_ending",
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
            "comments": "w_consequence_welcome_individual; w_consequence_relax; w_consequence_reflect_individual; w_consequence_intro; w_consequence_tools_activity; w_consequence_home_practice; w_consequence_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_welcome_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_care_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_relax",
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
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_reflect_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_together",
        "value": "reflect_together",
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
                "value": "@global.home_practice_problem_solving: @global.w_rules",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "topic_intro",
        "value": "topic_intro",
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
            "name": "listen",
            "rows": [
              {
                "type": "nested_properties",
                "name": "workshop_activity",
                "rows": [
                  {
                    "name": "activity_title",
                    "value": "@global.w_consequence",
                    "type": "set_variable"
                  },
                  {
                    "name": "intro_text",
                    "value": "You can help your teenager to understand that breaking family rules leads to consequences. \n\nBut HOW you do consequences matters. \n\nGetting them right helps teens behave better and makes family life calmer...",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_read_1_temp",
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
                "value": "Let's read what happened with @global.w_consequence_teen_boy and his @global.w_consequence_male_caregiver",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/consequence/read_1/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_consequence_male_caregiver: “@global.w_consequence_teen_boy! What time is this? You are late!”",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/consequence/read_1/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_consequence_teen_boy: “Sorry @global.w_consequence_male_caregiver – you can go back to sleep”.  \n\n@global.w_consequence_male_caregiver: “It is WAY past the time you were supposed to be home!” ",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/consequence/read_1/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@global.w_consequence_teen_boy: “I can explain, @global.w_consequence_male_caregiver, I can.” \n\n@global.w_consequence_male_caregiver: “@global.w_consequence_teen_boy, you are not keeping our rule! I will give you a hiding!” ",
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
                                "value": "plh_images/workshops/consequence/read_1/slide_4.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@global.w_consequence_teen_boy: “That’s unfair! You never listen to me!! I hate you!”",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_talk_1",
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
                    "value": "This parent gave an angry consequence ‘I’ll give you a hiding!’ but it just made everyone more angry and upset. \n\nThink together - why did giving a consequence this way not work well?",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "value": "@global.ideas_short_button",
                    "hidden": "false",
                    "comments": "(-) @global.w_consequence_male_caregiver was angry \n(-) @global.w_consequence_male_caregiver did not let @global.w_consequence_teen_boy explain \n(-) The consequence was not discussed beforehand with @global.w_consequence_teen_boy \n(-)The consequence was too strong ",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_read_2_temp",
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
                "name": "include_outro",
                "value": "true",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Teenagers often break rules. Growing up is a difficult time when they are learning about who they are. \n\nLuckily, there are ways to discipline your teen without getting angry or using violence… and they work well!",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "hidden": "true",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "Giving calm consequences help teach our children responsibility for what they do – good and bad. \n\nThey also allow discipline that is controlled. \n\nThis is more effective than hitting or shouting. Consequences are not quite the same as punishment: they give our teens a chance to learn responsibility for their actions!",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "hidden": "true",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "You can discuss and agree consequences in advance with teens. It helps if they make sense to them.\n\nYou can also agree good consequences for good actions.\n\nHere are some examples: ",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/consequence/read_2/slide_1.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "Come home late = can’t go out next evening",
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
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/consequence/read_2/slide_2.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "Fight over a phone = phones taken away for an hour",
                                    "type": "set_variable"
                                  }
                                ]
                              },
                              {
                                "type": "nested_properties",
                                "name": "box_2",
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/consequence/read_2/slide_3.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "Wash dishes = extra time to speak to friends",
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
              },
              {
                "name": "outro_text",
                "value": "Calm consequences should be... \n\nFair: Not too harsh and you can actually do it \n\nImmediate: Give them as soon as possible \n\nConsistent: The same consequence every time",
                "type": "set_variable"
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you do a calm consequence, click the @global.parent_point and celebrate your success",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_tools",
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
            "name": "tools_title",
            "value": "@global.w_consequence",
            "type": "set_variable"
          },
          {
            "name": "top_text",
            "value": "How you introduce calm consequences is important. Remember, when you involve your teen, things usually go better! ",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "tool_1",
            "rows": [
              {
                "name": "title",
                "value": "EXPLAIN",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Check you are both calm. Take a few breaths. Explain to your teen why you are concerned about their behaviour.\n\nExplain the reasons why the rule mattered. You can share your feelings - it’s okay to say you are disappointed.",
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
                "value": "AGREE",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Plan with your teen consequences for following and not following the rule.\n\nAsk for their ideas. Talk until you agree on something realistic.\n\nMake a consequence for not following the rule and a privilege when they do follow the rule. ",
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
                "value": "CALM CONSEQUENCE",
                "type": "set_variable"
              },
              {
                "name": "subtitle_1",
                "value": "When your teen follows the rule, give praise and privileges!",
                "hidden": "false",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "They will feel respected and valued. Remember: The more we praise them, the more they will show that good behaviour!",
                "type": "set_variable"
              },
              {
                "name": "subtitle_2",
                "value": "When your teen does not follow the rule, follow through with the consequence.",
                "hidden": "false",
                "type": "set_variable"
              },
              {
                "name": "text_2",
                "value": "When your teen breaks the rule, calmly give the consequence. This should be FAIR (not too harsh), IMMEDIATE (do it straight away) CONSISTENT (same every time).",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_tools_activity",
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
                "value": "w_consequence_tools",
                "rows": []
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_talk_2",
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
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "What rules do your teens often break? What consequences could you use? \n\nConsequences should be FAIR (not too harsh), IMMEDIATE (do it straight away) CONSISTENT (same every time).\n\nPraise and encourage each other – we can give each other strength! ",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_read_3_temp",
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
                "value": "Let's go back to @global.w_consequence_teen_boy and his @global.w_consequence_male_caregiver",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/consequence/read_3/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_consequence_male_caregiver: \"I am concerned that you are often still coming home late, @global.w_consequence_teen_boy . What can we do to help you remember to come home in time?\"\n\n@global.w_consequence_teen_boy: \"If I come home in time, maybe I can stay up 30 minutes later than usual?\"",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/consequence/read_3/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_consequence_male_caregiver: That is a good idea! And what should we do if you don’t follow the rule?  \n\n@global.w_consequence_teen_boy (mumbles): “Mgmluuhm” ",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/consequence/read_3/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@global.w_consequence_male_caregiver: \"Oh come on, I know you have some ideas.\"\n\n@global.w_consequence_teen_boy: \"Okay…. What about: I have to do my homework?\"",
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
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/consequence/read_3/slide_4.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "@global.w_consequence_male_caregiver: \"You have to do your homework anyway. If you forget the rule, it is fair that you will not be able to see your friends the next day.\"\n\n@global.w_consequence_teen_boy: \"Okay, @global.w_consequence_male_caregiver .\"",
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
                                    "value": "box_image_more",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "plh_images/workshops/consequence/read_3/slide_5.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "The next day...\n\n@global.w_consequence_male_caregiver: “@global.w_consequence_teen_boy! What time is it! It is late!” ",
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
                                        "value": "box_image_more",
                                        "rows": [
                                          {
                                            "name": "image_src",
                                            "value": "plh_images/workshops/consequence/read_3/slide_6.svg",
                                            "type": "set_variable"
                                          },
                                          {
                                            "name": "text",
                                            "value": "@global.w_consequence_teen_boy: “Sorry @global.w_consequence_male_caregiver – you can go back to sleep.”  \n\n@global.w_consequence_male_caregiver: “It is WAY past the time you were supposed to be home!” ",
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
                                            "value": "box_image_more",
                                            "rows": [
                                              {
                                                "name": "image_src",
                                                "value": "plh_images/workshops/consequence/read_3/slide_7.svg",
                                                "type": "set_variable"
                                              },
                                              {
                                                "name": "text",
                                                "value": "@global.w_consequence_teen_boy: “I can explain, @global.w_consequence_male_caregiver, I can.” \n\n@global.w_consequence_male_caregiver: “@global.w_consequence_teen_boy, it is the middle of the night and you came home later than we agreed. Whatever the reason is, you must understand that this is not acceptable. @global.w_consequence_female_caregiver and I felt really worried.” ",
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
                                                "value": "box_image_more",
                                                "rows": [
                                                  {
                                                    "name": "image_src",
                                                    "value": "plh_images/workshops/consequence/read_3/slide_8.svg",
                                                    "type": "set_variable"
                                                  },
                                                  {
                                                    "name": "text",
                                                    "value": "@global.w_consequence_teen_boy: “The guy who was supposed to drive us home was drunk, so I decided not to get in the car and then I had to wait for someone else to drive me home.” \n\n@global.w_consequence_male_caregiver: “I am glad you did not get in the car with a drunk driver, @global.w_consequence_teen_boy . That was a good decision. Let’s talk more about this in the morning when we have had some rest.” ",
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
                                                    "value": "plh_images/workshops/consequence/read_3/slide_9.svg",
                                                    "type": "set_variable"
                                                  },
                                                  {
                                                    "name": "text",
                                                    "value": "@global.w_consequence_teen_boy: “I am sorry I worried you and @global.w_consequence_female_caregiver .” \n\n@global.w_consequence_male_caregiver: “Thank you. Now go to bed, but just to be clear, as you came home later than we agreed, you will not be allowed to go out tomorrow night.” ",
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
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_talk_3",
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
                "value": "Let's talk about this story",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Why did using a consequence work well this time?",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "value": "@global.ideas_short_button",
                    "hidden": "false",
                    "comments": "(-) @global.w_consequence_teen_boy and his @global.w_consequence_male_caregiver discussed consequences when they were both calm \n(-) They agreed on consequences together\n(-) @global.w_consequence_male_caregiver responded calmly but firmly when @global.w_consequence_teen_boy broke the rule \n(-) @global.w_consequence_male_caregiver listened to @global.w_consequence_teen_boy\n(-) The consequence was realistic and appropriate",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_talk_4",
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
                "name": "activity_title",
                "value": "Try it Together",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Plan a calm consequence for your teenagers arguing with each other during dinner. Remember they need to be \n\nFAIR - IMMEDIATE - CONSISTENT",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "hidden": "false",
                    "comments": "(-) Not seeing any friends for a month may be hard to do for you and also too harsh\n(-) Cancelling their birthday plans in a month’s time – it’s too far away\n(-) For example no TV this evening – fair and can be done straight away",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_home_practice",
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
                    "value": "Your home practice for this week will be to talk together with your teen about a ONE negative consequence and ONE positive consequence.\n\nConsequences should be FAIR (not too harsh), IMMEDIATE (do it straight away) CONSISTENT (same every time).",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "@global.ideas_button",
                    "comments": "Negative Behaviour: Coming home after the agreed hour. \nNegative Consequence: Cannot see friends the next day. \n\nNegative Behaviour: Talking rudely. \nNegative Consequence: Write a letter of apology. \n \nPositive Behaviour: Helping out with shopping \nPositive Consequence: 30 minutes extra of loved activity of their choice.  \n\nPositive Behaviour: Helping look after younger siblings \nPositive Consequence:  One hour of extra time with friends on the weekend ",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "consequence",
    "flow_name": "w_consequence_ending",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_consequence.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_stepper",
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
            "value": [
              "w_crisis_welcome_together",
              "w_crisis_care_together",
              "w_crisis_relax",
              "w_crisis_reflect_together",
              "w_crisis_intro",
              "w_crisis_read_1_temp",
              "w_crisis_talk_1",
              "w_crisis_read_2_temp",
              "w_crisis_talk_2",
              "w_crisis_tools_activity",
              "w_crisis_learn_temp",
              "w_crisis_home_practice",
              "w_crisis_ending"
            ],
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
            "comments": "w_crisis_welcome_individual; w_crisis_relax; w_crisis_reflect_individual; w_crisis_intro; w_crisis_tools_activity; w_crisis_home_practice; w_crisis_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_welcome_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_welcome_individual",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "welcome_individual",
        "value": "welcome_individual",
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
                    "value": "We care about you, and how life is treating you.",
                    "type": "set_variable"
                  },
                  {
                    "name": "question_text",
                    "value": "How are you feeling today?",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          },
          {
            "name": "reply_happy",
            "value": "Great that today is going well! What is one thing that has gone well today? Remember to praise yourself for it.",
            "type": "set_variable"
          },
          {
            "name": "reply_ok",
            "value": "Sorry to hear you are feeling difficult feelings today. Well done for recognising those emotions, and trying to be calm and kind to yourself. You are setting a great example for your family ",
            "type": "set_variable"
          },
          {
            "name": "reply_sad",
            "value": "Sorry to hear you are feeling difficult feelings today. Well done for recognising those emotions, and trying to be calm and kind to yourself. You are setting a great example for your family ",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_care_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_relax",
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
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_reflect_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_together",
        "value": "reflect_together",
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
                "value": "@global.home_practice_problem_solving: @global.w_safe",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_reflect_individual",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_individual",
        "value": "reflect_individual",
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
                    "name": "bottom_text",
                    "value": "Every small thing you do matters. We hope you are proud of yourself too.",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "topic_intro",
        "value": "topic_intro",
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
            "name": "listen",
            "rows": [
              {
                "type": "nested_properties",
                "name": "workshop_activity",
                "rows": [
                  {
                    "name": "activity_title",
                    "value": "@global.w_crisis",
                    "type": "set_variable"
                  },
                  {
                    "name": "intro_text",
                    "value": "All families experience crises. When we prepare together and know where to get help BEFORE something bad happens, we can overcome any crisis. ",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_read_1_temp",
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
                "type": "nested_properties",
                "name": "content_box",
                "value": "pair",
                "rows": [
                  {
                    "type": "nested_properties",
                    "name": "box_1",
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/crisis/read_1/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_crisis_female_caregiver: \"Shame my dear, you look really upset, do you want to tell me what happened?\"",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/crisis/read_1/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_crisis_teen_girl_1: \"It’s my Uncle, he… he… he touched me.\"  \n\n@global.w_crisis_female_caregiver (thinking): \"Take a deep breath... What does my child need? She needs me to be calm and listen\" \n\n@global.w_crisis_female_caregiver: \"Come and sit down next to me. Take your time, I’m listening.\"",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/crisis/read_1/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@global.w_crisis_teen_girl_1: \"It’s true, he… he… made me do it! He made me have sex with him! I didn’t want to, I swear, and I even said NO, but he told me I would be in trouble.\"\n\n@global.w_crisis_female_caregiver: \"Thank you for sharing this with me. You are not in trouble. This is not your fault.\"",
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
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/crisis/read_1/slide_4.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "@global.w_crisis_teen_girl_1: \"Yesterday when you went to see @global.w_crisis_adult_friend . He just came and that’s when it happened.\"\n\n@global.w_crisis_female_caregiver:  \"It’s okay, I believe you my child. This is a big thing and we will find a way to get the help we need. Where could we go for help?\"\n\n@global.w_crisis_teen_girl_1: \"My school?\"",
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
                                    "value": "box_image_more",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "plh_images/workshops/crisis/read_1/slide_5.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "@global.w_crisis_female_caregiver: \"Ah I know, let’s go to the clinic. They will know what we can do to help you. Does that sound okay to you?\"\n\n@global.w_crisis_teen_girl_1: \"Yes… Okay… But will you come with me?\"",
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
                                        "value": "plh_images/workshops/crisis/read_1/slide_6.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "@global.w_crisis_female_caregiver: \"Of course I will. And @global.w_crisis_teen_girl_1? Remember this is not your fault. I love you. You are a good person. We will get through this.\"",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_talk_1",
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
                "value": "This was such a difficult situation for @global.w_crisis_teen_girl_1 and her @global.w_crisis_female_caregiver! This can happen to boys and girls.",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "What skills did @global.w_crisis_female_caregiver use?",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "action_list": [
                      {
                        "trigger": "click",
                        "action_id": "pop_up",
                        "args": [
                          "w_crisis_talk_1_pop"
                        ],
                        "_raw": "click | pop_up:w_crisis_talk_1_pop",
                        "_cleaned": "click | pop_up:w_crisis_talk_1_pop"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_talk_1_pop",
    "status": "released",
    "rows": [
      {
        "type": "text",
        "name": "text",
        "value": "(-) Take a deep breath and pause before responding \n(-) Listen to your teen \n(-) Praise your teen for sharing \n(-) Use problem solving skills \n(-) Work out where you can get help"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_read_2_temp",
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
                "value": "Another problem that many parents are worried about is violence and crime. Let’s look at an example together. ",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/crisis/read_2/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_crisis_male_caregiver_1: \"@global.w_crisis_teen_boy_1, you look worried since yesterday. What is wrong?\"",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/crisis/read_2/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_crisis_teen_boy_1: \"Yesterday, my friends and I went to a soccer match. Some guys who were drunk started a fight with my friend.\"\n\n@global.w_crisis_male_caregiver_1: \"Continue, I am listening. I hope you did not fight?\"",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/crisis/read_2/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@global.w_crisis_teen_boy_1: \"I didn’t want to, but I couldn’t just stand there and let them beat up my friend, so…\"\n\n@global.w_crisis_male_caregiver_1: \"So, did you fight in order to help defend your friend?\"",
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
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/crisis/read_2/slide_4.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "@global.w_crisis_teen_boy_1: “Everyone was fighting. I saw someone lying on the field in a pool of blood. He looked… dead.\"",
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
                                    "value": "box_image_more",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "plh_images/workshops/crisis/read_2/slide_5.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "@global.w_crisis_male_caregiver_1: \"I am glad you are telling me about this, @global.w_crisis_teen_boy_1 . Let’s sit down together now and discuss whether we should involve the police or someone else to help.\" ",
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
                                        "value": "plh_images/workshops/crisis/read_2/slide_6.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "@global.w_crisis_teen_boy_1: \"Thank you, @global.w_crisis_male_caregiver_1\"\n\n@global.w_crisis_male_caregiver_1: \"We will get through this. Remember, we will support you as a family.\"",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_talk_2",
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
                "value": "This was such a difficult situation for @global.w_crisis_teen_boy_1 and his @global.w_crisis_male_caregiver_1!",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "What skills did @global.w_crisis_male_caregiver_1 use?",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "action_list": [
                      {
                        "trigger": "click",
                        "action_id": "pop_up",
                        "args": [
                          "w_crisis_talk_1_pop"
                        ],
                        "_raw": "click | pop_up:w_crisis_talk_1_pop",
                        "_cleaned": "click | pop_up:w_crisis_talk_1_pop"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_tools",
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
            "name": "tools_title",
            "value": "@global.w_crisis",
            "type": "set_variable"
          },
          {
            "name": "top_text",
            "value": "Crisis can make us feel angry or helpless. But this is when our teens really need us to breathe, listen and think.",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "tool_1",
            "rows": [
              {
                "name": "title",
                "value": "BREATHE",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Stay calm. Ask yourself ‘what does my teen need right now’",
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
                "value": "LISTEN",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Tell them you are there for them and love them.  ",
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
                "value": "THINK",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Talk with your teen. What might help the situation? You might need to make immediate plans now, and then long-term plans later.  ",
                "type": "set_variable"
              }
            ]
          },
          {
            "name": "bottom_text",
            "value": "You can be proud of yourself for exploring ways to get help!",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "name": "button_1",
            "value": "Resources to help in the community",
            "hidden": "false",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_tools_activity",
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
                "value": "w_crisis_tools",
                "rows": []
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_learn_temp",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "learn",
        "value": "learn_temp",
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
                "value": "Try It Together",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "It’s helpful to practice dealing with crisis before something happens. \n\nLook at these five family crisis times. Imagine you are the parent: What would you do?\n\nRemember:  BREATHE - LISTEN - THINK",
                "type": "set_variable"
              },
              {
                "name": "activity_banner",
                "hidden": "true",
                "type": "set_variable"
              },
              {
                "name": "include_outro",
                "value": "true",
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
                        "value": "plh_images/workshops/crisis/learn/slide_5.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "title",
                        "value": "Crisis 1: @global.w_crisis_teen_boy_2 fights at school ",
                        "hidden": "false",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "\"I’ve never done this before. And now they will expel me\"\n\nHow could you respond to @global.w_crisis_teen_boy_2? ",
                        "comments": "Last sentence needs different formatting.",
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
                            "value": "plh_images/workshops/crisis/learn/slide_1.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "title",
                            "value": "Crisis 2: @global.w_crisis_teen_girl_1 gets pregnant",
                            "hidden": "false",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "\"@global.w_crisis_male_caregiver_1, I’m so ashamed. I don’t know what to do\"\n\nHow could you respond to @global.w_crisis_teen_girl_1?",
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
                                "value": "plh_images/workshops/crisis/learn/slide_2.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "title",
                                "value": "Crisis 3: @global.w_crisis_teen_boy_2 makes a girl pregnant",
                                "hidden": "false",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "\"@global.w_crisis_male_caregiver_2, I don’t want to have a baby\"\n\nHow could you respond to @global.w_crisis_teen_boy_2?",
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
                                    "value": "plh_images/workshops/crisis/learn/slide_3.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "title",
                                    "value": "Crisis 4: Someone in the family gets sick ",
                                    "hidden": "false",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "\"The test said I have caught HIV. I’m scared I’m going to die\"\n\nHow could you respond in this situation? ",
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
                                    "value": "plh_images/workshops/crisis/learn/slide_4.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "title",
                                    "value": "Crisis 5: @global.w_crisis_teen_girl_1 is pressured into sex by her boyfriend",
                                    "hidden": "false",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "\"I didn’t really want to. Now I will get pregnant or be ill. @global.w_crisis_female_caregiver, I’m so scared...\"\n\nHow could you respond to @global.w_crisis_teen_girl_1?",
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
              },
              {
                "name": "outro_text",
                "value": "\nRemember to support and encourage each other. It is hard to remain calm and listen to each other in a crisis - we are proud of you.\n",
                "type": "set_variable"
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you respond in a calm way to a crisis, click the @global.parent_point and celebrate your success",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_home_practice",
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
                    "value": "With your teen choose one of these situations (or think of one yourself!). Look at the cartoon, and discuss what you would do together if this happened to a friend or in your family. \n\nAnd remember: BREATHE  - LISTEN - THINK",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "Crisis Examples",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_2",
                    "value": "@global.essential_tools",
                    "hidden": "false",
                    "type": "set_variable"
                  },
                  {
                    "name": "habit_text",
                    "value": "Whenever you give a safety amnesty, talk about keeping safe, or respond calmly to a crisis, click the @global.parent_point and celebrate your success",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "crisis",
    "flow_name": "w_crisis_ending",
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
                    "value": "You’ve completed this week’s workshop. \n\nNext week’s workshop will celebrate you all, and help you plan for the future. \n\nWhy don’t you plan some party food together, and have some music ready if you like to dance!",
                    "hidden": "!@field.do_workshops_together",
                    "comments": "ETW to check ",
                    "type": "set_variable"
                  },
                  {
                    "name": "intro_text",
                    "value": "You’ve completed this week’s workshop. \n\nNext week’s workshop will celebrate you, and you can choose the support you want going forward. \n\nYou can prepare a treat to celebrate – something you like to eat, or music you like to listen to!",
                    "hidden": "@field.do_workshops_together",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_crisis.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_stepper",
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
            "value": [
              "w_instruct_welcome_together",
              "w_instruct_care_together",
              "w_instruct_relax",
              "w_instruct_reflect_together",
              "w_instruct_intro",
              "w_instruct_think_1_temp",
              "w_instruct_read_1_temp",
              "w_instruct_talk_1",
              "w_instruct_read_2_temp",
              "w_instruct_talk_2",
              "w_instruct_tools_activity",
              "w_instruct_talk_3",
              "w_instruct_home_practice",
              "w_instruct_ending"
            ],
            "comments": "w_instruct_welcome_together; w_instruct_care_together; w_instruct_relax; w_instruct_reflect_together; w_instruct_intro; w_instruct_think_1_temp; w_instruct_read_1_temp; w_instruct_talk_1; w_instruct_read_2_temp; w_instruct_talk_2; w_instruct_tools_activity; w_instruct_talk_3; w_instruct_home_practice; w_instruct_ending",
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
            "value": [
              "w_instruct_welcome_individual",
              "w_instruct_intro",
              "w_instruct_think",
              "w_instruct_read_1",
              "w_instruct_read_2",
              "w_instruct_tools_activity",
              "w_instruct_home_practice",
              "w_instruct_ending"
            ],
            "comments": "w_instruct_welcome_individual; w_instruct_reflect_individual; w_instruct_relax; w_instruct_intro; w_instruct_think_1; w_instruct_read_1; w_instruct_question_1; w_instruct_read_2; w_instruct_question_2; w_instruct_tools_activity; w_instruct_think_2; w_instruct_home_practice; w_instruct_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_reflect_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_together",
        "value": "reflect_together",
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
                "value": "@global.home_practice_problem_solving: @global.w_praise",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
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
            "rows": []
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "topic_intro",
        "value": "topic_intro",
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
            "name": "listen",
            "rows": [
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
                    "value": "Focus on the positive! \n\nTelling our teens what we DO want them to do works better than telling them to STOP doing something.\n\nYou will see the difference. ",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_think_1_temp",
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
                "value": "Let’s hear @global.guide_2_name's story.",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/instruct/guide_2/teen_phone_1.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "It is so hard to tell teenagers what to do! \n\nWhat really helped me was to change how to ask my teen to do things. \n\nNow, I tell them what they SHOULD do instead of what they SHOULDN'T. Let me show you how it works!",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/instruct/guide_2/think/slide_1.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "Let’s do a thought experiment!\n\nDO NOT THINK ABOUT AN ELEPHANT \n\nWhat are you thinking about?",
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
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/instruct/guide_2/think/slide_2.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "Exactly! ‘Don’t do’ instructions make teens think about that thing. \n\nSometimes they don’t understand what we do want from them. \n\nAlso they often don’t like being told not to do things (don’t we all?)",
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
                                    "value": "box_image_more",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "plh_images/workshops/instruct/guide_2/think/slide_1.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "NOW, THINK ABOUT A CHEETAH! \n\nWhat are you thinking about?",
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
                                        "value": "That’s right! Positive, clear instructions help teens focus on what they should be doing. \n\nTeens will also feel more respected this way, and are more likely to listen.",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
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
            "name": "number_of_slides",
            "value": 3,
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_1",
            "value": "plh_images/workshops/instruct/read_1/slide_1.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_1",
            "value": "@global.w_instruct_female_caregiver was cleaning the house while @global.w_instruct_teen_girl was with her friends practicing dance moves.\n\n@global.w_instruct_female_caregiver: “Don’t make such a mess while I am cleaning the house. You are in the way!”",
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_2",
            "value": "plh_images/workshops/instruct/read_1/slide_2.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_2",
            "value": "@global.w_instruct_teen_girl: “But I need to practice for the school competition. You never let me do anything.”\n\n@global.w_instruct_female_caregiver: “Don’t you talk back to me!”",
            "type": "set_variable"
          },
          {
            "name": "slide_image_src_3",
            "value": "plh_images/workshops/instruct/read_1/slide_3.svg",
            "type": "set_variable"
          },
          {
            "name": "slide_text_3",
            "value": "@global.w_instruct_teen_girl: “Arrg!! Why am I being yelled at all the time????.”\n\n(inside) @global.w_instruct_female_caregiver to herself: “That child is always making trouble.”",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "workshop_activity",
            "rows": [
              {
                "name": "intro_text",
                "value": "This happened with @global.w_instruct_teen_girl and her @global.w_instruct_female_caregiver the other day: ",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_read_1_temp",
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
                    "value": "box_image_more",
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
                        "value": "box_image_more",
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
                            "value": "@global.w_instruct_teen_girl: “Arrg!! Why am I being yelled at all the time????”\n\n@global.w_instruct_female_caregiver to herself: “That child is always making trouble.”",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
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
                  },
                  {
                    "name": "button",
                    "hidden": "false",
                    "comments": "(-) Say something nice first \n(-) Speak to her in a calm voice \n(-) Tell @global.w_instruct_teen_girl what she wants her to do ",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "instruct",
    "flow_name": "w_instruct_read_2_temp",
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
                "value": "Thank you for thinking along! Let’s go back in time and see what happens if @global.w_instruct_female_caregiver gives a positive instruction.",
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
                    "value": "box_image_more",
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
                        "value": "box_image_more",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/instruct/read_2/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@global.w_instruct_female_caregiver: \"Thank you for practicing outside while I finished cleaning the house, @global.w_instruct_teen_girl . Now I have some time to watch your dance.\"",
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
                                "value": "@global.w_instruct_female_caregiver: \"Wow, @global.w_instruct_teen_girl! You have such good dance moves!\"",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
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
                  },
                  {
                    "name": "button",
                    "value": "@global.ideas_short_button",
                    "hidden": "false",
                    "comments": "(-) @global.w_instruct_teen_girl felt respected and loved by her @global.w_instruct_female_caregiver\n(-) @global.w_instruct_female_caregiver was able to stay calm  \n(-) @global.w_instruct_female_caregiver  kept a positive attitude ",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
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
            "name": "tools_title",
            "value": "@global.w_instruct",
            "type": "set_variable"
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
                "value": "Often we know what we want in our head, but we don’t say it clearly enough. Say exactly what you want them to do. Try ‘please come home by 7pm’ instead of ‘come home in time’.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
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
                "name": "activity_title",
                "value": "Try it Together",
                "type": "set_variable"
              },
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
                    "value": "In a pair, take turns to be teenager and parent. Give your teenager one positive instruction.\n\nAnd then give your teenager encouragement and praise.",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "hidden": "false",
                    "comments": "Positive instructions: \n(-) I like your music, but could you turn it down so that we can talk whilst we have dinner? Thank you – I really appreciate this. \n(-) That’s great. Who is the singer? Please turn this off when you come in the house but you can play it in your room quietly if you want. Thank you!",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
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
                    "value": "@global.ideas_button",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_instruct.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_stepper",
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
            "value": [
              "w_money_welcome_together",
              "w_money_care_together",
              "w_money_relax",
              "w_money_reflect_together",
              "w_money_intro",
              "w_money_read_1_temp",
              "w_money_learn_1_temp",
              "w_money_learn_2_temp",
              "w_money_learn_3_temp",
              "w_money_learn_4_temp",
              "w_money_read_2_temp",
              "w_money_talk_1",
              "w_money_read_3_temp",
              "w_money_talk_2",
              "w_money_talk_3",
              "w_money_learn_5_temp",
              "w_money_tools_activity",
              "w_money_home_practice",
              "w_money_ending"
            ],
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
            "comments": "w_money_welcome_individual; w_money_relax; w_money_reflect_individual; w_money_intro; w_money_tools_activity; w_money_home_practice; w_money_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_welcome_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_welcome_individual",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "welcome_individual",
        "value": "welcome_individual",
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
                    "value": "Caring for yourself is so essential.",
                    "type": "set_variable"
                  },
                  {
                    "name": "question_text",
                    "value": "How are you feeling today?",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          },
          {
            "name": "reply_happy",
            "value": "Wonderful, I am so happy things are going well. Keep up the good work.",
            "type": "set_variable"
          },
          {
            "name": "reply_ok",
            "value": "Sorry that things are difficult now. It is completely normal to struggle sometimes. Remember that you are not alone!",
            "type": "set_variable"
          },
          {
            "name": "reply_sad",
            "value": "Sorry that things are difficult now. It is completely normal to struggle sometimes. Remember that you are not alone!",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_care_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_relax",
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
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_reflect_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_together",
        "value": "reflect_together",
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
                "value": "@global.home_practice_problem_solving: @global.w_stress",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_reflect_individual",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_individual",
        "value": "reflect_individual",
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
                    "name": "bottom_text",
                    "value": "Take a moment and just be impressed at what you’ve achieved, despite all the other things you have to do each day.",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "topic_intro",
        "value": "topic_intro",
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
            "name": "listen",
            "rows": [
              {
                "type": "nested_properties",
                "name": "workshop_activity",
                "rows": [
                  {
                    "name": "activity_title",
                    "value": "Why make a family budget?",
                    "type": "set_variable"
                  },
                  {
                    "name": "intro_text",
                    "value": "Many families are stressed about money, especially if teens keep asking for things! \n\nWhen we make a budget together, we can agree how to spend AND save to prevent stress and work towards our family’s goals.",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_read_1_temp",
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
                "value": "It can be hard to make ends meet every month. Many families have this problem! \n\nIncluding @global.w_money_grandma - let's have a look:",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/money/read_1/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_money_grandma: \"I am so stressed, I don’t have any money left. And now I’m fighting with my teens over things they want – again.\"",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/money/read_2/slide_1.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "\"I have been taking care of my grandchildren since their parents died when they were  young. My granddaughter @global.w_money_teen_girl is 16 and my grandson @global.w_money_teen_boy is 12.\"",
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
                            "value": "plh_images/workshops/money/read_2/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "\"We struggle with money. I work when I can, and we get a small grant. But things always get tough at the end of the month.\"",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_learn_1_temp",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "learn",
        "value": "learn_temp",
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
                "value": "A family budget can help @global.w_money_grandma - and YOU!",
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
                "rows": [
                  {
                    "name": "image_src",
                    "hidden": "true",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "There are four steps for doing a family budget: \n\nStep 1: THINK\nStep 2: TALK\nStep 3: BUILD\nStep 4: PLAN\n\nWe will review them together. You need:\n\n(-) Papers (or old newspaper or a cardboard box) and pens\n(-) Stones or beans or anything with lots of bits to represent money\n \nTake a minute to get these things before we start with the first step.",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_learn_2_temp",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "learn",
        "value": "learn_temp",
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
                "name": "intro_title",
                "value": "Step 1: THINK",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Now, each of the @field.group_name team members need to think about what we spend on.",
                "type": "set_variable"
              },
              {
                "name": "include_outro",
                "value": "true",
                "type": "set_variable"
              },
              {
                "name": "activity_banner",
                "hidden": "true",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "box_image",
                "rows": [
                  {
                    "name": "image_src",
                    "value": "plh_images/workshops/money/learn/slide_1.svg",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "(-) Get a piece of paper (or old newspaper or a cardboard box) and a pen. \n(-) Draw pictures of all the things that you and your family spend money on each month. \n(-) Write next to each picture how much each thing costs each month. (There is no need to share the numbers if you don’t want to.)\n(-) Add up how much money you have to spend each month. ",
                    "type": "set_variable"
                  },
                  {
                    "type": "nested_properties",
                    "name": "nav_buttons",
                    "rows": [
                      {
                        "name": "button_info",
                        "hidden": "false",
                        "comments": "(-) food \n(-) water & electricity \n(-) clothing \n(-) accounts \n(-) TV subscription \n(-) toiletries \n(-) salon \n(-) airtime \n(-) school fees \n(-) transport \n(-) insurance/policies \n(-) medication \n(-) entertainment/sports \n(-) rent \n(-) loans \n(-) church",
                        "type": "set_variable"
                      }
                    ]
                  }
                ]
              },
              {
                "name": "outro_text",
                "value": "Wonderful! You finished step 1! \n\nLet’s move on!",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_learn_3_temp",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "learn",
        "value": "learn_temp",
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
                "name": "intro_title",
                "value": "Step 2: TALK",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Talk together about your needs and wants\n\nWANT: Something you can live without\nNEED: Something you cannot live without",
                "type": "set_variable"
              },
              {
                "name": "activity_banner",
                "hidden": "true",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "box_image",
                "rows": [
                  {
                    "name": "image_src",
                    "value": "plh_images/workshops/money/learn/slide_2.svg",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "People often don’t see things in the same way. When we talk about our needs and wants, we understand each other better and can make good decisions together on how to spend our money.\n\nLook at your lists and think:\n\n(-) Which are NEEDS that you can’t live without? Why?\n(-) Which are WANTS which are nice to have but not essential? Why? \n\nDiscuss together what things you could try to spend less on as a family.",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_learn_4_temp",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "learn",
        "value": "learn_temp",
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
                "name": "intro_title",
                "value": "Step 3: BUILD",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Make a budget as one big family!",
                "type": "set_variable"
              },
              {
                "name": "activity_banner",
                "hidden": "true",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "box_image",
                "rows": [
                  {
                    "name": "image_src",
                    "value": "plh_images/workshops/money/learn/slide_3.svg",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "(-) One person will volunteer to share his/her list (If no one volunteers you can make a new list together) \n(-) Take roles - some will be adults, some will be teens. \n(-) Decide what your income is for the month.\n(-) Take some stones or beans or anything with lots of bits - this is your income for the month. \n(For example: If your income is $100, and you have 20 beans, each bean is $5.  \n(-) Decide together what you will spend on what, and put the stones/objects on your picture. \n\nNot sure about your decisions? Having trouble deciding between \"needs\" and \"wants\"? That’s totally fine!",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_read_2_temp",
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
                "value": "Great work, you have completed the first 3 steps! \n\nLet's see how @global.w_money_grandma made a plan with her money, just like you are doing: ",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/money/read_3/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "\"I have been taking care of my grandchildren since their parents died when they were young, but we often run out of money. \n\n@global.w_money_teen_girl is so clever! She will graduate next year and need books and money for university!  \n\nAnd @global.w_money_teen_boy will go to high school soon - but he will need a uniform and transport money!\"",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/money/read_3/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "\"I want the best future for my grandchildren, but I don’t know where to get the money. Loan sharks are dangerous and paying them back is so expensive. \n\nI should save, but that feels impossible!\"",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/money/read_3/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "\"My goal is to make sure my grandson can go to high school and my granddaughter can reach her dream of university. How can I save a lot of money with the little money I have?\"",
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
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/money/read_3/slide_4.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "\"I know - let’s start with a plan! First, let me make a budget – a plan for how I can save my money. Then I will save just a little bit of money at a time – I will even join a savings and loans group.\"",
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
                                    "value": "box_image_more",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "plh_images/workshops/money/read_3/slide_5.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "\"I should also speak with my grandchildren to choose things that we can spend just a little bit less on each week. They will help me think of things we want but don’t need.\"",
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
                                        "value": "plh_images/workshops/money/read_3/slide_6.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "A few years later:\n\n\"Look, we reached our dreams! I didn’t borrow any money from friends or loan sharks. By saving a tiny bit each week, I managed to pay for @global.w_money_teen_boy’s high school and save some money for @global.w_money_teen_girl’s university. I am so proud of this.”",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_talk_1",
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
                "value": "Let's talk about saving.",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Let’s go back to the budget you planned together: \n\nWhat are your  family savings goals?",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "hidden": "false",
                    "comments": "(-) Teens completing school/university \n(-) Building/expanding a house for my family \n(-) Starting a business \n(-) Buying a car for my family ",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "name": "outro_text",
                "value": "Such great goals! When we make a good budget and saving plan together, we can achieve it and feel proud of ourselves!",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_read_3_temp",
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
                "value": "There is one more thing @global.w_money_grandma learned along the way… ",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "box_image",
                "rows": [
                  {
                    "name": "image_src",
                    "value": "plh_images/workshops/money/read_4/slide_1.svg",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "“One night there was a horrible storm that broke my roof. Everything was flooded. I suddenly had to find money to fix the roof. I just felt defeated.”",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_talk_2",
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
                "value": "Let's talk about this story.",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "For @global.w_money_grandma, a storm happened. \n\nWhat other emergencies could come up for us?",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "hidden": "false",
                    "comments": "(-) Severe illness or death of a friend or family member  \n(-) Robbery \n(-) Flooding \n(-) Political violence \n(-) Losing my job\n(-) Pandemic (COVID-19) ",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "name": "outro_text",
                "value": "Remember, we already made a plan for our needs and wants, and for our goals.  Now we have seen that it is important to have an EMERGENCY PLAN too!",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_talk_3",
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
                "value": "Let's talk about different ways we can save.",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Discuss together: \n\n(-) In which different ways can we save?  \n(-) What are the advantages and disadvantages of each savings option? \n\nUnderstanding each option well will help you to decide what is the best saving option for your family.  \n\nWhatever savings plan you choose, it will really help your family move forward! \n",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "hidden": "false",
                    "comments": "(-) at home\n(-) buy things we can sell\n(-) at a bank\n(-) in a savings group",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_learn_5_temp",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "learn",
        "value": "learn_temp",
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
                "name": "intro_title",
                "value": "Step 4: PLAN",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Emergencies and family goals",
                "type": "set_variable"
              },
              {
                "name": "include_outro",
                "value": "true",
                "type": "set_variable"
              },
              {
                "name": "activity_banner",
                "hidden": "true",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "box_image",
                "rows": [
                  {
                    "name": "image_src",
                    "value": "plh_images/workshops/money/learn/slide_4.svg",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "If you can save even a tiny amount for the future or emergency - it can make a big difference over time. \n\n(-) Add a circle called “emergencies”.\n(-) Add a circle called “family goals”.\n(-) Now try to move your money around so you can save a bit every month for each of these.  ",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "name": "outro_text",
                "value": "CONGRATULATIONS!!! You’ve made your family budget – and using it will make a huge difference for you. I think every person in your family deserves a praise, don’t you?",
                "type": "set_variable"
              },
              {
                "name": "outro_habit_text",
                "value": "When you’ve done your budget, or anytime you make a good choice about needs, wants and savings, click the @global.parent_point and celebrate your success",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_tools",
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
            "name": "tools_title",
            "value": "@global.w_money",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "tool_1",
            "rows": [
              {
                "name": "title",
                "value": "Step 1: THINK",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "What do we spend on now?",
                "type": "set_variable"
              },
              {
                "name": "button_1",
                "value": "THINK Activity",
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
                "value": "Step 2: TALK",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Talk together about needs and wants",
                "type": "set_variable"
              },
              {
                "name": "button_1",
                "value": "TALK Activity",
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
                "value": "Step 3: BUILD",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Make your own budget",
                "type": "set_variable"
              },
              {
                "name": "button_1",
                "value": "BUILD Activity",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_4",
            "hidden": "false",
            "rows": [
              {
                "name": "title",
                "value": "Step 4: PLAN",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Emergencies and family goals",
                "type": "set_variable"
              },
              {
                "name": "button_1",
                "value": "PLAN Activity",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_tools_activity",
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
                "value": "w_money_tools",
                "rows": []
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_home_practice",
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
                    "value": "Make a budget with your teen and family. This will help teens understand that we all need to make hard decisions in difficult times. \n\nBudgets have helped  millions of families to have  enough money at the end of the month. \n\nThis is an important and fun thing to do with your family – it takes about 30 minutes.",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "@global.essential_tools",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "money",
    "flow_name": "w_money_ending",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_money.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_stepper",
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
            "value": [
              "w_praise_welcome_together",
              "w_praise_care_together",
              "w_praise_relax",
              "w_praise_reflect_together",
              "w_praise_intro",
              "w_praise_talk_1",
              "w_praise_read_temp",
              "w_praise_talk_2",
              "w_praise_tools_activity",
              "w_praise_talk_3",
              "w_praise_home_practice",
              "w_praise_ending"
            ],
            "comments": "w_praise_welcome_together; w_praise_care_together; w_praise_reflect_together; w_praise_relax; w_praise_intro; w_praise_talk_1; w_praise_read; w_praise_talk_2; w_praise_tools_activity; w_praise_talk_3; w_praise_home_practice; w_praise_ending",
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
            "value": [
              "w_praise_welcome_individual",
              "w_praise_intro",
              "w_praise_read_temp",
              "w_praise_tools_activity",
              "w_praise_home_practice",
              "w_praise_ending"
            ],
            "comments": "w_praise_welcome_individual; w_praise_reflect_individual; w_praise_relax; w_praise_intro; w_praise_question_1; w_praise_read; w_praise_question_2; w_praise_tools_activity; w_praise_think_1; w_praise_home_practice; w_praise_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
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
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_reflect_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_together",
        "value": "reflect_together",
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
                "value": "@global.home_practice_problem_solving: @global.w_1on1",
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
                        "hidden": "true",
                        "type": "set_variable"
                      },
                      {
                        "name": "title",
                        "value": "STEP 1: Share :) and :( ",
                        "hidden": "false",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "I learned so much more about my teen’s life when we spent one-on-one time! But after the first day, my teen only wanted to play on his phone.",
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
                            "hidden": "true",
                            "type": "set_variable"
                          },
                          {
                            "name": "title",
                            "value": "STEP 2: Bring ideas!",
                            "hidden": "false",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "Well done for trying! Maybe you could suggest some other fun things you could do together with your teen.\n\nYes, or you could do something together on his phone? Or he could show you how his phone works?",
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
                                "hidden": "true",
                                "type": "set_variable"
                              },
                              {
                                "name": "title",
                                "value": "STEP 3: Pick and try one!",
                                "hidden": "false",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "Thank you for those great ideas! Yes, let me ask my teen to show how his phone works tomorrow after school.",
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
                                "value": "Take turns to discuss how your home activities went:\n\n(1) What went well and what was a problem?\n(2) What solutions can you think of together?\n(3) Pick one solution and try it later with your teen! \n\n(Or you can even practice it now  so it will be easier later!)",
                                "type": "set_variable"
                              },
                              {
                                "type": "nested_properties",
                                "name": "widget_timer",
                                "rows": [
                                  {
                                    "name": "duration",
                                    "value": 20,
                                    "type": "set_variable"
                                  }
                                ]
                              },
                              {
                                "type": "nested_properties",
                                "name": "nav_buttons",
                                "rows": [
                                  {
                                    "name": "button_info",
                                    "value": "@global.ideas_button",
                                    "hidden": "false",
                                    "comments": "This button takes you to the corresponding challenges and solutions flow of the in-week content",
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
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
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
            "rows": []
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "topic_intro",
        "value": "topic_intro",
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
            "name": "listen",
            "rows": [
              {
                "type": "nested_properties",
                "name": "workshop_activity",
                "rows": [
                  {
                    "name": "activity_title",
                    "value": "Why @global.w_praise_short?",
                    "type": "set_variable"
                  },
                  {
                    "name": "intro_text",
                    "value": "Praise is a powerful parenting skill.",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
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
                "type": "nested_properties",
                "name": "content_box",
                "value": "box_timer",
                "rows": [
                  {
                    "name": "text",
                    "value": "Share with each other:\n(-) When last did someone thank you or said you did something great? \n(-) How did it make you feel? \n(-) How does it feel if you are not thanked or praised for what you do? \n\nParents usually don’t get thanked or praised enough. Maybe you can give your teens the right example and praise them first when they do something well! ",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "praise",
    "flow_name": "w_praise_read_temp",
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
                "value": "Sometimes we tell our teens to do 20 things and they ignore us. Often we just want to scream. But then they still ignore us.\n\nBut the other day, @global.w_praise_female_caregiver_name was surprised by her teens! Let me tell you:",
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
                    "value": "box_image_more",
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
                        "value": "\"Thank you for being so helpful. I'm proud of you!\"\n\nHere’s the parenting skill: if we tell our teens how proud we are of them for doing this, then they will want to do it again.",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
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
                "value": "Let's discuss this story.",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "How did praise make her teens feel?\n\nWhy did she praise them?",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "value": "@global.ideas_short_button",
                    "hidden": "false",
                    "comments": "@global.w_praise_female_caregiver_name praised her teens...\n(-) to get them to do it more often\n(-) to help her finish her work \n(-) to make them feel good \n(-) to make herself feel good ",
                    "type": "set_variable"
                  }
                ]
              },
              {
                "name": "outro_text",
                "value": "The same can work for you!",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you praise your teen, click the @global.parent_point and celebrate your success",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
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
            "name": "tools_title",
            "value": "@global.w_praise",
            "type": "set_variable"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
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
                "name": "activity_title",
                "value": "Try it Together",
                "comments": "This may exist more generally",
                "type": "set_variable"
              },
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
                    "value": "Share with each other: \n(-) What can you praise your teen for? \n(-) What has someone else done well during this workshop? Tell them!\n(-) How did it make you feel to praise someone?\n(-) How did it make you feel to be praised?",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "hidden": "false",
                    "comments": "Sometimes it’s hard to think of what to praise your teen for! Here are some ideas.\n(-) Being kind to someone \n(-) Cleaning their room \n(-) Joining a family meal \n(-) Greeting other family members \n(-) Looking after siblings \n(-) Coming home in time \n(-) Showing thoughtfulness \n(-) Saying 'please' or  'thank you' \n(-) Going to school  \n(-) Doing chores or schoolwork  \n(-) Getting through mealtime peacefully ",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
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
                    "value": "@global.ideas_button",
                    "comments": "same ideas as in w_praise_talk_3",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_2",
                    "value": "@global.essential_tools",
                    "hidden": "false",
                    "type": "set_variable"
                  },
                  {
                    "name": "habit_text",
                    "value": "Every time you praise your teen, click the @global.parent_point and celebrate your success",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_praise.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_stepper",
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
            "value": [
              "w_rules_welcome_together",
              "w_rules_care_together",
              "w_rules_relax",
              "w_rules_reflect_together",
              "w_rules_intro",
              "w_rules_read_1_temp",
              "w_rules_talk_1",
              "w_rules_tools_activity",
              "w_rules_read_2_temp",
              "w_rules_talk_2",
              "w_rules_home_practice",
              "w_rules_ending"
            ],
            "comments": "w_rules_welcome_together; w_rules_care_together; w_rules_relax; w_rules_reflect_together; w_rules_intro; w_rules_read_1_temp; w_rules_talk_1; w_rules_tools_activity; w_rules_read_2_temp; w_rules_talk_2; w_rules_home_practice; w_rules_ending",
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
            "comments": "w_rules_welcome_individual; w_rules_relax; w_rules_reflect_individual; w_rules_intro; w_rules_read_1; w_rules_read_2; w_rules_tools_activity; w_rules_home_practice; w_rules_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_welcome_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_welcome_individual",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "welcome_individual",
        "value": "welcome_individual",
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
                    "value": "Remember that YOU matter!",
                    "type": "set_variable"
                  },
                  {
                    "name": "question_text",
                    "value": "How are you feeling today?",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          },
          {
            "name": "reply_happy",
            "value": "Well done for recognising a positive feeling. I am happy to hear you are feeling well today!",
            "type": "set_variable"
          },
          {
            "name": "reply_ok",
            "value": "Well done for recognising a difficult feeling. It’s okay not to be okay sometimes. Remember you are not alone.",
            "type": "set_variable"
          },
          {
            "name": "reply_sad",
            "value": "Well done for recognising a difficult feeling. It’s okay not to be okay sometimes. Remember you are not alone.",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_care_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_relax",
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
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_reflect_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_together",
        "value": "reflect_together",
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
                "value": "@global.home_practice_problem_solving: @global.w_money",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_reflect_individual",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_individual",
        "value": "reflect_individual",
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
                    "name": "bottom_text",
                    "value": "This is just incredible. Every one of these habits is making your family stronger. Be proud.",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "topic_intro",
        "value": "topic_intro",
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
            "name": "listen",
            "rows": [
              {
                "type": "nested_properties",
                "name": "workshop_activity",
                "rows": [
                  {
                    "name": "activity_title",
                    "value": "Why @global.w_rules?",
                    "type": "set_variable"
                  },
                  {
                    "name": "intro_text",
                    "value": "Rules help teens understand what is expected from them. \n\nTeens are more likely to follow rules if you create the rules WITH your teen and praise them for it! ",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_read_1_temp",
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
                "value": "Let's read what happened with @global.w_rules_teen_boy and his @global.w_rules_female_caregiver_1",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/rules/read_1/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_rules_female_caregiver_1: \"You always come home late!\"\n\n@global.w_rules_teen_boy: \"No I don’t, I don’t even know what late means! Stop nagging me.\"",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/rules/read_1/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "Discuss together: \nWhich specific rule could @global.w_rules_teen_boy and @global.w_rules_female_caregiver_1 create together?  \n\nLet’s see how @global.w_rules_female_caregiver_1 and @global.w_rules_teen_boy could do this!",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/rules/read_1/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@global.w_rules_female_caregiver_1: “I want you to have fun, @global.w_rules_teen_boy, but I’m also worried about you staying out late. Do you know why?” \n\n@global.w_rules_teen_boy: “Because you want me to have enough time for my schoolwork?”",
                                "type": "set_variable"
                              }
                            ]
                          },
                          {
                            "type": "nested_properties",
                            "name": "box_1",
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/rules/read_1/slide_4.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@global.w_rules_female_caregiver_1: “That’s right, and it’s also not safe in this area to be outside after sunset. What do you think would be a good time for you to be home?”",
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
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/rules/read_1/slide_5.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "@global.w_rules_teen_boy: “I could come home at 10pm?\"  \n\n@global.w_rules_female_caregiver_1: “That’s a bit late, what about 6pm? Or something in the middle? ",
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
                                    "value": "box_image_more",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "plh_images/workshops/rules/read_1/slide_6.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "@global.w_rules_teen_boy: “I could come home at 6pm on school nights and 10pm on Friday and Saturday?” \n\n@global.w_rules_female_caregiver_1: “Yes, great. From now on, our household rule is that you need to come home at 6pm on school nights and 10pm on Friday and Saturday. But you always walk home with a friend. Okay?”",
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
                                        "value": "box_image_more",
                                        "rows": [
                                          {
                                            "name": "image_src",
                                            "value": "plh_images/workshops/rules/read_1/slide_7.svg",
                                            "type": "set_variable"
                                          },
                                          {
                                            "name": "text",
                                            "value": "@global.w_rules_teen_boy: “Okay, @global.w_rules_female_caregiver_1” \n\n@global.w_rules_female_caregiver_1: “Thank you very much, @global.w_rules_teen_boy, for helping to come up with a good rule together. I am proud to see how responsible you are getting.”  ",
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
                                            "value": "plh_images/workshops/rules/read_1/slide_8.svg",
                                            "type": "set_variable"
                                          },
                                          {
                                            "name": "text",
                                            "value": "The next day...\n\n@global.w_rules_female_caregiver_1: “Thank you, @global.w_rules_teen_boy, for coming home on time. After you have finished your schoolwork we can have your favourite meal for dinner.”  ",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_talk_1",
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
                    "value": "box_timer",
                    "rows": [
                      {
                        "name": "text",
                        "value": "What went well here in making a rule together?",
                        "type": "set_variable"
                      },
                      {
                        "name": "button",
                        "value": "@global.ideas_short_button",
                        "hidden": "false",
                        "comments": "(-) They discussed the reasons behind the rule \n(-) @global.w_rules_female_caregiver_1 listened to @global.w_rules_teen_boy’s suggestions \n(-) The rule was clear, specific and fair \n(-) @global.w_rules_female_caregiver_1 praised @global.w_rules_teen_boy for helping to make the rule ",
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
                        "value": "How do you think @global.w_rules_teen_boy knew his @global.w_rules_female_caregiver_1 appreciated him? ",
                        "type": "set_variable"
                      },
                      {
                        "name": "button",
                        "value": "@global.ideas_short_button",
                        "hidden": "false",
                        "comments": "(-) She praised him\n(-) She rewarded him when he followed the rule ",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_tools",
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
            "name": "tools_title",
            "value": "@global.w_rules",
            "type": "set_variable"
          },
          {
            "name": "top_text",
            "value": "Household rules help keep our teenagers safe, and understand what is expected from them. When you involve a teenager in making rules they are more likely to follow them.",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "tool_1",
            "rows": [
              {
                "name": "title",
                "value": "TEAM RULES",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Plan rules with your teenager. One rule at a time is easiest. Discuss the reasons for the rule and listen to their views. ",
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
                "value": "REAL RULES ",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Make them realistic for what your teenager can do, and be clear and specific so there’s no misunderstanding. Not ‘on time’ but ‘by 7pm’.  ",
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
                "value": "PRAISE RULES! ",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Praise your teen for planning a rule with you, and praise them for keeping it!",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_tools_activity",
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
                "value": "w_rules_tools",
                "rows": []
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_read_2_temp",
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
                "name": "activity_image",
                "value": "plh_images/habits/habit_safe_image.svg",
                "type": "set_variable"
              },
              {
                "name": "activity_title",
                "value": "Online Safety",
                "type": "set_variable"
              },
              {
                "name": "include_outro",
                "value": "true",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Rules are important to keep your teens safe - also online. There’s more about this in the Weekly Workshop on safety planning, but let’s already have a first look now!",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/rules/read_2/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_rules_female_caregiver_2: \"@global.w_rules_teen_girl, have you done your homework?\"\n\n@global.w_rules_teen_girl: \"Just a minute @global.w_rules_female_caregiver_2, I’m finishing this @global.teen_social_medium video\"",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/rules/read_2/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_rules_female_caregiver_2: \"You are a really great dancer! Tell me about why you like it\"\n\n@global.w_rules_teen_girl: \"All my friends are on it, @global.w_rules_female_caregiver_2 . I have more than 600 likes and 120 followers.\"",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/rules/read_2/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@global.w_rules_female_caregiver_2: \"I’m proud of how well you dance, @global.w_rules_teen_girl . But we need to make sure you are safe. \n\nI know your friends look at @global.teen_social_medium, but with an open account there are also paedophiles who look at videos of teenagers. \n\nPaedophiles are adults who want to attack young girls and boys.\"",
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
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/rules/read_2/slide_4.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "@global.w_rules_female_caregiver_2: \"Let’s look together online at how we can keep this fun for you but also safe. Look – you can make your account private and control who follows you. \n\nSo you can accept people you know, but not strangers. \n\nCan we make a rule together that you can use @global.teen_social_medium, but with a private account? I trust you to know who to accept!\"",
                                    "type": "set_variable"
                                  }
                                ]
                              },
                              {
                                "type": "nested_properties",
                                "name": "box_2",
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/rules/read_2/slide_5.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "@global.w_rules_female_caregiver_2: \"I’m proud of you @global.w_rules_teen_girl\"",
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
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you do something to keep your teen safe, click the @global.parent_point and celebrate your success",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_talk_2",
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
                "value": "Let's practice making rules.",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "What is one important rule you’d each like to make with your teenager? \n\nIn a pair, take turns to be the teenager. Make a rule that you are both OK with!\n\nMake rules specific and realistic! \n\nFor example, agree on a timetable for washing dishes: My daughter washes Monday to Wednesday and my son washes Thursday to Saturday. I do Sunday. ",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "hidden": "false",
                    "comments": "Here are some of the rules parents shared with us:\n(-)Teen can play outside for after finishing homework\n(-) All family members are eating dinner together\n(-) Teen 1 do dishes on Sunday and Monday, Teen 2 on Tuesday and Wednesday\n(-) We speak to each other politely and nicely\n(-) When listening to music you need to use earphones",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_home_practice",
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
                    "value": "This week, set one rule together with your teen.\n\nRemember to praise your teen afterwards!",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "@global.ideas_button",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "rules",
    "flow_name": "w_rules_ending",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_rules.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_stepper",
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
            "value": [
              "w_safe_welcome_together",
              "w_safe_care_together",
              "w_safe_relax",
              "w_safe_reflect_together",
              "w_safe_intro",
              "w_safe_read_1_temp",
              "w_safe_talk_1",
              "w_safe_read_2_temp",
              "w_safe_talk_2",
              "w_safe_learn_temp",
              "w_safe_tools_activity",
              "w_safe_home_practice",
              "w_safe_ending"
            ],
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
            "comments": "w_safe_welcome_individual; w_safe_relax; w_safe_reflect_individual; w_safe_intro; w_safe_tools_activity; w_safe_home_practice; w_safe_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_welcome_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_welcome_individual",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "welcome_individual",
        "value": "welcome_individual",
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
                    "value": "Being a great parent also means taking time to care for yourself every day.",
                    "type": "set_variable"
                  },
                  {
                    "name": "question_text",
                    "value": "How are you feeling today?",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          },
          {
            "name": "reply_happy",
            "value": "Great. And amazing that you are using this app – it shows your commitment as a parent. Make sure you give yourself credit and praise for what you are doing.",
            "type": "set_variable"
          },
          {
            "name": "reply_ok",
            "value": "Being a parent is hard. But it is amazing that you are using this app – it shows your commitment as a parent. Make sure you give yourself credit and praise for what you are doing.",
            "type": "set_variable"
          },
          {
            "name": "reply_sad",
            "value": "Being a parent is hard. But it is amazing that you are using this app – it shows your commitment as a parent. Make sure you give yourself credit and praise for what you are doing.",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_care_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_relax",
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
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_reflect_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_together",
        "value": "reflect_together",
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
                "value": "@global.home_practice_problem_solving: @global.w_solve",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_reflect_individual",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_individual",
        "value": "reflect_individual",
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
                    "name": "bottom_text",
                    "value": "Doing any of these makes you a great parent.",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "topic_intro",
        "value": "topic_intro",
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
            "name": "listen",
            "rows": [
              {
                "type": "nested_properties",
                "name": "workshop_activity",
                "rows": [
                  {
                    "name": "activity_title",
                    "value": "Why @global.w_safe?",
                    "type": "set_variable"
                  },
                  {
                    "name": "intro_text",
                    "value": "Teens can spend a lot of time outside the house or online, where it is harder for us to keep them safe. Talking together about safe and unsafe places, and how to prevent problems, really helps!",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_read_1_temp",
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
                "type": "nested_properties",
                "name": "content_box",
                "value": "pair",
                "rows": [
                  {
                    "type": "nested_properties",
                    "name": "box_1",
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/safe/read_1/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_safe_teen_girl_1: \"Something happened when I was out with my friends @global.w_safe_teen_girl_2 and @global.w_safe_teen_girl_1!\"\n\n@global.w_safe_female_caregiver: \"Tell me, @global.w_safe_teen_girl_1\"",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/safe/read_1/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "Man in car: “Hey beautiful. I have been looking at you for a while. You are very beautiful, what’s your name?  \n\n@global.w_safe_teen_girl_2: “Her name is @global.w_safe_teen_girl_1” ",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/safe/read_1/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "Man in car: “@global.w_safe_teen_girl_1, would you like to come with me to have something to drink and chips? Come on, get in, you’ll be back in time, I promise…” \n\n@global.w_safe_teen_girl_1: “I’m not sure if that’s a good idea…” ",
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
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/safe/read_1/slide_4.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "@global.w_safe_teen_girl_2: “You are lucky, my friend. I wish I could also have a man that would ask me out and buy me gifts. I’m telling you, if you don’t do this I’m going to tell everyone you are stupid!” ",
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
                                    "value": "box_image_more",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "plh_images/workshops/safe/read_1/slide_5.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "@global.w_safe_teen_girl_3: “@global.w_safe_teen_girl_1 don’t go! Be careful! Let’s go home. It is dangerous to go with people you don’t know. Besides, he’s too old for you and what he is doing is wrong.\"\n\n@global.w_safe_teen_girl_1: “I just don’t know…” ",
                                        "type": "set_variable"
                                      }
                                    ]
                                  },
                                  {
                                    "type": "nested_properties",
                                    "name": "box_2",
                                    "value": "box_image_more",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "plh_images/workshops/safe/read_1/slide_6.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "@global.w_safe_female_caregiver: \"Pfff, I am so proud of you that you did not get into the car. That was a dangerous situation, thank you for telling me!\"  ",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_talk_1",
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
                "value": "Let's talk about what happened to @global.w_safe_teen_girl_1",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "What was risky about that situation?  ",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "value": "@global.ideas_short_button",
                    "hidden": "false",
                    "comments": "(-) The man in the car was pressuring Faraja with gifts \n(-) Faraja’s friend was encouraging her  \n(-) Going with an older man puts Faraja in a dangerous situation where she can get hurt or be forced to do things \n(-) Many girls in our communities get pregnant or catch HIV from older men \n(-) There were no other trusted adults to advise Faraja ",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_read_2_temp",
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
                "value": "Let's look at another example together.",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/safe/read_2/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_safe_teen_girl_1: \"My friend has been talking with a guy our age online... She’s going to send him photos of herself. Is that better because he’s our age?\"",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/safe/read_2/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_safe_female_caregiver: \"You are a good friend for being worried about her. Sending sexy photos is a real risk too.\"",
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
                            "value": "plh_images/workshops/safe/read_2/slide_3.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_safe_female_caregiver: \"Sometimes people aren’t who they say they are online – he could say he is your age but be a 50 year old man. Or when they break up, he sends those photos to everyone so your friend feels awful.\"",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_talk_2",
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
                "value": "Let's talk about our teens' online safety.",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "What are some of the online risks for teens these days? ",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "hidden": "false",
                    "comments": "(-) Adults use social media, gaming and messaging apps and websites to meet teenagers and persuade them to do sexual things \n(-) People put things online to make us hurt other people – like making violence seem cool, or hating people from another race or country\n(-) People put things online to persuade teenagers to hurt themselves or commit suicide\n(-) Teenagers share sexy videos or photos or information about themselves, and people show it to others or use it to upset them\n(-) People can often be nasty to teenagers online – they feel like they can bully people safely",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_learn_temp",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "learn",
        "value": "learn_temp",
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
                "name": "intro_title",
                "value": "Safety Plan",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Let’s make two maps together of safe and unsafe places:\n(1) A map of our community\n(2) A map of apps/websites we use online\n\nLet’s make these maps as a group now. \n\nYou’ll do the same with your teen as home practice this week.",
                "type": "set_variable"
              },
              {
                "name": "include_outro",
                "value": "true",
                "type": "set_variable"
              },
              {
                "name": "activity_banner",
                "hidden": "true",
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
                        "value": "plh_images/workshops/safe/learn/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "title",
                        "value": "Step 1: What are important places in your community? ",
                        "hidden": "false",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "(-) Get a piece of paper (or old newspaper or a cardboard box) and a pen. \n(-) Draw a map of your teen’s community, with pictures of all the main places like streets, your house, school, shops, places your teen visits.",
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
                            "value": "plh_images/workshops/safe/learn/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "title",
                            "value": "Step 2: Which places are safe and unsafe?",
                            "hidden": "false",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "Discuss together:\n\n(-) Which areas on your map are safe for teenagers \n     – CIRCLE these \n(-) Which areas on your map are unsafe for teenagers \n     – CROSS those off  \n(-) What makes a place safe or unsafe?  \n(-) What could you and your teen do to keep your teen safer?",
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
                                "value": "plh_images/workshops/safe/learn/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "title",
                                "value": "Step 3: Where can you get support?",
                                "hidden": "false",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "Sometimes, we can find ourselves in trouble. Discuss together:\n \n(-) Where can you and your teen get support when you face a crisis? \n     – MARK those areas with a little object like a stone or piece of paper.  \n\nBelow are some places that can be helpful",
                                "type": "set_variable"
                              },
                              {
                                "type": "nested_properties",
                                "name": "nav_buttons",
                                "rows": [
                                  {
                                    "name": "button_info",
                                    "value": "Resources to help in the community",
                                    "hidden": "false",
                                    "type": "set_variable"
                                  }
                                ]
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
                                "value": "plh_images/workshops/safe/learn/slide_4.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "title",
                                "value": "Step 4: What are risky places online and how can you make them safer? ",
                                "hidden": "false",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "(-) Draw pictures of the apps and websites your teenagers use \n(-) Praise each other for how good they are at using the web!  \n(-) Talk about which ones might be unsafe. Why? \n(-) What could you and your teen do to make using the internet safer for your teen and their friends?",
                                "type": "set_variable"
                              },
                              {
                                "type": "nested_properties",
                                "rows": [
                                  {
                                    "name": "button_info",
                                    "value": "Online Safety Resources",
                                    "hidden": "false",
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
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you plan or keep a safety plan, click the @global.parent_point and celebrate your success",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_tools",
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
            "name": "tools_title",
            "value": "@global.w_safe",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "tool_1",
            "rows": [
              {
                "name": "title",
                "value": "MAPS",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Make MAPS with your teen of safe and unsafe areas in your community and online. Talk about how to keep their information, photos and videos private online. Talk about how once something goes online, it stays there forever. They might know an example from their friends.",
                "type": "set_variable"
              },
              {
                "name": "button_1",
                "value": "Safety Plan Activity",
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
                "value": "RULES",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Make RULES with your teen about safely using the apps and websites that they like. \n\nRemember the story about Online Safety? See it again here.",
                "type": "set_variable"
              },
              {
                "name": "button_1",
                "value": "Online Safety Story",
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
                "value": "AMNESTY",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Make an AMNESTY agreement. If something happens that makes them upset, uncomfortable or scared, they can talk to you and you won’t get angry or punish them, even if they were doing something wrong.\n\nRemember the story about Safety Amnesty? See it again here.",
                "type": "set_variable"
              },
              {
                "name": "button_1",
                "value": "Safety Amnesty Story",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          },
          {
            "name": "bottom_text",
            "value": "Digital parenting is just like parenting in the real world. You have taken a BIG STEP to keeping your teen safe in the community AND online. Good for you!",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "name": "button_1",
            "value": "Resources to help in the community",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "name": "button_2",
            "value": "Online Safety Resources",
            "hidden": "false",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_tools_activity",
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
                "value": "w_safe_tools",
                "rows": []
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_home_practice",
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
                    "value": "Make two maps with your teen of safe and unsafe places:\n(-) Map of your community\n(-) Map of apps and websites your teen uses \n\nMake sure you're both happy with the safety plan.  \n\nWhat really matters is that you talk with your teen as you do this – often teens know much more than we do about where it is safe and unsafe!",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "Safety Plan Activity",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_2",
                    "value": "@global.essential_tools",
                    "hidden": "false",
                    "type": "set_variable"
                  },
                  {
                    "name": "habit_text",
                    "value": "Every time you plan or keep a safety plan, click the @global.parent_point and celebrate your success",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
  },
  {
    "flow_type": "template",
    "module": "safe",
    "flow_name": "w_safe_ending",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_safe.xlsx"
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
            "value": [
              "w_self_care_welcome_together",
              "w_self_care_intro",
              "w_self_care_relax",
              "w_self_care_recognise",
              "w_self_care_reward",
              "w_self_care_tools_activity",
              "w_self_care_home_practice",
              "w_self_care_ending"
            ],
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
        "hidden": "@field.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "comments": "w_self_care_welcome_individual; w_self_care_intro; w_self_care_relax; w_self_care_recognise; w_self_care_reward;  w_self_care_tools_activity; w_self_care_survey_activity; w_self_care_home_practice; w_self_care_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_self_care.xlsx"
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
                    "value": "It’s great to have you here. Let’s start with a song for families everywhere.",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_welcome_individual",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "welcome_individual",
        "value": "welcome_individual",
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
                "value": "It’s great to have you here.",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "topic_intro",
        "value": "topic_intro",
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
            "name": "listen",
            "rows": [
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
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_self_care.xlsx"
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
                "name": "outro_text",
                "value": "Well done! Try to do this every day.",
                "type": "set_variable"
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you do a relax, click the @global.parent_point and celebrate your success",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_self_care.xlsx"
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
                "name": "activity_image",
                "value": "plh_images/habits/habit_praise_yourself_image.svg",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Everyone take a moment to praise yourselves. We’ll show you how.",
                "comments": "!@field.do_workshops_together",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "box_image",
                "rows": [
                  {
                    "name": "image_src",
                    "value": "plh_images/workshops/self_care/guide_2/recognise.svg",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "Think of one thing YOU have done well recently!\n\nSay it aloud to each other:  \"Well done to me for …\"\n\nHere is one thing you deserve praise for - WELL DONE for using ParentApp!",
                    "type": "set_variable"
                  },
                  {
                    "type": "nested_properties",
                    "name": "nav_buttons",
                    "rows": [
                      {
                        "name": "button_info",
                        "action_list": [
                          {
                            "trigger": "click",
                            "action_id": "pop_up",
                            "args": [
                              "w_self_care_recognise_pop"
                            ],
                            "_raw": "click | pop_up:w_self_care_recognise_pop",
                            "_cleaned": "click | pop_up:w_self_care_recognise_pop"
                          }
                        ],
                        "hidden": "false",
                        "type": "set_variable"
                      }
                    ]
                  }
                ]
              },
              {
                "name": "outro_text",
                "value": "Well done! Try to do this every day.",
                "type": "set_variable"
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you praise yourself, click the @global.parent_point and celebrate your success",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_recognise_pop",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "suggestions",
        "value": "suggestions",
        "rows": [
          {
            "name": "description_text",
            "value": "Things to praise yourself for:",
            "type": "set_variable"
          },
          {
            "name": "list_text",
            "value": "(-) Showing love to your children \n(-) Getting up even though you felt tired \n(-) Smiling at someone \n(-) Making food to stay strong \n(-) Spending time with your children \n(-) Helping your children with schoolwork",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_reward",
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
                "value": "Reward",
                "type": "set_variable"
              },
              {
                "name": "activity_image",
                "value": "plh_images/habits/habit_treat_yourself_image.svg",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "You all deserve to treat yourself well!",
                "comments": "!@field.do_workshops_together",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "box_image",
                "rows": [
                  {
                    "name": "image_src",
                    "value": "plh_images/workshops/self_care/guide_2/reward.svg",
                    "type": "set_variable"
                  },
                  {
                    "name": "text",
                    "value": "What small things make you happy? Can you each say one thing?\n\nTaking care of yourself is an important parenting skill! ",
                    "type": "set_variable"
                  },
                  {
                    "type": "nested_properties",
                    "name": "nav_buttons",
                    "rows": [
                      {
                        "name": "button_info",
                        "action_list": [
                          {
                            "trigger": "click",
                            "action_id": "pop_up",
                            "args": [
                              "w_self_care_reward_pop"
                            ],
                            "_raw": "click | pop_up:w_self_care_reward_pop",
                            "_cleaned": "click | pop_up:w_self_care_reward_pop"
                          }
                        ],
                        "hidden": "false",
                        "type": "set_variable"
                      }
                    ]
                  }
                ]
              },
              {
                "name": "outro_text",
                "value": "Well done! Try to do something to reward yourself every day.",
                "type": "set_variable"
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you treat yourself well, click the @global.parent_point and celebrate your success",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "flow_name": "w_self_care_reward_pop",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "suggestions",
        "value": "suggestions",
        "rows": [
          {
            "name": "description_text",
            "value": "Things you can do to reward yourself:",
            "type": "set_variable"
          },
          {
            "name": "list_text",
            "value": "(-) Have a hot drink \n(-) Call a friend or family \n(-) Have a relaxed bath \n(-) Read \n(-) Watch TV",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_self_care.xlsx"
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
            "name": "tools_title",
            "value": "@global.w_self_care",
            "type": "set_variable"
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
                "name": "button_1",
                "value": "Relax activity",
                "action_list": [
                  {
                    "trigger": "click",
                    "action_id": "go_to",
                    "args": [
                      "w_self_care_relax"
                    ],
                    "_raw": "click | go_to:w_self_care_relax",
                    "_cleaned": "click | go_to:w_self_care_relax"
                  }
                ],
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
                "name": "button_1",
                "value": "Recognise activity",
                "action_list": [
                  {
                    "trigger": "click",
                    "action_id": "go_to",
                    "args": [
                      "w_self_care_recognise"
                    ],
                    "_raw": "click | go_to:w_self_care_recognise",
                    "_cleaned": "click | go_to:w_self_care_recognise"
                  }
                ],
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
                "name": "button_1",
                "value": "Reward activity",
                "action_list": [
                  {
                    "trigger": "click",
                    "action_id": "go_to",
                    "args": [
                      "w_self_care_reward"
                    ],
                    "_raw": "click | go_to:w_self_care_reward",
                    "_cleaned": "click | go_to:w_self_care_reward"
                  }
                ],
                "hidden": "false",
                "comments": "placeholder",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_self_care.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_self_care.xlsx"
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
                    "value": "Relax, recognise and reward yourself every day. You deserve it! ",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "Relax activity",
                    "action_list": [
                      {
                        "trigger": "click",
                        "action_id": "go_to",
                        "args": [
                          "w_self_care_relax"
                        ],
                        "_raw": "click | go_to:w_self_care_relax",
                        "_cleaned": "click | go_to:w_self_care_relax"
                      }
                    ],
                    "hidden": "false",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_2",
                    "value": "Recognise activity",
                    "action_list": [
                      {
                        "trigger": "click",
                        "action_id": "go_to",
                        "args": [
                          "w_self_care_recognise"
                        ],
                        "_raw": "click | go_to:w_self_care_recognise",
                        "_cleaned": "click | go_to:w_self_care_recognise"
                      }
                    ],
                    "hidden": "false",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_3",
                    "value": "Reward activity",
                    "action_list": [
                      {
                        "trigger": "click",
                        "action_id": "go_to",
                        "args": [
                          "w_self_care_reward"
                        ],
                        "_raw": "click | go_to:w_self_care_reward",
                        "_cleaned": "click | go_to:w_self_care_reward"
                      }
                    ],
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_self_care.xlsx"
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_self_care.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_stepper",
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
            "value": [
              "w_solve_welcome_together",
              "w_solve_care_together",
              "w_solve_relax",
              "w_solve_reflect_together",
              "w_solve_intro",
              "w_solve_read_1_temp",
              "w_solve_tools_activity",
              "w_solve_read_2_temp",
              "w_solve_talk_1",
              "w_solve_read_3_temp",
              "w_solve_talk_2",
              "w_solve_home_practice",
              "w_solve_ending"
            ],
            "comments": "w_solve_welcome_together;\nw_solve_care_together;\nw_solve_relax;\nw_solve_reflect_together;\nw_solve_intro;\nw_solve_read_1_temp;\nw_solve_tools_activity;\nw_solve_read_2_temp;\nw_solve_talk_1;\nw_solve_read_3_temp;\nw_solve_talk_2;\nw_solve_home_practice;\nw_solve_ending",
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
            "comments": "w_solve_welcome_individual; w_solve_relax; w_solve_reflect_individual; w_solve_intro; w_solve_tools_activity; w_solve_home_practice; w_solve_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_welcome_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_welcome_individual",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "welcome_individual",
        "value": "welcome_individual",
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
                    "value": "We care about you, and how life is treating you.",
                    "type": "set_variable"
                  },
                  {
                    "name": "question_text",
                    "value": "How are you feeling today?",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          },
          {
            "name": "reply_happy",
            "value": "You are a star. And you are making a real difference. Be proud of yourself. ",
            "type": "set_variable"
          },
          {
            "name": "reply_ok",
            "value": "Sorry that things are not easy today. All parents have these days.",
            "type": "set_variable"
          },
          {
            "name": "reply_sad",
            "value": "Sorry that things are not easy today. All parents have these days.",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_care_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_relax",
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
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_reflect_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_together",
        "value": "reflect_together",
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
                "value": "@global.home_practice_problem_solving: @global.w_consequence",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_reflect_individual",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_individual",
        "value": "reflect_individual",
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
                    "name": "bottom_text",
                    "value": "Close your eyes, breathe in, and know that everything you have done is so important.",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "topic_intro",
        "value": "topic_intro",
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
            "name": "listen",
            "rows": [
              {
                "type": "nested_properties",
                "name": "workshop_activity",
                "rows": [
                  {
                    "name": "activity_title",
                    "value": "Why @global.w_solve?",
                    "type": "set_variable"
                  },
                  {
                    "name": "intro_text",
                    "value": "Every family faces challenges, but when we work together we can deal with problems in an effective and peaceful way. \n\nWhat a great skill for your teen to learn too! ",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_read_1_temp",
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
                "value": "You will not believe what just happened… My friend's daughter got a phone from a boy, A PHONE! Let me tell you… ",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/solve/read_1/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_solve_female_caregiver_1: “@global.w_solve_teen_girl, where did you get that thing?” \n\n@global.w_solve_teen_girl: “@global.w_solve_teen_boy_1 bought it for me. It’s a nice phone, @global.w_solve_female_caregiver_1 . It takes photos!\"",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/solve/read_1/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_solve_female_caregiver_1: “I don’t want to see that expensive thing! That boy is no good! How does he think you are going to repay him for this?!”  \n\n@global.w_solve_teen_girl: “That’s not how it works, @global.w_solve_female_caregiver_1! That’s not fair!”  ",
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
                            "value": "plh_images/workshops/solve/read_1/slide_3.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_solve_female_caregiver_1: “I don’t want to hear it!” \n\n@global.w_solve_teen_girl: “You’re not even trying to listen to me! I don’t know why I even try with you!” ",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_tools",
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
            "name": "tools_title",
            "value": "@global.w_solve",
            "type": "set_variable"
          },
          {
            "name": "top_text",
            "value": "Take a few deep breaths to calm down, and",
            "hidden": "false",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "tool_1",
            "rows": [
              {
                "name": "title",
                "value": "KNOW IT",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Identify the problem.",
                "type": "set_variable"
              },
              {
                "name": "image_src",
                "value": "plh_images/workshops/solve/tools/tool_1.svg",
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
                "value": "SOLVE IT",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Think of possible solutions and what would happen if we used them.",
                "type": "set_variable"
              },
              {
                "name": "image_src",
                "value": "plh_images/workshops/solve/tools/tool_2.svg",
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
                "value": "TRY IT",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Choose a solution and try it out.",
                "type": "set_variable"
              },
              {
                "name": "image_src",
                "value": "plh_images/workshops/solve/tools/tool_3.svg",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_4",
            "hidden": "false",
            "rows": [
              {
                "name": "title",
                "value": "TEST IT",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Did it work? Great! If it did not work, then try another solution. ",
                "type": "set_variable"
              },
              {
                "name": "image_src",
                "value": "plh_images/workshops/solve/tools/tool_4.svg",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_tools_activity",
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
                "name": "intro_text",
                "value": "With teenagers – and in life – unexpected problems come up. \n\nHere are 4 problem-solving steps to do together.",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "value": "w_solve_tools",
                "rows": []
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_read_2_temp",
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
                "value": "Let’s see how problem solving works in practice.",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/solve/read_2/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_solve_female_caregiver_2 is coming home from work. \n\n@global.w_solve_female_caregiver_2 (thinking): \"Ay my poor feet! I need to sit down a moment and drink a cup of coffee before I start preparing food for everyone.\"",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/solve/read_2/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_solve_female_caregiver_2: \"@global.w_solve_teen_boy_2! What are you doing? That bread is for dinner! Now there won’t be enough for us all!\"",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/solve/read_2/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@global.w_solve_teen_boy_2: “Sorry, @global.w_solve_female_caregiver_2, I was just hungry. I can explain, you see, there is this guy at school...” \n\n@global.w_solve_female_caregiver_2 (thinking): “Take a Pause… just breathe…” ",
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
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/solve/read_2/slide_4.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "title",
                                    "value": "Step 1: KNOW IT",
                                    "hidden": "false",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "@global.w_solve_female_caregiver_2: “Just give me a moment. I am tired and now worried about having enough food for dinner.” \n\n@global.w_solve_teen_boy_2: “I am sorry, @global.w_solve_female_caregiver_2\"",
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
                                    "value": "box_image_more",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "plh_images/workshops/solve/read_2/slide_5.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "@global.w_solve_female_caregiver_2: \"Now tell me, why are you so hungry? Did you not eat your lunch at school?” \n\n@global.w_solve_teen_boy_2:  \"That is the problem. There’s a guy at school who bullies me. He says if I do not give my lunch to him every day, he and his friends will hurt me. He makes me so mad!\"",
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
                                        "value": "box_image_more",
                                        "rows": [
                                          {
                                            "name": "image_src",
                                            "value": "plh_images/workshops/solve/read_2/slide_6.svg",
                                            "type": "set_variable"
                                          },
                                          {
                                            "name": "title",
                                            "value": "Step 2: SOLVE IT",
                                            "hidden": "false",
                                            "type": "set_variable"
                                          },
                                          {
                                            "name": "text",
                                            "value": "@global.w_solve_female_caregiver_2: \"I am sorry to hear that but am glad that you told me, @global.w_solve_teen_boy_2 . It doesn’t mean that you can eat everybody’s dinner. After we speak, you need to go to the shop to buy some more bread. But first: What do you think we should do about the bully problem?\"\n\n@global.w_solve_teen_boy_2: \"Well… I want to just hit him or get him back.\"",
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
                                            "value": "box_image_more",
                                            "rows": [
                                              {
                                                "name": "image_src",
                                                "value": "plh_images/workshops/solve/read_2/slide_7.svg",
                                                "type": "set_variable"
                                              },
                                              {
                                                "name": "text",
                                                "value": "@global.w_solve_female_caregiver_2: \"Hmmm… what do you think will happen to you if you do that?\"\n\n@global.w_solve_teen_boy_2: \"I don’t know. He is bigger than me so he will probably hurt me more. And I could get into trouble at school and expelled.\"",
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
                                                "value": "box_image_more",
                                                "rows": [
                                                  {
                                                    "name": "image_src",
                                                    "value": "plh_images/workshops/solve/read_2/slide_8.svg",
                                                    "type": "set_variable"
                                                  },
                                                  {
                                                    "name": "text",
                                                    "value": "@global.w_solve_female_caregiver_2: \"Yes, that could happen. What could we do instead?\"\n\n@global.w_solve_teen_boy_2: \"I guess I could tell the teacher. But then the other kids will call me a tattletale. Maybe you could talk to the teacher?\"",
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
                                                    "value": "box_image_more",
                                                    "rows": [
                                                      {
                                                        "name": "image_src",
                                                        "value": "plh_images/workshops/solve/read_2/slide_9.svg",
                                                        "type": "set_variable"
                                                      },
                                                      {
                                                        "name": "text",
                                                        "value": "@global.w_solve_female_caregiver_2: \"That sounds like a better idea. I could also have a word with his parents if you want me to.\"\n\n@global.w_solve_teen_boy_2: \"Sure. If you think that would help too. Thanks, @global.w_solve_female_caregiver_2\"",
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
                                                        "value": "box_image_more",
                                                        "rows": [
                                                          {
                                                            "name": "image_src",
                                                            "value": "plh_images/workshops/solve/read_2/slide_10.svg",
                                                            "type": "set_variable"
                                                          },
                                                          {
                                                            "name": "title",
                                                            "value": "Step 3: TRY IT",
                                                            "hidden": "false",
                                                            "type": "set_variable"
                                                          },
                                                          {
                                                            "name": "text",
                                                            "value": "@global.w_solve_female_caregiver_2: \"Anything for you, my dear. I will do it first thing after dinner. And you know? If that doesn’t work, we can always try something else together.\"\n\n@global.w_solve_teen_boy_2: \"Thanks, @global.w_solve_female_caregiver_2\"",
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
                                                            "value": "box_image_more",
                                                            "rows": [
                                                              {
                                                                "name": "image_src",
                                                                "value": "plh_images/workshops/solve/read_2/slide_11.svg",
                                                                "type": "set_variable"
                                                              },
                                                              {
                                                                "name": "title",
                                                                "value": "Step 4: TEST IT",
                                                                "hidden": "false",
                                                                "type": "set_variable"
                                                              },
                                                              {
                                                                "name": "text",
                                                                "value": "A week later… \n\n@global.w_solve_female_caregiver_2: \"How are things going at school now?\"\n\n@global.w_solve_teen_boy_2: \"It’s going better, the boy does not take my lunch anymore. But he is still being really mean to me.\"",
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
                                                                "value": "plh_images/workshops/solve/read_2/slide_12.svg",
                                                                "type": "set_variable"
                                                              },
                                                              {
                                                                "name": "text",
                                                                "value": "@global.w_solve_female_caregiver_2: \"I am sorry to hear that, @global.w_solve_teen_boy_2 . Shall I ask your uncle to go talk to his parents? If that does not work, we will try something else!\"\n\n@global.w_solve_teen_boy_2: \"Yes, thank you @global.w_solve_female_caregiver_2 . At least I know you are on my side.\"",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_talk_1",
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
                "name": "activity_title",
                "value": "Try it Together",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Let’s try it! \n\nRemember @global.w_solve_teen_girl and the phone she got from the boy?",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Pretend to be @global.w_solve_teen_girl and her @global.w_solve_female_caregiver_1: \n\nHow could they use the 4 steps of problem-solving? \n\nStep 1. KNOW IT \nStep 2. SOLVE IT \nStep 3. TRY IT \nStep 4. TEST IT",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_read_3_temp",
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
                "name": "include_outro",
                "value": "true",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Let’s go back to @global.w_solve_teen_girl and her @global.w_solve_female_caregiver_1 and see what happens.",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/solve/read_3/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "title",
                        "value": "Option 1: Ground @global.w_solve_teen_girl for a month",
                        "hidden": "false",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_solve_female_caregiver_1: “You can’t go out for the next month” \n\nThat didn’t work... Let's try something else.",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/solve/read_3/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "title",
                            "value": "Option 2: Return the phone and save up",
                            "hidden": "false",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_solve_female_caregiver_1: \"I am not trying to accuse your friend or be jealous. I am worried that when someone gives a gift it is hard to say 'no' when they ask something in return – like sex. If you want to have a phone, we’ll save up together so you can make your own decisions without owing him anything.\"\n\nThis is great! Try the third option as well.",
                            "type": "set_variable"
                          }
                        ]
                      },
                      {
                        "type": "nested_properties",
                        "name": "box_2",
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/solve/read_3/slide_3.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "title",
                            "value": "Option 3: Learn about safe sex",
                            "hidden": "false",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_solve_female_caregiver_1: “This makes me realise we should talk about boyfriends and protecting yourself. Many teens your age get pregnant or become HIV positive. Let’s go to the clinic so you can talk with the nurse to learn how you can stay safe.” \n\nThis is great!",
                            "type": "set_variable"
                          }
                        ]
                      }
                    ]
                  }
                ]
              },
              {
                "name": "outro_text",
                "value": "Parenting teens is really hard. \n\nOften there are no simple and easy solutions, but now @global.w_solve_female_caregiver_1 learned she can talk to her daughter about these things. \n\nBefore, she worried alone, now they can come up with solutions together!",
                "type": "set_variable"
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you problem-solve to keep your teen safe, click the @global.parent_point and celebrate your success",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_talk_2",
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
                "name": "activity_title",
                "value": "Try it Together",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Let's practice problem-solving!",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text",
                    "value": "Practice together on a problem you have now. One of you is the parent and one the teen. \n\nPraise and encourage each other – we are all proud of you! \n\nRemember the steps: \nStep 1. KNOW IT \nStep 2. SOLVE IT \nStep 3. TRY IT \nStep 4. TEST IT",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_home_practice",
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
                    "value": "Teach your teenagers the four steps of problem-solving:\nKNOW IT - SOLVE IT - TRY IT - TEST IT \n\nWhen something bad happens, we often get upset and blame. But what they really need is someone to help  find solutions together. Listen to them, accept how they see and feel things, and thank them for trusting you.\n\nTeaching your teen how to deal with problems will help them for the rest of their lives. What a gift!",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "@global.ideas_button",
                    "comments": "Some problems other parents solved with their teens:  \n(-) My teenager does not want to go to school\n(-) I am worried my teenager will get pregnant or will get someone pregnant\n(-) I am worried about what my teen does online\n(-) My teenager is hanging out with bad friends\n(-) My teenager is lazy\n(-) My teenager is not doing their school work\n(-) My teenager might be using drugs",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "solve",
    "flow_name": "w_solve_ending",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_solve.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_stepper",
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
            "value": [
              "w_stress_welcome_together",
              "w_stress_care_together",
              "w_stress_relax",
              "w_stress_reflect_together",
              "w_stress_intro",
              "w_stress_read_1_temp",
              "w_stress_talk",
              "w_stress_read_2_temp",
              "w_stress_read_3_temp",
              "w_stress_tools_activity",
              "w_stress_home_practice",
              "w_stress_ending"
            ],
            "comments": "w_stress_welcome_together; w_stress_care_together; w_stress_relax; w_stress_reflect_together; w_stress_intro; w_stress_read_1; w_stress_talk; w_stress_read_2; w_stress_read_3; w_stress_tools_activity; w_stress_home_practice; w_stress_ending",
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
            "comments": "w_stress_welcome_individual; w_stress_relax; w_stress_reflect_individual; w_stress_intro; w_stress_read_1; w_stress_read_2; w_stress_tools_activity; w_stress_home_practice; w_stress_ending",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_welcome_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_care_together",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_reflect_together",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "reflect_together",
        "value": "reflect_together",
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
                "value": "@global.home_practice_problem_solving: @global.w_instruct",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_relax",
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
        "rows": []
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_intro",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "topic_intro",
        "value": "topic_intro",
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
            "name": "listen",
            "rows": [
              {
                "type": "nested_properties",
                "name": "workshop_activity",
                "rows": [
                  {
                    "name": "activity_title",
                    "value": "@global.w_stress",
                    "type": "set_variable"
                  },
                  {
                    "name": "intro_text",
                    "value": "We know how stressful it is to bring up teenagers in these times. Learning to manage your stress helps you - and your family. ",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_read_1_temp",
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
                "value": "My friend said the other day: “My teen is driving me crazy! They make me want to pull my hair out, all they do is complain, ask for things, and cause trouble. I can’t take this anymore!\"\n\nLet me tell you what happened...",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/stress/read_1/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "I lost my job. I was sitting at home feeling frustrated and stressed, when @global.w_stress_teen_boy_1 entered.",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/stress/read_1/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_stress_teen_boy_1: “Can I have money to buy some airtime?”  \n\n@global.w_stress_male_caregiver: “Leave me alone and mind your own business!”",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/stress/read_1/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@global.w_stress_teen_boy_1: “What did I do? You never listen!”  \n\n@global.w_stress_male_caregiver: “I said leave me alone or you will get a beating!”",
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
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/stress/read_1/slide_4.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "@global.w_stress_girl: “Look! I have made a house!” ",
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
                                    "value": "box_image_more",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "plh_images/workshops/stress/read_1/slide_5.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "@global.w_stress_teen_boy_1: “Who cares about your stupid house!”",
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
                                        "value": "plh_images/workshops/stress/read_1/slide_6.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "hidden": "true",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_talk",
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
                    "value": "How do you think @global.w_stress_teen_boy_1 felt? And his @global.w_stress_male_caregiver? And @global.w_stress_girl?\n\nWhat could @global.w_stress_male_caregiver have done differently?",
                    "comments": "placeholder",
                    "type": "set_variable"
                  },
                  {
                    "name": "button",
                    "value": "@global.ideas_short_button",
                    "hidden": "false",
                    "comments": "(-) Recognise why he feels stressed \n(-) Take a deep breath and speak calmly  \n(-) Show he understands his teen’s feelings \n(-) Think about solutions together \n(-) Do something positive together ",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_read_2_temp",
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
                "value": "Thank you for thinking along! Let’s go back in time and see what @global.w_stress_male_caregiver does now. ",
                "type": "set_variable"
              },
              {
                "name": "include_outro",
                "value": "true",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/stress/read_1/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "I lost my job and I was sitting at home feeling frustrated and stressed, when @global.w_stress_teen_boy_1 entered.",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/stress/read_2/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_stress_teen_boy_1: “Can I have money to buy some airtime?”  \n\n@global.w_stress_male_caregiver (taking a breath): “I’m sorry son. I had a difficult day today. The boss fired me.” ",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/stress/read_2/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@global.w_stress_teen_boy_1: “Oh no!  I need a new school uniform.”  \n\n@global.w_stress_male_caregiver: “I’ll try, son, And your @global.w_stress_female_caregiver’s job will help us get by while I look for another job.” ",
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
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/stress/read_2/slide_4.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "@global.w_stress_teen_boy_1: “I can help out with looking for work, too, @global.w_stress_male_caregiver?”  \n\n@global.w_stress_male_caregiver: “No it’s okay, @global.w_stress_teen_boy_1 . I appreciate your offer. The most important thing is that you work hard at school. Thanks for listening to me.” ",
                                    "type": "set_variable"
                                  }
                                ]
                              },
                              {
                                "type": "nested_properties",
                                "name": "box_2",
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/stress/read_2/slide_5.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "@global.w_stress_male_caregiver: “Let’s play some soccer together. It will help me get this stress off my mind for a bit.”  \n\n@global.w_stress_teen_boy_1: “Okay, @global.w_stress_male_caregiver!” ",
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
              },
              {
                "name": "outro_text",
                "value": "That went so much better! \n\nTaking a pause helps to respond calmly when you feel angry or stressed. Let’s try it out.",
                "type": "set_variable"
              },
              {
                "name": "outro_habit_text",
                "value": "Every time you breathe instead of yell, click the @global.parent_point and celebrate your success",
                "hidden": "false",
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_read_3_temp",
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
                "name": "intro_title",
                "value": "Safety Amnesty",
                "type": "set_variable"
              },
              {
                "name": "intro_text",
                "value": "Think back to when you were a teenager. \n\nWas there ever a time when you were in danger but you couldn’t tell your family because they would have been angry?",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "intro_nav_buttons",
                "rows": [
                  {
                    "name": "button_completed",
                    "value": "@global.more_button",
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
                    "value": "box_image_more",
                    "rows": [
                      {
                        "name": "image_src",
                        "value": "plh_images/workshops/stress/read_3/slide_1.svg",
                        "type": "set_variable"
                      },
                      {
                        "name": "text",
                        "value": "@global.w_stress_teen_boy_2: \"Don’t tell the adults, but I’m going to bar with my friends tonight\" \n\n@global.w_stress_teen_girl: \"Have fun! I’ve told them I’m staying with my girlfriend, but I’m actually going to a cool party\"",
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
                        "value": "box_image_more",
                        "rows": [
                          {
                            "name": "image_src",
                            "value": "plh_images/workshops/stress/read_3/slide_2.svg",
                            "type": "set_variable"
                          },
                          {
                            "name": "text",
                            "value": "@global.w_stress_teen_boy_2: \"I think they are dealing drugs. We could all get arrested. But I can’t tell my parents – they’ll be so angry\"",
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
                            "value": "box_image_more",
                            "rows": [
                              {
                                "name": "image_src",
                                "value": "plh_images/workshops/stress/read_3/slide_3.svg",
                                "type": "set_variable"
                              },
                              {
                                "name": "text",
                                "value": "@global.w_stress_teen_girl: \"I’m scared. Everyone is too drunk to drive me home. This boy says he’ll take me but he wants us to go to his house first. I can’t tell my parents – I lied about coming to this party.\"",
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
                                "value": "box_image_more",
                                "rows": [
                                  {
                                    "name": "image_src",
                                    "value": "plh_images/workshops/stress/read_3/slide_4.svg",
                                    "type": "set_variable"
                                  },
                                  {
                                    "name": "text",
                                    "value": "\"I care about your safety more than anything. If you are ever upset, or scared, you can always call me for help, or tell me about it. \n\nJust say ‘safety amnesty’. I promise that I will try my best to help and I won’t be angry – even if you are doing something you shouldn't.\"",
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
                                    "value": "box_image_more",
                                    "rows": [
                                      {
                                        "name": "image_src",
                                        "value": "plh_images/workshops/stress/read_3/slide_5.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "@global.w_stress_teen_girl: \"@global.w_stress_parent, it’s a safety amnesty. Can you come and pick me up? I really need a lift home.\"",
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
                                        "value": "plh_images/workshops/stress/read_3/slide_6.svg",
                                        "type": "set_variable"
                                      },
                                      {
                                        "name": "text",
                                        "value": "@global.w_stress_teen_boy_2: \"@global.w_stress_parent, safety amnesty. I think my friends are in trouble. I don’t want to stop being their friend, but I’m worried. Can we talk?\"",
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
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_tools",
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
            "name": "tools_title",
            "value": "@global.w_stress",
            "type": "set_variable"
          },
          {
            "type": "nested_properties",
            "name": "tool_1",
            "rows": [
              {
                "name": "title",
                "value": "BREATHE. Slowly. Pause.  ",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Before you say anything, slowly breathe in and out five times. It will calm you, and give you a chance to think.",
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
                "value": "SHARE how you feel",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "This is hard. Many of us were told not to cry, or show our feelings to our children. But take a deep breath and calmly tell them how you feel. They will understand better, and also learn from you how to deal with stress.",
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
                "value": "SHOW them you care",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "This is also hard! Stress makes us focus on ourselves. But our teens need our support. Ask them how they feel. Listen to them and comfort them. Try a hug or say ‘I understand’. It can change everything.",
                "type": "set_variable"
              }
            ]
          },
          {
            "type": "nested_properties",
            "name": "tool_4",
            "rows": [
              {
                "name": "title",
                "value": "SEEK the positive",
                "type": "set_variable"
              },
              {
                "name": "text_1",
                "value": "Can you and your teen think about ideas that might help? Can you do something positive together to take your mind off the stress?",
                "type": "set_variable"
              }
            ]
          },
          {
            "name": "bottom_text",
            "value": "If all else fails, breathe. You can do this.",
            "hidden": "false",
            "type": "set_variable"
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_tools_activity",
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
                "value": "w_stress_tools",
                "rows": []
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_home_practice",
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
                "name": "intro_text",
                "value": "There are two home practices for this week.",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "content_box",
                "rows": [
                  {
                    "name": "text_1",
                    "value": "Whenever you are feeling stressed or upset: take five breaths in and out before you react",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_1",
                    "value": "@global.essential_tools",
                    "hidden": "false",
                    "type": "set_variable"
                  },
                  {
                    "name": "text_2",
                    "value": "Do a safety amnesty with your teenager",
                    "hidden": "false",
                    "type": "set_variable"
                  },
                  {
                    "name": "button_2",
                    "value": "Safety Amnesty Story",
                    "hidden": "false",
                    "type": "set_variable"
                  },
                  {
                    "name": "habit_text",
                    "value": "Every time you breathe instead of yell, click the @global.parent_point and celebrate your success",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  },
  {
    "flow_type": "template",
    "module": "stress",
    "flow_name": "w_stress_ending",
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
                    "value": "You've completed this week's workshop.\n\nNext week, we will talk about money - you will need:\n(-) a sheet of paper/cardboard\n(-) a pen\n(-) 20 small rocks/beans/kernels\n\nIt will be fun! See you soon.",
                    "type": "set_variable"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/workshop_templates/workshop_stress.xlsx"
  }
]