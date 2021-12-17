import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-text",
  template: `<p
    *ngIf="_row && _row.value"
    class="large standard normal margin-t-large"
    [class]="style"
    [ngStyle]="isFalsy ? { display: 'none' } : { display: 'block' }"
    [innerHTML]="type === 'numbered' ? (_row.value | number) : (_row.value?.toString() | markdown)"
    [style.textAlign]="textAlign"
  ></p> `,
  styleUrls: ["./tmpl-components-common.scss"],
  styles: [
    `
      .margin-t-large {
        margin-bottom: -0.75em;
      }
      .small {
        font-size: var(--font-size-text-small);
      }
      .tiny {
        font-size: var(--font-size-text-tiny);
      }
      .medium {
        font-size: var(--font-size-text-medium);
      }
      .large {
        font-size: var(--font-size-text-large);
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
