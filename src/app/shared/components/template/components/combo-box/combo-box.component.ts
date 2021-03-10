import { Component, Input } from "@angular/core";
import { ITemplateComponent } from "../tmpl.component";
import { FlowTypes } from "../../../../model";
import { ModalController } from "@ionic/angular";
import { IonModalComponent } from "../../../common/components/ion-modal/ion-modal.component";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "plh-combo-box",
  templateUrl: "./combo-box.component.html",
  styleUrls: ["./combo-box.component.scss"]
})
export class TmplComboBoxComponent implements ITemplateComponent {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
  form: FormGroup | null;

  constructor(private modalController: ModalController) {
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: IonModalComponent,
      cssClass: "my-custom-modal",
      componentProps: {
        "row": this.row,
        "template": this.template,
        "localVariables": this.localVariables,
        "formData": this.form ? this.form : null
      },
      showBackdrop: false
    });

    modal.onDidDismiss().then((data) => {
      this.form = data.data;
    });

    await modal.present();
  }
}
