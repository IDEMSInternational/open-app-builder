import { Component } from "@angular/core";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-button",
  template: `<ion-button (click)="triggerActions('click')">{{ _row.value }}</ion-button>`,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplButtonComponent extends TemplateBaseComponent {}
