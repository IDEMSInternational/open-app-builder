//  TODO - move to generic location (possibly object-utils once #2423 merged)
export function sortJsonByKey<T extends Record<string, any>>(json: T) {
  const sorted = {};
  for (const [key, value] of Object.entries(json).sort((a, b) => (a[0] > b[0] ? 1 : -1))) {
    sorted[key] = value;
  }
  return sorted as T;
}

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
export function generateMarkdownTable(data: Record<string, any>[]) {
  const columns = Object.keys(data[0]);

  const rows: string[][] = [];
  rows.push(columns);
  rows.push(columns.map(() => "---"));
  for (const el of data) {
    rows.push(columns.map((c) => el[c]));
  }
  const rowStrings: string[] = rows.map((r) => `| ${r.join(" | ")} |`);
  return rowStrings.join("\n");
}
