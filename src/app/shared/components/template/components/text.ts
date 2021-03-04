import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { ITemplateComponent } from "./tmpl.component";

@Component({
  selector: "plh-tmpl-text",
  template: `<p>{{row.value | localVarsReplace: localVariables}}</p>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplTextComponent implements ITemplateComponent, OnInit {

  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string};

  constructor() {}

  ngOnInit() {}
}
