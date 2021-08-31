import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FlowTypes, ITemplateContainerProps } from "../../models";
import { TemplateContainerComponent } from "../../template-container.component";

@Component({
  template: `
    <div
      class="popup-backdrop"
      (click)="dismissOnBackdrop($event)"
      [attr.data-standalone]="standalone"
    >
      <div class="popup-content" [attr.data-standalone]="standalone">
        <ion-button (click)="dismiss()" class="close-button" fill="clear" *ngIf="!standalone">
          <ion-icon slot="icon-only" name="close"></ion-icon>
        </ion-button>
        <plh-template-container
          class="template-container"
          [name]="name"
          [templatename]="templatename"
          [parent]="parent"
          [row]="row"
          (emittedValue)="handleEmittedValue($event)"
        ></plh-template-container>
      </div>
    </div>
  `,
  styles: [
    `
      .popup-backdrop,
      .popup-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
      }
      .popup-backdrop {
        height: calc(100vh - 40px);
        width: 100%;
        margin-top: 40px;
        background: rgba(0, 0, 0, 0.6);
      }
      .popup-backdrop[data-standalone] {
        height: 100vh;
        margin-top: 0;
        background: white;
      }

      .popup-content {
        width: 85%;
        max-height: calc(100vh - 140px);
        background: white;
        border-radius: 30px;
        padding: 0px 20px 20px 20px;
        overflow: auto;
      }
      .popup-content[data-standalone] {
        width: 100%;
        height: 100%;
        max-height: 100%;
        border-radius: 0;
      }
      .popup-content::-webkit-scrollbar {
        display: none;
      }
      .close-button {
        position: sticky;
        min-height: 40px;
        width: 105%;
        padding-top: 7px;
        top: 0;
        right: 0;
        z-index: 3;
      }
      ion-button::part(native) {
        font-size: 14px;
        width: 30%;
        height: 30px;
        position: absolute;
        right: -35px;
        top: 15px;
      }
      .template-container {
        flex: 1;
        width: 100%;
      }
    `,
  ],
})
/**
 * When opening a template as a popup, provide a minimal interface and load
 * the template directly as a regular template-container element
 */
export class TemplatePopupComponent implements ITemplateContainerProps, OnInit {
  @Input() name: string;
  @Input() templatename: string;
  @Input() parent?: TemplateContainerComponent;
  @Input() row?: FlowTypes.TemplateRow;
  /** Standalone mode shows in fullscreen and dismisses on completed/uncompleted emit events */
  @Input() standalone?: boolean;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  /**
   * When templates emit completed/uncompleted value from standalone popup close the popup
   * NOTE - we do not want to respond to non-standalone templates as this is done through template nav-actions
   * */
  handleEmittedValue(value: string) {
    if (this.standalone) {
      if (["completed", "uncompleted"].includes(value)) {
        this.dismiss(value);
      }
    }
  }

  dismissOnBackdrop(e: MouseEvent) {
    const el = e.target as HTMLElement;
    if (el.classList.contains("popup-backdrop")) {
      this.dismiss();
    }
  }

  dismiss(emit?: string) {
    this.modalCtrl.dismiss(emit);
  }
}
