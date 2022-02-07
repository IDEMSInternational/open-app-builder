/* eslint-disable */
import { FlowTypes } from "data-models";
const data_list: FlowTypes.Data_list[] = [
  {
    flow_type: "data_list",
    flow_name: "example_lang_data_list",
    status: "released",
    data_list_name: "example_lang",
    flow_subtype: "debug",
    rows: [
      {
        id: "example_lang_1",
        image_asset: "plh_images/habits/habit_relax.svg",
        lottie_asset: "plh_lottie/habits/habit_relax.json",
        title: "Example Data List Title 1",
        _translations: {
          title: {
            es_sp: true,
          },
          text: {
            es_sp: true,
          },
          bold_title: {},
          title_and_happy: {},
        },
        _translatedFields: {
          title: {
            eng: "Example Data List Title 1",
          },
          text: {
            eng: "This text is loaded through the first data row.",
          },
          bold_title: {
            eng: "**Example Data List Title 1**",
          },
          title_and_happy: {
            eng: "Example Data List Title 1 happy",
          },
        },
        text: "This text is loaded through the first data row.",
        bold_title: "**Example Data List Title 1**",
        title_and_happy: "Example Data List Title 1 happy",
      },
      {
        id: "example_lang_2",
        image_asset: "plh_images/habits/habit_treat_yourself.svg",
        lottie_asset: "plh_lottie/habits/habit_treat_yourself.json",
        title: "Example Data List Title 2",
        _translations: {
          title: {
            es_sp: true,
          },
          text: {
            es_sp: true,
          },
          bold_title: {},
          title_and_happy: {},
        },
        _translatedFields: {
          title: {
            eng: "Example Data List Title 2",
          },
          text: {
            eng: "This text is loaded through the second data row.",
          },
          bold_title: {
            eng: "**Example Data List Title 2**",
          },
          title_and_happy: {
            eng: "Example Data List Title 2 happy",
          },
        },
        text: "This text is loaded through the second data row.",
        bold_title: "**Example Data List Title 2**",
        title_and_happy: "Example Data List Title 2 happy",
      },
      {
        id: "example_lang_3",
        text: "This text should define a default value for a field",
        _translations: {
          text: {
            es_sp: true,
          },
        },
        _translatedFields: {
          text: {
            eng: "This text should define a default value for a field",
          },
        },
      },
    ],
    _xlsxPath: "quality_assurance/example_templates/example_languages.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "debug",
    flow_name: "example_calc_data_list",
    status: "released",
    data_list_name: "example_calc",
    rows: [
      {
        id: "example_1",
        value_list: [
          "name:name_var_1 | text:Option 1",
          "name:name_var_2 | text: Option 2",
          "name:name_var_3 | text: Option 3",
        ],
        exclude_from_translation: true,
      },
    ],
    _xlsxPath: "quality_assurance/example_templates/example_calc.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "debug",
    flow_name: "example_data_list",
    status: "released",
    data_list_name: "example",
    rows: [
      {
        id: "example1",
        value: "Success - Example 1",
        text: "some text",
      },
      {
        id: "example3",
        value_list: ["name:name_var_1 | text:Option 1", "name:name_var_2 | text: Option 2"],
        text: "any fields can be accessed",
      },
    ],
    _xlsxPath: "quality_assurance/example_templates/example_data_lists.xlsx",
  },
  {
    flow_type: "data_list",
    flow_subtype: "debug",
    flow_name: "example_items_data_list",
    status: "released",
    data_list_name: "example_items",
    rows: [
      {
        id: "item_1",
        name: "first",
        field_value: 7,
        unlock_fieldname: "example_unlocked_item_1",
        unlock_week: 1,
      },
      {
        id: "item_2",
        name: "second",
        field_value: 1,
        unlock_fieldname: "example_unlocked_item_2",
        unlock_week: 2,
      },
      {
        id: "item_3",
        name: "third",
        field_value: 3,
        unlock_fieldname: "example_unlocked_item_3",
        unlock_week: 3,
      },
      {
        id: "item_4",
        name: "fourth",
        field_value: 2,
        unlock_fieldname: "example_unlocked_item_4",
        unlock_week: 4,
      },
    ],
    _xlsxPath: "quality_assurance/example_templates/example_items.xlsx",
  },
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
        image_asset: "plh_images/habits/habit_relax.svg",
      },
      {
        id: "item_2",
        text: "Item 2 text",
        image_asset: "plh_images/icons/play_white.svg",
      },
      {
        id: "item_3",
        text: "Item 3 text",
      },
    ],
    _xlsxPath: "quality_assurance/debug_templates/debug_data_lists.xlsx",
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
    _xlsxPath: "quality_assurance/debug_templates/debug_nesting_variables.xlsx",
  },
  {
    flow_type: "data_list",
    flow_name: "feature_items_data",
    status: "released",
    flow_subtype: "debug",
    rows: [
      {
        id: "item_1",
        title: "Item 1",
        button_text: "Button 1",
        link: "link_1",
      },
      {
        id: "item_2",
        title: "Item 2",
        button_text: "Button 2",
        link: "link_2",
      },
      {
        id: "item_3",
        title: "Item 3",
        button_text: "Button 3",
        link: "link_3",
      },
    ],
    _xlsxPath: "quality_assurance/feature_templates/feature_items.xlsx",
  },
];
export default data_list;
