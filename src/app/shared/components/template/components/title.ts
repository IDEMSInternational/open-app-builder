import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "plh-tmpl-title",
  template: `<h1>{{row.value}}</h1>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplTitleComponent implements OnInit {

  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;

  constructor() {}

  ngOnInit() {}
}
