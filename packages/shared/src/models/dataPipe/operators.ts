class BaseOperator {
  validateArgs() {
    return true;
  }

  apply() {}
}

class FilterOperator extends BaseOperator {}

class FilterAnyOperator extends BaseOperator {}

class AppendColumnsOperator extends BaseOperator {}

export const OPERATORS = {
  filter: new FilterOperator(),
  append_columns: new AppendColumnsOperator(),
  filter_any: new FilterAnyOperator(),
};

export type IOperatorName = keyof typeof OPERATORS;

export type IOperator = BaseOperator;
