import { Component, computed, effect } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { filter, map, switchMap } from "rxjs/operators";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { IAnswerOption } from "src/app/shared/utils";
import { DataItemsService } from "../data-items/data-items.service";

/** Shape of the row value when `value_as_object` is true. */
export interface IRadioButtonGridObjectValue {
  key: string;
  value: string | null;
}

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
  /**
   * Key of the option to select when the row has no value of its own, i.e. the option's
   * `options_key` field. Applied once, as soon as the answer options are available, and written
   * in whichever shape `value_as_object` specifies.
   *
   * Provides a way to preselect an option by key when `value_as_object` is true, where authoring
   * the full object value on the row directly is impractical. An authored row `value` takes
   * precedence, so the two should not be combined.
   */
  initial_selected_option_key: coerce.string(""),
  /**
   * When true, the row value is set as `{ key, value }` using the selected option's
   * options_key and options_value fields. When false (default), the value is the key string only.
   */
  value_as_object: coerce.boolean(false),
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
    const items = (this.dataItemRows() ?? this.params().answerList) as IAnswerOption[];
    const optionsValue = this.params().optionsValue;
    // Drop name-only stubs (e.g. template-generated lists with no text/image).
    return items.filter((item) => {
      const label = item[optionsValue];
      return (label !== undefined && label !== null && label !== "") || !!item.image;
    });
  });

  /** Key of the selected option (extracted from the object value when needed). */
  public selectedKey = computed(() => {
    const value = this.value();
    if (this.params().valueAsObject && value && typeof value === "object") {
      return (value as IRadioButtonGridObjectValue).key;
    }
    return value;
  });

  /** Whether `initial_selected_option_key` has been resolved (applied or discarded). */
  private hasAppliedInitialSelection = false;

  constructor(private dataItemsService: DataItemsService) {
    super();
    // Apply `initial_selected_option_key` once the answer options are known (they may arrive
    // asynchronously via a nested `data_items` row, and are needed to build an object value).
    effect(() => {
      if (this.hasAppliedInitialSelection) return;
      const initialKey = this.params().initialSelectedOptionKey;
      // Wait rather than discard - a dynamic reference may not have resolved yet
      if (!initialKey || this.radioItems().length === 0) return;
      this.hasAppliedInitialSelection = true;
      void this.applyInitialSelection(initialKey);
    });
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

  public isOptionSelected(item: IAnswerOption): boolean {
    return this.optionKey(item) === this.selectedKey();
  }

  /** Select an option from the grid, as clicked in the default variant. */
  public async handleItemClick(item: IAnswerOption) {
    await this.handleKeySelection(this.optionKey(item));
  }

  /** Select an option by key, as emitted by the card variant's radio group. */
  public async handleKeySelection(selectedKey: string) {
    await this.setValue(this.buildValueForKey(selectedKey));
  }

  /**
   * Read an option's `options_key` field. Cast as an answer list types every field as possibly
   * null or undefined, whereas an option rendered in the grid is expected to have a key.
   */
  private optionKey(item: IAnswerOption): string {
    return item[this.params().optionsKey] as string;
  }

  /** Build the row value representing a selected option, in the shape set by `value_as_object`. */
  private buildValueForKey(selectedKey: string): string | IRadioButtonGridObjectValue {
    if (!this.params().valueAsObject) return selectedKey;
    const option = this.radioItems().find((item) => this.optionKey(item) === selectedKey);
    return { key: selectedKey, value: option?.[this.params().optionsValue] ?? null };
  }

  /**
   * Select the option named by `initial_selected_option_key`, writing the value in full so that
   * references such as `@local.<row_name>.key` resolve before the user has touched the grid.
   * Triggers `set_self` (and so dependent row re-evaluation) but not `changed` actions, as this
   * is initialisation rather than a user selection.
   */
  private async applyInitialSelection(initialKey: string) {
    const currentValue = this.value();
    if (currentValue !== undefined && currentValue !== null && currentValue !== "") {
      console.warn(
        "[radio_button_grid] `initial_selected_option_key` ignored as row already has a value",
        {
          row: this._row?.name,
          value: currentValue,
        }
      );
      return;
    }
    // Compare as strings, as the authored parameter cannot express a non-string data list key,
    // then select using the option's own key so the type matches what a click would produce.
    const option = this.radioItems().find((item) => String(this.optionKey(item)) === initialKey);
    if (!option) {
      console.warn(
        "[radio_button_grid] `initial_selected_option_key` does not match any answer option",
        {
          row: this._row?.name,
          initial_selected_option_key: initialKey,
          options_key: this.params().optionsKey,
        }
      );
      return;
    }
    await this.setValue(this.buildValueForKey(this.optionKey(option)), false);
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
