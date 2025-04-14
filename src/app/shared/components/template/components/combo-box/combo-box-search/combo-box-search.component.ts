import { Component, computed, input, Input, signal } from "@angular/core";
import {IAnswerListItem } from "src/app/shared/utils";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "combo-box-search",
  templateUrl: "./combo-box-search.component.html",
  styleUrls: ["./combo-box-search.component.scss"],
})
export class ComboBoxSearchComponent {
  public answerOptions = input.required<IAnswerListItem[]>();
  @Input() title: string;
  @Input() selectedValue: string;

  public searchTerm = signal("");

  filteredOptions = computed(() =>
    this.answerOptions().filter((options) =>
      options.text.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  constructor(private modalController: ModalController) {}

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
