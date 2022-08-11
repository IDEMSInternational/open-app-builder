import { parseUntil } from "character-parser";

export interface ITemplatedStringVariable {
  value?: string;
  variables?: { [key: string]: ITemplatedStringVariable };
}

/**
 *
 * @param value
 * @param context
 */
export function parseTemplatedString(value: string, context = {}) {
  const extracted = extractTemplatedString({ value });
  const replacements = generateContextReplacements(context);
  const parsed = parseExtractedTemplatedString(extracted, replacements);
  return parsed;
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

/** Convert an array to a json object keyed by item index */
function arrayToObject(arr: any[]) {
  const arrObj: any = {};
  for (const [index, el] of arr.entries()) {
    arrObj[index] = el;
  }
  return arrObj;
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
