import { Component, computed } from "@angular/core";
import { IonicModule, ModalController } from "@ionic/angular";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { defineParameters, Parameter } from "../../parameters";
import { DropdownModalComponent } from "./dropdown-modal/dropdown-modal.component";
import { NgClass } from "@angular/common";
import { TranslatePipe } from "src/app/shared/components/template/pipes/translate.pipe";

const parameters = () =>
  defineParameters({
    disabled: new Parameter("disabled", false),
    placeholder: new Parameter("placeholder", ""),
    style: new Parameter("style", ""),
    showSearch: new Parameter("show_search", false),
    options: new Parameter("options", []),
    optionsKey: new Parameter("options_key", "key"),
    optionsValue: new Parameter("options_value", "value"),
    title: new Parameter("title", ""),
  });

@Component({
  selector: "oab-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
  imports: [IonicModule, NgClass, TranslatePipe],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class DropdownComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  constructor(private modalController: ModalController) {
    super();
  }

  public options = this.params.options.value;
  public optionsKey = this.params.optionsKey.value;
  public optionsValue = this.params.optionsValue.value;
  public selectedOption = computed(() => {
    return this.options().find((option) => option[this.optionsKey()] === this.value());
  });

  public displayValue = computed(() => {
    return this.selectedOption()
      ? this.selectedOption()[this.optionsValue()]
      : this.params.placeholder.value();
  });

  public searchButtonClass = computed(() => {
    const value = this.value();
    return {
      disabled: this.params.disabled.value(),
      "with-value": value ? true : undefined,
      "no-value": value ? undefined : true,
    };
  });

  public async openSearch() {
    const modal = await this.modalController.create({
      component: DropdownModalComponent,
      cssClass: "dropdown-search",
      componentProps: {
        options: this.options,
        title: this.params.title.value,
        selectedOption: this.selectedOption(),
        style: this.params.style.value(),
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
