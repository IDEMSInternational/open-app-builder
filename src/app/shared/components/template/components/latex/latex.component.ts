import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { extractMath } from "extract-math";

@Component({
  selector: "template-latex-component",
  template: `
    <ng-katex-paragraph *ngIf="inputIsParagraph" [paragraph]="latexInput"></ng-katex-paragraph>
    <ng-katex *ngIf="!inputIsParagraph" [equation]="latexInput"></ng-katex>
  `,
})
/** Render raw LaTeX **/
export class TmplLatexComponent extends TemplateBaseComponent implements OnInit {
  latexInput: string;
  inputIsParagraph: boolean;

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();

    // detect whether input string contains a LaTeX 'math' segment, and is therefore in LaTeX's 'paragraph mode', else is itself in 'math mode'
    this.inputIsParagraph = extractMath(this.latexInput).some((segment) => segment.math);
  }

  getParams() {
    this.latexInput = this._row.value;
  }
}
