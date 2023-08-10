import { DataFrame } from "danfojs";
import BaseOperator from "./base";

class SortOperator extends BaseOperator {
  /** Order of fields to prioritise sorting */
  public sortField: string;
  public ascending?: boolean;
  constructor(df: DataFrame, args_list: any) {
    super(df, args_list);
    this.sortField = this.args_list[0];
    this.ascending = this.args_list[1] === "desc" ? false : true;
  }
  validateArg(arg: string, index: number): boolean | string {
    if (index === 0) {
      return typeof arg === "string" || "sort column must be a string";
    }
    if (index === 1) {
      return arg === "desc" || 'supported directions: "desc", "asc" (default)';
    }
  }
  apply() {
    return this.df.sortValues(this.sortField, { ascending: this.ascending });
  }
}

export default SortOperator;
