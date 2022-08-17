import { DataFrame } from "danfojs";

export class BaseOperator {
  public args: any[];
  public valid: boolean;
  constructor(public df: DataFrame, args: string[]) {
    this.args = this.parseArgs(args);
    this.valid = this.args.every((arg) => this.validateArg(arg) === true);
    if (!this.valid) {
      throw new Error(`args invalid: ${this.valid}`);
    }
  }
  parseArgs(args: any[]) {
    return args;
  }
  validateArg(arg: any) {
    return true;
  }
  apply() {
    return this.df;
  }
}
