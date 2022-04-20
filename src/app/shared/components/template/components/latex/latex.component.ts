import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";

@Component({
  selector: "template-latex-component",
  template: ` <span [innerHTML]="this._row.value | latex"> </span> `,
})
/** Render text that includes LaTeX equations **/
export class TmplLatexComponent extends TemplateBaseComponent {}
