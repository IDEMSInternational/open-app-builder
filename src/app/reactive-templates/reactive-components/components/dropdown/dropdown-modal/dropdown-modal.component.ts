import { CommonModule } from "@angular/common";
import { Component, computed, input, signal } from "@angular/core";
import { IonicModule, ModalController } from "@ionic/angular";

@Component({
  selector: "oab-dropdown-modal",
  templateUrl: "./dropdown-modal.component.html",
  styleUrls: ["./dropdown-modal.component.scss"],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class DropdownModalComponent {
  public options = input.required<any[]>();
  public optionsKey = input<string>("key");
  public optionsValue = input<string>("value");
  public title = input<string>();
  public selectedOption = signal<any>(null);
  public searchTerm = signal("");

  public filteredOptions = computed(() =>
    this.options().filter((options) =>
      options[this.optionsValue()].toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  public isSelected(item: any) {
    if (!this.selectedOption()) return false;

    return this.selectedOption()[this.optionsKey()] === item[this.optionsKey()];
  }

  constructor(private modalController: ModalController) {}

  public select(item: any) {
    this.selectedOption.set(item);
    this.closeModal({ option: this.selectedOption() });
  }

  public search(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }

  public cancel() {
    this.closeModal({ option: this.selectedOption(), cancelled: true });
  }

  private closeModal(value) {
    setTimeout(async () => {
      await this.modalController.dismiss(value);
    }, 50);
  }
}
