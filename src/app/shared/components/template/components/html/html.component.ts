import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {} from "@ionic/angular";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";

@Component({
  selector: "template-html-component",
  template: `<div [outerHTML]="html"></div>`,
})
/** Render raw html */
export class TemplateHTMLComponent extends TemplateBaseComponent implements OnInit {
  html: SafeHtml;

  constructor(private domSanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.html = this.domSanitizer.bypassSecurityTrustHtml(this._row.value);
  }
}
