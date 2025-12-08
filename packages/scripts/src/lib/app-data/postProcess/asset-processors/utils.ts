/**
 * Check whether a string matches the expected format for the
 * name of a folder containing theme-specific assets.
 * Currently expects name to begin 'theme_'
 */
export function isThemeAssetsFolderName(str: string) {
  return str.startsWith("theme_");
}

/**
 * Simple regex to try and match standard country-language format
 * Currently restricted to any codes in the format `ab_ab` or `ab_abc`
 */
export function isCountryLanguageCode(str: string) {
  const regex = /^[a-z]{2}_[a-z]{2,3}$/gi;
  return regex.test(str);
}
