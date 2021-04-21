import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { ModalController } from "@ionic/angular";
import { ComboBoxModalComponent } from "../../../common/components/combo-box-modal/combo-box-modal.component";
import { getParamFromTemplateRow, getStringParamFromTemplateRow } from "src/app/shared/utils";
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
  style: string;
  customAnswerSelected: boolean = false;
  checkIfContainsDefaultStyles: boolean = false;

  constructor(private modalController: ModalController) {
    super();
  }

  ngOnInit(): void {
    this.getParams();
    const listAnswers = getParamFromTemplateRow(this._row, "answer_list", null) as string;
    const arrValues = listAnswers.split(",").filter((item) => item !== "");
    this.customAnswerSelected =
      arrValues && this._row.value ? !arrValues.find((x) => x === this._row.value) : false;
    if (!this.checkIfContainsDefaultStyles) {
      this.setCustomStyle();
    }
  }

  getParams() {
    this.placeholder = getStringParamFromTemplateRow(this._row, "placeholder", "");
    this.style = getStringParamFromTemplateRow(this._row, "style", "");
    this.checkIfContainsDefaultStyles =
      this.style.includes("active") || this.style.includes("passive");
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
      this.triggerActions("changed");
      this._row.value = data?.data?.answer;
      this.customAnswerSelected = data?.data?.customAnswerSelected;
    });
    await modal.present();
  }

  setCustomStyle() {
    const currentBgColor = document.body.style
      .getPropertyValue("--ion-background-color")
      .toLocaleLowerCase();
    const nameBgColor: string =
      currentBgColor === "#FFF6D6".toLocaleLowerCase() ? "active" : "passive";
    return nameBgColor === "active" ? this.setActiveTheme() : this.setPassiveTheme();
  }

  setActiveTheme() {
    document.body.style.setProperty(
      "--combo-box-no-answer-bg",
      "var(--combo-box-active-no-answer-bg)"
    );
    document.body.style.setProperty(
      "--combo-box-with-answer-bg",
      "var(--combo-box-active-with-answer-bg)"
    );
  }

  setPassiveTheme() {
    document.body.style.setProperty(
      "--combo-box-no-answer-bg",
      "var(--combo-box-passive-no-answer-bg)"
    );
    document.body.style.setProperty(
      "--combo-box-with-answer-bg",
      "var(--combo-box-passive-with-answer-bg)"
    );
  }
}
