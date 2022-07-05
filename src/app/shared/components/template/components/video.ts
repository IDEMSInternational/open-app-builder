import { Component, OnInit } from "@angular/core";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-video",
  template: `<div class="tmpl-video-container margin-t-large" [class]="style">
    <video [src]="_row.value | plhAsset" controls>
      <track *ngIf="subtitles_src" [src]="subtitles_src | plhAsset" default label="Subtitles" />
    </video>
  </div>`,
  styleUrls: ["./tmpl-components-common.scss"],
  styles: [
    `
      ::cue {
        font-size: var(--video-subtitles-medium);
      }
    `,
  ],
})
export class TmplVideoComponent extends TemplateBaseComponent implements OnInit {
  style: string;
  subtitles_src: string;

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
    this.subtitles_src = getStringParamFromTemplateRow(this._row, "subtitles_src", null);
  }
}
