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

  public isRowDisabled(): boolean {
    return parseBoolean(this._row.disabled);
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
          value: this.getCustomTextForKey(selectedKey),
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

  /** Remember draft text immediately (before debounced setValue). */
  public rememberCustomText(item: IAnswerOption, text: string) {
    const key = String(item[this.params().optionsKey] ?? "");
    this.customInputByKey[key] = text;
  }

  /** Debounced optimistic update: set_self only, no changed actions. */
  public async handleCustomValueChange(item: IAnswerOption, text: string) {
    if (!this.params().valueAsObject) {
      console.warn("[radio_list] input_allowed options require value_as_object: true");
      return;
    }
    const key = String(item[this.params().optionsKey] ?? "");
    this.customInputByKey[key] = text;
    await this.setValue({ key, value: text }, false);
  }

  /**
   * Blur commit: ensure the latest text is stored, then fire set_self + changed.
   * Uses the emitted text so a race with the debounced valueChange cannot lose the final value.
   */
  public async handleCustomValueCommit(item: IAnswerOption, text: string) {
    if (this.isRowDisabled()) return;
    if (!this.params().valueAsObject) return;
    const key = String(item[this.params().optionsKey] ?? "");
    this.customInputByKey[key] = text;
    const nextValue: IRadioListObjectValue = { key, value: text };
    await this.setValue(nextValue, false);
    await this.triggerSetSelfAction(nextValue);
    await this.triggerActions("changed");
  }

  /** Remember custom text for the currently selected input-allowed option before changing selection. */
  private persistCurrentCustomInput() {
    const current = this.value();
    if (!current || typeof current !== "object") return;
    const { key, value } = current as IRadioListObjectValue;
    if (!key) return;
    const option = this.answerOptions().find((item) => item[this.params().optionsKey] === key);
    if (option && this.isInputAllowed(option)) {
      // Prefer in-memory draft (may be ahead of debounced setValue).
      this.customInputByKey[key] ??= value ?? "";
    }
  }

  private getCustomTextForKey(key: string): string {
    if (key in this.customInputByKey) {
      return this.customInputByKey[key];
    }
    const value = this.value();
    if (
      this.params().valueAsObject &&
      value &&
      typeof value === "object" &&
      (value as IRadioListObjectValue).key === key
    ) {
      return (value as IRadioListObjectValue).value ?? "";
    }
    return "";
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
