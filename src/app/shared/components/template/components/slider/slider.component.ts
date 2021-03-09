import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { ITemplateComponent } from "../tmpl.component";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow
} from "../../../../utils";
import { IonRange } from "@ionic/angular";

@Component({
  selector: "plh-tmpl-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class TmplSliderComponent implements ITemplateComponent, OnInit {

  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string };
  help: string | null;
  minValue: number = 0;
  maxValue: number = 7;
  disabled: boolean = false;
  title: string | null;
  step: number = 1;
  value: number | null;
  min_value_label: string | null;
  max_value_label: string | null;
  listNumbers: Array<number> = [];
  no_value: boolean = false;
  rangeBarTouched: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.getParams();
    this.createListNumber(this.minValue, this.maxValue, this.step);
  }

  getParams() {
    this.help = getStringParamFromTemplateRow(this.row, "help", null);
    this.minValue = getNumberParamFromTemplateRow(this.row, "min", this.minValue);
    this.maxValue = getNumberParamFromTemplateRow(this.row, "max", this.maxValue);
    this.title = getStringParamFromTemplateRow(this.row, "title", null);
    this.step = getNumberParamFromTemplateRow(this.row, "step", this.step);
    this.min_value_label = getStringParamFromTemplateRow(this.row, "min_value_label", null);
    this.max_value_label = getStringParamFromTemplateRow(this.row, "max_value_label", null);
    this.value = this.row.value > this.maxValue ? 0 : this.row.value;
    this.rangeBarTouched = this.row.value > 0;
    this.no_value = getBooleanParamFromTemplateRow(this.row, "no_value", false);
  }

  createListNumber(min, max, step): Array<number> {
    const arr = [];
    for (let i = min; i <= max; i++) {
      if (i % step === 0) {
        arr.push(i);
      }
    }
    switch (true) {
      case (max === 11):
        return this.listNumbers = arr;
      case (max === 13):
        return this.listNumbers = [0, 6, 13];
      case (max === 17):
        return this.listNumbers = [0, 4, 9, 13, 17];
      case (max === 19):
        return this.listNumbers = [0, 4, 8, 12, 15, 19];
      case (max === 23):
        return this.listNumbers = [0, 4, 8, 12, 15, 19, 23];
      case (max === 29):
        return this.listNumbers = [0, 4, 8, 12, 17, 19, 23, 25, 29];
      case (max === 31 || 37 || 41 || 43 || 47 || 53 || 59 || 61 || 67 || 71 || 73 || 79 || 83 || 89 || 97):
        return this.listNumbers = helpArray(min, max);
      case (arr.length <= 7):
        return this.listNumbers = arr;
      case (arr.length <= 11):
        return this.listNumbers = arr.filter(item => step >= 2 ? item % 4 === 0 : item % step === 0);
      case (arr.length > 11 && arr.length <= 16):
        this.listNumbers = arr.filter(item => step !== 1 || 2 ? item % 3 === 0 : item % step === 0);
        return this.listNumbers;
      case (arr.length > 16 && max < 21):
        this.listNumbers = arr.filter(item => step <= 2 ? item % 4 === 0 : item % step === 0);
        return this.listNumbers;
      case (arr.length > 12 && max > 15):
        this.listNumbers = helpArray(min, max);
        return this.listNumbers;
    }

    function helpArray(from, to) {
      let data = [];
      for (let i = from; i < to; i++) {
        if (i % 10 === 0 && step !== 2) {
          data.push(i);
        } else if( Number(i.toString().split('')[i < 10 ? 0 : 1]) === 6 || i % 10 === 0) {
          console.log();
          data.push(i);
        }
      }
      if (to - data[data.length - 1] < 5) {
        data[data.length - 1] = to;
      } else {
        data.push(to);
      }
      return data;
    }
  }

  disableSlider() {
    this.no_value = !this.no_value;
    this.rangeBarTouched = !this.rangeBarTouched;
    this.value = null;
  }

  changeValue(range: IonRange) {
    this.value = range.value as any;
    this.rangeBarTouched = true;
  }
}
