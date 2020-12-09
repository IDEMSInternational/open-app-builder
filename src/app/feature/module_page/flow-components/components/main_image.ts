import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "module-list-flow-main-image",
  template: `<img [src]="'assets/images/modules/mod_' + flow.module + '/home.svg'">`,
  styles: [
    `img {
      width: 200px;
      position: absolute;
      right: 20px;
    }`
  ]
})
export class MainImageFlowComponent implements OnInit {

  @Input() row: FlowTypes.Module_pageRow;
  @Input() flow: FlowTypes.Module_page;

  constructor() {}

  ngOnInit() {}
}
