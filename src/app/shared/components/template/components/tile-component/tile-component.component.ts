import { Component, ElementRef, HostBinding, HostListener, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { getStringParamFromTemplateRow } from "../../../../utils";

@Component({
  selector: "plh-tile-component",
  templateUrl: "./tile-component.component.html",
  styleUrls: ["./tile-component.component.scss"],
})
export class TmplTileComponent extends TemplateBaseComponent implements ITemplateRowProps, OnInit {
  first_line_text: string | null;
  second_line_text: string | null;
  icon_src: string | null;
  left_icon_src: string | null;
  value: any;
  style: string | null;
  icon_result: string;
  is_play_icon: boolean;
  windowWidth: number;
  scaleFactor: number = 1;
  isCustomIcon: boolean;
  @HostListener("window:resize", ["$event"]) onResize(event) {
    this.windowWidth = event.target.innerWidth - 10;
    this.getScaleFactor();
  }
  @HostBinding("style.--scale-factor-tile") get scale() {
    return this.scaleFactor;
  }
  constructor(private elRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.getScaleFactor();
  }

  getParams() {
    this.first_line_text = getStringParamFromTemplateRow(this._row, "first_line_text", null);
    this.second_line_text = getStringParamFromTemplateRow(this._row, "second_line_text", null);
    this.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", null);
    this.left_icon_src = getStringParamFromTemplateRow(this._row, "left_icon_src", null);
    this.value = this._row.value;
    this.windowWidth = window.innerWidth;
    this.style = `
      ${getStringParamFromTemplateRow(this._row, "style", "quick_start")} 
      ${this.isParentPoint() ? "parent_point" : ""}
      ${this.isTwoColumns() ? "two_columns" : ""}
      `;
    this.is_play_icon = this.isPlayIcon(this.icon_src);
    this.isCustomIcon = this.icon_src.includes("/");
    this.isCustomIcon = this.left_icon_src.includes("/");
  }

  private isParentPoint(): boolean {
    const displayGroupElement = this.elRef.nativeElement.closest(".display-group");
    if (displayGroupElement) {
      return displayGroupElement.classList.contains("parent_point");
    } else {
      return false;
    }
  }

  private isTwoColumns(): boolean {
    const displayGroupElement = this.elRef.nativeElement.closest(".display-group");
    if (displayGroupElement) {
      return displayGroupElement.classList.contains("two_columns");
    } else {
      return false;
    }
  }

  isPlayIcon(iconSrc: string): boolean {
    if (iconSrc) return iconSrc.includes("play");
  }

  getScaleFactor(): number {
    this.scaleFactor =
      this.windowWidth / (this.isParentPoint() ? 470 : 400) > 1
        ? 1
        : this.windowWidth / (((this.isParentPoint() ? 220 : 200) + 20) * 2);
    return this.scaleFactor;
  }
}
