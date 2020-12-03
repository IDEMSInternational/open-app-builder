export default [
  {
    "flow_type": "goals",
    "flow_name": "goals_list",
    "status": "released",
    "data": [
      {
        "id": "goal_1on1_mdule",
        "label": "Complete One-on-One Time Module",
        "groups": "modules;level1",
        "completion_id": "completion_1on1_emo;\ncompletion_1on1_intro;\ncompletion_1on1_tips; \n",
        "completion_tasks": "task_1on1_CompletedGoal"
      },
      {
        "id": "goal_praise_module",
        "label": "Complete Praise Module",
        "groups": "modules;level2",
        "requires": "goal_1on1_mdule",
        "completion_id": "completion_praise_intro;\ncompletion_praise_tips;",
        "completion_tasks": "task_Praise_CompletedGoal"
      },
      {
        "id": "goal_all_modules",
        "label": "Complete all PLH Teens Modules",
        "groups": "top",
        "completion_id": "completion_1on1_completed_goal; \ncompletion_praise_completed_goal"
      },
      {
        "id": "goal_relation",
        "label": "I want to have a better relationship with my teen",
        "groups": "top",
        "requires": "@fields.programmegoal=\"I want to have a better relationship with my teen\"",
        "completion_id": "completion_spend_time_level_1_completed_goal;\ncompletion_spend_time_level_2_completed_goal;"
      },
      {
        "id": "goal_behavior",
        "label": "I want my teen to behave better",
        "groups": "top",
        "requires": "@fields.programmegoal=\"I want my teen to behave better\"",
        "completion_id": "completion_spend_time_level_1_completed_goal; \ncompletion_praise_teen_level_1_completed_goal;\ncompletion_spend_time_level_2_completed_goal; \ncompletion_praise_teen_level_2_completed_goal;"
      },
      {
        "id": "goal_stress",
        "label": "I want to feel less stress loneliness or anger",
        "groups": "top",
        "requires": "@fields.programmegoal=\"I want to feel less stress loneliness or anger\"",
        "completion_id": "completion_relax_level_1_completed_goal;\ncompletion_Relax_level_2_completed_goal"
      },
      {
        "id": "goal_money",
        "label": "I want to worry about money less",
        "groups": "top",
        "requires": "@fields.programmegoal=\"I want to worry about money less\""
      },
      {
        "id": "goal_conflict",
        "label": "I want less conflict in my family",
        "groups": "top",
        "requires": "@fields.programmegoal=\"I want less conflict in my family\""
      },
      {
        "id": "goal_safety",
        "label": "I want to know more about how to keep my teen safe online and offline",
        "groups": "top",
        "requires": "@fields.programmegoal=\"I want to know more about how to keep my teen safe online and offline\""
      },
      {
        "id": "goal_disability",
        "label": "JML TO ADD DISABILITY OPTION ",
        "groups": "top",
        "requires": "@fields.programmegoal=\"JML TO ADD DISABILITY OPTION\""
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