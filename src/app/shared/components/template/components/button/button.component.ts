import { Component, ElementRef, OnInit } from "@angular/core";
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
  /** TEMPLATE PARAMETER: "style" */
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
  /** TEMPLATE PARAMETER: "disabled". If true, button is disabled and greyed out */
  disabled: boolean = false;
  /** TEMPLATE PARAMETER: "text_align" */
  textAlign: "left" | "centre" | "right" = "left";
  /** TEMPLATE PARAMETER: "button_align" */
  buttonAlign: "left" | "centre" | "right" = "centre";
  /** TEMPLATE PARAMETER: "icon". The path to an icon asset */
  icon: string;

  /** @ignore */
  constructor(private elRef: ElementRef) {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  private getParams() {
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
}
