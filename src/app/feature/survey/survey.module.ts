import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SurveyJSModalComponent } from "./components/surveyJS-modal.component";
import { AnalyticsSurveyComponent } from "./surveys/analytics/analytics.survey";
import { IntroSplashSurveyComponent } from "./surveys/intro-splash.survey";

const SurveyComponents = [
  SurveyJSModalComponent,
  AnalyticsSurveyComponent,
  IntroSplashSurveyComponent,
];

/**
 * The survey module provides a service, components, and data to generate survey forms,
 * and save results to the database.
 */
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ReactiveFormsModule],
  declarations: [...SurveyComponents],
})
export class SurveyModule {}
