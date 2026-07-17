import { Component, input, OnDestroy, OnInit, output } from "@angular/core";
import { Debouncer } from "shared/src/utils/async-utils";

/**
 * Custom text input shown for radio_list options with `input_allowed`.
 *
 * Owns debounce / blur-commit behaviour (mirroring text-box): optimistic
 * `valueChange` while typing, and `valueCommit` on blur only when the text
 * actually changed. Domain mapping to `{ key, value }` stays in the parent.
 */
@Component({
  selector: "radio-list-custom-input",
  templateUrl: "./radio-list-custom-input.component.html",
  styleUrls: ["./radio-list-custom-input.component.scss"],
  standalone: false,
  host: {
    "[attr.data-variant]": "variant()",
  },
})
export class RadioListCustomInputComponent implements OnInit, OnDestroy {
  /** Current custom text (from the parent object value). */
  public value = input<string>("");
  /** Placeholder for the textarea. */
  public placeholder = input<string>("");
  /** When true, blur commit is skipped. */
  public disabled = input<boolean>(false);
  /** Layout variant; drives host `data-variant` for spacing. */
  public variant = input<string>("default");

  /** Immediate draft text (every keystroke) so the parent can remember across option switches. */
  public textChange = output<string>();
  /** Debounced text for optimistic setValue (no changed actions). */
  public valueChange = output<string>();
  /** Final text on blur when it differs from the last committed value. */
  public valueCommit = output<string>();

  private inputDebouncer = new Debouncer(500);
  private lastTriggeredValue = "";
  private draftText = "";

  ngOnInit() {
    this.draftText = this.value() ?? "";
    this.lastTriggeredValue = this.draftText;
  }

  ngOnDestroy() {
    this.inputDebouncer.cancel();
  }

  public handleInput(text: string | null | undefined) {
    this.draftText = text ?? "";
    this.textChange.emit(this.draftText);
    this.inputDebouncer.run(async () => {
      this.valueChange.emit(this.draftText);
    });
  }

  public async handleBlur() {
    if (this.disabled()) return;
    // Flush any pending debounced valueChange before deciding whether to commit.
    await this.inputDebouncer.flush();
    if (this.draftText === this.lastTriggeredValue) return;
    this.lastTriggeredValue = this.draftText;
    this.valueCommit.emit(this.draftText);
  }
}
