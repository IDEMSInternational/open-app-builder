import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { pdfDefaultOptions } from "ngx-extended-pdf-viewer";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "src/app/shared/utils";
import { isLegacyBrowser } from "src/app/shared/utils";

@Component({
  selector: "plh-pdf",
  templateUrl: "./pdf.component.html",
  styleUrls: ["./pdf.component.scss"],
  // Allow override of global pdf viewer styles
  encapsulation: ViewEncapsulation.None,
})
export class TmplPdfComponent extends TemplateBaseComponent implements OnInit {
  startingPage: number;
  legacyBrowser = false;
  errorMessage: string;

  constructor() {
    super();
    // name of folder pdf viewer assets copied to as declared in `angular.json`
    pdfDefaultOptions.assetsFolder = "assets/comp-pdf";
    // additional locales are currently excluded from main build
    pdfDefaultOptions.locale = "en-GB";
  }

  ngOnInit() {
    this.getParams();
    this.legacyBrowser = isLegacyBrowser();
  }

  getParams() {
    this.startingPage = getNumberParamFromTemplateRow(this._row, "starting_page", 1);
    this.errorMessage = getStringParamFromTemplateRow(
      this._row,
      "error_message",
      "Embedded PDFs are not supported in this browser, please use an up-to-date version of Google Chrome to view"
    );
  }
}
