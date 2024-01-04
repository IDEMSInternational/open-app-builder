import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { getStringParamFromTemplateRow } from "../../../../utils";

interface ITextParams {
  /** TEMPLATE PARAMETER: text_align */
  textAlign: string;
  /**
   * TEMPLATE PARAMETER: style
   * Legacy: use variants for text styles instead
   * */
  style: "numbered" | "contextual" | "emphasised" | "alternative" | string | null;
  /**
   * TEMPLATE PARAMETER: variant
   * A list of named style variants of the component, separated by spaces or commas
   * */
  variant: "caption" | "numbered" | "contextual" | "emphasised" | "alternative" | "";
}

@Component({
  selector: "plh-tmpl-text",
  templateUrl: "./text.component.html",
  styleUrls: ["../tmpl-components-common.scss", "./text.component.scss"],
})
export class TmplTextComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<ITextParams> = {};
  type: string;
  isFalsy: boolean;
  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.params.textAlign = getStringParamFromTemplateRow(this._row, "text_align", null);
    this.params.style = getStringParamFromTemplateRow(this._row, "style", null);
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "")
      .split(",")
      .join(" ") as ITextParams["variant"];
    this.isFalsy = ["undefined", "NaN", "null", '""'].includes(this._row.value);
    this.type =
      this.params.style?.includes("numbered") || this.params.variant?.includes("numbered")
        ? "numbered"
        : "marked";
  }
}
