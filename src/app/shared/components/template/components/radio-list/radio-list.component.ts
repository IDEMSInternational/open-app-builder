import { Component, computed } from "@angular/core";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { filter, map, switchMap } from "rxjs/operators";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { IAnswerListItem } from "../../../../utils";
import { DataItemsService } from "../data-items/data-items.service";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  answer_list: coerce.objectArray<IAnswerListItem>([
    { name: null, text: null, image: null, image_checked: null },
  ]),
  options_key: coerce.string("name"),
  options_value: coerce.string("text"),
}));

@Component({
  selector: "plh-radio-list",
  templateUrl: "./radio-list.component.html",
  styleUrls: ["./radio-list.component.scss"],
})
export class TmplRadioListComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  public answerOptions = computed(() => {
    return this.dataItemRows() ?? this.params().answerList;
  });

  constructor(private dataItemsService: DataItemsService) {
    super();
  }

  public async handleItemClick(value: string) {
    await this.setValue(value);
  }

  // Allow radio_list to include data_items child row to define answer list
  private dataItemRows = toSignal(
    toObservable(this.rows).pipe(
      map((rows) => rows.find((r) => r.type === "data_items")),
      filter((row) => row !== undefined),
      switchMap((row) => this.dataItemsService.getItemsObservable(row, this.parent.templateRowMap))
    )
  );
}
