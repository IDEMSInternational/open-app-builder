import { Component, computed } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";

import { DomSanitizer } from "@angular/platform-browser";

import DOMPurify from "dompurify";
import { latexToHtml } from "./latex.utils";

@Component({
  selector: "template-latex-component",
  template: ` <span [innerHTML]="parsedLatex()"> </span> `,
})
/** Render text that includes LaTeX equations **/
export class TmplLatexComponent extends TemplateBaseComponent {
  public parsedLatex = computed(() => {
    const value = this.value();
    const html = latexToHtml(value);
    const sanitizedHtml = DOMPurify.sanitize(html);
    return this.domSanitizer.bypassSecurityTrustHtml(sanitizedHtml);
  });

  constructor(private domSanitizer: DomSanitizer) {
    super();
  }
}
