/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const reminder_list: FlowTypes.Reminder_list[] = [
  {
    "flow_type": "reminder_list",
    "flow_name": "reminder_list",
    "status": "released",
    "rows": [
      {
        "reminder_id": "reminder_relax",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "calm_random",
        "priority": 0,
        "activation_condition_list": [
          {
            "action": "field_evaluation",
            "value": "@fields.mod_welcome_daily_calm == 'Yes'",
            "timing": null
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": {
              "comparator": "<=",
              "quantity": 1,
              "unit": "day"
            }
          }
        ],
        "campaign_list": [
          "campaign_morning",
          "campaign_main",
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_welcome_praise",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "praise_1",
        "priority": 2,
        "activation_condition_list": [
          {
            "action": "app_event",
            "value": "first_app_launch",
            "timing": {
              "comparator": ">",
              "quantity": 1,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_welcome_praise_teen",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_welcome_praise_teen",
        "priority": 1,
        "activation_condition_list": [
          {
            "action": "app_event",
            "value": "first_app_launch",
            "timing": {
              "comparator": ">",
              "quantity": 2,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "task_last_completed",
            "value": "task_praise_teen",
            "timing": {
              "comparator": "<=",
              "quantity": 1,
              "unit": "day"
            }
          },
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_welcome_relax",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_welcome_relax",
        "priority": 1,
        "activation_condition_list": [
          {
            "action": "app_event",
            "value": "first_app_launch",
            "timing": {
              "comparator": ">",
              "quantity": 3,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_welcome_photo_activity",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_welcome_photo_activity",
        "priority": 1,
        "activation_condition_list": [
          {
            "action": "app_event",
            "value": "first_app_launch",
            "timing": {
              "comparator": ">",
              "quantity": 4,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_welcome_photo_activity",
            "timing": null
          },
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_unlocked",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_1on1_unlocked",
        "priority": 1,
        "activation_condition_list": [
          {
            "action": "app_event",
            "value": "first_app_launch",
            "timing": {
              "comparator": ">",
              "quantity": 7,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_par",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_1on1_par",
        "priority": 1,
        "activation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_mod_1on1_tips",
            "timing": {
              "comparator": ">",
              "quantity": 1,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_activity_reminder",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_1on1_activity_reminder",
        "priority": 1,
        "activation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_mod_1on1_tips",
            "timing": {
              "comparator": ">",
              "quantity": 2,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "task_last_completed",
            "value": "task_spend_time",
            "timing": {
              "comparator": "<=",
              "quantity": 1,
              "unit": "day"
            }
          },
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_activity_praise",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "praise_27",
        "priority": 2,
        "activation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_mod_1on1_tips",
            "timing": {
              "comparator": ">",
              "quantity": 3,
              "unit": "day"
            }
          },
          {
            "action": "task_completed",
            "value": "task_spend_time",
            "timing": null
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_open_app_praise",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_1on1_open_app_praise",
        "priority": 2,
        "activation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_mod_1on1_tips",
            "timing": {
              "comparator": ">",
              "quantity": 3,
              "unit": "day"
            }
          },
          {
            "action": "app_event",
            "value": "app_launch",
            "timing": {
              "comparator": "<=",
              "quantity": 1,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_spend_time",
            "timing": null
          },
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_other_praise",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_1on1_other_praise",
        "priority": 2,
        "activation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_mod_1on1_tips",
            "timing": {
              "comparator": ">",
              "quantity": 3,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_spend_time",
            "timing": null
          },
          {
            "action": "app_event",
            "value": "app_launch",
            "timing": {
              "comparator": "<=",
              "quantity": 1,
              "unit": "day"
            }
          },
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_1on1_fun",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_1on1_fun",
        "priority": 1,
        "activation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_mod_1on1_tips",
            "timing": {
              "comparator": ">",
              "quantity": 5,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_praise_activity_reminder_1",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_praise_act_teen_reminder",
        "priority": 1,
        "activation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_mod_praise_tips",
            "timing": {
              "comparator": ">",
              "quantity": 2,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_praise_activity_reminder_2",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_praise_act_teen_reminder",
        "priority": 1,
        "activation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_mod_praise_tips",
            "timing": {
              "comparator": ">",
              "quantity": 5,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_praise_activity_reminder_3",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_praise_act_adult_reminder",
        "priority": 1,
        "activation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_mod_praise_tips",
            "timing": {
              "comparator": ">",
              "quantity": 3,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      },
      {
        "reminder_id": "reminder_mod_praise_praise",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "praise_7",
        "priority": 2,
        "activation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_mod_praise_tips",
            "timing": {
              "comparator": ">",
              "quantity": 6,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_evening"
        ]
      },
      {
        "reminder_id": "reminder_mod_praise_fun",
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "start_action_args": "mod_praise_fun",
        "priority": 1,
        "activation_condition_list": [
          {
            "action": "task_completed",
            "value": "task_mod_praise_tips",
            "timing": {
              "comparator": ">",
              "quantity": 6,
              "unit": "day"
            }
          }
        ],
        "deactivation_condition_list": [
          {
            "action": "reminder_action",
            "value": "sent",
            "timing": null
          }
        ],
        "campaign_list": [
          "campaign_main"
        ]
      }
    ]
  }
]