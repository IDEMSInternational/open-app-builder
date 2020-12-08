import { Component, Input } from "@angular/core";

@Component({
  selector: "plh-slide-panel-right",
  template: `
    <section class="main-container" [class.expanded]="expanded" (click)="toggleExpand()">
      <div class="background-overlay"></div>
      <h3 class="panel-header">{{ headerText }}</h3>
      <div class="content">
        <ng-content></ng-content>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        --plh-panel-height: 65vh;
        --plh-header-height: 50px;
        --plh-panel-width: 90vw;
      }
      .background-overlay {
        position: relative;
        background: var(--ion-color-primary);
        filter: brightness(3.5) opacity(0.2);
        top: 0;
        left: 0;
      }

      .main-container,
      .background-overlay {
        z-index: 2;
        right: calc(var(--plh-panel-width) * -1 + var(--plh-header-height));
        margin: auto;
        height: var(--plh-panel-height);
        width: var(--plh-panel-width);
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        border-width: 1px;
        transition: right 0.3s linear;
      }
      .main-container {
        position: absolute;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.5);
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
        background: white;
        top: 50%;
        bottom: 50%;
      }
      .main-container.expanded,
      .background-overlay.expanded {
        right: 0;
      }
      .content {
        margin-left: var(--plh-header-height);
        padding: 8px;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 3;
      }

      .panel-header {
        position: absolute;
        top: 100%;
        left: 0;
        transform-origin: 0 0;
        transform: rotate(-90deg);
        height: var(--plh-header-height);
        line-height: var(--plh-header-height);
        margin: 0;
        width: var(--plh-panel-height);
        text-align: center;
        z-index: 3;
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
