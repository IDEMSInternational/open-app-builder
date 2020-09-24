import { Component } from "@angular/core";

@Component({
  selector: "plh-main-header",
  template: `<ion-header>
    <ion-toolbar color="primary">
      <ion-buttons slot="start">
        <ion-back-button defaultHref="/" icon="home"></ion-back-button>
      </ion-buttons>
      <ion-title style="text-align: center">
        <ion-icon
          src="assets/images/star.svg"
          style="margin: -1px 8px"
        ></ion-icon>
        <span>STARS</span>
      </ion-title>
      <ion-buttons slot="end">
        <ion-menu-button></ion-menu-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>`,
})
export class PLHMainHeaderComponent {
  constructor() {}
}
