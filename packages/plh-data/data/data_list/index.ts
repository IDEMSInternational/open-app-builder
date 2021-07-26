import { FlowTypes } from "../../model/flowTypes";
import data_list_campaign_rows from "./data_list.campaign_rows";
import data_list_campaign_rows_debug from "./data_list.campaign_rows_debug";
import data_list_debug from "./data_list.debug";
import data_list_3 from "./data_list";
export const data_list: FlowTypes.Data_list[] = [].concat(
  data_list_campaign_rows,
  data_list_campaign_rows_debug,
  data_list_debug,
  data_list_3
);
