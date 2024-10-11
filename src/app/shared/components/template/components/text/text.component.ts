import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getStringParamFromTemplateRow } from "../../../../utils";

interface ITextParams {
  style: string | null;
  textAlign: string | null;
  type: string;
}

@Component({
  selector: "plh-tmpl-text",
  templateUrl: "./text.component.html",
  styleUrls: ["../tmpl-components-common.scss"],
})
export class TmplTextComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<ITextParams> = {};
  hasTextValue: boolean;

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.hasTextValue = !["undefined", "NaN", "null", '""'].includes(this._row.value);
    this.params.textAlign = getStringParamFromTemplateRow(this._row, "text_align", null);
    this.params.type = this._row.parameter_list?.style?.includes("numbered")
      ? "numbered"
      : "marked";
    this.params.style = getStringParamFromTemplateRow(this._row, "style", null);
  }
}
