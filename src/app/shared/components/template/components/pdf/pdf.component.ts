import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { pdfDefaultOptions } from "ngx-extended-pdf-viewer";
import { getNumberParamFromTemplateRow } from "src/app/shared/utils";

@Component({
  selector: "plh-pdf",
  templateUrl: "./pdf.component.html",
  styleUrls: ["./pdf.component.scss"],
})
export class TmplPdfComponent extends TemplateBaseComponent implements OnInit {
  startingPage: number;

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
    this.startingPage = getNumberParamFromTemplateRow(this._row, "starting_page", 1);
  }
}
