import { Component, Input } from "@angular/core";

@Component({
  selector: "plh-slide-panel-bottom",
  template: `<section class="main-container" (click)="toggleExpand()" [ngClass]="{'expanded': expanded}">
    <h3 class="panel-header">{{ headerText }}</h3>
    <div class="content">
      <ng-content></ng-content>
    </div>
  </section>`,
  styles: [
    `
      :host {
        --plh-panel-height: 65vh;
        --plh-bottom-panel-header-height: 50px;
        --plh-panel-width: 100vw;
        --plh-bottom-panel-border-radius: 30px 30px 0px 0px;
        width: 100vw;
      }
      .main-container {
        position: fixed;
        z-index: 10;
        background: #096B8B;
        color: white;
        height: var(--plh-panel-height);
        margin: auto;
        width: var(--plh-panel-width);
        bottom: calc(var(--plh-panel-height) * -1 + var(--plh-bottom-panel-header-height));
        border-radius: var(--plh-bottom-panel-border-radius);
        border-style: solid;
        border-width: 1px;
        border-color: rgba(0, 0, 0, 0.5);
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
        transition: bottom 0.3s ease-out;
      }
      .main-container.expanded {
        bottom: 0;
      }
      .panel-header {
        text-align: center;
        height: var(--plh-bottom-panel-header-height);
        line-height: var(--plh-bottom-panel-header-height);
        margin: 0;
        background: #096B8B;
        border-radius: var(--plh-bottom-panel-border-radius);
      }
      .content {
        background: #096B8B;
        height: 100%;
      }
    `,
  ],
})
export class SlidePanelBottomComponent {
  @Input() headerText: string = "";
  expanded = false;

  public toggleExpand() {
    this.expanded = !this.expanded;
  }

  public close() {
    this.expanded = false;
  }
}
