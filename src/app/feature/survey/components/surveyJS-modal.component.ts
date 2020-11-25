import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ISurvey, ISurveyResponse } from "../types/survey.types";
import * as Survey from "survey-angular";
Survey.StylesManager.applyTheme("modern");

@Component({
  selector: "surveyJS-modal-component",
  styleUrls: ["./surveyJS-modal.component.scss"],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="survey-header">
      <h1>{{ survey.surveyJson.title }}</h1>
      <ion-button (click)="dismiss()" fill="clear">
        <ion-icon slot="icon-only" name="close"></ion-icon>
      </ion-button>
    </div>
    <div id="surveyElement"></div>
  `,
})
export class SurveyJSModalComponent implements OnInit {
  @Input() survey: ISurvey;
  @Input() response: ISurveyResponse;
  surveyModel: Survey.Model;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.renderSurvey(this.survey.surveyJson);
  }
  renderSurvey(json: any) {
    json.title = null;
    json.completedHtml = "<span></span>";
    this.surveyModel = new Survey.Model(json);
    if (this.response) {
      this.surveyModel.data = this.response.values;
    }
    this.surveyModel.onComplete.add(() => {
      this.dismiss();
    });
    Survey.SurveyNG.render("surveyElement", { model: this.surveyModel });
  }
  dismiss() {
    const { isCompleted, data } = this.surveyModel;
    const { surveyId, version } = this.survey;
    const response: ISurveyResponse = {
      ...this.response,
      _isCompleted: isCompleted,
      _lastModified: new Date().toISOString(),
      surveyId,
      version,
      values: data,
    };
    this.modalCtrl.dismiss(response);
  }

  sendData(e) {
    console.log("sending data", e);
  }
}
