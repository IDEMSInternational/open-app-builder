import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
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
import { takeUntil } from "rxjs/operators";
import { ReplaySubject } from "rxjs";
import { TemplateService } from "../../services/template.service";
import { objectToArray } from "../../utils/template-utils";

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
  implements ITemplateRowProps, OnInit, OnDestroy
{
  @Input() changeTheme: EventEmitter<boolean>;
  @Input() parent: TemplateContainerComponent;
  @ViewChild("labelImage", { static: false, read: true }) labelImage: ElementRef;
  arrayOfBtn: Array<IButton>;
  groupName: string;
  radioButtonType: string | null;
  options_per_row: number = 2;
  windowWidth: number;
  style: string;
  destroy$ = new ReplaySubject(1);
  flexWidth: string;

  constructor(private templateService: TemplateService) {
    super();
  }

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    const row = this._row;
    // extract properties from parameters
    this.radioButtonType = getParamFromTemplateRow(row, "radio_button_type", "btn_text");
    this.options_per_row = getNumberParamFromTemplateRow(this._row, "options_per_row", 3);
    this.style = getStringParamFromTemplateRow(this._row, "style", "");
    this.windowWidth = window.innerWidth;

    // convert string answer lists to formatted objects
    const answer_list: string[] = getParamFromTemplateRow(this._row, "answer_list", []);
    this.createArrayBtnElement(answer_list);

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
    if (answer_list) {
      // NOTE CC 2021-08-07 - datalists might be used which currently only format as objects
      // manually convert to array if required (temp method until better handling found)
      if (typeof answer_list === "object") {
        answer_list = objectToArray(answer_list);
      }
      this.arrayOfBtn = answer_list.map((item) => {
        // convert string to relevant mappings
        let itemObj: IButton = {} as any;
        if (typeof item === "string") {
          const stringProperties = item.split("|");
          stringProperties.forEach((s) => {
            const [field, value] = s.split(":").map((v) => v.trim());
            if (field && value) {
              itemObj[field] = value;
            }
          });
        }
        // NOTE CC 2021-08-07 - allow passing of object, not just string for conversion
        else {
          itemObj = item;
        }
        const processed = this.processButtonFields(itemObj);
        return processed;
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
  }
  private processButtonFields(button: IButton) {
    const processed: IButton = {
      text: null,
      image: null,
      name: null,
      image_checked: null,
    };
    Object.entries(button).forEach(([field, value]) => {
      switch (field) {
        case "image":
          processed[field] = value;
          break;
        case "image_checked":
          processed[field] = value;
          break;
        default:
          processed[field] = value;
      }
    });
    return processed;
  }

  getFlexWidth() {
    this.flexWidth = `0 1 ${100 / this.options_per_row - 7}%`;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
