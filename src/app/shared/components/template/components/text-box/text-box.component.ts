import { Component, effect, DestroyRef, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs";
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
  /** When true, update the value on input, else update on blur. */
  update_on_input: coerce.boolean(false),
}));

const INPUT_DEBOUNCE_MS = 300;

@Component({
  selector: "plh-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
  standalone: false,
})
export class TmplTextBoxComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  private destroyRef = inject(DestroyRef);
  /**
   * When updateOnInput is true, holds the current input value for responsive display;
   * synced from value() when it changes externally.
   */
  localValue = signal("");

  private inputValue$ = new Subject<string>();

  constructor() {
    super();
    // Sync external value into localValue when updateOnInput is used.
    effect(() => {
      if (!this.params().updateOnInput) return;
      const v = this.value();
      const str = v == null ? "" : String(v);
      if (str !== this.localValue()) {
        this.localValue.set(str);
      }
    });
    // Debounce setValue when typing so we don't run the full action pipeline on every keystroke.
    this.inputValue$
      .pipe(
        debounceTime(INPUT_DEBOUNCE_MS),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((value) => {
        this.setValue(value);
      });
  }

  /** Called on blur: commits value (and when updateOnInput also updates localValue and notifies debounced stream). */
  public handleChange(value: any) {
    if (this.params().updateOnInput) {
      const str = value == null ? "" : String(value);
      this.localValue.set(str);
      this.inputValue$.next(str);
      this.setValue(value); // commit immediately on blur; debounced setValue would no-op if same
    } else {
      this.setValue(value);
    }
  }

  /** Called on each ionInput when updateOnInput: update display and schedule debounced setValue. */
  public handleInput(value: any) {
    const str = value == null ? "" : String(value);
    this.localValue.set(str);
    this.inputValue$.next(str);
  }

  /** Used by template for [value]: when updateOnInput use localValue for responsive typing; otherwise use value(). */
  displayValue(): string {
    if (this.params().prioritisePlaceholder) return "";
    const v = this.params().updateOnInput ? this.localValue() : this.value();
    return v == null ? "" : String(v);
  }
}
