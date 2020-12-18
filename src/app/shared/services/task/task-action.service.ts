import { Injectable } from "@angular/core";
import { format } from "date-fns";
import { Subject } from "scripts/node_modules/rxjs";
import { environment } from "src/environments/environment";
import { DbService } from "../db/db.service";

@Injectable({ providedIn: "root" })
export class TaskActionService {
  /**
   * Tasks may be run in parallel (e.g. overall app session with specific task, or pausing one task to complete another)
   * Keep a list of all tasks that have been recorded as active
   */
  activeTasks: { [task_id: string]: ITaskEntry } = {};
  /** Keep track of the most recent task to be started (presumed the active task) */
  activeTaskId: string;
  /** An active stream of actions for subcription */
  action$ = new Subject<ITaskAction & { task_id: string }>();
  constructor(private db: DbService) {
    this._addWindowListeners();
    this.recordTaskAction("app_session", "started");
  }

  /**
   *
   * @param task_id - The identifier of the task to assign the action to
   * If not known can provide a null value and will assume it is whatever task
   * had been started most recently
   * @param actionType - category for logging actions
   * @param meta - Any additional information required for reporting
   */
  async recordTaskAction(
    task_id: string,
    actionType: IActionType,
    actionSubType?: string,
    meta?: any
  ) {
    // fallback to most recent active task if not provided.
    task_id = task_id || this.activeTaskId;
    if (!task_id) {
      console.error("no task specified and no active task");
      return;
    }
    // remove any previous instances of same task
    if (actionType === "started" && this.activeTasks[task_id]) {
      delete this.activeTasks[task_id];
    }
    // ensure there is an active entry tracking the current task
    // assume any newly created task is also now the active task
    if (!this.activeTasks[task_id]) {
      this.activeTasks[task_id] = this.createNewEntry(task_id);
      this.activeTaskId = task_id;
    }
    // record the main entry and update metadata
    const action: ITaskAction = { _created: this._generateTimestamp(), actionType };
    if (meta) {
      action.meta = meta;
    }
    if (actionSubType) {
      action.actionSubType = actionSubType;
    }
    this.activeTasks[task_id].actions.push(action);
    if (actionType === "started" || actionType === "completed") {
      this.activeTasks[task_id]._status = actionType;
    }
    // update database
    const entry = this.activeTasks[task_id];
    await this.db.table("taskActions").put(entry, entry.id);
    this.action$.next({ ...action, task_id });
  }

  /**
   * Record a specific task action across all tasks
   */
  private async recordBulkAction(actionType: IActionType, meta?: any) {
    const promises = Object.keys(this.activeTasks).map(
      async (t) => await this.recordTaskAction(t, actionType, meta)
    );
    await Promise.all(promises);
  }

  private createNewEntry(task_id: string) {
    const timestamp = this._generateTimestamp();
    const entry: ITaskEntry = {
      id: `${task_id}_${timestamp}`,
      task_id,
      actions: [],
      _created: timestamp,
      _appVersion: environment.version,
      _status: null,
    };
    return entry;
  }

  /** generate a string representation of the current datetime in local timezone */
  private _generateTimestamp() {
    return format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");
  }

  /**
   *
   * Note 1 - we will not create these using hostlistners or unload them as it is expected they will
   * persist through the lifecycle of the app
   */
  private _addWindowListeners() {
    window.addEventListener("beforeunload", async (e) => {
      e.preventDefault();
      alert("window will unload");
      await this.recordBulkAction("app_unload");
      e.returnValue = "";
    });
    window.onfocus = async () => {
      console.log("focus");
      // TODO - decide reasonable limit for when to record or not (e.g. >1min)
      await this.recordBulkAction("app_focus");
    };
    window.onblur = async () => {
      console.log("blur");
      await this.recordBulkAction("app_blur");
    };
  }
}

interface ITaskEntry {
  /** Unique id to recognise a task, given by task_id and instance_id combined */
  id: string;
  /** string */
  task_id: string;
  /** Log of all events */
  actions: ITaskAction[];
  /**  */
  _created: string;
  /** Most recent status update for quick reference, pulled from action history */
  _status: ITaskStatus;
  /** Track app version at time of task to be able to generate full task meta if required */
  _appVersion: string;
}
interface ITaskAction {
  /** timestamp */
  _created: string;
  /** specific list of types to help organising database entries */
  actionType: IActionType;
  /** additional sub-type for more general lookups */
  actionSubType?: string;
  /** */
  meta?: any;
}

/** Core set of overall task statuses */
type ITaskStatus = "started" | "completed";
/** A task action can be a task status or other meta statuses */
export type IActionType = ITaskStatus | "flow_action" | "app_unload" | "app_blur" | "app_focus";
