import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { ModalController } from "@ionic/angular";
import { ComboBoxModalComponent } from "./combo-box-modal/combo-box-modal.component";
import {
  IAnswerListItem,
  getAnswerListParamFromTemplateRow,
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { ReplaySubject } from "rxjs";

@Component({
  selector: "plh-combo-box",
  templateUrl: "./combo-box.component.html",
  styleUrls: ["./combo-box.component.scss"],
})
export class TmplComboBoxComponent extends TemplateBaseComponent implements OnInit, OnDestroy {
  @Input() template: FlowTypes.Template;
  placeholder: string;
  prioritisePlaceholder: boolean;
  style: string;
  text = "";
  customAnswerSelected: boolean = false;
  customAnswerText: string;
  answerList: IAnswerListItem[];
  private componentDestroyed$ = new ReplaySubject(1);

  constructor(private modalController: ModalController) {
    super();
  }

  ngOnInit(): void {
    this.getParams();

    this.customAnswerSelected =
      this.answerList.length > 0 && this._row.value
        ? !this.answerList.find((x) => x.name === this._row.value)
        : false;

    this.text = "";
    if (this._row.value) {
      this.text = this.customAnswerSelected
        ? this.customAnswerText
        : this.answerList.find((answerListItem) => answerListItem.name === this._row.value)?.text;
    }
  }

  getParams() {
    this.placeholder = getStringParamFromTemplateRow(this._row, "placeholder", "");
    this.prioritisePlaceholder = getBooleanParamFromTemplateRow(
      this._row,
      "prioritise_placeholder",
      false
    );
    this.style = getStringParamFromTemplateRow(this._row, "style", "");
    this.answerList = getAnswerListParamFromTemplateRow(this._row, "answer_list", []);
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
      this.text = data?.data?.answer?.text;
      this.customAnswerSelected = data?.data?.customAnswerSelected;
      this.customAnswerText = this.customAnswerSelected
        ? (this.text = data?.data?.answer?.text)
        : "";
      await this.setValue(data?.data?.answer?.name);
      await this.triggerActions("changed");
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
