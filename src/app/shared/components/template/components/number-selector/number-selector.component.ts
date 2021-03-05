import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import { ITemplateComponent } from "../tmpl.component";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";


@Component({
  selector: "plh-number-selector",
  templateUrl: "./number-selector.component.html",
  styleUrls: ["./number-selector.component.scss"]
})
export class TmplNumberComponent implements ITemplateComponent, OnInit {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
  title: string | null;
  min_value: number | null = 0;
  displayValue: number | null = 0;
  max_value: number | null = 0;
  value: any;
  category_list: string | null;
  height: string;
  category_size: number;
  first_display_term: number;
  constructor() {
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.category_list = getStringParamFromTemplateRow(this.row, "category_list", null);
    this.title = getStringParamFromTemplateRow(this.row, "title", null);
    this.value = this.row.value;
    this.height = getStringParamFromTemplateRow(this.row, "height", "short");
    this.height = this.height === "short" || "normal" ? this.height : "short";
    if (!this.category_list) {
      this.min_value = getNumberParamFromTemplateRow(this.row, "min_value", null);
      this.max_value = getNumberParamFromTemplateRow(this.row, "max_value", null);
      this.category_size = getNumberParamFromTemplateRow(this.row, "category_size", 1);
      this.first_display_term = getNumberParamFromTemplateRow(this.row, 'first_display_term', 0);
      this.displayValue = this.min_value;
    }
  }

  increment() {
    return this.displayValue < this.max_value ? this.displayValue++ : null;
  }

  decrement() {
    return this.displayValue > this.min_value ? this.displayValue-- : null;
  }

}
