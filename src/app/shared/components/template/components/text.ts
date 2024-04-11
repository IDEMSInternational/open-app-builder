import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-text",
  template: `<div
    *ngIf="_row && _row.value"
    class="large standard normal margin-t-large"
    [class]="style"
    [ngStyle]="isFalsy ? { display: 'none' } : { display: 'block' }"
    [innerHTML]="type === 'numbered' ? (_row.value | number) : (_row.value?.toString() | markdown)"
    [style]="_row.style_list | styleList"
    [style.textAlign]="textAlign"
  ></div> `,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplTextComponent extends TemplateBaseComponent implements OnInit {
  textAlign: string | null;
  style: string | null;
  type: string;
  isFalsy: boolean;
  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.isFalsy = ["undefined", "NaN", "null", '""'].includes(this._row.value);
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", null);
    this.type = this._row.parameter_list?.style?.includes("numbered") ? "numbered" : "marked";
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
  }
}
