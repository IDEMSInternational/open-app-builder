import { Component, input, output } from "@angular/core";
import { IAnswerOption } from "src/app/shared/utils";

/**
 * Boxed 'card' variant of the radio button grid.
 *
 * Renders each option as a bordered card laid out in the grid, using an
 * `ion-radio` (circle top-right) with the option image (top-left) and text.
 * Kept as a dedicated component so its Ionic-specific markup and styling are
 * isolated from the default grid variant. Selection is surfaced to the parent
 * via `selectionChange`, mirroring the combo-box dropdown pattern.
 */
@Component({
  selector: "radio-button-grid-card",
  templateUrl: "./radio-button-grid-card.component.html",
  styleUrls: ["./radio-button-grid-card.component.scss"],
  standalone: false,
})
export class RadioButtonGridCardComponent {
  /** Currently selected value (matched against `optionsKey`). */
  public value = input<any>();
  /** Options to render as cards. */
  public answerOptions = input.required<IAnswerOption[]>();
  /** Property key used for the option value. */
  public optionsKey = input<string>("name");
  /** Property key used for the option display text. */
  public optionsValue = input<string>("text");
  /** Grid layout styles computed by the parent (columns, gap, width, etc.). */
  public gridStyle = input<Partial<CSSStyleDeclaration>>({});
  /**
   * Colour style, applied as a `data-style` attribute. Named `styleVariant`
   * (not `style`) because Angular reserves the `[style]` binding for inline
   * styles. Default 'default'; 'secondary' tints the selected state.
   */
  public styleVariant = input<string>("default");

  /** Emitted with the selected option's value when the selection changes. */
  public selectionChange = output<any>();

  /** Select via a click anywhere on the card. */
  public selectOption(item: IAnswerOption) {
    this.selectionChange.emit(item[this.optionsKey()]);
  }

  /** Select via the ion-radio-group change event. */
  public onRadioChange(value: any) {
    this.selectionChange.emit(value);
  }
}
