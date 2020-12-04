/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const tasks: FlowTypes.Tasks[] = [
  {
    "flow_type": "tasks",
    "flow_name": "tasks_list",
    "status": "released",
    "rows": [
      {
        "id": "task_mod_welcome_self-care_package",
        "label": "Your customised self-care package",
        "start_action": "start_new_flow",
        "start_action_args": "mod_welcome_self-care_package",
        "evaluation": "completed"
      },
      {
        "id": "task_mod_welcome_quick_praise",
        "label": "A quick praise for your teen",
        "start_action": "start_new_flow",
        "start_action_args": "mod_welcome_quick_praise",
        "evaluation": "completed"
      },
      {
        "id": "task_mod_welcome_survey",
        "label": "Personalise this app for you",
        "start_action": "start_new_flow",
        "start_action_args": "mod_welcome_survey",
        "evaluation": "completed"
      },
      {
        "id": "task_mod_welcome_photo_activity",
        "label": "Upload a family picture",
        "start_action": "start_new_flow",
        "start_action_args": "mod_welcome_photo_activity",
        "evaluation": "completed"
      },
      {
        "id": "task_mod_welcome_completed_goal",
        "start_action": "give_award",
        "start_action_args": "cup",
        "evaluation": "completed"
      },
      {
        "id": "task_mod_1on1_emo",
        "label": "Emotional check-in",
        "start_action": "start_new_flow",
        "start_action_args": "mod_1on1_emo",
        "evaluation": "completed",
        "requires": "first_app_launch | delay_7_day"
      },
      {
        "id": "task_mod_1on1_intro",
        "label": "Intro to one-on-one time",
        "start_action": "start_new_flow",
        "start_action_args": "mod_1on1_intro",
        "evaluation": "completed ",
        "requires": "task_mod_1on1_emo"
      },
      {
        "id": "task_mod_1on1_tips",
        "label": "Core tips",
        "start_action": "start_new_flow",
        "start_action_args": "mod_1on1_tips",
        "evaluation": "completed",
        "requires": "task_mod_1on1_intro"
      },
      {
        "id": "task_mod_1on1_activity",
        "label": "Home activity",
        "start_action": "start_new_flow",
        "start_action_args": "mod_1on1_activity",
        "evaluation": "completed",
        "requires": "task_mod_1on1_tips"
      },
      {
        "id": "task_mod_1on1_activity_review",
        "label": "Home activity review",
        "start_action": "start_new_flow",
        "start_action_args": "mod_1on1_activity_review",
        "evaluation": "completed",
        "requires": "task_mod_1on1_activity | delay_2_day"
      },
      {
        "id": "task_mod_1on1_completed_goal",
        "start_action": "give_award",
        "start_action_args": "cup",
        "evaluation": "completed"
      },
      {
        "id": "task_mod_praise_intro",
        "label": "Intro to praise and positive reinforcement",
        "start_action": "start_new_flow",
        "start_action_args": "mod_praise_intro",
        "evaluation": "completed",
        "requires": "task_mod_1on1_completed_goal; first_launch | delay_14_day"
      },
      {
        "id": "task_mod_praise_tips",
        "label": "Core tips",
        "start_action": "start_new_flow",
        "start_action_args": "mod_praise_tips",
        "evaluation": "completed",
        "requires": "task_mod_praise_intro"
      },
      {
        "id": "task_mod_praise_activity",
        "label": "Home activity",
        "start_action": "start_new_flow",
        "start_action_args": "mod_praise_activity",
        "evaluation": "completed",
        "requires": "task_mod_praise_tips"
      },
      {
        "id": "task_mod_praise_activity_review",
        "label": "Home activity review",
        "start_action": "start_new_flow",
        "start_action_args": "mod_praise_activity_review",
        "evaluation": "completed",
        "requires": "task_mod_praise_activity"
      },
      {
        "id": "task_mod_praise_completed_goal",
        "start_action": "give_award",
        "start_action_args": "cup",
        "evaluation": "completed"
      },
      {
        "id": "task_spend_time",
        "label": "Spend one-on-one time with your teen",
        "groups": "repeat_on_completion"
      },
      {
        "id": "task_spend_time_level_1_completed_goal",
        "groups": "hidden",
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_spend_time_level_2_completed_goal",
        "groups": "hidden",
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_praise_adult",
        "label": "Praise another adult in your household",
        "groups": "repeat_on_completion"
      },
      {
        "id": "task_praise_self",
        "label": "Praise yourself",
        "groups": "repeat_on_completion"
      },
      {
        "id": "task_praise_teen",
        "label": "Praise your teen",
        "groups": "repeat_on_completion"
      },
      {
        "id": "task_praise_teen_level_1_completed_goal",
        "groups": "hidden",
        "start_action": "give_award",
        "start_action_args": "fireworks",
        "trigger_on": "goal_praise_teen_1"
      },
      {
        "id": "task_praise_teen_level_2_completed_goal",
        "groups": "hidden",
        "start_action": "give_award",
        "start_action_args": "fireworks",
        "trigger_on": "goal_praise_teen_2"
      },
      {
        "id": "task_relax",
        "label": "Relaxation activity",
        "groups": "repeat_on_completion",
        "start_action": "start_new_flow",
        "start_action_args": "calm_1",
        "evaluation": "completed"
      },
      {
        "id": "task_relax_level_1_completed_goal",
        "groups": "hidden",
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_relax_level_2_completed_goal",
        "groups": "hidden",
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_open_app",
        "start_action": "open_app"
      }
    ]
  }
]