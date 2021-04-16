import { AfterViewInit, Component, ElementRef, OnInit } from "@angular/core";
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
      /*:host ::ng-deep plh-template-component{*/
      /*   height: 100%;*/
      /* }*/
    `,
  ],
})
export class AnimatedSectionComponent extends TemplateBaseComponent implements AfterViewInit {
  constructor(private elRef: ElementRef) {
    super();
  }

  ngAfterViewInit() {
    this.elRef.nativeElement.style.setProperty("height", "100%");
    this.elRef.nativeElement.parentElement.parentElement.style.setProperty("height", "100%");
  }
}
