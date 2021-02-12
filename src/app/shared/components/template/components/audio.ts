import { Component, Input, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FlowTypes } from 'src/app/shared/model/flowTypes';

@Component({
  selector: "plh-tmpl-audio",
  template: `<audio [src]="row.value"></audio>`,
  styleUrls: ["./tmpl-components-common.scss"]
})
export class TmplAudioComponent {
  @Input() row: FlowTypes.TemplateRow;
  @Input() template: FlowTypes.Template;
  @Input() $localVariables: BehaviorSubject<{ [name: string]: string }>;
}
