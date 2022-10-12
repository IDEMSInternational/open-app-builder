import { Component, OnInit } from "@angular/core";
import { Clipboard } from "@capacitor/clipboard";
import { Subscription, timer } from "rxjs";
import {
  getBooleanParamFromTemplateRow,
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { FlowTypes, ITemplateRowProps } from "../../models";
// RxJS v6+

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
  public toggle: boolean = false;

  //emit after 1 second
  public source = timer(1000);
  //output: 0
  public subscribe: Subscription;

  ngOnInit() {
    this.getParams();
  }

  getParams() {
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

  async triggerCopyContent($event: MouseEvent, _row: FlowTypes.TemplateRow) {
    this.toggle = !this.toggle;

    this.subscribe = this.source.subscribe((val) => {
      this.toggle = !this.toggle;
    });

    let text = _row.value;
    await Clipboard.write({ string: text });
  }

  async checkClipboard() {
    const { type, value } = await Clipboard.read();
    console.log(`Got ${type} from clipboard: ${value}`);
  }
}
