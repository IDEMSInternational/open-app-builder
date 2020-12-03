export default [
  {
    "flow_type": "reminders",
    "flow_name": "reminders_list",
    "status": "released",
    "data": [
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
      },
      {
        "id": "reminder_mod_welcome",
        "open_action": "push_mod_welcome"
      },
      {
        "id": "reminder_mod_1on1",
        "open_action": "push_mod_1on1"
      },
      {
        "id": "reminder_mod_praise",
        "open_action": "push_mod_praise"
      }
    ]
  }
]