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

interface ITemplateVariables {
  value?: string;
  variables?: { [key: string]: ITemplateVariables };
}
/**
 * Take a string and extract any dynamic text listed within template tags
 * @example
 * ```
 * "Hello {@row.first_name}-{@row.last_name}"
 * // Output
 * { 
    "value": "Hello %1-%2", 
    "variables": { 
      "%1": { 
        "value": "@row.first_name" 
      }, 
      "%2": { 
        "value": "@row.last_name" 
      } 
    } 
 * ```
 * @example
 * ```
 * "Hello {@row.{@row.name_field}}"
 * // Output
 * { 
    "value": "Hello %1", 
    "variables": { 
      "%1": { 
        "value": "@row.%1", 
        "variables": { 
          "%1": { 
            "value": "@row.name_field" 
          } 
        } 
      } 
    } 
 * ```
 */
export function extractTemplateTags(value: string, variables?: ITemplateVariables) {
  // Extract top-level dyanmic values
  const startIndex = value.indexOf("{");
  if (startIndex > -1) {
    try {
      const { src } = parseUntil(value, "}", {
        start: startIndex + 1,
      });
      if (!variables) {
        variables = {};
      }
      const variableName = `%${Object.keys(variables).length + 1}`;
      value = value.replace(`{${src}}`, variableName);
      variables[variableName] = {
        value: src,
      };
      // Run again to extract any sibling values

      const sibling = extractTemplateTags(value, variables);
      if (sibling) {
        value = sibling.value;
        variables = { ...variables, ...sibling.variables };
      }
    } catch (error) {
      console.error({ error, ctx: this });
    }
  }
  // Extract any recursively nested dynamic values
  if (variables) {
    for (const [key, parent] of Object.entries(variables)) {
      const nested = extractTemplateTags(parent.value);
      const { variables: nestedVariables } = nested;
      if (nestedVariables) {
        variables[key] = nested;
      }
    }
  }
  return { value, variables };
}
