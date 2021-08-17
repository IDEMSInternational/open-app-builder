import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "data-models";

@Component({
  selector: "module-list-flow-step-intro",
  template: `<p>{{ row.text }}</p>`,
  styleUrls: ["./flow-components-common.scss"],
})
export class StepIntroFlowComponent implements OnInit {
  @Input() row: FlowTypes.Module_pageRow;
  @Input() flow: FlowTypes.Module_page;

  constructor() {}

  ngOnInit() {}
}
