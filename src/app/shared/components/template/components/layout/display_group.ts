import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-tmpl-display-group",
  template: `<div class="display-group" [class]="style">
    <plh-template-component
      *ngFor="let childRow of _row.rows"
      [row]="childRow"
      [parent]="parent"
    ></plh-template-component>
  </div>`,
  styleUrls: ["../tmpl-components-common.scss"],
})
export class TmplDisplayGroupComponent extends TemplateBaseComponent implements OnInit {
  style: string | null;

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
  }
}
