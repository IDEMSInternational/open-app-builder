export const STEPS_PER_ROW = 5;

/** `current` is the most recently completed step */
export type IProgressSummaryStepStatus = "completed" | "current" | "empty";

export interface IProgressSummaryStep {
  index: number;
  status: IProgressSummaryStepStatus;
}

/** Guards against values that are not counts, e.g. a timestamp */
export const MAX_COMPLETED_COUNT = 50;

/** Whole number of completed steps from a number or numeric string. Invalid values count as 0 */
export function parseCompletedCount(value: unknown): number {
  if (typeof value !== "number" && typeof value !== "string") return 0;
  if (typeof value === "string" && value.trim() === "") return 0;
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return 0;
  return Math.min(Math.floor(num), MAX_COMPLETED_COUNT);
}

/** Lay out steps in rows, adding an empty row once the last one is full */
export function getStepRows(
  completedCount: number,
  stepsPerRow = STEPS_PER_ROW
): IProgressSummaryStep[][] {
  const rowCount = Math.floor(completedCount / stepsPerRow) + 1;
  const rows: IProgressSummaryStep[][] = [];
  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    const row: IProgressSummaryStep[] = [];
    for (let column = 0; column < stepsPerRow; column++) {
      const index = rowIndex * stepsPerRow + column;
      row.push({ index, status: getStepStatus(index, completedCount) });
    }
    rows.push(row);
  }
  return rows;
}

function getStepStatus(index: number, completedCount: number): IProgressSummaryStepStatus {
  if (index === completedCount - 1) return "current";
  if (index < completedCount) return "completed";
  return "empty";
}
