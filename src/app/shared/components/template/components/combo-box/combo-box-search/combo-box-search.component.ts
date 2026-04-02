import { Component, computed, input, signal } from "@angular/core";
import { IAnswerOption } from "src/app/shared/utils";
import { ModalController } from "@ionic/angular";
import {
  OptionMetaBadgeConfig,
  OPTION_META_BADGE_VALUE_DEFAULTS,
  resolveOptionMetaBadgeColor,
  resolveOptionMetaBadgeText,
} from "../combo-box-meta-badge.config";

@Component({
  selector: "combo-box-search",
  templateUrl: "./combo-box-search.component.html",
  styleUrls: ["./combo-box-search.component.scss"],
  standalone: false,
})
export class ComboBoxSearchComponent {
  public answerOptions = input.required<IAnswerOption[]>();
  public title = input<string>();
  public selectedValue = input<string>();
  public optionsKey = input<string>("name");
  public optionsValue = input<string>("text");
  public optionMetaBadge = input<OptionMetaBadgeConfig>({
    textKey: "",
    colorKey: "",
    valueDefaults: { ...OPTION_META_BADGE_VALUE_DEFAULTS },
  });

  public searchTerm = signal("");

  public filteredOptions = computed(() => {
    const optionsValue = this.optionsValue();
    return this.answerOptions().filter((options) =>
      String(options[optionsValue] || "")
        .toLowerCase()
        .includes(this.searchTerm().toLowerCase())
    );
  });

  public isSelected(item: IAnswerOption) {
    return this.selectedValue() === item[this.optionsKey()];
  }

  constructor(private modalController: ModalController) {}

  public select(item: IAnswerOption) {
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

  metaBadgeChipColor(option: IAnswerOption): string {
    return resolveOptionMetaBadgeColor(this.optionMetaBadge(), option);
  }

  metaBadgeChipText(option: IAnswerOption): string {
    return resolveOptionMetaBadgeText(this.optionMetaBadge(), option);
  }
}
