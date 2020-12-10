import { Component, EventEmitter, Input, Output } from "@angular/core";
import { differenceInCalendarDays } from "date-fns";
import { generateRandomId } from "src/app/shared/utils";
import { ITask, ITaskWithMeta } from "../../models/goals.model";
import { TaskActionsService } from "../../services/task-actions.service";

@Component({
  selector: "plh-task-reminder-item",
  template: `<ion-item
    *ngIf="showTask"
    button
    [class.task-complete]="isComplete"
    (click)="handleTaskClicked()"
  >
    <span>{{ _task.label }}</span>
    <ion-checkbox slot="end" [checked]="isComplete" *ngIf="!_task.start_action"></ion-checkbox>
  </ion-item> `,
  styles: [
    `
      .task-complete {
        text-decoration: line-through;
        pointer-events: none;
      }
    `,
  ],
})
export class TaskReminderItemComponent {
  isComplete = false;
  showTask = true;
  _task: ITask;
  @Input() set task(task: ITaskWithMeta) {
    console.log("task set", task);
    this._task = task;
    this.isComplete = this.evaluateTaskComplete(task);
  }
  @Output() onTaskClick: EventEmitter<ITask> = new EventEmitter();
  constructor(private taskActions: TaskActionsService) {}

  /**
   * A task should be marked as complete if either it has already satisfied goal completion criteria
   * (e.g. has been completed the specified number of repeat times), or if it has already been completed
   * within the specified repeat interval (i.e. some tasks should only be completed once per day)
   */
  evaluateTaskComplete(task: ITaskWithMeta): boolean {
    // TODO - merge task with completion criteria (in service)
    // const repeat_interval = goalCompletionCriteria.repeat_interval || 1;
    const repeat_interval = 1;
    const { actionHistory } = task;
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
    // const { start_action, start_action_args } = this._task;
    // const task_id = this._task.id;
    // const timestamp = new Date().toISOString();
    // const id = generateRandomId();
    // if (start_action) {
    //   console.log("starting action", start_action);
    //   // TODO - possibly add field for grouping start/complete,
    //   // or keeping as single entry and updating summary data (e.g. abandoned)
    //   await this.taskActions.addTaskAction({ id, task_id, timestamp, status: "STARTED" });
    //   // TODO - add action commands and handle callbacks
    //   const status = await this.taskActions.runAction(start_action, start_action_args);
    //   if (status === "COMPLETED") {
    //     await this.taskActions.addTaskAction({ id, task_id, timestamp, status: "COMPLETED" });
    //     // TODO - calculate local state updates instead of refreshing full data set
    //     location.reload();
    //   }
    // } else {
    //   this.taskActions.addTaskAction({ id, task_id, timestamp, status: "COMPLETED" });
    //   this.isComplete = true;
    // }
  }
}
