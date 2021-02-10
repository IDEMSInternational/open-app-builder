import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "plh-tmpl-video",
  template: `<video [src]="row.value">`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplVideoComponent implements OnInit {

  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;

  constructor() {}

  ngOnInit() {}
}
