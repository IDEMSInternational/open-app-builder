import { Component, computed, OnInit } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** When true, the text box is disabled. */
  disabled: coerce.boolean(false),
  /** When true, use numeric/tel input mode. */
  number_input: coerce.boolean(false),
  /** Max input length. Use -1 for no max length. */
  max_length: coerce.number(-1),
  /** Placeholder text to show when empty. */
  placeholder: coerce.string(""),
  /** When true, show placeholder even when a value exists. */
  prioritise_placeholder: coerce.boolean(false),
  /** Custom style class to apply. */
  style: coerce.string(""),
  /** CSS text-align value applied to the input. */
  text_align: coerce.string(""),
}));

@Component({
  selector: "plh-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
  standalone: false,
})
export class TmplTextBoxComponent
  extends TemplateBaseComponentWithParams(AuthorSchema)
  implements OnInit
{
  /** Ensure any value passed from parent is coerced to correct format */
  public inputValue = computed(() => this.coerceValue(this.value()));

  /** Internal tracking variable to ensure change actions correctly triggered on blur */
  private lastTriggeredValue: string | number;

  ngOnInit() {
    // Set initial value to prevent firing actions on first blur without changes
    this.lastTriggeredValue = this.inputValue();
  }

  public handleInput(v: string | number) {
    const coerced = this.coerceValue(v);
    this.setValue(coerced, false);
  }

  /** Trigger change actions only when input complete and blur fired */
  public async handleBlur() {
    if (this._row.disabled) return;
    const value = this.inputValue();
    // previous handleInput will have optimistically set the stored row
    // value, so use internal tracking to decide whether to trigger actions.
    // This will also prevent repeated actions if a user clicks in and out an input box
    if (value === this.lastTriggeredValue) return;
    this.lastTriggeredValue = value;
    await this.triggerSetSelfAction(value);
    await this.triggerActions("changed");
  }

  private coerceValue(v: any): string | number {
    v ??= ""; // coerce null and undefined
    if (this.params().numberInput) {
      // allow empty string which would be used to clear input box
      if (v === "") return "";
      const n = Number(v);
      // If not a valid number, return the original string for debugging. Otherwise, return the number.
      return isNaN(n) ? String(v) : n;
    }

    return String(v);
  }
}
