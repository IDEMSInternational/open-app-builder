import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { ModalController } from "@ionic/angular";
import { ComboBoxModalComponent } from "../../../common/components/combo-box-modal/combo-box-modal.component";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";

@Component({
  selector: "plh-combo-box",
  templateUrl: "./combo-box.component.html",
  styleUrls: ["./combo-box.component.scss"],
})
export class TmplComboBoxComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };

  placeholder: string;
  customAnswerSelected: boolean = false;

  constructor(private modalController: ModalController) {
    super();
  }

  ngOnInit(): void {
    this.getParams();
    const listAnswers = getStringParamFromTemplateRow(this._row, "list_of_answers", null);
    this.customAnswerSelected =
      listAnswers && this._row.value
        ? !listAnswers.split(";").find((x) => x === this._row.value)
        : false;
    this._row.value = this._row.value || this.placeholder;
  }

  getParams() {
    this.placeholder = getStringParamFromTemplateRow(this._row, "placeholder", "");
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ComboBoxModalComponent,
      cssClass: "my-custom-modal",
      componentProps: {
        row: this._row,
        template: this.template,
        localVariables: this.localVariables,
        selectedValue: this._row.value,
        customAnswerSelected: this.customAnswerSelected,
      },
      showBackdrop: false,
    });

    modal.onDidDismiss().then((data) => {
      this._row.value = data?.data?.answer || this.placeholder;
      this.customAnswerSelected = data?.data?.customAnswerSelected;
    });

    await modal.present();
  }
}
