import { Component, OnInit } from "@angular/core";
import { PLHAnimations } from "src/app/shared/animations";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";

@Component({
  animations: [PLHAnimations.fadeInOut],
  selector: "template-animated-slides",
  templateUrl: "./animated-slides.component.html",
  styleUrls: ["./animated-slides.component.scss"],
})
export class TmplAnimatedSlidesComponent extends TemplateBaseComponent implements OnInit {
  skipText = "";
  // local tracker for which sections have been shown
  fadeSection = [];
  // durations to display each faded section
  fadeTimes = [];
  private _isDismissed = false;
  style: string | null;
  slideParams: { duration: number; animation: string }[] = [];

  ngOnInit(): void {
    this.getParams();
    this.runFade();
  }

  getParams() {
    this.skipText = getStringParamFromTemplateRow(this._row, "skip_text", "Skip");

    for (let row of this._row.rows) {
      const duration = getNumberParamFromTemplateRow(row, "duration", 0) * 1000;
      const animation = getStringParamFromTemplateRow(row, "animation", "fade"); // default to fade

      this.slideParams.push({
        duration,
        animation,
      });
    }
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
  }
  /**
   * Iterate over each section for display, showing for
   * a defined period of time before fading out and moving
   * on to the next
   */
  private async runFade() {
    let i = 0;
    for (let slideParam of this.slideParams) {
      this.fadeSection[i] = "in";
      // wait specified time plus additional animation time
      await this._wait(slideParam.duration + 1500);
      this.fadeSection[i] = "out";
      i++;
    }
    /* component may have already been dismissed with "uncompleted" event,
     * so check it exists before attempting again */
    if (!this._isDismissed) {
      this.triggerActions("completed");
    }
  }
  skipIntro() {
    this._isDismissed = true;
    this.triggerActions("uncompleted");
  }
  private _wait(ms: number) {
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, ms)
    );
  }
}
