import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { TaskService } from "src/app/shared/services/task/task.service";

@Component({
  selector: "module-list-flow-step-item",
  template: `<div
    class="step-item-container"
    [attr.data-locked]="isLocked"
    [attr.data-completed]="isCompleted"
  >
    <div class="step-item-checkbox">
      <ion-icon *ngIf="isCompleted" name="checkmark-outline"></ion-icon>
      <ion-icon *ngIf="!isCompleted && !isLocked" name=""></ion-icon>
      <ion-icon *ngIf="!isCompleted && isLocked" name="lock-closed-outline"></ion-icon>
    </div>
    <div (click)="handleItemClicked()" class="step-item-button" [attr.data-locked]="isLocked">
      {{ row.text }}
    </div>
  </div>`,
  styleUrls: ["./flow-components-common.scss", "./step_item.scss"],
})
export class StepItemFlowComponent implements OnInit {
  @Input() row: FlowTypes.Module_pageRow;
  @Input() flow: FlowTypes.Module_page;
  isLocked: boolean = true;
  isCompleted: boolean = false;
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    console.log("step item init", this.row.task_id);
    if (this.row.task_id) {
      this.evaluateTaskMeta(this.row.task_id);
    }
  }
  async evaluateTaskMeta(task_id: string) {
    this.isCompleted = await this.taskService.evaluateTaskCompleted(task_id);
    this.isLocked = await this.taskService.evaluateTasklocked(task_id);
  }

  /** When a row is clicked inform the task service to carry out any associated tasks
   * Note - we are not bubbling up output events as there is a lot of nesting levels to go through
   * and harder to use with dynamic injected components
   */
  async handleItemClicked() {
    if (this.row.task_id) {
      await this.taskService.startTask(this.row.task_id);
    }
  }
}
