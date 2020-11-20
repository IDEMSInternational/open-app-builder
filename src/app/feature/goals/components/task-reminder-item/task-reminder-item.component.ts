import { Component, Input, OnInit } from "@angular/core";
import { differenceInCalendarDays } from "date-fns";
import { generateRandomId } from "src/app/shared/utils";
import { ITaskWithMeta } from "../../models/goals.model";
import { GoalsService } from "../../services/goals.service";
import { TaskActionsService } from "../../services/task-actions.service";

@Component({
  selector: "plh-task-reminder-item",
  template: `<ion-item
    *ngIf="showTask"
    button
    [class.task-complete]="isComplete"
    (click)="handleTaskClicked()"
  >
    {{ task.label }}
  </ion-item> `,
  styles: [
    `
      .task-complete {
        background: green;
        text-decoration: line-through;
        pointer-events: none;
      }
    `,
  ],
})
export class TaskReminderItemComponent implements OnInit {
  isComplete = false;
  showTask = true;
  @Input() task: ITaskWithMeta;
  constructor(private taskActions: TaskActionsService, private goalsService: GoalsService) {}

  ngOnInit(): void {
    this.isComplete = this.evaluateTaskComplete(this.task);
    if (this.task.trigger_on.length > 0) {
      this.registerTaskTriggers();
    }
    // Hide tasks without a label
    if (!this.task.label) {
      this.showTask = false;
    }
  }

  /**
   * A task should be marked as complete if either it has already satisfied goal completion criteria
   * (e.g. has been completed the specified number of repeat times), or if it has already been completed
   * within the specified repeat interval (i.e. some tasks should only be completed once per day)
   */
  evaluateTaskComplete(task: ITaskWithMeta): boolean {
    const { actionHistory, goalCompletionCriteria } = task;
    // allow progress over 100% in case of additional completion via other mechanisms
    if (task.goalCompletionCriteria.progress >= 100) {
      return true;
    }
    const repeat_interval = goalCompletionCriteria.repeat_interval || 1;
    const lastComplete = actionHistory
      .filter((action) => action.status === "COMPLETED")
      .map((action) => action.timestamp)
      .sort()
      .pop();
    if (lastComplete) {
      return differenceInCalendarDays(new Date(lastComplete), new Date()) < repeat_interval;
    }
    return false;
  }

  /**
   * When a task is clicked create database entry to log task start, and then
   * run any associated task actions.
   * On action completion log to database completion status.
   */
  async handleTaskClicked() {
    const { start_action, start_action_args } = this.task;
    const task_id = this.task.id;
    const timestamp = new Date().toISOString();
    const id = generateRandomId();
    if (this.task.start_action) {
      console.log("starting action", this.task.start_action);
      // TODO - possibly add field for grouping start/complete,
      // or keeping as single entry and updating summary data (e.g. abandoned)
      await this.taskActions.addTaskAction({ id, task_id, timestamp, status: "STARTED" });
      // TODO - add action commands and handle callbacks
      const status = await this.taskActions.runAction(start_action, start_action_args);
      if (status === "COMPLETED") {
        await this.taskActions.addTaskAction({ id, task_id, timestamp, status: "COMPLETED" });
        // TODO - calculate local state updates instead of refreshing full data set
        location.reload();
      }
    } else {
      this.taskActions.addTaskAction({ id, task_id, timestamp, status: "COMPLETED" });
    }
  }

  private registerTaskTriggers() {
    // TODO - some tasks are triggered by events, need better way to handle bindings
  }
}
