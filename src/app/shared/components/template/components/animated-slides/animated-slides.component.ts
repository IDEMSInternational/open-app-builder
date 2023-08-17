import { Component, OnInit } from "@angular/core";
import { PLHAnimations } from "src/app/shared/animations";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "src/app/shared/utils";
import { TemplateBaseComponent } from "../base";

// create an enum that stores the values of the animation styles
// at the moment (until later updated) there is two: fade and none
export enum AnimationStyle {
  FADE = "fade",
  NONE = "none",
}

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

  // it appears that the purpose of getParams is to set the values of the variables
  // and to set the following properties:
  // skipText
  // displayTimes
  // style
  // add another feature called slideParams which would store the duration and animation
  getParams() {
    this.skipText = getStringParamFromTemplateRow(this._row, "skip_text", "Skip");
    console.log("***this.skipText***", this.skipText);

    for (let row of this._row.rows) {
      const duration = getNumberParamFromTemplateRow(row, "duration", 0) * 1000;
      const animation = getStringParamFromTemplateRow(row, "animation", "fade"); // default to fade

      console.log("***duration***", duration);
      console.log("***animation***", animation);
      this.slideParams.push({
        duration,
        animation,
      });
    }
    this.style = getStringParamFromTemplateRow(this._row, "style", null);
    console.log("***this.style***", this.style);
    console.log("***this.fadeTimes***", this.fadeTimes);
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
