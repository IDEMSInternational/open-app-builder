export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
/**
 * convert strings containing "TRUE", "true", "FALSE" or "false" to booleans
 */
export function booleanStringToBoolean(str: string) {
  if (typeof str === "string") {
    if (str.match(/^true$/gi)) return true;
    if (str.match(/^false$/gi)) return false;
  }
  return str;
}

/** Convert size in KB to MB with specified number of decimal places */
export function kbToMB(kb: number, decimalPlaces = 1) {
  // using convention of 1000 kb in mb (not 1024 KiB in MiB)
  // https://ux.stackexchange.com/questions/13815/files-size-units-kib-vs-kb-vs-kb
  const mb = kb / 1000;
  const power = 10 ** decimalPlaces;
  return Math.round(mb * power) / power;
}

/**
 * Take an input string value and attempt to parse as native data type, including
 * numeric, boolean, null and undefined string representations
 */
export function parseStringValue(v: string): any {
  // return non-string and empty string as-is
  if (typeof v !== "string") return v;
  if (!v) return v;
  v = v.trim();
  // attempt to parse as number if possible and return if valid
  // https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
  if (!isNaN(v as any)) return Number(v);
  // attempt to parse as boolean and return if matched
  if (v.match(/^true$/gi)) return true;
  if (v.match(/^false$/gi)) return false;
  // attempt to parse null and undefined string representations and return if matched
  if (v.match(/^null$/gi)) return null;
  if (v.match(/^undefined$/gi)) return undefined;
  // attempt to parse quoted (keep string representation)
  if (v.match(/^"[a-z0-9.]*"$/gi)) return v.replace(/"/g, "");
  return v;
}

/** Remove preceding `/` from any named asset paths */
export function cleanAssetName(value: string) {
  if (value.startsWith("/")) value = value.substring(1);
  return value;
}

/** Matches calendar date only (e.g. `2023-01-01`), extended to full ISO 8601 for ion-datetime. */
const ISO_DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Normalize author/template date strings to full ISO 8601 for `ion-datetime` `min` / `max`.
 * - Empty or whitespace-only → `undefined`
 * - `YYYY-MM-DD` only → UTC start of day, or end of day when `endOfDay` is true
 * - Other values → `Date.parse` then `toISOString()`, or `undefined` if invalid
 */
export function authorDateParamToIso8601(raw: string, endOfDay: boolean): string | undefined {
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (ISO_DATE_ONLY.test(trimmed)) {
    return endOfDay ? `${trimmed}T23:59:59.999Z` : `${trimmed}T00:00:00.000Z`;
  }
  const ms = Date.parse(trimmed);
  if (Number.isNaN(ms)) return undefined;
  return new Date(ms).toISOString();
}
