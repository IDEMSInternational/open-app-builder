import { FlowTypes } from "data-models";
type ISheetContents = {
  [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeBase };
};
export const SHEETS_CONTENT_LIST: ISheetContents = {
  data_list: {
    bathing_shelter: {
      flow_type: "data_list",
      flow_name: "bathing_shelter",
      data_list_name: "bathing_shelter",
      _xlsxPath: "data_lists/homepage/module_details.xlsx",
    },
    breastfeeding: {
      flow_type: "data_list",
      flow_name: "breastfeeding",
      data_list_name: "breastfeeding",
      _xlsxPath: "data_lists/homepage/module_details.xlsx",
    },
    clean_latrines: {
      flow_type: "data_list",
      flow_name: "clean_latrines",
      data_list_name: "clean_toilets",
      _xlsxPath: "data_lists/homepage/module_details.xlsx",
    },
    debug_nav_list: {
      flow_type: "data_list",
      flow_name: "debug_nav_list",
      flow_subtype: "debug",
      _xlsxPath: "quality_assurance/debug_sheets/debug_nav.xlsx",
    },
    handwashing: {
      flow_type: "data_list",
      flow_name: "handwashing",
      data_list_name: "handwashing",
      _xlsxPath: "data_lists/homepage/module_details.xlsx",
    },
    healthy_families: {
      flow_type: "data_list",
      flow_name: "healthy_families",
      data_list_name: "healthy_families",
      _xlsxPath: "data_lists/homepage/module_details.xlsx",
    },
    healthy_homes: {
      flow_type: "data_list",
      flow_name: "healthy_homes",
      data_list_name: "healthy_home",
      _xlsxPath: "data_lists/homepage/module_details.xlsx",
    },
    menstrual_hygiene: {
      flow_type: "data_list",
      flow_name: "menstrual_hygiene",
      data_list_name: "menstrual_hygiene",
      _xlsxPath: "data_lists/homepage/module_details.xlsx",
    },
    module_tasks: {
      flow_type: "data_list",
      flow_name: "module_tasks",
      data_list_name: "module_tasks",
      _xlsxPath: "data_lists/homepage/module_tasks.xlsx",
    },
    safe_food: {
      flow_type: "data_list",
      flow_name: "safe_food",
      data_list_name: "safe_food",
      _xlsxPath: "data_lists/homepage/module_details.xlsx",
    },
    safe_water_source: {
      flow_type: "data_list",
      flow_name: "safe_water_source",
      data_list_name: "safe_water_source",
      _xlsxPath: "data_lists/homepage/module_details.xlsx",
    },
    waste_management: {
      flow_type: "data_list",
      flow_name: "waste_management",
      data_list_name: "waste_management",
      _xlsxPath: "data_lists/homepage/module_details.xlsx",
    },
    water_containers: {
      flow_type: "data_list",
      flow_name: "water_containers",
      data_list_name: "water_containers",
      _xlsxPath: "data_lists/homepage/module_details.xlsx",
    },
    water_treatment: {
      flow_type: "data_list",
      flow_name: "water_treatment",
      data_list_name: "water_treatment",
      _xlsxPath: "data_lists/homepage/module_details.xlsx",
    },
  },
  global: {},
  template: {
    app_menu: {
      flow_type: "template",
      flow_name: "app_menu",
      _xlsxPath: "templates/global/navigation_modular.xlsx",
    },
    debug_nav: {
      flow_type: "template",
      flow_name: "debug_nav",
      flow_subtype: "debug",
      _xlsxPath: "quality_assurance/debug_sheets/debug_nav.xlsx",
    },
    debug_nav_2: {
      flow_type: "template",
      flow_name: "debug_nav_2",
      flow_subtype: "debug",
      _xlsxPath: "quality_assurance/debug_sheets/debug_nav.xlsx",
    },
    help_banner: {
      flow_type: "template",
      flow_name: "help_banner",
      _xlsxPath: "templates/global/navigation_modular.xlsx",
    },
    home_screen: {
      flow_type: "template",
      flow_name: "home_screen",
      _xlsxPath: "templates/global/navigation_modular.xlsx",
    },
    module_card: {
      flow_type: "template",
      flow_name: "module_card",
      _xlsxPath: "templates/global/navigation_modular.xlsx",
    },
    module_overview: {
      flow_type: "template",
      flow_name: "module_overview",
      _xlsxPath: "templates/global/navigation_modular.xlsx",
    },
    module_tool: {
      flow_type: "template",
      flow_name: "module_tool",
      _xlsxPath: "templates/global/navigation_modular.xlsx",
    },
    module_tools: {
      flow_type: "template",
      flow_name: "module_tools",
      _xlsxPath: "templates/global/navigation_modular.xlsx",
    },
    reference_popup: {
      flow_type: "template",
      flow_name: "reference_popup",
      _xlsxPath: "templates/global/navigation_modular.xlsx",
    },
    task_card: {
      flow_type: "template",
      flow_name: "task_card",
      _xlsxPath: "templates/global/navigation_modular.xlsx",
    },
  },
  tour: {},
  data_pipe: {},
};
