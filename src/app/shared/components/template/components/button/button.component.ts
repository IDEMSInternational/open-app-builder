import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { getStringParamFromTemplateRow, getBooleanParamFromTemplateRow } from "../../../../utils";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class TmplButtonComponent extends TemplateBaseComponent implements OnInit, AfterContentInit {
  style: string = "primary";
  color: string | null;
  disabled: boolean = false;
  textAlign: string;
  buttonAlign: string;
  nestedStyle: boolean = false;
  nestedProperty: string;
  nestedStyleName = "nested_color";
  constructor(private elRef: ElementRef) {
    super();
  }
  @ViewChild("ionButton", { static: true }) btn: any;
  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.style = getStringParamFromTemplateRow(this._row, "style", "passive");
    this.disabled = getBooleanParamFromTemplateRow(this._row, "disabled", false);
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", "center");
    this.buttonAlign = getStringParamFromTemplateRow(this._row, "button_align", "center");
    this.nestedStyle = this.style.includes(this.nestedStyleName);
  }

  ngAfterContentInit() {
    if (this.nestedStyle) {
      this.setNestedStyle();
    }
  }

  setNestedStyle() {
    const color = this.elRef.nativeElement.parentElement.parentElement.parentElement.parentElement.parentElement.attributes[
      "color"
    ].value.trim();
    this.nestedProperty = `linear-gradient(${this.hexToRGB(color, "down", 2)} 0%, ${this.hexToRGB(
      color,
      "down",
      3
    )} 100%)`;
  }
  hexToRGB(hex, change: "up" | "down", tone: number) {
    const adjust = (change === "up" ? 16 : -16) * tone;
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return (
      "rgb(" +
      (r + adjust > 255 ? 255 : r + adjust <= 0 ? 0 : r + adjust) +
      "," +
      " " +
      (g + adjust > 255 ? 255 : g + adjust <= 0 ? 0 : g + adjust) +
      ", " +
      "" +
      (b + adjust > 255 ? 255 : b + adjust <= 0 ? 0 : b + adjust) +
      ")"
    );
  }
}
