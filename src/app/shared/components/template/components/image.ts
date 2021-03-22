import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-image",
  template: `
    <div class="tmpl-image-container">
      <img *ngIf="imageSrc" [src]="imageSrc" />
    </div>
  `,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplImageComponent extends TemplateBaseComponent {
  assetsPrefix = "/assets/plh_assets/";

  constructor(private http: HttpClient) {
    super();
  }

  imageSrc: string;
  @Input() set row(r: FlowTypes.TemplateRow) {
    // const replaced = LocalVarsReplacePipe.parseMessageTemplate(
    //   value.value,
    //   this.parent.localVariables
    // );
    this.http
      .get(this.assetsPrefix + r.value, { responseType: "arraybuffer" })
      .toPromise()
      .then(() => {
        this.imageSrc = this.assetsPrefix + r.value;
      })
      .catch(() => {
        this.imageSrc = (r.value).replace("//", "/");
      });
  }
}
