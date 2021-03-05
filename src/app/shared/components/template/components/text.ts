import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "@fullcalendar/angular";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-text",
  template: `<p>{{ _row.value | localVarsReplace: localVariables }}</p>`,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplTextComponent extends TemplateBaseComponent {}
