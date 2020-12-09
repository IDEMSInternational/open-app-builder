import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "module-list-flow-title",
  template: `<h1>{{row.text}}</h1>`,
  styleUrls: ["./flow-components-common.scss"]
})
export class TitleFlowComponent implements OnInit {

  @Input() row: FlowTypes.Module_pageRow;
  @Input() flow: FlowTypes.Module_page;
  
  constructor() {}

  ngOnInit() {}
}
