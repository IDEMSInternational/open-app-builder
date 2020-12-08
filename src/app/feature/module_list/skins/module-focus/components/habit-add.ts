import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "plh-habit-add",
  template: ` <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-button (click)="modalCtrl.dismiss()"
            ><ion-icon slot="icon-only" name="chevron-back-outline"></ion-icon
          ></ion-button>
        </ion-buttons>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content color="primary">
      <div class="main-container-overlay ion-padding"></div>
    </ion-content>`,
  styles: [
    `
      /* copied css, should probably be moved somewhere else  */
      .main-container-overlay {
        background: rgba(255, 255, 255, 0.85);
        height: 100%;
      }
    `,
  ],
})
export class HabitAddComponent {
  constructor(public modalCtrl: ModalController) {}
}
