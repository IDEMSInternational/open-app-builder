import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "../../../../utils";

@Component({
  selector: "plh-slider-new",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
})
export class TmplSliderComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string };
  help: string | null;
  no_value_text: string = "no_value";
  minValue: number = 0;
  maxValue: number = 7;
  disabled: boolean = false;
  title: string | null;
  step: number = 1;
  value: number | null = 0;
  min_value_label: string | null;
  max_value_label: string | null;
  listNumbers: Array<number> = [];
  no_value: boolean = false;
  rangeBarTouched: boolean = false;
  sliderRange;
  labels_count: number | null = 8;
  constructor() {
    super();
  }

  someKeyboardConfig: any = {
    connect: true,
    start: this.value,
    tooltips: true,
    step: this.step,
    behaviour: "tap",
    pageSteps: 6, // number of page steps, defaults to 10
    range: {
      min: this.minValue,
      max: this.maxValue,
    },
    pips: {
      mode: "count",
      density: 1,
      values: 7,
      stepped: true,
    },
  };

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.help = getStringParamFromTemplateRow(this._row, "help", null);
    this.minValue = getNumberParamFromTemplateRow(this._row, "min", this.minValue);
    this.maxValue = getNumberParamFromTemplateRow(this._row, "max", this.maxValue);
    this.title = getStringParamFromTemplateRow(this._row, "title", null);
    this.step = getNumberParamFromTemplateRow(this._row, "step", this.step);
    this.min_value_label = getStringParamFromTemplateRow(this._row, "min_value_label", null);
    this.max_value_label = getStringParamFromTemplateRow(this._row, "max_value_label", null);
    this.value = this._row.value > this.maxValue ? 0 : this._row.value ? this._row.value : 0;
    this.labels_count = getNumberParamFromTemplateRow(this._row, "labels_count", 8);
    this.no_value_text = getStringParamFromTemplateRow(this._row, "no_value_text", "no_value");
    this.updateConfigParams();
    this.rangeBarTouched = this.value !== 0;
    this.no_value = getBooleanParamFromTemplateRow(this._row, "no_value", false);
  }

  disableSlider() {
    this.no_value = !this.no_value;
    this.rangeBarTouched = !this.rangeBarTouched;
    this.disabled = !this.disabled;
    this._row.value = this.no_value ? this.no_value_text : "null";
    this.triggerActions("changed");
  }

  changeValue() {
    this.rangeBarTouched = true;
    this._row.value = this.value;
    this.setValue(`${this.value}`);
    this.triggerActions("changed");
  }

  updateConfigParams() {
    this.someKeyboardConfig.range.min = this.minValue;
    this.someKeyboardConfig.range.max = this.maxValue;
    this.someKeyboardConfig.step = this.step;
    this.someKeyboardConfig.start = this.value;
    this.someKeyboardConfig.pips.values = this.labels_count;
  }
}
