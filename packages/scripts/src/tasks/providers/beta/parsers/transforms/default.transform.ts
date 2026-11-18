/**
 * Set a default value for a key on a row if it is missing or empty.
 * Existing values (including `false` and `0`) are kept
 */
export function setDefaultValue<T extends Record<string, any>>(row: T, key: string, value: any): T {
  const existing = row[key];
  if (existing !== undefined && existing !== null && existing !== "") return row;
  return { ...row, [key]: value };
}
