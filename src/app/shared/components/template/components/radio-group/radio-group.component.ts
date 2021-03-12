import { Component, Input, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { TemplateContainerComponent } from "../../template-container.component";
import {
  getNumberParamFromTemplateRow,
  getStringParamFromTemplateRow,
  getStringParamFromTemplateRowValueList
} from "../../../../utils";

interface IButton {
  name: string | null;
  image: string | null;
  text: string | null;
}

@Component({
  selector: "plh-radio-group",
  templateUrl: "./radio-group.component.html",
  styleUrls: ["./radio-group.component.scss"]
})
export class TmplRadioGroupComponent extends TemplateBaseComponent implements ITemplateRowProps, OnInit {
  @Input() parent: TemplateContainerComponent;
  radioBtnList: string | null;
  valuesFromBtnList;
  arrayOfBtn: Array<IButton>;
  radioButtonType: string | null;
  options_per_row: number = 2;

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.radioBtnList = getStringParamFromTemplateRowValueList(this._row, "radio_button_list", null);
    this.radioButtonType = getStringParamFromTemplateRow(this._row, "radio_button_type", null);
    this.options_per_row = getNumberParamFromTemplateRow(this._row, "options_per_row", 2);
    if (this.radioBtnList) {
      this.valuesFromBtnList = this.radioBtnList.split(";").filter(item => item !== "");
      this.createArrayBtnElement();
    }
  }

  createArrayBtnElement() {
    this.arrayOfBtn = this.valuesFromBtnList.map((item) => {
      const obj: IButton = {
        text: null,
        image: null,
        name: null
      };
      item.split("|").map((values) => {
        obj[values.split(":")[0].trim()] = values.split(":")[1].trim();
      });
      return obj;
    });
  }

 get getFlexWidth(): string {
    return `0 1 ${100 / this.options_per_row - 3}%`
  }
}
