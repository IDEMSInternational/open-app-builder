import { Injectable } from "@angular/core";
import { TemplateFieldService } from "../../components/template/services/template-field.service";
import { AppDataService } from "../data/app-data.service";
import { arrayToHashmap } from "../../utils";
import { AsyncServiceBase } from "../asyncService.base";
import { AppConfigService } from "../app-config/app-config.service";
import { FlowTypes, IAppConfig } from "../../model";
import { CampaignService } from "../../../feature/campaign/campaign.service";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";
import { DynamicDataService } from "../dynamic-data/dynamic-data.service";

export type IProgressStatus = "notStarted" | "inProgress" | "completed";
// This is the definition of a task: a row of a data list that has a "completed" column
export type TaskRow = FlowTypes.Data_listRow<{ completed: boolean }>;
/**
 * A task row that includes a value for `task_child`. This value is the name of the data list that contains
 * a list of subtasks: when all subtasks are completed, the parent task is considered completed
 */
export type TaskRowWithChildTasks = TaskRow & { task_child: string };

@Injectable({
  providedIn: "root",
})
export class TaskService extends AsyncServiceBase {
  // The name of the field that tracks the currently highlighted task group
  highlightedTaskField: string;
  // The top-level list of task groups (e.g. modules)
  taskGroupsListName: string;
  taskGroups: any[] = [];
  taskGroupsHashmap: Record<string, any> = {};
  tasksFeatureEnabled: boolean;

  constructor(
    private appConfigService: AppConfigService,
    private appDataService: AppDataService,
    private campaignService: CampaignService,
    private dynamicDataService: DynamicDataService,
    private templateFieldService: TemplateFieldService,
    private templateActionRegistry: TemplateActionRegistry
  ) {
    super("Task");
    this.registerInitFunction(this.initialise);
    this.registerTemplateActionHandlers();
  }

  /**
   * The highlighted task group should always be the ID of the highest
   * priority task_group that is not completed and not skipped
   * NB "highest priority" is defined as having the lowest numerical value for the "number" column
   */
  public evaluateHighlightedTaskGroup(): {
    previousHighlightedTaskGroup: string;
    newHighlightedTaskGroup: string;
  } {
    const previousHighlightedTaskGroup = this.getHighlightedTaskGroup();
    let newHighlightedTaskGroup = previousHighlightedTaskGroup;
    const taskGroupsNotCompletedAndNotSkipped = this.taskGroups.filter(
      (taskGroup) =>
        !this.templateFieldService.getField(taskGroup.completed_field) &&
        !this.templateFieldService.getField(taskGroup.skipped_field)
    );
    // If all task groups are completed or skipped (e.g. when user completes final task group),
    // then un-set highlighted task group
    if (taskGroupsNotCompletedAndNotSkipped.length === 0) {
      this.templateFieldService.setField(this.highlightedTaskField, "");
      console.log("[HIGHLIGHTED TASK GROUP] - No highlighted task group is set");
      newHighlightedTaskGroup = "";
    }
    // Else set the highlighted task group to the task group with the highest priority of those
    // not completed or skipped
    else {
      const highestPriorityTaskGroup = taskGroupsNotCompletedAndNotSkipped.reduce(
        (highestPriority, taskGroup) =>
          highestPriority.number < taskGroup.number ? highestPriority : taskGroup
      );
      newHighlightedTaskGroup = highestPriorityTaskGroup.id;
      if (newHighlightedTaskGroup !== previousHighlightedTaskGroup) {
        this.templateFieldService.setField(this.highlightedTaskField, newHighlightedTaskGroup);
      }
      console.log("[HIGHLIGHTED TASK GROUP] - ", newHighlightedTaskGroup);
    }
    // HACK - reschedule campaign notifications when the highlighted task group has changed,
    // in order to handle any that are conditional on the highlighted task group
    if (previousHighlightedTaskGroup !== newHighlightedTaskGroup) {
      // Doesn't need to be awaited – use .then() to avoid making parent function async
      this.campaignService.ready().then(() => this.campaignService.scheduleCampaignNotifications());
    }
    return { previousHighlightedTaskGroup, newHighlightedTaskGroup };
  }

  /** Get the id of the task group stored as higlighted */
  public getHighlightedTaskGroup() {
    return this.templateFieldService.getField(this.highlightedTaskField);
  }

  /**
   * For a given task groups list, lookup the current highlighted task group and return the index
   * of the highlighted task within it
   * @param taskGroupsListName The name of the data list of hilightable task groups
   * (currently only the list matching this.taskGroupsListName will return a positive match)
   * @return the index of the highlighted task group within that list (-1 if not found)
   **/
  public async getHighlightedTaskGroupIndex(taskGroupsListName: string) {
    let indexOfHighlightedTask = -1;
    const highlightedTaskGroup = this.getHighlightedTaskGroup();
    if (highlightedTaskGroup) {
      const taskGroupDataRows = await this.getTaskGroupDataRows(taskGroupsListName);
      const arrayOfIds = taskGroupDataRows.map((taskGroup) => taskGroup.id);
      indexOfHighlightedTask = arrayOfIds.indexOf(highlightedTaskGroup);
    }
    return indexOfHighlightedTask;
  }

  /**
   * @returns a boolean value indicating whether or not the task with taskId is the highlighted task
   */
  public checkHighlightedTaskGroup(taskGroupId: string) {
    if (!taskGroupId) return false;
    return taskGroupId === this.getHighlightedTaskGroup();
  }

  public async getTaskGroupDataRows(dataListName: string) {
    const dataList = await this.appDataService.getSheet("data_list", dataListName);
    return dataList?.rows;
  }

  /**
   * For given task group data, fetch the completion status for each subtask of the
   * task group and calculate the task group's completion progress.
   * Task group data lists can store their completion status in one of two ways:
   * 1. A "completed" column, with values updated dynamically
   * 2. A "completed_field" column, referencing fields that store each subtask's the completion status
   * @param dataRows The data rows of the task group
   */
  public async evaluateTaskGroupData(
    dataRows: any[],
    options: {
      completedColumnName: string;
      completedField: string;
      completedFieldColumnName: string;
      dataListName: string;
      useDynamicData: boolean;
    }
  ) {
    const {
      useDynamicData,
      completedColumnName,
      completedFieldColumnName,
      completedField,
      dataListName,
    } = options;
    const subtasks = dataRows || [];
    const subtasksTotal = subtasks.length;
    const subtasksCompleted = subtasks.filter((task) => {
      if (useDynamicData) {
        return task[completedColumnName];
      } else {
        try {
          return this.templateFieldService.getField(task[completedFieldColumnName]);
        } catch {
          console.error(
            `[TASK] - Source data list ${dataListName} has no column "${completedFieldColumnName}" nor "${completedColumnName}". It is mandatory for at least one of these columns to be present to task subtask progress.`
          );
        }
      }
    }).length;
    let progressStatus: IProgressStatus;
    let newlyCompleted: boolean;
    if (subtasksCompleted === subtasksTotal) {
      progressStatus = "completed";
      // Check whether task group has already been completed
      if (!this.templateFieldService.getField(completedField)) {
        // If not, set completed field to "true"
        await this.setTaskGroupCompletedField(completedField, true);
        newlyCompleted = true;
      }
    } else {
      await this.setTaskGroupCompletedField(completedField, false);
      if (subtasksCompleted) {
        progressStatus = "inProgress";
      } else {
        progressStatus = "notStarted";
      }
    }
    this.evaluateHighlightedTaskGroup();
    return { subtasksTotal, subtasksCompleted, progressStatus, newlyCompleted };
  }

  async setTaskGroupCompletedField(completedField: string, isCompleted: boolean) {
    console.log(`Setting ${completedField} to ${isCompleted}`);
    await this.templateFieldService.setField(completedField, `${isCompleted}`);
  }

  private async initialise() {
    await this.ensureAsyncServicesReady([this.templateFieldService]);
    this.ensureSyncServicesReady([this.appDataService, this.appConfigService]);
    this.subscribeToAppConfigChanges();
    if (this.tasksFeatureEnabled) {
      this.taskGroups = await this.getTaskGroupDataRows(this.taskGroupsListName);
      this.taskGroupsHashmap = arrayToHashmap(this.taskGroups, "id");
      if (this.taskGroups.length > 0) {
        this.evaluateHighlightedTaskGroup();
      }
    }
  }

  private subscribeToAppConfigChanges() {
    this.appConfigService.appConfig$.subscribe((appConfig: IAppConfig) => {
      this.highlightedTaskField = appConfig.TASKS.highlightedTaskField;
      this.taskGroupsListName = appConfig.TASKS.taskGroupsListName;
      this.tasksFeatureEnabled = appConfig.TASKS.enabled;
    });
  }

  private registerTemplateActionHandlers() {
    this.templateActionRegistry.register({
      task: async ({ args, params }) => {
        const [actionId] = args;
        const childActions = {
          evaluate: async () => {
            const { data_list_name, row_id } = params;
            if (!data_list_name) {
              return console.warn(
                "[TASK] evaluate action - To evaluate task completion, a data list name must be provided via the data_list_name param"
              );
            }
            if (row_id) {
              await this.evaluateTaskCompletion(data_list_name, row_id);
            } else {
              await this.bulkEvaluateTaskCompletion(data_list_name);
            }
          },
        };
        if (!(actionId in childActions)) {
          console.error("task does not have action", actionId);
          return;
        }
        return childActions[actionId]();
      },
    });
  }

  private async bulkEvaluateTaskCompletion(dataListName: string) {
    const taskRows = await this.fetchTaskRows(dataListName);
    for (const taskRow of taskRows) {
      await this.evaluateTaskCompletion(dataListName, taskRow.id, taskRow);
    }
  }

  /**
   * For a given parent task (a row specified by the provided dataListName and rowId),
   * evaluate its completion status based upon the completion status of its child tasks:
   * if all child tasks are completed, the "completed" value of parent task is set to `true`, else it is set to `false`.
   * Expects the task row to have a "task_child" column that contains the name of the data list containing the child tasks.
   *
   * @param {string} dataListName - The name of the data list that contains the task row
   * @param {string} rowId - The ID of the task row to evaluate
   * @param {TaskRowWithChildTasks} [taskRow] - Optionally provide a task row explicitly to avoid duplicate query to dynamic data
   * @return {boolean} The completion status of the task group
   */
  private async evaluateTaskCompletion(
    dataListName: string,
    rowId: string,
    taskRow?: TaskRowWithChildTasks
  ): Promise<boolean> {
    taskRow = taskRow || (await this.fetchTaskRow(dataListName, rowId));
    if (!taskRow) return null;

    let taskCompleted = taskRow.completed;

    const subtasksDataListName = taskRow.task_child;
    if (!subtasksDataListName) {
      console.warn(
        `[TASK] evaluate - row "${rowId}" in "${dataListName}" has no child tasks to evaluate`
      );
    } else {
      const subtasks = await this.fetchTaskRows(subtasksDataListName);
      taskCompleted = subtasks.every((row) => row.completed);

      const taskCompletedField = taskRow["completed_field"];
      await this.setTaskCompletion(dataListName, rowId, taskCompleted, taskCompletedField);
    }
    return taskCompleted;
  }

  /** Fetch task rows for a whole data list from dynamic data */
  private async fetchTaskRows(dataListName: string) {
    const taskRows = await this.dynamicDataService.snapshot<TaskRowWithChildTasks>(
      "data_list",
      dataListName
    );
    if (!taskRows) {
      console.warn(`[TASK] - data list "${dataListName}" not found`);
    }
    return taskRows || null;
  }

  /** Fetch task row from dynamic data */
  private async fetchTaskRow(dataListName: string, rowId: string) {
    const taskRows = await this.fetchTaskRows(dataListName);
    const taskRow = taskRows?.find((row) => row.id === rowId);
    if (!taskRow) {
      console.warn(`[TASK] - row "${rowId}" in "${dataListName}" not found`);
    }
    return taskRow || null;
  }

  /**
   * Update the "completed" value for a given task group.
   * @param {string} completed_field - If provided, this field will also be updated to support legacy field-based functionality
   * */
  private async setTaskCompletion(
    dataListName: string,
    rowId: string,
    completed: boolean,
    completed_field?: string
  ) {
    // Update task's "completed" value in dynamic data
    await this.dynamicDataService.update("data_list", dataListName, rowId, { completed });

    // Support legacy task group implementation, where task completion is tracked in fields
    if (completed_field) {
      await this.setTaskGroupCompletedField(completed_field, completed);
      this.evaluateHighlightedTaskGroup();
    }
  }

  /**
   * TODO: this is not currently implemented, and should likely be reworked as part of a broader overhaul of the task system
   *
   * Set the value of the skipped field to true for all uncompleted tasks groups with
   * a priority lower than the target task group. Then re-evaluate the highlighted task group
   * NB "highest priority" is defined as having the lowest numerical value for the "number" column
   **/
  // public setHighlightedTaskGroup(targetTaskGroupId: string) {
  //   const taskGroupsNotCompleted = this.taskGroups.filter((taskGroup) => {
  //     return !this.templateFieldService.getField(taskGroup.completed_field);
  //   });
  //   const targetTaskGroupPriority = this.taskGroupsHashmap[targetTaskGroupId].number;
  //   taskGroupsNotCompleted.forEach((taskGroup) => {
  //     // Case: "skipping forward" – target task group is lower in priority than current highlighted task,
  //     // so "skip" all tasks with lower priority than target task
  //     if (taskGroup.number < targetTaskGroupPriority) {
  //       this.templateFieldService.setField(taskGroup.skipped_field, "true");
  //     }
  //     // Case: "skipping backward" – target task group is higher in priority than current highlighted task,
  //     // so "un-skip" all tasks with equal or higher priority than target task (including target task)
  //     if (taskGroup.number >= targetTaskGroupPriority) {
  //       this.templateFieldService.setField(taskGroup.skipped_field, "false");
  //     }
  //   });
  //   // Re-evaluate highlighted task group
  //   return this.evaluateHighlightedTaskGroup();
  // }
}
