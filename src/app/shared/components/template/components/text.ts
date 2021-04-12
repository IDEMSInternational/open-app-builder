import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-text",
  template: `<p
    class="small standard normal"
    [class]="style"
    [innerHTML]="_row.value | markdown"
    [style.textAlign]="textAlign"
  ></p>`,
  styleUrls: ["./tmpl-components-common.scss"],
  styles: [
    `
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
