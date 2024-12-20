import { Component, computed, OnDestroy, OnInit } from "@angular/core";
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
  public placeholder: string;
  public prioritisePlaceholder: boolean;
  private style: string;
  public text = "";
  private customAnswerSelected: boolean = false;
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

  private answerOptions = computed(() => {
    const dataItemRows = this.dataItemRows();
    if (dataItemRows !== undefined) {
      return (dataItemRows as IAnswerListItem[]) || [];
    }
    return getAnswerListParamFromTemplateRow(this.rowSignal(), "answer_list", []);
  });

  constructor(
    private modalController: ModalController,
    private dataItemsService: DataItemsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getParams();

    this.customAnswerSelected =
      this.answerOptions().length > 0 && this._row.value
        ? !this.answerOptions().find((x) => x.name === this._row.value)
        : false;

    this.text = "";
    if (this._row.value) {
      this.text = this.customAnswerSelected
        ? this.customAnswerText
        : this.answerOptions().find((answerListItem) => answerListItem.name === this._row.value)
            ?.text;
    }
  }

  getParams() {
    this.placeholder = getStringParamFromTemplateRow(this._row, "placeholder", "");
    this.prioritisePlaceholder = getBooleanParamFromTemplateRow(
      this._row,
      "prioritise_placeholder",
      false
    );
    this.style = getStringParamFromTemplateRow(this._row, "style", "");
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ComboBoxModalComponent,
      cssClass: "combo-box-modal",
      componentProps: {
        answerOptions: this.answerOptions,
        row: this._row,
        selectedValue: this.customAnswerSelected ? this.text : this._row.value,
        customAnswerSelected: this.customAnswerSelected,
        style: this.style,
      },
    });

    modal.onDidDismiss().then(async (data) => {
      this.prioritisePlaceholder = false;
      this.text = data?.data?.answer?.text;
      this.customAnswerSelected = data?.data?.customAnswerSelected;
      this.customAnswerText = this.customAnswerSelected
        ? (this.text = data?.data?.answer?.text)
        : "";
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
