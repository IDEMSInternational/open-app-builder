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
  radioBtnList: string;
  valuesFromBtnList;
  arrayOfBtn: Array<IButton>;
  radioButtonType: string | null;
  options_per_row: number = 2;
  baseSrcAssets = "/assets/plh_assets/";
  windowWidth: number;
  scaleFactor: number = 1;
  selectedBackgroundColor: string = "#0D3F60";
  backgroundGradient: string = "168.87deg, #0F8AB2 28.12%, #0D4060 100%";
  value: any;

  @HostListener("window:resize", ["$event"]) onResize(event) {
    this.windowWidth = event.target.innerWidth;
    this.getScaleFactor();
  }

  @HostBinding("style.--scale-factor") get scale() {
    return this.scaleFactor;
  }

  @HostBinding("style.--border-color") get borderColor() {
    return this.selectedBackgroundColor;
  }

  @HostBinding("style.--bg-gradient") get bgGradientStart() {
    return this.backgroundGradient;
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
    this.radioBtnList = getParamFromTemplateRow(this._row, "radio_button_list", null) as string;
    this.radioButtonType = getStringParamFromTemplateRow(this._row, "radio_button_type", null);
    this.options_per_row = getNumberParamFromTemplateRow(this._row, "options_per_row", 3);
    this.selectedBackgroundColor = getStringParamFromTemplateRow(this._row, "color", "#0D3F60");
    this.backgroundGradient = getStringParamFromTemplateRow(
      this._row,
      "background_gradient",
      "168.87deg, #0F8AB2 28.12%, #0D4060 100%"
    );
    this.value = this._row.value;
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
