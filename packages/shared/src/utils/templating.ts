import { parseUntil } from "character-parser";

export interface ITemplatedStringVariable {
  value?: string;
  variables?: { [key: string]: ITemplatedStringVariable };
}

/**
 * Take a string and replace instances of context variables, such as `"hello {@row.name}"`
 * @param value - string to process replacements
 * @param context - json object specifying specific values for replacement
 * E.g. {row:{id:'example_1'}} will replace `{@row.id}_completed` with 'example_1_completed`
 */
export function parseTemplatedString(value: string, context = {}) {
  const extracted = extractTemplatedString({ value });
  const replacements = generateContextReplacements(context);
  const parsed = parseExtractedTemplatedString(extracted, replacements);
  return parsed;
}

/**
 * Similar to code above, except input uses expressions without curly brace syntax
 * @param value - string to process replacements
 * @param context - json object specifying specific values for replacement
 * E.g. {row:{id:'example_1'}} will replace `@row.id` with 'example_1`
 */
export function parseNonTemplatedString(value: string, context = {}) {
  let replaceCount = 0;
  const replacements = generateContextReplacements(context);
  // Check each context prefix for references (e.g. if context has 'row' property search '@row')
  for (const prefix of Object.keys(context)) {
    // full regex searches for prefix with following alpha-numeric characters,
    // or permitted special characters "." ":" "_"
    const regex = new RegExp(`@${prefix}[a-z0-9.:_]+$`, "gi");
    const potentialReplacments = value.matchAll(regex);
    for (const replacement of potentialReplacments) {
      const [expression] = replacement;
      if (replacements.hasOwnProperty(expression)) {
        value = value.replace(expression, replacements[expression]);
        replaceCount++;
      }
    }
  }
  // Second parse to cover any replacements that reference additional context strings
  if (replaceCount > 0) {
    return parseNonTemplatedString(value, context);
  }
  return value;
}

/**
   * Take a string and extract any dynamic text listed within delimiter tags
   * Provides recursive support for deeply nested expressions
   * 
   * @example
   * ```
   * "Hello {@row.first_name}-{@row.last_name}"
   * // Output
   * { 
      "value": "Hello [$1]-[$2]", 
      "variables": { 
        "[1]": { 
          "value": "@row.first_name" 
        }, 
        "[2]": { 
          "value": "@row.last_name" 
        } 
      } 
   * ```
   * @example
   * ```
   * "Hello {@row.{@row.name_field}}"
   * // Output
   * { 
      "value": "Hello [$1]", 
      "variables": { 
        "[1]: { 
          "value": "@row.[$1.1]", 
          "variables": { 
            "[1.1]": { 
              "value": "@row.name_field" 
            } 
          } 
        } 
      } 
   * ```
   */
export function extractTemplatedString(
  data: ITemplatedStringVariable,
  nestedName = ""
): ITemplatedStringVariable {
  let value = data.value;
  let variables = data.variables ?? {};
  const [startDelimiter, endDelimiter] = ["{@", "}"];
  const [varPrefix, varSuffix] = ["[$", "]"];
  // Extract top-level dyanmic values
  const startIndex = value.indexOf(startDelimiter);
  if (startIndex > -1) {
    try {
      const { src } = parseUntil(value, endDelimiter, {
        start: startIndex + 1,
      });
      const variableNumber = Object.keys(variables).length + 1;
      const variableName = `${varPrefix}${nestedName}${variableNumber}${varSuffix}`;
      value = value.replace(`{${src}}`, variableName);
      variables[variableName] = {
        value: src,
      };
      // Run again to extract any sibling values

      const sibling = extractTemplatedString({ value, variables }, nestedName);
      if (sibling) {
        value = sibling.value;
        variables = { ...variables, ...sibling.variables };
      }
    } catch (error) {
      // Likely no closing tag detected
      console.error({ value, variables, nestedName });
      throw error;
    }
  }
  // Extract any recursively nested dynamic values
  if (variables) {
    nestedName += `${Object.keys(variables).length}.`;
    for (const [key, parent] of Object.entries(variables)) {
      const nested = extractTemplatedString({ value: parent.value, variables: {} }, nestedName);
      const { variables: nestedVariables } = nested;
      if (nestedVariables) {
        variables[key] = nested;
      }
    }
  }
  return Object.keys(variables).length === 0 ? { value } : { value, variables };
}

/**
 * Take a json-object representing all context variables and convert into a list of
 * string replacements. It retains each entry as the original variable, but also calculates
 * all possible nested paths for json objects and arrays
 * @example
 * ```
 * generateContextReplacements({
 *  row:{
 *      name:"Bob",
 *      foods:["pizza","salad"]
 *      }
 *  }
 * })
 *
 * // Output
 * {
 *  "@row":{name:"Bob",foods:["pizza","salad"]}
 *  "@row.name":"Bob",
 *  "@row.foods":["pizza","salad"],
 *  "@row.foods.0":"pizza"
 *  ...
 * }
 * ```
 */
export function generateContextReplacements(context = {}, prefix = "", replacements = {}) {
  for (let [key, value] of Object.entries<any>(context)) {
    if (prefix) {
      key = `${prefix}.${key}`;
    } else {
      key = `@${key}`;
    }
    replacements[key] = value;
    // Create nested entries for json objects and arrays (with index keys)
    if (value && typeof value === "object") {
      if (Array.isArray(value)) {
        value = arrayToObject(value);
      }
      replacements = {
        ...replacements,
        ...generateContextReplacements(value, key, {}),
      };
    }
  }
  return replacements;
}

/**
 * @param valueReplacements - additional string replacements to perform on final values
 */
export function parseExtractedTemplatedString(
  data: ITemplatedStringVariable,
  valueReplacements = {}
) {
  let { value, variables } = data;
  if (variables) {
    for (const [key, childData] of Object.entries(variables)) {
      const childValue = parseExtractedTemplatedString(childData, valueReplacements);
      value = value?.replace(key, childValue || key);
    }
  }
  return valueReplacements[value] ?? value;
}

/** Convert an array to a json object keyed by item index */
function arrayToObject(arr: any[]) {
  const arrObj: any = {};
  for (const [index, el] of arr.entries()) {
    arrObj[index] = el;
  }
  return arrObj;
}
