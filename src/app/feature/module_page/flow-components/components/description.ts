import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "module-list-flow-description",
  template: `<p>{{row.text}}</p>`,
  styleUrls: ["./flow-components-common.scss"]
})
export class DescriptionFlowComponent implements OnInit {

  @Input() row: FlowTypes.Module_pageRow;
  @Input() flow: FlowTypes.Module_page;
  
  constructor() {}

  ngOnInit() {}
}
