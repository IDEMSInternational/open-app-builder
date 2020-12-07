import { Component, Input } from "@angular/core";

@Component({
  selector: "plh-slide-panel-bottom",
  template: `<section class="main-container" (click)="toggleExpand()" [class.expanded]="expanded">
    <h3 class="panel-header">{{ headerText }}</h3>
    <div class="content">
      <ng-content></ng-content>
    </div>
  </section>`,
  styles: [
    `
      :host {
        --plh-panel-height: 65vh;
        --plh-header-height: 50px;
        --plh-panel-width: 100vw;
        width: 100%;
        height: var(--plh-panel-height);
      }
      .main-container {
        position: absolute;
        z-index: 10;
        background: var(--ion-color-primary);
        height: var(--plh-panel-height);
        margin: auto;
        width: var(--plh-panel-width);
        bottom: calc(var(--plh-panel-height) * -1 + var(--plh-header-height));
        left: 0;
      }
      .main-container.expanded {
        bottom: 0;
      }
      .panel-header {
        text-align: center;
        height: var(--plh-header-height);
        line-height: var(--plh-header-height);
        margin: 0;
      }
      .content {
        background: green;
        height: 100%;
      }
    `,
  ],
})
export class SlidePanelBottomComponent {
  @Input() headerText: string = "";
  expanded = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
