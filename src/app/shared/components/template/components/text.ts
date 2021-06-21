import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";
import { ChangeDetectionStrategy } from "@angular/core";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TmplTextComponent extends TemplateBaseComponent implements OnInit {
  textAlign: string | null;
  style: string | null;
  type: string;
  constructor() {
    super();
  }

  ngOnInit() {
    this.defineBreakLines();
    this.getParams();
  }

  getParams() {
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", null);
    this.type = this._row.parameter_list?.style?.includes("numbered") ? "numbered" : "marked";
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
  }

  defineBreakLines() {
    if (this._row.value.includes("-")) {
      const result = this._row.value
        .split("\n-")
        .map((stringRow) => {
          if (!stringRow.includes("\n\n")) {
            stringRow = stringRow.replaceAll("\n", "<br/>");
          }
          return stringRow;
        })
        .join("\n*");
      this._row.value = result;
    } else {
      this._row.value = this._row.value.replaceAll("\n", "<br/>");
    }
  }
}
