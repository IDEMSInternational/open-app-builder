import { JSEvaluator } from "../jsEvaluator/jsEvaluator";
import { TemplatedData } from "..";

/**
 * Utility class to allow evaluation of strings that contain a mix of context expressions,
 * JavaScript and static strings
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
  constructor(context = {}) {
    this.evaluator = new JSEvaluator();
    this.setExecutionContext(context);
  }
  setExecutionContext(context: any) {
    this.parser = new TemplatedData({ context });
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
  evaluate(expression: string) {
    const parsed = this.parser.parse(expression);
    try {
      const evaluated = this.evaluator.evaluate(parsed);
      return evaluated;
    } catch (error) {
      return parsed;
    }
  }
}
