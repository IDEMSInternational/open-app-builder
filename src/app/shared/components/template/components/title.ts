import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { ITemplateRowProps } from "../models";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-title",
  template: `
    <div class="title-wrapper" [class]="textAlign">
      <h1 [class]="'tiny' + ' ' + style">{{ _row.value }}</h1>
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

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.help = getStringParamFromTemplateRow(this._row, "help", null);
    this.tooltipPosition = getStringParamFromTemplateRow(this._row, "tooltip_position", "right");
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", "left");
    this.style = getStringParamFromTemplateRow(this._row, "style", "tiny standard");
  }
}
