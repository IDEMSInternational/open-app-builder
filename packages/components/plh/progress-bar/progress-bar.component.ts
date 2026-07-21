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

  /** `on_progress` thresholds already fired; each fires at most once. */
  private firedProgressThresholds = new Set<number>();

  /** Whether thresholds already met when the bar loaded have been recorded (they don't fire). */
  private initialThresholdsSeeded = false;

  /** Display value while animating or paused; avoids row-refresh races from per-frame setValue. */
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

    // Fire each `on_progress: <percentage>` action once, when progress first reaches its threshold.
    // Latch fired thresholds so async re-observations of progress can't fire the same one twice.
    effect(() => {
      const progress = this.displayProgress();
      const reached = untracked(() => this.actionList())
        .filter((a) => a.trigger === "on_progress")
        .map((action) => ({ action, threshold: Number(action.trigger_args?.[0]) }))
        .filter(
          ({ threshold }) => threshold <= progress && !this.firedProgressThresholds.has(threshold)
        )
        .sort((a, b) => a.threshold - b.threshold);
      reached.forEach(({ threshold }) => this.firedProgressThresholds.add(threshold));

      // On load, record thresholds the bar is already past without firing them; only thresholds
      // reached afterwards fire (on_progress means reaching a threshold, not loading in past it).
      const seedingInitialThresholds = !this.initialThresholdsSeeded;
      this.initialThresholdsSeeded = true;
      if (seedingInitialThresholds || reached.length === 0) return;

      const actions = reached.map(({ action }) => action);
      void this.parentContainerComponentRef.handleActions(actions, this._row);
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
