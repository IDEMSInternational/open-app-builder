import { Component } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";

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
export class TmplTextAreaComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  public async handleChange(value: any) {
    await this.setValue(value);
  }
}
