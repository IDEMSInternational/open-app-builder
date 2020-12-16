import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { TaskService } from "src/app/shared/services/task/task.service";

@Component({
  selector: "module-list-flow-step-item",
  template: `<div class="step-item-container">
    <div class="step-item-checkbox" [ngClass]="{ locked: isLocked, 'current-step': isCurrentStep }">
      <ion-icon *ngIf="isLocked" name="lock-closed-outline"></ion-icon>
      <ion-icon *ngIf="isCurrentStep && !isLocked" name="checkmark-outline"></ion-icon>
    </div>
    <div
      (click)="handleItemClicked()"
      class="step-item-button"
      [ngClass]="{ locked: isLocked, 'current-step': isCurrentStep }"
    >
      {{ row.text }}
    </div>
  </div>`,
  styleUrls: ["./flow-components-common.scss", "./step_item.scss"],
})
export class StepItemFlowComponent implements OnInit {
  @Input() row: FlowTypes.Module_pageRow;
  @Input() flow: FlowTypes.Module_page;
  @Input() isLocked: boolean = true;
  @Input() isCurrentStep: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  /** When a row is clicked inform the task service to carry out any associated tasks
   * Note - we are not bubbling up output events as there is a lot of nesting levels to go through
   * and harder to use with dynamic injected components
   */
  handleItemClicked() {
    if (this.row.task_id) {
      this.taskService.runTask(this.row.task_id);
    }
  }
}
