import { parseUntil } from "character-parser";

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
  const regex = /[a-z]{2}_[a-z]{2,3}/gi;
  return regex.test(str);
}

interface ITemplatedStringVariable {
  value?: string;
  variables?: { [key: string]: ITemplatedStringVariable };
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
  value: string,
  variables: ITemplatedStringVariable = {},
  nestedName = ""
) {
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

      const sibling = extractTemplatedString(value, variables, nestedName);
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
      const nested = extractTemplatedString(parent.value, {}, nestedName);
      const { variables: nestedVariables } = nested;
      if (nestedVariables) {
        variables[key] = nested;
      }
    }
  }
  return Object.keys(variables).length === 0 ? { value } : { value, variables };
}
