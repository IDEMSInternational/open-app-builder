import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { ModalController } from "@ionic/angular";
import { ComboBoxModalComponent } from "../../../common/components/combo-box-modal/combo-box-modal.component";
import { getParamFromTemplateRow, getStringParamFromTemplateRow } from "src/app/shared/utils";
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
  style: string;
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
      listAnswers && this._row.value ? !listAnswers.find((x) => x === this._row.value) : false;
    if (!this.checkIfContainsDefaultStyles) {
      this.setCustomStyle();
    }
    this.checkTheme();
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
        style: this.style,
      },
      showBackdrop: false,
    });

    modal.onDidDismiss().then(async (data) => {
      const value = data?.data?.answer;
      this._row.value = data?.data?.answer;
      this.customAnswerSelected = data?.data?.customAnswerSelected;
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
