import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FlowTypes } from "data-models";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-video",
  template: `<div class="tmpl-video-container margin-t-large" [class]="style">
    <video [src]="row.value | plhAssetTranslated" controls></video>
  </div>`,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplVideoComponent extends TemplateBaseComponent implements OnInit {
  style: string;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  getParams() {
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
  }

  @Input() template: FlowTypes.Template;
}
