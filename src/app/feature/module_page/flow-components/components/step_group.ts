import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";

@Component({
  selector: "module-list-flow-step-group",
  template: `<div *ngFor="let stepElem of row.rows; index as i">
    <module-list-flow-step-intro
      *ngIf="stepElem.type === 'step_intro'"
      [row]="stepElem"
    ></module-list-flow-step-intro>
    <module-list-flow-step-item
      *ngIf="stepElem.type === 'step_item'"
      [row]="stepElem"
    ></module-list-flow-step-item>
  </div> `,
  styleUrls: ["./flow-components-common.scss"],
})
export class StepGroupFlowComponent implements OnInit {
  @Input() row: FlowTypes.Module_pageRow;
  @Input() flow: FlowTypes.Module_page;
  constructor() {}

  ngOnInit() {}
}
