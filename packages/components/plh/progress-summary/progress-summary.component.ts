import { Component, computed } from "@angular/core";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";
import { getStepRows, parseCompletedCount, STEPS_PER_ROW } from "./progress-summary.logic";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** Shown in bold under the steps */
  title: coerce.string(""),
  /** Shown under the title */
  text: coerce.string(""),
  /** Shown in a circle above the steps */
  image_asset: coerce.string(""),
}));

/** Shows the number of completed steps (row `value`) as ticked circles */
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
