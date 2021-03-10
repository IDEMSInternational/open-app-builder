import { Component, Input, OnInit } from "@angular/core";
import { ITemplateComponent } from "../tmpl.component";
import { FlowTypes } from "../../../../model";
import { ModalController } from "@ionic/angular";
import { IonModalComponent } from "../../../common/components/ion-modal/ion-modal.component";

@Component({
  selector: "plh-combo-box",
  templateUrl: "./combo-box.component.html",
  styleUrls: ["./combo-box.component.scss"]
})
export class TmplComboBoxComponent implements ITemplateComponent, OnInit {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };

  constructor(private modalController: ModalController) {
  }

  ngOnInit() {
    this.openModal();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: IonModalComponent,
      cssClass: "my-custom-modal",
      componentProps: {
        "row": this.row,
        "template": this.template,
        "localVariables": this.localVariables
      },
      showBackdrop: false
    });
    await modal.present();
  }
}
