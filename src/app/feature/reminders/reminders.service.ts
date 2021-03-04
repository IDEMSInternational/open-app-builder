import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { differenceInHours, subDays, subHours } from "date-fns";
import { IReminder } from "./reminders.model";
import { DbService, IDBTable } from "src/app/shared/services/db/db.service";
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
  public data: IReminderData;
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
    const task_actions = arrayToHashmapArray<ITaskAction>(taskActions, "task_id");
    const appEvents = await this.dbService.table("app_events").orderBy("_created").toArray();
    const app_events = arrayToHashmapArray<IAppEvent>(appEvents, "event_id");
    const app_day = this.appEventService.summary.app_day;
    // TODO - add db bindings for reminder_events
    const reminder_events = {};
    this.data = { app_day, dbCache: { task_actions, app_events, reminder_events } };
    // console.log("reminders data", this.data);
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
    // console.log("pending reminders", pendingReminders);
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
    // console.log("remindersList", remindersList);
  }

  private evaluateReminderCondition(condition: FlowTypes.Reminder_conditionList): boolean {
    const { condition_type, condition_args } = condition;
    const evaluators: {
      [key in FlowTypes.Reminder_conditionList["condition_type"]]: () => boolean | undefined;
    } = {
      db_lookup: () => this.processDBLookupCondition(condition),
      field_evaluation: () => this.processFieldEvaluationCondition(condition_args.field_evaluation),
    };
    return evaluators[condition_type]();
  }

  private processDBLookupCondition(condition: FlowTypes.Reminder_conditionList) {
    const { table_id, filter, evaluate, order } = condition.condition_args.db_lookup;
    if (!this.data.dbCache.hasOwnProperty(table_id)) {
      console.error(
        `[${table_id}] has not been included in reminders.service lookup condition`,
        condition
      );
      return undefined;
    }
    // the action history is already organised by filter field (e.g. event_id, task_id etc.), so select child collection (if entries exist)
    if (!this.data.dbCache[table_id][filter.value]) {
      return false;
    }
    let results = this.data.dbCache[table_id][filter.value];
    // TODO - assumes standard sort order fine, - may need in future (e.g. by _created)
    // TODO - assumes no filtering required (e.g. _completed) - may need in future
    if (order === "asc") {
      results = results.reverse();
    }
    if (evaluate) {
      // TODO - Assumes all evaluations are based on creation date, possible future syntax to allow more options
      const evaulateValue = results[0]?._created;
      return this.evaluateDBLookupCondition(evaulateValue, evaluate);
    }
    // default - return if entries exist
    return true;
  }

  private evaluateDBLookupCondition(
    evaluateValue: string | number,
    evaluate: FlowTypes.Reminder_conditionList["condition_args"]["db_lookup"]["evaluate"]
  ) {
    const { operator, value, unit } = evaluate;
    switch (unit) {
      case "day":
        const dayDiff = differenceInHours(new Date(), new Date(evaluateValue)) / 24;
        return this._compare(dayDiff, operator, value);

      case "app_day":
        const appDayToday = this.data.app_day;
        const appDayDiff = appDayToday - (evaluateValue as number);
        return this._compare(appDayDiff, operator, value);
    }
  }

  processFieldEvaluationCondition(
    args: FlowTypes.Reminder_conditionList["condition_args"]["field_evaluation"]
  ) {
    console.error("Field evaluation not currently implemented");
    return undefined;
  }

  /** As comparison functions are generated as string parse the relevant cases and evaluate */
  private _compare(
    a: string | number,
    operator: FlowTypes.Reminder_conditionList["condition_args"]["db_lookup"]["evaluate"]["operator"],
    b: string | number
  ) {
    switch (operator) {
      case ">":
        return a > b;
      case "<=":
        return a <= b;
      default:
        console.error("operator not included:", operator);
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
    dbCache: {
      app_events: {
        app_launch: [{ _created: generateTimestamp(), event_id: "app_launch" }],
      },
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
      task_actions: {},
    },
  },
];

interface IReminderData {
  app_day: number;
  /** As database lookups are async and inefficient, store key results in memory (keyed by target field) */
  dbCache: { [table_id in IDBTable]?: { [filter_id: string]: any[] } };
  // taskdbCache: { [action_id: string]: ITaskAction[] };
  // appEventHistory: { [event_id in IAppEvent["event_id"]]?: IAppEvent[] };
  // reminderHistory: { [reminder_id: string]: IReminder[] };
}
