import {
  Component,
  ElementRef,
  EventEmitter,
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
  IAnswerListItem,
  getAnswerListParamFromTemplateRow,
} from "../../../../utils";
import { ReplaySubject } from "rxjs";

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
  arrayOfBtn: Array<IAnswerListItem>;
  groupName: string;
  windowWidth: number;
  private componentDestroyed$ = new ReplaySubject(1);
  flexWidth: string;

  // Parameters
  answerList: IAnswerListItem[];
  options_per_row: number;
  radioButtonType: string | null;
  style: string;

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
    this.answerList = getAnswerListParamFromTemplateRow(this._row, "answer_list", []);
    this.arrayOfBtn = this.createArrayBtnElement(this.answerList);

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
  createArrayBtnElement(answerList: IAnswerListItem[]) {
    if (answerList) {
      const arrayOfBtn = answerList.map((itemObj) => this.processButtonFields(itemObj));

      // TODO - CC 2023-03-15 could lead to strange behaviour, to review
      // (checks every item but keeps overriding the button type depending on what it finds)
      arrayOfBtn.forEach((item) => {
        if (item.image && item.text) {
          this.radioButtonType = "btn_both";
        } else if (!item.image && item.text) {
          this.radioButtonType = "btn_text";
        } else if (item.image && !item.text) {
          this.radioButtonType = "btn_image";
        }
      });
      return arrayOfBtn;
    }
  }
  private processButtonFields(button: IAnswerListItem) {
    const processed: IAnswerListItem = {
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
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
