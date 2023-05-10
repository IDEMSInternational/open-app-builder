import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
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
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.src = getStringParamFromTemplateRow(this._row, "src", "");
  }
}
