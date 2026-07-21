import { FlowTypes } from "packages/data-models";

/**
 * Decide which `on_progress` actions to fire for a progress update.
 * Mutates `handledThresholds` to latch handled thresholds (seeded or fired).
 */
export function selectOnProgressActions(options: {
  progress: number;
  previousProgress: number | null;
  actions: FlowTypes.TemplateRowAction[];
  handledThresholds: Set<number>;
}): { previousProgress: number; toFire: FlowTypes.TemplateRowAction[] } {
  const { progress, previousProgress, actions, handledThresholds } = options;

  const candidates = actions
    .filter((a) => a.trigger === "on_progress")
    .map((action) => ({ action, threshold: Number(action.trigger_args?.[0]) }))
    .filter(
      ({ threshold }) =>
        !Number.isNaN(threshold) && threshold <= progress && !handledThresholds.has(threshold)
    )
    .sort((a, b) => a.threshold - b.threshold);

  candidates.forEach(({ threshold }) => handledThresholds.add(threshold));

  // First observation: seed thresholds already at/below progress without firing.
  if (previousProgress === null) {
    return { previousProgress: progress, toFire: [] };
  }

  // Only fire thresholds crossed upward since the last observation. Late-bound actions that
  // appear already at/below current progress are latched above but not fired.
  const toFire = candidates
    .filter(({ threshold }) => threshold > previousProgress && threshold <= progress)
    .map(({ action }) => action);

  return { previousProgress: progress, toFire };
}
