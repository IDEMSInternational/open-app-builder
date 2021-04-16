import { Injectable } from "@angular/core";
import { FlowTypes } from "scripts/types";
import { evaluateJSExpression, getNestedProperty, setNestedProperty } from "src/app/shared/utils";
import { TemplateService } from "./template.service";

interface ILocalVariables {
  [name: string]: any;
}

/**
 * Most methods in this class depend on factors relating to the execution context
 * (e.g. template, row, localVariables etc.). Store as a single object to make
 * it easier to pass between methods
 */
interface IVariableContext {
  localVariables: ILocalVariables;
  template: FlowTypes.Template;
  row: FlowTypes.TemplateRow;
  field?: string;
}

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
  public evaluatePLHData(
    data: string | number | boolean | any,
    context: IVariableContext,
    omitFields: string[] = []
  ) {
    let value = data;
    // If the data is array or json-type object extract individual strings and reprocess
    if (typeof data === "object") {
      // process arrays as json objects and return
      if (Array.isArray(data)) {
        const objData = _arrayToObject(data);
        value = Object.values(this.evaluatePLHData(objData, context));
      }

      // non-null object - evaluate both keys and values
      else if (data !== null) {
        const dynamicFields = context.row._dynamicFields;
        // only evaluate if there are dynamic fields recorded somewhere in the object
        if (dynamicFields) {
          // console.group(`[evaluate] ${data.value || ""}`, { data, dynamicFields });
          Object.keys(data).forEach((k) => {
            value[k] = data[k];
            // ignore evaluation of meta fields. Could provide single list of approved fields, but as dynamic fields
            // also can be found in parameter lists would likely prove too restrictive
            if (!k.startsWith("_") && !omitFields.includes(k)) {
              // evalute each object element with reference to any dynamic specified for it's index (instead of fieldname)
              const nestedContext = { ...context };
              nestedContext.field = nestedContext.field ? `${nestedContext.field}.${k}` : k;
              value[k] = this.evaluatePLHData(data[k], nestedContext);
            }
          });
          // console.groupEnd();
        }
      }
    } else {
      // For all other cases see if a dynamic evaluation statement already exists (e.g. @local.someVar)
      // If yes evaluate and return, if no simply return
      const { row, field } = context;
      // Check if any @keyword references exist. If not assume basic text and return
      const evaluators = getNestedProperty(
        row._dynamicFields,
        field
      ) as FlowTypes.TemplateRowDynamicEvaluator[];
      if (evaluators) {
        value = this.evaluatePLHString(evaluators, context);
        // console.log("[evaluated]", { value, evaluators, field, context });
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
    evaluators: FlowTypes.TemplateRowDynamicEvaluator[],
    context: IVariableContext
  ) {
    let parsedExpression = evaluators[0].fullExpression;
    // main evaluation
    for (let evaluator of evaluators) {
      const { matchedExpression, type, fieldName } = evaluator;
      // evaluate the core @keyword.someVar part
      const { parsedValue } = this.processDynamicEvaluator(evaluator, context);
      // replace '@' with 'this.' so we can evaluate as a statement. E.g. @local.someVar => this.local.someVar
      // create a custom context with the correct variables assigned (e.g. this.local = {someVar:'value'}) and evaluate
      const contextExpression = matchedExpression.replace("@", "this.");
      const evalContext = { [type]: { [fieldName]: parsedValue } };
      try {
        const evaluatedExpression = evaluateJSExpression(contextExpression, evalContext);
        // console.log("[Evaluated]", { expression, parsedExpression, evaluatedExpression });
        // if we have an array, object, null or undefined no further processing required
        if (typeof evaluatedExpression === "object") {
          return evaluatedExpression;
        }
        // otherwise replace the part of the expression that was matched and evaluated
        parsedExpression = parsedExpression.replace(matchedExpression, evaluatedExpression);
      } catch (error) {
        console.error("failed to evaluate expression", { contextExpression, evalContext });
      }
    }

    // Individual variables such as @local.someVar will have been replaced, but now evaluate the entire statement
    // to also evaluate mathematical operations. e.g.
    // "@local.someVar + 1" => "1 + 1"  => 2
    // "!@local.someBool"   => "!true"  => false
    // NOTE - cases where text and inline variables (e.g. "hello @someVar" => "hello 1") will throw error expecting variables
    // for the text detected, however this is fine as the current evaluation already contains everything we need (@someVar was evaluated previously)
    try {
      const evaluatedExpression = evaluateJSExpression(parsedExpression);
      // console.log("[Evaluated]", { expression, parsedExpression, evaluatedExpression });
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
    context: IVariableContext
  ) {
    let parsedValue: any;
    let parseSuccess = true;
    const { matchedExpression, type, fieldName } = evaluator;
    const { localVariables, template } = context;
    switch (type) {
      case "local":
        // check local variables set through set_variables / nested_properties
        if (localVariables.hasOwnProperty(fieldName)) {
          parsedValue = localVariables[fieldName]?.value;
        }
        // also check sibling components for name match and return value where set
        else {
          const siblingRow = template.rows.find((r) => r.name === fieldName);
          if (siblingRow) {
            parsedValue = siblingRow.value;
          } else {
            console.error(`[Local] - @local.${fieldName} not found`, {
              evaluator,
              localVariables,
            });
            parsedValue = `{{local.${fieldName}}}`;
          }
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
}

function _arrayToObject(arr: any[]) {
  const obj = {};
  arr.forEach((el, i) => (obj[i] = el));
  return obj;
}
