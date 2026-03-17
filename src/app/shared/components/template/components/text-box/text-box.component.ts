import { Component } from "@angular/core";
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

@Component({
  selector: "plh-text-box",
  templateUrl: "./text-box.component.html",
  styleUrls: ["./text-box.component.scss"],
  standalone: false,
})
export class TmplTextBoxComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  public async handleChange(value: any) {
    await this.setValue(value);
  }
}
