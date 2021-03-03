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
      case (arr.length > 11 && arr.length <= 20):
        this.listNumbers = arr.filter(item => item % 2 === 0);
        return this.listNumbers;
      case (arr.length > 20 && arr.length <= 30):
        this.listNumbers = [0, 5, 10, 15, 20 , 25, arr[arr.length - 1]]
        return this.listNumbers;
      case (arr.length > 30 && arr.length < 40):
        this.listNumbers = [0, 5, 10, 15, 20, 25, 30, 35, arr[arr.length - 1]]
        return this.listNumbers;
      case (arr.length > 40 && arr.length <= 50):
          this.listNumbers = [0, 5, 10, 15, 20, 25, 30, 35, arr[arr.length - 1]]
          return this.listNumbers;
      case (arr.length > 50 && arr.length <= 60):
        this.listNumbers = [0, 10, 20 , 30, 40, arr[arr.length - 1]]
        return this.listNumbers;
      case (arr.length > 60 && arr.length <= 70):
        this.listNumbers = [0, 10, 20 , 30, 40, 50, arr[arr.length - 1]]
        return this.listNumbers;
      case (arr.length > 70 && arr.length <= 80):
        this.listNumbers = [0, 10, 20 , 30, 40, 50, 60, arr[arr.length - 1]]
        return this.listNumbers;
      case (arr.length > 80 && arr.length <= 90):
        this.listNumbers = [0, 10, 20 , 30, 40, 50, 60, 70, arr[arr.length - 1]]
        return this.listNumbers;
      case (arr.length > 90):
        this.listNumbers = [0, 20, 40, 60, 80, arr[arr.length - 1]]
        return this.listNumbers;
    }
  }

  disableSlider() {
    this.disabled = !this.disabled;
  }
}
