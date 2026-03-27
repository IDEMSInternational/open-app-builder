import { Component, EventEmitter, input, Output } from "@angular/core";
import { IAnswerOption } from "src/app/shared/utils";

@Component({
  selector: "combo-box-dropdown",
  templateUrl: "./combo-box-dropdown.component.html",
  styleUrls: ["./combo-box-dropdown.component.scss"],
  standalone: false,
})
export class ComboBoxDropdownComponent {
  public answerOptions = input.required<IAnswerOption[]>();
  public value = input<any>(undefined);
  public placeholder = input<string>("");
  public optionsKey = input<string>("name");
  public optionsValue = input<string>("text");
  public optionsBadge = input<string>("");
  public disabled = input<boolean>(false);

  @Output() valueChange = new EventEmitter<any>();

  public handleDropdownChange(value: any) {
    this.valueChange.emit(value);
  }

  public handleDropdownOpen() {
    if (!this.optionsBadge()) return;
    // Ionic renders select overlay content asynchronously; retry a few times.
    [0, 50, 150, 300, 600].forEach((delay) => {
      window.setTimeout(() => this.decorateDropdownOptionsWithBadges(), delay);
    });
  }

  private decorateDropdownOptionsWithBadges() {
    const optionsBadge = this.optionsBadge();
    const optionsValue = this.optionsValue();
    if (!optionsBadge) return;

    const badgeByLabel = this.answerOptions().reduce<Record<string, string>>((acc, option) => {
      const optionLabel = option?.[optionsValue];
      const optionBadgeValue = option?.[optionsBadge];
      if (optionLabel && optionBadgeValue) {
        acc[String(optionLabel).trim()] = String(optionBadgeValue).trim().toUpperCase();
      }
      return acc;
    }, {});

    if (Object.keys(badgeByLabel).length === 0) return;

    const optionItems = this.getDropdownOptionItems();

    for (const optionItem of optionItems) {
      const itemElement = optionItem as HTMLElement;
      if (itemElement.querySelector(".combo-box-option-badge")) continue;

      const optionLabelText = this.normaliseText(itemElement.textContent);
      if (!optionLabelText) continue;

      const matchingOptionLabel = Object.keys(badgeByLabel).find((label) => {
        const normalisedLabel = this.normaliseText(label);
        return optionLabelText === normalisedLabel || optionLabelText.includes(normalisedLabel);
      });
      if (!matchingOptionLabel) continue;

      const badgeText = badgeByLabel[matchingOptionLabel];
      if (!badgeText) continue;

      const badgeElement = document.createElement("ion-chip");
      badgeElement.setAttribute("color", "primary");
      badgeElement.classList.add("combo-box-option-badge");
      badgeElement.style.marginLeft = "0.5rem";
      badgeElement.style.pointerEvents = "none";
      badgeElement.style.display = "inline-flex";
      badgeElement.style.alignItems = "center";
      badgeElement.style.fontSize = "0.75rem";
      badgeElement.style.fontWeight = "600";
      badgeElement.style.verticalAlign = "middle";
      badgeElement.textContent = badgeText;

      itemElement.appendChild(badgeElement);
    }
  }

  private getDropdownOptionItems(): HTMLElement[] {
    const optionButtons = this.queryAllDeep(".select-interface-option");
    if (optionButtons.length > 0) return optionButtons;
    return this.queryAllDeep("ion-item");
  }

  private queryAllDeep(selector: string, root: ParentNode | ShadowRoot = document): HTMLElement[] {
    const results = Array.from(root.querySelectorAll(selector)) as HTMLElement[];
    const allElements = Array.from(root.querySelectorAll("*")) as HTMLElement[];

    for (const element of allElements) {
      if (element.shadowRoot) {
        results.push(...this.queryAllDeep(selector, element.shadowRoot));
      }
    }

    return results;
  }

  private normaliseText(text: string | null | undefined): string {
    return (text ?? "").replace(/\s+/g, " ").trim().toLowerCase();
  }
}
