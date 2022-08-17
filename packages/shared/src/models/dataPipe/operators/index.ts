import { BaseOperator } from "./base";
import filter from "./filter";

class FilterAnyOperator extends BaseOperator {}

class AppendColumnsOperator extends BaseOperator {}

export const OPERATORS = {
  filter,
  append_columns: AppendColumnsOperator,
  filter_any: FilterAnyOperator,
};

export type IOperatorName = keyof typeof OPERATORS;

export type IOperator = BaseOperator;
