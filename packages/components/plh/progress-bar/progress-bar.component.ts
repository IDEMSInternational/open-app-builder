import { Component, computed, effect, OnDestroy, signal, untracked } from "@angular/core";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";
import { selectCompleted, selectOnProgressActions } from "./progress-bar.logic";

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

  /** `on_progress` thresholds already handled (seeded or fired); each fires at most once. */
  private handledProgressThresholds = new Set<number>();

  /**
   * Last observed progress for detecting upward threshold crossings.
   * `null` until the first observation (used to seed without firing).
   */
  private previousProgress: number | null = null;

  /** Whether the "completed" trigger has fired (or was seeded at mount); it emits at most once. */
  private completedEmitted = false;

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
          // Commit then clear local (same as completion) so external value updates apply while paused.
          void this.commitProgress(pausedAt);
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

    // Fire each `on_progress: <percentage>` action once when progress first reaches its threshold,
    // and emit the built-in "completed" trigger once when progress first reaches 100%.
    // See `selectOnProgressActions` / `selectCompleted` for seed / latch / NaN behaviour.
    effect(() => {
      const progress = this.displayProgress();
      const previous = this.previousProgress;

      const { previousProgress, toFire } = selectOnProgressActions({
        progress,
        previousProgress: previous,
        actions: this.actionList(),
        handledThresholds: this.handledProgressThresholds,
      });
      this.previousProgress = previousProgress;

      const completed = selectCompleted({
        progress,
        previousProgress: previous,
        completedEmitted: this.completedEmitted,
      });
      this.completedEmitted = completed.completedEmitted;

      if (toFire.length > 0) {
        void this.parentContainerComponentRef.handleActions(toFire, this._row);
      }
      if (completed.emit) this.triggerActions("completed");
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
