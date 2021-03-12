/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const template: FlowTypes.Template[] = [
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
        "comments": "Needs option for full screen mode"
      }
    ]
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
    ]
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
    ]
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
                "event_id": "completed",
                "action_id": "set_local",
                "args": [
                  "hide_content",
                  "false"
                ]
              },
              {
                "event_id": "completed",
                "action_id": "set_local",
                "args": [
                  "hide_intro",
                  "true"
                ]
              },
              {
                "event_id": "uncompleted",
                "action_id": "emit",
                "args": [
                  "uncompleted"
                ]
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
                "event_id": "completed",
                "action_id": "set_local",
                "args": [
                  "hide_content",
                  "true"
                ]
              },
              {
                "event_id": "completed",
                "action_id": "set_local",
                "args": [
                  "hide_outro",
                  "false"
                ]
              },
              {
                "event_id": "uncompleted",
                "action_id": "set_local",
                "args": [
                  "hide_intro",
                  "false"
                ]
              },
              {
                "event_id": "uncompleted",
                "action_id": "set_local",
                "args": [
                  "hide_content",
                  "true"
                ]
              }
            ],
            "hidden": "!@local.include_outro",
            "comments": "Do this row when include_outro = TRUE",
            "rows": []
          },
          {
            "type": "template",
            "name": "content_box",
            "action_list": [
              {
                "event_id": "completed",
                "action_id": "emit",
                "args": [
                  "completed"
                ]
              },
              {
                "event_id": "uncompleted",
                "action_id": "set_local",
                "args": [
                  "hide_intro",
                  "false"
                ]
              },
              {
                "event_id": "uncompleted",
                "action_id": "set_local",
                "args": [
                  "hide_content",
                  "true"
                ]
              }
            ],
            "hidden": "@local.include_outro",
            "comments": "Do this row when include_outro = FALSE",
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
                "event_id": "completed",
                "action_id": "emit",
                "args": [
                  "completed"
                ]
              }
            ],
            "rows": []
          }
        ]
      }
    ]
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
              "colour | secondary"
            ]
          },
          {
            "type": "button",
            "name": "button_completed",
            "value": "Next",
            "action_list": [
              {
                "event_id": "click",
                "action_id": "emit",
                "args": [
                  "completed"
                ]
              }
            ]
          },
          {
            "type": "button",
            "name": "button_uncompleted",
            "value": "Back",
            "action_list": [
              {
                "event_id": "click",
                "action_id": "emit",
                "args": [
                  "uncompleted"
                ]
              }
            ],
            "hidden": "true"
          }
        ]
      }
    ]
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
            "value": "@local.video_src",
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
            "event_id": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ]
          }
        ],
        "rows": []
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "audio_component",
    "status": "released",
    "rows": [
      {
        "name": "audio_src",
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
        "rows": []
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "image_component",
    "status": "released",
    "rows": [
      {
        "type": "image",
        "name": "image_src",
        "value": "src/assets/not-found-image.png"
      },
      {
        "type": "text",
        "name": "text"
      },
      {
        "type": "template",
        "name": "nav_buttons",
        "value": "buttons",
        "rows": []
      }
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "listen",
    "status": "released",
    "rows": [
      {
        "name": "audio_src",
        "type": "set_variable"
      },
      {
        "type": "template",
        "name": "workshop_activity",
        "value": "workshop_activity",
        "action_list": [
          {
            "event_id": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ]
          }
        ],
        "rows": [
          {
            "name": "activity_image",
            "value": "plh_images/characters/guide2/happy.svg",
            "comments": "placeholder",
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
    ]
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
            "event_id": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ]
          }
        ],
        "rows": [
          {
            "name": "activity_image",
            "value": "plh_images/characters/guide2/happy.svg",
            "__EMPTY": "placeholder",
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
            "name": "nav_buttons",
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
                "type": "set_variable"
              }
            ]
          }
        ]
      }
    ]
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
            "event_id": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ]
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
                "value": "plh_images/characters/guide2/happy.svg",
                "comments": "placeholder",
                "type": "set_variable"
              },
              {
                "type": "nested_properties",
                "name": "intro_nav_buttons",
                "rows": [
                  {
                    "name": "button_skipped",
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
                "value": "video_component",
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
    ]
  },
  {
    "flow_type": "template",
    "flow_name": "w_example_stepper",
    "status": "released",
    "rows": [
      {
        "type": "template",
        "name": "workshop_stepper",
        "value": "workshop_stepper",
        "action_list": [
          {
            "event_id": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ]
          }
        ],
        "hidden": "!@fields.do_workshops_together",
        "rows": [
          {
            "name": "nav_template_list",
            "value": "w_example_welcome_together;\nw_example_listen;\n",
            "comments": "w_example_read; w_example_talk_together; w_example_tools_activity;",
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
            "event_id": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ]
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
    ]
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
            "event_id": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ]
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
    ]
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
            "event_id": "completed",
            "action_id": "emit",
            "args": [
              "completed"
            ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
]