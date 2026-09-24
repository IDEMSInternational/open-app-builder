import { Component, computed, OnInit } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { Debouncer } from "shared/src/utils/async-utils";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** Placeholder text to show when empty. */
  placeholder: coerce.string(""),
}));

@Component({
  selector: "plh-text-area",
  templateUrl: "./text-area.component.html",
  styleUrls: ["./text-area.component.scss"],
  standalone: false,
})
export class TmplTextAreaComponent
  extends TemplateBaseComponentWithParams(AuthorSchema)
  implements OnInit
{
  /** Ensure any value passed from parent is coerced to correct format */
  public inputValue = computed(() => this.coerceValue(this.value()));

  /** Use debouncer to reduce side-effect frequency when typing input */
  private inputDebouncer = new Debouncer(500);

  /** Internal tracking variable to ensure change actions correctly triggered on blur */
  private lastTriggeredValue: string;

  ngOnInit() {
    // Set initial value to prevent firing actions on first blur without changes
    this.lastTriggeredValue = this.inputValue();
  }

  public handleInput(v: string) {
    this.inputDebouncer.run(async () => {
      const coerced = this.coerceValue(v);
      await this.setValue(coerced, false);
    });
  }

  /** Trigger change actions only when input complete and blur fired */
  public async handleBlur() {
    if (this._row.disabled) return;
    // ensure pending value updates complete
    await this.inputDebouncer.flush();
    const value = this.inputValue();
    // previous handleInput will have optimistically set the stored row
    // value, so use internal tracking to decide whether to trigger actions.
    // This will also prevent repeated actions if a user clicks in and out of the text area
    if (value === this.lastTriggeredValue) return;
    this.lastTriggeredValue = value;
    await this.triggerSetSelfAction(value);
    await this.triggerActions("changed");
  }

  private coerceValue(v: any): string {
    v ??= ""; // coerce null and undefined
    return String(v);
  }
}
