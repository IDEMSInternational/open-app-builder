import { Component } from "@angular/core";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-tmpl-animated-section",
  template: `<div class="animated-section">
    <plh-template-component
      *ngFor="let childRow of _row.rows"
      [row]="childRow"
      [parent]="parent"
    ></plh-template-component>
  </div>`,
})
export class AnimatedSectionComponent extends TemplateBaseComponent {}
