/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const habit_list: FlowTypes.Habit_list[] = [
  {
    "flow_type": "habit_list",
    "flow_name": "habit_list",
    "status": "released",
    "rows": [
      {
        "id": "habit_relax",
        "title": "Relax",
        "description": "Doing a relaxation activity",
        "task_id": "task_relax",
        "icon_asset": "assets/plh_assets/plh_images/habits/habit_relax_icon.svg",
        "main_image_asset": "assets/plh_assets/plh_images/habits/habit_relax_image.svg",
        "suggestion_button_text": "Relaxing activity",
        "suggestion_flow_type": "conversation",
        "suggestion_flow_name": "calm_random",
        "aim_button_text": "My aim",
        "set_aim_button_text": "Set my aim",
        "aim_action": "choose_number | completion_relax_custom | repeat_count | min=0 | max = 10"
      },
      {
        "id": "habit_treat_yourself",
        "title": "Treat yourself well",
        "description": "Doing something they like for themselves",
        "task_id": "task_treat_yourself",
        "icon_asset": "assets/plh_assets/plh_images/habits/habit_treat_yourself_icon.svg",
        "main_image_asset": "assets/plh_assets/plh_images/habits/habit_treat_yourself_image.svg",
        "suggestion_button_text": "Ideas to treat myself",
        "suggestion_flow_type": "tips",
        "suggestion_flow_name": "mod_welcome_ideas",
        "aim_button_text": "My aim",
        "set_aim_button_text": "Set my aim",
        "aim_action": "choose_number | completion_treat_yourself_custom | repeat_count | min=0 | max = 10"
      },
      {
        "id": "habit_praise_yourself",
        "title": "Praise yourself",
        "description": "Praising themselves",
        "task_id": "task_praise_yourself",
        "icon_asset": "assets/plh_assets/plh_images/habits/habit_praise_yourself_icon.svg",
        "main_image_asset": "assets/plh_assets/plh_images/habits/habit_praise_yourself_image.svg",
        "suggestion_button_text": "Ideas to praise myself",
        "suggestion_flow_type": "tips",
        "suggestion_flow_name": "mod_praise_ideas_self",
        "aim_button_text": "My aim",
        "set_aim_button_text": "Set my aim",
        "aim_action": "choose_number | completion_praise_yourself_custom | repeat_count | min=0 | max = 10"
      },
      {
        "id": "habit_spend_time",
        "title": "One on one time",
        "description": "Spending time with their teen",
        "task_id": "task_spend_time",
        "icon_asset": "assets/plh_assets/plh_images/habits/habit_spend_time_icon.svg",
        "main_image_asset": "assets/plh_assets/plh_images/habits/habit_spend_time_image.svg",
        "suggestion_button_text": "Ideas to spend time with my teen",
        "suggestion_flow_type": "tips",
        "suggestion_flow_name": "mod_1on1_ideas",
        "aim_button_text": "My aim",
        "set_aim_button_text": "Set my aim",
        "aim_action": "choose_number | completion_spend_time_custom | repeat_count | min=0 | max = 10"
      },
      {
        "id": "habit_praise_teen",
        "title": "Praise your teen",
        "description": "Praising their teen when they did positive thing",
        "task_id": "task_praise_teen",
        "icon_asset": "assets/plh_assets/plh_images/habits/habit_praise_teen_icon.svg",
        "main_image_asset": "assets/plh_assets/plh_images/habits/habit_praise_teen_image.svg",
        "suggestion_button_text": "Ideas to praise my teen",
        "suggestion_flow_type": "tips",
        "suggestion_flow_name": "mod_praise_ideas_teen",
        "aim_button_text": "My aim",
        "set_aim_button_text": "Set my aim",
        "aim_action": "choose_number | completion_praise_teen_custom | repeat_count | min=0 | max = 10"
      },
      {
        "id": "habit_breathe",
        "title": "Breathe not yell",
        "description": "Taking a pause before responding",
        "task_id": "task_breathe",
        "icon_asset": "assets/plh_assets/plh_images/habits/habit_breathe_icon.svg",
        "main_image_asset": "assets/plh_assets/plh_images/habits/habit_breathe_image.svg",
        "aim_button_text": "My aim",
        "set_aim_button_text": "Set my aim",
        "aim_action": "choose_number | completion_breathe_custom | repeat_count | min=0 | max = 10"
      },
      {
        "id": "habit_money",
        "title": "Good money choice",
        "description": "Keeping the budget",
        "task_id": "task_money",
        "icon_asset": "assets/plh_assets/plh_images/habits/habit_money_icon.svg",
        "main_image_asset": "assets/plh_assets/plh_images/habits/habit_money_image.svg",
        "aim_button_text": "My aim",
        "set_aim_button_text": "Set my aim",
        "aim_action": "choose_number | completion_money_custom | repeat_count | min=0 | max = 10"
      },
      {
        "id": "habit_consequence",
        "title": "Calm consequence",
        "description": "Giving their teen a consequence in a calm way",
        "task_id": "task_consequence",
        "icon_asset": "assets/plh_assets/plh_images/habits/habit_consequence_icon.svg",
        "main_image_asset": "assets/plh_assets/plh_images/habits/habit_consequence_image.svg",
        "aim_button_text": "My aim",
        "set_aim_button_text": "Set my aim",
        "aim_action": "choose_number | completion_consequence_custom | repeat_count | min=0 | max = 10"
      },
      {
        "id": "habit_safe",
        "title": "Safe",
        "description": "Planning or keeping a family safety plan",
        "task_id": "task_safe",
        "icon_asset": "assets/plh_assets/plh_images/habits/habit_safe_icon.svg",
        "main_image_asset": "assets/plh_assets/plh_images/habits/habit_safe_image.svg",
        "aim_button_text": "My aim",
        "set_aim_button_text": "Set my aim",
        "aim_action": "choose_number | completion_safe_custom | repeat_count | min=0 | max = 10"
      }
    ]
  }
]