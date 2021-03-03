import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { ITemplateComponent } from "../tmpl.component";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-tmpl-slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"]
})
export class SliderComponent implements ITemplateComponent, OnInit {

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
    this.title = getStringParamFromTemplateRow(this.row , 'title', null);
    this.step = getNumberParamFromTemplateRow(this.row, "step", this.step);
    this.min_value_label = getStringParamFromTemplateRow(this.row, 'min_value_label', null);
    this.max_value_label = getStringParamFromTemplateRow(this.row, 'max_value_label', null);
    this.value = this.row.value > this.maxValue ? null : this.row.value;
    this.disabled = this.value === null;
  }

  createListNumber(min, max, step): Array<number> {
    const arr = [];
    for (let i = min; i <= max; i++) {
      if (i % step === 0) {
        arr.push(i)
      }
    }
    switch (true){
      case (arr.length <= 11):
        this.listNumbers = arr;
        return this.listNumbers;
      case (arr.length > 11 && arr.length <= 21):
        this.listNumbers = [0, 2, 6, 8, 10, 15, 20]
        return this.listNumbers;
      case (arr.length > 21 && arr.length <= 31):
        this.listNumbers = [0, 5, 10, 15, 20 , 25, arr[arr.length - 1]]
        return this.listNumbers;
      case (arr.length > 31 && arr.length <= 41):
        this.listNumbers = [0, 5, 10, 15, 20, 25, 30, 35, arr[arr.length - 1]]
        return this.listNumbers;
      case (arr.length > 41 && arr.length <= 51):
          this.listNumbers = [0, 10, 15, 20, 25, 30, 35, 40, arr[arr.length - 1]]
          return this.listNumbers;
      case (arr.length > 51 && arr.length <= 61):
        this.listNumbers = [0, 10, 20 , 30, 40, 50, arr[arr.length - 1]]
        return this.listNumbers;
      case (arr.length > 61 && arr.length <= 71):
        this.listNumbers = [0, 10, 20 , 30, 40, 50, 60, arr[arr.length - 1]]
        return this.listNumbers;
      case (arr.length > 71 && arr.length <= 81):
        this.listNumbers = [0, 10, 20 , 30, 40, 50, 60, 70, arr[arr.length - 1]]
        return this.listNumbers;
      case (arr.length > 81 && arr.length <= 91):
        this.listNumbers = [0, 10, 20 , 30, 40, 50, 60, 70, 80, arr[arr.length - 1]]
        return this.listNumbers;
      case (arr.length > 91):
        this.listNumbers = [0, 20, 40, 60, 80, arr[arr.length - 1]]
        return this.listNumbers;
    }
  }

  disableSlider() {
    this.disabled = !this.disabled;
  }
}
