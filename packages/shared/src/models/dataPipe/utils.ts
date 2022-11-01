import { DataFrame } from "danfojs";

/**
 * Replace NaN values with replacement value. Similar to danfo.js replace method except
 * also allows for undefined and null values
 */
export function replaceNaN(df: DataFrame, replaceValue: any) {
  df.applyMap((v: any) => (Number.isNaN(v) ? replaceValue : v), { inplace: true });
}

/**
 * Wrapper around danfo setIndex method to provide better logging
 */
export function setIndexColumn(df: DataFrame, name: string) {
  // danfo attempts sort after setting index which will throw range error if length 0
  if (df.index.length === 0) {
    throw new Error(`Cannot set an index on an empty dataframe`);
  }
  // throw error if column does not exist
  if (!df.columns.includes(name)) {
    const columnList = df.columns.join(", ");
    throw new Error(`Column [${name}] does not exist in data\nColumns: ${columnList}`);
  }
  try {
    df.setIndex({ column: name, inplace: true });
  } catch (error) {
    // track specific non-unique values in thrown error
    if (error.message === "IndexError: Row index must contain unique values") {
      const nonUniqueValues = findNonUniqueValues(df, name);
      throw new Error("Duplicate ids found for entries: " + nonUniqueValues.join(", "));
    }
    // pass any other errors back with additional meta (e.g. non-unique values)
    throw error;
  }
}

function findNonUniqueValues(df: DataFrame, column: string) {
  return df.column(column).dropDuplicates().values;
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
  // Replace missing values and order columns consistently
  return data.map((entry) => {
    const normalised = {};
    for (const column of columns) {
      const value = entry.hasOwnProperty(column) ? entry[column] : missingValueReplacement;
      normalised[column] = value;
    }
    return normalised;
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
