import { Component, computed } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { filter, map, switchMap } from "rxjs/operators";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { IAnswerOption, parseBoolean } from "../../../../utils";
import { DataItemsService } from "../data-items/data-items.service";

/** Shape of the row value when `value_as_object` is true. */
export interface IRadioListObjectValue {
  key: string;
  value: string | null;
}

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  answer_list: coerce.objectArray<IAnswerOption>([]),
  options_key: coerce.string("name"),
  options_value: coerce.string("text"),
  /**
   * When true, the row value is set as `{ key, value }` using the selected option's
   * options_key and options_value fields. When false (default), the value is the key string only.
   * Required for options with `input_allowed`.
   */
  value_as_object: coerce.boolean(false),
  /** The display variant of the radio list. Default 'default'. */
  variant: coerce.allowedValues(["default", "card"], "default"),
}));

@Component({
  selector: "plh-radio-list",
  templateUrl: "./radio-list.component.html",
  styleUrls: ["./radio-list.component.scss"],
  standalone: false,
})
export class TmplRadioListComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  public answerOptions = computed(() => {
    return (this.dataItemRows() ?? this.params().answerList) as IAnswerOption[];
  });

  /** Key used by ion-radio-group for selection (extracts from object value when needed). */
  public selectedKey = computed(() => {
    const value = this.value();
    if (this.params().valueAsObject && value && typeof value === "object") {
      return (value as IRadioListObjectValue).key;
    }
    return value;
  });

  /** Custom text currently stored on the object value (empty when not applicable). */
  public customInputValue = computed(() => {
    const value = this.value();
    if (this.params().valueAsObject && value && typeof value === "object") {
      return (value as IRadioListObjectValue).value ?? "";
    }
    return "";
  });

  /** Persists typed text per option key so it survives selecting other options. */
  private customInputByKey: Record<string, string> = {};

  constructor(private dataItemsService: DataItemsService) {
    super();
  }

  public isInputAllowed(item: IAnswerOption): boolean {
    return parseBoolean(item.input_allowed);
  }

  public isOptionSelected(item: IAnswerOption): boolean {
    return item[this.params().optionsKey] === this.selectedKey();
  }

  public async handleItemClick(selectedKey: string) {
    if (this.params().valueAsObject) {
      this.persistCurrentCustomInput();
      const option = this.answerOptions().find(
        (item) => item[this.params().optionsKey] === selectedKey
      );
      if (option && this.isInputAllowed(option)) {
        await this.setValue({
          key: selectedKey,
          value: this.customInputByKey[selectedKey] ?? "",
        });
        return;
      }
      await this.setValue({
        key: selectedKey,
        value: option?.[this.params().optionsValue] ?? null,
      });
      return;
    }
    await this.setValue(selectedKey);
  }

  /** Store the typed text as the object `value`. */
  public async handleCustomInput(item: IAnswerOption, text: string | null | undefined) {
    if (!this.params().valueAsObject) {
      console.warn("[radio_list] input_allowed options require value_as_object: true");
      return;
    }
    const key = String(item[this.params().optionsKey] ?? "");
    const nextValue = text ?? "";
    this.customInputByKey[key] = nextValue;
    await this.setValue({ key, value: nextValue });
  }

  /** Remember custom text for the currently selected input-allowed option before changing selection. */
  private persistCurrentCustomInput() {
    const current = this.value();
    if (!current || typeof current !== "object") return;
    const { key, value } = current as IRadioListObjectValue;
    if (!key) return;
    const option = this.answerOptions().find((item) => item[this.params().optionsKey] === key);
    if (option && this.isInputAllowed(option)) {
      this.customInputByKey[key] = value ?? "";
    }
  }

  // Allow radio_list to include data_items child row to define answer list
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
