/* eslint-disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const campaign_list: FlowTypes.Campaign_list[] = [
  {
    "flow_type": "campaign_list",
    "flow_name": "campaign_list",
    "status": "released",
    "rows": [
      {
        "id": "campaign_morning",
        "time": 0.375,
        "every": "app:day"
      },
      {
        "id": "campaign_main",
        "time": 0.5,
        "every": "day"
      },
      {
        "id": "campaign_evening",
        "time": 0.7916666666666666,
        "every": "app:day"
      },
      {
        "id": "campaign_inactive",
        "time": 0.625,
        "every": "7_non_app:day"
      },
      {
        "id": "campaign_week",
        "every": "7:day"
      },
      {
        "id": "campaign_active_week",
        "every": "7_app:day"
      }
    ],
    "_xlsxPath": "plh_sheets_beta\\ver_7_design\\periodic_content\\reminders.xlsx"
  }
]