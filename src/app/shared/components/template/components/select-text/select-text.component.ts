import { Component, OnInit } from "@angular/core";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "../../../../utils";
import { TemplateBaseComponent } from "../base";
import { FlowTypes, ITemplateRowProps } from "../../models";
// RxJS v6+
import { Subscription, timer } from "rxjs";

@Component({
  selector: "plh-select-text",
  templateUrl: "./select-text.component.html",
  styleUrls: ["./select-text.component.scss"],
})
export class SelectTextComponent
  extends TemplateBaseComponent
  implements OnInit, ITemplateRowProps
{
  public placeholder: string;
  public maxLength: number | string;
  public textAlign: string;
  public style: string | any;
  public isNumberInput: boolean | any;
  public prioritisePlaceholder: boolean | any;
  toggle: boolean = false;

  //emit after 1 second
  public source = timer(1000);
  //output: 0
  public subscribe: Subscription;

  ngOnInit() {
    this.getParams();
  }

  public async handleChange(value: any) {
    await this.setValue(value);
    this.triggerActions("changed");
  }

  getParams() {
    console.table(this._row);
    this.placeholder = getStringParamFromTemplateRow(this._row, "placeholder", "");
    this.maxLength = getNumberParamFromTemplateRow(this._row, "max_length", 30);
    this.textAlign = getStringParamFromTemplateRow(this._row, "text_align", "center");
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
    this.isNumberInput = getBooleanParamFromTemplateRow(this._row, "number_input", false);
    this.prioritisePlaceholder = getBooleanParamFromTemplateRow(
      this._row,
      "prioritise_placeholder",
      false
    );
  }

  triggerCopyContent($event: MouseEvent, _row: FlowTypes.TemplateRow) {
    debugger;
    this.toggle = !this.toggle;

    this.subscribe = this.source.subscribe((val) => {
      this.toggle = !this.toggle;
    });

    var text = _row.value;
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("Async: Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }
}
