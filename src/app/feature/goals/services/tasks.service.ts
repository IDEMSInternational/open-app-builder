import { Injectable } from "@angular/core";
import { DbService } from "src/app/shared/services/db/db.service";
import { ITaskAction, ITaskWithMeta } from "../models/goals.model";
import { TASK_LIST } from "src/app/shared/services/data/data.service";
import { arrayToHashmapArray, stringToArray } from "src/app/shared/utils";

@Injectable({
  providedIn: "root",
})
/**
 * The goals service handles loading hardcoded goals, tasks, completion criteria and reminders,
 * tidying up various data structures and making accessible to display components
 */
export class TasksService {
  public userRegularTasks: ITaskWithMeta[] = [];
  public userJourneyTasks: ITaskWithMeta[] = [];

  constructor(private dbService: DbService) {
    this.loadTasks();
  }

  /*************************************************************************
   *  Public Methods
   ************************************************************************/
  /** Read database objects and evaluate full task lists */
  public async loadTasks() {
    const actionHistory = await this.dbService.table<any>("task_actions").toArray();
    const actionHistoryHash = arrayToHashmapArray<ITaskAction>(actionHistory, "task_id");
    const allTasks = this.processTasksList(actionHistoryHash);
    const userTasks = this.processUserTasksList(allTasks, actionHistoryHash);
    // hardcoded specific separation
    this.userRegularTasks = userTasks.filter((t) => t.groups.includes("repeatOnCompletion"));
    this.userJourneyTasks = userTasks.filter((t) => !t.groups.includes("repeatOnCompletion"));
  }

  /*************************************************************************
   *  Private Methods
   ************************************************************************/

  /**
   * Read raw task data, refactor as required for use in components
   */
  private processTasksList(actionHistoryHash: Hashmap<ITaskAction[]>) {
    const allTaskData = [].concat(...TASK_LIST.map((t) => t.rows));

    const allTasks = allTaskData.map((t) => {
      const task: ITaskWithMeta = {
        id: t.id,
        label: t.label || "",
        trigger_on: stringToArray(t.trigger_on),
        start_action: t.start_action || null,
        start_action_args: t.start_action_args || null,
        groups: stringToArray(t.groups),
        requires: stringToArray(t.requires),
        actionHistory: actionHistoryHash[t.id],
      };
      return task;
    });
    return allTasks;
  }

  /**
   * Users will only show tasks which have all necessary prerequisite ('requires')
   * completed and have a label specified (ignore various blank placeholders)
   */
  private processUserTasksList(tasks: ITaskWithMeta[], actionHistoryHash: Hashmap<ITaskAction[]>) {
    return tasks.filter(
      (task) =>
        task.label &&
        task.requires.every((requiredTaskId) => {
          // ensure all listed required tasks have been completed at least once
          // TODO - build further functionality like intial proposed completion goals
          const actions = actionHistoryHash[requiredTaskId] || [];
          return actions.filter((a) => a.status === "COMPLETED").length > 0;
        })
    );
  }
}
interface Hashmap<T> {
  [key: string]: T;
}
