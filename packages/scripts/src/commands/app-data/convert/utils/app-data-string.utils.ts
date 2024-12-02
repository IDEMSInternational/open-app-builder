import { FlowTypes } from "data-models";
import { setNestedProperty } from "../utils";
import { parseStringValue } from "shared/src/utils";

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
      collection[base] = setNestedProperty(
        nested.join("."),
        parseStringValue(value),
        collection[base]
      );
    } else {
      collection[key] = parseStringValue(value);
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

// Standardise newline characters within a string (i.e. replace "\r\n" (CRLF) with "\n" (LF))
// also replace any remaining \r with \n (https://github.com/IDEMSInternational/open-app-builder/issues/2499)
export function standardiseNewlines(str: string) {
  return str.replace(/\\r\\n/g, "\\n").replace(/\\r/g, "\\n");
}
