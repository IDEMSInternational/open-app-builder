import append_columns from "./appendColumns";
import base from "./base";
import filter from "./filter";

export const OPERATORS = {
  append_columns,
  filter,
};

export type IOperatorName = keyof typeof OPERATORS;

export type IOperator = base;
