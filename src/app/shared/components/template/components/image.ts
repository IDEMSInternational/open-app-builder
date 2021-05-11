import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";

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
  assetsPrefix = "/assets/plh_assets/";
  style = "";

  constructor(private http: HttpClient) {
    super();
  }

  imageSrc: string;

  @Input() set row(r: FlowTypes.TemplateRow) {
    if (r.value) {
      this.http
        .get(this.assetsPrefix + r.value, { responseType: "arraybuffer" })
        .toPromise()
        .then(() => {
          this.imageSrc = this.assetsPrefix + r.value;
          this.style += ` ${r.parameter_list?.style}`;
        })
        .catch(() => {
          this.imageSrc = r.value.replace("//", "/");
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
