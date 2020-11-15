import { Component, Input, OnInit } from "@angular/core";
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
    if (this.task.trigger_on.length > 0) {
      this.registerTaskTriggers();
    }
    // Hide tasks without a label
    if (!this.task.label) {
      this.showTask = false;
    }
  }

  async handleTaskClicked() {
    const { start_action, start_action_args } = this.task;
    const task_id = this.task.id;
    const timestamp = new Date().toISOString();
    const id = generateRandomId();
    if (this.task.start_action) {
      console.log("starting action", this.task.start_action);
      // TODO - possibly add field for grouping start/complete,
      // or keeping as single entry and updating summary data (e.g. abandoned)
      this.taskActions.addTaskAction({ id, task_id, timestamp, status: "STARTED" });
      // TODO - add action commands and handle callbacks
      const status = await this.taskActions.runAction(start_action, start_action_args);
      this.taskActions.addTaskAction({ id, task_id, timestamp, status: "COMPLETED" });
      // TODO - calculate local state updates instead of refreshing full data set
      await this.goalsService.loadGoals();
    } else {
      this.taskActions.addTaskAction({ id, task_id, timestamp, status: "COMPLETED" });
    }
  }

  private registerTaskTriggers() {
    // TODO - some tasks are triggered by events, need better way to handle bindings
  }
}
