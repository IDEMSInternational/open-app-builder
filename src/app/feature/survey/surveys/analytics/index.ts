import { Validators } from "@angular/forms";
import { ISurvey } from "src/app/feature/survey/types/survey.types";
import { AnalyticsSurveyComponent } from "./analytics.survey";

/**
 * This survey provides app consent screens alongside login
 *
 * Changelog:
 *
 */
const AnalyticsSurvey: ISurvey = {
  allowRepeats: false,
  version: 1,
  // Note - this upgrade isn't required, just for reference
  upgrade: {
    1: (values) => {
      return values;
    },
  },
  surveyId: "analytics",
  surveyCustomComponent: AnalyticsSurveyComponent,
  surveyCustomForm: {
    analyticsConsent: ["", Validators.required],
  },
};

export default AnalyticsSurvey;
