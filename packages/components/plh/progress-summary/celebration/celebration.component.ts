import { Component, input } from "@angular/core";

/** Bounces its content and sends a ring and sparks outwards when `play` is true */
@Component({
  selector: "plh-progress-summary-celebration",
  templateUrl: "./celebration.component.html",
  styleUrls: ["./celebration.component.scss"],
  host: { "[class.play]": "play()" },
  standalone: false,
})
export class PlhProgressSummaryCelebrationComponent {
  play = input(false);

  /** Spark directions, in degrees */
  readonly sparkAngles = [0, 45, 90, 135, 180, 225, 270, 315];
}
