import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { getStringParamFromTemplateRow } from "../../../utils";

@Component({
  selector: "plh-tmpl-title",
  template: `
    <div class="title-wrapper" [class]="style">
      <h1
        [style.textAlign]="textAlign"
        [class]="'tiny standard' + ' ' + style"
        [innerHTML]="_row.value | markdown"
      ></h1>
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
  styleUrls: ["./title.scss"],
})
export class TmplTitleComponent extends TemplateBaseComponent implements OnInit {
  help: string | null;
  tooltipPosition: string;
  textAlign: string;
  style: string | null;

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.help = getStringParamFromTemplateRow(this._row, "help", null);
    this.tooltipPosition = getStringParamFromTemplateRow(this._row, "tooltip_position", "right");
    this.style = getStringParamFromTemplateRow(this._row, "style", "tiny standard");
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", "left");
  }
}
