import { CommonModule } from "@angular/common";
import { Component, computed, input, OnInit, signal } from "@angular/core";
import { IonicModule, ModalController } from "@ionic/angular";

@Component({
  selector: "oab-dropdown-modal",
  templateUrl: "./dropdown-modal.component.html",
  styleUrls: ["./dropdown-modal.component.scss"],
  imports: [CommonModule, IonicModule],
})
export class DropdownModalComponent implements OnInit {
  constructor(private modalController: ModalController) {}

  public options = input.required<any[]>();
  public optionsKey = input<string>("key");
  public optionsValue = input<string>("value");
  public title = input<string>();
  public searchTerm = signal("");
  /** Initial selection from parent; updated locally when user picks an option. */
  public selectedOption = input<any | null>(null);
  /** Working selection (starts as `selectedOption()` input). */
  private selection = signal<any | null>(null);

  public ngOnInit() {
    this.selection.set(this.selectedOption());
  }

  public filteredOptions = computed(() => {
    if (!this.options() || this.options().length === 0) return [];

    return this.options().filter((options) =>
      options[this.optionsValue()].toLowerCase().includes(this.searchTerm().toLowerCase())
    );
  });

  public isSelected(item: any) {
    const sel = this.selection();
    if (!sel) return false;

    return sel[this.optionsKey()] === item[this.optionsKey()];
  }

  public select(item: any) {
    this.selection.set(item);
    this.closeModal({ option: item });
  }

  public search(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }

  public cancel() {
    this.closeModal({ option: this.selection(), cancelled: true });
  }

  private async closeModal(value) {
    await this.modalController.dismiss(value);
  }
}
