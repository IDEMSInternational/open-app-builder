import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-text",
  template: `<p
    *ngIf="_row.value"
    class="small standard normal margin-t-large"
    [class]="style"
    [innerHTML]="type === 'marked' ? (_row.value | markdown) : (_row.value | number)"
    [style.textAlign]="textAlign"
  ></p>`,
  styleUrls: ["./tmpl-components-common.scss"],
  styles: [
    `
      .margin-t-large {
        margin-bottom: -0.75em;
      }
      .small {
        font-size: 16px;
      }
      .tiny {
        font-size: 14px;
      }
      .medium {
        font-size: 18px;
      }
      .large {
        font-size: 20px;
      }
      .right {
        text-align: right;
      }
      .left {
        text-align: left;
      }
      .center {
        text-align: center;
      }
    `,
  ],
})
export class TmplTextComponent extends TemplateBaseComponent implements OnInit {
  textAlign: string | null;
  style: string | null;
  type: string;
  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", null);
    this.type = getStringParamFromTemplateRow(this._row, "type", "marked");
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
  }
}
