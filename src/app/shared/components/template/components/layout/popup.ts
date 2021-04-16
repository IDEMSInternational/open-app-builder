import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FlowTypes, ITemplateContainerProps } from "../../models";
import { TemplateContainerComponent } from "../../template-container.component";

@Component({
  template: `<div class="popup-backdrop">
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
      }
      .popup-backdrop {
        height: calc(100vh - 40px);
        width: 100%;
        margin-top: 40px;
      }
      .popup-content {
        width: 80%;
        max-height: calc(100vh - 140px);
        background: white;
        border: 2px solid black;
        border-radius: 40px;
        padding: 20px;
      }
      .close-button {
        margin-left: auto;
        margin-top: -10px;
        margin-right: -10px;
        height: 36px;
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

  dismiss(emit?: string) {
    this.modalCtrl.dismiss(emit);
  }
}
