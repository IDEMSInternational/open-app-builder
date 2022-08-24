import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { ModalController } from "@ionic/angular";
import { ComboBoxModalComponent } from "./combo-box-modal/combo-box-modal.component";
import {
  getBooleanParamFromTemplateRow,
  getParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { TemplateService } from "../../services/template.service";
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "plh-combo-box",
  templateUrl: "./combo-box.component.html",
  styleUrls: ["./combo-box.component.scss"],
})
export class TmplComboBoxComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit, OnDestroy
{
  @Input() template: FlowTypes.Template;
  placeholder: string;
  prioritisePlaceholder: boolean;
  style: string;
  text = "";
  customAnswerSelected: boolean = false;
  destroy$ = new ReplaySubject(1);
  constructor(private modalController: ModalController, private templateService: TemplateService) {
    super();
  }

  ngOnInit(): void {
    this.getParams();
    const listAnswers: string[] = getParamFromTemplateRow(this._row, "answer_list", null);
    this.customAnswerSelected =
      listAnswers && this._row.value
        ? !listAnswers.find((x) => x.includes(this._row.value))
        : false;
    this.text = this.getText(this._row.value, listAnswers);
  }

  getParams() {
    this.placeholder = getStringParamFromTemplateRow(this._row, "placeholder", "");
    this.prioritisePlaceholder = getBooleanParamFromTemplateRow(
      this._row,
      "prioritise_placeholder",
      false
    );
    this.style = getStringParamFromTemplateRow(this._row, "style", "");
  }

  getText(aValue: string, listAnswers: string[]): string {
    if (aValue) {
      if (aValue === "other") {
        return this._row.parameter_list["customAnswer"];
      }
      const textFromList = listAnswers
        .find((answer: string) => answer.includes(aValue))
        ?.match(/(?<=text:).+/)[0]
        .trim();
      return textFromList ? textFromList : aValue;
    }
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ComboBoxModalComponent,
      cssClass: "combo-box-modal",
      componentProps: {
        row: this._row,
        template: this.template,
        selectedValue: this.customAnswerSelected ? this.text : this._row.value,
        customAnswerSelected: this.customAnswerSelected,
        style: this.style,
      },
      showBackdrop: false,
    });

    modal.onDidDismiss().then(async (data) => {
      this.prioritisePlaceholder = false;
      const value = data?.data?.answer?.name;
      this.text = data?.data?.answer?.text;
      this.customAnswerSelected = data?.data?.customAnswerSelected;
      if (this.customAnswerSelected) {
        this._row.parameter_list["customAnswer"] = data?.data?.answer?.text;
      } else {
        this._row.parameter_list["customAnswer"] = null;
      }
      await this.setValue(value);
      await this.triggerActions("changed");
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
