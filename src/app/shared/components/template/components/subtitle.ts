import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-subtitle",
  template: `
    <div class="subtitle-wrapper margin-t-regular" [class]="style">
      <h2 [style.text-align]="textAlign" [class]="'standard normal' + ' ' + style">
        <span [innerHTML]="_row.value | markdown"></span>
      </h2>
    </div>
  `,
  styleUrls: ["./subtitle.scss"],
})
export class TmplSubtitleComponent extends TemplateBaseComponent implements OnInit {
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
