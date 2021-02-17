import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IReminder } from "./reminders.model";
import { DbService } from "src/app/shared/services/db/db.service";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";
import { LocalNotificationSchedule } from "@capacitor/core";
import { REMINDER_LIST } from "src/app/shared/services/data/data.service";
import { generateTimestamp } from "src/app/shared/utils";
import { FlowTypes } from "scripts/types";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import { TaskService } from "src/app/shared/services/task/task.service";

@Injectable({
  providedIn: "root",
})
/**
 * The reminders service originated as a feature module for creating todo-style tasks,
 * but has since evolved to a standalone goals module, and shared reminders service.
 * This service predominantly is designed to facilitate interactions with the local notifications
 * system (and tracking related data stored in the database)
 *
 * It is not currently production-ready (2020-11-15 - Chris)
 */
export class RemindersService {
  public appday = 0;
  public reminders$ = new BehaviorSubject<IReminder[]>([]);
  public remindersList$ = new BehaviorSubject<FlowTypes.Reminder_listRow[]>([]);

  constructor(
    private dbService: DbService,
    private localNotifications: LocalNotificationService,
    private localStorageService: LocalStorageService,
    private taskService: TaskService
  ) {}

  async init() {
    this.setAppDay();
    await this.loadDBReminders();
    await this.processRemindersList();
  }

  public activateReminder() {}

  public triggerReminderAction(r: FlowTypes.Reminder_listRow) {
    console.log("triggering reminder action", r);
    const { start_action, start_action_args, flow_type, reminder_id } = r;
    const id = `${reminder_id}_action`;
    this.taskService.runAction({ flow_type, id, flow_name: start_action_args, start_action });
  }

  public deactivateReminder() {}

  /** Use local storage to track all days the app has been used, and set the total as the current appday */
  private setAppDay() {
    const appdays = this.localStorageService.getJSON("appdays") || {};
    const todaysDate = generateTimestamp().substring(0, 10);
    appdays[todaysDate] = true;
    this.localStorageService.setJSON("appdays", appdays);
    this.appday = Object.keys(appdays).length;
  }

  private async processRemindersList() {
    // check pending reminders
    const pendingReminders = this.reminders$.value;
    console.log("pending reminders", pendingReminders);
    // check deactivation

    const remindersList = REMINDER_LIST[0].rows.map((r) => {
      //
      this.evaluateReminderCondition(r);
      return r;
    });
    this.remindersList$.next(remindersList);
  }
  private evaluateReminderCondition(r: FlowTypes.Reminder_listRow) {
    // console.log("evaluate reminder", r);
  }

  /************************************************************************************
   *  Legacy code - to be re-evaluated (CC 2021-02-16)
   *************************************************************************************/

  private async loadDBReminders() {
    const reminders = await this.dbService.table<IReminder>("reminders").toArray();
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
