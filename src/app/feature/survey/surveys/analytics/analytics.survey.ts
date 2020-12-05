import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { IonSlides, ModalController } from "@ionic/angular";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { AppTermsPage } from "src/app/pages/app-terms/app-terms.page";
import { PrivacyPage } from "src/app/pages/privacy/privacy.page";
import { ISurvey, ISurveyResponse } from "../../types/survey.types";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "analytics-survey",
  templateUrl: "./analytics.survey.html",
  styleUrls: ["./analytics.survey.scss"],
})
export class AnalyticsSurveyComponent implements OnInit {
  @ViewChild("slides", { static: true }) slides: IonSlides;
  @Input() survey: ISurvey;
  @Input() response: ISurveyResponse;
  public formGroup: FormGroup;
  constructor(
    private modalCtrl: ModalController,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group(this.survey.surveyCustomForm);
  }

  setPrivacyConsent(analyticsConsent: boolean) {
    this.slides.slideNext();
    // wait before patch as this will also remove the slide
    setTimeout(() => {
      this.patchForm({ analyticsConsent });
    }, 750);
  }
  patchForm(values: any) {
    this.formGroup.patchValue(values);
    console.log("formGroup", this.formGroup);
  }
  async signIn() {
    this.auth.signIn().subscribe((user) => {
      this.dismiss();
    });
  }
  dismiss() {
    const { value, valid } = this.formGroup;
    const { surveyId, version } = this.survey;
    const response: ISurveyResponse = {
      ...this.response,
      _isCompleted: valid,
      _lastModified: new Date().toISOString(),
      surveyId,
      version,
      values: value,
    };
    this.modalCtrl.dismiss(response);
  }
  async showTerms() {
    const modal = await this.modalCtrl.create({
      component: AppTermsPage,
      componentProps: { isModal: true },
    });
    await modal.present();
  }
  async showPrivacyPolicy() {
    const modal = await this.modalCtrl.create({
      component: PrivacyPage,
      componentProps: { isModal: true },
    });
    await modal.present();
  }
}
