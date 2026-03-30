import { Component, computed, effect, OnDestroy, signal } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ComboBoxModalComponent } from "./combo-box-modal/combo-box-modal.component";
import { IAnswerOption } from "src/app/shared/utils";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { ReplaySubject, map, filter, switchMap } from "rxjs";
import { DataItemsService } from "../data-items/data-items.service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import {
  OptionMetaBadgeConfig,
  OPTION_META_BADGE_VALUE_DEFAULTS,
} from "./combo-box-meta-badge.config";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** List of answer options to display. */
  answer_list: coerce.objectArray<IAnswerOption>([]),
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
  /** Property key on each answer option for badge text (optional). Badge will display if option has a value for this key. */
  options_meta_badge_text: coerce.string(""),
  /** Property key on each answer option for ion-chip color (optional). Uses OPTION_META_BADGE_VALUE_DEFAULTS.color when missing. */
  options_meta_badge_color: coerce.string(""),
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
    const options = this.dataItemRows() ?? this.params().answerList;
    return this.cleanAnswerOptions(options as IAnswerOption[]);
  });

  public disabled = computed(() => this.params().disabled || this.answerOptions().length === 0);

  private selectedOption = computed(() => {
    const val = this.value();
    const options = this.answerOptions();
    if (!val || !options.length) return undefined;
    const optionsKey = this.params().optionsKey;
    return options.find((x) => String(x[optionsKey]) === String(val));
  });

  /** Display label: from options when value() matches, otherwise custom/placeholder. */
  public displayText = computed(() => {
    if (this.disabled() && this.params().disabledText) return this.params().disabledText;
    const val = this.value();
    if (!val) return this.params().placeholder;
    if (this.customAnswerSelected())
      return this.customAnswerText ?? this.answerText() ?? String(val);
    if (this.params().prioritisePlaceholder) return this.params().placeholder;
    const opt = this.selectedOption();
    if (opt) return opt[this.params().optionsValue] ?? this.params().placeholder;
    return this.answerText() || this.params().placeholder;
  });

  public optionMetaBadge = computed<OptionMetaBadgeConfig>(() => ({
    textKey: this.params().optionsMetaBadgeText,
    colorKey: this.params().optionsMetaBadgeColor,
    valueDefaults: { ...OPTION_META_BADGE_VALUE_DEFAULTS },
  }));

  constructor(
    private modalController: ModalController,
    private dataItemsService: DataItemsService
  ) {
    super();
    // Sync displayed selection with current value (initial load and programmatic updates).
    // Use value() so the effect re-runs when the row is updated (e.g. after set_self / processRowUpdates).
    effect(() => {
      const val = this.value();
      const optionsValue = this.params().optionsValue;
      if (!val) {
        this.answerText.set("");
        this.customAnswerSelected.set(false);
        return;
      }
      if (this.answerOptions().length > 0) {
        const selectedAnswer = this.selectedOption();
        if (!selectedAnswer) {
          this.customAnswerSelected.set(true);
          this.customAnswerText = String(val);
        } else {
          this.customAnswerSelected.set(false);
          this.answerText.set(selectedAnswer?.[optionsValue] ?? "");
        }
      }
    });
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
        selectedValue: this.customAnswerSelected() ? this.answerText() : this.value(),
        customAnswerSelected: this.customAnswerSelected(),
        style: this.params().style,
        optionsKey: optionsKey,
        optionsValue: optionsValue,
        optionMetaBadge: this.optionMetaBadge(),
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

  async onSearchDismiss(answer: IAnswerOption | null | undefined) {
    this.params().prioritisePlaceholder = false;
    const optionsKey = this.params().optionsKey;
    const optionsValue = this.params().optionsValue;
    this.answerText.set(answer?.[optionsValue] || "");
    await this.setValue(answer?.[optionsKey] || undefined);
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  private cleanAnswerOptions(options: IAnswerOption[]) {
    return options.filter((option) => {
      return (
        option[this.params().optionsKey] !== undefined &&
        option[this.params().optionsValue] !== undefined
      );
    });
  }
}
