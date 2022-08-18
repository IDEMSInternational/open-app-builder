import { DataFrame, toJSON } from "danfojs";
import { JSEvaluator } from "../../jsEvaluator/jsEvaluator";
import BaseOperator from "./base";

class FilterOperator extends BaseOperator {
  private filterConditions: string[] = [];
  constructor(df: DataFrame, args: any) {
    super(df, args);
    this.filterConditions = this.args;
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

  private satisfiesFilters(row: any) {
    const evaluator = new JSEvaluator();
    evaluator.setGlobalContext({ constants: row });
    return this.filterConditions.every((condition) => {
      try {
        const result = evaluator.evaluate(condition);
        return result;
      } catch (error) {
        console.error("Filter evaluation failed", { row, condition, error });
        throw error;
      }
    });
  }
}
export default FilterOperator;
