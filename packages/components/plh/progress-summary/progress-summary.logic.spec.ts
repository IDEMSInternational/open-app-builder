import { getStepRows, MAX_COMPLETED_COUNT, parseCompletedCount } from "./progress-summary.logic";

/** Rows as strings, e.g. "CCX__" */
function summarise(completedCount: number) {
  const symbols = { completed: "C", current: "X", empty: "_" };
  return getStepRows(completedCount).map((row) => row.map((s) => symbols[s.status]).join(""));
}

/**
 * Call standalone tests via:
 * yarn ng test --include ../packages/components/plh/progress-summary/progress-summary.logic.spec.ts
 */
describe("getStepRows", () => {
  it("shows one empty row with nothing highlighted when nothing is completed", () => {
    expect(summarise(0)).toEqual(["_____"]);
  });

  it("highlights only the most recent step", () => {
    expect(summarise(1)).toEqual(["X____"]);
    expect(summarise(2)).toEqual(["CX___"]);
    expect(summarise(4)).toEqual(["CCCX_"]);
  });

  it("adds an empty row once a row is full", () => {
    expect(summarise(5)).toEqual(["CCCCX", "_____"]);
    expect(summarise(9)).toEqual(["CCCCC", "CCCX_"]);
    expect(summarise(10)).toEqual(["CCCCC", "CCCCX", "_____"]);
  });

  it("lays out steps across several rows", () => {
    expect(summarise(12)).toEqual(["CCCCC", "CCCCC", "CX___"]);
  });

  it("numbers steps across rows", () => {
    const rows = getStepRows(6);
    expect(rows[1].map((s) => s.index)).toEqual([5, 6, 7, 8, 9]);
  });

  it("supports other row lengths", () => {
    const rows = getStepRows(3, 3);
    expect(rows.length).toBe(2);
    expect(rows[0].map((s) => s.status)).toEqual(["completed", "completed", "current"]);
  });
});

describe("parseCompletedCount", () => {
  it("accepts numbers and numeric strings", () => {
    expect(parseCompletedCount(3)).toBe(3);
    expect(parseCompletedCount("12")).toBe(12);
    expect(parseCompletedCount(" 7 ")).toBe(7);
  });

  it("rounds decimals down", () => {
    expect(parseCompletedCount(4.9)).toBe(4);
    expect(parseCompletedCount("2.5")).toBe(2);
  });

  it("caps the count", () => {
    expect(parseCompletedCount(MAX_COMPLETED_COUNT)).toBe(MAX_COMPLETED_COUNT);
    expect(parseCompletedCount(MAX_COMPLETED_COUNT + 1)).toBe(MAX_COMPLETED_COUNT);
    expect(parseCompletedCount("1762300800000")).toBe(MAX_COMPLETED_COUNT);
  });

  it("treats missing, invalid or negative values as 0", () => {
    expect(parseCompletedCount(undefined)).toBe(0);
    expect(parseCompletedCount(null)).toBe(0);
    expect(parseCompletedCount("")).toBe(0);
    expect(parseCompletedCount("abc")).toBe(0);
    expect(parseCompletedCount("@fields.count")).toBe(0);
    expect(parseCompletedCount(-3)).toBe(0);
    expect(parseCompletedCount(NaN)).toBe(0);
    expect(parseCompletedCount(Infinity)).toBe(0);
    expect(parseCompletedCount(true)).toBe(0);
    expect(parseCompletedCount({})).toBe(0);
  });
});
