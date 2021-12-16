import { Component, ElementRef, HostBinding, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-tmpl-display-group",
  template: ` <div
    (click)="clickDisplayGroup()"
    class="display-group"
    [attr.data-param-style]="params.style"
    [attr.data-rowname]="_row.name"
    [style.marginBottom.px]="params.offset"
    [ngSwitch]="type"
  >
    <div
      class="display-group-wrapper"
      [ngSwitch]="type"
      [attr.data-param-style]="params.style"
      [attr.data-rowname]="_row.name"
    >
      <!-- Default Layout -->
      <ng-container *ngSwitchCase="'default'">
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
      ></plh-advanced-dashed-box>
      <!-- Form layout -->
      <plh-tmpl-form *ngSwitchCase="'form'" [inputRow]="_row" [parent]="parent"></plh-tmpl-form>
    </div>
  </div>`,
  styleUrls: ["../tmpl-components-common.scss", "./display_group.scss"],
})
export class TmplDisplayGroupComponent extends TemplateBaseComponent implements OnInit {
  params: { style: string | null; offset: number } = {} as any;
  bgColor: string;
  type: "form" | "dashed_box" | "default";

  constructor(private elRef: ElementRef) {
    super();
  }

  @HostBinding("attr.color") get color() {
    return this.setBackground();
  }

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

  /** TODO CC 2021-12-16 - should be handled by authoring and custom styles */
  setBackground() {
    const { style } = this.params;
    if (style) {
      if (style.includes("tool_1")) return "#F89B2D";
      if (style.includes("tool_2")) return "#FF7A00";
      if (style.includes("tool_3")) return "#0F8AB2";
      if (style.includes("tool_4")) return "#096B8B";
      if (style.includes("tool_5")) return "#0D3F60";
      if (style.includes("white_box")) return "#fff";
      if (style.includes("active_banner")) return;
      if (style.includes("passive_banner")) return;
      if (style.includes("banner")) {
        const currentBgColor = document.body.style
          .getPropertyValue("--ion-background-color")
          .toLocaleLowerCase();
        const nameBgColor: string =
          currentBgColor === "#FFF6D6".toLocaleLowerCase() ? "active" : "passive";
        return this.elRef.nativeElement.style.setProperty(
          "background",
          `var(--combo-box-${nameBgColor}-with-answer-bg)`
        );
      }
    }
  }
}
