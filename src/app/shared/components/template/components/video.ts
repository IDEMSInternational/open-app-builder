import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "src/app/shared/model/flowTypes";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-video",
  template: `<div class="tmpl-video-container margin-t-large" [class]="style">
    <video [src]="videoSrc" controls></video>
  </div>`,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplVideoComponent extends TemplateBaseComponent implements OnInit {
  assetsPrefix = "/assets/plh_assets/";
  style: string;
  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  getParams() {
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
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
          this.videoSrc = r.value.replace("//", "/");
        });
    } else {
      this.videoSrc = r.value;
    }
  }
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string };
}
