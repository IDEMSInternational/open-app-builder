import { Component, Input } from "@angular/core";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { ITemplateComponent } from "./tmpl-comp-host";

@Component({
  selector: "plh-tmpl-video",
  template: `<div class="tmpl-video-container">
    <video [src]="row.value" controls></video>
  </div>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplVideoComponent implements ITemplateComponent {

  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: string; };

  constructor() { }
}
