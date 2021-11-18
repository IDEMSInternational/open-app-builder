import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../../base";

@Component({
  selector: "plh-advanced-dashed-box",
  templateUrl: "./advanced-dashed-box.component.html",
  styleUrls: ["./advanced-dashed-box.component.scss"],
})
export class TmplAdvancedDashedBoxComponent extends TemplateBaseComponent implements OnInit {
  @Input() inputRow: FlowTypes.TemplateRow;
  style: string;
  icon_src: string | null;
  icon_position: string;

  constructor() {
    super();
  }

  ngOnInit() {
    if (this.inputRow) this._row = this.inputRow;
    this.getParams();
  }

  getParams() {
    this.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", "");
    this.style = getStringParamFromTemplateRow(this._row, "style", "");
    this.icon_position = getStringParamFromTemplateRow(this._row, "icon_position", "top-left");
  }
}
