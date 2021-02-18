import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { ITemplateComponent } from "./tmpl.component";

@Component({
  selector: "plh-tmpl-display-group",
  template: `<div class="display-group">
    <plh-tmpl-comp *ngFor="let childRow of row.rows" [row]="childRow" [template]="template" [localVariables]="localVariables"></plh-tmpl-comp>
  </div>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplDisplayGroupComponent implements ITemplateComponent {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
}