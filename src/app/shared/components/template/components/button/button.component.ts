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
  height: string | null;
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
    this.width = getStringParamFromTemplateRow(this._row, "width", "100%");
    this.height = getStringParamFromTemplateRow(this._row, "height", "62px");
    this.disabled = getBooleanParamFromTemplateRow(this._row, "disabled", false);
  }
}
