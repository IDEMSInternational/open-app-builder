import { Component, computed, effect, OnDestroy, Signal, signal } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ComboBoxModalComponent } from "./combo-box-modal/combo-box-modal.component";
import {
  IAnswerListItem,
  getAnswerListParamFromTemplateRow,
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { FlowTypes, ITemplateRowProps } from "../../models";
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
}

@Component({
  selector: "plh-combo-box",
  templateUrl: "./combo-box.component.html",
  styleUrls: ["./combo-box.component.scss"],
})
export class TmplComboBoxComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnDestroy
{
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
    const dataItemRows = this.dataItemRows();
    if (dataItemRows !== undefined) {
      return (dataItemRows as IAnswerListItem[]) || [];
    }
    return getAnswerListParamFromTemplateRow(this.rowSignal(), "answer_list", []);
  });
  public showSearch = computed(() => this.answerOptions().length > 8);

  public disabled = computed(() => this.params().disabled || this.answerOptions().length === 0);

  public displayText = computed(() => {
    if (this.disabled()) return this.params().disabledText;
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
          const selectedAnswer = this.answerOptions().find((x) => x.name === this._row.value);
          if (!selectedAnswer) {
            this.customAnswerSelected.set(true);
          } else {
            this.answerText.set(selectedAnswer?.text || "");
          }
        }
      },
      { allowSignalWrites: true }
    );
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
    };
  }

  public async handleDropdownChange(value) {
    await this.setValue(value);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ComboBoxModalComponent,
      cssClass: "combo-box-modal",
      componentProps: {
        answerOptions: this.answerOptions,
        row: this._row,
        selectedValue: this.customAnswerSelected() ? this.answerText() : this._row.value,
        customAnswerSelected: this.customAnswerSelected(),
        style: this.params().style,
      },
    });

    modal.onDidDismiss().then(async (data) => {
      this.params().prioritisePlaceholder = false;
      this.answerText.set(data?.data?.answer?.text);
      this.customAnswerSelected.set(data?.data?.customAnswerSelected);
      this.customAnswerText = this.customAnswerSelected() ? data?.data?.answer?.text : "";
      await this.setValue(data?.data?.answer?.name);
    });
    await modal.present();
  }

  async openSearch() {
    const modal = await this.modalController.create({
      component: ComboBoxSearchComponent,
      cssClass: "combo-box-search",
      componentProps: {
        answerOptions: this.answerOptions,
        title: signal(getStringParamFromTemplateRow(this._row, "text")),
        selectedValue: this.rowSignal,
        customAnswerSelected: this.customAnswerSelected(),
        style: this.params().style,
      },
    });

    modal.onDidDismiss().then(async (data) => {
      this.params().prioritisePlaceholder = false;
      this.answerText.set(data?.data?.answer.text);
      await this.setValue(data?.data?.answer?.name);
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
