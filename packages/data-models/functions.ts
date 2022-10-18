// import const from app-data directly as typings can sometimes break otherwise
import { getDefaultAppConfig } from "./appConfig";
import { FlowTypes } from "./flowTypes";

/**
 * Regex used to match dynamic strings. Specific keypoints:
 * [`!] include ! or ` first character, e.g. negated condition or backtick escape (will remove later)
 * - allow deeper levels of nesting, e.g. `@data.some_data_list.some_evaluated_property`
 *
 * For deeper understanding of this regex recommend view in https://regexr.com/
 */
const DYNAMIC_STRING_REGEX = /[`!]?@([a-z]+)\.([0-9a-z_]+)([0-9a-z_.]*)/gi;

/**
 * Process each column specified in VARIABLE_FIELDS, to check whether there are any references to
 * dynamic fields, such as @local.someVar. These can appear nested within objects or arrays so requires
 * recursive iteration
 *
 * Store these references in a separate object so they can be evaluated at runtime
 */
export function extractDynamicFields(data: any) {
  let dynamicFields: any = {};
  switch (typeof data) {
    case "object":
      // simply convert array to object to handle in next case
      // ie. ["a","b"] => {0: "a", 1: "b"}
      if (Array.isArray(data)) {
        data = _arrayToObject(data);
      }
      if (data !== null) {
        // data is a json-like object
        Object.entries(data).forEach(([key, value]) => {
          // skip processing some columns (remember these can be nested in other objects like parameter_list)
          if (!["comments", "_dynamicFields"].includes(key)) {
            const nestedDynamic = extractDynamicFields(value);
            if (nestedDynamic) {
              dynamicFields[key] = nestedDynamic;
            }
          }
        });
      }
      break;
    case "string":
      const dynamicEvaluators = extractDynamicEvaluators(data as string);
      if (dynamicEvaluators) {
        return dynamicEvaluators;
      }
  }
  // nested dynamic fields are managed in the row themselves
  if (dynamicFields.hasOwnProperty("rows")) {
    delete dynamicFields["rows"];
  }
  // only return is something has been assigned
  if (Object.keys(dynamicFields).length > 0) {
    return dynamicFields;
  }
}

/**
 * Take a string and extract all text that requires dynamic evaluation in the app,
 * such as `hello @local.some_value` or `calc(Math.min(@local.val_1,@local.val_2))`
 *
 * @param fullExpression
 *
 * TODO - longer term we probably need a better syntax system to distinguish dynamic
 * from static text.
 * e.g. `@local.val_1 - @local.val_2` could represent either subtraction or a string with dash
 */
export function extractDynamicEvaluators(
  fullExpression: string
): FlowTypes.TemplateRowDynamicEvaluator[] | null {
  // match fields such as @local.someField
  // deeper nesting will be need to be handled after evaluation as part of JSEvaluation
  // (e.g. @local.somefield.nestedProperty or even !@local.@local.dynamicNested)
  // group 1: @local, @fields etc.
  // group 2: property of group, e.g. @local.'someVar'
  // group 3: trailing evaluation, e.g. @local.someVar'.nestedvar.length'
  let allMatches: FlowTypes.TemplateRowDynamicEvaluator[] = [];
  if (typeof fullExpression === "string") {
    allMatches = _matchAll(DYNAMIC_STRING_REGEX, fullExpression)
      .map((m) => {
        let [matchedExpression, type, fieldName] = m as any[];
        // if expression ends in period expect this is intended as a text full-stop (not nested property)
        if (matchedExpression.endsWith(".")) matchedExpression = matchedExpression.slice(0, -1);
        // expressions that start with backticks will be displayed without parsing (i.e raw)
        if (matchedExpression.startsWith("`")) {
          type = "raw";
        }
        // cross-check to ensure lookup matches one of the pre-defined dynamic field types (e.g. not email@domain.com)
        if (!getDefaultAppConfig().DYNAMIC_PREFIXES.includes(type)) {
          return undefined;
        }
        return { fullExpression, matchedExpression, type, fieldName };
      })
      .filter((v) => v !== undefined);
    // provide a separate regex for @eval statements as they don't use dot notation
    // i.e @calc(some JS expression) as opposed to @calc.(some expression)
    const regex2 = /!?@(calc)\((.+)\)$/gim;
    allMatches = [
      ...allMatches,
      ..._matchAll(regex2, fullExpression).map((m) => {
        const [matchedExpression, type, fieldName] = m as any[];
        return { fullExpression, matchedExpression, type, fieldName };
      }),
    ];
  }
  if (allMatches.length > 0) {
    return allMatches;
  }
  return null;
}

/**
 * run recursive match for all dynamic expressions
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#finding_successive_matches
 */
function _matchAll(regex: RegExp, fullExpression: string) {
  let allMatches: RegExpExecArray[] = [];
  let match: RegExpExecArray;
  /* eslint-disable no-cond-assign */
  while ((match = regex.exec(fullExpression)) !== null) {
    allMatches.push(match);
  }
  return allMatches;
}

function _arrayToObject(arr: any[]) {
  const obj = {};
  arr.forEach((el, i) => (obj[i] = el));
  return obj;
}
