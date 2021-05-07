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
  }
]