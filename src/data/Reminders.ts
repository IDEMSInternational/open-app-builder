export default [
  {
    "Flow_Type": "Reminders",
    "Flow_Name": "RemindersList",
    "data": [
      {
        "id": "reminder_Remind_Emo2",
        "repeats": true,
        "every": "day",
        "on": "hour: 8",
        "open_action": "Remind_Emo2"
      },
      {
        "id": "reminder_Remind_Act2",
        "repeats": true,
        "every": "day",
        "on": "hour:11",
        "open_action": "Remind_Act2"
      },
      {
        "id": "reminder_Welcome",
        "open_action": "Welcome_Reminders"
      },
      {
        "id": "reminder_1on1Module",
        "open_action": "1on1_Reminders"
      },
      {
        "id": "reminder_PraiseModule",
        "open_action": "Praise_Reminders"
      }
    ]
  }
]