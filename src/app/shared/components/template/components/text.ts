import { Component, Input, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";

interface ITextParams {
  text: string;
  textAlign: string | null;
  style: string | null;
  type: string;
  isFalsy: boolean;
}
@Component({
  selector: "plh-tmpl-text",
  template: `<div
    *ngIf="params.text"
    class="large standard normal margin-t-large"
    [class]="params.style"
    [ngStyle]="params.isFalsy ? { display: 'none' } : { display: 'block' }"
    [innerHTML]="
      params.type === 'numbered' ? (params.text | number) : (params.text?.toString() | markdown)
    "
    [style]="_row?.style_list | styleList"
    [style.textAlign]="params.textAlign"
  ></div> `,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplTextComponent extends TemplateBaseComponent implements OnInit {
  @Input() textInputParams: Partial<ITextParams>;
  params: Partial<ITextParams> = {};

  constructor() {
    super();
  }

  ngOnInit() {
    // If instantiated from a template, get params from template row
    if (this._row) {
      this.getParams();
    }
    // Else if instantiated from a parent component, get params from Input()
    else if (this.textInputParams) {
      this.params = this.textInputParams;
    }
  }

  getParams() {
    this.params.text = this._row.value;
    this.params.isFalsy = ["undefined", "NaN", "null", '""'].includes(this.params.text);
    this.params.textAlign = getStringParamFromTemplateRow(this._row, "text_align", null);
    this.params.type = this._row.parameter_list?.style?.includes("numbered")
      ? "numbered"
      : "marked";
    this.params.style = getStringParamFromTemplateRow(this._row, "style", null);
  }
}
