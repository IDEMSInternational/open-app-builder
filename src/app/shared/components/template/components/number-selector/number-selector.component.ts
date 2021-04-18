import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";
import { ITemplateRowProps } from "../../models";
import { TemplateBaseComponent } from "../base";
import { TemplateContainerComponent } from "../../template-container.component";

interface ICategoryList {
  from: number;
  to: number;
}

@Component({
  selector: "plh-number-selector",
  templateUrl: "./number-selector.component.html",
  styleUrls: ["./number-selector.component.scss"],
})
export class TmplNumberComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  _row: FlowTypes.TemplateRow;
  @Input() set row(value: FlowTypes.TemplateRow) {
    this._row = value;
  }
  @Input() parent: TemplateContainerComponent;

  title: string | null;
  min_value: number | null = 0;
  displayValue: any = 0;
  max_value: number | null = 0;
  value: any;
  category_list: string | null;
  height: string;
  category_size: number;
  first_display_term: number;
  valuesFromCategoryList: string[];

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.category_list = getStringParamFromTemplateRow(this._row, "category_list", null);
    this.title = getStringParamFromTemplateRow(this._row, "title", null);
    this.value = this._row.value;
    this.height = getStringParamFromTemplateRow(this._row, "height", "short");
    this.height = this.height === "short" || "normal" ? this.height : "short";
    if (this.category_list) {
      this.valuesFromCategoryList = this.category_list.replace(/\s/g, "").split(",");
      this.first_display_term =
        getNumberParamFromTemplateRow(this._row, "first_display_term", 1) - 1;
      this.displayValue = this.valuesFromCategoryList[this.first_display_term];
      this._row.value = this.displayValue;
    } else {
      this.min_value = getNumberParamFromTemplateRow(this._row, "min_value", 0);
      this.max_value = getNumberParamFromTemplateRow(this._row, "max_value", 6);
      this.category_size = getNumberParamFromTemplateRow(this._row, "category_size", 1);
      this.displayValue = this.min_value;
      this._row.value = this.displayValue;
    }
  }

  increment(param: "gt" | "lt") {
    this.triggerActions("changed");
    return this.category_list
      ? this.checkIfContainsNextArrayItem(this.valuesFromCategoryList, param)
        ? this.updateData(param)
        : null
      : param === "gt"
      ? this.displayValue + this.category_size <= this.max_value
        ? this.category_size === 1
          ? this.displayValue++
          : (this.displayValue += this.category_size)
        : null
      : this.displayValue > this.min_value - this.category_size &&
        this.displayValue - this.category_size >= this.min_value
      ? this.category_size === 1
        ? this.displayValue--
        : (this.displayValue -= this.category_size)
      : null;
  }

  getMinOrMaxFromCategoryListItem(item: string): ICategoryList {
    return {
      from: Number(item.split("-")[0].trim()),
      to: Number(item.split("-")[1].trim()),
    };
  }

  checkIfContainsNextArrayItem(array: string[], expression: "gt" | "lt") {
    return expression === "gt"
      ? this.first_display_term < array.length - 1
      : this.first_display_term === array.length - 1 ||
          (this.first_display_term < array.length - 1 && this.first_display_term !== 0);
  }

  updateData(param: "gt" | "lt") {
    this.first_display_term =
      param === "gt" ? (this.first_display_term += 1) : (this.first_display_term -= 1);
    this.displayValue = this.valuesFromCategoryList[this.first_display_term];
    this._row.value = this.displayValue;
  }
}
