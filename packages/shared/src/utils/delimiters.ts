import { parseUntil } from "character-parser";
import type { ITemplatedStringVariable } from "../types";

/**
 * Take a string with templated expressions and add delimiters to variables if not present
 * @example
 * ```
 * "@row.@row.lookup_variable"
 * // output
 * "{@row.{@row.lookup_variable}}""
 * ```
 * @param value - value to convert, may or may not already contain delimited strings
 * @param contextPrefixes - list of prefixes used in templated strings, e.g. ["row"] for `@row`
 * @param firstPass - internal tracking variable to determine regex to use
 */
export function addStringDelimiters(value: string, contextPrefixes: string[], firstPass = true) {
  for (const prefix of contextPrefixes) {
    // First pass ignores nested statements, adding delimiters only to inner parts e.g.
    // @row.@row.some_value -> @row.{@row.some_value}
    const firstPassRegex = new RegExp(`({?)@${prefix}\.[a-z0-9.:_]+(}?)`, "gi");
    // Second pass includes nested, converting outer parts e.g.
    // @row.{@row.some_value} -> {@row.{@row.some_value}}
    const secondPassRegex = new RegExp(`({?)@${prefix}\.[a-z0-9.:_{}@]+`, "gi");
    const regex = firstPass ? firstPassRegex : secondPassRegex;
    const matches = value.matchAll(regex);
    let replaceCount = 0;
    for (const match of matches) {
      const [expression] = match;
      if (shouldAddDelimiter(expression)) {
        value = insertCharacter(value, "{", match.index! + replaceCount);
        replaceCount++;
        value = insertCharacter(value, "}", match.index! + expression.length + replaceCount);
        replaceCount++;
      }
    }
    if (firstPass) {
      return addStringDelimiters(value, contextPrefixes, false);
    }
  }
  return value;
}

function shouldAddDelimiter(expression: string) {
  const [startDelimiter] = [expression[0]];
  // skip adding delimiters if starts with delimiter and contains an end delimiter within string
  // (may be at end of string or mid-string in case concatenating with regular text)
  if (startDelimiter === "{" && expression.includes("}")) {
    return false;
  }
  return true;
}

/**
* Take a string and extract any dynamic text listed within delimiter tags
* Provides recursive support for deeply nested expressions
* @param contextPrefixes - list of prefixes used in templated strings, e.g. ["row"] for `@row`
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
export function extractDelimitedTemplateString(
  data: ITemplatedStringVariable,
  contextPrefixes: string[],
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

      // now we have matched src like "{@row.some_field}" replace the expression with a
      // variables like `[$1]` if `row` statements are included in prefix list, or `{[$1]}`
      // if not to retain delimited form when evaluated
      const prefix = src.split(".")[0].replace("@", "");
      if (contextPrefixes.includes(prefix)) {
        value = value.replace(`{${src}}`, variableName);
      } else {
        value = value.replace(`${src}`, variableName);
      }
      variables[variableName] = { value: src };

      // Run again to extract any sibling values
      const sibling = extractDelimitedTemplateString(
        { value, variables },
        contextPrefixes,
        nestedName
      );
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
      const nested = extractDelimitedTemplateString(
        { value: parent.value, variables: {} },
        contextPrefixes,
        nestedName
      );
      const { variables: nestedVariables } = nested;
      if (nestedVariables) {
        variables[key] = nested;
      }
    }
  }
  return Object.keys(variables).length === 0 ? { value } : { value, variables };
}

function insertCharacter(str: string, char: string, index: number) {
  return str.slice(0, index) + char + str.slice(index);
}
