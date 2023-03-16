import { Component, Input, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { FlowTypes, ITemplateRowProps } from "../../models";
import { getParamFromTemplateRow } from "src/app/shared/utils";
import { objectToArray } from "../../utils";

interface IRadioButton {
  name: string | null;
  image: string | null;
  text: string | null;
  image_checked: string | null;
}

@Component({
  selector: "plh-radio-group-grid",
  templateUrl: "./radio-group-grid.component.html",
  styleUrls: ["./radio-group-grid.component.scss"],
})
export class TmplRadioGroupGridComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps
{
  /**
   * Computed item array from input parameters
   * @ignore
   */
  public radioButtons: Array<IRadioButton>;

  /**
   * Computed grid style from input parameters
   * @ignore
   */
  public gridStyle: Partial<CSSStyleDeclaration>;

  /**
   * Authoring parameters
   */
  protected parameter_list: {
    /** List of options presented as radio items */
    answer_list: string[];
    /**
     * Minimum item width, will increase to fit grid
     * default '200px'
     **/
    item_width: string;

    /**
     * Maximum grid width, if specified will center items in available space
     * default '100%'
     **/
    grid_width: string;
  };

  @Input() set row(row: FlowTypes.TemplateRow) {
    this._row = row;
    this.setParams();
  }

  /**
   * S
   * @ignore
   */
  public async handleRadioButtonClick(radioButton: IRadioButton) {
    await this.setValue(radioButton.name);
    this.triggerActions("changed");
  }

  private setParams() {
    this.radioButtons = this.generateItemList();
    this.gridStyle = this.generateGridStyle();
  }

  /**
   * Create a list of styles to be passed into ngStyle
   * https://thesoftwayfarecoder.com/dynamically-creating-css-classes-in-angular/
   */
  private generateGridStyle() {
    const minItemWidth = getParamFromTemplateRow(this._row, "item_width", "200px");
    const maxGridWidth = getParamFromTemplateRow(this._row, "grid_width", "100%");
    const style: Partial<CSSStyleDeclaration> = {
      // center grid with maximum width
      maxWidth: maxGridWidth,
      margin: "auto",
      // fit columns with target item width
      gridTemplateColumns: `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`,
      // make all rows same height
      gridAutoRows: "1fr",
    };
    return style;
  }

  /**
   * Adapted from radio-group.component
   * Convert input answer_list to rendered item list
   */
  private generateItemList() {
    let answerList = getParamFromTemplateRow(this._row, "answer_list", []);
    // Convert if datalist input (hashmap to array)
    if (answerList.constructor === {}.constructor) {
      answerList = objectToArray(answerList);
    }
    const radioButtons: IRadioButton[] = answerList.map((item: string | Record<string, string>) => {
      if (typeof item === "string") {
        return this.parseAnswerListItemString(item);
      }
      return item as any;
    });
    return radioButtons;
  }

  /**
   * convert string to relevant mappings
   * TODO - CC 2023-03-16 - should ideally convert in parsers instead of at runtime
   */
  private parseAnswerListItemString(item: string) {
    const itemObj: IRadioButton = {} as any;
    const stringProperties = item.split("|");
    stringProperties.forEach((s) => {
      const [field, value] = s.split(":").map((v) => v.trim());
      if (field && value) {
        itemObj[field] = value;
      }
    });
    return itemObj;
  }
}
