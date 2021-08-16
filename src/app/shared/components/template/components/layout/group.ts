import { Component } from "@angular/core";
import { TemplateLayoutComponent } from "./layout";

@Component({
  selector: "plh-tmpl-group",
  template: `
    <plh-template-component
      *ngFor="let childRow of _row.rows; trackBy: trackByRow"
      [row]="childRow"
      [parent]="parent"
    ></plh-template-component>
  `,
  styleUrls: ["../tmpl-components-common.scss"],
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class TmplGroupComponent extends TemplateLayoutComponent {}
