export interface IDataPipeOperation {
  // should manually track names instead of inferring from import to avoid danfo.js import into frontend
  operation: "append_columns" | "concat" | "filter" | "filter_any" | "map" | "merge";
  args_list: any[];
  input_source?: string;
  output_target?: string;
}
