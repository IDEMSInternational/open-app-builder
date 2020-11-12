import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IReminder } from "../models/reminders.model";
import { DbService } from "src/app/shared/services/db/db.service";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";
import { LocalNotificationSchedule } from "@capacitor/core";

@Injectable({
  providedIn: "root",
})
export class RemindersService {
  public reminders$ = new BehaviorSubject<IReminder[]>([]);

  constructor(
    private dbService: DbService,
    private localNotifications: LocalNotificationService
  ) {
    this.loadDBReminders();
  }
  private async loadDBReminders() {
    const reminders = await this.dbService
      .table<IReminder>("reminders")
      .toArray();
    this.reminders$.next(reminders);
  }

  async setReminder(reminder: IReminder) {
    // reminder form populates an empty placeholder id, which has to be removed
    // to allow the db to populate
    if (reminder.id === null) {
      delete reminder.id;
    }
    reminder = await this.setReminderNotifications(reminder);
    await this.dbService.table("reminders").put(reminder);
    this.loadDBReminders();
  }

  private async setReminderNotifications(reminder: IReminder) {
    // delete old notification
    if (reminder.notifications.length > 0) {
      this.localNotifications.removeNotifications({
        notifications: reminder.notifications,
      });
      reminder.notifications = [];
    }
    const schedule: Partial<LocalNotificationSchedule> = {
      repeats: reminder.repeat !== "never",
      at: new Date(reminder.due),
      every: this._mapRepeatIntervalToNotification(reminder),
    };
    const res = await this.localNotifications.scheduleNotification({
      schedule,
    });
    reminder.notifications = res.notifications;
    return reminder;
  }

  async deleteReminder(reminder: IReminder) {
    const { notifications } = reminder;
    await this.localNotifications.removeNotifications({ notifications });
    await this.dbService.table("reminders").delete(reminder.id);
    this.loadDBReminders();
  }

  /**
   * Convert form repeat duration to format recognised by capcitor local notifications api
   */
  private _mapRepeatIntervalToNotification(
    reminder: IReminder
  ): LocalNotificationSchedule["every"] {
    switch (reminder.repeat) {
      case "daily":
        return "day";
      case "weekly":
        return "week";
      case "monthly":
        return "month";
      default:
        return null;
    }
  }
}
