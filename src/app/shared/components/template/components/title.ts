import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { ITemplateComponent } from "./tmpl.component";

@Component({
  selector: "plh-tmpl-title",
  template: `<h1>{{row.value | localVarsReplace: localVariables}}</h1>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplTitleComponent implements ITemplateComponent, OnInit {

  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };

  constructor() {}

  ngOnInit() {}
}
