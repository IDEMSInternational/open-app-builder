import { Component, ElementRef, OnInit } from "@angular/core";
import { TemplateLayoutComponent } from "./layout";

@Component({
  selector: "plh-tmpl-animated-section",
  template: `
    <plh-template-component
      *ngFor="let childRow of _row.rows; trackBy: trackByRow"
      [row]="childRow"
      [parent]="parent"
    ></plh-template-component>
  `,
  styles: [
    `
      :host {
        width: 100%;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
    `,
  ],
})
export class AnimatedSectionComponent extends TemplateLayoutComponent implements OnInit {
  ngOnInit() {
    this.parent.templateActionService.handleActionsCallback = async () => {
      // Temporary workaround to always scroll to top after actions triggered within animated section (uncomment)
      // this.scrollToTop();
    };
  }
}
