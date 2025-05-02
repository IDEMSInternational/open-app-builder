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
  standalone: false,
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
  public async handleChange(value: any) {
    await this.setValue(value);
  }

  getParams() {
    this.placeholder = getStringParamFromTemplateRow(this._row, "placeholder", "");
    this.maxLength = getNumberParamFromTemplateRow(this._row, "max_length", -1);
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
