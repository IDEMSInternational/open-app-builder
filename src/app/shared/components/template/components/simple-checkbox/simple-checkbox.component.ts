import { Component, computed } from "@angular/core";
import { FlowTypes } from "packages/data-models";
import { TemplateBaseComponent } from "../base";
import { getBooleanParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";

interface ISimpleCheckboxParams {
  /* TEMPLATE PARAMETER: "reverse". Reverses the checkbox and label positions */
  reverse?: boolean;
  /* TEMPLATE PARAMETER: "align". Sets the alignment of the checkbox */
  position?: string;
  /* TEMPLATE PARAMETER: "label_text". The text label for the checkbox */
  label_text?: string | null;
  /* TEMPLATE PARAMETER: "style". Additional style classes */
  style?: string;
}

@Component({
  selector: "plh-simple-checkbox",
  templateUrl: "./simple-checkbox.component.html",
  styleUrls: ["./simple-checkbox.component.scss"],
})
export class TmplSimpleCheckboxComponent extends TemplateBaseComponent {
  params = computed(() => this.getParams(this.parameterList()));

  constructor() {
    super();
  }

  public async handleChange(isChecked: boolean) {
    await this.setValue(isChecked);
  }

  private getParams(authorParams: FlowTypes.TemplateRow["parameter_list"]): ISimpleCheckboxParams {
    return {
      reverse: getBooleanParamFromTemplateRow(this._row, "reverse", false),
      position: getStringParamFromTemplateRow(this._row, "align", "center"),
      label_text: getStringParamFromTemplateRow(this._row, "label_text", null),
      style: getStringParamFromTemplateRow(this._row, "style", ""),
    };
  }
}
