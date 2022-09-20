import { DataFrame, concat, toJSON, Series } from "danfojs";
import type { DataPipe } from "../pipe";
import BaseOperator from "./base";

type ILoadedDatalist = any; // datalist

class ConcatOperator extends BaseOperator {
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

  apply() {
    for (const dataList of this.args) {
      const { df1, df2 } = this.ensureDfColumnsMatch(this.df.copy(), new DataFrame(dataList));
      this.df = this.concatDfs(df1, df2);
    }
    return this.df;
  }

  /**
   * Take two dataframes and compare columns. Where a column appears in one dataframe
   * and not the other create it with undefined values across all rows
   */
  private ensureDfColumnsMatch(df1: DataFrame, df2: DataFrame) {
    const [df1RowCount] = df1.shape;
    const [df2RowCount] = df2.shape;
    for (const column of df2.columns) {
      if (!df1.columns.includes(column)) {
        df1.addColumn(column, new Array(df1RowCount).fill(undefined), {
          inplace: true,
        });
      }
    }
    for (const column of df1.columns) {
      if (!df2.columns.includes(column)) {
        df2.addColumn(column, new Array(df2RowCount).fill(undefined), {
          inplace: true,
        });
      }
    }
    return { df1, df2 };
  }

  /** Concatenate two identically-shaped data frames */
  private concatDfs(df1: DataFrame, df2: DataFrame) {
    const [df1RowCount] = df1.shape;
    const [df2RowCount] = df2.shape;
    // error thrown when concatenating empty dataframe, so just return non-empty instead
    if (df1RowCount === 0) return df2;
    if (df2RowCount === 0) return df1;
    return concat({ dfList: [df1, df2], axis: 0 }) as DataFrame;
  }
}
export default ConcatOperator;
