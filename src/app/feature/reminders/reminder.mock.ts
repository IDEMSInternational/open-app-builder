import { subDays, subHours } from "date-fns";
import { generateTimestamp } from "src/app/shared/utils";
import { IReminderData } from "./reminders.model";

export const MOCK_REMINDERS: Partial<IReminderData & { label: string }>[] = [
  {
    label: "Demo 1 (first load)",
    app_day: 1,
    dbCache: {
      app_events: {
        app_launch: [{ _created: generateTimestamp(), event_id: "app_launch" }],
      },
      data_events: {},
      reminder_events: {},
      task_actions: {},
    },
  },
  {
    label: "Demo 2 (day 4)",
    app_day: 4,
    dbCache: {
      app_events: {
        app_launch: [
          {
            _created: generateTimestamp(subHours(subDays(new Date(), 3), 1)),
            event_id: "app_launch",
          },
        ],
      },
      data_events: {
        w_self_care_started: [
          {
            _created: generateTimestamp(subHours(subDays(new Date(), 3), 1)),
            name: "w_self_care_started",
            value: true,
          },
        ],
      },
      reminder_events: {},
      task_actions: {},
    },
  },
  {
    label: "Demo 3 (day 8)",
    app_day: 8,
    dbCache: {
      app_events: {
        app_launch: [
          {
            _created: generateTimestamp(subHours(subDays(new Date(), 7), 1)),
            event_id: "app_launch",
          },
        ],
      },
      data_events: {},
      reminder_events: {},
      task_actions: {},
    },
  },
];
