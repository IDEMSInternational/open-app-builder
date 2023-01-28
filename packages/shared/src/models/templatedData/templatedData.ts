import { ITemplatedStringVariable } from "../../types";
import { addStringDelimiters, extractDelimitedTemplateString } from "../../utils";

type ITemplatedDataContext = { [prefix: string]: any };

/**
 * Templated data class contains methods to to convert data containing dynamic context variables
 * in delimited (`Hello {@row.first_name}`) or non-delimited (`Hello @row.first_name`) form to
 * static values based provided context
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
    this.parsedContext = flattenContextReplacementList(context);
    this.contextPrefixes = Object.keys(context);
    // Reassign any context replacements that themselves contain another context reference
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
        value = this.parseTemplatedString(value);
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
   * Will convert non-delimited strings to delimted, extract list of variables and parse
   */
  private parseTemplatedString(value: string) {
    const delimited = addStringDelimiters(value, this.contextPrefixes);
    const extractedData = extractDelimitedTemplateString(
      { value: delimited },
      this.contextPrefixes
    );
    const parsedValue = this.parseExtractedString(extractedData);
    return parsedValue;
  }

  /**
   * @param parsedContext - additional string replacements to perform on final values
   */
  private parseExtractedString(data: ITemplatedStringVariable) {
    let { value, variables } = data;
    const hasChildData = variables ? true : false;
    let parsedValue = value;
    // recursively replace any deeply-nested variable expressions
    if (hasChildData) {
      for (const [key, childData] of Object.entries(variables)) {
        const childValue = this.parseExtractedString(childData);
        parsedValue = parsedValue.replace(key, childValue ?? key);
      }
      // handle case is parsedValue is all a dynamic context variable
      return this.parseExtractedString({ value: parsedValue });
    }
    // replace main variables
    else {
      let replacedValue = value;
      if (this.parsedContext.hasOwnProperty(value)) {
        replacedValue = this.parsedContext[value];
      } else {
        const legacyValue = this.hackHandleLegacyReplacement(value);
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
  private hackHandleLegacyReplacement(value: string) {
    let replacement = value;
    const parts = value.split(".");
    for (const i of parts.keys()) {
      const replaceKey = parts.slice(0, i).join(".");
      if (this.parsedContext.hasOwnProperty(replaceKey)) {
        const replaceValue = this.parsedContext[replaceKey];
        if (typeof replaceValue === "string") {
          replacement = [replaceValue, ...parts.slice(i)].join(".");
        }
      }
    }
    return replacement;
  }
}

/**
 * Take a json-object representing all context variables and convert into a list of
 * string replacements. It retains each entry as the original variable, but also flattens
 * all possible nested paths for json objects and arrays
 * @example
 * ```
 * flattenContextReplacementList({
 *  row:{
 *      name:"Ada",
 *      foods:["pizza","salad"]
 *      }
 *  }
 * })
 *
 * // Output
 * {
 *  "@row":{name:"Ada",foods:["pizza","salad"]}
 *  "@row.name":"Ada",
 *  "@row.foods":["pizza","salad"],
 *  "@row.foods.0":"pizza"
 *  ...
 * }
 * ```
 */
function flattenContextReplacementList(context = {}, prefix = "", replacements = {}) {
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
        ...flattenContextReplacementList(value, key, {}),
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
