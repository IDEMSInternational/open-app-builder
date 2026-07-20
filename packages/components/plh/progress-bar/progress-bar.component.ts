import { Component, computed, effect, OnDestroy, signal, untracked } from "@angular/core";
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

function clampProgress(value: unknown): number {
  const num = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(num)) return 0;
  return Math.min(100, Math.max(0, num));
}

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

  /** Last observed progress, used to detect upward crossings of `on_progress` thresholds. */
  private previousProgress: number | null = null;

  /** Local display value while auto-playing; avoids row refresh races from per-frame setValue. */
  private localProgress = signal<number | null>(null);

  accentColor = computed(() => this.params().color || "var(--ion-color-primary)");

  displayProgress = computed(() => {
    const local = this.localProgress();
    return clampProgress(local !== null ? local : this.value());
  });

  constructor() {
    super();
    effect((onCleanup) => {
      const duration = this.params().duration;
      const autoPlay = this.params().autoPlay;

      if (!duration || duration <= 0) {
        this.animationElapsedMs = 0;
        this.animationDuration = 0;
        this.localProgress.set(null);
        return;
      }

      if (duration !== this.animationDuration) {
        this.animationElapsedMs = 0;
        this.animationDuration = duration;
      }

      if (!autoPlay) {
        const pausedAt = untracked(() => this.localProgress());
        if (pausedAt !== null) {
          this.localProgress.set(null);
          void this.setValue(pausedAt);
        }
        return;
      }

      const startTime = performance.now() - this.animationElapsedMs;
      let lastValue = Math.round((this.animationElapsedMs / duration) * 100);
      this.localProgress.set(lastValue);

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        this.animationElapsedMs = Math.min(duration, elapsed);
        const progress = Math.min(100, (elapsed / duration) * 100);
        const rounded = Math.round(progress);
        if (rounded !== lastValue) {
          lastValue = rounded;
          this.localProgress.set(rounded);
        }
        if (progress < 100) {
          this.animationFrameId = requestAnimationFrame(animate);
          return;
        }
        this.localProgress.set(100);
        void this.commitProgress(100);
      };

      this.animationFrameId = requestAnimationFrame(animate);

      onCleanup(() => {
        if (this.animationFrameId !== undefined) {
          cancelAnimationFrame(this.animationFrameId);
          this.animationFrameId = undefined;
        }
      });
    });

    // Fire `on_progress: <percentage>` actions when the displayed progress crosses each threshold.
    // The threshold is read from the trigger argument (parsed in app-data-action.utils.ts). A crossing
    // fires once on the way up and re-arms if progress later drops back below the threshold.
    effect(() => {
      const progress = this.displayProgress();
      const previous = this.previousProgress;
      this.previousProgress = progress;
      // Establish a baseline on first run without firing, so a bar that mounts already at or above a
      // threshold does not fire on load; only fire on genuine upward crossings thereafter.
      if (previous === null || progress <= previous) {
        return;
      }
      const crossed = untracked(() => this.actionList())
        .filter((a) => a.trigger === "on_progress")
        .map((action) => ({ action, threshold: Number(action.trigger_args?.[0]) }))
        .filter(
          ({ threshold }) =>
            !Number.isNaN(threshold) && threshold > previous && threshold <= progress
        )
        .sort((a, b) => a.threshold - b.threshold)
        .map(({ action }) => action);
      if (crossed.length > 0) {
        void this.parentContainerComponentRef.handleActions(crossed, this._row);
      }
    });
  }

  /** Persist the final (or paused) value to the template row once, not on every frame. */
  private async commitProgress(value: number) {
    await this.setValue(value);
    if (this.localProgress() === value) {
      this.localProgress.set(null);
    }
  }

  ngOnDestroy() {
    if (this.animationFrameId !== undefined) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}
