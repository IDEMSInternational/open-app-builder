import { Component, Input } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { FlowTypes, ITemplateRowProps } from "../../models";
import { getParamFromTemplateRow } from "src/app/shared/utils";
import { objectToArray } from "../../utils";

interface IAnswerListItem {
  name: string;
  image?: string;
  text?: string;
}

interface IAuthorParameterList {
  /** List of options presented as radio items */
  answer_list: IAnswerListItem[];
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
  public radioItems: Array<IAnswerListItem>;

  /**
   * Computed grid style from input parameters
   * @ignore
   */
  public gridStyle: Partial<CSSStyleDeclaration>;

  /**
   * Authoring parameters
   */
  protected parameter_list: IAuthorParameterList;

  @Input() set row(row: FlowTypes.TemplateRow) {
    this._row = row;
    this.setParams();
  }

  /**
   * S
   * @ignore
   */
  public async handleItemClick(item: IAnswerListItem) {
    await this.setValue(item.name);
    this.triggerActions("changed");
  }

  private setParams() {
    this.radioItems = this.generateItemList();
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
    const radioItems: IAnswerListItem[] = answerList.map(
      (item: string | Record<string, string>) => {
        if (typeof item === "string") {
          return this.parseAnswerListItemString(item);
        }
        return item as any;
      }
    );
    return radioItems;
  }

  /**
   * convert string to relevant mappings
   * TODO - CC 2023-03-16 - should ideally convert in parsers instead of at runtime
   */
  private parseAnswerListItemString(item: string) {
    const itemObj: IAnswerListItem = {} as any;
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