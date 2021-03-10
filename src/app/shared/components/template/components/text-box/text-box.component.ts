import { Component, Input, OnInit } from "@angular/core";
import { ITemplateComponent } from "../tmpl.component";
import { FlowTypes } from "../../../../model";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"]
})
export class TmpltTextBoxComponent implements ITemplateComponent, OnInit {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
  placeholder: string;
  maxLength: number;
  value: string | null;


  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.placeholder = getStringParamFromTemplateRow(this.row, "placeholder", "");
    this.maxLength = getNumberParamFromTemplateRow(this.row, "maxLength", 30);
    this.value = this.row.value;
  }

}
