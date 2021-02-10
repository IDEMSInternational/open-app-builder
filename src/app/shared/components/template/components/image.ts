import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "plh-tmpl-image",
  template: `<img [src]="row.value">`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplImageComponent {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
}
