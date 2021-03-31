import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-tmpl-display-group",
  template: `<div class="display-group" [class]="style" [style.marginBottom.px]="offset">
    <div [style.marginBottom.px]="-offset" class="offset">
      <plh-template-component
        *ngFor="let childRow of _row.rows"
        [row]="childRow"
        [parent]="parent"
      ></plh-template-component>
    </div>
  </div>`,
  styleUrls: ["../tmpl-components-common.scss"],
})
export class TmplDisplayGroupComponent extends TemplateBaseComponent implements OnInit {
  style: string | null;
  offset: number = 0;

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
    this.offset = getNumberParamFromTemplateRow(this._row, "offset", 0);
  }
}
