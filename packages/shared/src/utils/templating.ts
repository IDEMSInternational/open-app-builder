import { parseUntil } from "character-parser";

export interface ITemplatedStringVariable {
  value?: string;
  variables?: { [key: string]: ITemplatedStringVariable };
}

type ITemplatedDataContext = { [prefix: string]: any };

/**
 * Utility class for parsing data containing templated values
 *
 * @param context - json object specifying specific values for replacement
 * E.g. {row:{id:'example_1'}} will replace `@row.id` with 'example_1`
 */
export class TemplatedData {
  /** Value containing templated data, e.g. `"Hello @row.id"` */
  private initialValue: any;

  /** Value returned after parsing templated data, e.g. `"Hello example_1"` */
  public parsedValue: any;

  /** json object containing namespaced values for context replacements
   * ```
   * {row:{id:"example_1"}}
   * ```
   */
  private initialContext: any;
  /**
   * generated list of all namespaced and flattened string replacments as parsed from initial context
   * ```
   * {"@row.id":"example_1"}
   * ```
   * */
  public parsedContext: ITemplatedDataContext;

  /** A list of all variable replacements carried out during parse (for tracking dependencies list) */
  public replacedVariablesList = {};

  constructor(options?: { initialValue?: any; context?: ITemplatedDataContext }) {
    this.updateValue(options?.initialValue ?? "");
    this.updateContext(options?.context ?? {});
  }

  /** Change the initial value whilst keeping existing context same */
  public updateValue(value: any) {
    this.initialValue = value;
    return this;
  }

  /** Change the parsing context and generate new context replacement mapping */
  public updateContext(context: ITemplatedDataContext) {
    this.initialContext = context;
    this.parsedContext = generateContextReplacements(context);
    return this;
  }

  /**
   * Main data conversion method
   * Iterate over data, parse string values and nested objects and arrays recursively
   *
   * TODO - possibly add generic method to track converted data
   * Use list to re-parse in case where parsing creates new templated data
   * Will need means to avoid infinite loops (possibly max parses)
   */
  public parse(value = this.initialValue) {
    this.replacedVariablesList = {};
    const contextKeys = Object.keys(this.initialContext);
    if (value) {
      if (typeof value === "string") {
        // convert strings, with separate passes for expressions containing
        // templated (curly brace) syntax and not
        value = this.parseTemplatedString(value, this.parsedContext);
        value = this.parseNonTemplatedString(value, contextKeys, this.parsedContext);
      }
      // recurssively convert array and json-like objects
      if (typeof value === "object") {
        if (Array.isArray(value)) {
          value = value.map((v) => this.parse(v));
        }
        if (value.constructor === {}.constructor) {
          Object.keys(value).forEach((key) => (value[key] = this.parse(value[key])));
        }
      }
    }
    return value;
  }

  /**
   * Take a string and replace instances of context variables, such as `"hello {@row.name}"`
   */
  private parseTemplatedString(value: string, parsedContext: any) {
    const extracted = extractTemplatedString({ value });
    const parsed = this.parseExtractedTemplatedString(extracted, parsedContext);
    return parsed;
  }

  /**
   * @param parsedContext - additional string replacements to perform on final values
   */
  private parseExtractedTemplatedString(
    data: ITemplatedStringVariable,
    parsedContext: { [key: string]: any }
  ) {
    let { value, variables } = data;
    if (variables) {
      for (const [key, childData] of Object.entries(variables)) {
        const childValue = this.parseExtractedTemplatedString(childData, parsedContext);
        value = value?.replace(key, childValue || key);
      }
    }
    if (parsedContext.hasOwnProperty(value)) {
      this.updateReplacedVariablesList(value, parsedContext[value]);
    }

    return parsedContext[value] ?? value;
  }

  /** Update replaced variables to track all replaced variable dependencies */
  private updateReplacedVariablesList(srcValue: string, replacedValue: string) {
    this.replacedVariablesList[srcValue] = replacedValue;
  }

  /**
   * Similar to code above, except input uses expressions without curly brace syntax
   */
  private parseNonTemplatedString(
    value: string,
    contextPrefixes: string[],
    parsedContext: any
  ): string {
    let parsed = value;
    let replaceCount = 0;
    // Check each context prefix for references (e.g. if context has 'row' property search '@row')
    for (const prefix of contextPrefixes) {
      // full regex searches for prefix with following alpha-numeric characters,
      // or permitted special characters "." ":" "_"
      const regex = new RegExp(`@${prefix}[a-z0-9.:_]+`, "gi");
      const potentialReplacments = parsed.matchAll(regex);
      for (const replacement of potentialReplacments) {
        const [expression] = replacement;
        if (parsedContext.hasOwnProperty(expression)) {
          parsed = parsed.replace(expression, parsedContext[expression]);
          replaceCount++;
        } else {
          // No variable found - likely legacy syntax where @row.id.completed would append '.completed' to row.id
          const legacyReplacement = this.hackHandleLegacyReplacement(expression, parsedContext);
          parsed = parsed.replace(expression, legacyReplacement);
        }
        this.updateReplacedVariablesList(value, parsed);
      }
    }
    // Second parse to cover any replacements that reference additional context strings
    if (replaceCount > 0) {
      return this.parseNonTemplatedString(parsed, contextPrefixes, parsedContext);
    }
    return parsed;
  }

  /**
   * Previously processing a field like `@row.id.sent` would simply append
   * `.sent` onto the parsed row.id (as `.` was not considered a reserved character for names)
   * Now that `.` is used when looking up nested replacements include a manual method to
   * try to replace neareset match where possible
   * E.g. `@row.id.sent.2` will first try match the full expression, then `@row.id.sent`,
   * before finally matching `@row.id` and appending the rest as strings
   */
  private hackHandleLegacyReplacement(value: string, parsedContext: any) {
    let replacement = value;
    const parts = value.split(".");
    for (const i of parts.keys()) {
      const replaceKey = parts.slice(0, i).join(".");
      if (parsedContext.hasOwnProperty(replaceKey)) {
        const replaceValue = parsedContext[replaceKey];
        if (typeof replaceValue === "string") {
          replacement = [replaceValue, ...parts.slice(i)].join(".");
        }
      }
    }
    return replacement;
  }
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
function generateContextReplacements(context = {}, prefix = "", replacements = {}) {
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
