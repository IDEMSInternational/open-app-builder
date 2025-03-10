import { JSEvaluator } from "../jsEvaluator/jsEvaluator";
import { TemplatedData } from "../templatedData/templatedData";
import { isObjectLiteral } from "../../utils/object-utils";
import { addJSDelimiters } from "../../utils/delimiters";

/** Variable context is stored in namespaces, e.g. `{item:{key:'value'},field:{key:'value'}}` */
type IContext = { [nameSpace: string]: { [field: string]: any } };

/**
 * Utility class to allow evaluation of app data that contain a mix of context expressions,
 * JavaScript and static strings. It combines both TemplatedData and jsEvaluator models
 *
 * @example
 * ```
 * const evaluator = new AppDataEvaluator()
 *
 * evaluator.setExecutionContext({
 *  row:{
 *    number_1:1,
 *    number_2:2
 *  }
 * })
 *
 * const expression = `@row.number_1 > @row.number_2 ? '1 is greater' : '2 is greater'`
 * evaluator.evaluate(expression1)
 * // 2 is greater
 * ```
 * */
export class AppDataEvaluator {
  private templatedData = new TemplatedData();
  private jsEvaluator = new JSEvaluator();
  constructor(private context = {}) {
    this.setExecutionContext(context);
  }
  public setExecutionContext(context: IContext) {
    this.context = context;
    this.templatedData.updateContext(context);
  }
  public updateExecutionContext(update: IContext) {
    this.setExecutionContext({ ...this.context, ...update });
  }

  /** Wrapper around templatedData method to list all variables within data **/
  public listContextVariables(data: any, prefixes: string[]) {
    return this.templatedData.listContextVariables(data, prefixes);
  }

  /**
   * Evaluate app expression in two stages
   *  1) Replace any instances of context variables with values
   * e.g. `@row.number_1 > @row.number_2 ? '1 is greater' : '2 is greater'
   * ->   `1 > 2 ? '1 is greater' : '2 is greater'
   *
   * 2) Attempt evaluation in a JS context
   * -> '2 is greater'
   *
   * @param data Input data to evaluated. This can be any data type, including
   * nested objects or arrays. All string entries within will be evaulated
   */
  public evaluate(data: any) {
    if (typeof data === "string") {
      return this.evaluateExpression(data);
    }
    if (Array.isArray(data)) {
      const evaluated = [];
      for (const el of data) {
        evaluated.push(this.evaluate(el));
      }
      return evaluated;
    }
    if (isObjectLiteral(data)) {
      // create a new object to avoid changing initial data
      const evaluated = {};
      for (const [key, value] of Object.entries(data)) {
        evaluated[key] = this.evaluate(value);
      }
      return evaluated;
    }
    return data;
  }

  /**
   * Evaluate app string expression in two stages
   * 1) Attempt to parse as a JavaScript expression
   * Any variables referenced with `@` syntax will be converted to `this.`
   * and evaluated with available context variables
   * @example
   * ```js
   * evaluateExpression(`@row.number_1 > @row.number_2 ? 'bigger' : 'smaller'`)
   * // intermediate interpretation
   * `this.row.number_1 > this.row.number_2 ? 'bigger' : 'smaller'`
   * // output
   * "smaller"
   * ```
   *
   * 2) Perform string replacement of individual variables
   * @example
   * ```js
   * evaluateExpression(`Hello @row.first_name`)
   * ```
   * // output
   * "Hello Ada"
   */
  private evaluateExpression(expression: string) {
    if (this.shouldEvaluateJS(expression)) {
      try {
        const jsDelimited = addJSDelimiters(expression, Object.keys(this.context));
        const evaluated = this.jsEvaluator.evaluate(jsDelimited, this.context);
        return evaluated;
      } catch (error) {
        // Ignore errors as may be intended as templated data (will attempt next)
      }
    }
    // If error or if not evaluated in JS continue as templated data replacement
    const parsed = this.templatedData.parse(expression);
    return parsed;
  }

  private shouldEvaluateJS(expression: string) {
    // HACK - assume any expressions that have been manually delimited are likely
    // intended as string replacements, I.E.
    // JS:       `{@row.name}_suffix` -> this.Ada_suffix -> undefined
    // Template: `{@row.name}_suffix` -> "Ada_suffix"
    for (const prefix of Object.keys(this.context)) {
      if (expression.includes(`{@${prefix}.`)) {
        return false;
      }
    }
    return true;
  }
}
