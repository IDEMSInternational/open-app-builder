import { FlowTypes } from "data-models";
type ISheetContents = {
  [flow_type in FlowTypes.FlowType]: { [flow_name: string]: FlowTypes.FlowTypeBase };
};
export const SHEETS_CONTENT_LIST: ISheetContents = {
  data_list: {
    items_datalist: {
      flow_type: "data_list",
      flow_subtype: "debug",
      flow_name: "items_datalist",
      data_list_name: "example_items",
      _xlsxPath: "example_items.xlsx",
    },
  },
  global: {},
  template: {
    items_template: {
      flow_type: "template",
      flow_subtype: "debug",
      flow_name: "items_template",
      _xlsxPath: "example_items.xlsx",
    },
  },
  tour: {},
  data_pipe: {},
};
