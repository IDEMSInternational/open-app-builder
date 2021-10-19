import { format } from "date-fns";
import { FlowTypes } from "../model";

/**
 * Generate a random string of characters in base-36 (a-z and 0-9 characters)
 * @returns uxokjq8co1n
 * Adapted from https://gist.github.com/6174/6062387
 */
export function generateRandomId() {
  return Math.random().toString(36).substring(2);
}

/**
 * generate a string representation of the current datetime in local (unspecified) timezone
 * @returns 2020-12-22T18:15:20
 */
export function generateTimestamp(value?: string | number | Date) {
  const date = value ? new Date(value) : new Date();
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
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

/**
 * Similar as arrayToHashmap, but instead allows duplicate id entries, storing values in an array by hash keyfield
 * @param keyfield any unique field which all array objects contain to use as hash keys (e.g. 'id')
 */
export function arrayToHashmapArray<T>(arr: T[], keyfield: keyof T) {
  const hashmap: { [key: string]: T[] } = {};
  for (const el of arr) {
    if (el.hasOwnProperty(keyfield)) {
      if (!hashmap[el[keyfield as string]]) {
        hashmap[el[keyfield as string]] = [];
      }
      hashmap[el[keyfield as string]].push(el);
    }
  }
  return hashmap;
}

/**
 * Takes an array of arrays and merges into single array
 * @example ```
 * mergeArrayOfArrays([['a','b'],['c','d']])
 * // [ 'a', 'b', 'c', 'd' ]
 * ```
 */
export function mergeArrayOfArrays<T>(arr: T[][]) {
  return [].concat.apply([], arr);
}

/**
 * Take 2 object arrays identified by a given key field, and merge rows together.
 * In case of rows with identical keys, only one will be retained
 *
 * @param primaryRows set of rows given priority in case of conflict
 * @param secondaryRows set of rows to merge into primary
 * @param keyfield key in rows to identify conflicts
 */
export function mergeObjectArrays<T>(
  primaryRows: T[],
  secondaryRows: T[] = [],
  keyfield: keyof T
): T[] {
  const secondaryHash = arrayToHashmap(secondaryRows, keyfield as string);
  primaryRows.forEach((r) => {
    if (r.hasOwnProperty(keyfield)) {
      secondaryHash[r[keyfield as string]] = r;
    }
  });
  return Object.values(secondaryHash);
}

export function randomElementFromArray(arr: any[] = null) {
  try {
    const randomItem = arr[Math.floor(Math.random() * arr.length)];
    return randomItem;
  } catch (error) {
    return null;
  }
}

/**
 * Retrieve a nested property from a json object
 * using a single path string accessor
 * (modified from https://gist.github.com/jasonrhodes/2321581)
 *
 * @returns value if exists, or null otherwise
 *
 * @example
 * const obj = {"a":{"b":{"c":1}}}
 * getNestedProperty(obj,'a.b.c')  // returns 1
 * getNestedProperty(obj,'a.b.c.d')  // returns null
 *
 * @param obj data object to iterate over
 * @param path nested path, such as data.subfield1.deeperfield2
 */
export function getNestedProperty(obj: any, path: string) {
  return path.split(".").reduce((prev, current) => {
    return prev ? prev[current] : null;
  }, obj);
}

export function setNestedProperty<T>(path: string, value: any, obj: T = {} as any) {
  let childKeys = path.split(".");
  const currentKey = childKeys[0];
  if (childKeys.length > 1) {
    const nestedValue = setNestedProperty(childKeys.slice(1).join("."), value);
    obj[currentKey] = { ...obj[currentKey], ...(nestedValue as any) };
  } else {
    obj[currentKey] = value;
  }
  return obj as T;
}

/**
 * Take a string and split into an array based on character separator.
 * Removes additional whitespace and linebreak characters and empty values
 */
export function stringToArray(str: string = "", separator = ";") {
  return (
    str
      .replace(/\r\n/, "")
      .split(separator)
      .map((s) => s.trim())
      // remove empty strings, undefined or null values
      .filter((el) => !!el)
  );
}

export function mapToJson<T = any>(map: Map<string, any>) {
  const json: { [key: string]: T } = {};
  map.forEach((value, key) => (json[key] = value));
  return json;
}

/**
 * Return a specific parameter from the row, as default type
 * (params ending in _list will be arrays, others will be strings)
 * */
export function getParamFromTemplateRow(
  row: FlowTypes.TemplateRow,
  name: string,
  _default: any
): any {
  const params = row.parameter_list || {};
  return params.hasOwnProperty(name) ? params[name] : _default;
}
export function getStringParamFromTemplateRow(
  row: FlowTypes.TemplateRow,
  name: string,
  _default: string
): string {
  const paramValue = getParamFromTemplateRow(row, name, _default) as string;
  return paramValue ? `${paramValue}` : paramValue;
}

/** Return a specific parameter, parsed as a number */
export function getNumberParamFromTemplateRow(
  row: FlowTypes.TemplateRow,
  name: string,
  _default: number
): number {
  return Number(getParamFromTemplateRow(row, name, `${_default}`));
}

/** Return a specific parameter, parsed as a boolean */
export function getBooleanParamFromTemplateRow(
  row: FlowTypes.TemplateRow,
  name: string,
  _default: boolean
): boolean {
  const params = row.parameter_list || {};
  return params.hasOwnProperty(name) ? params[name] === "true" : _default;
}

/**
 * Evaluate a javascript expression in a safe context
 * @param expression string expression, e.g. "!true", "5 - 4"
 * @param thisCtxt variables and methods that will be available in the function's `this.exampleVar` scope
 * @param globalFunctions functions declared here will be bound to the global scope, so can be called directly
 * @throws Error if the expression is not valid within the context
 * */
export function evaluateJSExpression(
  expression: string,
  thisCtxt = {},
  globalFunctions: IFunctionHashmap = {},
  globalConstants: IConstantHashmap = {}
): any {
  const globalConstString = Object.entries(globalConstants)
    .map(
      ([name, value]) =>
        // convert global constants to variable strings, adding quotation marks for string types
        `var ${name} = ${typeof value === "string" ? `'${value}'` : value}`
    )
    .join(";");
  // convert global functions to variable strings. Note, cannot simply parse function.toString() as optimiser
  // strips names and just leaves all as anonymous functions
  const globalString = Object.entries(globalFunctions)
    .map(([name, fn]) => `var ${name} = ${fn}`)
    .join(";");
  const funcString = `"use strict"; ${globalConstString}; ${globalString}; return (${expression});`;
  try {
    const func = new Function(funcString);
    const evaluated = func.apply(thisCtxt);
    return evaluated;
  } catch (error) {
    // console.warn('Could not evaluate expression', { expression, error, thisCtxt, globalFunctions, funcString })
    // still throw error so that calling function can decide how to handle, e.g. attempt string replace
    throw error;
  }
}

/** Generic object containing list of functions */
export type IFunctionHashmap = { [function_name: string]: (...args: any) => any };

/** Generic object containing list of variables. Note - only simple types can be parsed */
export type IConstantHashmap = { [constant_name: string]: string | number | boolean };

/**
 * convert strings containing "TRUE", "true", "FALSE" or "false" to booleans
 * TODO - combine with script util
 */
export function booleanStringToBoolean(val: any) {
  if (typeof val === "string") {
    if (val.match(/^true$/gi)) return true;
    if (val.match(/^false$/gi)) return false;
  }
  return val;
}

/**
 * Convert a string to an integer hashcode (note, may be positive or negative)
 * https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
 * https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
 */
export function stringToIntegerHash(str: string) {
  let hash = 0;
  let i = 0;
  let len = str.length;
  while (i < len) {
    /* eslint-disable no-bitwise */
    hash = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
  }
  return hash;
}
