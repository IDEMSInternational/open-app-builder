import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

export interface IStackConfig {
  templateName: string;
  title?: string;
  showCloseButton?: boolean;
}

/** The logic for stack open/dismiss exists in the stack-navigation service */
@Component({
  selector: "plh-stack",
  templateUrl: "./stack.component.html",
  styleUrls: ["./stack.component.scss"],
})
export class StackComponent {
  private _config: IStackConfig = {
    templateName: "",
    showCloseButton: true,
  };
  // Merge input values with defaults, ignoring any `undefined` values
  @Input()
  set config(config: IStackConfig) {
    this._config = {
      ...this._config,
      ...Object.fromEntries(Object.entries(config).filter(([_, v]) => v !== undefined)),
    };
  }
  get config(): IStackConfig {
    return this._config;
  }

  constructor(private modalCtrl: ModalController) {}

  public close() {
    this.modalCtrl.dismiss();
  }
}
