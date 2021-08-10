/* eslint-disable */
import { FlowTypes } from "../../model/flowTypes";
const data_list: FlowTypes.Data_list[] = [
  {
    flow_type: "data_list",
    flow_name: "debug_data_list",
    status: "released",
    data_list_name: "debug",
    flow_subtype: "debug",
    rows: [
      {
        id: "item_1",
        text: "Item 1 text",
        image_asset: "assets/plh_assets/plh_images/habits/habit_relax.svg",
      },
      {
        id: "item_2",
        text: "Item 2 text",
        image_asset: "assets/plh_assets/plh_images/icons/play_white.svg",
      },
      {
        id: "item_3",
        text: "Item 3 text",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_data_lists.xlsx",
  },
  {
    flow_type: "data_list",
    flow_name: "debug_variable_data",
    status: "released",
    data_list_name: "debug_vars",
    flow_subtype: "debug",
    rows: [
      {
        id: "number_1",
        value: 1,
      },
      {
        id: "bool_true",
        value: true,
      },
      {
        id: "bool_false",
        value: false,
      },
      {
        id: "number_0",
        value: 0,
      },
      {
        id: "list_1",
        value_list: ["1", "2", "3"],
      },
      {
        id: "text_1",
        value: "text1",
      },
      {
        id: "collection_1",
        value_collection: {
          key1: "val1",
          key2: "val2",
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_nesting_variables.xlsx",
  },
  {
    flow_type: "data_list",
    flow_name: "example_lang_data_list",
    status: "released",
    data_list_name: "language",
    flow_subtype: "debug",
    rows: [
      {
        id: "example_lang_1",
        image_asset: "assets/plh_assets/plh_images/habits/habit_relax.svg",
        lottie_asset: "assets/plh_assets/plh_lottie/habits/habit_relax.json",
        title: "Example Data List Title 1",
        _translations: {
          title: {
            spa: true,
          },
          text: {
            spa: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Example Data List Title 1",
          },
          text: {
            eng: "This text is loaded through the first data row.",
          },
        },
        text: "This text is loaded through the first data row.",
      },
      {
        id: "example_lang_2",
        image_asset: "assets/plh_assets/plh_images/habits/habit_treat_yourself.svg",
        lottie_asset: "assets/plh_assets/plh_lottie/habits/habit_treat_yourself.json",
        title: "Example Data List Title 2",
        _translations: {
          title: {
            spa: true,
          },
          text: {
            spa: true,
          },
        },
        _translatedFields: {
          title: {
            eng: "Example Data List Title 2",
          },
          text: {
            eng: "This text is loaded through the second data row.",
          },
        },
        text: "This text is loaded through the second data row.",
      },
      {
        id: "example_lang_3",
        text: "This text should define a default value for a field",
        _translations: {
          text: {
            spa: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "This text should define a default value for a field",
          },
        },
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/example_templates/example_languages.xlsx",
  },
];
export default data_list;
