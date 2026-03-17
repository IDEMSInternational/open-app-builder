import { Component } from "@angular/core";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-tmpl-animated-section-group",
  template: `<div class="animated-section-group">
    @for (childRow of _row.rows | filterDisplayComponent; track trackByRow($index, childRow)) {
      <plh-template-component [row]="childRow" [parent]="parent"></plh-template-component>
    }
  </div>`,
  standalone: false,
})
export class AnimatedSectionGroupComponent extends TemplateBaseComponent {}
