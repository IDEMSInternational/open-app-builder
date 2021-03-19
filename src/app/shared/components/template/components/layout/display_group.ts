import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-tmpl-display-group",
  template: `<div [ngStyle]="styleList" class="display-group">
    <plh-template-component
      *ngFor="let childRow of _row.rows"
      [row]="childRow"
      [parent]="parent"
    ></plh-template-component>
  </div>`,
  styleUrls: ["../tmpl-components-common.scss"],
})
export class TmplDisplayGroupComponent extends TemplateBaseComponent implements OnInit {
  styleList = {};

  ngOnInit() {
    console.log("display group init", this._row);
    this.styleList = this.getStyleList()
  }

  getStyleList(): {} {
    const styles = {}
    for (let i = 0; i < this._row.style_list.length; i++ ) {
      let splited = this._row.style_list[i].split(':')
      styles[splited[0]] = splited[1]
    }
    return styles;
  }
}
