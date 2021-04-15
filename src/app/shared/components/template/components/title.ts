import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { ITemplateRowProps } from "../models";
import { getStringParamFromTemplateRow } from "../../../utils";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "plh-tmpl-title",
  template: `
    <div class="title-wrapper" [class]="style">
      <h1 *ngIf="innerHTML" [class]="'tiny standard' + ' ' + style" [innerHTML]="innerHTML"></h1>
      <ion-icon
        *ngIf="help"
        name="help-circle-outline"
        class="title-help"
        [pTooltip]="help"
        [tooltipPosition]="tooltipPosition"
        tooltipEvent="click"
      ></ion-icon>
    </div>
  `,
  styleUrls: ["./tmpl-components-common.scss"],
})
export class TmplTitleComponent extends TemplateBaseComponent implements ITemplateRowProps, OnInit {
  help: string | null;
  tooltipPosition: string;
  textAlign: string;
  style: string | null;
  innerHTML: SafeHtml;

  constructor(private domSanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.innerHTML = this.domSanitizer.bypassSecurityTrustHtml(this._row.value);
  }

  getParams() {
    this.help = getStringParamFromTemplateRow(this._row, "help", null);
    this.tooltipPosition = getStringParamFromTemplateRow(this._row, "tooltip_position", "right");
    this.style = getStringParamFromTemplateRow(this._row, "style", "tiny standard");
  }
}
