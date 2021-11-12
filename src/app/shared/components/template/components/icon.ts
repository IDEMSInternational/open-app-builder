import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { TemplateBaseComponent } from "./base";

@Component({
  selector: "plh-tmpl-icon",
  template: ` <svg-icon [src]="src | plhAssetTranslated"> </svg-icon> `,
  encapsulation: ViewEncapsulation.ShadowDom,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class TmplIconComponent extends TemplateBaseComponent implements OnInit {
  @Input() src: string;

  constructor() {
    super();
  }

  ngOnInit() {}
}
