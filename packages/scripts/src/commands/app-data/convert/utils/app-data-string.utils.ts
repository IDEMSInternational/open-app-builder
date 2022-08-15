import chalk from "chalk";
import { FlowTypes } from "data-models";
import { setNestedProperty, booleanStringToBoolean } from "../utils";

/**
 * Xls data represents nested objects in the following ways
 * ';' - pre-processing with '_list' columns to format as array
 * '|' - post-processing specific item into set of arguments / parameters
 * ':' - modifiers or properties of an argument
 *
 * As the pipe and colon characters may or may not exist for a particular string
 * it is impossible to know any given data needs to be formatted as string or array
 * to remain consistent with the rest of the column. As such all strings will be
 * treated as arrays, and deeply nested objects extracted in future processing stages
 *
 * original:  db_lookup:first |app_events:event_id | app_launch | before:7:day'
 * nest 1:    [db_lookup:first ,app_events:event_id , app_launch , before:7:day]
 * nest 2:    [[db_lookup,first] ,[app_events,event_id] , [app_launch] , [before,7,day]]
 *
 */
export function parsAppDataString(str: string): string[][] {
  if (str.includes(";")) {
    console.error(chalk.red('lists should be pre-processed, but ";" found'));
    process.exit(1);
  }
  const nest1 = str.split("|").map((d) => d.trim());
  const nest2 = nest1.map((el) => el.split(":").map((d) => d.trim()));
  return nest2;
}

/**
 * Convert app data map string to object
 * @param str list string with key-value pairs, e.g
 * ```
 * "value_1; value_2; value_3;"
 * ````
 * @returns object with key-value pairs, e.g.
 * ```
 * ["value_1", "value_2", "value_3"]
 * ```
 */
export function parseAppDataListString(str: string, delimeter = ";"): string[] {
  return (
    str
      .split(delimeter)
      // remove whitespace between elements
      .map((val: string) => val.trim())
      // remove any trailing empty elements left by final ';'
      .filter((val: string) => val !== "")
  );
}

/**
 * Convert app data collection string to object
 * @param str list string with key-value pairs, e.g
 * ```
 * "key_1:value_1; key_2:value_2"
 * ````
 * @param delimeter optionally specify delimter that splits values, e.g ','
 * ```
 * "key_1:value_1, key_2:value_2"
 * ```
 * @returns object with key-value pairs, e.g.
 * ```
 * {"key_1":"value_1", "key_2":"value_2"}
 * ```
 */
export function parseAppDataCollectionString(
  str: string,
  delimeter = ";"
): { [key: string]: string | boolean } {
  const collection = {};
  const entryList = parseAppDataListString(str, delimeter);
  entryList.forEach((el) => {
    let [key, value] = el.split(":");
    value = value ? value.trim() : value;
    // handle keys that define deeper nesting, such as time.hours: 7
    if (key.includes(".")) {
      const [base, ...nested] = key.split(".");
      collection[base] = setNestedProperty(nested.join("."), value, collection[base]);
    } else {
      collection[key] = booleanStringToBoolean(value);
    }
  });
  return collection;
}

/**
 * When excel sheets store dates the store a datevalue as number of days since 1900 (or sometimes 1904!)
 * Convert to corresponding iso date string (e.g. 2021-11-24T18:03:36.002Z) and then leave as a local date string
 * (without the Z UTC timezone suffix (zero UTC offset) so that it can be used relative to user's own timezone)
 * https://stackoverflow.com/questions/16229494/converting-excel-date-serial-number-to-date-using-javascript
 */
export function parseAppDateValue(dateValue: number) {
  const isoString = new Date(Date.UTC(0, 0, dateValue - 1)).toISOString();
  // remove zero-utc timezone suffix
  const localDateString = isoString.slice(0, -1);
  return localDateString;
}

/** Convert a deeply nested json object to a flat json object (with nested key references) */
export function flattenJson<T>(json: any, tree = {}, nestedPath?: string): { [key: string]: T } {
  Object.entries<T>(json).forEach(([key, value]) => {
    const nestedName = nestedPath ? `${nestedPath}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      tree = { ...tree, ...flattenJson(value, tree, nestedName) };
    } else {
      tree[nestedName] = value;
    }
  });
  return tree;
}

export function extractDynamicDependencies(dynamicFields: FlowTypes.TemplateRow["_dynamicFields"]) {
  const dynamicDependencies = {};
  const flatFields = flattenJson<FlowTypes.TemplateRowDynamicEvaluator[]>(dynamicFields);
  Object.entries(flatFields).forEach(([key, fields]) => {
    fields.forEach((field) => {
      const deps = dynamicDependencies[field.matchedExpression] || [];
      dynamicDependencies[field.matchedExpression] = [...deps, key];
    });
  });
  return dynamicDependencies;
}
