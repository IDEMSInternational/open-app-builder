import { Component } from "@angular/core";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-text",
  template: `<p>{{ _row.value }}</p>`,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplTextComponent extends TemplateBaseComponent {}
