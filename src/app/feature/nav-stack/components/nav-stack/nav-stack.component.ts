import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

export interface INavStackConfig {
  templateName: string;
  title?: string;
  showCloseButton?: boolean;
  // If true, the default nav-stack header will be ignored by content
  useTemplateHeader?: boolean;
}

/** The logic for nav-stack open/dismiss exists in the nav-stack service */
@Component({
  selector: "tmpl-nav-stack",
  templateUrl: "./nav-stack.component.html",
})
export class NavStackComponent {
  @Input() config: INavStackConfig;
  constructor(private modalCtrl: ModalController) {}

  public close() {
    this.modalCtrl.dismiss();
  }
}
