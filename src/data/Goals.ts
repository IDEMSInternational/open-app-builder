export default [
  {
    "Flow_Type": "Goals",
    "Flow_Name": "GoalsList",
    "status": "preview",
    "data": [
      {
        "id": "goal_1on1Module",
        "label": "Complete One-on-One Time Module",
        "groups": "modules;level1",
        "completion_id": "completion_1on1_Emo;\r\ncompletion_1on1_Intro;\r\ncompletion_1on1_Tips; \r\n",
        "completion_tasks": "task_1on1_CompletedGoal"
      },
      {
        "id": "goal_PraiseModule",
        "label": "Complete Praise Module",
        "groups": "modules;level2",
        "requires": "goal_1on1Module",
        "completion_id": "completion_Praise_Intro;\r\ncompletion_Praise_Tips;",
        "completion_tasks": "task_Praise_CompletedGoal"
      },
      {
        "id": "goal_AllModules",
        "label": "Complete all PLH Teens Modules",
        "groups": "top",
        "completion_id": "completion_1on1_CompletedGoal; \r\ncompletion_Praise_CompletedGoal"
      },
      {
        "id": "goal_relation",
        "label": "I want to have a better relationship with my teen",
        "groups": "top",
        "requires": "@fields.programmegoal=\"I want to have a better relationship with my teen\"",
        "completion_id": "completion_SpendTime_level1_CompletedGoal;\r\ncompletion_SpendTime_level2_CompletedGoal;"
      },
      {
        "id": "goal_behavior",
        "label": "I want my teen to behave better",
        "groups": "top",
        "requires": "@fields.programmegoal=\"I want my teen to behave better\"",
        "completion_id": "completion_SpendTime_level1_CompletedGoal; \r\ncompletion_PraiseTeen_level1_CompletedGoal;\r\ncompletion_SpendTime_level2_CompletedGoal; \r\ncompletion_PraiseTeen_level2_CompletedGoal;"
      },
      {
        "id": "goal_stress",
        "label": "I want to feel less stress loneliness or anger",
        "groups": "top",
        "requires": "@fields.programmegoal=\"I want to feel less stress loneliness or anger\"",
        "completion_id": "completion_Relax_level1_CompletedGoal;\r\ncompletion_Relax_level2_CompletedGoal"
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
        "id": "goal_SpendTime1",
        "label": "Spend one-on-one time with my teen",
        "groups": "level1",
        "completion_id": "completion_SpendTime_level1"
      },
      {
        "id": "goal_SpendTime2",
        "label": "Spend one-on-one time with my teen",
        "groups": "level2",
        "requires": "goal_SpendTime1",
        "completion_id": "completion_SpendTime_level2"
      },
      {
        "id": "goal_PraiseTeen1",
        "label": "Praise my teen",
        "groups": "level1",
        "completion_id": "completion_PraiseTeen_level1"
      },
      {
        "id": "goal_PraiseTeen2",
        "label": "Praise my teen",
        "groups": "level2",
        "requires": "goal_PraiseTeen1",
        "completion_id": "completion_PraiseTeen_level2"
      },
      {
        "id": "goal_Relax1",
        "label": "Relax",
        "groups": "level1",
        "completion_id": "completion_Relax_level1"
      },
      {
        "id": "goal_Relax2",
        "label": "Relax",
        "groups": "level2",
        "requires": "goal_Relax1",
        "completion_id": "completion_Relax_level2"
      },
      {
        "id": "goal_OpenApp1",
        "label": "Turning up",
        "groups": "level1",
        "completion_id": "completion_OpenApp_level1"
      },
      {
        "id": "goal_OpenApp2",
        "label": "Turning up",
        "groups": "level2",
        "requires": "goal_OpenApp1",
        "completion_id": "completion_OpenApp_level2"
      }
    ]
  }
]