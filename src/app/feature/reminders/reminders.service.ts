import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { differenceInHours, subDays, subHours } from "date-fns";
import { IReminder } from "./reminders.model";
import { DbService } from "src/app/shared/services/db/db.service";
import { REMINDER_LIST } from "src/app/shared/services/data/data.service";
import { FlowTypes } from "scripts/types";
import { TaskService } from "src/app/shared/services/task/task.service";
import { AppEventService, IAppEvent } from "src/app/shared/services/app-events/app-events.service";
import { arrayToHashmapArray, generateTimestamp } from "src/app/shared/utils";
import { ITaskAction } from "../goals/models/goals.model";

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
  public data: {
    app_day: number;
    actionHistory: {
      task_action: { [action_id: string]: ITaskAction[] };
      app_event: { [event_id: string]: IAppEvent[] };
      reminder_action: { [reminder_id: string]: IReminder[] };
    };
  };
  public mockData = MOCK_DATA;
  public reminders$ = new BehaviorSubject<IReminder[]>([]);
  public remindersList$ = new BehaviorSubject<FlowTypes.Reminder_listRow[]>([]);

  constructor(
    private taskService: TaskService,
    private dbService: DbService,
    private appEventService: AppEventService
  ) {}

  async init() {
    await this.appEventService.ready();
    await this.loadReminderData();
    this.processRemindersList();
  }

  /** load all the data that will be required for processing reminders */
  private async loadReminderData() {
    const taskActions = await this.dbService.table("task_actions").orderBy("_created").toArray();
    // get event histories
    const task_action = arrayToHashmapArray<ITaskAction>(taskActions, "task_id");
    const appEvents = await this.dbService.table("app_events").orderBy("_created").toArray();
    const app_event = arrayToHashmapArray<IAppEvent>(appEvents, "event_id");
    const app_day = this.appEventService.summary.app_day;
    const reminder = {};
    this.data = { app_day, actionHistory: { task_action, app_event, reminder } };
    console.log("reminders data", this.data);
  }

  /** override local data with testing dataset, or reinitialise from db */
  public async setMockData(data: any) {
    if (data) {
      this.data = { ...this.data, ...data };
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
      // (r as any)._satisfied = r.activation_condition_list.every(
      //   (condition) => condition._satisfied
      // );
      r.deactivation_condition_list = r.deactivation_condition_list.map((condition) => {
        const evaluation = this.evaluateReminderCondition(condition);
        return { ...condition, _satisfied: evaluation };
      });
      return r;
    });
    this.remindersList$.next(remindersList);
    console.log("remindersList", remindersList);
  }

  private evaluateReminderCondition(condition: FlowTypes.Reminder_conditionList): boolean {
    const { action, value, timing, entry } = condition;
    const evaluators: {
      [key in FlowTypes.Reminder_conditionList["action"]]: () => string | number | null;
    } = {
      app_event: () => this.getTargetAppEventValue(value as any, entry),
      field_evaluation: () => undefined,
      reminder_action: () => undefined,
      task_completed: () => this.getTargetTaskCompleteValue(value as any, entry),
    };
    const evaluateValue: string | number = evaluators[action]();
    // used to indicator the evaluator function does not currently exist
    if (evaluateValue === undefined) {
      return undefined;
    }
    // no value for evaluation (e.g. task never completed), so assume condition not satisfied
    if (evaluateValue === null) {
      return false;
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
    const { comparator, quantity, unit } = timing;
    switch (unit) {
      case "day":
        const dayDiff = differenceInHours(new Date(), new Date(evaluateValue)) / 24;
        return this._compare(dayDiff, comparator, quantity);

      case "appday":
        const appDayToday = this.data.app_day;
        const appDayDiff = appDayToday - (evaluateValue as number);
        return this._compare(appDayDiff, comparator, quantity);
    }
  }
  /** Method used to retrieve comparison value (created date) from app events */
  private getTargetAppEventValue(event_id: IAppEvent["event_id"], entry: "first" | "last") {
    switch (event_id) {
      case "app_launch":
        // most recent
        return this.data.appEventHistory.app_launch?.pop()?._created || null;
      default:
        console.error("No app event evaluation specified for:", event_id);
        return undefined;
    }
  }

  /** Method used to retrieve comparison value (timestamp) from task action events */
  private getTargetTaskCompleteValue(task_id: ITaskAction["task_id"], entry: "first" | "last") {
    switch (entry) {
      case "first":
        return this.data.taskActionHistory[task_id]?.[0].timestamp || null;
      case "last":
        return this.data.taskActionHistory[task_id]?.pop()?.timestamp || null;
      default:
        break;
    }
    return undefined;
  }

  /** As comparison functions are generated as string parse the relevant cases and evaluate */
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

  //   private async loadDBReminders() {
  //     const reminders = await this.dbService.table<IReminder>("reminders").toArray();
  //     this.reminders$.next(reminders);
  //   }

  async setReminder(reminder: IReminder) {
    // // reminder form populates an empty placeholder id, which has to be removed
    // // to allow the db to populate
    // if (reminder.id === null) {
    //   delete reminder.id;
    // }
    // reminder = await this.setReminderNotifications(reminder);
    // await this.dbService.table("reminders").put(reminder);
    // this.loadDBReminders();
  }

  //   private async setReminderNotifications(reminder: IReminder) {
  //     // delete old notification
  //     if (reminder.notifications.length > 0) {
  //       this.localNotifications.removeNotifications({
  //         notifications: reminder.notifications,
  //       });
  //       reminder.notifications = [];
  //     }
  //     const schedule: Partial<LocalNotificationSchedule> = {
  //       repeats: reminder.repeat !== "never",
  //       at: new Date(reminder.due),
  //       every: this._mapRepeatIntervalToNotification(reminder),
  //     };
  //     const res = await this.localNotifications.scheduleNotification({
  //       schedule,
  //     });
  //     reminder.notifications = res.notifications;
  //     return reminder;
  //   }

  //   async deleteReminder(reminder: IReminder) {
  //     const { notifications } = reminder;
  //     await this.localNotifications.removeNotifications({ notifications });
  //     await this.dbService.table("reminders").delete(reminder.id);
  //     this.loadDBReminders();
  //   }

  //   /**
  //    * Convert form repeat duration to format recognised by capcitor local notifications api
  //    */
  //   private _mapRepeatIntervalToNotification(
  //     reminder: IReminder
  //   ): LocalNotificationSchedule["every"] {
  //     switch (reminder.repeat) {
  //       case "daily":
  //         return "day";
  //       case "weekly":
  //         return "week";
  //       case "monthly":
  //         return "month";
  //       default:
  //         return null;
  //     }
  //   }
}

const MOCK_DATA: Partial<IReminderData & { label: string }>[] = [
  {
    label: "Demo 1 (first load)",
    app_day: 1,
    appEventHistory: {
      app_launch: [{ _created: generateTimestamp(), event_id: "app_launch" }],
    },
  },
  {
    label: "Demo 2 (day 4)",
    app_day: 4,
    appEventHistory: {
      app_launch: [
        {
          _created: generateTimestamp(subHours(subDays(new Date(), 3), 1)),
          event_id: "app_launch",
        },
      ],
    },
  },
  {
    label: "Demo 3 (day 8)",
    app_day: 8,
    appEventHistory: {
      app_launch: [
        {
          _created: generateTimestamp(subHours(subDays(new Date(), 7), 1)),
          event_id: "app_launch",
        },
      ],
    },
  },
];

interface IReminderData {
  app_day: number;
  taskActionHistory: { [action_id: string]: ITaskAction[] };
  appEventHistory: { [event_id in IAppEvent["event_id"]]?: IAppEvent[] };
  reminderHistory: { [reminder_id: string]: IReminder[] };
}
