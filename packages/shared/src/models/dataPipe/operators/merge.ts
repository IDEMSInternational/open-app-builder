import { DataFrame, merge, toJSON } from "danfojs";
import { arrayToHashmap } from "../../../utils";
import { DataPipe } from "../pipe";
import { replaceNaN, setIndexColumn } from "../utils";
import BaseOperator from "./base";

type ILoadedDatalist = any; // datalist

/** Merge multiple datalists together, joining columns by id and replacing values where overrides exist **/
class MergeOperator extends BaseOperator {
  public declare args_list: ILoadedDatalist[];
  private indexColumn = "id";
  constructor(df: DataFrame, args_list: string[], pipe: DataPipe) {
    super(df, args_list, pipe);
  }
  // load input data list from arg, populate error object if not exist for use in validation step
  parseArg(arg: string): ILoadedDatalist {
    return this.pipe.inputSources[arg] ?? { error: `Data list does not exists: ${arg}` };
  }
  validateArg(datalist: ILoadedDatalist) {
    return datalist.error ?? true;
  }

  apply() {
    if (this.df.shape[0] === 0) {
      throw new Error("Merge: No data in base dataframe - an input_source must be provided");
    }
    setIndexColumn(this.df, this.indexColumn);
    for (const dataList of this.args_list) {
      this.df = this.replaceUpdatedValues(dataList);
      this.df = this.joinNewColumns(dataList);
    }
    replaceNaN(this.df, undefined);
    return this.df;
  }

  /** Join any new columns from right dataframe into left dataframe by merge key **/
  private joinNewColumns(data: any[]) {
    const left = this.df;
    const joinDf = new DataFrame(data);
    setIndexColumn(joinDf, this.indexColumn);

    // Drop columns from joinDf that already exists in left (except merge key)
    const droppedColumns = joinDf.columns.filter(
      (column) => column !== this.indexColumn && left.columns.includes(column)
    );
    joinDf.drop({ columns: droppedColumns, inplace: true });
    const merged = merge({ left, right: joinDf, on: ["id"], how: "left" });
    setIndexColumn(merged, this.indexColumn);
    return merged;
  }

  /** Replace any values updated from the data in the original dataframe **/
  private replaceUpdatedValues(data: any[]) {
    const replacements = new DataFrame(data);
    setIndexColumn(replacements, this.indexColumn);

    // remove any columns that does not exist in left
    const droppedColumns = replacements.columns.filter(
      (column) => column !== this.indexColumn && !this.df.columns.includes(column)
    );
    replacements.drop({ columns: droppedColumns, inplace: true });
    // remove any rows that does not exist in left
    const droppedIndexes = replacements.index.filter((i) => !this.df.index.includes(i));
    replacements.drop({ index: droppedIndexes, inplace: true });

    // replace all values in left with values from replacements where defined
    const replaceHashmap = arrayToHashmap(toJSON(replacements) as any, this.indexColumn);

    // handle replacement by looping over all rows and replacing values where override defined
    const replaceDf = this.df.apply((row: any[]) => {
      const [id] = row;

      // HACK - apply operator fails to include array entry for any columns where
      // data formatted as nested json, returning data with invalid dimensions (assumed bug).
      // Manually lookup the original row and iterate on that instead of included row
      const index = this.df.index.indexOf(id);
      const rowComplete = this.df.values[index] as any[];

      return rowComplete.map((value, columnIndex) => {
        const columnName = this.df.columns[columnIndex];
        const replaceValue = replaceHashmap[id]?.[columnName];
        if (replaceValue !== undefined && replaceValue !== value) {
          return replaceValue;
        }
        return value;
      });
    });

    return replaceDf as DataFrame;
  }
}
export default MergeOperator;
