import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-tmpl-display-group",
  template: ` <div
    (click)="clickDisplayGroup()"
    class="display-group-wrapper"
    [attr.data-param-style]="params.style"
    [attr.data-rowname]="_row.name"
    [style.marginBottom.px]="params.offset"
    [ngSwitch]="type"
  >
    <!-- Default Layout -->
    <ng-container *ngSwitchDefault>
      <plh-template-component
        *ngFor="let childRow of _row.rows | filterDisplayComponent; trackBy: trackByRow"
        [row]="childRow"
        [parent]="parent"
        [attr.data-rowname]="_row.name"
      >
      </plh-template-component>
    </ng-container>
    <!-- Dashed-box -->
    <plh-advanced-dashed-box
      *ngSwitchCase="'dashed_box'"
      [inputRow]="_row"
      [parent]="parent"
      style="flex:1"
    ></plh-advanced-dashed-box>
    <!-- Form layout -->
    <plh-tmpl-form *ngSwitchCase="'form'" [inputRow]="_row" [parent]="parent"></plh-tmpl-form>
  </div>`,
  styleUrls: ["../tmpl-components-common.scss", "./display_group.scss"],
})
export class TmplDisplayGroupComponent extends TemplateBaseComponent implements OnInit {
  params: { style: string | null; offset: number } = {} as any;
  bgColor: string;
  type: "form" | "dashed_box" | "default";

  ngOnInit() {
    this.getParams();
  }

  clickDisplayGroup() {
    this.triggerActions("click");
  }

  getParams() {
    this.params.style = getStringParamFromTemplateRow(this._row, "style", null);
    this.params.offset = getNumberParamFromTemplateRow(this._row, "offset", 0);
    this.type = this.getTypeFromStyles(this.params.style || "");
  }

  private getTypeFromStyles(styles: string) {
    if (styles) {
      if (styles.includes("form")) return "form";
      if (styles.includes("dashed_box")) return "dashed_box";
    }
    return "default";
  }
}
