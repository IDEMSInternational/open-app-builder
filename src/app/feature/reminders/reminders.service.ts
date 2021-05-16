import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { subDays, subHours } from "date-fns";
import { IReminder } from "./reminders.model";
import { IDBTable } from "src/app/shared/services/db/db.service";
import { FlowTypes } from "scripts/types";
import { TaskService } from "src/app/shared/services/task/task.service";
import { generateTimestamp } from "src/app/shared/utils";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
let SHOW_DEBUG_LOGS = true;
let log = SHOW_DEBUG_LOGS ? console.log : () => null;
let log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
let log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

@Injectable({
  providedIn: "root",
})
/**
 * The reminders service originated as a feature module for creating todo-style tasks,
 * but has since evolved to a standalone goals module, and shared reminders service.
 * This service predominantly is designed to facilitate interactions with the local notifications
 * system (and tracking related data stored in the database)
 *
 * TODO - 2021-05-14
 * Ideally most logic could be merged into a common data_list
 */
export class RemindersService {
  public data: IReminderData;
  public mockData = MOCK_DATA;
  public reminders$ = new BehaviorSubject<IReminder[]>([]);
  public remindersList$ = new BehaviorSubject<FlowTypes.Campaign_listRow[]>([]);
  public remindersByCampaign$ = new BehaviorSubject<{
    [campaign_id: string]: FlowTypes.Campaign_listRow[];
  }>({});

  constructor(
    private taskService: TaskService,
    private dataEvaluationService: DataEvaluationService
  ) {}

  async init() {
    await this.processRemindersList();
  }

  /** override local data with testing dataset, or reinitialise from db */
  public async setMockData(data: any) {
    if (data) {
      this.data = { ...this.data, ...data };
      await this.processRemindersList();
    } else {
      this.init();
    }
  }

  public triggerReminderAction(r: FlowTypes.Campaign_listRow) {
    const { start_action, start_action_args, flow_type, reminder_id } = r;
    const id = `${reminder_id}_action`;
    this.taskService.runAction({ flow_type, id, flow_name: start_action_args, start_action });
  }

  private async processRemindersList() {
    await this.dataEvaluationService.refreshDBCache();
    // TODO - import campaigns
    const REMINDER_LIST = [];
    // check pending reminders
    const pendingReminders = this.reminders$.value;

    // check deactivation
    const allReminders = [];
    for (const list of REMINDER_LIST) {
      for (const r of list.rows) {
        log_group("[Reminder Process]", r.start_action, r.start_action_args);
        // TODO - should it be all conditions satisfied or just any? Assume all
        r.activation_condition_list = await Promise.all(
          r.activation_condition_list.map(async (condition) => {
            const evaluation = await this.dataEvaluationService.evaluateReminderCondition(
              condition
            );
            return { ...condition, _satisfied: evaluation };
          })
        );
        // (r as any)._satisfied = r.activation_condition_list.every(
        //   (condition) => condition._satisfied
        // );
        r.deactivation_condition_list = await Promise.all(
          r.deactivation_condition_list.map(async (condition) => {
            const evaluation = await this.dataEvaluationService.evaluateReminderCondition(
              condition
            );
            return { ...condition, _satisfied: evaluation };
          })
        );
        log_groupEnd();
        allReminders.push(r);
      }
    }
    this.remindersList$.next(allReminders);
    log("[Reminders List] Process", { data: this.data, pendingReminders, allReminders });
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

interface IReminderData {
  app_day: number;
  /** As database lookups are async and inefficient, store key results in memory (keyed by target field) */
  dbCache: { [table_id in IDBTable]?: { [filter_id: string]: any[] } };
  // taskdbCache: { [action_id: string]: ITaskAction[] };
  // appEventHistory: { [event_id in IAppEvent["event_id"]]?: IAppEvent[] };
  // reminderHistory: { [reminder_id: string]: IReminder[] };
}
