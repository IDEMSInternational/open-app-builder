import { Injectable } from "@angular/core";
import { FlowTypes } from "scripts/types";
import { evaluateJSExpression, setNestedProperty } from "src/app/shared/utils";
import { TemplateService } from "./template.service";

interface ILocalVariables {
  [name: string]: any;
}

/** Specific fields that may contain statements requiring evaluation in javascript */
const FIELDS_WITH_JS_EXPRESSIONS: (keyof FlowTypes.TemplateRow)[] = [
  "condition",
  "hidden",
  "parameter_list",
];

@Injectable({ providedIn: "root" })
export class TemplateVariablesService {
  constructor(private templateService: TemplateService) {}

  /**
   * Data populated in PLH fields may contain references to specific helper or lookup functions,
   * such as @local.some_var. We need to check all fields for such references and populate accordingly.
   * References can also refer to calculations requiring evaluation in Javascript, such as <, ==, !true etc.
   *
   * Additionally the references may be themselves nested within arrays, or json objects.
   * This method attempts to handle all such cases
   */
  public evaluatePLHExpression(
    expression: string | number | boolean | any,
    context: {
      localVariables: ILocalVariables;
      template: FlowTypes.Template;
    }
  ) {
    // only strings or objects could contain dynamic values that need evaluation
    let value = expression;
    const { localVariables, template } = context;
    switch (typeof expression) {
      case "string":
        // check for dynamic strings and convert accordingly
        value = this.evaluatePLHString(expression, localVariables, template);
        break;
      case "object":
        // array - evaluate all elements
        if (Array.isArray(expression)) {
          value = expression.map((el) => this.evaluatePLHExpression(el, context));
        }
        // non-null object - evaluate both keys and values
        else if (expression !== null) {
          value = {};
          Object.keys(expression).forEach(
            (k) =>
              (value[this.evaluatePLHExpression(k, context)] = this.evaluatePLHExpression(
                expression[k],
                context
              ))
          );
        }
    }
    return value;
  }

  /**
   * The main method to evaluate expressions
   * These vary in complexity, from single lookups to javascript operations, e.g.
   *
   * @local.somefield.nestedfield.deeperNest
   * hello @local.namefield
   * !@local.somefield
   * @local.somefield + @local.otherfield
   *
   *
   * @param expression
   * @param localVariables
   * @param template
   * @returns
   */
  private evaluatePLHString(
    expression: string,
    localVariables: ILocalVariables,
    template: FlowTypes.Template
  ) {
    // Check if any @keyword references exist. If not assume basic text and return
    const evaluators = this.extractDynamicEvaluators(expression);
    if (!evaluators) {
      return expression;
    }
    let parsedExpression = evaluators[0].fullExpression;
    // main evaluation
    for (let evaluator of evaluators) {
      const { matchedExpression, type, fieldName } = evaluator;
      // evaluate the core @keyword.someVar part
      const { parsedValue } = this.processDynamicEvaluator(evaluator, localVariables, template);
      console.log("parsedValue", parsedValue);
      // replace '@' with 'this.' so we can evaluate as a statement. E.g. @local.someVar => this.local.someVar
      // create a custom context with the correct variables assigned (e.g. this.local = {someVar:'value'}) and evaluate
      const contextExpression = matchedExpression.replace("@", "this.");
      const context = { [type]: { [fieldName]: parsedValue } };
      try {
        const evaluatedExpression = evaluateJSExpression(contextExpression, context);
        console.log("[Evaluated]", { expression, parsedExpression, evaluatedExpression });
        // if we have an array, object, null or undefined no further processing required
        if (typeof evaluatedExpression === "object") {
          return evaluatedExpression;
        }
        // otherwise replace the part of the expression that was matched and evaluated
        parsedExpression = parsedExpression.replace(matchedExpression, evaluatedExpression);
      } catch (error) {
        console.error("failed to evaluate expression", { contextExpression, context });
      }
    }
    // handle case where parsed expression contains reference to another dynamic expression
    const recursiveDynamicExpression = this.extractDynamicEvaluators(parsedExpression);
    if (recursiveDynamicExpression) {
      return this.evaluatePLHString(parsedExpression, localVariables, template);
    }
    // Individual variables such as @local.someVar will have been replaced, but now evaluate the entire statement
    // to also evaluate mathematical operations. e.g.
    // "@local.someVar + 1" => "1 + 1"  => 2
    // "!@local.someBool"   => "!true"  => false
    // NOTE - cases where text and inline variables (e.g. "hello @someVar" => "hello 1") will throw error expecting variables
    // for the text detected, however this is fine as the current evaluation already contains everything we need (@someVar was evaluated previously)
    try {
      const evaluatedExpression = evaluateJSExpression(parsedExpression);
      console.log("[Evaluated]", { expression, parsedExpression, evaluatedExpression });
      return evaluatedExpression;
    } catch (error) {
      return parsedExpression;
    }
  }

  /**
   * Lookup evaluators from statements such as @local.someVar or @data.anotherVar and return the
   * value depending on the required method
   */
  private processDynamicEvaluator(
    evaluator: FlowTypes.TemplateRowDynamicEvaluator,
    localVariables: ILocalVariables,
    template: FlowTypes.Template
  ) {
    let parsedValue: any;
    let parseSuccess = true;
    const { matchedExpression, type, fieldName } = evaluator;
    switch (type) {
      case "local":
        // check local variables set through set_variables / nested_properties
        if (localVariables.hasOwnProperty(fieldName)) {
          parsedValue = localVariables[fieldName]?.value;
        }
        // also check sibling components for name match and return value where set
        else {
          parsedValue = template.rows.find((r) => r.name === fieldName)?.value;
        }
        // TODO - handle case where match found (but still returns undefined)
        if (parsedValue === undefined) {
          console.error("could not parse local variable", { evaluator, localVariables });
          parsedValue = `{{local.${fieldName}}}`;
        }
        break;
      case "field":
        parsedValue = this.templateService.getField(fieldName);
        break;
      case "global":
        parsedValue = this.templateService.getGlobal(fieldName);
        break;
      case "data":
        parsedValue = this.templateService.getDataListByPath(fieldName);
        break;
      default:
        parseSuccess = false;
        console.error("No evaluator for dynamic field:", evaluator.matchedExpression);
        parsedValue = matchedExpression;
    }
    return { parsedValue, parseSuccess };
  }

  public extractDynamicEvaluators(
    fullExpression: string
  ): FlowTypes.TemplateRowDynamicEvaluator[] | null {
    // match fields such as @local.someField
    // deeper nesting will be need to be handled after evaluation as part of JSEvaluation (e.g. @local.somefield.nestedProperty)
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
}
