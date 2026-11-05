/** Number of steps shown in each row. Could be exposed as an author parameter in future */
export const STEPS_PER_ROW = 5;

/**
 * - `completed`: a step completed before the most recent one
 * - `current`: the most recently completed step, which is highlighted
 * - `empty`: a step still to complete
 */
export type IProgressSummaryStepStatus = "completed" | "current" | "empty";

export interface IProgressSummaryStep {
  /** Position of the step across all rows, starting at 0 */
  index: number;
  status: IProgressSummaryStepStatus;
}

/**
 * Convert the authored row value to a whole number of completed steps.
 * Numeric strings are accepted (e.g. field values, which are stored as text). Anything else that
 * is missing, non-numeric, negative or infinite counts as 0, and decimals are rounded down.
 */
export function parseCompletedCount(value: unknown): number {
  if (typeof value !== "number" && typeof value !== "string") return 0;
  if (typeof value === "string" && value.trim() === "") return 0;
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return 0;
  return Math.floor(num);
}

/**
 * Lay out steps in rows of `stepsPerRow`. One more row is shown than is needed for the completed
 * steps alone (`floor(completed / stepsPerRow) + 1`), so there is always at least one empty step
 * to aim for: 4 completed steps fit in one row, while 5 show a full first row and an empty second.
 */
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
