import { DataFrame } from "danfojs";
import type { DataPipe } from "../pipe";

type IParsedArg = any;

class BaseOperator {
  public args: any[];
  constructor(public df: DataFrame, args: string[], public pipe?: DataPipe) {
    this.args = args.map((a) => this.parseArg(a));
    this.validate();
  }
  parseArg(arg: any): IParsedArg {
    return arg;
  }
  validateArg(arg: any): Boolean | String {
    return true;
  }
  apply() {
    return this.df;
  }

  private validate() {
    const validatedArgs = this.args.map((a) => ({ ...a, validation: this.validateArg(a) }));
    const invalidArgs = validatedArgs.filter((a) => a.validation !== true);
    if (invalidArgs.length > 0) {
      console.error(invalidArgs);
      throw new Error(`Arg validation error`);
    }
  }
}
export default BaseOperator;
