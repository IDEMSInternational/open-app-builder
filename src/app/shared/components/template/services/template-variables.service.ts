import { Injectable } from "@angular/core";
import { CampaignService } from "src/app/feature/campaign/campaign.service";
import { FlowTypes } from "src/app/shared/model";
import { evaluateJSExpression, getNestedProperty, setNestedProperty } from "src/app/shared/utils";
import { ICalcContext, TemplateCalcService } from "./template-calc.service";
import { TemplateTranslateService } from "./template-translate.service";
import { extractDynamicEvaluators } from "data-models";
import { TemplateFieldService } from "./template-field.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { isObjectLiteral } from "packages/shared/src/utils/object-utils";

/** Logging Toggle - rewrite default functions to enable or disable inline logs */
const SHOW_DEBUG_LOGS = false;
const log = SHOW_DEBUG_LOGS ? console.log : () => null;
const log_group = SHOW_DEBUG_LOGS ? console.group : () => null;
const log_groupEnd = SHOW_DEBUG_LOGS ? console.groupEnd : () => null;

const { TEMPLATE_ROW_ITEM_METADATA_FIELDS } = FlowTypes;

/**
 * Most methods in this class depend on factors relating to the execution context
 * (e.g.row, variables etc.). Store as a single object to make it easier to pass between methods
 * @param templateRowMap hashmap containing list of all template rows, keyed by their nested row name
 */

@Injectable({ providedIn: "root" })
export class TemplateVariablesService extends AsyncServiceBase {
  /**
   * The template variable service handles the processing and evaluation of dynamic variables, such as
   * @local.some_value or @campaign.my_campaign.
   *
   * TODO - ideally this should be a more general data-lookup/query service, possibly communicating via events
   * to all campaign service or similar to return a response for @campaign or similar
   */
  constructor(
    private templateFieldService: TemplateFieldService,
    private campaignService: CampaignService,
    private templateTranslateService: TemplateTranslateService,
    private templateCalcService: TemplateCalcService,
    private appDataService: AppDataService
  ) {
    super("TemplateVariables");
    this.registerInitFunction(this.initialise);
  }

  private async initialise() {
    await this.ensureAsyncServicesReady([
      this.templateFieldService,
      // this.campaignService, // checked during method call to avoid circular init
      this.templateTranslateService,
      this.templateCalcService,
    ]);
    this.ensureSyncServicesReady([this.appDataService]);
  }

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
    context: FlowTypes.TemplateRowEvalContext,
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
          for (let k of Object.keys(data)) {
            // HACK - replace any dynamic keys and re-evaluate
            // TODO - should ideally be easier to identify within existing dynamicFields system
            if (k.startsWith("@")) {
              const keyDynamicEvaluators = extractDynamicEvaluators(k);
              const evaluatedKey = await this.evaluatePLHString(keyDynamicEvaluators, context);
              // Allow a dynamic lookup to populate full object data (e.g. parameter_list: @data.lookup_row.parameter_list)
              if (isObjectLiteral(evaluatedKey)) {
                data = evaluatedKey as any;
              }
              // Default replace the object key with evaluated
              else {
                data[evaluatedKey] = data[k];
                delete data[k];
              }
              return this.evaluatePLHData({ ...data }, context, omitFields);
            }
            value[k] = data[k];
            if (this.shouldEvaluateField(k as any, omitFields)) {
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
   * Ignore evaluation of meta, comment, and specifiedfields.
   * Could provide single list of approved fields, but as dynamic fields also can be found in parameter lists
   * would likely prove too restrictive
   **/
  private shouldEvaluateField(
    fieldName: keyof FlowTypes.TemplateRow | keyof FlowTypes.TemplateRowItemEvalContextMetadata,
    omitFields: string[] = []
  ) {
    if (omitFields.includes(fieldName)) return false;

    // Evaluate fields that are names of item metadata fields, e.g. "_index", "_id",
    // E.g. for use in actions such as `click | set_item | _index: @item._index + 1, completed:false`
    if (TEMPLATE_ROW_ITEM_METADATA_FIELDS.includes(fieldName as any)) return true;
    if (fieldName.startsWith("_")) return false;
    return true;
  }

  /** Evaluate a dynamic expression that has not been pre-processed or evaluated for dynamic expressions */
  public async evaluateConditionString(conditionString: string) {
    const dynamicEvaluators = extractDynamicEvaluators(conditionString);
    if (dynamicEvaluators) {
      // Assumes that no specific row information available (@local undefined)
      const context: FlowTypes.TemplateRowEvalContext = {};
      return this.evaluatePLHString(dynamicEvaluators, context);
    }
    return conditionString;
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
    context: FlowTypes.TemplateRowEvalContext
  ) {
    const fullExpression = evaluators[0].fullExpression;
    log_group(fullExpression);
    // create a base context of variables and functions that will be available when evaluating javascript
    let calcContext = this.templateCalcService.getCalcContext();

    // evaluate each dynamic expression and store to the 'this' context that will be used to evaluate
    // at the end. E.g. this.fields = { some_value: 4 }. Update the context and full expression
    // (replacing references to @local.some_value with this.local.some_value)
    const parsedEvaluators: FlowTypes.TemplateRowDynamicEvaluator[] = [];
    for (const evaluator of evaluators) {
      const { type, fieldName, matchedExpression } = evaluator;
      context.calc = calcContext;

      // If a raw evaluator exists for any part of expression, return full expression unparsed
      // e.g. "Example syntax is `@field.my_name`" -> "Example syntax is @field.my_name"
      if (type === "raw") {
        return evaluator.fullExpression.replace(/`/gi, "");
      }

      // If the appropriate context is not available, do not evaluate that particular evaluator
      // NOTE - this will mean compound expressions will need to be evaluated later
      // E.g. @item.some_field === @local.other_field -> this.item.id === "local value", which needs further evaluation
      if (type === "item" && !context.item) {
        return this.hackProcessItemEvaluators(evaluators, context);
      }

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
   * If an item contains dynamic parameter list then the template-variable service simply skips evaluation
   * as it is unaware of the item context.
   * e.g `filter: @item.id === @local.some_field`
   *
   * Template row evaluators do not have the item context and so only evaluate the local context,
   * and the partial evaluation leaves `@item.id=== some_value` (without string quotation)
   *
   * This method reprocesses the original parameter list, retaining item references and quoting string values
   * e.g. `filter: this.item.id === "local value"`
   */
  private async hackProcessItemEvaluators(
    evaluators: FlowTypes.TemplateRowDynamicEvaluator[],
    context: FlowTypes.TemplateRowEvalContext
  ) {
    let expression = evaluators[0].fullExpression;
    for (const evaluator of evaluators) {
      let parsedValue = evaluator.matchedExpression;
      // replace @item.some_field with this.some_field in preparation for item JS processor
      if (evaluator.type === "item") {
        parsedValue = parsedValue.replace("@", "this.");
      }
      // replace all other dynamic references in the same way as the template variable service
      if (evaluator.type !== "item") {
        const evaluated = await this.processDynamicEvaluator(evaluator, context);
        parsedValue = evaluated.parsedValue;
        if (typeof parsedValue === "string") {
          parsedValue = `"${parsedValue}"`;
        }
      }
      expression = expression.replace(evaluator.matchedExpression, parsedValue);
    }
    return expression;
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
    context: FlowTypes.TemplateRowEvalContext,
    fullExpression: string,
    evaluators: FlowTypes.TemplateRowDynamicEvaluator[]
  ) {
    const { thisCtxt, globalFunctions, globalConstants } = context.calc as ICalcContext;
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
          ? lines
              .map((s) => evaluateJSExpression(s, thisCtxt, globalFunctions, globalConstants))
              .join("\n")
          : evaluateJSExpression(contextExpression, thisCtxt, globalFunctions, globalConstants);
      log("evaluated (JS)", evaluated);
    } catch (error) {
      // second pass - string replacement methods
      let replacedExpression = fullExpression;
      evaluators.forEach((evaluator) => {
        const { matchedExpression, parsedValue } = evaluator;
        replacedExpression = replacedExpression.replace(matchedExpression, parsedValue);
      });
      evaluated = replacedExpression;
      log("fail to evaluate as JS", { error, fullExpression });
      log("evaluated (string replace)", evaluated, error);
    }
    // in case the replacement has introduced a new dynamic expression (e.g. @local.@local.some_var => @local.new_var)
    // check for new dynamic evaluators and reprocess
    const dynamicNested = extractDynamicEvaluators(evaluated);
    if (dynamicNested) {
      // avoid infinite loop in cases such as items where the raw value is retained
      const isOriginal = dynamicNested.every(
        (nestedEvaluators, i) =>
          nestedEvaluators.matchedExpression === evaluators[i]?.matchedExpression
      );
      if (!isOriginal) {
        return this.evaluatePLHString(dynamicNested, context);
      }
    }
    return evaluated;
  }

  /**
   * Lookup evaluators from statements such as @local.someVar or @data.anotherVar and return the
   * value depending on the required method
   */
  private async processDynamicEvaluator(
    evaluator: FlowTypes.TemplateRowDynamicEvaluator,
    context: FlowTypes.TemplateRowEvalContext
  ) {
    let parsedValue: any;
    let parseSuccess = true;
    const { type, fieldName } = evaluator;
    const { local = {}, field } = context;
    switch (type) {
      case "local":
        // find any rows where nested path corresponds to match path
        let matchedValues: { value: FlowTypes.TemplateRow["value"]; nestedName: string }[] = [];
        Object.entries(local).forEach(([nestedName, value]) => {
          if (nestedName === fieldName || nestedName.endsWith(`.${fieldName}`)) {
            matchedValues.push({ nestedName, value });
          }
        });
        // no match found. If condition assume this is fine, otherwise authoring error
        if (matchedValues.length === 0) {
          if (field === "condition") {
            parsedValue = false;
          } else {
            parseSuccess = false;
            console.error(`@local.${fieldName} not found`, {
              evaluator,
              rowMap: local,
            });
          }
        }
        // match found - return least nested (in case of duplicates)
        else {
          matchedValues = matchedValues.sort(
            (a, b) => a.nestedName.split(".").length - b.nestedName.split(".").length
          );
          if (matchedValues.length > 1) {
            console.warn(`@local.${fieldName} found multiple`, { matchedValues });
          }
          parsedValue = matchedValues[0].value;
        }

        break;
      case "field":
        // console.warn("To keep consistency with rapidpro, @fields should be used instead of @field");
        parsedValue = this.templateFieldService.getField(fieldName);
        break;
      case "fields":
        parsedValue = this.templateFieldService.getField(fieldName);
        break;
      case "global":
        parsedValue = this.templateFieldService.getGlobal(fieldName);
        break;
      case "data":
        const [flow_name, nested_path] = fieldName.split(".");
        const sheet = await this.appDataService.getSheet("data_list", flow_name);
        if (sheet) {
          parsedValue = sheet.rowsHashmap;
          if (nested_path) {
            parsedValue = getNestedProperty(sheet.rowsHashmap, nested_path);
          }
        } else {
          // if sheet not found return as empty object
          parsedValue = {};
        }
        break;
      // TODO - ideally campaign lookup should be merged into data list lookup with additional query/params
      // e.g. evaluate conditions, take first etc.
      case "campaign":
        await this.campaignService.ready();
        parsedValue = (await this.campaignService.getNextCampaignRows(fieldName))?.[0];
        break;
      case "calc":
        const expression = fieldName.replace(/@/gi, "this.");
        const { thisCtxt, globalFunctions, globalConstants } = context.calc as ICalcContext;
        log("evaluate calc", { expression, thisCtxt, globalFunctions });
        // TODO - merge string replacements with above methods
        parsedValue = evaluateJSExpression(expression, thisCtxt, globalFunctions, globalConstants);
        break;
      case "item":
        // only attempt to evaluate items if context passed, otherwise leave as original unparsed string
        if (context?.item) {
          parsedValue = context.item[fieldName];
        } else {
          parsedValue = evaluator.matchedExpression;
        }
        break;
      default:
        parseSuccess = false;
        console.error("No evaluator for dynamic field:", evaluator.matchedExpression);
        // By default return an empty string if could not be evaluated successfully
        // NOTE - any value is fine to return EXCEPT a dynamic expression (e.g. same @local.some_var)
        // This will be checked a second time and could cause an infinite loop
        parsedValue = "";
    }
    const translatedValue = this.ensureValueTranslated(parsedValue);
    return { parsedValue: translatedValue, parseSuccess };
  }

  /**
   * HACK - make sure objects (e.g. campaign, global, data_lists) are translated
   * (ideally should find way to handle alongside main translations)
   * TODO - could also merge with standalone global method
   */
  private ensureValueTranslated(value: any) {
    // If translatable value should be an object with _translations property
    // TODO - check if case needs to be added to translate arrays
    if (isObjectLiteral(value)) {
      if (value.hasOwnProperty("_translations")) {
        value = this.templateTranslateService.translateRow(value);
      } else {
        // Check in case object with nested translations (e.g. data list)
        Object.keys(value).forEach((k) => {
          value[k] = this.ensureValueTranslated(value[k]);
        });
      }
    }
    return value;
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
