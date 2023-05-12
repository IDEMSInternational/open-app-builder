import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { pdfDefaultOptions } from "ngx-extended-pdf-viewer";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";

@Component({
  selector: "plh-pdf",
  templateUrl: "./pdf.component.html",
  styleUrls: ["./pdf.component.scss"],
})
export class TmplPdfComponent extends TemplateBaseComponent implements OnInit {
  src: string;

  constructor() {
    super();
    // name of folder pdf viewer assets copied to as declared in `angular.json`
    pdfDefaultOptions.assetsFolder = "assets/comp-pdf";
    // additional locales are currently excluded from main build
    pdfDefaultOptions.locale = "en-GB";
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.src = getStringParamFromTemplateRow(this._row, "src", "");
  }
}
