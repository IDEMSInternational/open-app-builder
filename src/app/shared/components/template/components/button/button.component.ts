import { Component, OnInit } from "@angular/core";
import { getStringParamFromTemplateRow, getBooleanParamFromTemplateRow } from "../../../../utils";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class TmplButtonComponent extends TemplateBaseComponent implements OnInit {
  style: string = "primary";
  color: string | null;
  disabled: boolean = false;
  textAlign: string;
  width: string | null;

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.style = getStringParamFromTemplateRow(this._row, "style", "primary");
    this.color = getStringParamFromTemplateRow(this._row, "color", null);
    this.disabled = getBooleanParamFromTemplateRow(this._row, "disabled", false);
    this.textAlign = getStringParamFromTemplateRow(this._row, "text-align", "center");
    this.width = getStringParamFromTemplateRow(this._row, "width", null);

    if (this.width) {
      if (!this.width.includes("%") || !this.width.includes("px")) this.width += "px";
    }
  }
}
