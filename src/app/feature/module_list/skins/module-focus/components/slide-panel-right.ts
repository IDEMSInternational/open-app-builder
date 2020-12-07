import { Component, Input } from "@angular/core";

@Component({
  selector: "plh-slide-panel-right",
  template: ` <section class="main-container" (click)="toggleExpand()" [class.expanded]="expanded">
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
        --plh-panel-width: 90vw;
      }

      .main-container {
        position: absolute;
        z-index: 2;
        background: red;
        right: calc(var(--plh-panel-width) * -1 + var(--plh-header-height));
        height: var(--plh-panel-height);
        margin: auto;
        width: var(--plh-panel-width);
        top: 50%;
        bottom: 50%;
      }
      .main-container.expanded {
        right: 0;
      }
      .content {
        margin-left: var(--plh-header-height);
        padding: 8px;
        background: yellow;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
      }

      .panel-header {
        position: relative;
        top: 100%;
        left: 0;
        transform-origin: 0 0;
        transform: rotate(-90deg);
        height: var(--plh-header-height);
        line-height: var(--plh-header-height);
        margin: 0;
        width: var(--plh-panel-height);
        text-align: center;
      }
    `,
  ],
})
export class SlidePanelRightComponent {
  @Input() headerText: string = "";
  expanded = false;

  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
