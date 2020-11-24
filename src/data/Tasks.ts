export default [
  {
    "Flow_Type": "Tasks",
    "Flow_Name": "TasksList",
    "data": [
      {
        "id": "task_1on1_Emo",
        "label": "Emotional Check-in",
        "start_action": "start_new_flow",
        "start_action_args": "1on1_Emo",
        "evaluation": "completed"
      },
      {
        "id": "task_1on1_Intro",
        "label": "Introduction",
        "start_action": "start_new_flow",
        "start_action_args": "1on1_Intro",
        "evaluation": "completed ",
        "requires": "task_1on1_Emo"
      },
      {
        "id": "task_1on1_Tips",
        "label": "Core Tips",
        "start_action": "start_new_flow",
        "start_action_args": "Toolbox_1on1_Tips",
        "evaluation": "completed",
        "requires": "task_1on1_Intro"
      },
      {
        "id": "task_1on1_Activity",
        "label": "Home Activity Assignment",
        "start_action": "start_new_flow",
        "start_action_args": "1on1_Activity",
        "evaluation": "completed",
        "requires": "task_1on1_Intro"
      },
      {
        "id": "task_1on1_ActRev",
        "label": "Home Activity Review",
        "start_action": "start_new_flow",
        "start_action_args": "1on1_ActRev",
        "evaluation": "completed",
        "requires": "task_1on1_Activity"
      },
      {
        "id": "task_1on1_CompletedGoal",
        "start_action": "give_award",
        "start_action_args": "cup",
        "evaluation": "completed"
      },
      {
        "id": "task_Praise_Intro",
        "label": "Introduction",
        "start_action": "start_new_flow",
        "start_action_args": "Praise_Intro",
        "evaluation": "completed",
        "requires": "task_1on1_CompletedGoal"
      },
      {
        "id": "task_Praise_Tips",
        "label": "Core Tips",
        "start_action": "start_new_flow",
        "start_action_args": "Toolbox_Praise_Tips",
        "evaluation": "completed",
        "requires": "task_Praise_Intro"
      },
      {
        "id": "task_Praise_Activity",
        "label": "Home Activity Assignment",
        "start_action": "start_new_flow",
        "start_action_args": "Praise_Activity",
        "evaluation": "completed",
        "requires": "task_Praise_Intro"
      },
      {
        "id": "task_Praise_ActRev",
        "label": "Home Activity Review",
        "start_action": "start_new_flow",
        "start_action_args": "Praise_ActRev",
        "evaluation": "completed",
        "requires": "task_Praise_Activity"
      },
      {
        "id": "task_Praise_CompletedGoal",
        "start_action": "give_award",
        "start_action_args": "cup",
        "evaluation": "completed"
      },
      {
        "id": "task_SpendTime",
        "label": "Spend one-on-one time with your teen",
        "groups": "repeatOnCompletion"
      },
      {
        "id": "task_SpendTime_level1_CompletedGoal",
        "groups": "hidden",
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_SpendTime_level2_CompletedGoal",
        "groups": "hidden",
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_PraiseAdult",
        "label": "Praise another adult in your household",
        "groups": "repeatOnCompletion"
      },
      {
        "id": "task_PraiseSelf",
        "label": "Praise yourself",
        "groups": "repeatOnCompletion"
      },
      {
        "id": "task_PraiseTeen",
        "label": "Praise your teen",
        "groups": "repeatOnCompletion"
      },
      {
        "id": "task_PraiseTeen_level1_CompletedGoal",
        "groups": "hidden",
        "start_action": "give_award",
        "start_action_args": "fireworks",
        "trigger_on": "goal_PraiseTeen1"
      },
      {
        "id": "task_PraiseTeen_level2_CompletedGoal",
        "groups": "hidden",
        "start_action": "give_award",
        "start_action_args": "fireworks",
        "trigger_on": "goal_PraiseTeen2"
      },
      {
        "id": "task_Relax",
        "label": "Relaxation activity",
        "groups": "repeatOnCompletion",
        "start_action": "start_new_flow",
        "start_action_args": "Calm1",
        "evaluation": "completed"
      },
      {
        "id": "task_Relax_level1_CompletedGoal",
        "groups": "hidden",
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_Relax_level2_CompletedGoal",
        "groups": "hidden",
        "start_action": "give_award",
        "start_action_args": "fireworks"
      },
      {
        "id": "task_OpenApp",
        "start_action": "open_app"
      }
    ]
  }
]