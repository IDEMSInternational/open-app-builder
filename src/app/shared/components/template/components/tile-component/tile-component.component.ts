import { Component, HostBinding, HostListener, OnInit } from "@angular/core";
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
  value: any;
  style: string | null;
  assetsPrefix = "/assets/plh_assets/";
  icon_result: string;
  is_play_icon: boolean;
  windowWidth: number;
  scaleFactor: number = 1;
  @HostListener("window:resize", ["$event"]) onResize(event) {
    this.windowWidth = event.target.innerWidth - 10;
    this.getScaleFactor();
  }
  @HostBinding("style.--scale-factor-tile") get scale() {
    return this.scaleFactor;
  }
  constructor() {
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
    this.value = this._row.value;
    this.windowWidth = window.innerWidth;
    this.style = getStringParamFromTemplateRow(this._row, "style", "quick_start");
    this.icon_result = this.getPathImg();
    this.is_play_icon = this.isPlayIcon(this.icon_src);
  }

  isPlayIcon(iconSrc: string): boolean {
    if (iconSrc) return iconSrc.includes("play");
  }

  getPathImg(): string {
    const src = this.assetsPrefix + this.icon_src;
    return src.replace("//", "/");
  }

  getScaleFactor(): number {
    this.scaleFactor = this.windowWidth / 400 > 1 ? 1 : this.windowWidth / ((200 + 20) * 2);
    return this.scaleFactor;
  }
}
