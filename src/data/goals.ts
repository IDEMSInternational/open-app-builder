/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const goals: FlowTypes.Goals[] = [
  {
    "flow_type": "goals",
    "flow_name": "goals_list",
    "status": "released",
    "rows": [
      {
        "id": "goal_mod_welcome",
        "label": "Complete Welcome Module",
        "groups": "modules",
        "completion_id": "completion_mod_welcome_self-care_package; completion_mod_welcome_quick_praise; completion_mod_welcome_survey; completion_mod_welcome_photo_activity",
        "completion_tasks": "task_mod_welcome_completed_goal"
      },
      {
        "id": "goal_mod_1on1",
        "label": "Complete One-on-One Time Module",
        "groups": "modules;level1",
        "completion_id": "completion_mod_1on1_emo; completion_mod_1on1_intro; completion_mod_1on1_tips; completion_mod_1on1_activity; completion_mod_1on1_activity_review",
        "completion_tasks": "task_mod_1on1_completed_goal"
      },
      {
        "id": "goal_mod_praise",
        "label": "Complete Praise Module",
        "groups": "modules;level2",
        "requires": "goal_mod_1on1",
        "completion_id": "completion_mod_praise_intro; completion_mod_praise_tips; completion_mod_praise_activity; completion_mod_praise_activity_review",
        "completion_tasks": "task_mod_praise_completed_goal"
      },
      {
        "id": "goal_all_modules",
        "label": "Complete all PLH Teens Modules",
        "groups": "top",
        "completion_id": "completion_mod_welcome_completed_goal; completion_mod_1on1_completed_goal; \ncompletion_mod_praise_completed_goal"
      },
      {
        "id": "goal_spend_time_1",
        "label": "Spend one-on-one time with my teen",
        "groups": "level_1",
        "completion_id": "completion_spend_time_level_1"
      },
      {
        "id": "goal_spend_time_2",
        "label": "Spend one-on-one time with my teen",
        "groups": "level_2",
        "requires": "goal_spend_time_1",
        "completion_id": "completion_spend_time_level_2"
      },
      {
        "id": "goal_praise_teen_1",
        "label": "Praise my teen",
        "groups": "level_1",
        "completion_id": "completion_praise_teen_level_1"
      },
      {
        "id": "goal_praise_teen_2",
        "label": "Praise my teen",
        "groups": "level_2",
        "requires": "goal_praise_teen_1",
        "completion_id": "completion_praise_teen_level_2"
      },
      {
        "id": "goal_relax_1",
        "label": "Relax",
        "groups": "level_1",
        "completion_id": "completion_relax_level_1"
      },
      {
        "id": "goal_relax_2",
        "label": "Relax",
        "groups": "level_2",
        "requires": "goal_relax_1",
        "completion_id": "completion_relax_level_2"
      },
      {
        "id": "goal_open_app_1",
        "label": "Turning up",
        "groups": "level_1",
        "completion_id": "completion_open_app_level_1"
      },
      {
        "id": "goal_open_app_2",
        "label": "Turning up",
        "groups": "level_2",
        "requires": "goal_open_app_1",
        "completion_id": "completion_open_app_level_2"
      }
    ]
  }
]