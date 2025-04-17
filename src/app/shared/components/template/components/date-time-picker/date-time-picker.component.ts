import { Component, computed, signal } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getStringParamFromTemplateRow, parseBoolean } from "src/app/shared/utils";

interface IDateTimePickerParams {
  /** TEMPLATE PARAMETER: "disabled". If true, date time picker is disabled and greyed out */
  disabled: boolean;
  /** TEMPLATE PARAMETER: "type". Determines the type of picker date & time ('datetime'), date only ('date') or time only ('time') picker*/
  type: string;
}

@Component({
  selector: "plh-date-time-picker",
  templateUrl: "./date-time-picker.component.html",
  styleUrls: ["./date-time-picker.component.scss"],
})
export class TmplDateTimePickerComponent extends TemplateBaseComponent {
  public initialValue = this.value() ? this.value : signal(new Date().toISOString().slice(0, 16));
  public params = computed(() => this.getParams());
  public name = computed(() => this.rowSignal()?.name);

  constructor() {
    super();
  }

  public handleChange(value: string | string[]) {
    this.setValue(value);
  }

  private getParams(): IDateTimePickerParams {
    let parameterList = this.parameterList();

    return {
      disabled: parseBoolean(parameterList.disabled),
      type: getStringParamFromTemplateRow(this._row, "type", "date-time"),
    };
  }
}
