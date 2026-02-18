import { Component } from "@angular/core";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  title: coerce.string(""),
}));

@Component({
  selector: "plh-course-accordion",
  templateUrl: "./course-accordion.component.html",
  styleUrls: ["./course-accordion.component.scss"],
  standalone: false,
})
export class PlhCourseAccordionComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  constructor(public templateTranslateService: TemplateTranslateService) {
    super();
  }
}
