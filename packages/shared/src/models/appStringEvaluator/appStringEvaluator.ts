import { JSEvaluator } from "../jsEvaluator/jsEvaluator";
import { TemplatedData } from "..";
import { isObjectLiteral } from "../../utils/object-utils";

type IContext = { [nameSpace: string]: { [field: string]: any } };

/**
 * Utility class to allow evaluation of strings that contain a mix of context expressions,
 * JavaScript and static strings. It combines both TemplatedData and jsEvaluator models
 *
 * @example
 * ```
 * const evaluator = new AppStringEvaluator()
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
export class AppStringEvaluator {
  private parser: TemplatedData;
  private evaluator: JSEvaluator;
  constructor(private context = {}) {
    this.evaluator = new JSEvaluator();
    this.setExecutionContext(context);
  }
  public setExecutionContext(context: IContext) {
    this.context = context;
    this.parser = new TemplatedData({ context });
  }
  public updateExecutionContext(update: IContext) {
    this.setExecutionContext({ ...this.context, update });
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
  evaluate(data: any) {
    if (typeof data === "string") {
      return this.evaluateString(data);
    }
    if (Array.isArray(data)) {
      return data.map((el) => this.evaluate(el));
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
   * 1) Replace any instances of context variables with values
   * e.g. `@row.number_1 > @row.number_2 ? '1 is greater' : '2 is greater'
   * ->   `1 > 2 ? '1 is greater' : '2 is greater'
   *
   * 2) Attempt evaluation in a JS context
   * -> '2 is greater'
   * @returns
   */
  private evaluateString(expression: string) {
    const parsed = this.parser.parse(expression);
    try {
      const evaluated = this.evaluator.evaluate(parsed);
      return evaluated;
    } catch (error) {
      return parsed;
    }
  }
}
