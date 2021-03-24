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
  }
}
