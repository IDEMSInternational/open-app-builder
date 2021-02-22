import { Component, Input } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FlowTypes } from 'src/app/shared/model/flowTypes';
import { ITemplateComponent } from "./tmpl.component";

@Component({
  selector: "plh-tmpl-audio",
  template: `<audio [src]="row.value"></audio>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplAudioComponent implements ITemplateComponent {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() localVariables: { [name: string]: any };
}
