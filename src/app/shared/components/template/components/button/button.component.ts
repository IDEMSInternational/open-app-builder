import { Component, ElementRef, HostBinding, HostListener, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {
  getStringParamFromTemplateRow,
  getBooleanParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";

@Component({
  selector: "plh-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class TmplButtonComponent extends TemplateBaseComponent implements OnInit {
  style: "primary" | "nested_color" = "primary";
  color: string | null;
  disabled: boolean = false;
  textAlign: string;
  buttonAlign: string;
  innerHTML: SafeHtml;
  scaleFactor: number = 1;
  windowWidth: number;
  icon: string;
  constructor(private elRef: ElementRef, private domSanitizer: DomSanitizer) {
    super();
  }
  @HostListener("window:resize", ["$event"]) onResize(event) {
    this.windowWidth = event.target.innerWidth - 10;
    this.getScaleFactor();
  }
  @HostBinding("style.--scale-factor-btn") get scale() {
    return this.scaleFactor;
  }
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
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", "left");
    this.buttonAlign = getStringParamFromTemplateRow(this._row, "button_align", "center");
    this.icon = getStringParamFromTemplateRow(this._row, "icon", null);
  }

  private isTwoColumns(): boolean {
    const displayGroupElement = this.elRef.nativeElement.closest(".display-group-wrapper");
    if (displayGroupElement) {
      return displayGroupElement.classList.contains("two_columns");
    } else {
      return false;
    }
  }
  getScaleFactor(): number {
    this.scaleFactor = this.windowWidth / 470 > 1 ? 1 : this.windowWidth / ((220 + 20) * 2);
    return this.scaleFactor;
  }
}
