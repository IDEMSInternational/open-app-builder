import { DataFrame } from "danfojs";

/**
 * Replace NaN values with replacement value. Similar to danfo.js replace method except
 * also allows for undefined and null values
 */
export function replaceNaN(df: DataFrame, replaceValue: any) {
  df.applyMap((v: any) => (Number.isNaN(v) ? replaceValue : v), { inplace: true });
}

/**
 * Take a json data array and ensure all entries contain value for all keys
 * @param missingValueReplacement - value to assign where key not contained in entry
 **/
export function normalizeData(data: { [key: string]: any }[], missingValueReplacement = undefined) {
  const columnsHashmap = {};
  // Generate a list of all columns in data
  for (const entry of data) {
    for (const key of Object.keys(entry)) {
      columnsHashmap[key] = true;
    }
  }
  const columns = Object.keys(columnsHashmap);
  // Replace missing values
  return data.map((entry) => {
    for (const column of columns) {
      if (!entry.hasOwnProperty(column)) {
        entry[column] = missingValueReplacement;
      }
    }
    return entry;
  });
}

/**
 * Convert an object array into a json object, with keys corresponding to array entries
 * @param keyfield any unique field which all array objects contain to use as hash keys (e.g. 'id')
 */
export function arrayToHashmap<T>(arr: T[], keyfield: string): { [key: string]: T } {
  const hashmap: { [key: string]: T } = {};
  for (const el of arr) {
    if (el.hasOwnProperty(keyfield)) {
      hashmap[el[keyfield]] = el;
    }
  }
  return hashmap;
}
