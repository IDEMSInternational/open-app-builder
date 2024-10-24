/**
 * Parameter list passed to data_items row
 * TODO - should inherit from Items processor as parameter list is for operators
 * */
export interface IDataItemParameterList {
  /** dynamic expression to filter data by */
  filter?: string;
  /** field to sort by */
  sort?: string;
  /** max number of entries to return */
  limit?: number;

  // parameters without args
  shuffle?: undefined;
  reverse?: undefined;
}
