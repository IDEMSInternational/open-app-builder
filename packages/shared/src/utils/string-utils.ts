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
  const mb = kb / 1024;
  const power = 10 ^ decimalPlaces;
  return Math.round((mb * power) / power);
}

/**
 * Take an input string value and empty to parse as native data type, including
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
