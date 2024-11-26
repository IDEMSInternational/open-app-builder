import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

export interface INavStackConfig {
  templateName: string;
  title?: string;
  showCloseButton?: boolean;
}

/** The logic for nav-stack open/dismiss exists in the nav-stack service */
@Component({
  selector: "tmpl-nav-stack",
  templateUrl: "./nav-stack.component.html",
  styleUrls: ["./nav-stack.component.scss"],
})
export class NavStackComponent {
  private _config: INavStackConfig = {
    templateName: "",
    showCloseButton: true,
  };
  // Merge input values with defaults, ignoring any `undefined` values
  @Input()
  set config(config: INavStackConfig) {
    this._config = {
      ...this._config,
      ...Object.fromEntries(Object.entries(config).filter(([_, v]) => v !== undefined)),
    };
  }
  get config(): INavStackConfig {
    return this._config;
  }

  constructor(private modalCtrl: ModalController) {}

  public close() {
    this.modalCtrl.dismiss();
  }
}
