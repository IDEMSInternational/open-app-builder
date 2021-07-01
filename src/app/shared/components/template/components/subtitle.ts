import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { ITemplateRowProps } from "../models";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-subtitle",
  template: `
    <div class="subtitle-wrapper margin-t-regular" [class]="style">
      <h2 [style.text-align]="textAlign" [class]="'standard normal' + ' ' + style">
        {{ _row.value }}
      </h2>
    </div>
  `,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplSubtitleComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  textAlign: string;
  style: string | null;

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.style = getStringParamFromTemplateRow(this._row, "style", "standard medium");
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", "");
  }
}
