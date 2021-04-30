import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "../../../../utils";
import { NouisliderComponent } from "ng2-nouislider";
import { Options } from "nouislider";

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
  @ViewChild("slider") slider: NouisliderComponent;
  help: string | null;
  no_value_text: string = "no_value";
  minValue: number = 0;
  maxValue: number = 7;
  disabled: boolean = false;
  title: string | null;
  step: number = 1;
  sliderValue: number | null = 0;
  min_value_label: string | null;
  max_value_label: string | null;
  listNumbers: Array<number> = [];
  no_value: boolean = false;
  labels_count: number | null = 8;

  // Note - not all config options are actually supported by ng2-nouislider (need to dig into code to see what is)
  sliderConfig: Options = {
    connect: true,
    start: 0,
    tooltips: true,
    step: this.step,
    behaviour: "tap",
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
    this.sliderValue = this._row.value > this.maxValue ? undefined : this._row.value;
    this.labels_count = getNumberParamFromTemplateRow(this._row, "labels_count", 8);
    this.no_value_text = getStringParamFromTemplateRow(this._row, "no_value_text", "no_value");
    this.updateConfigParams();
    this.no_value = getBooleanParamFromTemplateRow(this._row, "no_value", false);
  }

  async toggleNACheckbox() {
    if (this._row.value === "no_value") {
      // if restoring functionality assume the value reverts to last known or undefined
      await this.changeValue(this.sliderValue);
    } else {
      // if removing functionality specify the value as no_value
      await this.changeValue("no_value");
    }
  }

  async changeValue(value: number | "no_value") {
    await this.setValue(value);
    await this.triggerActions("changed");
  }

  updateConfigParams() {
    this.sliderConfig.range.min = this.minValue;
    this.sliderConfig.range.max = this.maxValue;
    this.sliderConfig.step = this.step;
    this.sliderConfig.start = this.sliderValue || 0;
    this.sliderConfig.pips.values = this.labels_count;
  }
}
