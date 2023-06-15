import { Injectable } from "@angular/core";
import { TemplateFieldService } from "../../components/template/services/template-field.service";
import { AppDataService } from "../data/app-data.service";
import { arrayToHashmap } from "../../utils";
import { AsyncServiceBase } from "../asyncService.base";

@Injectable({
  providedIn: "root",
})
export class TaskService extends AsyncServiceBase {
  // TODO: These should be set from the deployment/skin level (ultimately should come from templates)
  highlightedTaskFieldName = "_task_highlighted_group_id";
  taskGroupsListName = "workshop_tasks";

  taskGroups: any[] = [];
  taskGroupsHashmap: Record<string, any> = {};
  constructor(
    private templateFieldService: TemplateFieldService,
    private appDataService: AppDataService
  ) {
    super("Task");
    this.registerInitFunction(this.initialise);
  }

  private async initialise() {
    await this.ensureAsyncServicesReady([this.templateFieldService]);
    this.ensureSyncServicesReady([this.appDataService]);
    await this.getListOfTaskGroups();
    if (this.taskGroups.length > 0) {
      this.evaluateHighlightedTaskGroup();
    }
  }

  /** Get the list of highlight-able task groups, from the relevant data_list */
  private async getListOfTaskGroups() {
    const taskGroupsDataList = await this.appDataService.getSheet(
      "data_list",
      this.taskGroupsListName
    );
    this.taskGroups = taskGroupsDataList?.rows || [];
    this.taskGroupsHashmap = arrayToHashmap(this.taskGroups, "id");
  }

  /**
   * The highlighted task group should always be the ID of the highest
   * priority task_group that is not completed and not skipped
   * NB "highest priority" is defined as having the lowest numerical value for the "number" column
   */
  public evaluateHighlightedTaskGroup() {
    const previousHighlightedTaskGroup = this.getHighlightedTaskGroup();
    const taskGroupsNotCompletedAndNotSkipped = this.taskGroups.filter((taskGroup) => {
      return (
        !this.templateFieldService.getField(taskGroup.completed_field) &&
        !this.templateFieldService.getField(taskGroup.skipped_field)
      );
    });
    // If all task groups are completed or skipped (e.g. when user completes final task group),
    // then un-set highlighted task group
    if (taskGroupsNotCompletedAndNotSkipped.length === 0) {
      this.templateFieldService.setField(this.highlightedTaskFieldName, "");
      console.log("[HIGHLIGHTED TASK GROUP] - No highlighted task group is set");
      return []
    }
    // Else set the highlighted task group to the task group with the highest priority of those
    // not completed or skipped
    else {
      const highestPriorityTaskGroup = taskGroupsNotCompletedAndNotSkipped.reduce(
        (highestPriority, taskGroup) => {
          return highestPriority.number < taskGroup.number ? highestPriority : taskGroup;
        }
      );
      const newHighlightedTaskGroup = highestPriorityTaskGroup.id;
      if (newHighlightedTaskGroup !== previousHighlightedTaskGroup) {
        this.templateFieldService.setField(this.highlightedTaskFieldName, newHighlightedTaskGroup);
      }
      console.log("[HIGHLIGHTED TASK GROUP] - ", newHighlightedTaskGroup);
      return [previousHighlightedTaskGroup, newHighlightedTaskGroup];
    }
  }

  /** Get the id of the task group stored as higlighted */
  public getHighlightedTaskGroup() {
    return this.templateFieldService.getField(this.highlightedTaskFieldName);
  }

  /**
   * For a given task groups list, lookup the current highlighted task group and return the index
   * of the highlighted task within it
   * @return the index of the highlighted task group within that list, or 0 if not found
   * */
  public async getHighlightedTaskGroupIndex(highlightedTaskGroup: string, taskGroupsList: string) {
    const taskGroupsDataList = await this.appDataService.getSheet("data_list", taskGroupsList);
    const arrayOfIds = taskGroupsDataList.rows.map((taskGroup) => taskGroup.id);
    const indexOfHighlightedTask = arrayOfIds.indexOf(highlightedTaskGroup);
    return indexOfHighlightedTask === -1 ? 0 : indexOfHighlightedTask;
  }

  /**
   * Set the value of the skipped field to true for all uncompleted tasks groups with
   * a priority lower than the target task group. Then re-evaluate the highlighted task group
   * NB "highest priority" is defined as having the lowest numerical value for the "number" column
   **/
  public setHighlightedTaskGroup(targetTaskGroupId: string) {
    const taskGroupsNotCompleted = this.taskGroups.filter((taskGroup) => {
      return !this.templateFieldService.getField(taskGroup.completed_field);
    });
    const targetTaskGroupPriority = this.taskGroupsHashmap[targetTaskGroupId].number;
    taskGroupsNotCompleted.forEach((taskGroup) => {
      // Case: "skipping forward" – target task group is lower in priority than current highlighted task,
      // so "skip" all tasks with lower priority than target task
      if (taskGroup.number < targetTaskGroupPriority) {
        this.templateFieldService.setField(taskGroup.skipped_field, "true");
      }
      // Case: "skipping backward" – target task group is higher in priority than current highlighted task,
      // so "un-skip" all tasks with equal or higher priority than target task (including target task)
      if (taskGroup.number >= targetTaskGroupPriority) {
        this.templateFieldService.setField(taskGroup.skipped_field, "false");
      }
    });
    // Re-evaluate highlighted task group
    return this.evaluateHighlightedTaskGroup();
  }

  /**
   * @returns a boolean value indicating whether or not the task with taskId is the highlighted task
   */
  public checkHighlightedTaskGroup(taskGroupId: string) {
    if (!taskGroupId) return false;
    return taskGroupId === this.getHighlightedTaskGroup();
  }
}

export type IProgressStatus = "notStarted" | "inProgress" | "completed";
