import { Component, OnInit } from "@angular/core";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-video",
  template: `<div class="tmpl-video-container margin-t-large" [class]="style">
    <video [src]="_row.value | plhAsset" controls></video>
  </div>`,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplVideoComponent extends TemplateBaseComponent implements OnInit {
  style: string;

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
  }
}
