import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
// import { TemplateBaseComponent } from '../../../shared/components/template/components/base';

/** The logic for stack open/dismiss exists in the stack-navigation service */
@Component({
  selector: "plh-stack",
  templateUrl: "./stack.component.html",
  styleUrls: ["./stack.component.scss"],
})
export class StackComponent {
  @Input() templatename: string;

  constructor(private modalCtrl: ModalController) {}

  public close() {
    console.log("close");
    this.modalCtrl.dismiss();
  }
}
