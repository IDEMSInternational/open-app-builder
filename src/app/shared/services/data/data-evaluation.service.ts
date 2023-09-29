import { Injectable, Injector } from "@angular/core";
import { differenceInHours } from "date-fns";
import { IDBTable } from "data-models";
import { FlowTypes } from "src/app/shared/model";
import { TemplateFieldService } from "../../components/template/services/template-field.service";
import { TemplateVariablesService } from "../../components/template/services/template-variables.service";
import { arrayToHashmapArray, parseBoolean } from "../../utils";
import { AppEventService } from "../app-events/app-events.service";
import { AsyncServiceBase } from "../asyncService.base";
import { DbService } from "../db/db.service";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
let SHOW_DEBUG_LOGS = false;
let log = SHOW_DEBUG_LOGS ? console.log : () => null;
let log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
let log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

@Injectable({ providedIn: "root" })
/**
 * System used mostly to evaluate campaign feature conditions.
 * These are defined in a different syntax to template conditions, evaluating asynchronously
 * with access to local indexeddb (not just localstorage fields, globals etc)
 *
 * TODO - Ideally should be combined with template evaluation syntax, or moved to campaign service
 * with limited common functionality extracted to shared service
 */
export class DataEvaluationService extends AsyncServiceBase {
  public data: IDataEvaluationCache;
  constructor(
    private dbService: DbService,
    private appEventService: AppEventService,
    private injector: Injector
  ) {
    super("Data Evaluation");
    this.registerInitFunction(this.initialise);
  }
  /**
   * Provide access to templateVariablesService within cyclic dependency
   * NOTE - extra care should be taken when using methods from this service due to cyclic nature
   * (e.g. ensure services ready only as called upon)
   * */
  get templateVariablesService(): TemplateVariablesService {
    return this.injector.get(TemplateVariablesService);
  }
  get templateFieldService(): TemplateFieldService {
    return this.injector.get(TemplateFieldService);
  }

  private async initialise() {
    await this.ensureAsyncServicesReady([this.dbService, this.appEventService]);
    await this.refreshDBCache();
  }

  private async ensurePublicTemplateServicesReady() {
    await this.ensureAsyncServicesReady([this.templateFieldService, this.templateVariablesService]);
  }

  /**
   * load all the data that will be required for processing conditions
   * TODO - CC 2021-05-16 - should re-evaluate whether this is still required or could be passed to
   * db service itself
   * */
  public async refreshDBCache() {
    const taskActions = await this.dbService.table("task_actions").orderBy("_created").toArray();
    // get event histories
    const task_actions = arrayToHashmapArray(taskActions, "task_id");
    const appEvents = await this.dbService.table("app_events").orderBy("_created").toArray();
    const app_events = arrayToHashmapArray(appEvents, "event_id");
    const dataEvents = await this.dbService.table("data_events").orderBy("_created").toArray();
    const data_events = arrayToHashmapArray(dataEvents, "name");
    const { app_day, first_app_launch } = this.appEventService.summary;
    // TODO - add db bindings for reminder_events
    const reminder_events = {};
    this.setDBCache({
      app_day,
      first_app_launch,
      dbCache: { task_actions, app_events, reminder_events, data_events },
    });
    log("[Data Evaluation] cache updated", this.data);
    return this.data;
  }

  /**
   * Expose public method for setting cached data so that debug services can overwrite
   * default values read from DB
   */
  public setDBCache(data: IDataEvaluationCache) {
    this.data = data;
  }

  /**
   *
   *
   * TODO - ideally these should be merged with template condition evaluation
   */
  public async evaluateReminderCondition(
    condition: FlowTypes.DataEvaluationCondition
  ): Promise<boolean> {
    await this.ensurePublicTemplateServicesReady();
    if (!this.data) {
      // TODO - determine if using a cache-first approach is better or just to make the queries live
      await this.refreshDBCache();
    }
    const { condition_type, condition_args, _raw } = condition;
    const evaluators: {
      [key in FlowTypes.DataEvaluationCondition["condition_type"]]: () => Promise<
        boolean | undefined
      >;
    } = {
      db_lookup: () => this.processDBLookupCondition(condition),
      field_evaluation: () => this.processFieldEvaluationCondition(condition_args.field_evaluation),
      calc: async () => {
        await this.templateVariablesService.ready();
        const parsed = await this.templateVariablesService.evaluateConditionString(_raw);
        return parseBoolean(parsed);
      },
    };
    const evaluation = await evaluators[condition_type]();
    log_group("[Data Evaluation]", condition._raw);
    log(condition);
    log({ evaluation });
    log_groupEnd();
    return evaluation;
  }

  private async processDBLookupCondition(condition: FlowTypes.DataEvaluationCondition) {
    const { db_lookup } = condition.condition_args;
    const { table_id, where, evaluate, order } = db_lookup;

    let ref = this.dbService.table(table_id as any).where(where);
    if (order === "desc") {
      ref = ref.reverse();
    }
    // assume only want first result (could be modified with limit statement or similar)
    // TODO - add query caching
    let queryResult = await ref.first();
    // default - assumes query satisified if results exist
    let satisfied = queryResult ? true : false;
    // evaluate condition if specified
    if (evaluate) {
      // TODO - Assumes all evaluations are based on creation date, possible future syntax to allow more options
      const evaulateValue = queryResult?._created;
      satisfied = this.evaluateDBLookupCondition(evaulateValue, evaluate);
    }
    // NOTE - due to async functions this won't log nicely in group
    log("process db condition", { queryResult, evaluate, where, table_id, satisfied, condition });
    return satisfied;
  }

  private evaluateDBLookupCondition(
    evaluateValue: string | number,
    evaluate: FlowTypes.DataEvaluationCondition["condition_args"]["db_lookup"]["evaluate"]
  ) {
    const { operator, value, unit } = evaluate;
    let result = false;
    switch (unit) {
      case "day":
        const currentDate = new Date();
        const compareDate = new Date(evaluateValue);
        const dayDiff = differenceInHours(currentDate, compareDate) / 24;
        result = this._compare(dayDiff, operator, value);
        log("db evaluate", { evaluate, dayDiff, evaluateValue, result });
        break;
      case "app_day":
        const appDayToday = this.data.app_day;
        const appDayDiff = appDayToday - (evaluateValue as number);
        result = this._compare(appDayDiff, operator, value);
        log("db evaluate", { evaluate, appDayDiff, evaluateValue, result });
        break;
      default:
        console.error("No evaluation function for unit:", unit);
    }
    return result;
  }

  /**
   * Simple check that a field exists and is truthy
   */
  private async processFieldEvaluationCondition(
    args: FlowTypes.DataEvaluationCondition["condition_args"]["field_evaluation"]
  ) {
    log("field evaluate", args.field);
    // TODO - ideally this should be a shared method, not related to template service
    const fieldValue = this.templateFieldService.getField(args.field);
    return fieldValue === args.value;
  }

  /** As comparison functions are generated as string parse the relevant cases and evaluate */
  private _compare(
    a: string | number | boolean,
    operator: FlowTypes.DataEvaluationCondition["condition_args"]["db_lookup"]["evaluate"]["operator"],
    b: string | number | boolean
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
}

export interface IDataEvaluationCache {
  app_day: number;
  first_app_launch: string;
  /** As database lookups are async and inefficient, store key results in memory (keyed by target field) */
  dbCache: { [table_id in IDBTable]?: { [filter_id: string]: any[] } };
  // taskdbCache: { [action_id: string]: ITaskAction[] };
  // appEventHistory: { [event_id in IAppEvent["event_id"]]?: IAppEvent[] };
  // reminderHistory: { [reminder_id: string]: IReminder[] };
}
