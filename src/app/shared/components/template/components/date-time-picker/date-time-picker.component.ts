import { Component } from "@angular/core";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { generateUUID } from "src/app/shared/utils";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** Type of picker: date & time ('date-time'), date only ('date') or time only ('time'). Default 'date-time'. */
  type: coerce.allowedValues(["date", "date-time", "time"], "date-time"),
  /** Minimum selectable date/time (ISO 8601 string). When empty, no minimum is applied. */
  min: coerce.string(""),
  /** Maximum selectable date/time (ISO 8601 string). When empty, no maximum is applied. */
  max: coerce.string(""),
}));

@Component({
  selector: "plh-date-time-picker",
  templateUrl: "./date-time-picker.component.html",
  styleUrls: ["./date-time-picker.component.scss"],
  standalone: false,
})
export class TmplDateTimePickerComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  // Generate unique ID to allow multiple date-time components to correctly bind datetime-button with datetime
  public uuid = generateUUID();

  constructor() {
    super();
  }

  public handleChange(value: string | string[]) {
    this.setValue(value);
  }
}
