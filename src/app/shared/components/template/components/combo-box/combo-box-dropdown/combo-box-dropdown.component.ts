import { Component, computed, EventEmitter, Output, signal, input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ComboBoxSearchComponent } from "../combo-box-search/combo-box-search.component";
import { IAnswerOption } from "src/app/shared/utils";
import {
  OptionMetaBadgeConfig,
  OPTION_META_BADGE_VALUE_DEFAULTS,
  resolveOptionMetaBadgeColor,
} from "../combo-box-meta-badge.config";

@Component({
  selector: "combo-box-dropdown",
  templateUrl: "./combo-box-dropdown.component.html",
  styleUrls: ["./combo-box-dropdown.component.scss"],
  standalone: false,
})
export class ComboBoxDropdownComponent {
  private static nextId = 0;
  /** Option count above which the trigger opens the search modal instead of the inline popover. */
  private static readonly SEARCH_THRESHOLD = 8;

  public value = input<any>();
  public placeholder = input<string>("");
  public displayText = input<string>("");
  public modalTitle = input<string>("");
  public prioritisePlaceholder = input<boolean>(false);
  public disabled = input<boolean>(false);
  public answerOptions = input.required<IAnswerOption[]>();
  public optionsKey = input<string>("name");
  public optionsValue = input<string>("text");
  public optionMetaBadge = input<OptionMetaBadgeConfig>({
    textKey: "",
    colorKey: "",
    valueDefaults: { ...OPTION_META_BADGE_VALUE_DEFAULTS },
  });

  /** When option count exceeds `SEARCH_THRESHOLD`, open search modal instead of inline popover. */
  public showSearch = computed(
    () => this.answerOptions().length > ComboBoxDropdownComponent.SEARCH_THRESHOLD
  );

  @Output()
  public selectionChange = new EventEmitter<any>();

  /** Emitted when the search modal dismisses with `data.answer` from `ComboBoxSearchComponent`. */
  @Output()
  public searchDismiss = new EventEmitter<IAnswerOption | null | undefined>();

  public isOpen = signal(false);
  public readonly triggerId = `combo-box-dropdown-trigger-${ComboBoxDropdownComponent.nextId++}`;

  public close() {
    this.isOpen.set(false);
  }

  public onPopoverWillPresent() {
    this.isOpen.set(true);
  }

  public metaBadgeChipColor(option: IAnswerOption): string {
    return resolveOptionMetaBadgeColor(this.optionMetaBadge(), option);
  }

  public async openSearch() {
    if (this.disabled()) return;
    const modal = await this.modalController.create({
      component: ComboBoxSearchComponent,
      cssClass: "combo-box-search",
      componentProps: {
        answerOptions: this.answerOptions(),
        title: this.modalTitle(),
        selectedValue: this.value(),
        optionsKey: this.optionsKey(),
        optionsValue: this.optionsValue(),
        optionMetaBadge: this.optionMetaBadge(),
      },
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    this.searchDismiss.emit(data?.answer);
  }

  public searchButtonClass = computed(() => {
    const val = this.value();
    const placeholder = this.placeholder();
    return {
      disabled: this.disabled(),
      "placeholder-style": (!val && placeholder) || this.prioritisePlaceholder(),
      "with-value": val ? true : undefined,
      "no-value": val ? undefined : true,
    };
  });

  public selectOption(option: IAnswerOption) {
    const key = this.optionsKey();
    this.selectionChange.emit(option[key]);
    this.close();
  }

  /** Determine whether an option is the currently selected option. */
  public isSelected(option: IAnswerOption): boolean {
    const key = this.optionsKey();
    const optionValue = option[key];
    const selectedValue = this.value();
    return String(optionValue ?? "") === String(selectedValue ?? "");
  }

  constructor(private modalController: ModalController) {}
}
