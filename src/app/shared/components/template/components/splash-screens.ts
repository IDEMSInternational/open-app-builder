import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "./base";
import { ITemplateRowProps } from "../models";
import { PLHAnimations } from "src/app/shared/animations";
import { ModalController } from "@ionic/angular";

@Component({
  animations: PLHAnimations.fadeInOut,
  selector: "plh-tmpl-splash-screens",
  template: `
    <ion-button fill="clear" (click)="skipIntro()" class="skip-button">Skip Intro</ion-button>
    <div class="section-container">
      <section *ngFor="let childRow of _row.rows; let idx = index" [@fadeInOut]="fadeSection[idx]">
        <plh-template-component [row]="childRow" [parent]="parent"></plh-template-component>
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
        max-height: 85%;
        margin-top: 15%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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

      .skip-button {
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0.3;
      }
    `,
  ],
})
export class TmplSplashScreensComponent
  extends TemplateBaseComponent
  implements ITemplateRowProps, OnInit {
  fadeSection = [];
  fadeTimes = [3500, 4000, 3500, 5000];
  private _isDismissed = false;
  constructor(private modalCtrl: ModalController) {
    super();
  }
  ngOnInit() {
    this.runFade();
  }

  private async runFade() {
    let i = 0;
    for (let fadeTime of this.fadeTimes) {
      this.fadeSection[i] = "in";
      await this._wait(fadeTime + 1500);
      this.fadeSection[i] = "out";
      i++;
    }
    if (!this._isDismissed) {
      await this.modalCtrl.dismiss({ _completed: false });
    }
  }
  skipIntro() {
    this._isDismissed = true;
    this.modalCtrl.dismiss({ _completed: false });
  }
  private _wait(ms: number) {
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, ms)
    );
  }
}
