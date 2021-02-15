import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { tr } from "date-fns/locale";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "plh-tmpl-image",
  template: `
    <div class="tmpl-image-container">
      <img *ngIf="imageSrc" [src]="imageSrc">
    </div>
  `,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplImageComponent {

  assetsPrefix = "/assets/plh_assets/";

  constructor(private http: HttpClient) {
  }

  imageSrc: string;
  @Input() set row (value: FlowTypes.TemplateRow) {
    this.http.get(value.value, { responseType: "arraybuffer" })
      .toPromise()
      .then(() => {
        this.imageSrc = value.value;
      })
      .catch(() => {
        this.imageSrc = (this.assetsPrefix + value.value).replace("//", "/");
      });
  }
  @Input() template: FlowTypes.Template;
}
