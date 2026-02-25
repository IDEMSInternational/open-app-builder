import { Component, computed } from "@angular/core";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";

const PROGRESS_BAR_ROW_TYPE = "task_progress_bar";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  background_image_asset: coerce.string(""),
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
export class PlhLessonCtaComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  progressBarRow = computed(() => this.rows()?.find((row) => row.type === PROGRESS_BAR_ROW_TYPE));
}
