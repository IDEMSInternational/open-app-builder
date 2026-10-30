import { logWarning } from "../../../../../utils";

/**
 * Nest rows between `begin_{type}` and `end_{type}` rows within a `rows` array of the begin row,
 * removing the `begin_` prefix from its type and deleting the end row. Groups can be nested,
 * with each `end_` row closing the most recent open `begin_` row
 * @param context name to include in warnings, e.g. the flow_name
 */
export function nestBeginEndRows<T extends { type?: string; rows?: T[] }>(
  rows: T[],
  context = ""
): T[] {
  const root: T[] = [];
  /** Stack of currently open groups, with original begin type for matching end rows */
  const openGroups: { row: T; beginType: string }[] = [];
  const currentRows = () =>
    openGroups.length > 0 ? openGroups[openGroups.length - 1].row.rows : root;

  for (const row of rows) {
    const type = typeof row.type === "string" ? row.type : "";
    if (type.startsWith("begin_")) {
      const group = { ...row, type: type.replace("begin_", ""), rows: [] as T[] };
      currentRows().push(group);
      openGroups.push({ row: group, beginType: type });
      continue;
    }
    if (type.startsWith("end_")) {
      const closed = openGroups.pop();
      if (!closed) {
        logWarning({ msg1: `"${type}" row has no matching begin row, skipping`, msg2: context });
      } else if (type.replace("end_", "") !== closed.beginType.replace("begin_", "")) {
        logWarning({ msg1: `"${type}" row closes "${closed.beginType}"`, msg2: context });
      }
      continue;
    }
    currentRows().push(row);
  }

  // Any groups left open are closed at the end of the rows
  for (const { beginType } of openGroups.reverse()) {
    logWarning({ msg1: `Missing "${beginType.replace("begin_", "end_")}" row`, msg2: context });
  }
  return root;
}
