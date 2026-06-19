import { Component, computed, effect, OnDestroy } from "@angular/core";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({
  /** Text displayed above the progress bar. */
  title: coerce.string(""),
  /**
   * Time in ms for the progress bar to animate from 0 to 100.
   * When set, the component updates its value over this duration.
   */
  duration: coerce.number(0),
  /**
   * When true and duration is set, the bar animates automatically.
   * When false, animation is paused at the current value.
   */
  auto_play: coerce.boolean(false),
  /** Color applied to the title and completed portion of the progress bar. */
  color: coerce.string(""),
}));

@Component({
  selector: "plh-progress-bar",
  templateUrl: "./progress-bar.component.html",
  styleUrls: ["./progress-bar.component.scss"],
  standalone: false,
})
export class PlhProgressBarComponent
  extends TemplateBaseComponentWithParams(AuthorSchema)
  implements OnDestroy
{
  private animationFrameId?: number;
  private animationElapsedMs = 0;
  private animationDuration = 0;

  accentColor = computed(() => this.params().color || "var(--ion-color-primary)");

  displayProgress = computed(() => {
    const val = this.value();
    const num = typeof val === "number" ? val : Number(val);
    if (Number.isNaN(num)) return 0;
    return Math.min(100, Math.max(0, num));
  });

  constructor() {
    super();
    effect((onCleanup) => {
      const duration = this.params().duration;
      const autoPlay = this.params().autoPlay;

      if (!duration || duration <= 0) {
        this.animationElapsedMs = 0;
        this.animationDuration = 0;
        return;
      }

      if (duration !== this.animationDuration) {
        this.animationElapsedMs = 0;
        this.animationDuration = duration;
      }

      if (!autoPlay) return;

      if (this.animationElapsedMs === 0) {
        void this.setValue(0);
      }

      const startTime = performance.now() - this.animationElapsedMs;
      let lastValue = Math.round((this.animationElapsedMs / duration) * 100);

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        this.animationElapsedMs = Math.min(duration, elapsed);
        const progress = Math.min(100, (elapsed / duration) * 100);
        const rounded = Math.round(progress);
        if (rounded !== lastValue) {
          lastValue = rounded;
          void this.setValue(rounded);
        }
        if (progress < 100) {
          this.animationFrameId = requestAnimationFrame(animate);
        }
      };

      this.animationFrameId = requestAnimationFrame(animate);

      onCleanup(() => {
        if (this.animationFrameId !== undefined) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = undefined;
        }
      });
    });
  }

  ngOnDestroy() {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
