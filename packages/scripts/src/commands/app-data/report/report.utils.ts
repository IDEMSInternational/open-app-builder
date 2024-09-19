/**
 * Convert an array to a basic markdown-formatted table
 * @example
 * ```
 * generateMarkdownTable([{key_1:'value_1', key_2:'value_2'}])
 * // output
 * | key_1 | key_2 |
 * | --- | --- |
 * | value_1 | value_2 |
 * ```
 */
export function generateMarkdownTable(data: Record<string, any>[], columns?: string[]) {
  // infer columns from data if not provided
  if (!columns) {
    columns = Object.keys(data[0] || {});
  }
  const rows: string[][] = [];
  rows.push(columns);
  rows.push(columns.map(() => "---"));
  for (const el of data) {
    rows.push(columns.map((c) => el[c]));
  }
  const rowStrings: string[] = rows.map((r) => `| ${r.join(" | ")} |`);
  return rowStrings.join("\n");
}
