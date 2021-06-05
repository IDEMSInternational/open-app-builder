import { Component, OnInit } from "@angular/core";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "../../../../utils";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
})
export class TmplTextBoxComponent extends TemplateBaseComponent implements OnInit {
  prioritisePlaceholder: boolean;
  isNumberInput = false;
  placeholder: string;
  textAlign: string;
  maxLength: number;
  style: string;

  ngOnInit() {
    this.getParams();
  }
  public async handleChange() {
    await this.setValue(this._row.value);
    this.triggerActions("changed");
  }

  getParams() {
    this.placeholder = getStringParamFromTemplateRow(this._row, "placeholder", "");
    this.maxLength = getNumberParamFromTemplateRow(this._row, "max_length", 30);
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", "center");
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
    this.isNumberInput = getBooleanParamFromTemplateRow(this._row, "number_input", false);
    this.prioritisePlaceholder = getBooleanParamFromTemplateRow(
      this._row,
      "prioritise_placeholder",
      false
    );
  }
}
