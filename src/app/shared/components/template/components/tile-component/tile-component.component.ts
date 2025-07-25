import { Component, ElementRef, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";

@Component({
  selector: "plh-tile-component",
  templateUrl: "./tile-component.component.html",
  styleUrls: ["./tile-component.component.scss"],
})
export class TmplTileComponent extends TemplateBaseComponent implements OnInit {
  first_line_text: string | null;
  second_line_text: string | null;
  icon_src: string | null;
  left_icon_src: string | null;
  value: any;
  style: string | null;
  icon_result: string;
  is_play_icon: boolean;
  windowWidth: number;
  isCustomIcon: boolean;

  constructor(private elRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.first_line_text = getStringParamFromTemplateRow(this._row, "first_line_text", null);
    this.second_line_text = getStringParamFromTemplateRow(this._row, "second_line_text", null);
    this.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", null);
    this.left_icon_src = getStringParamFromTemplateRow(this._row, "left_icon_src", "");
    this.value = this._row.value;
    this.windowWidth = window.innerWidth;
    this.style = `
      ${getStringParamFromTemplateRow(this._row, "style", "quick_start")} 
      ${this.isParentPoint() ? "parent_point" : ""}
      ${this.isTwoColumns() ? "two_columns" : ""}
      `;
    this.is_play_icon = this.isPlayIcon(this.icon_src);
    this.isCustomIcon = this.icon_src?.includes("/");
    // I had added the line below to have the option of including plh assets rather than pre-built ion icons.
    // Having this line made the parent_point style in the display group behave very strangely in the parent centre.
    // Commented it out for now as we don't need custom-made icons for the ime eng but will create an issue in GH.
    //this.isCustomIcon = this.left_icon_src.includes("/");
  }

  private isParentPoint(): boolean {
    const displayGroupElement = this.elRef.nativeElement.closest(".display-group-wrapper");
    if (displayGroupElement) {
      return displayGroupElement.classList.contains("parent_point");
    } else {
      return false;
    }
  }

  private isTwoColumns(): boolean {
    const displayGroupElement = this.elRef.nativeElement.closest(".display-group-wrapper");
    if (displayGroupElement) {
      return displayGroupElement.classList.contains("two_columns");
    } else {
      return false;
    }
  }

  isPlayIcon(iconSrc: string): boolean {
    if (iconSrc) return iconSrc.includes("play");
  }
}
