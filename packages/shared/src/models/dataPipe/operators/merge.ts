import { DataFrame, merge } from "danfojs";
import { DataPipe } from "../pipe";
import { replaceNaN } from "../utils";
import BaseOperator from "./base";

type ILoadedDatalist = any; // datalist

class MergeOperator extends BaseOperator {
  public args: string[];
  constructor(df: DataFrame, args: any, pipe: DataPipe) {
    super(df, args, pipe);
  }
  // load input data list from arg, populate error object if not exist for use in validation step
  parseArg(arg: any): ILoadedDatalist {
    return this.pipe.inputSources[arg] ?? { error: `Data list does not exists: ${arg}` };
  }
  validateArg(datalist: ILoadedDatalist) {
    return datalist.error ?? true;
  }
  /** Loop over merge datalists and perform left-joins (preserve rows from initial data) */
  apply() {
    for (const dataList of this.args) {
      const left = this.df;
      const right = new DataFrame(dataList);
      this.df = merge({ left, right, on: ["id"], how: "left" });
    }
    replaceNaN(this.df, undefined);
    return this.df;
  }
}
export default MergeOperator;
