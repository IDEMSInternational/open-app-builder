import { Component, computed, OnInit, Signal } from "@angular/core";
// import {
//   getBooleanParamFromTemplateRow,
//   getNumberParamFromTemplateRow,
//   getStringParamFromTemplateRow,
// } from "../../../../utils";
import { FlowTypes } from "packages/data-models";
import { ReactiveBaseComponent } from "../../reactive-base.component";
import { IonInput } from "@ionic/angular/standalone";

interface ITextBoxParams {
  disabled: boolean;
  isNumberInput: boolean;
  maxLength: number;
  placeholder: string;
  prioritisePlaceholder: boolean;
  style: string;
  textAlign: string;
}

@Component({
  selector: "oab-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
  imports: [IonInput],
  standalone: true,
})
export class TextBoxComponent extends ReactiveBaseComponent {
  // public params: Signal<ITextBoxParams> = computed(() => this.getParams(this.parameterList()));
  // public async handleChange(value: any) {
  //   await this.setValue(value);
  // }
  // getParams(authorParams?: FlowTypes.TemplateRow["parameter_list"]): ITextBoxParams {
  //   return {
  //     disabled: getBooleanParamFromTemplateRow(this._row, "disabled", false),
  //     isNumberInput: getBooleanParamFromTemplateRow(this._row, "number_input", false),
  //     maxLength: getNumberParamFromTemplateRow(this._row, "max_length", -1),
  //     placeholder: getStringParamFromTemplateRow(this._row, "placeholder", ""),
  //     prioritisePlaceholder: getBooleanParamFromTemplateRow(
  //       this._row,
  //       "prioritise_placeholder",
  //       false
  //     ),
  //     style: getStringParamFromTemplateRow(this._row, "style", null),
  //     textAlign: getStringParamFromTemplateRow(this._row, "text_align", ""),
  //   };
  // }
}
