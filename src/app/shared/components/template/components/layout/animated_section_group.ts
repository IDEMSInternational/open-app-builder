import { Component } from "@angular/core";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-tmpl-animated-section-group",
  template: `<div class="animated-section-group">
    <plh-template-component
      *ngFor="let childRow of _row.rows | filterDisplayComponent; trackBy: trackByRow"
      [row]="childRow"
      [parent]="parent"
    ></plh-template-component>
  </div>`,
})
export class AnimatedSectionGroupComponent extends TemplateBaseComponent {}
