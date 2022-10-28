import { Injectable } from "@angular/core";
import { TemplateFieldService } from "../../components/template/services/template-field.service";
import { AppDataService } from "../data/app-data.service";
import clone from "clone";
import { arrayToHashmap } from "../../utils";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  highlightedTaskFieldName = "_highlighted_task_group";
  taskGroups: any[];
  taskGroupsHashmap: Record<string, any>;
  constructor(
    private templateFieldService: TemplateFieldService,
    private appDataService: AppDataService
  ) {}

  async init() {
    await this.getListOfTaskGroups();
    this.evaluateHighlightedTaskGroup();
  }

  /** Get the list of highlight-able task groups, from the relevant data_list */
  private async getListOfTaskGroups() {
    // TODO: This should be set from the template/skin level
    const taskGroupsListName = "workshop_tasks";
    const taskGroupsDataList = await this.appDataService.getSheet("data_list", taskGroupsListName);
    this.taskGroups = taskGroupsDataList.rows;
    this.taskGroupsHashmap = arrayToHashmap(this.taskGroups, "id");
  }

  /** The _highlighted_task_group should always be the ID of the highest
   * priority task_group that is not completed and not skipped
   * NB "highest priority" is defined as having the lowest numerical value for the "number" column
   */
  public async evaluateHighlightedTaskGroup() {
    const previousHighlightedTaskGroup = this.getHighlightedTaskGroup();
    const taskGroupsNotCompletedAndNotSkipped = clone(this.taskGroups).filter((taskGroup) => {
      return (
        !this.templateFieldService.getField(taskGroup.completed_field) &&
        !this.templateFieldService.getField(taskGroup.skipped_field)
      );
    });
    // If all task groups are completed or skipped (e.g. when user completes final task group),
    // then un-set highlighted task group
    if (taskGroupsNotCompletedAndNotSkipped.length === 0) {
      this.templateFieldService.setField(this.highlightedTaskFieldName, "");
    }
    const highestPriorityTaskGroup = taskGroupsNotCompletedAndNotSkipped.reduce(
      (highestPriority, taskGroup) => {
        return highestPriority.number < taskGroup.number ? highestPriority : taskGroup;
      }
    );
    if (highestPriorityTaskGroup.id !== previousHighlightedTaskGroup) {
      this.templateFieldService.setField(
        this.highlightedTaskFieldName,
        highestPriorityTaskGroup.id
      );
    }
    console.log("[HIGHLIGHTED TASK GROUP] - ", highestPriorityTaskGroup.id);
  }

  private getHighlightedTaskGroup() {
    return this.templateFieldService.getField(this.highlightedTaskFieldName);
  }

  /** For a given task groups list, @return the index of the highlighted task group within that list.
   * If there is no highlighted task group, or it does not appear in the given list, @returns 0.*/
  public async getHighlightedTaskGroupIndex(taskGroupsList: string) {
    const highlightedTaskGroup = this.getHighlightedTaskGroup();
    if (!highlightedTaskGroup) return 0;
    const taskGroupsDataList = await this.appDataService.getSheet("data_list", taskGroupsList);
    const arrayOfIds = taskGroupsDataList.rows.map((taskGroup) => taskGroup.id);
    const indexOfHighlightedTask = arrayOfIds.indexOf(this.getHighlightedTaskGroup());
    return indexOfHighlightedTask === -1 ? 0 : indexOfHighlightedTask;
  }

  /** Set the value of the skipped field to true for all uncompleted tasks groups with
   * a priority lower than the target task group. Then re-evaluate the highlighted task group
   * NB "highest priority" is defined as having the lowest numerical value for the "number" column */
  public setHighlightedTaskGroup(targetTaskGroupId: string) {
    const taskGroupsNotCompleted = clone(this.taskGroups).filter((taskGroup) => {
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
    this.evaluateHighlightedTaskGroup();
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
