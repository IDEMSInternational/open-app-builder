import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ISurvey } from "../types/survey.types";

@Component({
  template: `
    <ion-button fill="clear" (click)="skipIntro()" class="skip-button">Skip Intro</ion-button>
    <div class="section-container">
      <section [@fadeInOut]="fadeSection[0]">
        <img src="assets/images/splash-screen/0.svg">
        <p>Bringing up teenagers is hard</p>
      </section>
      <section [@fadeInOut]="fadeSection[1]">
        <img src="assets/images/splash-screen/1.svg">
        <p>You are the best parent your teen could have</p>
      </section>
      <section [@fadeInOut]="fadeSection[2]">
        <img src="assets/images/splash-screen/2.svg">
        <p>Join the 124 million parents who have used our resources</p>
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
      p {
        font-size: 20px;
      }

      .section-container {
        position: relative;
        width: 300px;
        margin-top: 15%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .partner-logos {
        width: 100%;
        margin-top: 2em;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .partner-logos > img {
        max-width: 200px;
        margin-bottom: 30px;
      }
      section {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        width: 100%;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      section > img {
        max-width: 200px;
      }
      .skip-button {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.3;
      }

      /* For short phone screen */
      @media only screen and (max-width: 500px) and (max-height:500px) {
        .partner-logos > img {
          width: 80px;
          margin-bottom: 10px;
        }
      }

      /* For short modal */
      @media only screen and (min-width: 600px) and (min-height:500px) and (max-height:770px) {
        .partner-logos > img {
          width: 110px;
          margin-bottom: 20px;
        }
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
