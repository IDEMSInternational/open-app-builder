import append_columns from "./appendColumns";
import BaseOperator from "./base";
import concat from "./concat";
import filters from "./filter";
const { filter, filter_any } = filters;

export const OPERATORS = {
  append_columns,
  concat,
  filter,
  filter_any,
};

export type IOperatorName = keyof typeof OPERATORS;
export type IBaseOperator = typeof BaseOperator;
