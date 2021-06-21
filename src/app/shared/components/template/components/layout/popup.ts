import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FlowTypes, ITemplateContainerProps } from "../../models";
import { TemplateContainerComponent } from "../../template-container.component";

@Component({
  template: `<div class="popup-backdrop" (click)="dismissOnBackdrop($event.target)">
    <div class="popup-content">
      <ion-button (click)="dismiss()" class="close-button" fill="clear">
        <ion-icon slot="icon-only" name="close"></ion-icon>
      </ion-button>
      <plh-template-container
        class="template-container"
        [name]="name"
        [templatename]="templatename"
        [parent]="parent"
        [row]="row"
      ></plh-template-container>
    </div>
  </div>`,
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
      .popup-content {
        width: 90%;
        max-height: calc(100vh - 140px);
        background: white;
        border-radius: 30px;
        padding: 0px 20px 20px 20px;
        overflow: auto;
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

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  dismissOnBackdrop(el: HTMLElement) {
    if (el.classList.contains("popup-backdrop")) {
      this.dismiss();
    }
  }

  dismiss(emit?: string) {
    this.modalCtrl.dismiss(emit);
  }
}
