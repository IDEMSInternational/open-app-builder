import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { ModalController } from "@ionic/angular";
import { ComboBoxModalComponent } from "../../../common/components/combo-box-modal/combo-box-modal.component";
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
  implements ITemplateRowProps, OnInit, OnDestroy {
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
  placeholder: string;
  prioritisePlaceholder: boolean;
  style: string;
  text = "";
  customAnswerSelected: boolean = false;
  checkIfContainsDefaultStyles: boolean = false;
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
    if (!this.checkIfContainsDefaultStyles) {
      this.setCustomStyle();
    }
    this.checkTheme();
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
    this.checkIfContainsDefaultStyles =
      this.style.includes("active") || this.style.includes("passive");
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
      cssClass: "my-custom-modal",
      componentProps: {
        row: this._row,
        template: this.template,
        localVariables: this.localVariables,
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

  setCustomStyle() {
    const currentBgColor = document.body.style
      .getPropertyValue("--ion-background-color")
      .toLocaleLowerCase();
    const nameBgColor: string =
      currentBgColor === "#FFF6D6".toLocaleLowerCase() ? "active" : "passive";
    return this.setTheme(nameBgColor);
  }

  setTheme(themeName: string) {
    document.body.style.setProperty(
      `--combo-box-no-answer-bg`,
      `var(--combo-box-${themeName}-no-answer-bg`
    );
    document.body.style.setProperty(
      `--combo-box-with-answer-bg`,
      `var(--combo-box-${themeName}-with-answer-bg`
    );
  }

  checkTheme() {
    return (
      !this.checkIfContainsDefaultStyles &&
      this.templateService.currentTheme.pipe(takeUntil(this.destroy$)).subscribe((value) => {
        this.style = value;
        this.setTheme(value);
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
