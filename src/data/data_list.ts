/* eslint-disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const data_list: FlowTypes.Data_list[] = [
  {
    "flow_type": "data_list",
    "flow_name": "relax_list",
    "data_list_name": "relax_list",
    "status": "released",
    "rows": [
      {
        "id": "relax_1",
        "title": "Breathe",
        "task_id": "task_relax",
        "text_template": "relax_text_1",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3",
        "animation_asset": "assets/plh_assets/plh_images/habits/habit_relax_image.svg"
      },
      {
        "id": "relax_2",
        "title": "Senses",
        "task_id": "task_relax",
        "text_template": "relax_text_2",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3",
        "animation_asset": "assets/plh_assets/plh_images/habits/habit_relax_image.svg"
      },
      {
        "id": "relax_3",
        "title": "Think about the day",
        "task_id": "task_relax",
        "text_template": "relax_text_3",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3",
        "animation_asset": "assets/plh_assets/plh_images/habits/habit_relax_image.svg"
      },
      {
        "id": "relax_4",
        "title": "Breathe",
        "task_id": "task_relax",
        "text_template": "relax_text_4",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3",
        "animation_asset": "assets/plh_assets/plh_images/habits/habit_relax_image.svg"
      },
      {
        "id": "relax_5",
        "title": "Breathe",
        "task_id": "task_relax",
        "text_template": "relax_text_5",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3",
        "animation_asset": "assets/plh_assets/plh_images/habits/habit_relax_image.svg"
      },
      {
        "id": "relax_6",
        "title": "Think about the day",
        "task_id": "task_relax",
        "text_template": "relax_text_6",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3",
        "animation_asset": "assets/plh_assets/plh_images/habits/habit_relax_image.svg"
      },
      {
        "id": "relax_7",
        "title": "Breathe",
        "task_id": "task_relax",
        "text_template": "relax_text_7",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3",
        "animation_asset": "assets/plh_assets/plh_images/habits/habit_relax_image.svg"
      },
      {
        "id": "relax_8",
        "title": "Take a moment",
        "task_id": "task_relax",
        "text_template": "relax_text_8",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3",
        "animation_asset": "assets/plh_assets/plh_images/habits/habit_relax_image.svg"
      },
      {
        "id": "relax_9",
        "task_id": "task_relax",
        "text_template": "relax_text_9",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3",
        "animation_asset": "assets/plh_assets/plh_images/habits/habit_relax_image.svg"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_relax.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "example_data_list",
    "status": "released",
    "data_list_name": "example",
    "rows": [
      {
        "id": "example1",
        "value": "Success - Example 1",
        "comments": "This text should be accessible in templates via @data.example.example1.text"
      },
      {
        "id": "example2",
        "value": "name:name_var_1 | text:Option 1, name:name_var_2 | text: Option 2"
      },
      {
        "id": "example3",
        "value_list": [
          "name:name_var_1 | text:Option 1",
          "name:name_var_2 | text: Option 2"
        ],
        "text": "any arbritary fields can be accessed"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_data_lists.xlsx"
  }
]