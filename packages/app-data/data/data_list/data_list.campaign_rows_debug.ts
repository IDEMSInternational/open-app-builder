/* eslint-disable */
import { FlowTypes } from "data-models";
const data_list: FlowTypes.Data_list[] = [
  {
    flow_type: "data_list",
    flow_subtype: "campaign_rows_debug",
    flow_name: "debug_campaign_rows",
    status: "released",
    comments: "This contains content for schedules",
    rows: [
      {
        id: "debug_notification_1",
        priority: 4,
        campaign_list: ["debug_campaign", "debug_daily"],
        text: "Text 1",
        title: "Debug Notification 1",
      },
      {
        id: "debug_notification_2",
        priority: 3,
        campaign_list: ["debug_campaign", "debug_daily"],
        text: "Text 2",
        title: "Debug Notification 2",
      },
      {
        id: "debug_notification_3",
        priority: 2,
        campaign_list: ["debug_campaign", "debug_daily"],
        text: "Text 3",
        title: "Debug Notification 3",
      },
      {
        id: "debug_notification_4a",
        priority: 1,
        campaign_list: ["debug_campaign", "debug_daily"],
        text: "Text 4",
        title: "Debug Notification 4a",
      },
      {
        id: "debug_notification_4b",
        priority: 1,
        campaign_list: ["debug_campaign", "debug_daily"],
        text: "Text 4",
        title: "Debug Notification 4b",
      },
      {
        id: "debug_notification_4c",
        priority: 1,
        campaign_list: ["debug_campaign", "debug_daily"],
        text: "Text 4",
        title: "Debug Notification 4c",
      },
      {
        id: "debug_notification_fixed_saturday",
        campaign_list: ["debug_fixed_saturday"],
        text: "We hope you are having a nice weekend",
        title: "Debug Fixed Saturday",
      },
      {
        id: "debug_notification_fixed_december",
        campaign_list: ["debug_fixed_december"],
        text: "December daily greetings from PLH",
        title: "Debug Fixed December",
      },
      {
        id: "debug_notification_fixed_new_years_day",
        campaign_list: ["debug_fixed_new_years_day"],
        text: "Happy new year from PLH",
        title: "Debug Fixed New Years Day",
      },
    ],
    _xlsxPath:
      "plh_sheets_beta/plh_templating/quality_assurance/debug_templates/debug_campaigns.xlsx",
  },
];
export default data_list;
