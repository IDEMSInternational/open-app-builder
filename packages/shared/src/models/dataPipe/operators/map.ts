import { DataFrame } from "danfojs";
import AppendColumnsOperator from "./appendColumns";

class MapOperator extends AppendColumnsOperator {
  constructor(df: DataFrame, args_list: any) {
    super(df, args_list);
  }
  apply() {
    // append columns using parent operator
    super.apply();
    const droppedColumns = this.df.columns.filter((c) => !this.mappedColumns[c]);
    this.df.drop({ columns: droppedColumns, inplace: true });
    return this.df;
  }
}
export default MapOperator;
