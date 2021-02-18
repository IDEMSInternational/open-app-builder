import { HttpClient } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { LocalVarsReplacePipe } from "../local-vars-replace.pipe";
import { ITemplateComponent } from "./tmpl.component";

@Component({
  selector: "plh-tmpl-video",
  template: `<div class="tmpl-video-container">
    <video [src]="videoSrc" controls></video>
  </div>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplVideoComponent implements ITemplateComponent {

  assetsPrefix = "/assets/plh_assets/";

  constructor(private http: HttpClient) {
  }

  videoSrc: string;
  @Input() set row (value: FlowTypes.TemplateRow) {
    const replaced = LocalVarsReplacePipe.parseMessageTemplate(value.value, this.localVariables);
    if (replaced.indexOf("http") < -1) {
      this.http.get(replaced, { responseType: "arraybuffer" })
      .toPromise()
      .then(() => {
        this.videoSrc = replaced;
      })
      .catch(() => {
        this.videoSrc = (this.assetsPrefix + replaced).replace("//", "/");
      });
    } else {
      this.videoSrc = replaced;
    }
  }
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string; };
}
