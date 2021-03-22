import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-video",
  template: `<div class="tmpl-video-container">
    <video [src]="videoSrc" controls></video>
  </div>`,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplVideoComponent extends TemplateBaseComponent {
  assetsPrefix = "/assets/plh_assets/";

  constructor(private http: HttpClient) {
    super();
  }

  videoSrc: string;
  @Input() set row(r: FlowTypes.TemplateRow) {
    if (r.value.indexOf("http") < 0) {
      this.http
        .get(this.assetsPrefix + r.value, { responseType: "arraybuffer" })
        .toPromise()
        .then(() => {
          this.videoSrc = this.assetsPrefix + r.value;
        })
        .catch(() => {
          this.videoSrc = (r.value).replace("//", "/");
        });
    } else {
      this.videoSrc = r.value;
    }
  }
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string };
}
