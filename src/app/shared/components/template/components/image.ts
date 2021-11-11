import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "data-models";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-image",
  template: `
    <div class="tmpl-image-container" [class]="style">
      <img *ngIf="imageSrc" [src]="imageSrc | plhAssetTranslated | async" />
    </div>
  `,
  styleUrls: ["./tmpl-components-common.scss"],
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class TmplImageComponent extends TemplateBaseComponent implements OnInit {
  style = "";

  constructor() {
    super();
  }

  imageSrc: string;

  @Input() set row(r: FlowTypes.TemplateRow) {
    if (r.value) {
      this.style += ` ${r.parameter_list?.style}`;
      this.imageSrc = r.value;
    } else {
      console.warn("No image specified", { ...r });
    }
  }

  ngOnInit() {
    if (this._row && this._row.parameter_list) {
      this.style = getStringParamFromTemplateRow(this._row, "style", "");
    }
  }
}
