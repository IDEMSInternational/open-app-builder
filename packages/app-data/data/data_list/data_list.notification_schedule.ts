/* eslint-disable */
import { FlowTypes } from "data-models";
const data_list: FlowTypes.Data_list[] = [
  {
    flow_type: "data_list",
    flow_subtype: "notification_schedule",
    flow_name: "notification_schedule",
    status: "released",
    rows: [
      {
        id: "inactive_day",
        time: {
          hour: 19,
          minute: 30,
        },
        delay: {
          days: 0,
        },
      },
      {
        id: "inactive_week",
        time: {
          hour: 19,
          minute: 30,
        },
        delay: {
          days: 7,
        },
      },
      {
        id: "inactive_month",
        time: {
          hour: 19,
          minute: 30,
        },
        delay: {
          days: 30,
        },
      },
    ],
    _xlsxPath: "plh_sheets_beta/plh_templating/campaigns/inactive_campaigns.xlsx",
  },
];
export default data_list;
