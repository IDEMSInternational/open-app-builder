import { Component, ElementRef, HostBinding, OnInit, ViewEncapsulation } from "@angular/core";
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
    <div [style.marginBottom.px]="-offset" class="offset">
      <plh-template-component
        *ngFor="let childRow of _row.rows"
        [row]="childRow"
        [parent]="parent"
      ></plh-template-component>
    </div>
  </div>`,
  styleUrls: ["../tmpl-components-common.scss"],
  styles: [
    `
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
    `,
  ],
})
export class TmplDisplayGroupComponent extends TemplateBaseComponent implements OnInit {
  style: string | null;
  offset: number = 0;
  bgColor: string;

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
  }

  setBackground() {
    switch (this.style) {
      case "tool_1":
        return "#F89B2D";
      case "tool_2":
        return "#FF7A00";
      case "tool_3":
        return "#0F8AB2";
      case "tool_4":
        return "#096B8B";
      case "tool_5":
        return "#0D3F60";
      default:
        return "#0D4060";
    }
  }
}
