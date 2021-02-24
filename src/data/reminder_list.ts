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
          "field_evaluation | @fields.mod_welcome_daily_calm == 'Yes'"
        ],
        "deactivation_condition_list": [
          "sent | within_1_day"
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
          "app_first_launch | before_1_day"
        ],
        "deactivation_condition_list": [
          "sent"
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
          "app_first_launch | before_2_day"
        ],
        "deactivation_condition_list": [
          "task_last_completed | task_praise_teen | within_1_day",
          "sent"
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
          "app_first_launch | before_3_day"
        ],
        "deactivation_condition_list": [
          "sent"
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
          "app_launch:first | before:4:day"
        ],
        "deactivation_condition_list": [
          "task_completed | task_welcome_photo_activity",
          "sent"
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
          "app_first_launch | before_7_day"
        ],
        "deactivation_condition_list": [
          "sent"
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
          "task_completed | task_mod_1on1_tips | before_1_day"
        ],
        "deactivation_condition_list": [
          "sent"
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
          "task_completed | task_mod_1on1_tips | before_2_day"
        ],
        "deactivation_condition_list": [
          "task_completed:first| task_spend_time | within:1:day",
          "sent"
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
          "task_completed | task_mod_1on1_tips | before_3_day",
          "task_completed | task_spend_time"
        ],
        "deactivation_condition_list": [
          "sent"
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
          "task_completed | task_mod_1on1_tips  | before_3_day",
          "app_launch | within_1_day"
        ],
        "deactivation_condition_list": [
          "task_completed | task_spend_time",
          "sent"
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
          "task_completed | task_mod_1on1_tips  | before_3_day"
        ],
        "deactivation_condition_list": [
          "task_completed | task_spend_time",
          "app_launch | within_1_day",
          "sent"
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
          "task_completed | task_mod_1on1_tips | before_5_day"
        ],
        "deactivation_condition_list": [
          "sent"
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
          "task_completed | task_mod_praise_tips | before_2_day"
        ],
        "deactivation_condition_list": [
          "sent"
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
          "task_completed | task_mod_praise_tips | before_5_day"
        ],
        "deactivation_condition_list": [
          "sent"
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
          "task_completed | task_mod_praise_tips | before_3_day"
        ],
        "deactivation_condition_list": [
          "sent"
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
          "task_completed | task_mod_praise_tips | before_6_day"
        ],
        "deactivation_condition_list": [
          "sent"
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
          "task_completed | task_mod_praise_tips | before_6_day"
        ],
        "deactivation_condition_list": [
          "sent"
        ],
        "campaign_list": [
          "campaign_main"
        ]
      }
    ]
  }
]