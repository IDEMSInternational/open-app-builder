/* eslint-disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const data_list: FlowTypes.Data_list[] = [
  {
    "flow_type": "data_list",
    "flow_subtype": "campaign_rows",
    "flow_name": "campaign_unlock_workshops",
    "status": "released",
    "rows": [
      {
        "id": "unlock_w_self_care",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_self_care_disabled",
              false
            ],
            "_raw": "set_field: w_self_care_disabled : FALSE",
            "_cleaned": "click | set_field: w_self_care_disabled : FALSE"
          }
        ],
        "priority": -1,
        "campaign_list": [
          "unlock_workshops"
        ]
      },
      {
        "id": "unlock_w_1on1",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_disabled",
              false
            ],
            "_raw": "set_field: w_1on1_disabled : FALSE",
            "_cleaned": "click | set_field: w_1on1_disabled : FALSE"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "unlock_w_1on1.sent",
              true
            ],
            "_raw": "set_field: unlock_w_1on1.sent : TRUE",
            "_cleaned": "click | set_field: unlock_w_1on1.sent : TRUE"
          }
        ],
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "second_week"
              }
            },
            "_raw": "get_field | second_week : TRUE"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "unlock_w_1on1.sent"
              }
            },
            "_raw": "get_field | unlock_w_1on1.sent : TRUE"
          }
        ],
        "campaign_list": [
          "unlock_workshops"
        ]
      },
      {
        "id": "unlock_w_praise",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_disabled",
              false
            ],
            "_raw": "set_field: w_praise_disabled : FALSE",
            "_cleaned": "click | set_field: w_praise_disabled : FALSE"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "unlock_w_praise.sent",
              true
            ],
            "_raw": "set_field: unlock_w_praise.sent : TRUE",
            "_cleaned": "click | set_field: unlock_w_praise.sent : TRUE"
          }
        ],
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "third_week"
              }
            },
            "_raw": "get_field | third_week : TRUE"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "unlock_w_praise.sent"
              }
            },
            "_raw": "get_field | unlock_w_praise.sent : TRUE"
          }
        ],
        "campaign_list": [
          "unlock_workshops"
        ]
      },
      {
        "id": "unlock_w_instruct",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_instruct_disabled",
              false
            ],
            "_raw": "set_field: w_instruct_disabled : FALSE",
            "_cleaned": "click | set_field: w_instruct_disabled : FALSE"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "unlock_w_instruct.sent",
              true
            ],
            "_raw": "set_field: unlock_w_instruct.sent : TRUE",
            "_cleaned": "click | set_field: unlock_w_instruct.sent : TRUE"
          }
        ],
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "first_app_open"
              }
            },
            "_raw": "get_field | first_app_open | before: 20 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "unlock_w_instruct.sent"
              }
            },
            "_raw": "get_field | unlock_w_instruct.sent : TRUE"
          }
        ],
        "campaign_list": [
          "unlock_workshops"
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/campaigns/campaign_unlock_workshops.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_subtype": "campaign_rows",
    "flow_name": "campaign_w_quickstart",
    "status": "released",
    "rows": [
      {
        "id": "default",
        "priority": -1,
        "campaign_list": [
          "quick_start_weekly_workshops"
        ]
      },
      {
        "id": "w_self_care_quick_start",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_this_workshop_together",
              false
            ],
            "_raw": "set_field:do_this_workshop_together:false",
            "_cleaned": "click | set_field:do_this_workshop_together:false"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_self_care_stepper"
            ],
            "_raw": "go_to: w_self_care_stepper",
            "_cleaned": "click | go_to: w_self_care_stepper"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_self_care_quick_start.sent",
              true
            ],
            "_raw": "set_field: w_self_care_quick_start.sent:TRUE",
            "_cleaned": "click | set_field: w_self_care_quick_start.sent:TRUE"
          }
        ],
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "first_week"
              }
            },
            "_raw": "get_field | first_week : TRUE"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_self_care_quick_start.sent"
              }
            },
            "_raw": "get_field | w_self_care_quick_start.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "@w_self_care_completion_level"
              }
            },
            "_raw": "get_field | @w_self_care_completion_level : 100"
          }
        ],
        "campaign_list": [
          "quick_start_weekly_workshops"
        ]
      },
      {
        "id": "w_1on1_quick_start",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_this_workshop_together",
              "@field.do_workshop_together"
            ],
            "_raw": "set_field:do_this_workshop_together:@field.do_workshop_together",
            "_cleaned": "click | set_field:do_this_workshop_together:@field.do_workshop_together"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_1on1_stepper"
            ],
            "_raw": "go_to: w_1on1_stepper",
            "_cleaned": "click | go_to: w_1on1_stepper"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_1on1_quick_start.sent",
              true
            ],
            "_raw": "set_field: w_1on1_quick_start.sent:TRUE",
            "_cleaned": "click | set_field: w_1on1_quick_start.sent:TRUE"
          }
        ],
        "priority": 2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "second_week"
              }
            },
            "_raw": "get_field | second_week:TRUE"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_1on1_quick_start.sent"
              }
            },
            "_raw": "get_field | w_1on1_quick_start.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "@w_1on1_completion_level"
              }
            },
            "_raw": "get_field | @w_1on1_completion_level : 100"
          }
        ],
        "campaign_list": [
          "quick_start_weekly_workshops"
        ]
      },
      {
        "id": "w_praise_quick_start",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "do_this_workshop_together",
              "@field.do_workshop_together"
            ],
            "_raw": "set_field:do_this_workshop_together:@field.do_workshop_together",
            "_cleaned": "click | set_field:do_this_workshop_together:@field.do_workshop_together"
          },
          {
            "trigger": "click",
            "action_id": "go_to",
            "args": [
              "w_praise_stepper"
            ],
            "_raw": "go_to: w_praise_stepper",
            "_cleaned": "click | go_to: w_praise_stepper"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "w_praise_quick_start.sent",
              true
            ],
            "_raw": "set_field: w_praise_quick_start.sent:TRUE",
            "_cleaned": "click | set_field: w_praise_quick_start.sent:TRUE"
          }
        ],
        "priority": 3,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "third_week"
              }
            },
            "_raw": "get_field | third_week:TRUE"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "w_praise_quick_start.sent"
              }
            },
            "_raw": "get_field | w_praise_quick_start.sent : true"
          },
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "@w_praise_completion_level"
              }
            },
            "_raw": "get_field | @w_praise_completion_level : 100"
          }
        ],
        "campaign_list": [
          "quick_start_weekly_workshops"
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/campaigns/campaign_workshop_quick_starts.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "relax_list",
    "data_list_name": "relax",
    "status": "released",
    "rows": [
      {
        "id": "relax_1",
        "title": "Quick pause",
        "task_id": "task_relax",
        "text_template": "relax_1_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_1_audio.mp3"
      },
      {
        "id": "relax_2",
        "module": "1on1",
        "title": "Power of three",
        "task_id": "task_relax",
        "text_template": "relax_2_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_2_audio.mp3"
      },
      {
        "id": "relax_3",
        "module": "praise",
        "title": "One thing today",
        "task_id": "task_relax",
        "text_template": "relax_3_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_3_audio.mp3"
      },
      {
        "id": "relax_4",
        "module": "instruct",
        "title": "Breathe to three",
        "task_id": "task_relax",
        "text_template": "relax_4_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_4_audio.mp3"
      },
      {
        "id": "relax_5",
        "module": "self_care",
        "title": "In and out",
        "task_id": "task_relax",
        "text_template": "relax_5_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_5_audio.mp3"
      },
      {
        "id": "relax_6",
        "title": "Think about today",
        "task_id": "task_relax",
        "text_template": "relax_6_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_6_audio.mp3"
      },
      {
        "id": "relax_7",
        "module": "stress",
        "title": "Pause to respond",
        "task_id": "task_relax",
        "text_template": "relax_7_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_7_audio.mp3"
      },
      {
        "id": "relax_8",
        "module": "money",
        "title": "Small things",
        "task_id": "task_relax",
        "text_template": "relax_8_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_8_audio.mp3"
      },
      {
        "id": "relax_9",
        "module": "rules",
        "title": "Body scan",
        "task_id": "task_relax",
        "text_template": "relax_9_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_9_audio.mp3"
      },
      {
        "id": "relax_10",
        "module": "consequence",
        "title": "Feel the ground",
        "task_id": "task_relax",
        "text_template": "relax_10_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_10_audio.mp3"
      },
      {
        "id": "relax_11",
        "module": "solve",
        "title": "Counting sounds",
        "task_id": "task_relax",
        "text_template": "relax_11_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_11_audio.mp3"
      },
      {
        "id": "relax_12",
        "module": "safe",
        "title": "Feel your feeling",
        "task_id": "task_relax",
        "text_template": "relax_12_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_12_audio.mp3"
      },
      {
        "id": "relax_13",
        "module": "crisis",
        "title": "Your song",
        "task_id": "task_relax",
        "text_template": "relax_13_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_13_audio.mp3"
      },
      {
        "id": "relax_14",
        "module": "celebrate",
        "title": "Ground & gratitude",
        "task_id": "task_relax",
        "text_template": "relax_14_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_14_audio.mp3"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_relax.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "something_fun_list",
    "data_list_name": "something_fun",
    "status": "released",
    "rows": [
      {
        "id": "co_chef",
        "title": "Co-chef",
        "text_template": "activity_co_chef"
      },
      {
        "id": "dance_moves",
        "title": "Dance moves",
        "text_template": "activity_dance_moves"
      },
      {
        "id": "two_truths",
        "title": "Two truths, one lie",
        "text_template": "activity_two_truths"
      },
      {
        "id": "mirror",
        "title": "Mirror",
        "text_template": "activity_mirror"
      },
      {
        "id": "dream_travel",
        "title": "Dream Travel",
        "text_template": "activity_dream_travel"
      },
      {
        "id": "famous_party",
        "title": "Famous Party",
        "text_template": "activity_famous_party"
      },
      {
        "id": "time_machine",
        "title": "Time Machine",
        "text_template": "activity_time_machine"
      },
      {
        "id": "superpowers",
        "title": "Superpowers",
        "text_template": "activity_superpowers"
      },
      {
        "id": "chat_together",
        "title": "Chat Together",
        "text_template": "activity_chat_together"
      },
      {
        "id": "chat_together_2",
        "title": "Chat Together: How was your day?",
        "text_template": "activity_chat_together_2"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_something_fun.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_subtype": "campaign_rows",
    "flow_name": "debug_campaign_list",
    "status": "released",
    "rows": [
      {
        "id": "debug_reminder_reset",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_1.sent",
              false
            ],
            "_raw": "set_field: debug_reminder_1.sent: false",
            "_cleaned": "click | set_field: debug_reminder_1.sent: false"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_2.sent",
              false
            ],
            "_raw": "set_field: debug_reminder_2.sent: false",
            "_cleaned": "click | set_field: debug_reminder_2.sent: false"
          },
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_3.sent",
              false
            ],
            "_raw": "set_field: debug_reminder_3.sent: false",
            "_cleaned": "click | set_field: debug_reminder_3.sent: false"
          }
        ],
        "priority": -2,
        "campaign_list": [
          "debug_campaign"
        ]
      },
      {
        "id": "debug_reminder_default",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_default.sent",
              true
            ],
            "_raw": "set_field: debug_reminder_default.sent : true",
            "_cleaned": "click | set_field: debug_reminder_default.sent : true"
          }
        ],
        "priority": -1,
        "campaign_list": [
          "debug_campaign"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": "Default"
      },
      {
        "id": "debug_reminder_1",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_1.sent",
              true
            ],
            "_raw": "set_field: debug_reminder_1.sent : true",
            "_cleaned": "click | set_field: debug_reminder_1.sent : true"
          }
        ],
        "priority": 1,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_default.sent"
              }
            },
            "_raw": "get_field | debug_reminder_default.sent:TRUE"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_1.sent"
              }
            },
            "_raw": "get_field | debug_reminder_1.sent : true"
          }
        ],
        "campaign_list": [
          "debug_campaign"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": 1
      },
      {
        "id": "debug_reminder_2",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_2.sent",
              true
            ],
            "_raw": "set_field: debug_reminder_2.sent : true",
            "_cleaned": "click | set_field: debug_reminder_2.sent : true"
          }
        ],
        "priority": 2,
        "activation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_1.sent"
              }
            },
            "_raw": "get_field | debug_reminder_1.sent:TRUE"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_2.sent"
              }
            },
            "_raw": "get_field | debug_reminder_2.sent : true"
          }
        ],
        "campaign_list": [
          "debug_campaign"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": 2
      },
      {
        "id": "debug_reminder_3",
        "click_action_list": [
          {
            "trigger": "click",
            "action_id": "set_field",
            "args": [
              "debug_reminder_3.sent",
              true
            ],
            "_raw": "set_field: debug_reminder_3.sent : true",
            "_cleaned": "click | set_field: debug_reminder_3.sent : true"
          }
        ],
        "priority": 3,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "data_events",
                "filter": {
                  "field": "debug_reminder_2.sent",
                  "value": true
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "2",
                  "unit": "day"
                }
              }
            },
            "_raw": "get_field:first | debug_reminder_2.sent:TRUE | before : 2 : day"
          }
        ],
        "deactivation_condition_list": [
          {
            "condition_type": "field_evaluation",
            "condition_args": {
              "field_evaluation": {
                "evaluate": "debug_reminder_3.sent"
              }
            },
            "_raw": "get_field | debug_reminder_3.sent : true"
          }
        ],
        "campaign_list": [
          "debug_campaign"
        ],
        "icon": "plh_images/icons/play_white.svg",
        "text": 3
      },
      {
        "id": "debug_reminder_4",
        "priority": 4,
        "activation_condition_list": [
          {
            "condition_type": "db_lookup",
            "condition_args": {
              "db_lookup": {
                "table_id": "app_events",
                "filter": {
                  "field": "event_id",
                  "value": "app_launch"
                },
                "order": "asc",
                "evaluate": {
                  "operator": ">",
                  "value": "5",
                  "unit": "day"
                }
              }
            },
            "_raw": "first_launch | before: 5 : day"
          }
        ],
        "campaign_list": [
          "debug_campaign"
        ]
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_campaigns.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "debug_data_list",
    "status": "released",
    "data_list_name": "debug",
    "rows": [
      {
        "id": "item_1",
        "text": "Item 1 text",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_relax.svg"
      },
      {
        "id": "item_2",
        "text": "Item 2 text",
        "image_asset": "assets/plh_assets/plh_images/icons/play_white.svg"
      },
      {
        "id": "item_3",
        "text": "Item 3 text"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_data_lists.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "debug_variable_data",
    "status": "released",
    "data_list_name": "debug_vars",
    "rows": [
      {
        "id": "number_1",
        "value": 1
      },
      {
        "id": "bool_true",
        "value": true
      },
      {
        "id": "bool_false",
        "value": false
      },
      {
        "id": "number_0",
        "value": 0
      },
      {
        "id": "list_1",
        "value_list": [
          "1",
          "2",
          "3"
        ]
      },
      {
        "id": "text_1",
        "value": "text1"
      },
      {
        "id": "collection_1",
        "value_collection": {
          "key1": "val1",
          "key2": "val2"
        }
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "example_data_list",
    "status": "released",
    "data_list_name": "example",
    "rows": [
      {
        "id": "example1",
        "value": "Success - Example 1"
      },
      {
        "id": "example3",
        "value_list": [
          "name:name_var_1 | text:Option 1",
          "name:name_var_2 | text: Option 2"
        ],
        "text": "any fields can be accessed"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_data_lists.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "habit_data_list",
    "status": "released",
    "data_list_name": "habit",
    "rows": [
      {
        "id": "relax",
        "title": "Relax",
        "description": "Doing a relaxation activity",
        "task_id": "task_habit_relax",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_relax.svg",
        "mark_text": "Every time you do a relax, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "treat_yourself",
        "title": "Treat yourself well",
        "description": "Doing something they like for themselves",
        "task_id": "task_habit_treat_yourself",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_treat_yourself.svg",
        "mark_text": "Every time you treat yourself well, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "praise_yourself",
        "title": "Praise yourself",
        "description": "Praising themselves",
        "task_id": "task_habit_praise_yourself",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_praise_yourself.svg",
        "mark_text": "Every time you praise yourself, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "spend_time",
        "title": "One-on-one time",
        "description": "Spending time with their teen",
        "task_id": "task_habit_spend_time",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_spend_time.svg",
        "mark_text": "Every time you do one-on-one time, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "praise_teen",
        "title": "Praise your teen",
        "description": "Praising their teen when they did positive thing",
        "task_id": "task_habit_praise_teen",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_praise_teen.svg",
        "mark_text": "Every time you praise your teen, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "instruct_positively",
        "title": "Get positive",
        "description": "Giving their teen a positive instruction",
        "task_id": "task_habit_instruct_positively",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_instruct_positively.svg",
        "mark_text": "Every time you give a positive instruction, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "breathe",
        "title": "Breathe not yell",
        "description": "Taking a pause before responding",
        "task_id": "task_habit_breathe",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_breathe.svg",
        "mark_text": "Every time you take a pause before responding, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "money",
        "title": "Good money choice",
        "description": "Keeping the budget",
        "task_id": "task_habit_money",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_money.svg",
        "mark_text": "Every time you make a good choice about needs, wants and savings, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "consequence",
        "title": "Calm consequence",
        "description": "Giving their teen a consequence in a calm way",
        "task_id": "task_habit_consequence",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_consequence.svg",
        "mark_text": "Every time you give a calm consequence, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "safe",
        "title": "Safe",
        "description": "Planning or keeping a family safety plan",
        "task_id": "task_habit_safe",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_safe.svg",
        "mark_text": "Every time you do something to keep your teen safe, tap the @global.parent_point and celebrate your success!",
        "short_mark_text": "Tap it!"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/parent_point_templates/habit_data_list.xlsx"
  }
]