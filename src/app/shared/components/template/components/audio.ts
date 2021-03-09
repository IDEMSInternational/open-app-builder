import { Component } from "@angular/core";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-audio",
  template: `<audio [src]="row.value"></audio>`,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplAudioComponent extends TemplateBaseComponent {}
