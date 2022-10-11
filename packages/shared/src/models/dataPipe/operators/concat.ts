import { DataFrame, concat } from "danfojs";
import type { DataPipe } from "../pipe";
import { setIndexColumn } from "../utils";
import BaseOperator from "./base";

type ILoadedDatalist = any; // datalist

class ConcatOperator extends BaseOperator {
  public args_list: string[];
  private indexColumn = "id";
  constructor(df: DataFrame, args_list: any, pipe: DataPipe) {
    super(df, args_list, pipe);
  }

  // load input data list from arg, populate error object if not exist for use in validation step
  parseArg(arg: any): ILoadedDatalist {
    return this.pipe.inputSources[arg] ?? { error: `Data list does not exists: ${arg}` };
  }

  validateArg(datalist: ILoadedDatalist) {
    return datalist.error ?? true;
  }

  apply() {
    for (const dataList of this.args_list) {
      this.df = this.applyConcat(dataList);
    }
    return this.df;
  }
  private applyConcat(data: any): DataFrame {
    let concatDf = new DataFrame(data);
    // empty dataframes throw error on concat, so just return the other (or existing) dataframe instead
    if (this.df.index.length === 0) return concatDf;
    if (concatDf.index.length === 0) return this.df;
    // ensure indices match for use in duplicate check
    setIndexColumn(this.df, this.indexColumn);
    setIndexColumn(concatDf, this.indexColumn);
    this.checkDuplicateRows(this.df, concatDf);
    this.ensureDfColumnsMatch(this.df, concatDf);
    const concatenatedDf = concat({ dfList: [this.df, concatDf], axis: 0 }) as DataFrame;
    setIndexColumn(concatenatedDf, this.indexColumn);
    return concatenatedDf;
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
  }

  private checkDuplicateRows(df1: DataFrame, df2: DataFrame) {
    const duplicateIndex = df1.index.find((index) => df2.index.includes(index));
    if (duplicateIndex) {
      throw new Error("Multiple entries exist for index: " + duplicateIndex);
    }
  }

  /** Concatenate two identically-shaped data frames */
  private concatDfs(df1: DataFrame, df2: DataFrame) {}
}
export default ConcatOperator;
