import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { PLHAnimations } from "src/app/shared/animations";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";

@Component({
  animations: PLHAnimations.fadeInOut,
  selector: "template-animated-slides",
  templateUrl: "./animated-slides.component.html",
  styleUrls: ["./animated-slides.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class TmplAnimatedSlidesComponent extends TemplateBaseComponent implements OnInit {
  closeText = "";
  // local tracker for which sections have been shown
  fadeSection = [];
  // durations to display each faded section
  fadeTimes = [];
  private _isDismissed = false;
  style: string | null;

  constructor(private modalCtrl: ModalController) {
    super();
  }

  ngOnInit(): void {
    this.getParams();
    this.runFade();
  }

  getParams() {
    this.closeText = getStringParamFromTemplateRow(this._row, "close_text", "Skip");
    for (let row of this._row.rows) {
      this.fadeTimes.push(getNumberParamFromTemplateRow(row, "duration", 0) * 1000);
    }
    this.style = getStringParamFromTemplateRow(this._row, "style", "full-screen");
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
