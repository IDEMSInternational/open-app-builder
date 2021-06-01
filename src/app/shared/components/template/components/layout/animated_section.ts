import { Component, ElementRef, OnInit } from "@angular/core";
import { TemplateLayoutComponent } from "./layout";

@Component({
  selector: "plh-tmpl-animated-section",
  template: `<div class="animated-section">
    <plh-template-component
      *ngFor="let childRow of _row.rows"
      [row]="childRow"
      [parent]="parent"
    ></plh-template-component>
  </div>`,
  styles: [
    `
      .animated-section {
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      :host {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class AnimatedSectionComponent extends TemplateLayoutComponent implements OnInit {
  constructor(private elRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.parent.handleActionsCallback = async () => {
      // Temporary workaround to always scroll to top after actions triggered within animated section (uncomment)
      // this.scrollToTop();
    };
    // 2021-05-07 - to confirm, assume this is to ensure buttons appear at bottom of screen...
    this.elRef.nativeElement.style.setProperty("height", "100%");
    this.elRef.nativeElement.parentElement.parentElement.style.setProperty("height", "100%");
  }
}
