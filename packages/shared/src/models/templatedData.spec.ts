import { TemplatedData } from "./templatedData";

interface ITestData {
  input: any; // Source data for evaluation
  output: any; // Expected end parsed data
}

/** This context is applied to all tests. Input will be processed for subsitition into output */
const context = {
  input: {
    row: {
      first_name: "Alice",
      last_name: "Smith",
      firstname_lookup_field: "first_name",
      Alice_Smith: "Alice_Smith Lookup Row",
      full_name: "@row.first_name @row.last_name",
    },
  },
  output: {
    "@row": {
      first_name: "Alice",
      last_name: "Smith",
      firstname_lookup_field: "first_name",
      Alice_Smith: "Alice_Smith Lookup Row",
      full_name: "@row.first_name @row.last_name",
    },
    "@row.first_name": "Alice",
    "@row.last_name": "Smith",
    "@row.firstname_lookup_field": "first_name",
    "@row.Alice_Smith": "Alice_Smith Lookup Row",
    "@row.full_name": "Alice Smith", // evaluated recursive context
  },
};

/**
 * Each set of inputs will be evaluated to see if they match the output when parsed
 * An intermediate value exists for debugging purposes (output of extraction process)
 */
const tests: ITestData[] = [
  // Basic delimited
  {
    input: "Hello {@row.first_name}-{@row.last_name}",
    output: "Hello Alice-Smith",
  },
  // Mixed contexts
  { input: "@local.@row.first_name", output: "@local.Alice" },
  // Recursive lookup
  {
    input: "{@row.{@row.firstname_lookup_field}}",
    output: "Alice",
  },
  // Recursive lookup with concatenation
  {
    input: "{@row.{@row.first_name}_{@row.last_name}}",
    output: "Alice_Smith Lookup Row",
  },
  // Text with curly braces but no templated data
  {
    input: "{non-dynamic}",
    output: "{non-dynamic}",
  },
  // JSON objects and arrays
  {
    input: {
      string: "@row.first_name",
      array: ["@row.first_name", "@row.last_name"],
      nested: { string: "@row.last_name" },
    },
    output: {
      string: "Alice",
      array: ["Alice", "Smith"],
      nested: { string: "Smith" },
    },
  },
  // Recursive lookup with context-dependent return
  {
    input: "@row.full_name",
    output: "Alice Smith",
  },
  // Legacy concatenation (append missing bit)
  {
    input: "@row.first_name.sent.2",
    output: "Alice.sent.2",
  },
  // Missing values are not replaced
  {
    input: "@row.missing",
    output: "@row.missing",
  },
];

describe("Templated Data Parsing", () => {
  // Use a function wrapper to allow looping tests
  function execTest(testData: ITestData) {
    const { input, output } = testData;
    it(JSON.stringify(input), () => {
      const parser = new TemplatedData({ context: context.input, initialValue: input });
      const parsedValue = parser.parse();
      expect(parsedValue).toEqual(output);
      process.nextTick(() => console.log(`      ${JSON.stringify(parsedValue)}\n`));
      // NOTE - in case of errors additional tests can be carried out just on intermediate
    });
  }

  // Test context replacements
  it("Generates context replacments", () => {
    const { parsedContext } = new TemplatedData({ context: context.input });
    expect(parsedContext).toEqual(context.output);
    // process.nextTick(() => console.log(`\n${JSON.stringify(parsedContext, null, 2)}\n`));
  });

  // Test individual string parsing
  for (const testData of tests) {
    execTest(testData);
  }
});
