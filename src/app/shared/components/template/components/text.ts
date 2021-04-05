import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-text",
  template: `<p [class]="style" [style.textAlign]="textAlign">{{ _row.value }}</p>`,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplTextComponent extends TemplateBaseComponent implements OnInit {
  textAlign: string | null;
  style: string | null;
  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", null);
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
  }
}
