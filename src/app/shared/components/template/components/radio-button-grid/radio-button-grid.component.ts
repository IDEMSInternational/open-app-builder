import { Component, computed } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { filter, map, switchMap } from "rxjs/operators";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { IAnswerOption } from "src/app/shared/utils";
import { DataItemsService } from "../data-items/data-items.service";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** List of options presented as radio items */
  answer_list: coerce.objectArray<IAnswerOption>([]),
  /** Minimum item width, will increase to fit grid. Default '200px'. */
  item_width: coerce.string("200px"),
  /** Maximum grid width, if specified will center items in available space. Default '100%'. */
  grid_width: coerce.string("100%"),
  /** Spacing between grid items. Default '16px'. */
  grid_gap: coerce.string("16px"),
  /** The style variant of the button grid. Default 'default'. */
  variant: coerce.allowedValues(["default", "circle-icon", "flex", "card"], "default"),
  /** The 'secondary' style sets the colour of the buttons. Default 'default'. */
  style: coerce.allowedValues(["default", "secondary"], "default"),
  /** The property key to use for the option value. Default 'name'. */
  options_key: coerce.string("name"),
  /** The property key to use for the option display text. Default 'text'. */
  options_value: coerce.string("text"),
}));

@Component({
  selector: "plh-radio-button-grid",
  templateUrl: "./radio-button-grid.component.html",
  styleUrls: ["./radio-button-grid.component.scss"],
  standalone: false,
})
export class TmplRadioButtonGridComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  /** Computed item array from data_items child rows (if provided) or author parameters */
  public radioItems = computed(() => {
    return (this.dataItemRows() ?? this.params().answerList) as IAnswerOption[];
  });

  constructor(private dataItemsService: DataItemsService) {
    super();
  }

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

  public async handleItemClick(item: IAnswerOption) {
    await this.setValue(item[this.params().optionsKey]);
  }

  // Allow radio_button_grid to include data_items child row to define answer list
  private dataItemRows = toSignal(
    toObservable(this.rows).pipe(
      map((rows) => rows.find((r) => r.type === "data_items")),
      filter((row) => row !== undefined),
      switchMap((row) =>
        this.dataItemsService.getItemsObservable(
          row,
          this.parentContainerComponentRef.templateRowMap
        )
      )
    )
  );
}
