/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const goal_list: FlowTypes.Goal_list[] = [
  {
    "flow_type": "goal_list",
    "flow_name": "module_goal_list",
    "status": "released",
    "rows": [
      {
        "id": "goal_mod_welcome",
        "label": "Complete Welcome Module",
        "groups_list": [
          "modules"
        ],
        "completion_id_list": [
          "completion_mod_welcome_self-care_package",
          "completion_mod_welcome_quick_praise",
          "completion_mod_welcome_survey",
          "completion_mod_welcome_photo_activity"
        ],
        "completion_tasks": "task_mod_welcome_completed_goal"
      },
      {
        "id": "goal_mod_1on1",
        "label": "Complete One-on-One Time Module",
        "groups_list": [
          "modules",
          "level_1"
        ],
        "completion_id_list": [
          "completion_mod_1on1_emo",
          "completion_mod_1on1_intro",
          "completion_mod_1on1_tips",
          "completion_mod_1on1_activity",
          "completion_mod_1on1_par",
          "completion_mod_1on1_fun",
          "completion_mod_1on1_activity_review"
        ],
        "completion_tasks": "task_mod_1on1_completed_goal"
      },
      {
        "id": "goal_mod_praise",
        "label": "Complete Praise Module",
        "groups_list": [
          "modules",
          "level_2"
        ],
        "completion_id_list": [
          "completion_mod_praise_intro",
          "completion_mod_praise_tips",
          "completion_mod_praise_activity",
          "completion_mod_praise_emo",
          "completion_mod_praise_fun",
          "completion_mod_praise_activity_review"
        ],
        "completion_tasks": "task_mod_praise_completed_goal"
      },
      {
        "id": "goal_mod_instructions",
        "label": "Complete Positive Instructions Module",
        "groups_list": [
          "modules",
          "level_3"
        ],
        "completion_id_list": [
          "completion_mod_instructions_par",
          "completion_mod_instructions_intro",
          "completion_mod_instructions_tips",
          "completion_mod_instructions_activity",
          "completion_mod_instructions_emo",
          "completion_mod_instructions_fun",
          "completion_mod_instructions_activity_review"
        ],
        "completion_tasks": "task_mod_instructions_completed_goal"
      },
      {
        "id": "goal_mod_stress",
        "label": "Complete Managing Anger and Stress Module",
        "groups_list": [
          "modules",
          "level_4"
        ],
        "completion_id_list": [
          "completion_mod_stress_par",
          "completion_mod_stress_intro",
          "completion_mod_stress_tips",
          "completion_mod_stress_activity",
          "completion_mod_stress_emo",
          "completion_mod_stress_fun",
          "completion_mod_stress_home_activity"
        ],
        "completion_tasks": "task_mod_stress_completed_goal"
      },
      {
        "id": "goal_all_modules",
        "label": "Complete all PLH Teens Modules",
        "groups_list": [
          "top"
        ],
        "completion_id_list": [
          "completion_mod_welcome_completed_goal",
          "completion_mod_1on1_completed_goal",
          "completion_mod_praise_completed_goal",
          "completion_mod_instructions_completed_goal"
        ]
      }
    ]
  },
  {
    "flow_type": "goal_list",
    "flow_name": "habit_goal_list",
    "status": "released",
    "rows": [
      {
        "id": "goal_open_app_level_1",
        "label": "Turning up",
        "groups_list": [
          "hidden",
          "level_1"
        ],
        "completion_id_list": [
          "completion_open_app_level_1"
        ]
      },
      {
        "id": "goal_open_app_level_2",
        "label": "Turning up",
        "groups_list": [
          "hidden",
          "level_2"
        ],
        "requires_list": [
          "goal_open_app_level_1"
        ],
        "completion_id_list": [
          "completion_open_app_level_2"
        ]
      },
      {
        "id": "goal_relax_level_1",
        "label": "Relax",
        "groups_list": [
          "hidden",
          "level_1"
        ],
        "completion_id_list": [
          "completion_relax_level_1"
        ],
        "completion_tasks": "task_relax_level_1_completed_goal"
      },
      {
        "id": "goal_relax_level_2",
        "label": "Relax",
        "groups_list": [
          "hidden",
          "level_2"
        ],
        "requires_list": [
          "goal_relax_level_1"
        ],
        "completion_id_list": [
          "completion_relax_level_2"
        ],
        "completion_tasks": "task_relax_level_2_completed_goal"
      },
      {
        "id": "goal_treat_yourself_level_1",
        "label": "Praise yourself",
        "groups_list": [
          "hidden",
          "level_1"
        ],
        "completion_id_list": [
          "completion_praise_yourself_level_1"
        ],
        "completion_tasks": "task_praise_yourself_level_1_completed_goal"
      },
      {
        "id": "goal_treat_yourself_level_2",
        "label": "Praise yourself",
        "groups_list": [
          "hidden",
          "level_2"
        ],
        "requires_list": [
          "goal_praise_yourself_level_1"
        ],
        "completion_id_list": [
          "completion_praise_yourself_level_2"
        ],
        "completion_tasks": "task_praise_yourself_level_2_completed_goal"
      },
      {
        "id": "goal_praise_yourself_level_1",
        "label": "Treat yourself well",
        "groups_list": [
          "hidden",
          "level_1"
        ],
        "completion_id_list": [
          "completion_treat_yourself_level_1"
        ],
        "completion_tasks": "task_treat_yourself_level_1_completed_goal"
      },
      {
        "id": "goal_praise_yourself_level_2",
        "label": "Treat yourself well",
        "groups_list": [
          "hidden",
          "level_2"
        ],
        "requires_list": [
          "goal_treat_yourself_level_1"
        ],
        "completion_id_list": [
          "completion_treat_yourself_level_2"
        ],
        "completion_tasks": "task_treat_yourself_level_2_completed_goal"
      },
      {
        "id": "goal_spend_time_level_1",
        "label": "One on one time",
        "groups_list": [
          "hidden",
          "level_1"
        ],
        "completion_id_list": [
          "completion_spend_time_level_1"
        ],
        "completion_tasks": "task_spend_time_level_1_completed_goal"
      },
      {
        "id": "goal_spend_time_level_2",
        "label": "One on one time",
        "groups_list": [
          "hidden",
          "level_2"
        ],
        "requires_list": [
          "goal_spend_time_level_1"
        ],
        "completion_id_list": [
          "completion_spend_time_level_2"
        ],
        "completion_tasks": "task_spend_time_level_2_completed_goal"
      },
      {
        "id": "goal_praise_teen_level_1",
        "label": "Praise your teen",
        "groups_list": [
          "hidden",
          "level_1"
        ],
        "completion_id_list": [
          "completion_praise_teen_level_1"
        ],
        "completion_tasks": "task_praise_teen_level_1_completed_goal"
      },
      {
        "id": "goal_praise_teen_level_2",
        "label": "Praise your teen",
        "groups_list": [
          "hidden",
          "level_2"
        ],
        "requires_list": [
          "goal_praise_teen_level_1"
        ],
        "completion_id_list": [
          "completion_praise_teen_level_2"
        ],
        "completion_tasks": "task_praise_teen_level_2_completed_goal"
      },
      {
        "id": "goal_breathe_level_1",
        "label": "Breathe not yell",
        "groups_list": [
          "hidden",
          "level_1"
        ],
        "completion_id_list": [
          "completion_breathe_level_1"
        ],
        "completion_tasks": "task_breathe_level_1_completed_goal"
      },
      {
        "id": "goal_breathe_level_2",
        "label": "Breathe not yell",
        "groups_list": [
          "hidden",
          "level_2"
        ],
        "requires_list": [
          "goal_breathe_level_1"
        ],
        "completion_id_list": [
          "completion_breathe_level_2"
        ],
        "completion_tasks": "task_breathe_level_2_completed_goal"
      },
      {
        "id": "goal_money_level_1",
        "label": "Good money choice",
        "groups_list": [
          "hidden",
          "level_1"
        ],
        "completion_id_list": [
          "completion_money_level_1"
        ],
        "completion_tasks": "task_money_level_1_completed_goal"
      },
      {
        "id": "goal_money_level_2",
        "label": "Good money choice",
        "groups_list": [
          "hidden",
          "level_2"
        ],
        "requires_list": [
          "goal_money_level_1"
        ],
        "completion_id_list": [
          "completion_money_level_2"
        ],
        "completion_tasks": "task_money_level_2_completed_goal"
      },
      {
        "id": "goal_consequence_level_1",
        "label": "Calm consequence",
        "groups_list": [
          "hidden",
          "level_1"
        ],
        "completion_id_list": [
          "completion_consequence_level_1"
        ],
        "completion_tasks": "task_consequence_level_1_completed_goal"
      },
      {
        "id": "goal_consequence_level_2",
        "label": "Calm consequence",
        "groups_list": [
          "hidden",
          "level_2"
        ],
        "requires_list": [
          "goal_consequence_level_1"
        ],
        "completion_id_list": [
          "completion_consequence_level_2"
        ],
        "completion_tasks": "task_consequence_level_2_completed_goal"
      },
      {
        "id": "goal_safe_level_1",
        "label": "Safe",
        "groups_list": [
          "hidden",
          "level_1"
        ],
        "completion_id_list": [
          "completion_safe_level_1"
        ],
        "completion_tasks": "task_safe_level_1_completed_goal"
      },
      {
        "id": "goal_safe_level_2",
        "label": "Safe",
        "groups_list": [
          "hidden",
          "level_2"
        ],
        "requires_list": [
          "goal_safe_level_1"
        ],
        "completion_id_list": [
          "completion_safe_level_2"
        ],
        "completion_tasks": "task_safe_level_2_completed_goal"
      }
    ]
  }
]