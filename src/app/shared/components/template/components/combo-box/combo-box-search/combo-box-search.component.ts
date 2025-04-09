import { Component, computed, input, Input, OnInit, signal } from "@angular/core";
import { FlowTypes } from "src/app/shared/model";
import {
  getStringParamFromTemplateRow,
  IAnswerListItem,
} from "src/app/shared/utils";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "combo-box-search",
  templateUrl: "./combo-box-search.component.html",
  styleUrls: ["./combo-box-search.component.scss"],
})
export class ComboBoxSearchComponent implements OnInit {
  public answerOptions = input.required<IAnswerListItem[]>();
  @Input() row: FlowTypes.TemplateRow;
  @Input() selectedValue: string;

  textTitle: string | null;
  searchTerm = signal<string>("");
  selectedItem = computed(() => {
    if (!this.selectedValue) return null;
    return this.answerOptions().find((item) => item.name === this.selectedValue);
  });

  filteredOptions = computed(() =>
    this.answerOptions().filter((options) =>
      options.text.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.getParams();
  }

  getParams() {
    this.textTitle = getStringParamFromTemplateRow(this.row, "text", null);
  }

  select(item: IAnswerListItem){
    this.closeModal({ answer: item });
  }

  closeModal(value) {
    setTimeout(async () => {
      await this.modalController.dismiss(value);
    }, 50);
  }

  search(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }
}
