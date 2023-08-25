import { DataFrame } from "danfojs";
import type { DataPipe } from "../pipe";

type IParsedArg = any;

class BaseOperator {
  public args_list: any[] = [];
  constructor(public df: DataFrame, args_list: string[] = [], public pipe?: DataPipe) {
    this.args_list = args_list.map((a) => this.parseArg(a));
    this.validate();
  }
  parseArg(arg: any): IParsedArg {
    return arg;
  }
  validateArg(arg: any, index: number): Boolean | String {
    return true;
  }
  apply() {
    return this.df;
  }

  // NOTE - method could technically be private however tsc build fails due to
  // https://github.com/microsoft/TypeScript/issues/30355
  validate() {
    const validatedArgs = this.args_list.map((a, i) => ({
      a,
      validation: this.validateArg(a, i),
    }));
    const invalidArgs = validatedArgs.filter((a) => a.validation !== true);
    if (invalidArgs.length > 0) {
      console.error("invalid args\n", invalidArgs);
      throw new Error(`Arg validation error`);
    }
  }
}
export default BaseOperator;
