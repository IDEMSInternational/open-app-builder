import { FlowTypes } from "../model";

/**
 * Process each column specified in VARIABLE_FIELDS, to check whether there are any references to
 * dynamic fields, such as @local.someVar. These can appear nested within objects or arrays so requires
 * recursive iteration
 *
 * Store these references in a separate object so they can be evaluated at runtime
 */
export function extractDynamicFields(data: any) {
  let dynamicFields = {};
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
            const nestedDynamic = this.extractDynamicFields(value);
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

export function extractDynamicEvaluators(
  fullExpression: string
): FlowTypes.TemplateRowDynamicEvaluator[] | null {
  // match fields such as @local.someField
  // deeper nesting will be need to be handled after evaluation as part of JSEvaluation
  // (e.g. @local.somefield.nestedProperty or even @local.@local.dynamicNested)
  // group 1: @local, @fields etc.
  // group 2: property of group, e.g. @local.'someVar'
  // group 3: trailing evaluation, e.g. @local.someVar'.nestedvar.length'
  const regex = /@([a-z]+)\.([0-9a-z_]+)([0-9a-z_.]*)/gi;
  let allMatches: FlowTypes.TemplateRowDynamicEvaluator[] = [];
  if (typeof fullExpression === "string") {
    let match: RegExpExecArray;
    // run recursive match for all dynamic expressions
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec#finding_successive_matches
    /* eslint-disable no-cond-assign */
    while ((match = regex.exec(fullExpression)) !== null) {
      const [matchedExpression, type, fieldName] = match as any[];
      allMatches.push({ fullExpression, matchedExpression, type, fieldName });
    }
    // expect the number of match statements to match the total number of @ characters (replace all non-@)
    // provide a warning if this is not the case
    const expectedMatchLength = fullExpression.replace(/[^@]/g, "").length;
    if (allMatches.length !== expectedMatchLength) {
      console.warn(
        `Expected ${expectedMatchLength} dynamic matches but recorded ${allMatches.length}`,
        fullExpression,
        allMatches
      );
    }
  }
  if (allMatches.length > 0) {
    return allMatches;
  }
  return null;
}

function _arrayToObject(arr: any[]) {
  const obj = {};
  arr.forEach((el, i) => (obj[i] = el));
  return obj;
}
