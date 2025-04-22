import { Component, computed, OnInit, signal, WritableSignal } from "@angular/core";
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
export class TmplDateTimePickerComponent extends TemplateBaseComponent implements OnInit {
  public dateTimeValue: WritableSignal<string | undefined>;
  public params = computed(() => this.getParams());
  public name = computed(() => this.rowSignal()?.name);

  constructor() {
    super();
  }

  public ngOnInit(): void {
    this.dateTimeValue = signal(this.value() || undefined);
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
