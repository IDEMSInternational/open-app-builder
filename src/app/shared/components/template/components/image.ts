import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "data-models";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";
import { getImageAssetPath } from "../utils/template-utils";

@Component({
  selector: "plh-tmpl-image",
  template: `
    <div class="tmpl-image-container" [class]="style">
      <img *ngIf="imageSrc" [src]="imageSrc" />
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

  constructor(private http: HttpClient) {
    super();
  }

  imageSrc: string;

  @Input() set row(r: FlowTypes.TemplateRow) {
    if (r.value) {
      const imageSrc = getImageAssetPath(r.value);
      this.http
        .get(imageSrc, { responseType: "arraybuffer" })
        .toPromise()
        .then(() => {
          this.imageSrc = imageSrc;
          this.style += ` ${r.parameter_list?.style}`;
        })
        .catch(() => {
          console.error("image not found", r.value, imageSrc);
          // could add fallback image here if desired
        });
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
