import append_columns from "./appendColumns";
import base from "./base";
import filters from "./filter";
const { filter, filter_any } = filters;

export const OPERATORS = {
  append_columns,
  filter,
  filter_any,
};

export type IOperatorName = keyof typeof OPERATORS;

export type IOperator = base;
