import { Component, ElementRef, HostBinding, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-tmpl-display-group",
  template: ` <div
    class="display-group"
    (click)="clickDisplayGroup()"
    [class]="style"
    [style.marginBottom.px]="offset"
  >
    <div [style.marginBottom.px]="-offset" class="offset" [ngSwitch]="type">
      <ng-container *ngSwitchCase="'default'">
        <plh-template-component
          *ngFor="let childRow of _row.rows | filterDisplayComponent; trackBy: trackByRow"
          [row]="childRow"
          [parent]="parent"
          [attr.class]="_row.name"
        >
        </plh-template-component>
      </ng-container>
      <plh-advanced-dashed-box
        *ngSwitchCase="'dashed_box'"
        [inputRow]="_row"
        [parent]="parent"
      ></plh-advanced-dashed-box>
      <plh-tmpl-form *ngSwitchCase="'form'" [inputRow]="_row" [parent]="parent"></plh-tmpl-form>
    </div>
  </div>`,
  styleUrls: ["../tmpl-components-common.scss"],
  styles: [
    `
      .dg_weekly_workshops,
      .dg_parent_points,
      .dg_parent_centre {
        margin-left: 10px !important;
        max-width: 100% !important;
      }

      .tile_parent_points {
        padding-top: 0 !important;
      }

      .display-group.two_columns .offset {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 2fr;
      }

      .two_columns > .offset > :nth-child(1n) {
        flex: 0 0 0%;
      }

      .display-group .offset :nth-child(1n) {
        width: 100%;
        height: 100%;
        padding-top: 10px;
      }

      .display-group .offset plh-template-component.heading {
        height: auto;
      }

      .display-group .offset plh-template-component.banner {
        background: transparent;
      }

      :host {
        width: 100%;
        border-radius: 20px;
      }
      .navigation {
        justify-content: space-between;
        padding-bottom: 10px;
      }
      .navigation .offset {
        align-items: flex-end;
      }
      .parent_point .offset {
        flex-wrap: wrap;
        padding: 10px 0;
      }
      .parent_point > .offset > :nth-child(1n) {
        flex: 1 0 45%;
      }
      .two_columns_images .offset {
        /*flex-wrap: wrap;*/
        /*padding: 10px 0;*/

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 2fr;
      }
      .two_columns_images > .offset > :nth-child(1n) {
        /*flex: 1 0 45%;*/
      }
      .two_columns_images > .offset plh-template-component {
        padding: 0 20px;
        max-width: 10rem;
        max-height: 10rem;
      }
      .two_columns .offset {
        flex-wrap: wrap;
        padding: 10px 0;
      }
      .two_columns > .offset > :nth-child(1n) {
        flex: 1 0 45%;
      }
    `,
  ],
})
export class TmplDisplayGroupComponent extends TemplateBaseComponent implements OnInit {
  style: string | null;
  offset: number = 0;
  bgColor: string;
  type: string;

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
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
    this.offset = getNumberParamFromTemplateRow(this._row, "offset", 0);
    this.type = this.getTypeFromStyles(this.style || "");
  }

  private getTypeFromStyles(styles: string): string {
    let result = "default";
    if (styles) {
      switch (true) {
        case styles.includes("form"):
          result = "form";
          break;
        case styles.includes("dashed_box"):
          result = "dashed_box";
          break;
      }
    }
    return result;
  }

  setBackground() {
    if (this.style) {
      switch (true) {
        case this.style.includes("tool_1"):
          return "#F89B2D";
        case this.style.includes("tool_2"):
          return "#FF7A00";
        case this.style.includes("tool_3"):
          return "#0F8AB2";
        case this.style.includes("tool_4"):
          return "#096B8B";
        case this.style.includes("tool_5"):
          return "#0D3F60";
        case this.style.includes("white_box"):
          return "#fff";
        case this.style.includes("active_banner"):
          return;
        case this.style.includes("passive_banner"):
          return;
        case this.style.includes("banner"):
          const currentBgColor = document.body.style
            .getPropertyValue("--ion-background-color")
            .toLocaleLowerCase();
          const nameBgColor: string =
            currentBgColor === "#FFF6D6".toLocaleLowerCase() ? "active" : "passive";
          return this.elRef.nativeElement.style.setProperty(
            "background",
            `var(--combo-box-${nameBgColor}-with-answer-bg)`
          );
        default:
          break;
      }
    }
  }
}
