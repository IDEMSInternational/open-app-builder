import { Component, ElementRef, HostBinding, HostListener, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {
  getStringParamFromTemplateRow,
  getBooleanParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";

/**
 * A general-purpose button component
 */
@Component({
  selector: "plh-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class TmplButtonComponent extends TemplateBaseComponent implements OnInit {
  /** TEMPLATE PARAMATER: "style" */
  style:
    | "information"
    | "navigation"
    | "full"
    | "flexible"
    | "medium"
    | "short"
    | "tall"
    | "standard"
    | "alternative" = "information";
  /** TEMPLATE PARAMATER: "disabled". If true, button is disabled and greyed out */
  disabled: boolean = false;
  /** TEMPLATE PARAMATER: "text_align" */
  textAlign: "left" | "centre" | "right" = "left";
  /** TEMPLATE PARAMATER: "button_align" */
  buttonAlign: "left" | "centre" | "right";
  /** TEMPLATE PARAMATER: "icon". The path to an icon asset */
  icon: string;
  /** @ignore */
  innerHTML: SafeHtml;
  /** @ignore */
  scaleFactor: number = 1;
  /** @ignore */
  windowWidth: number;
  /** @ignore */
  constructor(private elRef: ElementRef, private domSanitizer: DomSanitizer) {
    super();
  }
  /** @ignore */
  @HostListener("window:resize", ["$event"]) onResize(event) {
    this.windowWidth = event.target.innerWidth - 10;
    this.getScaleFactor();
  }
  /** @ignore */
  @HostBinding("style.--scale-factor-btn") get scale() {
    return this.scaleFactor;
  }
  /** @ignore */
  @ViewChild("ionButton", { static: true }) btn: any;
  ngOnInit() {
    this.getParams();
    this.getScaleFactor();
    this.innerHTML = this.domSanitizer.bypassSecurityTrustHtml(this._row.value);
  }

  getParams() {
    this.style = `${getStringParamFromTemplateRow(this._row, "style", "information")} ${
      this.isTwoColumns() ? "two_columns" : ""
    }` as any;
    this.disabled = getBooleanParamFromTemplateRow(this._row, "disabled", false);
    if (this._row.disabled) {
      this.disabled = true;
    }
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", "left") as any;
    this.buttonAlign = getStringParamFromTemplateRow(this._row, "button_align", "center") as any;
    this.icon = getStringParamFromTemplateRow(this._row, "icon", null);
  }

  /** Determine if the button is inside a display group with the style "two_columns" */
  private isTwoColumns(): boolean {
    const displayGroupElement = this.elRef.nativeElement.closest(".display-group-wrapper");
    if (displayGroupElement) {
      return displayGroupElement.classList.contains("two_columns");
    } else {
      return false;
    }
  }

  /** Set the scale factor for the button based on window width */
  getScaleFactor(): number {
    this.scaleFactor = this.windowWidth / 470 > 1 ? 1 : this.windowWidth / ((220 + 20) * 2);
    return this.scaleFactor;
  }
}
