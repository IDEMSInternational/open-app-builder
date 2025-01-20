import { Component, computed, effect, OnDestroy, OnInit, signal } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ComboBoxModalComponent } from "./combo-box-modal/combo-box-modal.component";
import {
  IAnswerListItem,
  getAnswerListParamFromTemplateRow,
  getBooleanParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";
import { ITemplateRowProps } from "../../models";
import { ReplaySubject, map, filter, switchMap } from "rxjs";
import { DataItemsService } from "../data-items/data-items.service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "plh-combo-box",
  templateUrl: "./combo-box.component.html",
  styleUrls: ["./combo-box.component.scss"],
})
export class TmplComboBoxComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit, OnDestroy
{
  public variant: "modal" | "dropdown";
  public placeholder: string;
  public prioritisePlaceholder: boolean;
  public disabledText: string;
  private style: string;
  public answerText = signal("");
  private authorDisabled = false;
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

  public disabled = computed(() => this.authorDisabled || this.answerOptions().length === 0);

  public displayText = computed(() => {
    if (this.disabled()) return this.disabledText;
    if (this.customAnswerSelected()) return this.customAnswerText;
    return this.answerText() && !this.prioritisePlaceholder ? this.answerText() : this.placeholder;
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

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    this.placeholder = getStringParamFromTemplateRow(this._row, "placeholder", "");
    this.prioritisePlaceholder = getBooleanParamFromTemplateRow(
      this._row,
      "prioritise_placeholder",
      false
    );
    this.disabledText = getStringParamFromTemplateRow(this._row, "disabled_text", "");
    this.style = getStringParamFromTemplateRow(this._row, "style", "");
    this.variant = getStringParamFromTemplateRow(this._row, "variant", "modal") as
      | "modal"
      | "dropdown";
    this.authorDisabled = getBooleanParamFromTemplateRow(this._row, "disabled", false);
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
        style: this.style,
      },
    });

    modal.onDidDismiss().then(async (data) => {
      this.prioritisePlaceholder = false;
      this.answerText.set(data?.data?.answer?.text);
      this.customAnswerSelected.set(data?.data?.customAnswerSelected);
      this.customAnswerText = this.customAnswerSelected() ? data?.data?.answer?.text : "";
      await this.setValue(data?.data?.answer?.name);
      await this.triggerActions("changed");
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}
