import { Component, Input } from "@angular/core";

@Component({
  selector: "plh-sub-header",
  template: `
    <ion-header style="background-image:unset" class="ion-no-border">
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button defaultHref="/" slot="start"></ion-back-button>
          <span>{{ title }}</span>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
})
/** Simple header component used to show a secondary navbar below main */
export class PLHSubHeaderComponent {
  @Input() title: string = "";
  constructor() {}
}
