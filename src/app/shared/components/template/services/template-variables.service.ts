import { Injectable } from "@angular/core";
import { FlowTypes } from "scripts/types";
import { evaluateJSExpression, getNestedProperty } from "src/app/shared/utils";
import { TemplateService } from "./template.service";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
const SHOW_DEBUG_LOGS = false;
const log = SHOW_DEBUG_LOGS ? console.log : () => null;
const log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
const log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

/**
 * Most methods in this class depend on factors relating to the execution context
 * (e.g.row, variables etc.). Store as a single object to make it easier to pass between methods
 * @param templateRowMap hashmap containing list of all template rows, keyed by their nested row name
 */
interface IVariableContext {
  templateRowMap: Map<string, FlowTypes.TemplateRow>;
  row: FlowTypes.TemplateRow;
  field?: string;
}

@Injectable({ providedIn: "root" })
export class TemplateVariablesService {
  /**
   *
   *
   * TODO - ideally we should keep namespaced references to all variables, to make them easier
   * to read from child components and quickly evaluate on change
   */
  constructor(private templateService: TemplateService) {}

  /**
   * Data populated in PLH fields may contain references to specific helper or lookup functions,
   * such as @local.some_var. We need to check all fields for such references and populate accordingly.
   * References can also refer to calculations requiring evaluation in Javascript, such as <, ==, !true etc.
   *
   * Additionally the references may be themselves nested within arrays, or json objects.
   * This method attempts to handle all such cases
   *
   * @param omitFields Any fields listed here will not be evaluated alongside any metadata fields (prefix '_')
   * and the "comments" field
   */
  public evaluatePLHData(
    data: string | number | boolean | any,
    context: IVariableContext,
    omitFields: string[] = []
  ) {
    const dynamicFields = context.row._dynamicFields;
    let value = data;
    // If the data is array or json-type object extract individual strings and reprocess
    if (typeof data === "object") {
      // process arrays as json objects and return
      if (Array.isArray(data)) {
        const objData = _arrayToObject(data);
        value = Object.values(this.evaluatePLHData(objData, context));
      }

      // non-null object - set to recursively evaluate
      else if (data !== null) {
        // only evaluate if there are dynamic fields recorded somewhere in the object
        if (dynamicFields) {
          Object.keys(data).forEach((k) => {
            value[k] = data[k];
            // ignore evaluation of meta, comment, and specifiedfields. Could provide single list of approved fields, but as dynamic fields
            // also can be found in parameter lists would likely prove too restrictive
            if (!k.startsWith("_") && !omitFields.includes(k)) {
              // evalute each object element with reference to any dynamic specified for it's index (instead of fieldname)
              const nestedContext = { ...context };
              nestedContext.field = nestedContext.field ? `${nestedContext.field}.${k}` : k;
              const evaluated = this.evaluatePLHData(data[k], nestedContext);
              value[k] = evaluated;
            }
          });
        }
      }
    } else {
      // For all other cases see if a dynamic evaluation statement already exists (e.g. @local.someVar)
      // If yes evaluate and return, if no simply return
      const { field } = context;
      // Check if any @keyword references exist. If not assume basic text and return
      const evaluators = getNestedProperty(
        dynamicFields,
        field
      ) as FlowTypes.TemplateRowDynamicEvaluator[];
      if (evaluators && evaluators.length > 0) {
        value = this.evaluatePLHString(evaluators, context);
        log(`[evaluated] ${evaluators[0].fullExpression}`, value, { evaluators, field, context });
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
    const { templateRowMap } = context;
    switch (type) {
      case "local":
        // TODO - assumed 'value' field will be returned but this could be provided instead as an arg
        const returnField: keyof FlowTypes.TemplateRow = "value";

        // find any rows where nested path corresponds to match path
        let matchedRows: { row: FlowTypes.TemplateRow; nestedName: string }[] = [];
        templateRowMap.forEach((row, nestedName) => {
          if (nestedName === fieldName || nestedName.endsWith(`.${fieldName}`)) {
            matchedRows.push({ row, nestedName });
          }
        });
        // no match found
        if (matchedRows.length === 0) {
          parseSuccess = false;
          console.error(`@local.${fieldName} not found`, {
            evaluator,
            rowMap: mapToJson(templateRowMap),
          });
          // parsedValue = `{{local.${fieldName}}}`;
        }
        // match found - return least nested (in case of duplicates)
        else {
          matchedRows = matchedRows.sort(
            (a, b) => a.nestedName.split(".").length - b.nestedName.split(".").length
          );
          if (matchedRows.length > 1) {
            console.warn(`@local.${fieldName} found multiple`, { matchedRows });
          }
          parsedValue = matchedRows[0].row[returnField];
        }

        break;
      case "field":
        parsedValue = this.templateService.getField(fieldName);
        break;
      case "fields":
        console.warn("@fields is deprecated, please use @field instead");
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

function mapToJson(map: Map<string, any>) {
  const json = {};
  map.forEach((value, key) => (json[key] = value));
  return json;
}
