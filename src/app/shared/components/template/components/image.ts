import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-image",
  template: `
    <div class="tmpl-image-container" [class]="style" [attr.data-param-style]="style">
      <img *ngIf="_row.value" [src]="_row.value | plhAsset" />
    </div>
  `,
  styleUrls: ["./tmpl-components-common.scss"],
  styles: [
    `
      :host {
        display: contents;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .tmpl-image-container {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class TmplImageComponent extends TemplateBaseComponent implements OnInit {
  style: string = null;

  ngOnInit() {
    if (this._row && this._row.parameter_list) {
      this.style = getStringParamFromTemplateRow(this._row, "style", null);
    }
  }
}
