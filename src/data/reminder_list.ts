/* tslint:disable */
  import { FlowTypes } from "src/app/shared/model/flowTypes";
  export const reminder_list: FlowTypes.Reminder_list[] = [
  {
    "flow_type": "reminder_list",
    "flow_name": "reminder_list",
    "status": "released",
    "rows": [
      {
        "id": "reminder_remind_emo_2",
        "repeats": true,
        "every": "day",
        "on": "hour: 8",
        "open_action": "remind_emo_2"
      },
      {
        "id": "reminder_remind_act_2",
        "repeats": true,
        "every": "day",
        "on": "hour:11",
        "open_action": "remind_act_2"
      }
    ]
  }
]