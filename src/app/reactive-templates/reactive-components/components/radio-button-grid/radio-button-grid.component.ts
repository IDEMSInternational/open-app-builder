import { Component, computed, effect } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { TemplatePipesModule } from "src/app/shared/components/template/pipes";
import { IAnswerOption } from "src/app/shared/utils";
import { defineParameters, Parameter } from "../../parameters";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";

/** Shape of the row value when `value_as_object` is true. */
export interface IRadioButtonGridObjectValue {
  key: string;
  value: string | null;
}

const parameters = () =>
  defineParameters({
    answerList: new Parameter<IAnswerOption[]>("answer_list", [], "list"),
    itemWidth: new Parameter("item_width", "200px"),
    gridWidth: new Parameter("grid_width", "100%"),
    gridGap: new Parameter("grid_gap", "16px"),
    variant: new Parameter<"default" | "circle-icon" | "flex" | "card">("variant", "default"),
    style: new Parameter<"default" | "secondary">("style", "default"),
    optionsKey: new Parameter("options_key", "name"),
    optionsValue: new Parameter("options_value", "text"),
    initialSelectedOptionKey: new Parameter("initial_selected_option_key", ""),
    valueAsObject: new Parameter("value_as_object", false),
  });

@Component({
  selector: "oab-radio-button-grid",
  templateUrl: "./radio-button-grid.component.html",
  styleUrls: [
    "../../../../shared/components/template/components/radio-button-grid/radio-button-grid.component.scss",
    "../../../../shared/components/template/components/radio-button-grid/radio-button-grid-card/radio-button-grid-card.component.scss",
  ],
  imports: [CommonModule, IonicModule, TemplatePipesModule],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class RadioButtonGridComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  /** Answer options from the row's `answer_list` parameter. */
  public radioItems = computed(() => {
    const items = (this.params.answerList.value() ?? []) as IAnswerOption[];
    const optionsValue = this.params.optionsValue.value();
    return items.filter((item) => {
      const label = item[optionsValue];
      return (label !== undefined && label !== null && label !== "") || !!item.image;
    });
  });

  /** Key of the selected option, including when the row stores an object value. */
  public selectedKey = computed(() => {
    const value = this.value();
    if (this.params.valueAsObject.value() && value && typeof value === "object") {
      return (value as IRadioButtonGridObjectValue).key;
    }
    return value;
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
    return this.optionKey(item) === this.selectedKey();
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
    const value = this.buildValueForKey(selectedKey);
    if (value === this.value()) return;
    await this.setExpression(value);
    this.triggerActions("changed");
  }

  private optionKey(item: IAnswerOption): string {
    return item[this.params.optionsKey.value()] as string;
  }

  private buildValueForKey(selectedKey: string): string | IRadioButtonGridObjectValue {
    if (!this.params.valueAsObject.value()) return selectedKey;
    const option = this.radioItems().find((item) => this.optionKey(item) === selectedKey);
    return { key: selectedKey, value: option?.[this.params.optionsValue.value()] ?? null };
  }

  private async applyInitialSelection(initialKey: string): Promise<void> {
    const authoredValue = this.row().value;
    if (authoredValue !== undefined && authoredValue !== null && authoredValue !== "") return;

    const currentValue = this.value();
    if (currentValue !== undefined && currentValue !== null && currentValue !== "") return;

    const option = this.radioItems().find((item) => String(this.optionKey(item)) === initialKey);
    if (!option) return;
    await this.setExpression(this.buildValueForKey(this.optionKey(option)));
  }
}
