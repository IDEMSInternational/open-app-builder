import { Component, computed } from "@angular/core";
import { authorDateParamToIso8601 } from "packages/shared/src/utils/string-utils";
import { defineAuthorParameterSchema, TemplateBaseComponentWithParams } from "../base";
import { generateUUID } from "src/app/shared/utils";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** If true, date time picker is disabled and greyed out */
  disabled: coerce.boolean(),
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

  /** `min` as full ISO 8601 for ion-datetime (date-only input uses start of that UTC day). */
  public minIso = computed(() => authorDateParamToIso8601(this.params().min, false));

  /** `max` as full ISO 8601 for ion-datetime (date-only input uses end of that UTC day). */
  public maxIso = computed(() => authorDateParamToIso8601(this.params().max, true));

  constructor() {
    super();
  }

  public handleChange(value: string | string[]) {
    this.setValue(value);
  }
}
