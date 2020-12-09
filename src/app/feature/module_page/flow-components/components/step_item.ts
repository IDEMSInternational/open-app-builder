import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "module-list-flow-step-item",
  template: `<div class="step-item-container">
      <div class="step-item-checkbox" [ngClass]="{'locked': isLocked, 'current-step': isCurrentStep}">
        <ion-icon *ngIf="isLocked" name="lock-closed-outline"></ion-icon>
        <ion-icon *ngIf="isCurrentStep && !isLocked" name="checkmark-outline"></ion-icon>
      </div>
      <div class="step-item-button" [ngClass]="{'locked': isLocked, 'current-step': isCurrentStep}">{{row.text}}</div>
    </div>`,
  styleUrls: ["./flow-components-common.scss", "./step_item.scss"]
})
export class StepItemFlowComponent implements OnInit {
  
  @Input() row: FlowTypes.Module_pageRow;
  @Input() flow: FlowTypes.Module_page;
  @Input() isLocked: boolean = true;
  @Input() isCurrentStep: boolean = false;

  constructor() {}

  ngOnInit() {}
}
