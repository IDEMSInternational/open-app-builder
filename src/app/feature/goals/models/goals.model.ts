import { ISODateString } from "@capacitor/core";

/**
 * When a user goal is selected simply IDs and timestamps are populated to the database.
 * Full completion metadata is merged later
 */
export interface IUserGoal {
  id: string;
  _created: ISODateString;
  _modified: ISODateString;
}

/**
 * Whilst individual tasks have their own completion criteria,
 * an additional layer of criteria is added to account for tasks which should be
 * repeated multiple times and/or within certain time periods.
 * For example completing the praise_child task 20 times overall or 5 days in a row.
 */
export interface IGoal {
  /** Unique identifier for the goal */
  id: string;
  /** How it should appear to the user  */
  label: string;
  /** Optional grouping(s) for use in display settings (e.g. group lists,  colours, icons etc.) */
  groups?: string[];
  /** A list of other goal ids that must first be marked as completed first. Can be used to form hierarchical tasks or levels */
  requires?: string[];
}
export interface IGoalWithMeta extends IGoal {
  /** Extract specific tasks from goal completion criteria for display */
  tasks: ITaskWithMeta[];
  /** Calculated as mean average of individual task progress */
  progress: number;
  /** Calculated field, whether user has access based on required evaluation */
  unlocked: boolean;
  /** Whether the user has selected for one of their own goals */
  active: boolean;
}

export interface ITask {
  /** Unique identifier for the task, e.g. praise_my_child */
  id: string;
  /** What the user sees in the task summary */
  label: string;
  /** Specific action to trigger at start of task, e.g flow_start_praise. (actions are mapped to urls within the app) */
  start_action: string | null;
  /** addional data passed to start action */
  start_action_args: string | null;
  /** Actions which trigger the start of the task, e.g. praise_my_child_complete, assign_variable_... */
  trigger_on: string[];
  /** List of other tasks that must be completed before making available */
  requires: string[];
  /** List of strings to use as part of display grouping */
  groups: string[];
}

export interface ITaskWithMeta extends ITask {
  /** Record of task-related actions recorded */
  actionHistory: ITaskAction[];
}

export interface ITaskCompletionCriteria {
  /**
   * ID of a specific task to monitor for completion events.
   * E.g. specifying praise_child will monitor for the praise_child_complete action
   */
  task_id: string;
  /** For tasks which must be completed a minimum number of times (default = 1) */
  repeat_count?: number;
  /** Minimum number of days between times a task can be marked as complete (default = 1) */
  repeat_interval?: number;
  /**
   * Number of days after which previous completion will be ignored and counter reset.
   * E.g. reset_interval = 3, repeat_count = 3 will require completion for 3 days in a row
   */
  reset_interval?: number;
  /** computed based on task action history */
  progress?: number;
}

export interface ITaskAction {
  /** A unique identifier should be generated to allow easier updating of a task after run complete  */
  id: string;
  task_id: string;
  status: ITaskActionStatus;
  timestamp: ISODateString;
  data?: any;
}

export type ITaskActionStatus = "STARTED" | "COMPLETED";
