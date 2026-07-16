import { Component, computed } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { filter, map, switchMap } from "rxjs/operators";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { IAnswerOption } from "../../../../utils";
import { DataItemsService } from "../data-items/data-items.service";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  answer_list: coerce.objectArray<IAnswerOption>([]),
  options_key: coerce.string("name"),
  options_value: coerce.string("text"),
  /**
   * When true, the row value is set as `{ key, value }` using the selected option's
   * options_key and options_value fields. When false (default), the value is the key string only.
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
      return (value as { key?: string }).key;
    }
    return value;
  });

  constructor(private dataItemsService: DataItemsService) {
    super();
  }

  public async handleItemClick(selectedKey: string) {
    if (this.params().valueAsObject) {
      const option = this.answerOptions().find(
        (item) => item[this.params().optionsKey] === selectedKey
      );
      await this.setValue({
        key: selectedKey,
        value: option?.[this.params().optionsValue] ?? null,
      });
      return;
    }
    await this.setValue(selectedKey);
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
