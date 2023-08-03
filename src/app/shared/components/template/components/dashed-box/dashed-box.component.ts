import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { getStringParamFromTemplateRow } from "../../../../utils";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import * as marked from "marked"; // import the marked library
// the library allows for markdown to be parsed into html
// source: https://marked.js.org
// using parse() method from library it converts the markdown into
// HTML and then the bypassSecurityTrustHtml() method is used to convert it to
// a SafeHtml object which is then passed to the innerHTML property of the div

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
    this.innerHTML = this.domSanitizer.bypassSecurityTrustHtml(marked.parse(this._row.value));
  }

  getParams() {
    this.icon_src = getStringParamFromTemplateRow(this._row, "icon_src", "");
    this.style = getStringParamFromTemplateRow(this._row, "style", "default");
    this.icon_position = getStringParamFromTemplateRow(this._row, "icon_position", "top-left");
  }
}
