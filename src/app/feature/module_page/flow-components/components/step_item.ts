import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "module-list-flow-step-item",
  template: `<div class="step-item-container">
      <div class="step-item-checkbox"></div>
      <div class="step-item-button">{{row.text}}</div>
    </div>`,
  styleUrls: ["./flow-components-common.scss", "./step_item.scss"]
})
export class StepItemFlowComponent implements OnInit {
  
  @Input() row: FlowTypes.Module_pageRow;
  @Input() flow: FlowTypes.Module_page;
  constructor() {}

  ngOnInit() {}
}
