import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ISurvey } from "../types/survey.types";

@Component({
  template: `
    <ion-button fill="clear" (click)="skipIntro()" class="skip-button">Skip Intro</ion-button>
    <div class="section-container">
      <section [@fadeInOut]="fadeSection[0]">Bringing up teenagers is hard</section>
      <section [@fadeInOut]="fadeSection[1]">You are the best parent your teen could have</section>
      <section [@fadeInOut]="fadeSection[2]">
        Join the 124 million parents who have used our resources
      </section>
      <section [@fadeInOut]="fadeSection[3]">
        <div>Powered by Parenting for Lifelong Health</div>
        <div class="partner-logos">
          <img src="assets/logos/PLH.svg" />
          <img src="assets/logos/Unicef.svg" />
          <img src="assets/logos/WHO.svg" />
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .section-container {
        position: relative;
        width: 300px;
        margin-top: 30%;
        margin-left: auto;
        margin-right: auto;
      }
      .partner-logos {
        width: 300px;
        margin-top: 2em;
        display: grid;
        grid-gap: 15px;
        grid-template-columns: repeat(3, 90px);
        grid-template-rows: repeat(3, 90px);
        grid-auto-flow: row;
      }
      .partner-logos > img {
        height: 100%;
      }
      section {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
      .skip-button {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.3;
      }
    `,
  ],
  animations: [
    trigger("fadeInOut", [
      state("in", style({ opacity: 1 })),
      state("out", style({ opacity: 0 })),
      // when fading in include 1s delay for previous animations to complete
      transition("* => in", [animate("0.5s 1s")]),
      transition("in => out", [animate("0.5s")]),
    ]),
  ],
})
/**
 * The Intro Survey shows a set of static images to function like a splash screen
 * It currently does not take any survey inputs, but uses the survey module to avoid code duplication
 */
export class IntroSplashSurveyComponent implements OnInit {
  // local tracker for which sections have been shown
  fadeSection = [];
  // durations to display each faded section
  fadeTimes = [3500, 4000, 3500, 5000];
  private _isDismissed = false;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.runFade();
  }
  /**
   * Iterate over each section for display, showing for
   * a defined period of time before fading out and moving
   * on to the next
   */
  private async runFade() {
    let i = 0;
    for (let fadeTime of this.fadeTimes) {
      this.fadeSection[i] = "in";
      // wait specied time plus additional animation time
      await this._wait(fadeTime + 1500);
      this.fadeSection[i] = "out";
      i++;
    }
    // modal may have already been dismissed, so check it exists before attempting again
    if (!this._isDismissed) {
      await this.modalCtrl.dismiss({ _completed: false });
    }
  }
  skipIntro() {
    // repeat intro in the future so set completed variable to false
    this._isDismissed = true;
    this.modalCtrl.dismiss({ _completed: false });
  }
  private _wait(ms: number) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, ms)
    );
  }
}
/**
 * Export in default survey format so can be called from
 * survey service
 */
const IntroSplashSurvey: ISurvey = {
  allowRepeats: false,
  surveyId: "intro_splash",
  upgrade: {},
  version: 1,
  surveyCustomComponent: IntroSplashSurveyComponent,
  surveyCustomForm: null,
};
export default IntroSplashSurvey;
