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
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_audio_1.mp3"
      },
      {
        "id": "relax_2",
        "title": "Senses",
        "task_id": "task_relax",
        "text_template": "relax_text_2",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_audio_2.mp3"
      },
      {
        "id": "relax_3",
        "title": "Think about the day",
        "task_id": "task_relax",
        "text_template": "relax_text_3",
        "audio_asset": "assets/plh_assets/plh_audio/relax/relax_audio_3.mp3"
      },
      {
        "id": "relax_4",
        "title": "Breathe",
        "task_id": "task_relax",
        "text_template": "relax_text_4",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3"
      },
      {
        "id": "relax_5",
        "title": "Breathe",
        "task_id": "task_relax",
        "text_template": "relax_text_5",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3"
      },
      {
        "id": "relax_6",
        "title": "Think about the day",
        "task_id": "task_relax",
        "text_template": "relax_text_6",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3"
      },
      {
        "id": "relax_7",
        "title": "Breathe",
        "task_id": "task_relax",
        "text_template": "relax_text_7",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3"
      },
      {
        "id": "relax_8",
        "title": "Take a moment",
        "task_id": "task_relax",
        "text_template": "relax_text_8",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3"
      },
      {
        "id": "relax_9",
        "task_id": "task_relax",
        "text_template": "relax_text_9",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp3"
      },
      {
        "id": "relax_10",
        "task_id": "task_relax",
        "text_template": "relax_text_10",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp4"
      },
      {
        "id": "relax_11",
        "task_id": "task_relax",
        "text_template": "relax_text_11",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp5"
      },
      {
        "id": "relax_12",
        "task_id": "task_relax",
        "text_template": "relax_text_12",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp6"
      },
      {
        "id": "relax_13",
        "task_id": "task_relax",
        "text_template": "relax_text_13",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp7"
      },
      {
        "id": "relax_14",
        "task_id": "task_relax",
        "text_template": "relax_text_14",
        "audio_asset": "assets/plh_assets/plh_audio/sample.mp8"
      }
    ],
    "_xlsxPath": "plh_sheets_beta/plh_templating/core_templates/core_templates_relax.xlsx"
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
        "value_collection": "key1:val1; key2:val2",
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