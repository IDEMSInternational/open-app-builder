import { Injectable } from "@angular/core";
import { CampaignService } from "src/app/feature/campaign/campaign.service";
import { FlowTypes } from "src/app/shared/model";
import {
  evaluateJSExpression,
  extractDynamicEvaluators,
  getNestedProperty,
  setNestedProperty,
} from "src/app/shared/utils";
import { TemplateService } from "./template.service";
import { CALC_CONTEXT, ICalcContext } from "./template-calc.service";
import { TemplateTranslateService } from "./template-translate.service";

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
  calcContext?: ICalcContext;
}

@Injectable({ providedIn: "root" })
export class TemplateVariablesService {
  /**
   * The template variable service handles the processing and evaluation of dynamic variables, such as
   * @local.some_value or @campaign.my_campaign.
   *
   * TODO - ideally this should be a more general data-lookup/query service, possibly communicating via events
   * to all campaign service or similar to return a response for @campaign or similar
   */
  constructor(
    private templateService: TemplateService,
    private campaignService: CampaignService,
    private templateTranslateService: TemplateTranslateService
  ) {}

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
  public async evaluatePLHData(
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
        const evaluatedObjData = await this.evaluatePLHData(objData, context);
        value = Object.values(evaluatedObjData);
      }

      // non-null object - set to recursively evaluate
      else if (data !== null) {
        // only evaluate if there are dynamic fields recorded somewhere in the object
        if (dynamicFields) {
          for (const k of Object.keys(data)) {
            value[k] = data[k];
            // ignore evaluation of meta, comment, and specifiedfields. Could provide single list of approved fields, but as dynamic fields
            // also can be found in parameter lists would likely prove too restrictive
            if (!k.startsWith("_") && !omitFields.includes(k)) {
              // evalute each object element with reference to any dynamic specified for it's index (instead of fieldname)
              const nestedContext = { ...context };
              nestedContext.field = nestedContext.field ? `${nestedContext.field}.${k}` : k;
              const evaluated = await this.evaluatePLHData(data[k], nestedContext);
              value[k] = evaluated;
            }
          }
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
        value = await this.evaluatePLHString(evaluators, context);
      }
    }
    return value;
  }

  /**
   * The main method to evaluate expressions
   * These vary in complexity, from single lookups to javascript operations and function calls
   * @example
   * `hello @local.some_name`
   * `!@local.some_field`
   * `@local.val_1 - @local.val_2` (in case of numbers perform subtracation)
   * `@local.val_1 - @local.val_2` (in case of text show with dash)
   * `pick_random(@local.some_list)`
   * `Math.max(@local.val_1,@local.val_2)`
   * `@local.some_field.nestedfield.deeperNest`
   * `@local.@local.dynamic_field_selector`
   *
   * In order to evaluate effectively we try to convert everything to be JavaScript-friendly,
   * and evaluate as a function
   */
  private async evaluatePLHString(
    evaluators: FlowTypes.TemplateRowDynamicEvaluator[],
    context: IVariableContext
  ) {
    const fullExpression = evaluators[0].fullExpression;
    log_group(fullExpression);
    // create a base context of variables and functions that will be available when evaluating javascript
    let calcContext = CALC_CONTEXT;

    // evaluate each dynamic expression and store to the 'this' context that will be used to evaluate
    // at the end. E.g. this.fields = { some_value: 4 }. Update the context and full expression
    // (replacing references to @local.some_value with this.local.some_value)
    const parsedEvaluators: FlowTypes.TemplateRowDynamicEvaluator[] = [];
    for (const evaluator of evaluators) {
      const { type, fieldName, matchedExpression } = evaluator;
      context.calcContext = calcContext;

      // process the main lookup, e.g. @local.some_val, @campaign.some_val
      // NOTE - if parse fail an empty string will be returned
      let { parsedValue, parseSuccess } = await this.processDynamicEvaluator(evaluator, context);

      // update context for use in expression evaluation. Don't overwrite calc function
      if (type !== "calc") {
        const { thisCtxt } = calcContext;
        calcContext.thisCtxt = setNestedProperty(`${type}.${fieldName}`, parsedValue, thisCtxt);
      }

      // Updated the expression so that we can use it in JS evaluation later
      const parsedExpression = matchedExpression.replace("@", "this.");

      // The value parsed represents just top level @local.some_value. If the full expression contains
      // nested property (e.g. @local.some_value.nested_prop) extract. Add to list of processed evaluators
      if (parseSuccess && matchedExpression !== `@${type}.${fieldName}`) {
        parsedValue = getNestedProperty({ this: calcContext.thisCtxt }, parsedExpression);
      } else {
      }
      log("parsed", { matchedExpression, parsedValue });
      parsedEvaluators.push({ ...evaluator, parsedExpression, parsedValue });
    }
    log("parsedEvaluators", { parsedEvaluators, thisCtxt: calcContext.thisCtxt });

    // Rough sort so that if one dynamic variable includes another it will be replaced first
    // e.g. Answer is: @calc(Math.min(@local.value_a,@local.value_b) => this.calc(....)
    const sortedEvaluators = parsedEvaluators.sort(
      (a, b) => b.matchedExpression.length - a.matchedExpression.length
    );

    const evaluated = await this.parseContextExpression(context, fullExpression, sortedEvaluators);
    log("[evaluated]", fullExpression, { evaluated, evaluators, context });
    log_groupEnd();
    return evaluated;
  }

  /**
   * Take an expression and evaulate within a custom JavaScript context
   * This is done in 3 ways:
   *
   * 1) Try to evaluate directly. This should work for cases where the full expression is valid
   * javascript, i.e. there is no additional text floating around
   * @example
   * ```
   * Math.round(this.local.some_value * this.local.other_value)
   * ```
   *
   * 2) If fail to evaulate directly, evaluate by replacing individual dynamic variables as strings in
   * the overal expression
   * @example
   * ```
   * The answer is: this.some_value
   * ```
   *
   * 3) Check if either of the newly evaluated expressions are themselves dynamic
   *
   * Known Limitations
   * a) Combined string and calculations.
   * The calculation should be carried out in an intermediate variable.
   * @example
   * ```
   * The answer is: this.some_value + this.other_value
   * ```
   * @param evaluators
   */
  private async parseContextExpression(
    context: IVariableContext,
    fullExpression: string,
    evaluators: FlowTypes.TemplateRowDynamicEvaluator[]
  ) {
    const { calcContext } = context;
    const { thisCtxt, globalFunctions } = calcContext;
    let evaluated: any;
    try {
      // first pass - full evaluation
      // It will fail for cases where string and statement combined (e.g. number is: this.some_value)
      let contextExpression = fullExpression;
      evaluators.forEach((evaluator) => {
        const { matchedExpression, parsedExpression } = evaluator;
        contextExpression = contextExpression.replace(matchedExpression, parsedExpression);
      });
      // line break characters can mess up so handle separately
      // make sure to not map a single line string as this will make the return type always string
      const lines = contextExpression.split("\n");
      evaluated =
        lines.length > 1
          ? lines.map((s) => evaluateJSExpression(s, thisCtxt, globalFunctions)).join("\n")
          : evaluateJSExpression(contextExpression, thisCtxt, globalFunctions);
      log("evaluated (JS)", evaluated);
    } catch (error) {
      // second pass - string replacement methods
      let replacedExpression = fullExpression;
      evaluators.forEach((evaluator) => {
        const { matchedExpression, parsedValue } = evaluator;
        replacedExpression = replacedExpression.replace(matchedExpression, parsedValue);
      });
      evaluated = replacedExpression;
      log("evaluated (string replace)", evaluated);
    }
    // in case the replacement has introduced a new dynamic expression (e.g. @local.@local.some_var => @local.new_var)
    // check for new dynamic evaluators and reprocess
    const dynamicNested = extractDynamicEvaluators(evaluated);
    if (dynamicNested) {
      return this.evaluatePLHString(dynamicNested, context);
    }
    return evaluated;
  }

  /**
   * Lookup evaluators from statements such as @local.someVar or @data.anotherVar and return the
   * value depending on the required method
   */
  private async processDynamicEvaluator(
    evaluator: FlowTypes.TemplateRowDynamicEvaluator,
    context: IVariableContext
  ) {
    let parsedValue: any;
    let parseSuccess = true;
    const { type, fieldName } = evaluator;
    const { templateRowMap, field } = context;
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
        // no match found. If condition assume this is fine, otherwise authoring error
        if (matchedRows.length === 0) {
          if (field === "condition") {
            parsedValue = false;
          } else {
            parseSuccess = false;
            console.error(`@local.${fieldName} not found`, {
              evaluator,
              rowMap: mapToJson(templateRowMap),
            });
          }
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
        // console.warn("To keep consistency with rapidpro, @fields should be used instead of @field");
        parsedValue = this.templateService.getField(fieldName);
        break;
      case "fields":
        parsedValue = this.templateService.getField(fieldName);
        break;
      case "global":
        parsedValue = this.templateService.getGlobal(fieldName);
        break;
      case "data":
        parsedValue = this.templateService.getDataListByPath(fieldName);
        // HACK - make sure data lists are translated (ideally should find way to handle alongside main translations)
        // TODO - review if similar methods required for campaign, global etc.
        Object.keys(parsedValue).forEach((k) => {
          parsedValue[k] = this.templateTranslateService.translateRow(parsedValue[k]);
        });
        break;
      // TODO - ideally campaign lookup should be merged into data list lookup with additional query/params
      // e.g. evaluate conditions, take first etc.
      case "campaign":
        parsedValue = await this.campaignService.getNextCampaignRow(fieldName);
        break;
      case "calc":
        const expression = fieldName.replace(/@/gi, "this.");
        const { thisCtxt, globalFunctions } = context.calcContext;
        log("evaluate calc", { expression, thisCtxt, globalFunctions });
        // TODO - merge string replacements with above methods
        parsedValue = evaluateJSExpression(expression, thisCtxt, globalFunctions);
        break;
      default:
        parseSuccess = false;
        console.error("No evaluator for dynamic field:", evaluator.matchedExpression);
        // By default return an empty string if could not be evaluated successfully
        // NOTE - any value is fine to return EXCEPT a dynamic expression (e.g. same @local.some_var)
        // This will be checked a second time and could cause an infinite loop
        parsedValue = "";
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
