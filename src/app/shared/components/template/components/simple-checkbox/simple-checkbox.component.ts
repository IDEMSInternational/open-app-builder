import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getBooleanParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-simple-checkbox",
  templateUrl: "./simple-checkbox.component.html",
  styleUrls: ["./simple-checkbox.component.scss"],
})
export class TmplSimpleCheckboxComponent extends TemplateBaseComponent implements OnInit {
  position: string;
  reverse: boolean;
  label_text: string | null;
  style: string;
  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }
  public async handleChange(isChecked: boolean) {
    await this.setValue(isChecked);
    this.triggerActions("changed");
  }

  getParams() {
    this.reverse = getBooleanParamFromTemplateRow(this._row, "reverse", false);
    this.position = getStringParamFromTemplateRow(this._row, "align", "center");
    this.label_text = getStringParamFromTemplateRow(this._row, "label_text", null);
    this.style = getStringParamFromTemplateRow(this._row, "style", "");
  }
}
