import { Component, EventEmitter, Input, Output } from "@angular/core";
import { differenceInCalendarDays } from "date-fns";
import { ITask, ITaskWithMeta } from "../../models/goals.model";

@Component({
  selector: "plh-task-reminder-item",
  template: `<ion-item
    *ngIf="showTask"
    button
    [class.task-complete]="isComplete"
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
  constructor() {}

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
}
