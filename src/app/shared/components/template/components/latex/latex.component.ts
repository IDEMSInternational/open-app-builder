import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";

@Component({
  selector: "template-latex-component",
  template: ` <span [innerHTML]="latexInput | latex"> </span> `,
})
/** Render raw LaTeX **/
export class TmplLatexComponent extends TemplateBaseComponent implements OnInit {
  latexInput: string;

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.latexInput = this._row.value;
  }
}
