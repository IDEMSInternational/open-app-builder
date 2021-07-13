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
