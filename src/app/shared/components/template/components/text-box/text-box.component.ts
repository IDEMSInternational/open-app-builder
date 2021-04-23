import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "../../../../model";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "../../../../utils";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";

@Component({
  selector: "plh-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
})
export class TmplTextBoxComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
  isNumberInput = false;
  placeholder: string;
  textAlign: string;
  maxLength: number;
  style: string;
  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.placeholder = getStringParamFromTemplateRow(this._row, "placeholder", "");
    this.maxLength = getNumberParamFromTemplateRow(this._row, "max_length", 30);
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", "center");
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
    this.isNumberInput = getBooleanParamFromTemplateRow(this._row, "number_input", false);
  }
}
