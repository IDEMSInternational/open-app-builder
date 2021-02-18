import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { tr } from "date-fns/locale";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { LocalVarsReplacePipe } from "../local-vars-replace.pipe";
import { ITemplateComponent } from "./tmpl.component";

@Component({
  selector: "plh-tmpl-image",
  template: `
    <div class="tmpl-image-container">
      <img *ngIf="imageSrc" [src]="imageSrc">
    </div>
  `,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplImageComponent implements ITemplateComponent {

  assetsPrefix = "/assets/plh_assets/";

  constructor(private http: HttpClient) {
  }

  imageSrc: string;
  @Input() set row (value: FlowTypes.TemplateRow) {
    const replaced = LocalVarsReplacePipe.parseMessageTemplate(value.value, this.localVariables);
    this.http.get(replaced, { responseType: "arraybuffer" })
      .toPromise()
      .then(() => {
        this.imageSrc = replaced;
      })
      .catch(() => {
        this.imageSrc = (this.assetsPrefix + replaced).replace("//", "/");
      });
  }
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
}
