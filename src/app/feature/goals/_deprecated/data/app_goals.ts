export default {
  "==content_list==": [
    {
      flow_type: "Goals",
      flow_name: "GoalsList",
    },
    {
      flow_type: "Tasks",
      flow_name: "TasksList",
    },
    {
      flow_type: "Completions",
      flow_name: "CompletionsList",
    },
    {
      flow_type: "Reminders",
      flow_name: "RemindersList",
    },
  ],
  GoalsList: [
    {
      id: "goal_1on1Module",
      label: "Complete One-on-One Time Module",
      groups: "modules;level1",
      completion_id: "completion_1on1_Emo;\ncompletion_1on1_Intro;\ncompletion_1on1_Tips; \n",
    },
    {
      id: "goal_PraiseModule",
      label: "Complete Praise Module",
      groups: "modules;level2",
      requires: "goal_1on1Module",
      completion_id: "completion_Praise_Intro;\ncompletion_Praise_Tips;",
    },
    {
      id: "goal_AllModules",
      label: "Complete all PLH Teens Modules",
      groups: "top",
      completion_id: "completion_1on1_CompletedGoal; \ncompletion_Praise_CompletedGoal",
    },
    {
      id: "goal_relation",
      label: "I want to have a better relationship with my teen",
      groups: "top",
      requires: '@fields.programmegoal="I want to have a better relationship with my teen"',
      completion_id:
        "completion_SpendTime_level1_CompletedGoal;\ncompletion_SpendTime_level2_CompletedGoal;",
    },
    {
      id: "goal_behavior",
      label: "I want my teen to behave better",
      groups: "top",
      requires: '@fields.programmegoal="I want my teen to behave better"',
      completion_id:
        "completion_SpendTime_level1_CompletedGoal; \ncompletion_PraiseTeen_level2_CompletedGoal;completion_SpendTime_level2_CompletedGoal; \ncompletion_PraiseTeen_level2_CompletedGoal;",
    },
    {
      id: "goal_stress",
      label: "I want to feel less stress, loneliness or anger",
      groups: "top",
      requires: '@fields.programmegoal="I want to feel less stress, loneliness or anger"',
      completion_id: "completion_Relax_level1_CompletedGoal;completion_Relax_level2_CompletedGoal",
    },
    {
      id: "goal_money",
      label: "I want to worry about money less",
      groups: "top",
      requires: '@fields.programmegoal="I want to worry about money less"',
    },
    {
      id: "goal_conflict",
      label: "I want less conflict in my family",
      groups: "top",
      requires: '@fields.programmegoal="I want less conflict in my family"',
    },
    {
      label: "I want to know more about how to keep my teen safe online and offline",
      groups: "top",
      requires:
        '@fields.programmegoal="I want to know more about how to keep my teen safe online and offline"',
    },
    {
      id: "goal_disability",
      label: "JML TO ADD DISABILITY OPTION ",
      groups: "top",
      requires: '@fields.programmegoal="JML TO ADD DISABILITY OPTION"',
    },
    {
      id: "goal_SpendTime1",
      label: "Spend one-on-one time with my teen",
      groups: "level1",
      completion_id: "completion_SpendTime_level1",
    },
    {
      id: "goal_SpendTime2",
      label: "Spend one-on-one time with my teen",
      groups: "level2",
      requires: "goal_SpendTime1",
      completion_id: "completion_SpendTime_level2",
    },
    {
      id: "goal_PraiseTeen1",
      label: "Praise my teen",
      groups: "level1",
      completion_id: "completion_PraiseTeen_level1",
    },
    {
      id: "goal_PraiseTeen2",
      label: "Praise my teen",
      groups: "level2",
      requires: "goal_PraiseTeen1",
      completion_id: "completion_PraiseTeen_level2",
    },
    {
      id: "goal_Relax1",
      label: "Relax",
      groups: "level1",
      completion_id: "completion_Relax_level1",
    },
    {
      id: "goal_Relax2",
      label: "Relax",
      groups: "level2",
      requires: "goal_Relax1",
      completion_id: "completion_Relax_level2",
    },
  ],
  TasksList: [
    {
      id: "task_1on1_Emo",
      label: "Emotional Check-in",
      start_action: "start_new_flow",
      start_action_args: "1on1_Emo",
      evaluation: "completed",
      requires: "task_1on1_Intro",
    },
    {
      id: "task_1on1_Intro",
      label: "Introduction",
      start_action: "start_new_flow",
      start_action_args: "1on1_Intro",
      evaluation: "completed ",
    },
    {
      id: "task_1on1_Tips",
      label: "Core Tips",
      start_action: "start_new_flow",
      start_action_args: "toolbox_1on1_Tips",
      evaluation: "completed",
      requires: "task_1on1_Intro",
    },
    {
      id: "task_1on1_Activity",
      label: "Home Activity Assignment",
      start_action: "start_new_flow",
      start_action_args: "1on1_Activity",
      evaluation: "completed",
      requires: "task_1on1_Intro",
    },
    {
      id: "task_1on1_ActRev",
      label: "Home Activity Review",
      start_action: "start_new_flow",
      start_action_args: "1on1_ActRev",
      evaluation: "completed",
      requires: "task_1on1_Activity",
    },
    {
      id: "task_1on1_CompletedGoal",
      start_action: "fireworks",
      trigger_on: "goal_1on1Module",
      evaluation: "completed",
    },
    {
      id: "task_Praise_Intro",
      label: "Introduction",
      start_action: "start_new_flow",
      start_action_args: "Praise_Intro",
      evaluation: "completed",
      requires: "task_1on1_CompletedGoal",
    },
    {
      id: "task_Praise_Tips",
      label: "Core Tips",
      start_action: "start_new_flow",
      start_action_args: "toolbox_Praise_Tips",
      evaluation: "completed",
      requires: "task_Praise_Intro",
    },
    {
      id: "task_Praise_Activity",
      label: "Home Activity Assignment",
      start_action: "start_new_flow",
      start_action_args: "Praise_Activity",
      evaluation: "completed",
      requires: "task_Praise_Intro",
    },
    {
      id: "task_Praise_ActRev",
      label: "Home Activity Review",
      start_action: "start_new_flow",
      start_action_args: "Praise_ActRev",
      evaluation: "completed",
      requires: "task_Praise_Activity",
    },
    {
      id: "task_Praise_CompletedGoal",
      start_action: "fireworks",
      trigger_on: "goal_PraiseModule",
      evaluation: "completed",
    },
    {
      id: "task_SpendTime",
      label: "Spend one-on-one time with your teen",
    },
    {
      id: "task_SpendTime_level1_CompletedGoal",
      start_action: "fireworks",
    },
    {
      id: "task_SpendTime_level2_CompletedGoal",
      start_action: "fireworks",
    },
    {
      id: "task_PraiseAdult",
      label: "Praise another adult in your household",
    },
    {
      id: "task_PraiseSelf",
      label: "Praise yourself",
    },
    {
      id: "task_PraiseTeen",
      label: "Praise your teen",
    },
    {
      id: "task_PraiseTeen_level1_CompletedGoal",
      start_action: "fireworks",
      trigger_on: "goal_PraiseTeen1",
    },
    {
      id: "task_PraiseTeen_level2_CompletedGoal",
      start_action: "fireworks",
      trigger_on: "goal_PraiseTeen2",
    },
    {
      id: "task_Relax",
      label: "Relaxation activity",
      start_action: "start_new_flow",
      start_action_args: "Calm1",
      evaluation: "completed",
    },
    {
      id: "task_Relax_level1_CompletedGoal",
      start_action: "fireworks",
    },
    {
      id: "task_Relax_level2_CompletedGoal",
      start_action: "fireworks",
    },
  ],
  CompletionsList: [
    {
      id: "completion_1on1_Emo",
      task_id: "task_1on1_Emo",
    },
    {
      id: "completion_1on1_Intro",
      task_id: "task_1on1_Intro",
    },
    {
      id: "completion_1on1_Tips",
      task_id: "task_1on1_Tips",
    },
    {
      id: "completion_1on1_Activity",
      task_id: "task_1on1_Activity",
    },
    {
      id: "completion_1on1_ActRev",
      task_id: "task_1on1_ActRev",
    },
    {
      id: "completion_1on1_CompletedGoal",
      task_id: "task_1on1_CompletedGoal",
    },
    {
      id: "completion_Praise_Intro",
      task_id: "task_Praise_Intro",
    },
    {
      id: "completion_Praise_Tips",
      task_id: "task_Praise_Tips",
    },
    {
      id: "completion_Praise_Activity",
      task_id: "task_Praise_Activity",
    },
    {
      id: "completion_Praise_CompletedGoal",
      task_id: "task_Praise_CompletedGoal",
    },
    {
      id: "completion_SpendTime_level1",
      task_id: "task_SpendTime",
    },
    {
      id: "completion_SpendTime_level2",
      task_id: "task_SpendTime",
      repeat_count: 2,
    },
    {
      id: "completion_SpendTime_level1_CompletedGoal",
      task_id: "task_SpendTime_level1_CompletedGoal",
    },
    {
      id: "completion_SpendTime_level2_CompletedGoal",
      task_id: "task_SpendTime_level2_CompletedGoal",
    },
    {
      id: "completion_PraiseAdult",
      task_id: "task_PraiseAdult",
    },
    {
      id: "completion_PraiseSelf",
      task_id: "task_PraiseSelf",
      repeat_count: 2,
      repeat_interval: 2,
    },
    {
      id: "completion_PraiseTeen_level1",
      task_id: "task_PraiseTeen",
      repeat_count: 3,
    },
    {
      id: "completion_PraiseTeen_level2",
      task_id: "task_PraiseTeen",
      repeat_count: 10,
    },
    {
      id: "completion_PraiseTeen_level1_CompletedGoal",
      task_id: "task_PraiseTeen_level1_CompletedGoal",
    },
    {
      id: "completion_PraiseTeen_level2_CompletedGoal",
      task_id: "task_PraiseTeen_level2_CompletedGoal",
    },
    {
      id: "completion_Relax_level1",
      task_id: "task_Relax",
      repeat_count: 3,
    },
    {
      id: "completion_Relax_level2",
      task_id: "task_Relax",
      repeat_count: 6,
    },
    {
      id: "completion_Relax_level1_CompletedGoal",
      task_id: "task_Relax_level1_CompletedGoal",
    },
    {
      id: "completion_Relax_level2_CompletedGoal",
      task_id: "task_Relax_level2_CompletedGoal",
    },
  ],
  RemindersList: [
    {
      id: "Reminder_Remind_Emo2",
      repeats: true,
      every: "day",
      on: "hour: 8",
      open_action: "Remind_Emo2",
    },
  ],
  AwardsList: [
    {
      id: "cup",
    },
    {
      id: "fireworks",
    },
  ],
};
