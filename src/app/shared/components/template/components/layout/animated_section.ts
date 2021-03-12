import { Component } from "@angular/core";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-tmpl-animated-section",
  template: `<div class="animated-section" [ngClass]="{'debug-border': showBorders}">
    <p *ngIf="showBorders" class="debug-title">{{_row.name}}</p>
    <plh-template-component
      *ngFor="let childRow of _row.rows"
      [row]="childRow"
      [parent]="parent"
    ></plh-template-component>
  </div>`,
  styles: [
    `.debug-title {
      color: red;
    }
    
    .debug-border {
      border: 1px solid red;
      padding: 2px;
      margin: 2px;
    }`
  ]
})
export class AnimatedSectionComponent extends TemplateBaseComponent {

  showBorders = false;

  constructor() {
    super();
    this.showBorders = location.href.indexOf("showTemplates=true") > -1;
  }

}
