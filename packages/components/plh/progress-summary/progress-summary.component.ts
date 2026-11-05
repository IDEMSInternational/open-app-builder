import { Component, computed } from "@angular/core";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";
import { getStepRows, parseCompletedCount, STEPS_PER_ROW } from "./progress-summary.logic";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** Bold heading shown under the steps. Hidden when empty. */
  title: coerce.string(""),
  /** Text shown under the title. Hidden when empty. */
  text: coerce.string(""),
  /** Image shown in a white circle above the steps. The circle is hidden when empty. */
  image_asset: coerce.string(""),
}));

/**
 * Shows a number of completed steps, read from the row's `value`, as rows of ticked circles with
 * the most recent step highlighted. There is always at least one empty step after the completed
 * ones, see `getStepRows`.
 */
@Component({
  selector: "plh-progress-summary",
  templateUrl: "./progress-summary.component.html",
  styleUrls: ["./progress-summary.component.scss"],
  standalone: false,
})
export class PlhProgressSummaryComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  readonly stepsPerRow = STEPS_PER_ROW;

  completedCount = computed(() => parseCompletedCount(this.value()));

  stepRows = computed(() => getStepRows(this.completedCount(), this.stepsPerRow));
}
