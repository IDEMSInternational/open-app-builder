import { DataFrame, toJSON } from "danfojs";
import { JSEvaluator } from "../../jsEvaluator/jsEvaluator";
import BaseOperator from "./base";

class FilterOperator extends BaseOperator {
  public filterConditions: string[] = [];
  constructor(df: DataFrame, args_list: any) {
    super(df, args_list);
    this.filterConditions = this.args_list;
  }
  // args are simply evaluated as JS statements and do not require additional parsing
  parseArg(arg: string) {
    return arg;
  }
  validateArg(arg: string): boolean {
    return typeof arg === "string";
  }
  apply() {
    const rows = toJSON(this.df) as any[];
    const filtered = rows.filter((r) => this.satisfiesFilters(r));
    return new DataFrame(filtered);
  }

  public satisfiesFilters(row: any) {
    const evaluator = new JSEvaluator();
    return this.filterConditions.every((condition) => {
      evaluator.setGlobalContext({ constants: this.generateEvaluatorConstants(condition, row) });
      try {
        /**
         * row fields can be accessed both from global and local context, e.g.
         * `id === 'some_id' and `this.id === 'some_id'`. This is to enable access to
         * nested data objects which are stringified global context
         */
        const result = evaluator.evaluate(condition, row);
        return result;
      } catch (error) {
        console.error("Filter evaluation failed", { row, condition, error });
        throw error;
      }
    });
  }

  /**
   * Create a list of all key-value pairs of row data whose keys appear within condition string
   * This reduces the complexity of later JS evaluation
   **/
  private generateEvaluatorConstants(condition: string, row: Record<string, any>) {
    const constants: Record<string, any> = {};
    for (const [key, value] of Object.entries(row)) {
      if (condition.includes(key)) {
        constants[key] = value;
      }
    }
    return constants;
  }
}

class FilterAnyOperator extends FilterOperator {
  public satisfiesFilters(row: any) {
    const evaluator = new JSEvaluator();
    evaluator.setGlobalContext({ constants: row });
    return (
      this.filterConditions.find((condition) => {
        try {
          const result = evaluator.evaluate(condition, row);
          return result;
        } catch (error) {
          console.error("Filter evaluation failed", { row, condition, error });
          throw error;
        }
      }) !== undefined
    );
  }
}

export default { filter: FilterOperator, filter_any: FilterAnyOperator };
