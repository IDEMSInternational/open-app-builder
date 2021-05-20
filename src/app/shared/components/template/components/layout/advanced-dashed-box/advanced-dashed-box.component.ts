import { Component, OnInit } from "@angular/core";
import { SafeHtml, DomSanitizer } from "@angular/platform-browser";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../../base";

@Component({
  selector: "plh-advanced-dashed-box",
  templateUrl: "./advanced-dashed-box.component.html",
  styleUrls: ["./advanced-dashed-box.component.scss"],
})
export class TmplAdvancedDashedBoxComponent extends TemplateBaseComponent implements OnInit {
  style: string;
  icon_src: string | null;
  assetsPrefix = "/assets/plh_assets/";
  icon_result: string;
  icon_position: string;
  innerHTML: SafeHtml;

  constructor(private domSanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.innerHTML = this.domSanitizer.bypassSecurityTrustHtml(this._row.value);
  }

  getParams() {
    this.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", "");
    this.style = getStringParamFromTemplateRow(this._row, "style", "default");
    this.icon_result = this.getPathImg();
    this.icon_position = getStringParamFromTemplateRow(this._row, "icon_position", "top-left");
  }

  getPathImg(): string {
    const src = this.assetsPrefix + this.icon_src;
    return src.replace("//", "/");
  }
}
