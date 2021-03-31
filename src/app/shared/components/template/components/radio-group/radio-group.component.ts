import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { TemplateContainerComponent } from "../../template-container.component";
import {
  getNumberParamFromTemplateRow,
  getParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "../../../../utils";

interface IButton {
  name: string | null;
  image: string | null;
  text: string | null;
  image_checked: string | null;
}

@Component({
  selector: "plh-radio-group",
  templateUrl: "./radio-group.component.html",
  styleUrls: ["./radio-group.component.scss"],
})
export class TmplRadioGroupComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  @Input() parent: TemplateContainerComponent;
  @ViewChild("labelImage", { static: false, read: true }) labelImage: ElementRef;
  radioBtnList: any;
  valuesFromBtnList;
  arrayOfBtn: Array<IButton>;
  radioButtonType: string | null;
  options_per_row: number = 2;
  baseSrcAssets = "/assets/plh_assets/";
  windowWidth: number;
  scaleFactor: number = 1;
  value: any;
  style: string;

  @HostListener("window:resize", ["$event"]) onResize(event) {
    this.windowWidth = event.target.innerWidth;
    this.getScaleFactor();
  }

  @HostBinding("style.--scale-factor") get scale() {
    return this.scaleFactor;
  }

  constructor() {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.getScaleFactor();
  }

  getScaleFactor(): number {
    this.scaleFactor =
      this.windowWidth / (150 * this.options_per_row) > 1
        ? 1
        : this.windowWidth / ((120 + 20) * this.options_per_row);
    return this.scaleFactor;
  }

  getParams() {
    this.radioBtnList = getParamFromTemplateRow(this._row, "answer_list", null);
    this.radioButtonType = getStringParamFromTemplateRow(this._row, "radio_button_type", null);
    this.options_per_row = getNumberParamFromTemplateRow(this._row, "options_per_row", 3);
    this.value = this._row.value;
    this.style = getStringParamFromTemplateRow(this._row, "style", "passive");
    this.windowWidth = window.innerWidth;
    if (this.radioBtnList) {
      this.valuesFromBtnList = this.radioBtnList.split(";").filter((item) => item !== "");
      this.createArrayBtnElement();
    }
  }

  createArrayBtnElement() {
    this.arrayOfBtn = this.valuesFromBtnList.map((item) => {
      const obj: IButton = {
        text: null,
        image: null,
        name: null,
        image_checked: null,
      };
      item.split("|").map((values) => {
        obj[values.split(":")[0].trim()] = values.split(":")[1].trim();
      });
      return obj;
    });
  }

  getPathImg(path): string {
    const src = this.baseSrcAssets + path;
    return src.replace("//", "/");
  }

  get getFlexWidth(): string {
    return `0 1 ${100 / this.options_per_row - 3}%`;
  }
}
