import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { DbService } from "src/app/shared/services/db/db.service";
import ALL_SURVEYS from "./surveys";
import { ISurvey, ISurveyResponse } from "./types/survey.types";

type ISurveyId = keyof typeof ALL_SURVEYS;

@Injectable({
  providedIn: "root",
})
/**
 * Deprecated - The survey service used to be a wrapper around survey-js to present forms,
 * however these have now been integrated into the templating system.
 *
 * The only survey still shown are the intro splash screens (which aren't really a survey),
 * and should eventually be migrated to the templating system and this service removed
 *
 * See issue: https://github.com/IDEMSInternational/parenting-app-ui/issues/674
 */
export class _DeprecatedSurveyService {
  allSurveys = ALL_SURVEYS;
  constructor(private modalCtrl: ModalController, private dbService: DbService) {}

  /**
   * Checks for exisitng survey responses prior to run (returning if already complete)
   * Load new or incomplete survey in a modal
   */
  async runSurvey(surveyId: ISurveyId) {
    const survey = this.allSurveys[surveyId];
    await this.showSurvey(survey);
  }
  /**
   * Launch the survey in a modal window, either using the default component used
   * to render a surveyJS form, or custom component passed
   */
  private async showSurvey(survey: ISurvey, response: ISurveyResponse = null) {
    const surveyComponent = survey.surveyCustomComponent;
    const modal = await this.modalCtrl.create({
      component: surveyComponent,
      componentProps: { survey, response },
      backdropDismiss: false,
    });
    await modal.present();
    const res: ISurveyResponse = (await modal.onDidDismiss()).data || {};
    if (res._isCompleted) {
      this.dbService.table("surveys").put(res);
    }
  }
}
