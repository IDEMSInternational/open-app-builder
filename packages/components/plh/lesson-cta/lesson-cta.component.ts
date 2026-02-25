import { Component } from "@angular/core";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  badge_text: coerce.string(""),
  cta_text: coerce.string(""),
  subtitle: coerce.string(""),
  title: coerce.string(""),
}));

@Component({
  selector: "plh-lesson-cta",
  templateUrl: "./lesson-cta.component.html",
  styleUrls: ["./lesson-cta.component.scss"],
  standalone: false,
})
export class PlhLessonCtaComponent extends TemplateBaseComponentWithParams(AuthorSchema) {}
