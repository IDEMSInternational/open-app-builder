import { Component, computed, effect, OnDestroy, signal } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ComboBoxModalComponent } from "./combo-box-modal/combo-box-modal.component";
import { IAnswerListItem } from "src/app/shared/utils";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { ReplaySubject, map, filter, switchMap } from "rxjs";
import { DataItemsService } from "../data-items/data-items.service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { ComboBoxSearchComponent } from "./combo-box-search/combo-box-search.component";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  answer_list: coerce.objectArray<IAnswerListItem>([]),
  disabled: coerce.boolean(),
  disabled_text: coerce.string(""),
  modal_title: coerce.string(""),
  placeholder: coerce.string(""),
  prioritise_placeholder: coerce.boolean(),
  style: coerce.string(""),
  variant: coerce.allowedValues(["modal", "dropdown"], "modal"),
  options_key: coerce.string("name"),
  options_value: coerce.string("text"),
}));

@Component({
  selector: "plh-combo-box",
  templateUrl: "./combo-box.component.html",
  styleUrls: ["./combo-box.component.scss"],
})
export class TmplComboBoxComponent
  extends TemplateBaseComponentWithParams(AuthorSchema)
  implements OnDestroy
{
  public answerText = signal("");
  private customAnswerSelected = signal(false);
  private customAnswerText: string;
  private componentDestroyed$ = new ReplaySubject(1);

  // HACK - allow combo_box to include data_items child row to define answer list
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

  public answerOptions = computed(() => {
    return this.dataItemRows() ?? this.params().answerList;
  });

  public showSearch = computed(() => this.answerOptions().length > 8);

  public disabled = computed(() => this.params().disabled || this.answerOptions().length === 0);

  public displayText = computed(() => {
    if (this.disabled() && this.params().disabledText) return this.params().disabledText;
    if (this.customAnswerSelected()) return this.customAnswerText;
    return this.answerText() && !this.params().prioritisePlaceholder
      ? this.answerText()
      : this.params().placeholder;
  });

  constructor(
    private modalController: ModalController,
    private dataItemsService: DataItemsService
  ) {
    super();
    // If an initial value is authored, check if this corresponds to an answer option entry.
    // Handle in effect as answer options may not be available on init
    // TODO: Refactor base component to use value() signal and use this to compute displayText
    effect(
      () => {
        if (this.answerOptions().length > 0 && this._row.value) {
          const optionsKey = this.params().optionsKey;
          const optionsValue = this.params().optionsValue;
          const selectedAnswer = this.answerOptions().find(
            (x) => String(x[optionsKey]) === String(this._row.value)
          );
          if (!selectedAnswer) {
            this.customAnswerSelected.set(true);
          } else {
            this.answerText.set(selectedAnswer?.[optionsValue] || "");
          }
        }
      },
      { allowSignalWrites: true }
    );
  }

  public async handleDropdownChange(value) {
    await this.setValue(value);
  }

  public async openModal() {
    if (this.disabled()) return;
    const optionsKey = this.params().optionsKey;
    const optionsValue = this.params().optionsValue;
    const modal = await this.modalController.create({
      component: ComboBoxModalComponent,
      cssClass: "combo-box-modal",
      componentProps: {
        answerOptions: this.answerOptions,
        row: this._row,
        selectedValue: this.customAnswerSelected() ? this.answerText() : this._row.value,
        customAnswerSelected: this.customAnswerSelected(),
        style: this.params().style,
        optionsKey: optionsKey,
        optionsValue: optionsValue,
      },
    });

    modal.onDidDismiss().then(async (data) => {
      this.params().prioritisePlaceholder = false;
      const answer = data?.data?.answer;
      this.answerText.set(answer?.[optionsValue] || "");
      this.customAnswerSelected.set(data?.data?.customAnswerSelected);
      this.customAnswerText = this.customAnswerSelected() ? answer?.[optionsValue] || "" : "";
      await this.setValue(answer?.[optionsKey] || null);
    });
    await modal.present();
  }

  async openSearch() {
    const optionsKey = this.params().optionsKey;
    const optionsValue = this.params().optionsValue;
    const modal = await this.modalController.create({
      component: ComboBoxSearchComponent,
      cssClass: "combo-box-search",
      componentProps: {
        answerOptions: this.answerOptions,
        title: signal(this.params().modalTitle),
        selectedValue: this.value,
        customAnswerSelected: this.customAnswerSelected(),
        style: this.params().style,
        optionsKey: optionsKey,
        optionsValue: optionsValue,
      },
    });

    modal.onDidDismiss().then(async (data) => {
      this.params().prioritisePlaceholder = false;
      const answer = data?.data?.answer;
      this.answerText.set(answer?.[optionsValue] || "");
      await this.setValue(answer?.[optionsKey] || null);
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  public searchButtonClass = computed(() => {
    const value = this.value();
    const params = this.params();
    return {
      disabled: this.disabled(),
      "placeholder-style": (!value && params.placeholder) || params.prioritisePlaceholder,
      "with-value": value ? true : undefined,
      "no-value": value ? undefined : true,
    };
  });
}
