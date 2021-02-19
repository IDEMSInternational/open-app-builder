import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { differenceInHours, subDays, subHours } from "date-fns";
import { IReminder } from "./reminders.model";
import { DbService } from "src/app/shared/services/db/db.service";
import { LocalNotificationService } from "src/app/shared/services/notification/local-notification.service";
import { LocalNotificationSchedule } from "@capacitor/core";
import { REMINDER_LIST } from "src/app/shared/services/data/data.service";
import { FlowTypes } from "scripts/types";
import { TaskService } from "src/app/shared/services/task/task.service";
import { AppEventService, IAppEvent } from "src/app/shared/services/app-events/app-events.service";
import { generateTimestamp } from "src/app/shared/utils";

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
  public app_day: number;
  public first_app_launch: string;
  public mockData = MOCK_DATA;

  public reminders$ = new BehaviorSubject<IReminder[]>([]);
  public remindersList$ = new BehaviorSubject<FlowTypes.Reminder_listRow[]>([]);

  constructor(
    private dbService: DbService,
    private localNotifications: LocalNotificationService,
    private taskService: TaskService,
    private appEventService: AppEventService
  ) {}

  async init() {
    // await this.loadDBReminders();
    await this.appEventService.ready();
    this.app_day = this.appEventService.summary.app_day;
    this.first_app_launch = this.appEventService.summary.first_app_launch;
    this.processRemindersList();
  }

  public async setMockData(data: any) {
    if (data) {
      const { app_day, first_app_launch } = data;
      this.app_day = app_day;
      this.first_app_launch = first_app_launch;
      this.processRemindersList();
    } else {
      this.init();
    }
  }

  public triggerReminderAction(r: FlowTypes.Reminder_listRow) {
    const { start_action, start_action_args, flow_type, reminder_id } = r;
    const id = `${reminder_id}_action`;
    this.taskService.runAction({ flow_type, id, flow_name: start_action_args, start_action });
  }

  private processRemindersList() {
    // check pending reminders
    const pendingReminders = this.reminders$.value;
    console.log("pending reminders", pendingReminders);
    // check deactivation

    const remindersList = REMINDER_LIST[0].rows.map((r) => {
      // TODO - should it be all conditions satisfied or just any? Assume all
      r.activation_condition_list = r.activation_condition_list.map((condition) => {
        const evaluation = this.evaluateReminderCondition(condition);
        return { ...condition, _satisfied: evaluation };
      });
      (r as any)._satisfied = r.activation_condition_list.every(
        (condition) => condition._satisfied
      );
      return r;
    });
    this.remindersList$.next(remindersList);
    console.log("remindersList", remindersList);
  }

  private evaluateReminderCondition(condition: FlowTypes.Reminder_conditionList): boolean {
    const { action, value, timing } = condition;
    const evaluators: {
      [key in FlowTypes.Reminder_conditionList["action"]]: () => string | number;
    } = {
      app_event: () => this.getTargetAppEventValue(value as any),
      field_evaluation: () => undefined,
      reminder_action: () => undefined,
      task_completed: () => this.getTaskCompleteValue(value as any),
      task_first_completed: () => this.getTaskCompleteValue(value as any),
      task_last_completed: () => this.getTaskCompleteValue(value as any),
    };
    const evaluateValue: string | number = evaluators[action]();
    if (evaluateValue === undefined) {
      // not yet implemented
      return undefined;
    }

    if (timing && evaluateValue) {
      const evaluation = this.evaluateTimingCondition(evaluateValue, timing);
      return evaluation;
    } else {
      return evaluateValue !== undefined;
    }

    // console.log("evaluate reminder", r);
  }

  private evaluateTimingCondition(
    evaluateValue: string | number,
    timing: FlowTypes.Reminder_conditionList["timing"]
  ) {
    console.log("evaluating", evaluateValue, timing);
    const { comparator, quantity, unit } = timing;
    switch (unit) {
      case "day":
        const dayDiff = differenceInHours(new Date(), new Date(evaluateValue)) / 24;
        console.log(evaluateValue, dayDiff);
        return this._compare(dayDiff, comparator, quantity);

      case "appday":
        const appDayToday = this.app_day;
        const appDayDiff = appDayToday - (evaluateValue as number);
        return this._compare(appDayDiff, comparator, quantity);
    }
  }

  private getTargetAppEventValue(id: IAppEvent["event_id"]) {
    switch (id) {
      case "first_app_launch":
        return this.first_app_launch;
      case "app_launch":
        // most recent
        return this.appEventService.appEventsById.app_launch.pop()?._created || null;
      default:
        console.error("No app event evaluation specified for:", id);
        break;
    }
  }

  private getTaskCompleteValue(id, instance: "first" | "last" = "last") {
    // TODO
    return undefined;
  }

  private _compare(
    a: string | number,
    comparator: FlowTypes.Reminder_conditionList["timing"]["comparator"],
    b: string | number
  ) {
    switch (comparator) {
      case ">":
        return a > b;
      case "<=":
        return a <= b;
      default:
        console.error("comparator not included:", comparator);
        break;
    }
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

const MOCK_DATA = [
  {
    label: "First Load",
    app_day: 1,
    first_app_launch: generateTimestamp(),
  },
  {
    label: "Day 4",
    app_day: 4,
    first_app_launch: generateTimestamp(subHours(subDays(new Date(), 3), 1)),
  },
  {
    label: "Day 8",
    app_day: 8,
    first_app_launch: generateTimestamp(subHours(subDays(new Date(), 7), 1)),
  },
];
