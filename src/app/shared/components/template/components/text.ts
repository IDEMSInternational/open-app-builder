import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-text",
  template: `<p
    *ngIf="_row.value"
    class="small standard normal margin-t-large"
    [class]="style"
    [innerHTML]="type === 'numbered' ? (_row.value | number) : (_row.value | markdown)"
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
    this.type = this._row.parameter_list?.style?.includes("numbered") ? "numbered" : "marked";
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
  }
}
