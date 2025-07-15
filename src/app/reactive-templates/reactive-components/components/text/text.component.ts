import { Component, OnInit } from "@angular/core";
// import { getStringParamFromTemplateRow } from "../../../../utils";
import { ReactiveBaseComponent } from "../../reactive-base.component";

interface ITextParams {
  style: string | null;
  textAlign: string | null;
  type: string;
}

@Component({
  selector: "oab-tmpl-text",
  templateUrl: "./text.component.html",
  // styleUrls: ["../tmpl-components-common.scss", "./text.component.scss"],
  styleUrls: ["./text.component.scss"],
})
export class TextComponent extends ReactiveBaseComponent implements OnInit {
  // params: Partial<ITextParams> = {};
  // hasTextValue: boolean;

  ngOnInit() {
    // this.getParams();
  }

  // getParams() {
  //   this.hasTextValue = !["undefined", "NaN", "null", '""'].includes(this._row.value as string);
  //   this.params.textAlign = getStringParamFromTemplateRow(this._row, "text_align", null);
  //   this.params.type = this._row.parameter_list?.style?.includes("numbered")
  //     ? "numbered"
  //     : "marked";
  //   this.params.style = getStringParamFromTemplateRow(this._row, "style", null);
  // }
}
