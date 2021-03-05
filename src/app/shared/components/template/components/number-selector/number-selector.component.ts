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
  height: string;
  constructor() {
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.value = this.row.value;
    this.title = getStringParamFromTemplateRow(this.row, "title", null);
    this.min_value = getNumberParamFromTemplateRow(this.row, "min_value", null);
    this.max_value = getNumberParamFromTemplateRow(this.row, "max_value", null);
    this.height =  getStringParamFromTemplateRow(this.row, "height", 'short');
    this.height = this.height === 'short' || 'normal' ? this.height : 'short';
    this.displayValue = this.min_value;
  }

  increment() {
   return  this.displayValue < this.max_value ? (this.title ? this.displayValue++ : null) : null;
  }

  decrement() {
    return this.displayValue > this.min_value ? this.displayValue-- : null;
  }

}
