import { Component, Directive, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {} from "@ionic/angular";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";

@Directive({
  selector: "[htmlComponentHost]",
})
export class HtmlComponentHost {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

@Component({
  selector: "template-html-component",
  template: `<div [outerHTML]="html"></div>`,
})
/** Render raw html */
export class TemplateHTMLComponent extends TemplateBaseComponent implements OnInit {
  html: SafeHtml;
  @ViewChild(HtmlComponentHost, { static: true }) htmlComponentHost!: HtmlComponentHost;

  constructor(private domSanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.html = this.domSanitizer.bypassSecurityTrustHtml(this._row.value);
  }
}
