import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { getStringParamFromTemplateRow, parseMarkdown } from "src/app/shared/utils";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: "plh-dashed-box",
  templateUrl: "./dashed-box.component.html",
  styleUrls: ["./dashed-box.component.scss"],
})
export class TmplDashedBoxComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit
{
  style: string;
  icon_src: string | null;
  icon_position: string;
  innerHTML: SafeHtml;
  constructor(private domSanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.getParams();
    if (this._row.value) {
      this.innerHTML = this.domSanitizer.bypassSecurityTrustHtml(
        parseMarkdown(this._row.value.toString())
      );
    }
  }

  getParams() {
    this.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", "");
    this.style = getStringParamFromTemplateRow(this._row, "style", "default");
    this.icon_position = getStringParamFromTemplateRow(this._row, "icon_position", "top-left");
  }
}
