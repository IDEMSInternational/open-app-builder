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
  public parsedContext: ITemplatedDataContext;

  /** List of all prefixes used in context, e.g `["row"]` */
  private contextPrefixes: string[] = [];

  /** A list of all variable replacements carried out during parse (for tracking dependencies list) */
  public replacedVariablesList: { [key: string]: string } = {};

  constructor(options?: { initialValue?: any; context?: ITemplatedDataContext }) {
    this.updateValue(options?.initialValue ?? "");
    this.updateContext(options?.context ?? {});
  }

  /** Change the initial value whilst keeping existing context same */
  public updateValue(value: any) {
    this.initialValue = value;
    this.replacedVariablesList = {};
    return this;
  }

  /** Change the parsing context and generate new context replacement mapping */
  public updateContext(context: ITemplatedDataContext) {
    this.parsedContext = generateContextReplacements(context);
    this.contextPrefixes = Object.keys(context);

    // Reassign any context replacements that themselves contain another dynamic reference
    // TODO - could make this recursive for deeper refs, but would need to include inf loop check
    Object.entries(this.parsedContext).forEach(([key, value]) => {
      if (typeof value === "string") {
        this.parsedContext[key] = this.parse(value);
      }
    });

    this.replacedVariablesList = {};
    return this;
  }

  /**
   * Main data conversion method
   * Iterate over data, parse string values and nested objects and arrays recursively
   */
  public parse(value = this.initialValue) {
    if (value) {
      if (typeof value === "string") {
        value = this.parseTemplatedString(value, this.parsedContext);
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
   * Extracts variables in 2 stages to account for variables with delimiters and variables without
   * e.g. `hello {@row.name}!` instead of `hello @row.name!`
   */
  private parseTemplatedString(value: string, parsedContext: any) {
    const delimitedVariables = extractDelimitedTemplateString({ value });
    const firstParseValue = this.parseExtractedString(delimitedVariables, parsedContext);
    const nonDelimitedVariables = extractNonDelimitedTemplateString(
      { value: firstParseValue },
      this.contextPrefixes
    );
    const secondParseValue = this.parseExtractedString(nonDelimitedVariables, parsedContext);
    return secondParseValue;
  }

  /**
   * @param parsedContext - additional string replacements to perform on final values
   */
  private parseExtractedString(
    data: ITemplatedStringVariable,
    parsedContext: { [key: string]: any }
  ) {
    let { value, variables } = data;
    const hasChildData = variables ? true : false;
    let parsedValue = value;
    // recursively replace any deeply-nested variable expressions
    if (hasChildData) {
      for (const [key, childData] of Object.entries(variables)) {
        const childValue = this.parseExtractedString(childData, parsedContext);
        parsedValue = parsedValue.replace(key, childValue ?? key);
      }
    }
    // replace main variables
    else {
      let replacedValue = value;
      if (parsedContext.hasOwnProperty(value)) {
        replacedValue = parsedContext[value];
      } else {
        const legacyValue = this.hackHandleLegacyReplacement(value, parsedContext);
        replacedValue = legacyValue;
      }
      if (replacedValue !== value) {
        this.updateReplacedVariablesList(value, replacedValue);
        parsedValue = parsedValue.replace(value, replacedValue);
      }
    }
    return parsedValue;
  }

  /** Update replaced variables to track all replaced variable dependencies */
  private updateReplacedVariablesList(srcValue: string, replacedValue: string) {
    this.replacedVariablesList[srcValue] = replacedValue;
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
function extractDelimitedTemplateString(
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

      const sibling = extractDelimitedTemplateString({ value, variables }, nestedName);
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

/**
 * Similar to code for delimited template string, except no delimiters used to indicate
 * start and end of variable expression so use list of allowed characters instead
 * (e.g. `hello @row.field!` instead of hello {@row.field}!)
 */
function extractNonDelimitedTemplateString(
  data: ITemplatedStringVariable,
  contextPrefixes: string[]
): ITemplatedStringVariable {
  let value = data.value;
  let variables = data.variables ?? {};
  // Check each context prefix for references (e.g. if context has 'row' property search '@row')
  for (const prefix of contextPrefixes) {
    // full regex searches for prefix with following alpha-numeric characters,
    // or permitted special characters "." ":" "_"
    const regex = new RegExp(`@${prefix}[a-z0-9.:_]+`, "gi");
    const potentialReplacments = value.matchAll(regex);
    for (const replacement of potentialReplacments) {
      const [expression] = replacement;
      variables[expression] = {
        value: expression,
      };
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
