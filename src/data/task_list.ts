/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const task_list: FlowTypes.Task_list[] = [
  {
    "flow_type": "task_list",
    "flow_name": "habit_task_list",
    "status": "released",
    "rows": [
      {
        "id": "task_open_app",
        "start_action": "open_app"
      },
      {
        "id": "task_relax",
        "label": "Relax",
        "groups_list": [
          "repeat_on_completion",
          "habits"
        ],
        "start_action": "start_new_flow",
        "requires_list": [
          "task_mod_welcome_self-care_package"
        ],
        "flow_type": "conversation",
        "flow_name": "calm_random"
      },
      {
        "id": "task_relax_custom_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_treat_yourself",
        "label": "Treat yourself well",
        "groups_list": [
          "repeat_on_completion",
          "habits"
        ],
        "requires_list": [
          "task_mod_welcome_self-care_package"
        ]
      },
      {
        "id": "task_treat_yourself_custom_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_praise_yourself",
        "label": "Praise yourself",
        "groups_list": [
          "repeat_on_completion",
          "habits"
        ],
        "requires_list": [
          "task_mod_welcome_self-care_package"
        ]
      },
      {
        "id": "task_praise_yourself_custom_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_spend_time",
        "label": "One on one time",
        "groups_list": [
          "repeat_on_completion",
          "habits"
        ],
        "requires_list": [
          "task_mod_1on1_tips"
        ]
      },
      {
        "id": "task_spend_time_custom_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_praise_teen",
        "label": "Praise your teen",
        "groups_list": [
          "repeat_on_completion",
          "habits"
        ],
        "requires_list": [
          "task_mod_welcome_quick_praise"
        ]
      },
      {
        "id": "task_praise_teen_custom_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_breathe",
        "label": "Breathe not yell",
        "groups_list": [
          "repeat_on_completion",
          "habits"
        ],
        "requires_list": [
          "task_mod_stress_tips"
        ]
      },
      {
        "id": "task_breathe_custom_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_money",
        "label": "Good money choice",
        "groups_list": [
          "repeat_on_completion",
          "habits"
        ],
        "requires_list": [
          "task_mod_budgeting_tips"
        ]
      },
      {
        "id": "task_money_custom_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_consequence",
        "label": "Calm consequence",
        "groups_list": [
          "repeat_on_completion",
          "habits"
        ],
        "requires_list": [
          "task_mod_responsibility_tips"
        ]
      },
      {
        "id": "task_consequence_custom_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_safe",
        "label": "Safe",
        "groups_list": [
          "repeat_on_completion",
          "habits"
        ],
        "requires_list": [
          "task_mod_safe_tips"
        ]
      },
      {
        "id": "task_safe_custom_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_care_package_self_completed_goal",
        "groups_list": [
          "care_packages"
        ],
        "start_action": "give_award",
        "start_action_args": "medal"
      },
      {
        "id": "task_care_package_teen_completed_goal",
        "groups_list": [
          "care_packages"
        ],
        "start_action": "give_award",
        "start_action_args": "medal"
      },
      {
        "id": "task_care_package_behaviour_completed_goal",
        "groups_list": [
          "care_packages"
        ],
        "start_action": "give_award",
        "start_action_args": "medal"
      },
      {
        "id": "task_care_package_family_completed_goal",
        "groups_list": [
          "care_packages"
        ],
        "start_action": "give_award",
        "start_action_args": "medal"
      }
    ]
  },
  {
    "flow_type": "task_list",
    "flow_name": "module_task_list",
    "status": "released",
    "rows": [
      {
        "id": "task_mod_welcome_give",
        "label": "See what this app will give you",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_welcome_give"
      },
      {
        "id": "task_mod_welcome_self-care_package",
        "label": "Your customised self-care package",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_welcome_self-care_package"
      },
      {
        "id": "task_mod_welcome_quick_praise",
        "label": "A quick praise for your teen",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_welcome_quick_praise"
      },
      {
        "id": "task_mod_welcome_survey",
        "label": "Personalise this app for you",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_welcome_survey"
      },
      {
        "id": "task_mod_welcome_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "cup"
      },
      {
        "id": "task_mod_1on1_emo",
        "label": "Emotional check-in",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_1on1_emo",
        "requires_list": [
          "first_app_launch | delay_7_day"
        ]
      },
      {
        "id": "task_mod_1on1_intro",
        "label": "Intro to one-on-one time",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_1on1_intro",
        "requires_list": [
          "task_mod_1on1_emo"
        ]
      },
      {
        "id": "task_mod_1on1_tips",
        "label": "Top tips",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "tips",
        "flow_name": "mod_1on1_tips",
        "requires_list": [
          "task_mod_1on1_intro"
        ]
      },
      {
        "id": "task_mod_1on1_activity",
        "label": "Home activity",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_1on1_activity",
        "requires_list": [
          "task_mod_1on1_tips"
        ]
      },
      {
        "id": "task_mod_1on1_par",
        "label": "Parenting check-in",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_1on1_par",
        "requires_list": [
          "task_mod_1on1_tips | delay_1_day"
        ]
      },
      {
        "id": "task_mod_1on1_fun",
        "label": "Something fun",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_1on1_fun",
        "requires_list": [
          "task_mod_1on1_tips | delay_5_day"
        ]
      },
      {
        "id": "task_mod_1on1_activity_review",
        "label": "Home activity review",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_1on1_activity_review",
        "requires_list": [
          "task_mod_1on1_activity | delay_4_day"
        ]
      },
      {
        "id": "task_mod_1on1_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "cup"
      },
      {
        "id": "task_mod_praise_intro",
        "label": "Intro to praise",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_praise_intro",
        "requires_list": [
          "task_mod_1on1_completed_goal",
          "first_app_launch | delay_14_day"
        ]
      },
      {
        "id": "task_mod_praise_tips",
        "label": "Top tips",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "tips",
        "flow_name": "mod_praise_tips",
        "requires_list": [
          "task_mod_praise_intro"
        ]
      },
      {
        "id": "task_mod_praise_activity",
        "label": "Home activity",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_praise_activity",
        "requires_list": [
          "task_mod_praise_tips"
        ]
      },
      {
        "id": "task_mod_praise_emo",
        "label": "Emotional check-in",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_praise_emo",
        "requires_list": [
          "task_mod_praise_tips | delay_1_day"
        ]
      },
      {
        "id": "task_mod_praise_fun",
        "label": "Something fun",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_praise_fun",
        "requires_list": [
          "task_mod_praise_tips | delay_7_day"
        ]
      },
      {
        "id": "task_mod_praise_activity_review",
        "label": "Home activity review",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_praise_activity_review",
        "requires_list": [
          "task_mod_praise_activity | delay_4_day"
        ]
      },
      {
        "id": "task_mod_praise_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "cup"
      },
      {
        "id": "task_mod_instruct_par",
        "label": "Parenting check-in",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_instruct_par",
        "requires_list": [
          "task_mod_praise_completed_goal",
          "first_app_launch | delay_21_day"
        ]
      },
      {
        "id": "task_mod_instruct_intro",
        "label": "Intro to positive instructions",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_instruct_intro",
        "requires_list": [
          "task_mod_instruct_par"
        ]
      },
      {
        "id": "task_mod_instruct_tips",
        "label": "Top tips",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "tips",
        "flow_name": "mod_instruct_tips",
        "requires_list": [
          "task_mod_instruct_intro"
        ]
      },
      {
        "id": "task_mod_instruct_activity",
        "label": "Home activity",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_instruct_activity",
        "requires_list": [
          "task_mod_instruct_tips"
        ]
      },
      {
        "id": "task_mod_instruct_emo",
        "label": "Emotional check-in",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_instruct_emo",
        "requires_list": [
          "task_mod_instruct_tips | delay_1_day"
        ]
      },
      {
        "id": "task_mod_instruct_fun",
        "label": "Something fun",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_instruct_fun",
        "requires_list": [
          "task_mod_instruct_tips | delay_5_day"
        ]
      },
      {
        "id": "task_mod_instruct_activity_review",
        "label": "Home activity review",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_instruct_activity_review",
        "requires_list": [
          "task_mod_instruct_activity | delay_4_day"
        ]
      },
      {
        "id": "task_mod_instruct_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "cup"
      },
      {
        "id": "task_mod_stress_par",
        "label": "Parenting check-in",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_stress_par",
        "requires_list": [
          "task_mod_instruct_completed_goal",
          "first_app_launch | delay_28_day"
        ]
      },
      {
        "id": "task_mod_stress_intro",
        "label": "Intro to managing anger and stress",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_stress_intro",
        "requires_list": [
          "task_mod_stress_par"
        ]
      },
      {
        "id": "task_mod_stress_tips",
        "label": "Top tips",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "tips",
        "flow_name": "mod_stress_tips",
        "requires_list": [
          "task_mod_stress_intro"
        ]
      },
      {
        "id": "task_mod_stress_activity",
        "label": "Home activity",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_stress_activity",
        "requires_list": [
          "task_mod_stress_tips"
        ]
      },
      {
        "id": "task_mod_stress_emo",
        "label": "Emotional check-in",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_stress_emo",
        "requires_list": [
          "task_mod_stress_tips | delay_1_day"
        ]
      },
      {
        "id": "task_mod_stress_fun",
        "label": "Something fun",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_stress_fun",
        "requires_list": [
          "task_mod_stress_tips | delay_5_day"
        ]
      },
      {
        "id": "task_mod_stress_home_activity",
        "label": "Home activity review",
        "groups_list": [
          "module"
        ],
        "start_action": "start_new_flow",
        "flow_type": "conversation",
        "flow_name": "mod_stress_activity_review",
        "requires_list": [
          "task_mod_stress_activity | delay_4_day"
        ]
      },
      {
        "id": "task_mod_stress_completed_goal",
        "groups_list": [
          "hidden"
        ],
        "start_action": "give_award",
        "start_action_args": "cup"
      }
    ]
  }
]