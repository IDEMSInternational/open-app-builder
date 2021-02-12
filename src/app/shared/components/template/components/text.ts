import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "plh-tmpl-text",
  template: `<p>{{row.value}}</p>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplTextComponent implements OnInit {

  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string};

  constructor() {}

  ngOnInit() {}
}
