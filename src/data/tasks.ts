export default [
  {
    "flow_type": "tasks",
    "flow_name": "tasks_list",
    "status": "released",
    "data": [
      {
        "id": "task_1on1_emo",
        "label": "Emotional Check-in",
        "start_action": "start_new_flow",
        "start_action_args": "1on1_emo",
        "evaluation": "completed",
        "requires": "first_app_launch | delay_7_day"
      },
      {
        "id": "task_1on1_intro",
        "label": "Introduction",
        "start_action": "start_new_flow",
        "start_action_args": "1on1_intro",
        "evaluation": "completed ",
        "requires": "task_1on1_emo"
      },
      {
        "id": "task_1on1_tips",
        "label": "Core Tips",
        "start_action": "start_new_flow",
        "start_action_args": "toolbox_1on1_tips",
        "evaluation": "completed",
        "requires": "task_1on1_intro"
      },
      {
        "id": "task_1on1_activity",
        "label": "Home Activity Assignment",
        "start_action": "start_new_flow",
        "start_action_args": "1on1_activity",
        "evaluation": "completed",
        "requires": "task_1on1_intro"
      },
      {
        "id": "task_1on1_act_rev",
        "label": "Home Activity Review",
        "start_action": "start_new_flow",
        "start_action_args": "1on1_act_rev",
        "evaluation": "completed",
        "requires": "task_1on1_activity | delay_2_day"
      },
      {
        "id": "task_1on1_completed_goal",
        "start_action": "give_award",
        "start_action_args": "cup",
        "evaluation": "completed"
      },
      {
        "id": "task_praise_intro",
        "label": "Introduction",
        "start_action": "start_new_flow",
        "start_action_args": "praise_intro",
        "evaluation": "completed",
        "requires": "task_1on1_completed_goal; first_launch | delay_14_day"
      },
      {
        "id": "task_praise_tips",
        "label": "Core Tips",
        "start_action": "start_new_flow",
        "start_action_args": "toolbox_praise_tips",
        "evaluation": "completed",
        "requires": "task_praise_intro"
      },
      {
        "id": "task_praise_activity",
        "label": "Home Activity Assignment",
        "start_action": "start_new_flow",
        "start_action_args": "praise_activity",
        "evaluation": "completed",
        "requires": "task_praise_intro"
      },
      {
        "id": "task_praise_act_rev",
        "label": "Home Activity Review",
        "start_action": "start_new_flow",
        "start_action_args": "praise_act_rev",
        "evaluation": "completed",
        "requires": "task_praise_activity"
      },
      {
        "id": "task_praise_completed_goal",
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