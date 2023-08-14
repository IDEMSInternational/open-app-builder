import append_columns from "./appendColumns";
import BaseOperator from "./base";
import concat from "./concat";
import filters from "./filter";
const { filter, filter_any } = filters;
import map from "./map";
import merge from "./merge";
import sort from "./sort";

export const OPERATORS = {
  append_columns,
  concat,
  filter,
  filter_any,
  map,
  merge,
  sort,
};

export type IOperatorName = keyof typeof OPERATORS;
export type IBaseOperator = typeof BaseOperator;
