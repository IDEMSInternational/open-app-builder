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
  arrayOfBtn: Array<IButton>;
  groupName: string;
  radioButtonType: string | null;
  options_per_row: number = 2;
  baseSrcAssets = "/assets/plh_assets/";
  windowWidth: number;
  scaleFactor: number = 1;
  value: any;
  style: string;
  imageCheckedColor = "#0D3F60";
  flexWidth: string;
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
    const row = this._row;
    console.log("getting params", row);

    // extract properties from parameters
    this.radioButtonType = getParamFromTemplateRow(row, "radio_button_type", "btn_text");
    this.options_per_row = getNumberParamFromTemplateRow(this._row, "options_per_row", 3);
    this.style = getStringParamFromTemplateRow(this._row, "style", "passive");
    this.imageCheckedColor = this.style === "active" ? "#f89b2d" : "#0D3F60";
    this.windowWidth = window.innerWidth;

    // convert string answer lists to formatted objects
    const answer_list: string[] = getParamFromTemplateRow(this._row, "answer_list", []);
    this.arrayOfBtn = this.createArrayBtnElement(answer_list);

    this.getFlexWidth();
    this.groupName = this._row._nested_name;
  }

  public async handleRadioButtonClick(selectedValue: string) {
    await this.setValue(selectedValue);
    this.triggerActions("changed");
  }

  /**
   * Answer lists are formatted as strings with to indicate properties, e.g.
   * [
   * "name:happy | image:plh_images/stickers/faces/happier.svg | image_checked:plh_images/stickers/faces/happier.svg",
   * "name:unhappy | image:plh_images/stickers/faces/unhappy.svg"
   * ]
   * Convert to an object array, with key value pairs extracted from the string values
   */
  createArrayBtnElement(answer_list: string[]) {
    return answer_list.map((item) => {
      const obj: IButton = {
        text: null,
        image: null,
        name: null,
        image_checked: null,
      };
      const stringProperties = item.split("|");
      stringProperties.forEach((s) => {
        const [field, value] = s.split(":").map((v) => v.trim());
        if (field && value) {
          switch (field) {
            case "image":
              obj[field] = this.getPathImg(value);
              break;
            case "image_checked":
              obj[field] = this.getPathImg(value);
              break;

            default:
              obj[field] = value;
              break;
          }
        }
      });
      return obj;
    });
    this.arrayOfBtn.forEach((item) => {
      if (item.image && item.text) {
        this.radioButtonType = "btn_both";
      } else if (!item.image && item.text) {
        this.radioButtonType = "btn_text";
      } else if (item.image && !item.text) {
        this.radioButtonType = "btn_image";
      }
    });
  }

  getPathImg(path: string): string {
    const src = this.baseSrcAssets + path;
    return src.replace("//", "/");
  }

  automaticallyRadioBtnType(type: string) {}
  getFlexWidth() {
    this.flexWidth = `0 1 ${100 / this.options_per_row - 7}%`;
  }
}
