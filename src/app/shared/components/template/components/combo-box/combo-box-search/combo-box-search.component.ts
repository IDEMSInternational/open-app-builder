import { Component, computed, input, signal } from "@angular/core";
import { IAnswerListItem } from "src/app/shared/utils";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "combo-box-search",
  templateUrl: "./combo-box-search.component.html",
  styleUrls: ["./combo-box-search.component.scss"],
})
export class ComboBoxSearchComponent {
  public answerOptions = input.required<IAnswerListItem[]>();
  public title = input<string>();
  public selectedValue = input<string>();
  public optionsKey = input<string>("name");
  public optionsValue = input<string>("text");

  public searchTerm = signal("");

  public filteredOptions = computed(() => {
    const optionsValue = this.optionsValue();
    return this.answerOptions().filter((options) =>
      String(options[optionsValue] || "")
        .toLowerCase()
        .includes(this.searchTerm().toLowerCase())
    );
  });

  public isSelected(item: IAnswerListItem) {
    return this.selectedValue() === item[this.optionsKey()];
  }

  constructor(private modalController: ModalController) {}

  public select(item: IAnswerListItem) {
    this.closeModal({ answer: item });
  }

  public search(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }

  public cancel() {
    const optionsKey = this.optionsKey();
    let selectedItem = this.answerOptions().find(
      (item) => item[optionsKey] === this.selectedValue()
    );
    this.closeModal({ answer: selectedItem });
  }

  private closeModal(value) {
    setTimeout(async () => {
      await this.modalController.dismiss(value);
    }, 50);
  }
}
