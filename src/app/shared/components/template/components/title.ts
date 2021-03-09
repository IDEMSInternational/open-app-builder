import { Component } from "@angular/core";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-title",
  template: ` <h1>{{ _row.value }}</h1> `,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplTitleComponent extends TemplateBaseComponent {}
