import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { IReminder, IReminderData } from "./reminders.model";
import { FlowTypes } from "src/app/shared/model";
import { TaskService } from "src/app/shared/services/task/task.service";

import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { DATA_LIST } from "src/app/shared/services/data/data.service";
import { MOCK_REMINDERS } from "./reminder.mock";

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
  public mockData = MOCK_REMINDERS;
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
    // if (data) {
    //   this.data = { ...this.data, ...data };
    //   await this.processRemindersList();
    // } else {
    //   this.init();
    // }
  }

  public triggerReminderAction(r: FlowTypes.Campaign_listRow) {
    // const { start_action, start_action_args, flow_type, reminder_id } = r;
    // const id = `${reminder_id}_action`;
    // this.taskService.runAction({ flow_type, id, flow_name: start_action_args, start_action });
  }

  private async processRemindersList() {
    // const data = await this.dataEvaluationService.refreshDBCache();
    // this.data = data;
    // // TODO - as reminders mostly deprecated should be merged into other campaigns debug page
    // const reminderRows: FlowTypes.Campaign_listRow[] = [].concat.apply(
    //   [],
    //   DATA_LIST.filter((list) => list.flow_subtype === "campaign_rows").map((list) => list.rows)
    // );
    // // check pending reminders
    // const pendingReminders = this.reminders$.value;
    // // check deactivation
    // const allReminders = [];
    // log("reminder rows", reminderRows);
    // for (const r of reminderRows) {
    //   log_group("[Reminder Process]");
    //   // TODO - should it be all conditions satisfied or just any? Assume all
    //   const activation_condition_list = r.activation_condition_list || [];
    //   r.activation_condition_list = await Promise.all(
    //     activation_condition_list.map(async (condition) => {
    //       const evaluation = await this.dataEvaluationService.evaluateReminderCondition(condition);
    //       return { ...condition, _satisfied: evaluation };
    //     })
    //   );
    //   const deactivation_condition_list = r.deactivation_condition_list || [];
    //   r.deactivation_condition_list = await Promise.all(
    //     deactivation_condition_list.map(async (condition) => {
    //       const evaluation = await this.dataEvaluationService.evaluateReminderCondition(condition);
    //       return { ...condition, _satisfied: evaluation };
    //     })
    //   );
    //   log_groupEnd();
    //   allReminders.push(r);
    // }
    // this.remindersList$.next(allReminders);
    // log("[Reminders List] Process", { data: this.data, pendingReminders, allReminders });
  }
}
