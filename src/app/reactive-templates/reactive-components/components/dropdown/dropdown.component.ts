import { Component, computed } from "@angular/core";
import { IonicModule, ModalController } from "@ionic/angular";
import { defineAuthorParameterSchema, RowBaseComponentWithParams } from "../../row-base.component";
import { DropdownModalComponent } from "./dropdown-modal/dropdown-modal.component";
import { NgClass } from "@angular/common";
import { TranslatePipe } from "src/app/shared/components/template/pipes/translate.pipe";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  disabled: coerce.boolean(),
  placeholder: coerce.string(""),
  style: coerce.string(""),
  show_search: coerce.boolean(),
  options: coerce.any<any[]>([]),
  options_key: coerce.string("key"),
  options_value: coerce.string("value"),
  title: coerce.string(""),
}));

@Component({
  selector: "oab-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
  imports: [IonicModule, NgClass, TranslatePipe],
})
export class DropdownComponent extends RowBaseComponentWithParams(AuthorSchema) {
  constructor(private modalController: ModalController) {
    super();
  }

  public options = computed(() => this.params().options);
  public optionsKey = computed(() => this.params().optionsKey);
  public optionsValue = computed(() => this.params().optionsValue);
  public selectedOption = computed(() => {
    if (!this.value()) return null;

    if (!this.options() || this.options().length === 0) return null;

    return this.options().find((option) => option[this.optionsKey()] === this.value());
  });

  public displayValue = computed(() => {
    return this.selectedOption()
      ? this.selectedOption()[this.optionsValue()]
      : this.params().placeholder;
  });

  public searchButtonClass = computed(() => {
    const value = this.value();
    return {
      disabled: this.params().disabled,
      "with-value": value ? true : undefined,
      "no-value": value ? undefined : true,
    };
  });

  public async openSearch() {
    const modal = await this.modalController.create({
      component: DropdownModalComponent,
      cssClass: "dropdown-search",
      componentProps: {
        options: this.options(),
        title: this.params().title,
        selectedOption: this.selectedOption(),
      },
    });

    modal.onDidDismiss().then(async (data) => {
      let selectedOption = data?.data?.option;
      let selectedKey = selectedOption ? selectedOption[this.optionsKey()] : null;
      this.changeValue(selectedKey);
    });

    await modal.present();
  }

  public async onChange(event: CustomEvent) {
    this.changeValue(event.detail.value);
  }

  private changeValue(key: any) {
    this.setExpression(key);
    this.triggerActions("changed");
  }
}
