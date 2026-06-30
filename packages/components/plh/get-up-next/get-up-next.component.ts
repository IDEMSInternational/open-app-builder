import { Component } from "@angular/core";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({}));

@Component({
  selector: "plh-get-up-next",
  template: "",
  standalone: false,
})
export class PlhGetUpNextComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  constructor() {
    super();
    this.shouldShow.set(false);
  }
}
