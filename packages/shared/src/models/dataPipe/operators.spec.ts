import { IOperator, IOperatorName, OPERATORS } from "./operators";

type ITestArgs = string[];

const testData: { [key in IOperatorName]: ITestArgs } = {
  filter: [],
  append_columns: [],
  filter_any: [],
};

// Test individual string parsing
for (const [name, args] of Object.entries(testData)) {
  const operator: IOperator = OPERATORS[name];
  execTest(name, operator);
}

function execTest(name: string, operator: IOperator) {
  it(name, () => {
    operator;
    // validate
    //
  });
}
