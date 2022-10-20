import { FlowTypes } from "data-models";
type ISheetContents = {
  [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeBase };
};
export const SHEETS_CONTENT_LIST: ISheetContents = {
  data_list: {},
  global: {},
  template: {
    app_menu: {
      flow_type: "template",
      flow_name: "app_menu",
      _xlsxPath: "templates/global/navigation.xlsx",
    },
    deworming_screen: {
      flow_type: "template",
      flow_name: "deworming_screen",
      _xlsxPath: "templates/global/navigation.xlsx",
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
    menstrual_hygiene_screen: {
      flow_type: "template",
      flow_name: "menstrual_hygiene_screen",
      _xlsxPath: "templates/global/navigation.xlsx",
    },
    toilet_screen: {
      flow_type: "template",
      flow_name: "toilet_screen",
      _xlsxPath: "templates/global/navigation.xlsx",
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
    water_screen: {
      flow_type: "template",
      flow_name: "water_screen",
      _xlsxPath: "templates/global/navigation.xlsx",
    },
  },
  tour: {},
  data_pipe: {},
};
