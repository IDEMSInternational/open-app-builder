import { Injectable } from "@angular/core";

import { Subject } from "scripts/node_modules/rxjs";
import { environment } from "src/environments/environment";
import { generateTimestamp } from "../../utils";
import { DbService } from "../db/db.service";

@Injectable({ providedIn: "root" })
/**
 * The TaskActionService records information about started and completed tasks as well as the current session more generally
 */
export class TaskActionService {
  /**
   * Tasks may be run in parallel (e.g. overall app session with specific task, or pausing one task to complete another)
   * Keep a list of all tasks that have been recorded as active
   */
  activeTasks: { [task_id: string]: ITaskEntry } = {};
  /** A single session entry will be created each app session for storing other meta tasks */
  activeSession: ITaskEntry;
  /** An active stream of actions for subcription */
  action$ = new Subject<ITaskAction & { task_id: string }>();
  /** Track time when app loses focus to calculate overall inactivity time */
  private appInactiveStartTime = new Date().getTime();
  /** Don't log inactivity periods lower than this number (30000ms = 30s) */
  private readonly INACTIVITY_THRESHOLD = 30000;
  constructor(private db: DbService) {
    this._addWindowListeners();
    this.recordSessionAction({ type: "started" });
  }

  get table() {
    return this.db.table<ITaskEntry>("task_actions");
  }

  /**
   * Record an action directly from within a flow. This will be assigned to an anticipated
   * task that matches the flow_name with the prefix `task_`
   */
  async recordFlowTaskAction(action: IFlowTaskAction) {
    const { flow_name, meta, type } = action;
    const task_id = `task_${flow_name}`;
    this.recordTaskAction({
      task_id,
      type,
      flow_name,
      meta,
    });
  }

  /**
   * This is the main method to record tasks
   * @param table - task and session actions recorded to different tables for ease of porcessing
   */
  public async recordTaskAction(action: ITaskAction) {
    const { task_id, type, meta } = action;
    if (!task_id) {
      console.error("no task specified and no active task");
      return;
    }
    // remove any previous instances of same task
    if (type === "started" && this.activeTasks[task_id]) {
      delete this.activeTasks[task_id];
    }
    // ensure there is an active entry tracking the current task
    if (!this.activeTasks[task_id]) {
      this.activeTasks[task_id] = this.createNewEntry(task_id);
    }
    // update db entry
    const dbEntry = this.activeTasks[task_id];

    switch (type) {
      // if task ended without completion simply track time spent on task
      case "ended":
        dbEntry._duration = this._calculateTaskDuration(dbEntry);
        break;
      // if task completed can mark overall entry as completed and stop tracking
      case "completed":
        dbEntry._completed = true;
        dbEntry._duration = this._calculateTaskDuration(dbEntry);
        delete this.activeTasks[task_id];
        break;
      default:
        // task_id no longer required as tracked in parent
        delete action.task_id;
        const actionEntry: ITaskActionEntry = { _created: generateTimestamp(), ...action };
        if (meta) {
          action.meta = meta;
        }
        this.activeTasks[task_id].actions.push(actionEntry);
    }
    await this.db.table("task_actions").put(dbEntry, dbEntry.id);
    this.action$.next({ ...action, task_id });
  }

  /** Session task actions are all recorded against the same `app_session` task entry */
  async recordSessionAction(action: ISessionTaskAction) {
    if (!this.activeSession) {
      this.activeSession = this.createNewEntry("app_session");
    }
    const dbEntry = this.activeSession;
    if (action.type === "ended") {
      dbEntry._completed = true;
      dbEntry._duration = this._calculateTaskDuration(dbEntry);
    }
    dbEntry.actions.push({ _created: generateTimestamp(), ...action });
    await this.db.table("session_actions").put(dbEntry, dbEntry.id);
  }

  private _calculateTaskDuration(task: ITaskEntry, taskEndTime = new Date().getTime()) {
    const taskStartTime = new Date(task._created).getTime();
    return Math.round((taskEndTime - taskStartTime) / 1000);
  }

  /**
   * Record a specific task action across all tasks
   */
  private async recordBulkAction(type: ITaskActionType, meta?: any) {
    const taskPromises = Object.keys(this.activeTasks).map(
      async (task_id) => await this.recordTaskAction({ task_id, type, meta })
    );
    await Promise.all(taskPromises);
    await this.recordSessionAction({ type, meta });
  }

  private createNewEntry(task_id: string) {
    const timestamp = generateTimestamp();
    const entry: ITaskEntry = {
      id: `${task_id}_${timestamp}`,
      task_id,
      actions: [],
      _created: timestamp,
      _appVersion: environment.version,
      _completed: false,
      _duration: 0,
    };
    return entry;
  }

  /**
   *
   * Note 1 - we will not create these using hostlistners or unload them as it is expected they will
   * persist through the lifecycle of the app
   */
  private _addWindowListeners() {
    window.addEventListener("beforeunload", async (e) => {
      e.preventDefault();
      await this.recordBulkAction("ended");
      e.returnValue = "";
    });
    // when the app blurs start a time for the total duration
    window.onblur = async () => {
      this.appInactiveStartTime = new Date().getTime();
    };
    // when focus is resumed record within all active tasks the duration that app was inactive
    window.onfocus = async () => {
      if (this.appInactiveStartTime) {
        const totalInactiveTime = new Date().getTime() - this.appInactiveStartTime;
        if (totalInactiveTime > this.INACTIVITY_THRESHOLD) {
          await this.recordBulkAction("app_inactive", { totalInactiveTime });
        }
      }
    };
  }
}

export interface ITaskEntry {
  /** Unique id to recognise a task, given by task_id and instance_id combined */
  id: string;
  /** string */
  task_id: string;
  /** Log of all events */
  actions: ITaskActionEntry[];
  /**  */
  _created: string;
  /** Overall completion tracking */
  _completed: boolean;
  /** Track app version at time of task to be able to generate full task meta if required */
  _appVersion: string;
  /** Track time spent on task, rounded to the nearest second */
  _duration: number;
}
/**  */
interface ITaskAction {
  /** string */
  task_id: string;
  /** specific list of types to help organising database entries */
  type: ITaskActionType;
  /** when actions are trigered from a flow use name to help with completion tracking */
  flow_name?: string;
  /** */
  meta?: any;
}

export interface IFlowTaskAction {
  type: IFlowActionType;
  /** ... */
  flow_name: string;
  /** */
  meta?: any;
}

interface ISessionTaskAction {
  type: ITaskActionType;
  /** */
  meta?: any;
}

/** When saving task actions to the database add a timestamp */
type ITaskActionEntry = Omit<ITaskAction, "task_id"> & {
  /** timestamp */
  _created: string;
};

/**
 * Task actions can use started or completed to indicate the start or end of an entry
 * These aren't explicitly written to the database, but tracked in creation and duration metadata.
 */
export type ITaskActionBase = "started" | "completed" | "ended";
/** A task action can be a task status or other meta statuses */
export type ITaskActionType = ITaskActionBase | IMetaActionType | IFlowActionType;
export type IMetaActionType = ITaskActionBase | "app_inactive";
export type IFlowActionType = ITaskActionBase | "variable_set" | "new_message" | "item_clicked";
