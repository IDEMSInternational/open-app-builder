import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "plh-tmpl-button",
  template: `<ion-button (click)="onClick()">{{row.value}}</ion-button>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplButtonComponent {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;

  onClick() {
  }
}
