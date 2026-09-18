import { FlowTypes } from "packages/data-models";
import { selectCompleted, selectOnProgressActions } from "./progress-bar.logic";

function onProgressAction(threshold: number | undefined): FlowTypes.TemplateRowAction {
  return {
    trigger: "on_progress",
    action_id: "set_local",
    args: ["my_var"],
    trigger_args: threshold === undefined ? undefined : [threshold],
  } as FlowTypes.TemplateRowAction;
}

describe("selectOnProgressActions", () => {
  it("seeds thresholds already met on first observation without firing", () => {
    const handled = new Set<number>();
    const action50 = onProgressAction(50);
    const action80 = onProgressAction(80);

    const result = selectOnProgressActions({
      progress: 60,
      previousProgress: null,
      actions: [action50, action80],
      handledThresholds: handled,
    });

    expect(result.toFire).toEqual([]);
    expect(result.previousProgress).toBe(60);
    expect(handled.has(50)).toBe(true);
    expect(handled.has(80)).toBe(false);
  });

  it("fires thresholds crossed upward after the seed", () => {
    const handled = new Set<number>();
    const action25 = onProgressAction(25);
    const action50 = onProgressAction(50);

    selectOnProgressActions({
      progress: 0,
      previousProgress: null,
      actions: [action25, action50],
      handledThresholds: handled,
    });

    const result = selectOnProgressActions({
      progress: 50,
      previousProgress: 0,
      actions: [action25, action50],
      handledThresholds: handled,
    });

    expect(result.toFire).toEqual([action25, action50]);
    expect(handled.has(25)).toBe(true);
    expect(handled.has(50)).toBe(true);
  });

  it("does not re-fire a latched threshold after progress drops and rises again", () => {
    const handled = new Set<number>([50]);
    const action50 = onProgressAction(50);

    const result = selectOnProgressActions({
      progress: 80,
      previousProgress: 40,
      actions: [action50],
      handledThresholds: handled,
    });

    expect(result.toFire).toEqual([]);
  });

  it("seeds late-bound actions already at/below current progress without firing", () => {
    const handled = new Set<number>();
    const action50 = onProgressAction(50);

    const result = selectOnProgressActions({
      progress: 60,
      previousProgress: 60,
      actions: [action50],
      handledThresholds: handled,
    });

    expect(result.toFire).toEqual([]);
    expect(handled.has(50)).toBe(true);
  });

  it("ignores missing or non-numeric trigger args", () => {
    const handled = new Set<number>();
    const missing = onProgressAction(undefined);
    const invalid = {
      ...onProgressAction(0),
      trigger_args: ["not-a-number"],
    } as FlowTypes.TemplateRowAction;

    const result = selectOnProgressActions({
      progress: 100,
      previousProgress: 0,
      actions: [missing, invalid],
      handledThresholds: handled,
    });

    expect(result.toFire).toEqual([]);
    expect(handled.size).toBe(0);
  });

  it("does not fire on_progress: 0 when seeding at 0", () => {
    const handled = new Set<number>();
    const action0 = onProgressAction(0);

    const seeded = selectOnProgressActions({
      progress: 0,
      previousProgress: null,
      actions: [action0],
      handledThresholds: handled,
    });
    expect(seeded.toFire).toEqual([]);
    expect(handled.has(0)).toBe(true);

    const later = selectOnProgressActions({
      progress: 10,
      previousProgress: 0,
      actions: [action0],
      handledThresholds: handled,
    });
    expect(later.toFire).toEqual([]);
  });
});

describe("selectCompleted", () => {
  it("emits when progress first reaches 100% after starting lower", () => {
    expect(
      selectCompleted({ progress: 100, previousProgress: 90, completedEmitted: false })
    ).toEqual({ emit: true, completedEmitted: true });
  });

  it("does not emit when the bar mounts at 100%, but latches it", () => {
    expect(
      selectCompleted({ progress: 100, previousProgress: null, completedEmitted: false })
    ).toEqual({ emit: false, completedEmitted: true });
  });

  it("does not re-emit once completed (e.g. after a dip and rise)", () => {
    expect(
      selectCompleted({ progress: 100, previousProgress: 40, completedEmitted: true })
    ).toEqual({
      emit: false,
      completedEmitted: true,
    });
  });

  it("does not emit below 100%", () => {
    expect(
      selectCompleted({ progress: 99, previousProgress: 10, completedEmitted: false })
    ).toEqual({
      emit: false,
      completedEmitted: false,
    });
  });
});
