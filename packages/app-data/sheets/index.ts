import { FlowTypes } from "data-models";
type ISheetContents = {
  [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeBase };
};
export const SHEETS_CONTENT_LIST: ISheetContents = {
  data_list: {
    all_weeks: {
      flow_type: "data_list",
      flow_name: "all_weeks",
      data_list_name: "all_weeks",
      _xlsxPath: "data_lists/sharing_stories.xlsx",
    },
    baib_components: {
      flow_type: "data_list",
      flow_name: "baib_components",
      _xlsxPath: "data_lists/baib_components.xlsx",
    },
    content_blocks: {
      flow_type: "data_list",
      flow_name: "content_blocks",
      data_list_name: "content_blocks",
      _xlsxPath: "data_lists/sharing_stories.xlsx",
    },
    crawling: {
      flow_type: "data_list",
      flow_name: "crawling",
      _xlsxPath: "data_lists/baib_components.xlsx",
    },
    cuddliness: {
      flow_type: "data_list",
      flow_name: "cuddliness",
      _xlsxPath: "data_lists/baib_components.xlsx",
    },
    defensive_movements: {
      flow_type: "data_list",
      flow_name: "defensive_movements",
      _xlsxPath: "data_lists/baib_components.xlsx",
    },
    imitation_and_responsiveness: {
      flow_type: "data_list",
      flow_name: "imitation_and_responsiveness",
      _xlsxPath: "data_lists/baib_components.xlsx",
    },
    initial_observation: {
      flow_type: "data_list",
      flow_name: "initial_observation",
      _xlsxPath: "data_lists/baib_components.xlsx",
    },
    numbers: {
      flow_type: "data_list",
      flow_name: "numbers",
      data_list_name: "numbers",
      _xlsxPath: "data_lists/sharing_stories.xlsx",
    },
    rooting_and_sucking: {
      flow_type: "data_list",
      flow_name: "rooting_and_sucking",
      _xlsxPath: "data_lists/baib_components.xlsx",
    },
    shut_out_stimulation: {
      flow_type: "data_list",
      flow_name: "shut_out_stimulation",
      _xlsxPath: "data_lists/baib_components.xlsx",
    },
    social_interaction_package: {
      flow_type: "data_list",
      flow_name: "social_interaction_package",
      _xlsxPath: "data_lists/baib_components.xlsx",
    },
    stories: {
      flow_type: "data_list",
      flow_name: "stories",
      _xlsxPath: "data_lists/stories.xlsx",
    },
    undressing_and_placing_supine: {
      flow_type: "data_list",
      flow_name: "undressing_and_placing_supine",
      _xlsxPath: "data_lists/baib_components.xlsx",
    },
    "ventral_suspension ": {
      flow_type: "data_list",
      flow_name: "ventral_suspension ",
      _xlsxPath: "data_lists/baib_components.xlsx",
    },
    week_1: {
      flow_type: "data_list",
      flow_name: "week_1",
      data_list_name: "week_1",
      _xlsxPath: "data_lists/sharing_stories.xlsx",
    },
    week_2: {
      flow_type: "data_list",
      flow_name: "week_2",
      data_list_name: "week_2",
      _xlsxPath: "data_lists/sharing_stories.xlsx",
    },
  },
  global: {
    navigation_globals: {
      flow_type: "global",
      flow_name: "navigation_globals",
      _xlsxPath: "templates/navigation.xlsx",
    },
  },
  template: {
    app_menu: {
      flow_type: "template",
      flow_name: "app_menu",
      _xlsxPath: "templates/navigation.xlsx",
    },
    home_screen: {
      flow_type: "template",
      flow_name: "home_screen",
      _xlsxPath: "templates/navigation.xlsx",
    },
    sharing_stories_block: {
      flow_type: "template",
      flow_name: "sharing_stories_block",
      _xlsxPath: "templates/navigation.xlsx",
    },
    sharing_stories_day: {
      flow_type: "template",
      flow_name: "sharing_stories_day",
      _xlsxPath: "templates/navigation.xlsx",
    },
    sharing_stories_week: {
      flow_type: "template",
      flow_name: "sharing_stories_week",
      _xlsxPath: "templates/navigation.xlsx",
    },
    sharing_stories_weeks: {
      flow_type: "template",
      flow_name: "sharing_stories_weeks",
      _xlsxPath: "templates/navigation.xlsx",
    },
  },
  tour: {},
  data_pipe: {},
};
