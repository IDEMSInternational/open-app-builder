import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from ".././base";
import { ITemplateRowProps } from "../../models";
import { getStringParamFromTemplateRow } from "../../../../utils";

interface ITitleParams {
  /** TEMPLATE PARAMETER: "help". Tooltip text */
  help: string | null;
  /** TEMPLATE PARAMETER: "tooltip_position". Default "right". */
  tooltipPosition: string;
  /** TEMPLATE PARAMETER: "text_align". Default "left"". */
  textAlign: "left" | "right" | "center";
  /** TEMPLATE PARAMETER: "style". */
  style: string | null;
  /** TEMPLATE PARAMETER: "variant". */
  variant: "" | "header" | "list-title" | "page-title";
}

@Component({
  selector: "plh-tmpl-title",
  templateUrl: "./title.component.html",
  styleUrls: ["./title.component.scss"],
})
export class TmplTitleComponent extends TemplateBaseComponent implements ITemplateRowProps, OnInit {
  params: Partial<ITitleParams> = {};

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.params.help = getStringParamFromTemplateRow(this._row, "help", null);
    this.params.tooltipPosition = getStringParamFromTemplateRow(
      this._row,
      "tooltip_position",
      "right"
    );
    this.params.style = getStringParamFromTemplateRow(this._row, "style", "tiny standard");
    this.params.textAlign = getStringParamFromTemplateRow(
      this._row,
      "text_align",
      "left"
    ) as ITitleParams["textAlign"];
    this.params.variant = getStringParamFromTemplateRow(this._row, "variant", "")
      .split(",")
      .join(" ") as ITitleParams["variant"];
  }
}
