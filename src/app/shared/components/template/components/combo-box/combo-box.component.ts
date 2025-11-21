import { Component, computed, effect, OnDestroy, Signal, signal } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ComboBoxModalComponent } from "./combo-box-modal/combo-box-modal.component";
import {
  getAnswerListParamFromTemplateRow,
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
  getParamFromTemplateRow,
  normaliseAnswerListToArray,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { FlowTypes } from "../../models";
import { ReplaySubject, map, filter, switchMap } from "rxjs";
import { DataItemsService } from "../data-items/data-items.service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { ComboBoxSearchComponent } from "./combo-box-search/combo-box-search.component";

interface IComboBoxParams {
  disabled: boolean;
  disabledText: string;
  placeholder: string;
  prioritisePlaceholder: boolean;
  style: string;
  variant: "modal" | "dropdown";
  optionsKey: string;
  optionsValue: string;
}

@Component({
  selector: "plh-combo-box",
  templateUrl: "./combo-box.component.html",
  styleUrls: ["./combo-box.component.scss"],
})
export class TmplComboBoxComponent extends TemplateBaseComponent implements OnDestroy {
  public params: Signal<IComboBoxParams> = computed(() => this.getParams(this.parameterList()));

  public answerText = signal("");
  private customAnswerSelected = signal(false);
  private customAnswerText: string;
  private componentDestroyed$ = new ReplaySubject(1);

  // HACK - allow combo_box to include data_items child row to define answer list
  private dataItemRows = toSignal(
    toObservable(this.rows).pipe(
      map((rows) => rows.find((r) => r.type === "data_items")),
      filter((row) => row !== undefined),
      switchMap((row) => this.dataItemsService.getItemsObservable(row, this.parent.templateRowMap))
    )
  );

  public answerOptions = computed(() => {
    const params = this.params();
    return this.getAnswerOptions(
      this.dataItemRows(),
      this.rowSignal(),
      params.optionsKey,
      params.optionsValue
    );
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

  /**
   * Get answer options from either data_items rows or the answer_list parameter.
   * When custom keys are used (options_key !== "name" or options_value !== "text"),
   * this bypasses the IAnswerListItem parsing which filters based on the "name" property.
   * This allows authors to use custom data structures with any column names.
   *
   * @param dataItemRows - optional array from data_items child row
   * @param row - the template row to read parameters from
   * @param optionsKey - the key column name (default: "name")
   * @param optionsValue - the value/display column name (default: "text")
   * @returns array of answer options
   */
  private getAnswerOptions(
    dataItemRows: any[] | undefined,
    row: FlowTypes.TemplateRow,
    optionsKey: string,
    optionsValue: string
  ): any[] {
    // Priority 1: Use data_items rows if available
    if (dataItemRows !== undefined) {
      return dataItemRows || [];
    }

    // Priority 2: Check if custom keys are being used
    // If custom keys are specified, bypass IAnswerListItem parsing which filters
    // based on hardcoded "name" property
    const usesCustomKeys = optionsKey !== "name" || optionsValue !== "text";
    if (usesCustomKeys) {
      const answerList = getParamFromTemplateRow(row, "answer_list", []);
      return normaliseAnswerListToArray(answerList);
    }

    // Priority 3: Use standard IAnswerListItem parsing (default behavior)
    return getAnswerListParamFromTemplateRow(row, "answer_list", []);
  }

  private getParams(authorParams?: FlowTypes.TemplateRow["parameter_list"]): IComboBoxParams {
    return {
      disabled: getBooleanParamFromTemplateRow(this._row, "disabled", false),
      disabledText: getStringParamFromTemplateRow(this._row, "disabled_text", ""),
      placeholder: getStringParamFromTemplateRow(this._row, "placeholder", ""),
      prioritisePlaceholder: getBooleanParamFromTemplateRow(
        this._row,
        "prioritise_placeholder",
        false
      ),
      style: getStringParamFromTemplateRow(this._row, "style", ""),
      variant: getStringParamFromTemplateRow(
        this._row,
        "variant",
        "modal"
      ) as IComboBoxParams["variant"],
      optionsKey: getStringParamFromTemplateRow(this._row, "options_key", "name"),
      optionsValue: getStringParamFromTemplateRow(this._row, "options_value", "text"),
    };
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
        title: signal(getStringParamFromTemplateRow(this._row, "text")),
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
