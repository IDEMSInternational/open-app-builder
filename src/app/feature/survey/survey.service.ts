import { Injectable } from "@angular/core";
import { ModalController } from "@ionic/angular";
import * as Survey from "survey-angular";
import { DbService } from "src/app/shared/services/db/db.service";
import ALL_SURVEYS from "./surveys";
import { SurveyJSModalComponent } from "./components/surveyJS-modal.component";
import { ISurvey, ISurveyResponse } from "./types/survey.types";
import { FormBuilder } from "@angular/forms";

type ISurveyId = keyof typeof ALL_SURVEYS;

@Injectable({
  providedIn: "root",
})
export class SurveyService {
  allSurveys = ALL_SURVEYS;
  constructor(
    private modalCtrl: ModalController,
    private dbService: DbService,
    private fb: FormBuilder
  ) {}

  /**
   * Checks for exisitng survey responses prior to run (returning if already complete)
   * Load new or incomplete survey in a modal
   */
  async runSurvey(surveyId: ISurveyId) {
    const survey = this.allSurveys[surveyId];
    const responses = await this.getResponses(surveyId);
    const upgrades = responses.map(async (r) => await this.checkUpgrades(r));
    const upgradedResponses = await Promise.all(upgrades);
    const isComplete = this.checkSurveyCompletion(survey, upgradedResponses);
    if (isComplete) {
      return upgradedResponses;
    } else {
      // pass existing response for editing if available
      const editableResponse = survey.allowRepeats ? null : upgradedResponses[0];
      await this.showSurvey(survey, editableResponse);
    }
  }
  /**
   *
   */
  private checkSurveyCompletion(survey: ISurvey, responses: ISurveyResponse[]) {
    if (survey.allowRepeats || responses.length === 0) {
      return false;
    } else {
      return responses[0]._isCompleted;
    }
  }
  private async getResponses(surveyId: ISurveyId) {
    return this.dbService
      .table<ISurveyResponse>("surveys")
      .where("surveyId")
      .equals(surveyId)
      .toArray();
  }
  /**
   * In case of survey data schema changes, use assigned upgrade logic
   * to ensure data consistency across all surveys.
   */
  private async checkUpgrades(response: ISurveyResponse): Promise<ISurveyResponse> {
    const surveyId = response.surveyId;
    const survey = this.allSurveys[surveyId] as ISurvey;
    if (response.version === survey.version) {
      return response;
    }
    if (response.version > survey.version) {
      // should not happen, possibly debugging
      return { ...response, version: survey.version };
    }
    if (response.version < survey.version) {
      let values = response.values;
      const increment = response.version + 1;
      if (survey.upgrade.hasOwnProperty(increment)) {
        values = survey.upgrade[increment](values);
      } else {
        // TODO - log to error monitoring service
        console.error(`survey upgrade not defined: ${surveyId}: ${response.version}->${increment}`);
      }
      // re-evaluate logic to see if upgraded version still completed or
      // additional inputs required
      let _isCompleted = false;
      if (survey.surveyJson) {
        const upgradedModel = new Survey.Model(survey);
        upgradedModel.data = values;
        _isCompleted = upgradedModel.isCompleted;
      }
      if (survey.surveyCustomForm) {
        const upgradedForm = this.fb.group(survey.surveyCustomForm);
        upgradedForm.patchValue(values);
        _isCompleted = upgradedForm.valid;
      }
      const upgraded = {
        ...response,
        values,
        version: increment,
        _isCompleted,
      };
      console.log(`survey upgraded: ${surveyId}: ${response.version}->${increment}`, upgraded);
      await this.dbService.table("surveys").put(upgraded);
      return this.checkUpgrades(upgraded);
    }
    return response;
  }

  /**
   * Launch the survey in a modal window, either using the default component used
   * to render a surveyJS form, or custom component passed
   */
  private async showSurvey(survey: ISurvey, response: ISurveyResponse = null) {
    const surveyComponent = survey.surveyCustomComponent || SurveyJSModalComponent;
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
