import { IReminder, REMINDER_TYPES } from "./reminders.model";
import * as Utils from "src/app/shared/utils";

/**
 * Generate a dynamic set of mock data to use while testing reminders
 * This is more useful than static data when testing different time periods
 */
export const REMINDERS_MOCK = (items: number) => {
  return new Array(items).fill(0).map((_, i) => {
    const reminder: IReminder = {
      id: i,
      _created: new Date().toISOString(),
      _modified: new Date().toISOString(),
      due: Utils.randomDate().toISOString(),
      type: Utils.randomElement(Object.keys(REMINDER_TYPES)),
      complete: Utils.randomBool(),
      data: {},
      notify: Utils.randomBool(),
      repeats: null,
      notifications: [],
    };
    // add metadata where required
    if (reminder.type === "custom") {
      reminder.data.customLabel = "Custom Label Example";
    }
    return reminder;
  });
};
