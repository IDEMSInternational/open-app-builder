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
      _xlsxPath: "navigation.xlsx",
    },
    home_screen: {
      flow_type: "template",
      flow_name: "home_screen",
      _xlsxPath: "navigation.xlsx",
    },
  },
  tour: {},
  data_pipe: {},
};
