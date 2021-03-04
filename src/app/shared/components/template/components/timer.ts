import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { ITemplateComponent } from "./tmpl.component";

@Component({
  selector: "plh-tmpl-timer",
  template: `<p>Timer to be implemented</p>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplTimerComponent implements ITemplateComponent, OnInit {

  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string};

  constructor() {}

  ngOnInit() {}
}
