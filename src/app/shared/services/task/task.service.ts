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
// A task group consists of a task row (identified here by a parentDataListName and rowId) and a list of subtasks
interface TaskGroup {
  /** The name of the data list that contains the subtasks that constitute the task group */
  subtasksDataListName: string;
  /** The row id that identifies the task row corresponding to the task group within its parent data list */
  rowId: string;
  /**
   * The name of the data list that contains the task row corresponding to the task group
   * NB if that data list is itself a task group, this will be identical to the parentTaskGroup's subtasksDataListName
   */
  parentDataListName: string;
  /** If the parent data list is itself a task group, include its reference */
  parentTaskGroup?: TaskGroup;
}

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
        await this.setTaskGroupCompletedStatus(completedField, true);
        newlyCompleted = true;
      }
    } else {
      await this.setTaskGroupCompletedStatus(completedField, false);
      if (subtasksCompleted) {
        progressStatus = "inProgress";
      } else {
        progressStatus = "notStarted";
      }
    }
    this.evaluateHighlightedTaskGroup();
    return { subtasksTotal, subtasksCompleted, progressStatus, newlyCompleted };
  }

  async setTaskGroupCompletedStatus(completedField: string, isCompleted: boolean) {
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
          /**
           * HACK: evaluate completion status of task groups. ...
           */
          evaluate_group_completion: async () => {
            const taskGroupRefs = params.task_groups.split(" ");
            console.log("taskGroupRefs", taskGroupRefs);
            const nestedTaskGroups = this.parseTaskGroupRefsToTaskGroups(taskGroupRefs);
            await this.evaluateTaskGroupCompletion(nestedTaskGroups);
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

  /**
   * Parses an array of task group references into a nested TaskGroup object structure.
   *
   * Each task group reference is expected to be in the format "parentDataListName.rowId", where
   * The function processes the references in reverse order to build the nested TaskGroup
   * objects, linking each task group to its parent appropriately.
   *
   * @param {string[]} taskGroupRefs - An array of task group references in the format "parentDataListName.rowId",
   * starting with the initial subtasks data list name
   * @returns {TaskGroup} - The TaskGroup object corresponding to the last child task group, with anyu parent task groups nested within it.
   *
   * @example
   * For taskGroupRefs = ["debug_task_group_c", "debug_task_group_b.b_2", "debug_task_group_a.a_1"];
   * the method will return:
   * {
   *   subtasksDataListName: "debug_task_group_c",
   *   rowId: "b_2",
   *   parentDataListName: "debug_task_group_b",
   *   parentTaskGroup: {
   *     subtasksDataListName: "debug_task_group_b",
   *     rowId: "a_1",
   *     parentDataListName: "debug_task_group_a",
   *     parentTaskGroup: undefined
   *   }
   * }
   */
  public parseTaskGroupRefsToTaskGroups(taskGroupRefs: string[]): TaskGroup {
    let parentTaskGroup: TaskGroup | undefined;

    // Iterate over the references in reverse order, stopping before first entry
    for (let i = taskGroupRefs.length - 1; i > 0; i--) {
      const ref = taskGroupRefs[i];
      const [parentDataListName, rowId] = ref.split(".");

      // Create the TaskGroup object
      const taskGroup: TaskGroup = {
        subtasksDataListName: taskGroupRefs[i - 1].split(".")[0],
        rowId,
        parentDataListName,
        parentTaskGroup,
      };

      // Update the parentTaskGroup for the next iteration
      parentTaskGroup = taskGroup;
    }

    // The last child TaskGroup is the last one created
    return parentTaskGroup;
  }

  /**
   * Evaluates the completion status of a given task group, including its nested parent task groups
   * @param {TaskGroup} taskGroup The task group to evaluate, included any parent task groups nested within it
   * @return {Promise<boolean>} A boolean indicating whether the the last child task group (the top level of the TaskGroup object) is completed.
   */
  private async evaluateTaskGroupCompletion(taskGroup: TaskGroup): Promise<boolean> {
    const { subtasksDataListName, rowId, parentDataListName, parentTaskGroup } = taskGroup;
    const taskGroupData = await this.dynamicDataService.snapshot<TaskRow>(
      "data_list",
      subtasksDataListName
    );
    const taskGroupCompleted = taskGroupData.every((row) => row.completed);

    // Update completion of task group in dynamic data
    await this.dynamicDataService.update("data_list", parentDataListName, rowId, {
      completed: taskGroupCompleted,
    });

    // Support legacy task group implementation, where task completion is tracked in fields
    const taskGroupRow = (
      await this.dynamicDataService.snapshot<TaskRow>("data_list", subtasksDataListName)
    ).find((row) => row.id === rowId);
    const taskGroupCompletedField = taskGroupRow?.["completed_field"];
    if (taskGroupCompletedField) {
      await this.setTaskGroupCompletedStatus(taskGroupCompletedField, taskGroupCompleted);
      this.evaluateHighlightedTaskGroup();
    }

    // recursively evaluate any parent task groups
    if (parentTaskGroup) {
      this.evaluateTaskGroupCompletion(parentTaskGroup);
    }
    return taskGroupCompleted;
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

const taskGroupA: TaskGroup = {
  subtasksDataListName: "debug_task_group_b",
  parentDataListName: "debug_task_group_a",
  rowId: "a_1",
};

// e.g.
const taskGroupB: TaskGroup = {
  subtasksDataListName: "debug_task_group_c",
  rowId: "b_2",
  parentDataListName: "debug_task_group_b",
  parentTaskGroup: taskGroupA,
};

// Alternatively, could remove the subtasksDataListName property and somehow read it in at the bottom level...
