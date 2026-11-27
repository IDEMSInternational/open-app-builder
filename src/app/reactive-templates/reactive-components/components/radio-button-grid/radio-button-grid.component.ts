import { Component, computed, effect } from "@angular/core";
import { NgStyle } from "@angular/common";
import { TranslatedAssetPipe } from "src/app/shared/components/template/pipes/plh-asset.pipe";
import type { IRadioButtonGridObjectValue } from "src/app/shared/components/template/components/radio-button-grid/radio-button-grid.component";
import { RadioButtonGridCardComponent } from "src/app/shared/components/template/components/radio-button-grid/radio-button-grid-card/radio-button-grid-card.component";
import { coerceMethods } from "src/app/shared/components/template/utils/parameter-list.utils";
import { IAnswerOption } from "src/app/shared/utils";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";

const parameters = () =>
  defineParameters({
    answerList: new Parameter<unknown>("answer_list", [], "list"),
    itemWidth: new Parameter("item_width", "200px"),
    gridWidth: new Parameter("grid_width", "100%"),
    gridGap: new Parameter("grid_gap", "16px"),
    variant: Parameter.oneOf("variant", ["default", "circle-icon", "flex", "card"], "default"),
    style: Parameter.oneOf("style", ["default", "secondary"], "default"),
    optionsKey: new Parameter("options_key", "name"),
    optionsValue: new Parameter("options_value", "text"),
    initialSelectedOptionKey: new Parameter("initial_selected_option_key", ""),
    valueAsObject: new Parameter("value_as_object", false),
  });

const isEmpty = (value: unknown) => value === undefined || value === null || value === "";

/** A list held by a row without `value_type: list` arrives as JSON text */
function parseJsonText(value: unknown) {
  if (typeof value !== "string" || !/^\s*[[{]/.test(value)) return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

@Component({
  // The legacy selector, so that theme overrides for the grid apply
  selector: "plh-radio-button-grid",
  templateUrl: "./radio-button-grid.component.html",
  styleUrls: [
    "../../../../shared/components/template/components/radio-button-grid/radio-button-grid.component.scss",
  ],
  imports: [NgStyle, TranslatedAssetPipe, RadioButtonGridCardComponent],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class RadioButtonGridComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  /** Answer options from `answer_list`: an array, a hashmap, or text in either form */
  public radioItems = computed(() => {
    const items = coerceMethods
      .objectArray<IAnswerOption>([])
      .parse(parseJsonText(this.params.answerList.value()) ?? []);
    const optionsValue = this.params.optionsValue.value();
    return items.filter((item) => !isEmpty(item[optionsValue]) || !!item.image);
  });

  /** Key of the selected option, including when the row stores an object value. */
  public selectedKey = computed(() => {
    const value = this.value();
    if (this.params.valueAsObject.value() && value && typeof value === "object") {
      return (value as IRadioButtonGridObjectValue).key;
    }
    return value;
  });

  /**
   * The selected option's own key. The stored key is text, as the row value is evaluated,
   * while option keys from a data list can be numbers.
   */
  public selectedOptionKey = computed(() => {
    const option = this.radioItems().find((item) => this.isOptionSelected(item));
    return option ? this.optionKey(option) : undefined;
  });

  private hasAppliedInitialSelection = false;

  public gridStyle = computed<Partial<CSSStyleDeclaration>>(() => ({
    maxWidth: this.params.gridWidth.value(),
    margin: "auto",
    gap: this.params.gridGap.value(),
    gridTemplateColumns: `repeat(auto-fit, minmax(${this.params.itemWidth.value()}, 1fr))`,
    gridAutoRows: "1fr",
  }));

  constructor() {
    super();
    effect(() => {
      if (!this.initialised() || this.hasAppliedInitialSelection) return;
      const initialKey = this.params.initialSelectedOptionKey.value();
      const items = this.radioItems();
      if (!initialKey || items.length === 0) return;
      this.hasAppliedInitialSelection = true;
      void this.applyInitialSelection(initialKey);
    });
  }

  public isOptionSelected(item: IAnswerOption): boolean {
    const selectedKey = this.selectedKey();
    return !isEmpty(selectedKey) && String(this.optionKey(item)) === String(selectedKey);
  }

  public async handleItemClick(item: IAnswerOption): Promise<void> {
    await this.handleKeySelection(this.optionKey(item));
  }

  public handleItemKeydown(event: KeyboardEvent, item: IAnswerOption): void {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    void this.handleItemClick(item);
  }

  public async handleKeySelection(selectedKey: string): Promise<void> {
    if (String(selectedKey) === String(this.selectedKey())) return;
    await this.setExpression(this.buildValueForKey(selectedKey));
    this.triggerActions("changed");
  }

  private optionKey(item: IAnswerOption): string {
    return item[this.params.optionsKey.value()] as string;
  }

  private buildValueForKey(selectedKey: string): string | IRadioButtonGridObjectValue {
    if (!this.params.valueAsObject.value()) return selectedKey;
    const option = this.radioItems().find(
      (item) => String(this.optionKey(item)) === String(selectedKey)
    );
    return { key: selectedKey, value: option?.[this.params.optionsValue.value()] ?? null };
  }

  /** Select the option named by `initial_selected_option_key`, unless the row has a value */
  private async applyInitialSelection(initialKey: string): Promise<void> {
    // The expression includes a value passed by navigation, which isn't stored yet
    const authoredValue = this.evaluationService.evaluateExpression(
      this.expression(),
      this.namespace(),
      this.params.valueType.value()
    );
    const currentValue = isEmpty(this.value()) ? authoredValue : this.value();
    if (!isEmpty(currentValue)) {
      console.warn(
        "[radio_button_grid] `initial_selected_option_key` ignored as row already has a value",
        { row: this.name(), value: currentValue }
      );
      return;
    }
    const option = this.radioItems().find((item) => String(this.optionKey(item)) === initialKey);
    if (!option) {
      console.warn(
        "[radio_button_grid] `initial_selected_option_key` does not match any answer option",
        {
          row: this.name(),
          initial_selected_option_key: initialKey,
          options_key: this.params.optionsKey.value(),
        }
      );
      return;
    }
    await this.setExpression(this.buildValueForKey(this.optionKey(option)));
  }
}
