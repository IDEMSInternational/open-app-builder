/* eslint-disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const data_list: FlowTypes.Data_list[] = [
  {
    "flow_type": "data_list",
    "flow_name": "relax_list",
    "data_list_name": "relax",
    "status": "released",
    "rows": [
      {
        "id": "relax_1",
        "task_id": "task_relax",
        "text_template": "relax_1_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_1_audio.mp3"
      },
      {
        "id": "relax_2",
        "module": "1on1",
        "task_id": "task_relax",
        "text_template": "relax_2_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_2_audio.mp3"
      },
      {
        "id": "relax_3",
        "module": "praise",
        "task_id": "task_relax",
        "text_template": "relax_3_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_3_audio.mp3"
      },
      {
        "id": "relax_4",
        "module": "instruct",
        "task_id": "task_relax",
        "text_template": "relax_4_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_4_audio.mp3"
      },
      {
        "id": "relax_5",
        "module": "self_care",
        "task_id": "task_relax",
        "text_template": "relax_5_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_5_audio.mp3"
      },
      {
        "id": "relax_6",
        "task_id": "task_relax",
        "text_template": "relax_6_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_6_audio.mp3"
      },
      {
        "id": "relax_7",
        "module": "stress",
        "task_id": "task_relax",
        "text_template": "relax_7_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_7_audio.mp3"
      },
      {
        "id": "relax_8",
        "module": "money",
        "task_id": "task_relax",
        "text_template": "relax_8_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_8_audio.mp3"
      },
      {
        "id": "relax_9",
        "module": "rules",
        "task_id": "task_relax",
        "text_template": "relax_9_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_9_audio.mp3"
      },
      {
        "id": "relax_10",
        "module": "consequence",
        "task_id": "task_relax",
        "text_template": "relax_10_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_10_audio.mp3"
      },
      {
        "id": "relax_11",
        "module": "solve",
        "task_id": "task_relax",
        "text_template": "relax_11_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_11_audio.mp3"
      },
      {
        "id": "relax_12",
        "module": "safe",
        "task_id": "task_relax",
        "text_template": "relax_12_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_12_audio.mp3"
      },
      {
        "id": "relax_13",
        "module": "crisis",
        "task_id": "task_relax",
        "text_template": "relax_13_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_13_audio.mp3"
      },
      {
        "id": "relax_14",
        "module": "celebrate",
        "task_id": "task_relax",
        "text_template": "relax_14_text",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_14_audio.mp3"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_relax.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "debug_data_list",
    "status": "released",
    "data_list_name": "debug",
    "rows": [
      {
        "id": "item_1",
        "text": "Item 1 text",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_relax_image.svg"
      },
      {
        "id": "item_2",
        "text": "Item 2 text"
      },
      {
        "id": "item_3",
        "text": "Item 3 text"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_data_lists.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "debug_variable_data",
    "status": "released",
    "data_list_name": "debug_vars",
    "rows": [
      {
        "id": "number_1",
        "value": 1
      },
      {
        "id": "bool_true",
        "value": true
      },
      {
        "id": "bool_false",
        "value": false
      },
      {
        "id": "number_0",
        "value": 0
      },
      {
        "id": "list_1",
        "value_list": [
          "1",
          "2",
          "3"
        ],
        "comment": "if referring to _list the value will already be parsed as array"
      },
      {
        "id": "text_1",
        "value": "text1"
      },
      {
        "id": "collection_1",
        "value_collection": {
          "key1": "val1",
          "key2": "val2"
        },
        "comment": "if referring to _collection the value will already be parsed as object"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx"
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
        "id": "example3",
        "value_list": [
          "name:name_var_1 | text:Option 1",
          "name:name_var_2 | text: Option 2"
        ],
        "text": "any fields can be accessed",
        "comments": "If a column ends in _list it will be parsed as an array"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_data_lists.xlsx"
  },
  {
    "flow_type": "data_list",
    "flow_name": "habit_data_list",
    "status": "released",
    "data_list_name": "habit",
    "rows": [
      {
        "id": "relax",
        "title": "Relax",
        "description": "Doing a relaxation activity",
        "task_id": "task_habit_relax",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_relax_image.svg",
        "mark_text": "Every time you do a relax, tap the ParentPoint and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "treat_yourself",
        "title": "Treat yourself well",
        "description": "Doing something they like for themselves",
        "task_id": "task_habit_treat_yourself",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_treat_yourself_image.svg",
        "mark_text": "Every time you treat yourself well, tap the ParentPoint and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "praise_yourself",
        "title": "Praise yourself",
        "description": "Praising themselves",
        "task_id": "task_habit_praise_yourself",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_praise_yourself_image.svg",
        "mark_text": "Every time you praise yourself, tap the ParentPoint and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "spend_time",
        "title": "One on one time",
        "description": "Spending time with their teen",
        "task_id": "task_habit_spend_time",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_spend_time_image.svg",
        "mark_text": "Every time you do one-on-one time, tap the ParentPoint and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "praise_teen",
        "title": "Praise your teen",
        "description": "Praising their teen when they did positive thing",
        "task_id": "task_habit_praise_teen",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_praise_teen_image.svg",
        "mark_text": "Every time you praise your teen, tap the ParentPoint and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "instruct_positively",
        "title": "Get positive",
        "description": "Giving their teen a positive instruction",
        "task_id": "task_habit_instruct_positively",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_praise_teen_image.svg",
        "mark_text": "Every time you give a positive instruction, tap the ParentPoint and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "breathe",
        "title": "Breathe not yell",
        "description": "Taking a pause before responding",
        "task_id": "task_habit_breathe",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_breathe_image.svg",
        "mark_text": "Every time you take a pause before responding, tap the ParentPoint and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "money",
        "title": "Good money choice",
        "description": "Keeping the budget",
        "task_id": "task_habit_money",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_money_image.svg",
        "mark_text": "Every time you make a good choice about needs, wants and savings, tap the ParentPoint and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "consequence",
        "title": "Calm consequence",
        "description": "Giving their teen a consequence in a calm way",
        "task_id": "task_habit_consequence",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_consequence_image.svg",
        "mark_text": "Every time you give a calm consequence, tap the ParentPoint and celebrate your success!",
        "short_mark_text": "Tap it!"
      },
      {
        "id": "safe",
        "title": "Safe",
        "description": "Planning or keeping a family safety plan",
        "task_id": "task_habit_safe",
        "image_asset": "assets/plh_assets/plh_images/habits/habit_safe_image.svg",
        "mark_text": "Every time you do something to keep your teen safe, tap the ParentPoint and celebrate your success!",
        "short_mark_text": "Tap it!"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/top_templates/parent_point_templates/habit_list.xlsx"
  }
]