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
  /** List of answer options to display. */
  answer_list: coerce.objectArray<IAnswerListItem>([]),
  /** When true, the combo box is disabled. */
  disabled: coerce.boolean(),
  /** Text to display when the component is disabled. */
  disabled_text: coerce.string(""),
  /** Title to display in the modal header. */
  modal_title: coerce.string(""),
  /** Text to display when no option is selected. */
  placeholder: coerce.string(""),
  /** When true, prioritizes showing the placeholder over the selected value. */
  prioritise_placeholder: coerce.boolean(),
  /** Custom style class to apply. */
  style: coerce.string(""),
  /** The display variant of the combo box. Default 'modal'. */
  variant: coerce.allowedValues(["modal", "dropdown"], "modal"),
  /** The property key to use for the option value. Default 'name'. */
  options_key: coerce.string("name"),
  /** The property key to use for the option display text. Default 'text'. */
  options_value: coerce.string("text"),
  /** When true, allows users to enter a custom answer. Modal variant only. */
  input_allowed: coerce.boolean(),
  /** Position of the custom input field ('top' or 'bottom'). Modal variant only. Default 'bottom'. */
  input_position: coerce.string("bottom"),
  /** Placeholder text for the answer input field. Modal variant only. */
  answer_placeholder: coerce.string(""),
}));

@Component({
  selector: "plh-combo-box",
  templateUrl: "./combo-box.component.html",
  styleUrls: ["./combo-box.component.scss"],
  standalone: false,
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
    return this.cleanAnswerOptions(this.dataItemRows() ?? this.params().answerList);
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
    effect(() => {
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
    });
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
      await this.setValue(answer?.[optionsKey] || undefined);
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
      await this.setValue(answer?.[optionsKey] || undefined);
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

  private cleanAnswerOptions(options: IAnswerListItem[]) {
    return options.filter((option) => {
      return (
        option[this.params().optionsKey] !== undefined &&
        option[this.params().optionsValue] !== undefined
      );
    });
  }
}
