import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { LocalVarsReplacePipe } from "../pipes/local-vars-replace.pipe";
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
  @Input() set row(value: FlowTypes.TemplateRow) {
    const replaced = LocalVarsReplacePipe.parseMessageTemplate(value.value, this.localVariables);
    this.http
      .get(replaced, { responseType: "arraybuffer" })
      .toPromise()
      .then(() => {
        this.imageSrc = replaced;
      })
      .catch(() => {
        this.imageSrc = (this.assetsPrefix + replaced).replace("//", "/");
      });
  }
}
