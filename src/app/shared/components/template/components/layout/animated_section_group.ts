import { Component } from "@angular/core";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-tmpl-animated-section-group",
  template: `<div class="animated-section-group">
    <plh-template-component
      *ngFor="let childRow of _row.rows; index as i"
      [row]="childRow"
      [parent]="parent"
      [uid]="uid + '_' + i"
    ></plh-template-component>
  </div>`,
})
export class AnimatedSectionGroupComponent extends TemplateBaseComponent {}
