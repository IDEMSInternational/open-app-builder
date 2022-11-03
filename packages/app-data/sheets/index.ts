import { FlowTypes } from "data-models";
type ISheetContents = {
  [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeBase };
};
export const SHEETS_CONTENT_LIST: ISheetContents = {
  data_list: {
    deworming_sections: {
      flow_type: "data_list",
      flow_name: "deworming_sections",
      data_list_name: "deworming_sections",
      _xlsxPath: "data_lists/deworming/deworming_data_list.xlsx",
    },
    deworming_sub_sections: {
      flow_type: "data_list",
      flow_name: "deworming_sub_sections",
      data_list_name: "deworming_sub_sections",
      _xlsxPath: "data_lists/deworming/deworming_data_list.xlsx",
    },
    habits_data_list: {
      flow_type: "data_list",
      flow_name: "habits_data_list",
      data_list_name: "habits_data_list",
      _xlsxPath: "data_lists/habits/wash_habits_data_lists.xlsx",
    },
    library_data: {
      flow_type: "data_list",
      flow_name: "library_data",
      data_list_name: "library",
      _xlsxPath: "data_lists/homepage/library_data_list.xlsx",
    },
    menstrual_sections: {
      flow_type: "data_list",
      flow_name: "menstrual_sections",
      data_list_name: "menstrual_sections",
      _xlsxPath: "data_lists/menstrual hygiene/menstrual_data_list.xlsx",
    },
    menstrual_sub_sections: {
      flow_type: "data_list",
      flow_name: "menstrual_sub_sections",
      data_list_name: "menstrual_sub_sections",
      _xlsxPath: "data_lists/menstrual hygiene/menstrual_data_list.xlsx",
    },
    sub_section: {
      flow_type: "data_list",
      flow_name: "sub_section",
      data_list_name: "sub_section",
      _xlsxPath: "data_lists/habits/wash_habits_data_lists.xlsx",
    },
    toilet_sections: {
      flow_type: "data_list",
      flow_name: "toilet_sections",
      data_list_name: "toilet_sections",
      _xlsxPath: "data_lists/toilet/toilet_data_list.xlsx",
    },
    topics: {
      flow_type: "data_list",
      flow_name: "topics",
      data_list_name: "topics",
      _xlsxPath: "data_lists/homepage/topics_data_list.xlsx",
    },
    waste_management_sections: {
      flow_type: "data_list",
      flow_name: "waste_management_sections",
      data_list_name: "waste_management_sections",
      _xlsxPath: "data_lists/waste management/waste_management_data_list.xlsx",
    },
    water_sections: {
      flow_type: "data_list",
      flow_name: "water_sections",
      data_list_name: "water_sections",
      _xlsxPath: "data_lists/water/water_data_list.xlsx",
    },
    water_sub_sections: {
      flow_type: "data_list",
      flow_name: "water_sub_sections",
      data_list_name: "water_sub_sections",
      _xlsxPath: "data_lists/water/water_data_list.xlsx",
    },
  },
  global: {},
  template: {
    app_menu: {
      flow_type: "template",
      flow_name: "app_menu",
      _xlsxPath: "templates/global/navigation.xlsx",
    },
    deworming_content_templates: {
      flow_type: "template",
      flow_name: "deworming_content_templates",
      _xlsxPath: "templates/global/deworming_navigation.xlsx",
    },
    deworming_screen: {
      flow_type: "template",
      flow_name: "deworming_screen",
      _xlsxPath: "templates/global/navigation.xlsx",
    },
    deworming_sub_templates: {
      flow_type: "template",
      flow_name: "deworming_sub_templates",
      _xlsxPath: "templates/global/deworming_navigation.xlsx",
    },
    habits: {
      flow_type: "template",
      flow_name: "habits",
      _xlsxPath: "templates/global/wash_habits_navigation.xlsx",
    },
    habits_screen: {
      flow_type: "template",
      flow_name: "habits_screen",
      _xlsxPath: "templates/global/wash_habits_navigation.xlsx",
    },
    help_banner: {
      flow_type: "template",
      flow_name: "help_banner",
      _xlsxPath: "templates/global/navigation.xlsx",
    },
    home_screen: {
      flow_type: "template",
      flow_name: "home_screen",
      _xlsxPath: "templates/global/navigation.xlsx",
    },
    menstrual_content_templates: {
      flow_type: "template",
      flow_name: "menstrual_content_templates",
      _xlsxPath: "templates/global/menstrual_navigation.xlsx",
    },
    menstrual_hygiene_screen: {
      flow_type: "template",
      flow_name: "menstrual_hygiene_screen",
      _xlsxPath: "templates/global/navigation.xlsx",
    },
    menstrual_sub_templates: {
      flow_type: "template",
      flow_name: "menstrual_sub_templates",
      _xlsxPath: "templates/global/menstrual_navigation.xlsx",
    },
    toilet_content_templates: {
      flow_type: "template",
      flow_name: "toilet_content_templates",
      _xlsxPath: "templates/global/toilet_navigation.xlsx",
    },
    toilet_screen: {
      flow_type: "template",
      flow_name: "toilet_screen",
      _xlsxPath: "templates/global/navigation.xlsx",
    },
    toilet_sub_templates: {
      flow_type: "template",
      flow_name: "toilet_sub_templates",
      _xlsxPath: "templates/global/toilet_navigation.xlsx",
    },
    topic_screen: {
      flow_type: "template",
      flow_name: "topic_screen",
      _xlsxPath: "templates/global/navigation.xlsx",
    },
    topics_screen: {
      flow_type: "template",
      flow_name: "topics_screen",
      _xlsxPath: "templates/global/navigation.xlsx",
    },
    waste_mgmt_screen: {
      flow_type: "template",
      flow_name: "waste_mgmt_screen",
      _xlsxPath: "templates/global/navigation.xlsx",
    },
    water_content_templates: {
      flow_type: "template",
      flow_name: "water_content_templates",
      data_list_name: "water_content_templates",
      _xlsxPath: "templates/global/water_navigation.xlsx",
    },
    water_screen: {
      flow_type: "template",
      flow_name: "water_screen",
      _xlsxPath: "templates/global/navigation.xlsx",
    },
    water_sub_sub: {
      flow_type: "template",
      flow_name: "water_sub_sub",
      data_list_name: "water_sub_sub",
      _xlsxPath: "templates/global/water_navigation.xlsx",
    },
    water_sub_templates: {
      flow_type: "template",
      flow_name: "water_sub_templates",
      data_list_name: "water_sub_templates",
      _xlsxPath: "templates/global/water_navigation.xlsx",
    },
  },
  tour: {},
  data_pipe: {},
};
