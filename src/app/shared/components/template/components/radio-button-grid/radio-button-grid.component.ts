import { Component, computed } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { IAnswerListItem } from "src/app/shared/utils";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** List of options presented as radio items */
  answer_list: coerce.objectArray<IAnswerListItem>([]),
  /** Minimum item width, will increase to fit grid. Default '200px'. */
  item_width: coerce.string("200px"),
  /** Maximum grid width, if specified will center items in available space. Default '100%'. */
  grid_width: coerce.string("100%"),
  /** Spacing between grid items. Default '16px'. */
  grid_gap: coerce.string("16px"),
  /** The style variant of the button grid. Default 'default'. */
  variant: coerce.allowedValues(["default", "circle-icon", "flex"], "default"),
  /** The 'secondary' style sets the colour of the buttons. Default 'default'. */
  style: coerce.allowedValues(["default", "secondary"], "default"),
}));

@Component({
  selector: "plh-radio-button-grid",
  templateUrl: "./radio-button-grid.component.html",
  styleUrls: ["./radio-button-grid.component.scss"],
  standalone: false,
})
export class TmplRadioButtonGridComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  /** Computed item array from author parameters */
  public radioItems = computed(() => this.params().answerList as IAnswerListItem[]);

  /** Computed grid style passed into ngStyle */
  public gridStyle = computed<Partial<CSSStyleDeclaration>>(() => {
    const { itemWidth, gridWidth, gridGap } = this.params();
    return {
      // center grid with maximum width
      maxWidth: gridWidth,
      margin: "auto",
      // apply fixed gap between grid items
      gap: gridGap,
      // fit columns with target item width
      gridTemplateColumns: `repeat(auto-fit, minmax(${itemWidth}, 1fr))`,
      // make all rows same height
      gridAutoRows: "1fr",
    };
  });

  public async handleItemClick(item: IAnswerListItem) {
    await this.setValue(item.name);
  }
}
