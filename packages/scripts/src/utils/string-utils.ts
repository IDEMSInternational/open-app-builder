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

/**
 * Simple regex to try and match standard country-language format
 * Currently restricted to any codes in the format `ab_ab` or `ab_abc`
 */
export function isCountryLanguageCode(str: string) {
  const regex = /^[a-z]{2}_[a-z]{2,3}$/gi;
  return regex.test(str);
}

/**
 * Check whether a string matches the expected format for the
 * name of a folder containing theme-specific assets.
 * Currently expects name to begin 'theme_'
 */
export function isThemeAssetsFolderName(str: string) {
  return str.startsWith("theme_");
}

/**
 * For a given theme asset folder name, return the name of the respective theme.
 * Expected format of the theme asset folder name is "theme_<theme_name>"
 */
export function getThemeNameFromThemeAssetFolderName(str: string) {
  return str.replace("theme_", "");
}
